# 🚀 Safebank Infrastructure Deployment Workflow 🌐

## 🌟 Overview
Our deployment workflow uses GitHub Actions to automate releasing Azure infrastructure across three environments: **DEV**, **UAT**, and **PROD**. The workflow ensures consistency and reliability by using Bicep templates and secure secrets management. 🛠️


## 📋 Workflow Triggers
The workflow runs in the following cases:
- **🔄 Manual Trigger**: Developers can manually start the workflow using the `workflow_dispatch` event.
- **🔀 Pull Requests**: Automatically triggers for pull requests to the `main` branch.
- **⬆️ Push to Main**: Runs for changes pushed directly to the `main` branch (ignores changes in the `scripts/` folder).


## ⚙️ Steps for Each Environment
### 1️⃣ **Build Phase**
- **🏗️ Lint**: Checks the Bicep file for syntax issues.
- **📦 Upload**: Stores the validated Bicep file as an artifact for use in later steps.

### 2️⃣ **Deploy Phase**
- **DEV**: Deploys when changes are pushed to `main` or the workflow is manually triggered.
- **UAT**: Deploys for pull requests targeting `main` or manual triggers.
- **PROD**: Deploys under the same conditions as UAT to ensure consistency.

🔧 **Steps in Deployment**:
1. **📥 Download**: Retrieves the validated Bicep file.
2. **🔐 Authenticate**: Logs into Azure using secure credentials.
3. **🚀 Deploy**: Deploys the Bicep file to the appropriate environment using parameters like:
   - Admin credentials
   - Slack webhook URL for notifications


## 🔑 Key Points
- **Environment Variables**: The workflow uses specific resource groups and subscriptions for each environment to ensure isolation. 🏢
- **🔒 Security**: Secrets (e.g., SQL admin credentials, Slack webhook) are stored securely in GitHub Secrets.
- **🤖 Automation**: No manual intervention is required once the workflow starts.
- **🎛️ Flexibility**: Manual triggers allow developers to deploy changes on demand.


## 💡 Benefits
- **✅ Consistency**: Automated linting and artifact storage ensure that the same validated template is deployed.
- **⚡ Speed**: Changes are deployed to the correct environment as soon as they're approved.
- **🔍 Transparency**: Clear triggers and conditions prevent accidental deployments.
