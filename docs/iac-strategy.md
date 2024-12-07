## Description of Modularization Strategy 🧩

The modularization strategy for our infrastructure as code (IaC) implementation uses independent Microsoft Bicep modules, designed with a focus on maintainability, reusability, and flexibility. Each Azure resource was encapsulated within its own Bicep module, enabling a clear separation of concerns, simplifying debugging and updates. This approach made it easy for adding or subtracting any resource depending on the flow and need the project demanded. 

## Key Features of Modularization 🚀

1. **Independent Modules:** Each Azure resource is represented as an individual module. For instance, an App Service Plan is defined in a separate app-service-plan.bicep module:

```bicep
param location string = resourceGroup().location
param name string
param sku string

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

output id string = appServicePlan.id
output name string = appServicePlan.name
```

2. **Main Bicep Files as Orchestrator:** The **`main.bicep`** file orchestrates the deployment of all resources by referencing the individual modules and passing environment-specific parameters. 

>This file is responsible for defining the dependencies between resources and ensuring the correct order of deployment.

```bicep
// App Service Plan
@sys.description('The name of the App Service Plan')
param appServicePlanName string

module appServicePlan 'modules/app-service-plan.bicep' = {
name: 'appServicePlan-${userAlias}'
params: {
    location: location
    name: appServicePlanName
    sku: 'B1'
}
}
```

3. **Parametrization for Environemnts:** Separate parameter files `(.bicepparam)` were created for Development, UAT, and Production environments, enabling tailored configurations without modifying the main template.
    
```bicep
// Development Parameters
param appServicePlanName = 'safebank-asp-dev'
```

4. **Flexibility and Scalability:** New modules can be easily added or removed from the **`main.bicep`** file as needed, allowing for flexible scaling of the infrastructure.

## Benefits of Modularization 🌟

- **Maintainability:** Changes to a specific resource configuration can be made directly in its module without impacting others.
- **Reusability:** Modules can be reused across multiple projects or environments, promoting consistency and reducing duplication.
- **Flexibility:** Environment-specific parameter files simplify the process of deploying to different environments.
- **Testability:** Isolated modules make it easier to validate individual components of the deployment.
