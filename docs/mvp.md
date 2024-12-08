### ⁠ MVP-IEBank.md ⁠

⁠ markdown
# Minimum Viable Product (MVP)

The MVP for IE Bank focuses on building the foundation of a secure, user-friendly digital banking system. This platform will serve as a central hub for essential banking activities for end users and administrators, aligning with rigorous security, performance, and compliance standards.

## Core Functional Requirements

1. **Landing Page and Navigation**:
   - Users access a landing page with three options: “New User,” “Log In,” and “I am an Admin.”
   - Clear navigation ensures ease of access for all users.

2. **User Registration and Profile Creation**:
   - New users can register by providing basic details (username and password).
   - Successful registration generates a unique bank account number.

3. **Account Management Portal**:
   - Users can log in to view account details, transaction histories, and perform essential actions like transfers.
   - Secure login ensures data protection.

4. **Admin User Management**:
   - Admins can log in to manage users, create accounts, update profiles, and audit user activities.

5. **Money Transfer Capability**:
   - Users can securely transfer funds with real-time error checks (e.g., insufficient balance).

6. **Session Management and Security**:
   - Secure logouts and encrypted sessions using SHA-256 hashing.

## Non-Functional Requirements

- **Authentication**: All data transfers are HTTPS-encrypted.
- **Performance**: Processes like logging in or transferring funds are completed in under 2 seconds under normal load.
- **Compatibility**: Optimized for modern browsers like Chrome and Firefox.
- **Reliability**: Maintains 99% uptime with real-time monitoring.
- **System Monitoring**: Automated alerts for incident responses via Azure Monitor and Slack.

## Documentation and Deployment

- **Documentation**: GitHub Pages will host detailed design documentation for team collaboration.
- **Deployment**: Azure DevOps will manage product backlogs and sprint planning.
