# Design Decision

## Description of the 10 Implemented Guides

**Cybersecurity Engineer:** Massimo Giuseppe Ridella

---

## The 5 Implemented OpenSSF Frameworks

The OpenSSF framework, *Concise Guide for Developing More Secure Software*, outlines 27 guidelines aimed at reducing vulnerabilities that attackers could exploit. This report describes the security guidelines implemented in **Safe-Bank**.

### 1. Multi-Factor Authentication
- **Objective**: Add an additional layer of security to the team’s GitHub accounts.
- **Implementation**: MFA was enabled for all accounts. A design decision required the "Requirement to have MFA" setting activated at the organization level. If any member disables MFA, they lose access to resources owned by IE-Safebank.

### 2. Monitor Dependency Vulnerabilities
- **Tool**: Dependabot, integrated with GitHub, scans dependencies for vulnerabilities.
- **Categorization**: Alerts are classified as ‘low’, ‘medium’, ‘high’, or ‘critical’ to prioritize remediation.
- **Focus**: High and critical vulnerabilities were prioritized; medium and low issues are deferred.
- **Updates**: Dependabot ensures dependencies are kept up-to-date to mitigate exploits such as XSS.

### 3. Keep Dependencies Reasonably Up-to-Date
- **Challenge**: Dependabot’s alerts are only shown in GitHub's security panel.
- **Enhancement**: Alerts were connected to a Slack channel for immediate notification.
- **Automation**: Dependabot security updates were activated to automatically open pull requests for identified issues.

### 4. Do Not Push Secrets to a Repository
- **Tool**: GitHub Secret Scanning automatically scans for hard-coded secrets in commits.
- **Importance**: Hard-coded secrets remain a top 25 vulnerability (CWE).

### 5. Review Code Changes
- **Practice**: Classic branch protection rules require pull requests and reviews before merging to the main branch.
- **Benefit**: Keeps the main branch clean and fosters knowledge sharing among developers.

---

## Learning Secure Software Development Practices
IE-Safebank ensures secure software practices through continuous learning. The Cybersecurity Engineer completed the Linux Foundation’s hands-on course, achieving top scores.

---

## The 5 Implemented SAFECode Frameworks

The *Fundamental Practices for Secure Software Development* outlines 19 critical best practices to reduce exploitable vulnerabilities. The following were implemented:

### 1. Application Security Control Definition
- **Input Validation**:
  - Account creation requires password confirmation.
  - Ensures passwords match before account creation.
- **Data Validation**:
  - Monetary transactions are validated to prevent sending more money than available or negative amounts.

### 2. Leverage GitHub Security Features
- **GitHub Advanced Security**: CodeQL for static analysis.
- **Dependabot**: Alerts for dependency vulnerabilities.
- **Secret Scanning**: Detects exposed credentials.  
All tools are actively enabled across repositories.

### 3. Implement Access Controls
- **Branch Protection Rules**: Require pull requests, reviews, and status checks before merging.
- **Role-Based Access**: Assign roles (admin, contributor, reader) based on the principle of least privilege.

### 4. Secure Coding Practices
- **Code Analysis**: Tools like CodeQL, Dependabot, Secret Scanning, and OpenSSF Scorecard are implemented.
- **Error Handling**: Robust mechanisms to manage errors gracefully.
- **Third-Party Risks**: Dependabot ensures third-party libraries are secure and updated.
- **Safe Functions**: Testing ensures secure and well-defined functions.

### 5. Testing and Validation
Tools used:
- **Secret Scanning**: Automatically detects secrets in commits.
- **Dependabot**: Monitors and updates dependencies.
- **CodeQL**: Provides advanced security analysis.
- **OpenSSF Scorecard**: Evaluates critical security heuristics for continuous improvement.

---

## Manage Security Findings

### Prioritize Based on Risk
- Addressed all critical alerts across tools like SSFO Scorecard, Dependabot, and CodeQL.

### Prevention Over Detection
- Incident: Revoked admin roles from a team that bypassed code reviews to delete branch security features.

### Risk Acceptance
- Unresolved issues remain due to time constraints.
- Critical alerts were prioritized. Iterative improvements have enhanced the OSSF Scorecard results.

---

For more details, see:
- [GitHub Security Documentation](https://github.com/ie-safebank/safebank-fe/blob/main/docs/github-security.md)
