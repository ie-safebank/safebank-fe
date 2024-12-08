# CI Strategy

This section outlines the continuous integration (CI) strategy implemented at SafeBank. 🚀

## Frontend CI Workflow 🌐
[See the full code here](https://github.com/ie-safebank/safebank-fe/blob/main/.github/workflows/safebank-staticweb-frontend.yml)

### Trigger Events ⏯️ 

  - On push to `main`
  - On pull request to `main`
  - On workflow dispatch

### Build Jobs 🛠️

  - `build-dev`, `build-uat`, `build-prod`: These jobs automate the process of building the frontend application for different environments

| **Aspect**           | **`build-dev`**           | **`build-uat`**          | **`build-prod`**         |
| -------------------- | ------------------------- | ------------------------ | ------------------------ |
| **Environment File** | `.env.development`        | `.env.uat`               | `.env.prod`              |
| **Build Output**     | `dist-dev/`               | `dist-uat/`              | `dist-prod/`             |
| **Purpose**          | Local development/testing | Stakeholder/user testing | Deployment for end-users |

### Key Steps 🔑

1. **Code Checkout**: `actions/checkout@v4`

    - Ensures the build workflow has access to the correct version of the codebase

2. **Node.js Setup**: `actions/setup-node@v4`

    - Installs a specified Node.js version, ensuring compatibility with the project's dependencies and build tools

3. **Login to Azure**: `azure/login@v2`
   
    - Logs into Azure using the credentials stored in GitHub Secrets (${{ secrets.AZURE_CREDENTIALS }})
  
4. **Get Registry Credentials from vault**: `Azure/cli@v2.1.0`
   
    -  Fetches a secret (`appInsightsKey`) from Azure Key Vault using Azure CLI
  
5.  **`npm` Install Dependencies and Build**

6. **Upload artifact for deployment job**: `actions/upload-artifact@v4`

    - Packages the build output as an artifact and uploads it for use in later workflow steps or jobs
  
### Code Snippet 💻 

```
  build-dev:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Set up Node.js version
        uses: actions/setup-node@v4
        with:
          node-version: '18.x'
          cache: 'npm'

      - name: "Log in to azure"
        uses: azure/login@v2
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}

      - name: "Get registry credentials from vault"
        uses: Azure/cli@v2.1.0
        with:
          inlineScript: |
            echo "VUE_APP_APPINSIGHTS_INSTRUMENTATIONKEY=$(az keyvault secret show --name appInsightsKey --vault-name ${{ env.KEY_VAULT_NAME_DEV }} --query value -o tsv)" >> $GITHUB_ENV

      - name: npm install, build, and test
        env:
          VUE_APP_APPINSIGHTS_INSTRUMENTATIONKEY: ${{ env.VUE_APP_APPINSIGHTS_INSTRUMENTATIONKEY }}
        run: |
          npm install
          npm run build -- --mode development --dest dist-dev ## this command will build the vue.js app using .env.development variables into the dest-div/ folder

      - name: Upload artifact for deployment job
        uses: actions/upload-artifact@v4
        with:
          name: node-app-dev
          path: dist-dev/

```

## Backend CI Workflow ⚙️

[See the workflow here](https://github.com/ie-safebank/safebank-be/blob/main/.github/workflows/safebank-docker-backend.yml)

### Trigger Events ⏯️ 

  - On push to any branch
  - On pull request to `main`
  - On workflow dispatch

### Build Jobs 🛠️
  - `build-dev`, `build-uat`, `build-prod`: These jobs automate the process of building the backend application for different environments

| **Aspect**             | **build-dev**                 | **build-uat**                 | **build-prod**                |
|-------------------------|-------------------------------|--------------------------------|--------------------------------|
| **Key Vault Name**      | `env.KEY_VAULT_NAME_DEV` | `env.KEY_VAULT_NAME_UAT` | `env.KEY_VAULT_NAME_PROD` |
| **App Insights Key**    | Retrieved from **dev** Key Vault | Retrieved from **UAT** Key Vault | Retrieved from **prod** Key Vault |
| **Docker Context Name** | `docker-context-dev`          | `docker-context-uat`          | `docker-context-prod`         |

### Key Steps 🔑

1. **Checkout**: `actions/checkout@v4`
    
    - It ensures the build workflow has access to the correct version of the codebase

2. **Set up Python**: `actions/setup-python@v5`
    
    - Configures Python runtime environment, ensuring compatibility with the project's code and dependencies.
  
3. **Login to Azure**: `azure/login@v2`
   
    - Logs into Azure using the credentials stored in GitHub Secrets (${{ secrets.AZURE_CREDENTIALS }})
  
4. **Get Registry Credentials from vault**: `Azure/cli@v2.1.0`
   
    -  Fetches a secret (`appInsightsKey`) from Azure Key Vault using Azure CLI
  
5. **`pip` Install dependencies**

7. **Use flake8 for Linting**

8. **Test using Python functional and unit tests**

    - Executes the Python test suite consisting of unit and functional tests

9. **Save Docker context as artifact**: `actions/upload-artifact@v4`

    - Packages the Dockerfile and associated files, and uploads them as an artifact.
    - This artifact can be used in later jobs to build a Docker image.

### Code Snippet 💻 
```
build-dev:
  runs-on: ubuntu-latest

  steps:
    - uses: actions/checkout@v4

    - name: Set up Python 3.11
      uses: actions/setup-python@v5
      with:
        python-version: "3.11"


    - name: "Log in to azure"
      uses: azure/login@v2
      with:
        creds: ${{ secrets.AZURE_CREDENTIALS }}

    - name: "Get app insights key from vault"
      uses: Azure/cli@v2.1.0
      with:
        inlineScript: |
          echo "VUE_APP_APPINSIGHTS_INSTRUMENTATIONKEY=$(az keyvault secret show --name appInsightsKey --vault-name ${{ env.KEY_VAULT_NAME_DEV }} --query value -o tsv)" >> $GITHUB_ENV

    - name: Upgrade pip
      run: python -m pip install --upgrade pip

    - name: Install dependencies
      run: pip install -r requirements.txt

    - name: Lint with flake8
      run: |
        pip install flake8 pytest
        flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics
        flake8 . --count --exit-zero --max-complexity=10 --max-line-length=127 --statistics
    - name: Test with pytest
      run: |
        python -m pytest --cov=iebank_api -v
    - name: Save Docker context as artifact
      uses: actions/upload-artifact@v4
      with:
        name: docker-context-dev
        path: .
        if-no-files-found: error
```
  

# CD Strategy

🚀 Continuous Deployment Strategy for IE Bank Corp 🌐

### 🌟 Overview
Our Continuous Deployment (CD) strategy ensures deployment for both the frontend - the static website and backend - the Dockerized API of the IE Bank system. This document also covers both the inner loop and outer loop workflows and the release strategy. 🛠️

## Inner and Outer Loop Definition

### 🌀 Inner Loop: Local Development and Debugging
For local development and debugging. We can run and debug the app directly in VSCode using Docker containers for a consistent and isolated environment. Here's how it's done:
- 🔍 Debug Mode: Attach VSCode to running containers for step-by-step debugging.
- ✅ Goal: Fast feedback during development while ensuring compatibility with production environments.

### 🌐 Outer Loop: Continuous Delivery Workflows
The outer loop automates the build and deployment process for both the frontend and backend, ensuring fast, reliable, and repeatable releases.

1. Frontend Deployment (Static Website)
    - Workflow Name: deploy-frontend.yaml 🔗 [Link here](https://github.com/ie-safebank/safebank-fe/blob/main/.github/workflows/safebank-staticweb-frontend.yml)
    - Key Steps:
        - 🎯 Trigger: On push to main branch/ pull request/ workflow dispatch.
        - 🛠️ Build: Generate optimized static assets using npm build.
        - 📤 Deploy: Deploy to Azure Static Web Apps.

2.  Backend Deployment (Dockerized API)*
    - Workflow Name: safebank-docker-backend.yaml 🔗 [Link here](https://github.com/ie-safebank/safebank-be/blob/main/.github/workflows/safebank-docker-backend.yml)
    - Key Steps:
        - 🎯 Trigger: On push to main branch/ pull request/ workflow dispatch.
        - 🛠️ Build Docker Image: Use Docker CLI to create a production-ready image.
        - 🐳 Push to Registry: Push the image to Azure Container Registry.
        - 🌐 Deploy: Deploy the containerized backend to Azure App Services.


## 🛠️ Frontend Workflow Overview**

1. **Trigger the Workflow**:

    - The workflow starts automatically when code is pushed to the main branch, when a pull request targets main, or manually via workflow_dispatch.

3. **Set Up Node.js Environment**:

    - Configures the Node.js environment using actions/setup-node@v4 to install Node.js and enables caching for npm.

4. **Log In to Azure**:

5. **Retrieve Secrets from Azure Key Vault**:

    - Uses the Azure CLI to fetch sensitive environment-specific data, such as App Insights keys and deployment tokens, from Azure Key Vault.

6. **Install Dependencies and Build Static Files**:

    - Runs npm install to install all project dependencies.
Executes npm run build with the appropriate environment flag (dev, uat, prod) to generate optimized static files.

7. **Upload Build Artifacts**:

    - Saves the generated static files as artifacts using actions/upload-artifact@v4.

8. **Deploy to Azure Static Web Apps**:

    - Uses the Azure/static-web-apps-deploy@v1 action to upload static files to Azure Static Web Apps.
By doing this, we are automating the deployment of the frontend to Azure’s globally distributed infrastructure, providing fast and reliable hosting.


## 🛠️ Backend Workflow Overview

1. **Trigger the Workflow**:

    - Starts on pushes to main, pull requests targeting main, or manual invocation via workflow_dispatch.

2. **Check Out the Repository**:

    - Fetches the latest code from the repository.

3. **Log In to our Azure Container Registry**:

    - Logs in to Azure using azure/login@v2 and retrieves ACR credentials (username and password) securely from Azure Key Vault.

4. **Build Docker Image**:

    - Packages the backend application into a Docker container.

5. **Push Docker Image to ACR**:

    - Uploads the built Docker image to ACR.

6. **Deploy to Azure App Services**:

    - Configures Azure App Services to pull and run the backend container from ACR.

## 🎯 Release Strategy
  - **Branching Model**: Follows GitFeature with main for production and develop for staging. 
  - **Staging**: Every pull request is reviewed by the team (us) to ensure code quality and adherence to standards.
    We have a branch protection in place that obliges every team member to get at least one approval from a fellow member before they can finish the pull request.✅ After successful code reviews, the PR is merged, and the changes are automatically deployed to a staging environment for further validation.
  - **Production**: Merges to main trigger deployment to production, ensuring only reviewed and validated code is released.
  - **Rollback Plan**: Use tags to revert to a stable image/version in case of issues. 🔄

## 💡 Key Benefits of Our CD Strategy
- ✅ Automation: No manual steps – deployments happen automatically on code changes.
- ✅ Reliability: Docker containers and static site hosting ensure consistent environments.
- ✅ Speed: Developers can focus on features instead of deployment tasks.
