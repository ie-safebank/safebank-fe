### Secrets Management Strategy

#### Overview
In the context of managing secrets for our PostgreSQL server and Azure Container Registry (ACR), the current strategy reflects a mix of secure practices and technical debt. While we have successfully implemented Azure Key Vault for managing ACR credentials, the PostgreSQL server credentials are temporarily stored in GitHub Secrets. This decision, influenced by time constraints and communication challenges with the infrastructure department, is recognized as **technical debt** and flagged for future remediation.

---

#### Current Implementation

1. **Azure Container Registry Credentials**:
   - **Storage Location**: The ACR administrator username and passwords are securely stored in **Azure Key Vault**.
   - **Details**:
     - The Bicep configuration retrieves these credentials using the `containerRegistry.listCredentials()` method and securely stores them as Key Vault secrets.
     - This approach ensures adherence to best practices by centralizing and securing ACR credentials with features like encryption, access control, and auditing provided by Azure Key Vault.
   - **Benefits**:
     - Enhanced security and compliance with organizational policies.
     - Simplified credential management and rotation capabilities.

2. **PostgreSQL Server Credentials**:
   - **Storage Location**: Currently stored in **GitHub Secrets**.
   - **Reasoning**:
     - **Time Constraints**: The immediate project timeline did not allow for the setup and integration of Azure Key Vault for PostgreSQL credentials.
     - **Infrastructure Department Delays**: Collaboration with the infrastructure team to implement a centralized secrets management solution was hindered by poor communication and misaligned schedules.

   - **Details**:
     - GitHub Secrets provides an encrypted environment for storing sensitive information directly in the repository.
     - These secrets are injected into workflows or deployment pipelines at runtime, minimizing direct exposure.

---

#### Risks and Limitations
1. **For Azure Container Registry Credentials**:
   - No significant risks, as credentials are securely managed in Azure Key Vault.

2. **For PostgreSQL Server Credentials**:
   - **Security Risks**:
     - GitHub Secrets, while encrypted, lack advanced access controls, auditing, and automatic rotation compared to Azure Key Vault.
   - **Scalability**:
     - This approach does not scale well for a multi-environment setup or scenarios requiring frequent secret updates.
   - **Compliance Concerns**:
     - The use of GitHub Secrets may not meet certain regulatory or organizational compliance standards.

---

#### Future Plan

1. **Continue Best Practices for ACR**:
   - Maintain the current implementation of storing and managing ACR credentials in Azure Key Vault.
   - Periodically review and rotate ACR credentials for enhanced security.

2. **Remediate Technical Debt for PostgreSQL Credentials**:
   - Transition PostgreSQL credentials from GitHub Secrets to Azure Key Vault.
   - Update the Bicep configuration to retrieve credentials directly from Key Vault using the `getSecret` function.

3. **Enhanced Access Control**:
   - Implement Role-Based Access Control (RBAC) for all secrets to ensure granular permissions.

4. **Automation and Rotation**:
   - Automate secret rotation for both ACR and PostgreSQL credentials using Azure Key Vault’s built-in capabilities or external orchestrators.

5. **Documentation and Communication**:
   - Establish clear channels and SLAs for collaboration with the infrastructure team to avoid future delays.

---

#### Acknowledgment of Technical Debt

We acknowledge that the current use of GitHub Secrets for PostgreSQL credentials is a stopgap measure and constitutes **technical debt**. The successful implementation of Azure Key Vault for ACR credentials demonstrates our commitment to best practices, and we plan to extend this approach to all secrets.

**Action Timeline**:
- **Short Term**: Continue using GitHub Secrets for PostgreSQL credentials while limiting access and monitoring usage.
- **Medium Term**: Complete the integration of PostgreSQL credentials with Azure Key Vault within the next project cycle.
- **Long Term**: Establish an organization-wide policy for centralized secrets management.

This document serves as both a rationale for the current strategy and a roadmap for transitioning to a fully secure and scalable secrets management solution.
