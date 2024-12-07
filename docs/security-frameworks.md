# Design Decision

## Description of the 10 Implemented Guides

### Cybersecurity Engineer
Massimo Giuseppe Ridella

---

## The 5 Implemented OpenSSF Frameworks

The OpenSSF framework ‘Concise Guide for Developing More Secure Software’ is a list of 27 guidelines which aims to provide best practices to reduce vulnerabilities which attackers could exploit. These guidelines are especially important as “Tools are important, but not enough” ~The Linux Foundation. This section of the report aims to describe the security guidelines implemented in Safe-Bank.

### 1. Multi-Factor Authentication
The idea behind MFA is to add an additional layer of security to the team’s GitHub accounts. By having implemented MFA to our GitHub accounts, we reduce the risk of having attackers entering our code base. To apply further security, a design decision made by the Cybersecurity engineer was to activate in our organization the “Requirement to have MFA.” Therefore, if at any point any member of our team were to disable the MFA of their account, they would lose access to the resources owned by IE-Safebank.

### 2. Monitor Dependency Vulnerabilities
IE-Safebank monitors its dependencies through DependaBot. DependaBot is a tool directly implemented in GitHub, which scans for vulnerabilities in the dependencies which attackers could exploit for eavesdropping and cross-site scripting.

- **Use Tools to Scan for Vulnerabilities**  
  To accomplish this, IE-Safebank leverages Dependabot, a tool directly integrated into GitHub. Dependabot scans for vulnerabilities in dependencies that attackers could exploit. These vulnerabilities are categorized as ‘low,’ ‘medium,’ ‘high,’ or ‘critical,’ enabling prioritization for remediation.

- **Address Vulnerabilities Effectively**  
  While we prioritize fixing high and critical vulnerabilities, due to time constraints, 'high', ‘medium’ and ‘low’ dependency alerts were not addressed during the initial implementation. This approach helps ensure resources are focused on addressing the most significant risks.

- **Keep Dependencies Up-to-Date**  
  Having dependencies up-to-date is critical for preventing potential exploits. Outdated libraries are often targeted by attackers for eavesdropping, cross-site scripting (XSS), and other attacks. Dependabot ensures libraries are regularly reviewed and updated to mitigate these risks.

### 3. Keep Dependencies Reasonably Up-to-Date
Dependabot is an invaluable tool for technical purposes; however, it tends to overlook the human-centric aspects of its functionality. Dependabot’s alerts are restricted to notifications shown on the security panel in a GitHub repository. To address this, the Cyber Security engineer at IE-Safebank connected Dependabot’s alerts to a Slack channel in order to notify the developer of the risk. Furthermore, in the Dependabot’s configuration, Cyber Security has activated ‘Dependabot security updates,’ which automatically opens a pull request whenever a weakness is identified.

### 4. Do Not Push Secrets to a Repository
To avoid pushing secrets to a repository, IE-Safebank has implemented the use of the ‘Secret Scanning’ tool available on GitHub. This tool automatically scans code whenever a commit is made, identifying any instances of hard-coded secrets to ensure the security of the repository. This particular OpenSSF guide was especially important to follow as to this day, the in-code inclusion of secrets is in the Top 25 causes of vulnerability according to the CWE.

### 5. Review Code Changes
IE-Safebank’s Cyber Security engineer decided to adopt the common practice of enforcing code review when committing. To do this, IE-Safebank has applied classic branch protection rules to the main branch. By applying this security feature, whenever a developer made a PR, they would need the approval of a reviewer. This feature was implemented to keep the main branch as ‘clean’ as possible. Furthermore, by implementing this feature we fostered a culture of knowledge sharing in the organization as code reviewers would have to understand the new implementations and were therefore up to date with the code changes.

---

## Learning Secure Software Development Practices
IE-Safebank aims as an organization to guarantee security to its customers, therefore learning and keeping up to date with secure software development practices is of the utmost importance. To ensure this, IE-Safebank’s Cyber Security engineer took the Linux Foundation hands-on course and graduated with top scores.

---

## The 5 Implemented SAFEcode Frameworks

Similarly to the OpenSSF, the **“Fundamental Practices for Secure Software Development”** outlines 19 critical best practices for reducing vulnerabilities which attackers could exploit. These practices emphasize that while tools and automation play a vital role, they alone are insufficient to achieve robust security—a sentiment echoed by industry leaders. This section of the report focuses on the security practices implemented in IE-Safebank.

### 1. Application Security Control Definition

#### Project-Specific Controls
We have implemented Application Security Controls (ASCs) tailored to the specific needs of the application. These include measures for input validation and data validation:

- **Input Validation**: During account creation, users are required to enter and confirm their passwords. The account is created only if both entries match, ensuring data integrity.
- **Data Validation**: When a user initiates a monetary transaction, the application ensures that:
  - The transaction amount cannot exceed the user’s current balance.
  - Negative amounts are not allowed. These controls are designed to safeguard application functionality and prevent misuse.

#### Leverage GitHub Security Features
The project utilizes GitHub’s built-in security tools to identify and mitigate vulnerabilities:

- **GitHub Advanced Security**: CodeQL is enabled to perform static analysis and detect vulnerabilities in the codebase.
- **Dependabot**: Dependabot alerts are enabled to manage and update dependencies with known vulnerabilities.
- **Secret Scanning**: Secret scanning is enabled to identify and mitigate exposed credentials or API keys. All security features are actively enabled across the repositories.

#### Implement Access Controls
Access control measures have been established to protect the integrity of the codebase:
- **Branch Protection Rules**: Classic branch protection rules are enforced, requiring pull requests, code reviews, and status checks before merging changes into the main branch.
- **Role-Based Access**: Roles such as admin, contributor, and reader are assigned based on the principle of least privilege. Authorization settings have been adjusted and applied across all three repositories to enhance access control.

### 2. Secure Coding Practices
At IE-Safebank we understand the importance of secure coding practices. Having well-defined coding practices can improve readability, error prevention, and scalability, which is why we have implemented the following:

- **Use Code Analysis Tools to Find Security Issues Early**: Implemented tools like Secret Scanning, Dependabot, CodeQL, and OpenSSF Scorecard.
- **Handle Errors**: Implemented robust error-handling mechanisms to ensure graceful error management.
- **Manage Security Risk Inherent in the Use of Third-Party Components**: Leveraged Dependabot to monitor and address vulnerabilities in external dependencies.
- **Use Safe Functions Only**: Rigorous testing ensures the use of secure, well-defined functions aligned with secure coding standards.

### 3. Testing and Validation
To reduce the space of vulnerabilities, we implemented tools such as:
- **Secret Scanning**: Detects hard-coded secrets automatically during commits.
- **Dependabot**: Monitors dependencies for vulnerabilities and ensures they are updated.
- **CodeQL**: Provides advanced query-based security analysis.
- **OpenSSF Scorecard**: Evaluates critical security heuristics to continuously improve the security posture.

### 4. Manage Security Findings

#### Prioritize Based on Risk
Efficient use of resources ensures that critical alerts are addressed first across tools like SSFO Scorecard, Dependabot, and CodeQL. All critical alerts have been successfully resolved.

#### Prevention Over Detection
To maintain development standards, incidents like attempts to bypass code reviews were addressed by revoking admin roles. This action ensures branch protections remain intact and unauthorized security changes are prevented.

#### Risk Acceptance
Due to time constraints, some alerts remain unresolved. However, all critical issues have been prioritized and addressed. Iterative improvements have significantly enhanced the OSSF Scorecard results.

---

## References
- [GitHub Security Documentation](https://github.com/ie-safebank/safebank-fe/blob/main/docs/github-security.md)
- [Coding Standards Best Practices](https://www.browserstack.com/guide/coding-standards-best-practices)
