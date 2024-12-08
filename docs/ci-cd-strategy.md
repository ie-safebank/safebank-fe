# CI Strategy 🚀

This section outlines the continuous integration (CI) strategy implemented at SafeBank.

## Frontend CI Workflow
[See the workflow here](https://github.com/ie-safebank/safebank-fe/blob/main/.github/workflows/safebank-staticweb-frontend.yml)

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

#### Key Steps

1. **Code Checkout**: `actions/checkout@v4`

    - It ensures the build workflow has access to the correct version of the codebase

2. **Node.js Setup**: `actions/setup-node@v4`

    - It installs a specified Node.js version, ensuring compatibility with the project's dependencies and build tools

3. **`npm` Install Dependencies and Build**

4. **Upload artifact for deployment job**: `actions/upload-artifact@v4`

    - Packages the build output as an artifact and uploads it for use in later workflow steps or jobs

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
  
# CD Strategy 🚀
