# Modules:

## Logic App:

The logic app module is designed so that if the application ever goes against the SLIs defined, the team should get a notification of the alert to look into it and solve it with the utmost speed. To ensure proper communication, the logic app executes a JSON file that defines an action to send an HTTP POST request to the URL of the Slack webhook with a JSON payload. Within the code, we defined the location where the logic app will be deployed, which is the same as the resource group, to ensure minimum latency. Another important fact is that the slack webhook URL is defined in the GitHub secrets since the URL is fixed independently of the environment deployment, with the only difference being the name.

## Static Web App:

Azure static Web Apps host the front end of the Safebank application. This ensures that content can be quickly and reliably delivered directly to the Azure workspace automatically. Furthermore, the static web app has a resource that includes the admin credentials in the key vault. First, we define the name and the location of the resource to help minimize latency. Furthermore, we have to define the SKU, which defines the pricing plan of the static web application. In this case, we set it as free to make it worthwhile for development and testing environments, and even if it’s true that there are a few resources that we don’t have access to due to them being premium, we can work with what the free tier offers.
Furthermore, we need to define the ID for the key vault resource to integrate the Static Web App credentials safely. 

```
resource adminCredentialsKeyVault 'Microsoft.KeyVault/vaults@2022-07-01' existing = { name: last(split(keyVaultResourceId, '/')) // Extract the name from the resource ID }
```

We also define the API key for the static web app to store it in a key vault. 

```
resource secretStaticWebAppToken 'Microsoft.KeyVault/vaults/secrets@2023-02-01' = {
  name: tokenName
  parent: adminCredentialsKeyVault
  properties: {
    value: staticWebApp.listSecrets().properties.apiKey
  }
}
```

Another very important thing to note is that we need to set the allowConfigFileUpdates to false to ensure that the configuration can’t be changed through the Azure portal or REST API. This will give us better control over the changes and force the bicep template to be redeployed to make changes.

## Application insights:

The application insights is used to be able to monitor the application usage in terms of resources and diagnose performance issues. Firstly, to be able to correctly deploy the resource, we first need to define the name of the resource and the location of the resource. It is specially important to keep the location as consistent as possible to reduce communication overhead and latency.

```
@description('Name of the Application Insights resource')
param name string

@description('Region where the Application Insights resource will be deployed')
param location string
```

After defining the name and location, we also need to define the tags, which are optional parameters used to organize the resources to manage them easier.

```
@description('Tags to assign to the Application Insights resource')
param tagsArray object = {}
```

Third, we define the type of application we are monitoring, which can be different depending on the type of application. In our case, we will be defining it as web to ensure the information can be correctly collected for the web. 

```
@description('Type of Application Insights (e.g., web, other types)')
param type string
Finally, we link the log analytics workpace to centralize the monitoring and allowing for easier management of all the measured metrics. To connect it we need to define the resource ID as a parameter which will be defined in main.
@description('Resource ID of the linked Log Analytics Workspace')
param workspaceResourceId string
```

The following code is the definition of the application insights.

```
resource appInsights 'microsoft.insights/components@2020-02-02-preview' = {
  name: name
  location: location
  kind: 'web'
  tags: tagsArray
  properties: {
    Application_Type: type
    Flow_Type: 'Redfield'
    WorkspaceResourceId: workspaceResourceId
    IngestionMode: 'LogAnalytics'
  }
}
```

Some notable parameters are the setting of kind to web to show that the resource is for monitoring a web application, the configurable tags set as tagsArray to be able to better organize, the Flow_Type set as Redfield as the telemetry ingestion flow, the workflowResourceId as stated before and the IngestionMode as LogAnalytics to enable the data ingestion into the linked Log Analytics Workspace.

## App service plan:

For the app service app, which will be used to determine the resources available to the application and define the resources needed to run. First, we need to define the location to ensure everything remains on the same geographical area for lower latency, the name for unique identification and the sku which will be define the pricing plan of the static web application. In this case, we set it as B1 to make it easier to work with development and testing environments.

```
param name string
param location string = resourceGroup().location
param sku string
```

For the actual definition, we use the following code: 

```
resource appServicePlan 'Microsoft.Web/serverFarms@2022-03-01' = {
  name: name
  location: location
  sku: {
    name: sku
  }
  kind: 'linux'
  properties: {
    reserved: true
  }
}
```

Something important to note is that we use the kind parameter to indicate the OS the App Service Plan will be supporting, and the reserved property being equal to true means that the service plan will only work with linux applications.

## Container App Service:

For the code concerning the container app service, which is used to host Docker-based applications securely and efficiently, we integrate Application Insights for monitoring and a linked Log Analytics Workspace for centralized log collection and metrics analysis. To start, we need to define the location and the name, and the location for better reliability.

```
param location string 
param name string
```

An important distinction we have to make is that, while the app service plan provides the resources for the app service, the container app registry will actually host the docker images. For that, we need to define several parameters: the appServicePlanId, which is used to link the app service to the defined app service plan, the registryName which will be the name of the container registry which will actually store the docker image, the registryUsername and registryPassword which will be the credentials to access the container registry and the registryImageName and registryImageVersion, which will define the name and version (set to latest by default) to deploy the application.

```
param appServicePlanId string 
param registryName string 
@secure() 
param registryServerUserName string 
@secure() 
param registryServerPassword string 
param registryImageName string 
param registryImageVersion string = 'latest'
```

Another very important part of our container app service module is the application settings integration to collect the necessary data. We have to define the instrumentationKey, connectionStrings and appInsightsSettings to ensure that the metrics are able to be correctly logged by connecting the app service to the application insights. 

```
param instrumentationKey string param connectionStrings string var appInsightsSettings = [ 
{ name: 'APPINSIGHTS_INSTRUMENTATIONKEY', value: instrumentationKey } 
{ name: 'APPLICATIONINSIGHTS_CONNECTION_STRING', value: connectionStrings } 
{ name: 'ApplicationInsightsAgent_EXTENSION_VERSION', value: '~3' } 
{ name: 'XDT_MicrosoftApplicationInsights_NodeJS', value: '1' } 
]
```

We also have to set some docker specific settings, mainly the credentials and documentation for pulling the container image from the container registry.

```
var dockerAppSettings = [ 
{ name: 'DOCKER_REGISTRY_SERVER_URL', value: 'https://${registryName}.azurecr.io' } 
{ name: 'DOCKER_REGISTRY_SERVER_USERNAME', value: registryServerUserName } 
{ name: 'DOCKER_REGISTRY_SERVER_PASSWORD', value: registryServerPassword } 
]
```

For the resource definition then, we would have the following:

```
resource containerAppService 'Microsoft.Web/sites@2022-03-01' = {
  name: name
  location: location
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    serverFarmId: appServicePlanId
    httpsOnly: true
    siteConfig: {
      linuxFxVersion: 'DOCKER|${registryName}.azurecr.io/${registryImageName}:${registryImageVersion}'
      alwaysOn: false
      ftpsState: 'FtpsOnly'
      appCommandLine: appCommandLine
      appSettings: union(appSettings, [
        {name: 'AdminUsername', value: adminUsername}
        {name: 'AdminPassword', value: adminPassword}
      ], appInsightsSettings, dockerAppSettings)
    }
  }
}
```

Some of the most important features here are the identity configured as SystemAssigned, which allows the app service to access the resources without explicit credentials, linuxFxVersion which Specifies the container image using the format DOCKER|<registry>/<image>:<version>, HTTPS Only to ensure secure communication and appSettings to combine all necessary environment variables, including admin credentials, Application Insights settings, and Docker configuration.

In terms of the diagnostic settings for monitoring, we can define the following:

```
resource appServiceSettingsConfiguration 'Microsoft.Insights/diagnosticSettings@2021-05-01-preview' = {
  name: 'AppServiceSettings'
  scope: containerAppService
  properties: {
    workspaceId: workspaceId
    logs: [
      { category: 'AppServiceConsoleLogs', enabled: true }
      { category: 'AppServiceHTTPLogs', enabled: true }
      { category: 'AppServiceAppLogs', enabled: true }
      { category: 'AppServicePlatformLogs', enabled: true }
    ]
    metrics: [
      { category: 'AllMetrics', enabled: true }
    ]
  }
}
```

The resource integrates the app service with a log analytics workspace, enabling centralized log collection and metric analysis. Some of the logs which we collect are logs written to the application console (console logs), HTTP logs from the incoming requests and responses, application logs and logs of platform-level events. Within the metrics it is included all application and service-related metrics for comprehensive monitoring.

## Container Registry:

To be able to use and deploy the Azure Container Registry (ACR) with enhanced security and diagnostics, we need to ensure that the registry is integrated with Azure Key Vault to securely store credentials and with Azure Monitor for centralized logging and metrics collection. 

First, we need to set the name of the Azure container registry, the location to ensure consistency and reduced latency and the rest of the resources, the sku which in this case we set as Basic due to the fact that we are mainly doing development and testing and finally, we need to set the adminUserEnabled which is a boolean parameter to specifies if the admin user is enabled for the registry and allow access.

```
param name string
param location string = resourceGroup().location
param sku string = 'Basic'
param adminUserEnabled bool = true
```

For the integration with the key vault, we need to define the keyVaultResourceId, which will be the ID of the Azure key vault where all the registry credentials will be stored and the usernameSecretName, password0SecretName, password1SecretName, which are the names of the secrets in key vault to store the admin username and two generated passwords for the registry.

```
param keyVaultResourceId string
param usernameSecretName string
param password0SecretName string
param password1SecretName string
```

On the other hand, for the diagnostic settings, we need the containerRegistryDiagnostics, whci specifies the name of the diagnostic settings resource and the workspaceId, which will be the resource ID of the Log Analytics Workspace for storing logs and metrics.

```
param containerRegistryDiagnostics string = 'DiagnosticSettings'
param workspaceId string
```

For the actual resources, in the container registry resource we need to define the sku using the previous parameter and the adminUserEnabled. The code would be the following:

```
resource containerRegistry 'Microsoft.ContainerRegistry/registries@2023-07-01' = {
  name: name
  location: location
  sku: {
    name: sku
  }
  properties: {
    adminUserEnabled: adminUserEnabled
  }
}
```

As for the key vault, we need to extract the reference to the key vault name using the keyVaultResourceId as seen in the following code: 

```
resource adminCredentialsKeyVault 'Microsoft.KeyVault/vaults@2022-07-01' existing = {
  name: last(split(keyVaultResourceId, '/'))
}
```

And the admin username and passwords can be extracted from the key vault as shown in the following code: 

```
resource secretAdminUserName 'Microsoft.KeyVault/vaults/secrets@2023-02-01' = {
  name: usernameSecretName
  parent: adminCredentialsKeyVault
  properties: {
    value: containerRegistry.listCredentials().username
  }
}

resource secretAdminUserPassword0 'Microsoft.KeyVault/vaults/secrets@2023-02-01' = {
  name: password0SecretName
  parent: adminCredentialsKeyVault
  properties: {
    value: containerRegistry.listCredentials().passwords[0].value
  }
}

resource secretAdminUserPassword1 'Microsoft.KeyVault/vaults/secrets@2023-02-01' = {
  name: password1SecretName
  parent: adminCredentialsKeyVault
  properties: {
    value: containerRegistry.listCredentials().passwords[1].value
  }
}
```

Finally, for the diagnostic settings, we need to make sure to define the scope of the container registry, the metrics, which should be defined as AllMetrics, and the logs of the ContainerRegistryRepositoryEvents (which tracks repository activities like pushes and pulls) and the ContainerRegistryLoginEvents (which monitors login events for security auditing). We also need to remember to set the workspaceId to send all the logs to the log analytics workspace:

```
resource containerRegistryDiagnosticSettings 'Microsoft.Insights/diagnosticSettings@2021-05-01-preview' = {
  name: containerRegistryDiagnostics
  scope: containerRegistry
  properties: {
    workspaceId: workspaceId
    metrics: [
      {
        category: 'AllMetrics'
        enabled: true
      }
    ]
    logs: [
      {
        category: 'ContainerRegistryRepositoryEvents'
        enabled: true
      }
      {
        category: 'ContainerRegistryLoginEvents'
        enabled: true
      }
    ]
  }
}
```

## Key vault

The key vault is the Azure resource that stores all credentials, role-based access control (RBAC) integration, diagnostic settings, and role assignments. It is designed to secure the storage of secrets, certificates, and keys, and it’s monitored through log analytics.

First, we need to start defining the name, location, and SKU. However, unlike previous instances of SKU, we use standard (which is the default configuration) here for the same reasons described in other modules.

```
@description('Name of the Key Vault')
param name string

@description('Location of the Key Vault')
param location string = resourceGroup().location

@description('SKU of the Key Vault (Standard or Premium)')
param sku string = 'standard'
```

After the basic configuration, we need to define the rest of the configuration, mainly the enableVaultForDeployment to allow Azure to access the key vault during resource deployment, enableVaultForTemplateDeployment, which is meant to allow for template-based deployments to access the key vault securely, enableRbacAuthorization, to enable the RBAC, the enableSoftDelete, which is used to protect against accidental deletion by retaining deleted vaults and their content for a while, and finally we have to define the roleAssignments array and the builtInRoleNames variable, which allows us to assign roles to users, groups and service principals by defining them in the variable and the array. The implementation would be as follows:

```
@description('Enable Key Vault for deployment operations')
param enableVaultForDeployment bool = true

@description('Enable Key Vault for template deployment operations')
param enableVaultForTemplateDeployment bool = true

@description('Enable RBAC authorization for the Key Vault')
param enableRbacAuthorization bool = true

@description('Enable soft delete for the Key Vault')
param enableSoftDelete bool = true

@description('The name of the diagnostic setting')
param diagnosticSettingName string = 'DiagnosticSettingsName'

@description('ID of the Log Analytics Workspace')
param logAnalyticsWorkspaceId string

@description('Role assignments for the Key Vault')
param roleAssignments array = []

var builtInRoleNames = {
 Contributor: subscriptionResourceId(
   'Microsoft.Authorization/roleDefinitions',
   'b24988ac-6180-42a0-ab88-20f7382dd24c'
 )
   'Key Vault Administrator': subscriptionResourceId(
     'Microsoft.Authorization/roleDefinitions',
     '00482a5a-887f-4fb3-b363-3b7fe8e74483'
   )
   'Key Vault Certificates Officer': subscriptionResourceId(
     'Microsoft.Authorization/roleDefinitions',
     'a4417e6f-fecd-4de8-b567-7b0420556985'
   )
   'Key Vault Contributor': subscriptionResourceId(
     'Microsoft.Authorization/roleDefinitions',
     'f25e0fa2-a7c8-4377-a976-54943a77a395'
   )
   'Key Vault Crypto Officer': subscriptionResourceId(
     'Microsoft.Authorization/roleDefinitions',
     '14b46e9e-c2b7-41b4-b07b-48a6ebf60603'
   )
   'Key Vault Crypto Service Encryption User': subscriptionResourceId(
     'Microsoft.Authorization/roleDefinitions',
     'e147488a-f6f5-4113-8e2d-b22465e65bf6'
   )
   'Key Vault Crypto User': subscriptionResourceId(
     'Microsoft.Authorization/roleDefinitions',
     '12338af0-0e69-4776-bea7-57ae8d297424'
   )
   'Key Vault Reader': subscriptionResourceId(
     'Microsoft.Authorization/roleDefinitions',
     '21090545-7ca7-4776-b22c-e363652d74d2'
   )
   'Key Vault Secrets Officer': subscriptionResourceId(
     'Microsoft.Authorization/roleDefinitions',
     'b86a8fe4-44ce-4948-aee5-eccb2c155cd7'
   )
   'Key Vault Secrets User': subscriptionResourceId(
     'Microsoft.Authorization/roleDefinitions',
     '4633458b-17de-408a-b874-0445c86b69e6'
   )
   Owner: subscriptionResourceId(
     'Microsoft.Authorization/roleDefinitions',
     '8e3af657-a8ff-443c-a75c-2fe8c4bcb635'
   )
   Reader: subscriptionResourceId(
     'Microsoft.Authorization/roleDefinitions',
     'acdd72a7-3385-48ef-bd42-f606fba81ae7'
   )
     'Role Based Access Control Administrator (Preview)': subscriptionResourceId(
       'Microsoft.Authorization/roleDefinitions',
       'f58310d9-a9f6-439a-9e8d-f62e7b41a168'
   )
     'User Access Administrator': subscriptionResourceId(
       'Microsoft.Authorization/roleDefinitions',
       '18d7d88d-d35e-4fb5-a5c3-7773c20a72d9'
   )
 }
```

Finally, in terms of parameters, we would also have to define the diagnostic setting specific, which is the diagnosticSettingName to set the name of the diagnostic settings resource for logging and monitoring and the logAnalyticsWorkspaceId to link the key vault to a log analytics workspace for collecting logs and metrics.

```
@description('The name of the diagnostic setting')
param diagnosticSettingName string = 'DiagnosticSettingsName'

@description('ID of the Log Analytics Workspace')
param logAnalyticsWorkspaceId string
```

For the actual key vault resource definition, we need to define the following:

```
 resource keyVault 'Microsoft.KeyVault/vaults@2022-07-01' = {
  name: name
  location: location
  properties: {
    enabledForDeployment: enableVaultForDeployment
    enableRbacAuthorization: enableRbacAuthorization
    enableSoftDelete: enableSoftDelete
    enabledForTemplateDeployment: enableVaultForTemplateDeployment
    sku: {
      name: sku
      family: 'A'
    }
    tenantId: subscription().tenantId
    accessPolicies: []
  }
}
```

Where the parameters are set to the previously defined, the SKu has to be configured with the family type A, and the tenantId must be defined as one of the subscription IDs, and the accessPolicies array must be empty due to the use of the RBAC.

For the keyVault_roleAssignments resource, we use the roleAssignments parameter to create the roles and assign them. Within each role assignment, we need to include the principalId to specify the user, group, or service principal to assign the role to, roleDefinitionId to define the role and map it using builtInRoleNames and include a condition to check if the descriptions, conditions, and delegated managed identity resources are set.

```
resource keyVault_roleAssignments 'Microsoft.Authorization/roleAssignments@2022-04-01' = [
  for (roleAssignment, index) in (roleAssignments ?? []): {
    name: guid(keyVault.id, roleAssignment.principalId, roleAssignment.roleDefinitionIdOrName)
    properties: {
      roleDefinitionId: builtInRoleNames[?roleAssignment.roleDefinitionIdOrName] ?? roleAssignment.roleDefinitionIdOrName
      principalId: roleAssignment.principalId
      description: roleAssignment.?description
      principalType: roleAssignment.?principalType
      condition: roleAssignment.?condition
      conditionVersion: !empty(roleAssignment.?condition) ? (roleAssignment.?conditionVersion ?? '2.0') : null
      delegatedManagedIdentityResourceId: roleAssignment.?delegatedManagedIdentityResourceId
    }
    scope: keyVault
  }
]
```

Finally, the diagnostic settings module for the key vault needs the AuditEvent to track and log the access events and set the metrics to the AllMetrics configuration to collect information on all the key vault performance metrics.

```
resource keyVaultDiagnosticSettings 'Microsoft.Insights/diagnosticSettings@2021-05-01-preview' = {
  name: diagnosticSettingName
  scope: keyVault
  properties: {
    workspaceId: logAnalyticsWorkspaceId
    logs: [
      {
        category: 'AuditEvent'
        enabled: true
      }
    ]
    metrics: [
      {
        category: 'AllMetrics'
        enabled: true
      }
    ]
  }
}
```

## Log Analytics workspace 

The Log analytics workspace is a central component for monitoring and diagnostics in Azure, used to collect and analyze the logs and metrics from all the other various Azure resources and enables the site reliability engineersto be able to gain deeper insights into the application performance and health. We first need to define the name and the description as metadata. As for the prameters, we need to also define the name and the location. 

```
metadata name = 'Log analytics for the application'
metadata description = 'This module creates a Log Analytics Workspace for the application'

@description('Name of the Log Analytics Workspace')
param name string

@description('Location of the Log Analytics Workspace')
param location string

We also need to define the SKU of the log analytics workspace, which we assign as the default PerGB2018, which charges per GB of data ingested and stored. We also define the tags to improve resource organization.

@description('SKU of the Log Analytics Workspace (PerGB2018, Free, etc.)')
param sku string = 'PerGB2018'

@description('Tags to assign to the Log Analytics Workspace')
param tags object = {}
```

In terms of the resource definition, we have the following: 

```
resource logAnalyticsWorkspace 'Microsoft.OperationalInsights/workspaces@2022-10-01' = {
  name: name
  location: location
  tags: tags
  properties: {
    sku: {
      name: sku
    }
  }
}
```

On the code, we need to define the name, location, tags, and SKU as defined in the parameters from the code.

## Database Host: 

The postgreSQL host module defines the configuration of the postgreSQL database on an existing Azure flexible server for postgreSQL, providing the ability to create and manage a database instance.

First, as usual, we need to define the serverName to refer to the Azure flexible server where the database will be created, and the name of the postgreSQL database, set to ‘safebank-db.'

```
param serverName string
param name string = 'safebank-db'
```

We must also define the resource with the flexible server by the specific server name.

```
resource postgreSQLServer 'Microsoft.DBforPostgreSQL/flexibleServers@2022-12-01' existing = {
  name: serverName
}
```

And the actual database can be deployed using the following resource:

```
resource postgreSQLDatabase 'Microsoft.DBforPostgreSQL/flexibleServers/databases@2022-12-01' = {
  name: name
  parent: postgreSQLServer
  properties: {
    charset: 'UTF8'
    collation: 'en_US.UTF8'
  }
}
```

We define the name of the new database, the parent resource as the postgreSQLServer, and the properties, which are the character set (UTF8) and the collation, set to en_US.UTF8 to ensure compatibility with the English alphabet.

## Database Server

In terms of the database server, we need to define the name and the resource location.

```
param name string
param location string = resourceGroup().location
```

Furthermore, we need to define the adminLogin and adminPassword as secure parameters to set the administrator credentials, which will be hidden during deployment..

```
@secure()
param adminLogin string
@secure()
param adminPassword string
```

After that, we need to define the integration with the directory, which is done by setting the postgresSQLAdminServicePrincipalObjectId to specify the object ID of the active directory service principal to be set as the database administrator and the postgresSQLAdminServicePrincipalName to give the service principal name for clarity and reference.

```
param postgresSQLAdminServicePrincipalObjectId string
param postgresSQLAdminServicePrincipalName string
```

Finally, we define the workspace id to store the logs and metrics.

For the postgreSQL flexible server resource, we can use the following code:

```
resource postgreSQLServer 'Microsoft.DBforPostgreSQL/flexibleServers@2022-12-01' = {
  name: name
  location: location
  sku: {
    name: 'Standard_B1ms'
    tier: 'Burstable'
  }
  properties: {
    administratorLogin: adminLogin
    administratorLoginPassword: adminPassword
    createMode: 'Default'
    highAvailability: {
      mode: 'Disabled'
      standbyAvailabilityZone: ''
    }
    storage: {
      storageSizeGB: 32
    }
    backup: {
      backupRetentionDays: 7
      geoRedundantBackup: 'Disabled'
    }
    version: '15'
    authConfig: {
      activeDirectoryAuth: 'Enabled'
      passwordAuth: 'Enabled'
      tenantId: subscription().tenantId
    }
  }
}
```

Within the code, we configure the sku as standard_B1ms, disable the high availability to reduce costs, ensure that the retention is set to 7 days for recovery purposes, and the geoRedundantBackup as disabled to minimize costs. We also have to set the version to 15 to ensure the latest security upgrades and features are implemented within the database, enable all the options in authConfig to ensure the active directory and password authentication are o,n and set a storage of 32 GB to allow the database to store data without having to worry about the database running out of space.

We also need to define the firewall rules, which allow the database to connect with the rest of the Azure resources, using the PostgreSQL server as the parent and defining the starting and ending IP addresses. 

```
resource postgreSQLServerFirewallRules 'Microsoft.DBforPostgreSQL/flexibleServers/firewallRules@2022-12-01' = {
  name: 'AllowAllAzureServicesAndResourcesWithinAzureIps'
  parent: postgreSQLServer
  properties: {
    endIpAddress: '0.0.0.0'
    startIpAddress: '0.0.0.0'
  }
}
```

Finally, we have to make the resource for the active directory administrator by setting an active directory service principal as the PostgreSQL administrator for centralized identity management.

```
resource postgreSQLAdministrators 'Microsoft.DBforPostgreSQL/flexibleServers/administrators@2022-12-01' = {
  parent: postgreSQLServer
  name: postgresSQLAdminServicePrincipalObjectId
  properties: {
    principalName: postgresSQLAdminServicePrincipalName
    principalType: 'ServicePrincipal'
    tenantId: subscription().tenantId
  }
  dependsOn: [
    postgreSQLServerFirewallRules
  ]
}
```

Finally, for the diagnostic settings, we use the following code, which defines the postgreSQL activity logs, including sessions, runtime, query stats, table stats, and transactions, the metrics we want to monitor and the workspaceId to send the logs and metrics to the log analytics workspace identified by the workspaceId

```
resource postgreSQLDiagnosticSettings 'Microsoft.Insights/diagnosticSettings@2021-05-01-preview' = {
  name: 'postgreSQLDiagnosticSettings'
  scope: postgreSQLServer
  properties: {
    logs: [
      { category: 'PostgreSQLLogs', enabled: true }
      { category: 'PostgreSQLFlexSessions', enabled: true }
      { category: 'PostgreSQLFlexQueryStoreRuntime', enabled: true }
      { category: 'PostgreSQLFlexQueryStoreWaitStats', enabled: true }
      { category: 'PostgreSQLFlexTableStats', enabled: true }
      { category: 'PostgreSQLFlexDatabaseXacts', enabled: true }
    ]
    metrics: [
      { category: 'AllMetrics', enabled: true }
    ]
    workspaceId: WorkspaceId
  }
}
```

## Logic App

The logic app automates sending Slack alerts through a webhook as defined in the logicAppWorflowData.json.

As with the rest of the resources, we need to specify the location and name. We also need to define the Slack webhook URL to send the alert messages.

```
@description('Location of the resource')
param location string = resourceGroup().location

@description('Name of the Logic App')
param logicAppName string

@description('Slack Webhook URL to send alerts')
@secure()
param slackWebhookUrl string
```

On the other hand, to deploy the logic app, we need to define the resource of the logic app using the logicAppName parameter for the name and deploy in the specified location, setting the state as enabled immediately upon deployment to make it operational making it operational, load the JSON (logicAppWorflowData.json) which contains the configuration for triggers, actions, and outputs using definition and the parameters must include the slackWebhookUrl securely to the workflow as a parameter to allow the logic app to send alerts to the Slack channel.

```
resource logicApp 'Microsoft.Logic/workflows@2019-05-01' = {
  name: logicAppName
  location: location
  properties: {
    state: 'Enabled'
    definition: json(loadTextContent('./logicAppWorflowData.json'))
    parameters: {
      slackWebhookUrl: {
        value: slackWebhookUrl
      }
    }
  }
}
```

## Alert reliability

The Azure monitor metrics alert are used to monitorthe metrics describes in the site reliability documentation (System Availability, Transaction Speed, and API Error Rate).

First, we define system availability alert parameters: the availabilityAlertName, which is the alert's name for system availability monitoring; the availabilityAlertDescription, which is a short description of the alert; the availabilityAlertSeverity, which specifies how important the alert is; and the availabilityResourceScope, which defines the resource being monitored for availability.

```
@description('Name of the availability alert rule')
param availabilityAlertName string

@description('Description of the availability alert')
param availabilityAlertDescription string

@description('Severity of the availability alert (0: Critical, 1: Error, 2: Warning, 3: Informational)')
param availabilityAlertSeverity int

@description('Scope of the resource to monitor for availability')
param availabilityResourceScope string
```

For the resource, we have the following code where the availability is set with a threshold of 99, using an average aggregation over a five minute window every minute. Finally, if the alert is triggered it sends a message with the issue.

```
resource availabilityAlert 'Microsoft.Insights/metricAlerts@2018-03-01' = {
  name: availabilityAlertName
  location: 'global'
  properties: {
    description: availabilityAlertDescription
    severity: availabilityAlertSeverity
    enabled: true
    scopes: [
      availabilityResourceScope
    ]
    evaluationFrequency: 'PT1M'
    windowSize: 'PT5M'
    criteria: {
      'odata.type': 'Microsoft.Azure.Monitor.MultipleResourceMultipleMetricCriteria'
      allOf: [
        {
          name: 'SystemAvailability'
          criterionType: 'StaticThresholdCriterion'
          metricNamespace: 'Microsoft.Web/sites'
          metricName: 'Availability'
          operator: 'LessThan'
          threshold: 99
          timeAggregation: 'Average'
        }
      ]
    }
    autoMitigate: true
    actions: [
      {
        actionGroupId: actionGroupId
        webHookProperties: {
          customMessage: 'System availability dropped below 99%. Please investigate.'
        }
      }
    ]
  }
}
```

We then need to define the parameters for the transaction speed alerts, mainly the transactionSpeedAlertName, which is the name of the specific alert, transactionSpeedAlertDescription, which is the description, transactionSpeedAlertSeverity, which specifies the severity level, and transactionSpeedResourceScope, which refers to the resource scope being monitored for response time.

```
@description('Name of the API error rate alert rule')
param apiErrorRateAlertName string

@description('Description of the API error rate alert')
param apiErrorRateAlertDescription string

@description('Severity of the API error rate alert')
param apiErrorRateAlertSeverity int

@description('Scope of the resource to monitor for API error rate')
param apiErrorRateResourceScope string
```

For the transaction speed alert rule resource, we have the following code: The HttpResponseTime is set to less than two seconds, using an average aggregation over a five-minute window every minute. Finally, if the alert is triggered, it sends a message with the issue.

```
resource transactionSpeedAlert 'Microsoft.Insights/metricAlerts@2018-03-01' = {
  name: transactionSpeedAlertName
  location: 'global'
  properties: {
    description: transactionSpeedAlertDescription
    severity: transactionSpeedAlertSeverity
    enabled: true
    scopes: [
      transactionSpeedResourceScope
    ]
    evaluationFrequency: 'PT1M'
    windowSize: 'PT5M'
    criteria: {
      'odata.type': 'Microsoft.Azure.Monitor.MultipleResourceMultipleMetricCriteria'
      allOf: [
        {
          name: 'TransactionSpeed'
          criterionType: 'StaticThresholdCriterion'
          metricNamespace: 'Microsoft.Web/sites'
          metricName: 'HttpResponseTime'
          operator: 'GreaterThan'
          threshold: 2
          timeAggregation: 'Average'
        }
      ]
    }
    autoMitigate: true
    actions: [
      {
        actionGroupId: actionGroupId
        webHookProperties: {
          customMessage: 'Transaction speed exceeded 2 seconds. Please investigate.'
        }
      }
    ]
  }
}
```

Finally, we have the parameters for the API error rate rule, where we define the apiErrorRateAlertName,  the apiErrorRateAlertDescription, the apiErrorRateAlertSeverity and the apiErrorRateResourceScope. 

```
@description('Name of the API error rate alert rule')
param apiErrorRateAlertName string

@description('Description of the API error rate alert')
param apiErrorRateAlertDescription string

@description('Severity of the API error rate alert')
param apiErrorRateAlertSeverity int

@description('Scope of the resource to monitor for API error rate')
param apiErrorRateResourceScope string
```

For the final API Error Rate Alert resource, we have to set the Http5xx to a threshold of greater than 1 to see the API's error rate, using an average aggregation over a five-minute window every minute. Finally, if the alert is triggered, it sends a message with the issue.

```
resource apiErrorRateAlert 'Microsoft.Insights/metricAlerts@2018-03-01' = {
  name: apiErrorRateAlertName
  location: 'global'
  properties: {
    description: apiErrorRateAlertDescription
    severity: apiErrorRateAlertSeverity
    enabled: true
    scopes: [
      apiErrorRateResourceScope
    ]
    evaluationFrequency: 'PT1M'
    windowSize: 'PT5M'
    criteria: {
      'odata.type': 'Microsoft.Azure.Monitor.MultipleResourceMultipleMetricCriteria'
      allOf: [
        {
          name: 'ApiErrorRate'
          criterionType: 'StaticThresholdCriterion'
          metricNamespace: 'Microsoft.Web/sites'
          metricName: 'Http5xx'
          operator: 'GreaterThan'
          threshold: 1
          timeAggregation: 'Average'
        }
      ]
    }
    autoMitigate: true
    actions: [
      {
        actionGroupId: actionGroupId
        webHookProperties: {
          customMessage: 'API error rate exceeded 1%. Please investigate.'
        }
      }
    ]
  }
}
```

## Workbook

For the final resource, we start defining the name and location parameters as usual.

```
@description('The name of the Azure Workbook')
param workbookName string

@description('The location of the Azure Workbook')
param location string = resourceGroup().location
```

Then we continue with the workbook content, which will have the JSON representation of the workbook and define the layout, visualizations, queries, and data sources.

```
@description('Serialized workbook JSON content')
param workbookJson string
```

Finally for the parameters, we need the resource ID of the log analytics workspace to obtain the data for the workbook to allow it to query logs and metrics stored in the workspace.

```
@description('The resource ID of the Log Analytics Workspace')
param logAnalyticsWorkspaceId string
```

For the resource, we need to define the name (which will be a unique ID), location, the kind (which we define as shared to allow users with the proper permissions to access it), the category set to workbook, the displayName, the serializedData, and the sourceId.

```
resource Workbook 'Microsoft.Insights/workbooks@2022-04-01' = {
  name: guid(resourceGroup().id, workbookName) // Generate a unique GUID for the Workbook name
  location: location
  kind: 'shared'
  properties: {
    category: 'workbook'
    displayName: workbookName
    serializedData: workbookJson
    sourceId: logAnalyticsWorkspaceId
  }
}
```

## Configuration of each environment of the design document:

We change little in the environment's configuration, only the resource names. To begin, we define the PostgreSQL server and database, with the server name, admin login, and password, as well as the database name.

```
param postgreSQLServerName = 'safebank-dbsrv-prod'
param adminLogin = ''
param adminLoginPass = ''

param postgreSQLDatabaseName = 'safebank-db-prod'
```

We also have to set the parameters of the static web app, which is where all the front end is shown. The parameters are the name, location, and deployment token for the CI/CD.

```
param staticWebAppName = 'safebank-swa-prod'
param staticWebAppLocation = 'westeurope'
param staticWebAppTokenName = 'swa-token'
```

In the container instance, we have to set the container name, the image name, the image version, and the app settings, where we set the environment we are using and the value for the rest of the environment-specific variables. 

```
param containerName = 'safebank-be-prod'
param dockerRegistryImageName = 'safebank-be'
param dockerRegistryImageVersion = 'latest'
param containerAppSettings = [
  { name: 'ENV', value: 'prod' }
  { name: 'DBHOST', value: 'safebank-dbsrv-prod.postgres.database.azure.com' }
  { name: 'DBNAME', value: 'safebank-db-prod' }
  { name: 'DBUSER', value: 'safebank-be-prod' }
  { name: 'FLASK_DEBUG', value: '1' }
  { name: 'SCM_DO_BUILD_DURING_DEPLOYMENT', value: 'true' }
]
```

After defining the container instance parameters, we need to define the container registry, which includes the name, location, username secret and two passwords for the user.

```
param registryName = 'safebankcrprod'
param registryLocation = 'westeurope'
param containerRegistryUsernameSecretName = 'acr-username'
param containerRegistryPassword0SecretName = 'acr-password0'
param containerRegistryPassword1SecretName = 'acr-password1'
```

The key vault is also very important, and we need to define the name and the role assignments to allow different roles to enable specific service principals to access the key vault. 

```
param keyVaultName = 'safebank-kv-prod'
param keyVaultRoleAssignments = [
  {
    principalId: '25d8d697-c4a2-479f-96e0-15593a830ae5'
    roleDefinitionIdOrName: 'Key Vault Secrets User'
    principalType: 'ServicePrincipal'
  }
]
```

We need only to define the name and app service plan for the log analytics workspace.

```
param logAnalyticsWorkspaceName = 'safebank-law-prod'
param appServicePlanName = 'safebank-asp-prod'
```

For the application insights, we define the name, the key and connection name to integrate the application to the application insights. 

For the workbook, it’s enough to add the name and the JSON path for the structure and visualization.

```
param workbookName = 'safebank-workbook-prod'
param workbookJson = loadTextContent('../templates/safe-bank-workbook-prod.workbook')
```

For the logic app, we need to set the name and the webhook URL (however, it will be empty since the link is on the GitHub secrets)

```
param logicAppName = 'safebank-la-prod'
param slackWebhookUrl = ' '
```
