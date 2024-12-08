---
title: SafeBank and 12-Factor App Design
layout: default
---

# **SafeBank and 12-Factor App Design**

At SafeBank, we are committed to building a **scalable**, **maintainable**, and **portable** platform that adheres to modern application design principles. By aligning with the [**12-Factor App methodology**](https://12factor.net/), we ensure that our infrastructure is well-suited for cloud environments, enabling seamless deployment, scaling, and development.

---

Below is a detailed breakdown of how the 12-Factor principles are applied to SafeBank:

| **Factor**            | **Description**                                                                                  | **Application in SafeBank**                                                                                       |
|------------------------|--------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------|
| **Codebase**          | One codebase tracked in version control, many deployments.                                       | GitHub repositories (frontend, backend, infrastructure) with CI/CD pipelines for seamless deployments.           |
| **Dependencies**      | Explicitly declare and isolate dependencies.                                                    | Dependencies managed via `npm` for frontend for backend, isolated in containers. |
| **Config**            | Store configuration in the environment.                                                         | Configurations (e.g., API keys, DB credentials) managed securely via **Azure Key Vault** and injected dynamically. |
| **Backing Services**  | Treat backing services as attached resources.                                                   | Backing services like **PostgreSQL**, **Key Vault**, and **ACR** are replaceable without code changes.            |
| **Build, Release, Run** | Strictly separate the build, release, and run stages.                                          | CI/CD workflows enforce separation, ensuring builds are consistent and configuration-specific.                    |
| **Processes**         | Execute the app as stateless processes.                                                         | Stateless backend/frontend processes deployed in **Azure App Services** with external state storage in PostgreSQL. |
| **Port Binding**      | Export services via port binding.                                                               | Backend APIs bind to dynamic ports in **App Services for Containers**, allowing flexible communication.           |
| **Concurrency**       | Scale out via the process model.                                                                | Autoscaling for frontend and backend using **Azure's scaling capabilities** to handle increased load.             |
| **Disposability**     | Maximize robustness with fast startup and graceful shutdown.                                     | Containers are optimized for rapid startup/shutdown, with rolling updates ensuring zero downtime deployments.      |
| **Dev/Prod Parity**   | Keep development, staging, and production as similar as possible.                                | Consistent configurations across environments, with differences limited to access permissions.                    |
| **Logs**              | Treat logs as event streams.                                                                    | Logs aggregated via **Azure Monitor**, **Application Insights**, and **Log Analytics** for actionable insights.   |
| **Admin Processes**   | Run admin/management tasks as one-off processes.                                                | Database migrations and maintenance tasks executed as isolated CI/CD workflows.             |

---

### **1. Codebase**  
- **Principle**: Maintain a single codebase tracked in version control and used in multiple deployments.  
- **SafeBank**:  
  All our code resides in **GitHub repositories** (frontend, backend, and infrastructure) and is version-controlled. CI/CD pipelines manage the deployments to **Development**, **UAT**, and **Production** environments seamlessly, ensuring that every change is tracked and auditable.

---

### **2. Dependencies**  
- **Principle**: Explicitly declare and isolate dependencies.  
- **SafeBank**:  
  SafeBank explicitly defines all its dependencies in **package managers** such as `npm` (for the frontend and JS) and `pip` for Python. Dependencies are isolated in containers, ensuring no dependency conflicts between environments.

---

### **3. Config**  
- **Principle**: Store configuration in the environment.  
- **SafeBank**:  
  Sensitive configuration details such as database credentials, API keys, and Azure resource connections are managed securely in **Azure Key Vault** and injected as environment variables during deployments. This ensures configurations remain separate from the codebase.

---

### **4. Backing Services**  
- **Principle**: Treat backing services as attached resources.  
- **SafeBank**:  
  Backing services like the **Azure PostgreSQL database**, **Azure Key Vault**, and **Azure Container Registry** are treated as external resources. These services are configured dynamically through environment-specific settings, making them replaceable without code changes.

---

### **5. Build, Release, Run**  
- **Principle**: Strictly separate build, release, and run stages.  
- **SafeBank**:  
  Our CI/CD workflows enforce the separation between these stages:  
  - **Build**: Compile and package code into deployable artifacts.  
  - **Release**: Combine the artifacts with environment-specific configurations.  
  - **Run**: Execute the application in the target environment.

---

### **6. Processes**  
- **Principle**: Execute the app as one or more stateless processes.  
- **SafeBank**:  
  The backend and frontend are designed as **stateless processes** deployed in **Azure App Services** and **Static Web Apps**, respectively. Any state that needs to persist (e.g., user sessions) is stored externally in **Azure PostgreSQL**. 

---

### **7. Port Binding**  
- **Principle**: Export services via port binding.  
- **SafeBank**:  
  The SafeBank API binds to dynamic ports during deployment in **App Services for Containers**, allowing easy communication with the frontend and external integrations without hardcoding.

---

### **8. Concurrency**  
- **Principle**: Scale out via the process model.  
- **SafeBank**:  
  SafeBank leverages **Azure’s autoscaling capabilities** to horizontally scale frontend and backend services. Containers hosting backend APIs can run multiple instances to handle increased loads, while **Static Web Apps** scale automatically for frontend demands.

---

### **9. Disposability**  
- **Principle**: Maximize robustness with fast startup and graceful shutdown.  
- **SafeBank**:  
  Containers hosting backend services are designed for **quick startups** and **graceful shutdowns**. Azure’s deployment mechanisms ensure that rolling updates replace old instances without downtime.

---

### **10. Dev/Prod Parity**  
- **Principle**: Keep development, staging, and production as similar as possible.  
- **SafeBank**:  
  By using consistent **tiers** and configurations across environments, SafeBank ensures parity between Development, UAT, and Production. The only differences lie in access permissions, ensuring consistent behavior across all stages.

---

### **11. Logs**  
- **Principle**: Treat logs as event streams.  
- **SafeBank**:  
  Application logs are captured via **Azure Monitor** and **Application Insights**, aggregated into **Log Analytics Workspace**, and visualized in dashboards. This ensures that logs are accessible, searchable, and actionable.

---

### **12. Admin Processes**  
- **Principle**: Run admin/management tasks as one-off processes.  
- **SafeBank**:  
  Maintenance tasks like database migrations are executed as **one-off processes** during deployments via **GitHub Actions**. These processes are isolated from the main application lifecycle to avoid interference.

---



## **Why 12-Factor Matters for SafeBank**
By adhering to the **12-Factor App methodology**, SafeBank is designed to be:  
1. **Portable** across cloud platforms.  
2. **Resilient** to changes and failures.  
3. **Scalable** to meet future demands.  
4. **Maintainable** for seamless feature updates and debugging.  

This approach ensures SafeBank not only meets current requirements but is also equipped to adapt and grow with future technological advancements. 🌟

---