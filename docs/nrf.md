
---
# **Non-Functional Requirements**

Clara, the Cloud Architect, worked closely with all developers, particularly Site Reliability Engineers (**Leo** and **Peter**) and Security Engineer (**Massimo**), to ensure that the non-functional requirements were always up to date and aligned with the project's needs. This collaborative approach ensured that the system was designed to maximize **user security** and **comfort** while meeting the highest standards of **reliability**, **performance**, and **scalability**.

## **Reliability**
- **NFR1:** The system must achieve a minimum uptime of **99%** across all environments (DEV, UAT, PROD).  
-**User Story:** https://dev.azure.com/rsagasteguiieu2022/safebank/_backlogs/backlog/safebank%20Team/Epics?workitem=281

- **NFR2:** Critical services (e.g., transactions, user management) must remain available during failovers or high-severity incidents.  
- **NFR3:** The system must implement failover mechanisms, ensuring recovery within **1 hour** during regional outages.  
- **NFR4:** Daily database snapshots must be taken to support disaster recovery and prevent data loss.  
- **NFR5:** Multi-region redundancy must be enabled for critical services to ensure availability during regional disruptions.  

---

## **Performance**
- **NFR6:** Transaction response times must be less than **2 seconds** for **99%** of all transactions.  
- **NFR7:** Data retrieval queries must be completed within **3 seconds** in **95%** of cases.  
- **NFR8:** API error rates must remain below **1%** across all monitored operations.  
- **NFR9:** Latency for inter-service communication must not exceed **50ms** in 95% of interactions.  
- **NFR10:** Performance degradation during heavy traffic must be limited to less than **10%**.  

---

## **Scalability**
- 🔴 ***NFR11:** The system must support **double the average load** during peak traffic periods without degradation.* **Technical debt**
- 🔴 ***NFR12:** Auto-scaling must be configured for all Azure App Services and databases based on **CPU utilization** and **request rates**.* **Technical debt**
- 🔴 ***NFR13:** The system must allow for horizontal scaling of frontend and backend components without downtime.* **Technical debt**
- 🔴 ***NFR14:** Traffic must be distributed geographically using **Azure Front Door** to optimize latency and performance.* **Technical debt**


---

## **Monitoring and Alerting**
- **NFR15:** Azure Monitor and Application Insights must be integrated to track SLIs such as uptime, response times, error rates, and system load.  
- **NFR16:** Alerts for critical SLIs must notify the relevant teams via **Slack** within **5 minutes** of detection.
- **User Story**: https://dev.azure.com/rsagasteguiieu2022/safebank/_backlogs/backlog/safebank%20Team/Epics?workitem=286 
- 🔴 ***NFR17:** The system must maintain logs for all services in **Azure Log Analytics** with a 90-day retention policy.* **Technical dept**
- **NFR18:** Dashboards must provide real-time insights into performance metrics, transaction speeds, and error rates.  
- **NFR19:** Alerts must trigger automated responses, such as scaling or retries, for predictable issues like load surges.  

---

## **Incident Management**
- **NFR20:** Incident response times must adhere to the following SLA:  
  - High-severity incidents: resolved within **30 minutes**.  
  - Medium-severity incidents: resolved within **1 hour**.  
  - Low-severity incidents: resolved within **8 hours**.  
- **NFR21:** All incident data must be documented in a post-incident report, including root cause analysis and corrective actions.  
- **NFR22:** Automated ticketing must create incident reports in ITSM tools for high-priority alerts.  

---

## **Security**
- **NFR23:** All secrets and credentials must be securely stored in **Azure Key Vault**, with access monitored and logged.  
- **NFR24:** Push protection and secret scanning must prevent sensitive information from being committed to GitHub repositories.  
- **NFR25:** The system must implement **CodeQL** to scan for vulnerabilities in the codebase for every pull request.  

---

## **Maintainability**
- **NFR26:** The system’s infrastructure must be modularized into **Bicep modules** for reusability and maintainability.  
- **NFR27:** Monthly reviews of monitoring dashboards must be conducted to ensure alerts and metrics remain relevant.  
- **NFR28:** All technical documentation must be updated after every major system change or quarterly at a minimum.  

---

## **Cost Optimization**
- **NFR29:** Log retention policies must be reviewed monthly to align with storage costs and usage patterns.  
- **NFR30:** Monitoring resources must dynamically scale during off-peak hours to reduce unnecessary expenses.  

---

# **NFR to User Story Mapping**

| **NFR Number** | **Non-Functional Requirement**                                                              | **Related User Stories**                                                                                          | **Acceptance Criteria**                                                                                                                                         |
|----------------|----------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **NFR1–NFR5**  | Ensure reliability and availability of critical services, including failover mechanisms.     | As an SRE, I want to monitor key SLIs to ensure performance and reliability targets are met.                     | SLIs monitored and alerts configured to ensure uptime >99%. Failover mechanisms tested quarterly.                                                               |
| **NFR6–NFR10** | Maintain performance standards for transaction speeds, data retrieval, and API error rates.  | As a user, I want transactions processed quickly without errors.                                                 | Transactions processed within 2 seconds. Data retrieval under 3 seconds for 95% of cases. API errors below 1%.                                                  |
| **NFR11–NFR14**| Ensure scalability through auto-scaling and traffic distribution mechanisms.                 | As an infrastructure developer, I want to modularize infrastructure components to support scalability.           | Horizontal scaling implemented and validated during peak loads. Traffic distributed across regions using Azure Front Door.                                       |
| **NFR15–NFR19**| Set up monitoring and alerting tools to track SLIs and automate responses for predictable issues. | As a Site Reliability Engineer, I want to create dashboards for real-time SLI monitoring.                        | Dashboards provide real-time and historical metrics. Alerts notify teams within 5 minutes. Automated scaling for predictable load surges tested successfully.    |
| **NFR20–NFR22**| Establish incident management processes with automated ticketing and response times.         | As an SRE, I want to define and implement escalation policies for critical alerts.                               | Critical alerts routed to relevant teams within 5 minutes. High-severity incidents resolved in under 30 minutes. Documentation created for all incidents.       |
| **NFR23–NFR25**| Enhance security with GitHub hardening and secure credential management.                     | As a cybersecurity engineer, I want to securely store sensitive credentials and prevent vulnerabilities.         | Azure Key Vault configured for secret storage. GitHub advanced security features (CodeQL, push protection) implemented.                                          |
| **NFR26–NFR28**| Ensure maintainability with modular infrastructure and updated documentation.                | As an infrastructure developer, I want Bicep modules for reusability and easy updates.                           | Modularized Bicep components deployed successfully in all environments. Documentation reviewed and updated after system changes.                                 |
| **NFR29–NFR30**| Optimize costs by reviewing log retention and scaling policies.                              | As a DevOps engineer, I want to reduce costs while maintaining operational efficiency.                           | Log retention policy adjusted to 90 days. Monitoring resources scaled dynamically during off-peak hours, reducing unnecessary costs.                             |

---


