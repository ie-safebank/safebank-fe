# CI Strategy

This section outlines the continuous integration (CI) strategy implemented at SafeBank. 🚀

## Frontend CI Workflow
[See the full code here](https://github.com/ie-safebank/safebank-fe/blob/main/.github/workflows/safebank-staticweb-frontend.yml)

### Trigger Events

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

### Key Steps

1. **Code Checkout**: `actions/checkout@v4`

    - Ensures the build workflow has access to the correct version of the codebase

2. **Node.js Setup**: `actions/setup-node@v4`

    - Installs a specified Node.js version, ensuring compatibility with the project's dependencies and build tools

3. **Login to Azure**: `azure/login@v2`
    - Logs into Azure using the credentials stored in GitHub Secrets (${{ secrets.AZURE_CREDENTIALS }})
    - Allows us to fetch secrets from the key vault
  
4. **Get Registry Credentials from vault**: `Azure/cli@v2.1.0`
    -  Fetches a secret (`appInsightsKey`) from Azure Key Vault using Azure CLI
    -  Adds the secret to the environment variables of the current workflow ($GITHUB_ENV).
  
6.  **`npm` Install Dependencies and Build**

7. **Upload artifact for deployment job**: `actions/upload-artifact@v4`

    - Packages the build output as an artifact and uploads it for use in later workflow steps or jobs
  
### Code Snippet

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

## Backend CI Workflow

[See the workflow here](https://github.com/ie-safebank/safebank-be/blob/main/.github/workflows/safebank-docker-backend.yml)

### Trigger Events

  - On push to any branch
  - On pull request to `main`
  - On workflow dispatch

### Build Key Steps 🛠️

1. **Checkout**: `actions/checkout@v4`

    - It ensures the build workflow has access to the correct version of the codebase

2. **Set up Python**: `actions/setup-python@v5`

    - Configures Python runtime environment, ensuring compatibility with the project's code and dependencies.

3. **`pip` Install dependencies**

4. **Test using Python functional and unit tests**

    - Executes the Python test suite consisting of unit and functional tests

5. **Save Docker context as artifact**: `actions/upload-artifact@v4`

    - Packages the Dockerfile and associated files, and uploads them as an artifact.
    - This artifact can be used in later jobs to build a Docker image.
  
# CD Strategy
