# Service Level Agreement (SLA) for SafeBank

## 1. Introduction

This Service Level Agreement (SLA) is a formal agreement between SafeBank (the "Provider") and its customers (the "Clients"). This document defines the standard of service expected from the Provider, including specific responsibilities and services provided. The purpose of this SLA is to ensure that the proper elements and commitments are in place to provide consistent service support and delivery to the Clients by the Provider.

## 2. Service Commitments and Objectives

### 2.1 System Availability

- Objective: Achieve at least 99% system availability each month, excluding scheduled maintenance windows. This level of uptime is crucial for a banking platform, ensuring that customers have reliable access to their financial services almost constantly, which is vital for maintaining trust and satisfaction.
- Measurement: System availability will be calculated by dividing the total operational minutes by the total available minutes in the month, multiplied by 100. This excludes any periods of downtime communicated in advance as scheduled maintenance, which aligns with industry practices to allow for essential updates and maintenance without penalty.

### 2.2 Transaction Processing Performance

- Objective: Ensure that 99% of all financial transactions are completed within 2 seconds under normal load conditions. This objective supports a seamless user experience where transactions are processed quickly, reducing wait times and increasing user satisfaction.
- Measurement: Transaction durations will be monitored using Application Insights, measuring the time from initiation to confirmation. This real-time monitoring helps in maintaining performance standards and identifying any deviations from expected processing times.

### 2.3 API Error Rates

- Objective: Maintain API error rates below 1%. Keeping error rates low is essential for operational stability and reliability, ensuring that interactions with the system are successful and dependable.
- Measurement: API error rates will be tracked as a percentage of total API calls using Azure Monitor. This measurement provides a clear, quantifiable metric to assess the health and stability of the API interactions.

### 2.4 Data Security Compliance

- Objective: Ensure 100% compliance with data encryption standards for data at rest and in transit. This compliance is non-negotiable, as it ensures the protection of sensitive customer data against breaches and unauthorised access.
- Measurement: Compliance will be verified through regular security audits, including both internal audits and third-party reviews, and continuous monitoring with tools like Azure Security Center.

### 2.5 Support Response Times

- Objective: Respond to 95% of customer support queries within 4 hours during business hours. Quick response times are essential for addressing user concerns and maintaining high levels of customer service and satisfaction.
- Measurement: Response times will be tracked through a customer support management system, ensuring that all queries are logged and responded to in a timely manner.

## 3. Implementing and Tracking SLOs

- Tools & Systems: Azure Monitor and Application Insights will be used for real-time monitoring and reporting of these metrics. Azure Service Health will be leveraged for availability tracking and Azure Security Center for compliance monitoring.
- Review and Adjustment: These objectives and the actual service performance data will be reviewed annually or biannually. Adjustments will be based on historical performance data, new business needs, and technological advancements.

## 4. General Terms

- Effective Date and Amendments: Specifies how the SLA can be initiated, adjusted, or terminated, providing a framework for the ongoing management and evolution of the service agreement.

# Service Level Indicators (SLIs) for SafeBank

## 1. System Availability

- Title: Monthly System Uptime
- Description: Measures the percentage of time the system is operational and accessible by users within a given month, excluding any scheduled maintenance periods.
- Measurement Method: Total operational minutes / Total scheduled available minutes x 100

## 2. Transaction Processing Performance

- Title: Transaction Completion Rate within 2 Seconds
- Description: Measures the percentage of financial transactions (e.g., deposits, withdrawals, transfers) that are completed within 2 seconds under normal load conditions.
- Measurement Method: Number of transactions completed within 2 seconds / Total transactions x 100

## 3. API Error Rates

- Title: API Error Rate
- Description: Measures the percentage of API calls that result in errors, reflecting the stability and reliability of the API.
- Measurement Method: Number of failed API requests / Total API requests x 100

## 4. Data Security Compliance

- Title: Data Encryption Compliance Rate
- Description: Measures the compliance rate with established data encryption standards for data at rest and in transit, ensuring data security and protection against breaches.
- Measurement Method: Compliance incidents reported / Total compliance checks x 100

## 5. Support Response Times

- Title: Support Response Timeliness
- Description: Measures the percentage of customer support queries responded to within 4 hours during business hours, indicating the efficiency and responsiveness of the customer support team.
- Measurement Method: Number of queries responded within 4 hours / Total queries received x 100

# Service Level Objectives (SLOs) for SafeBank

## 1. System Availability

- Title: High System Availability
- Objective: Maintain at least 99% system availability each month, excluding scheduled maintenance.
- Description: This SLO is critical for ensuring that SafeBank's services are consistently available to customers, reflecting the platform's reliability and building user trust.

## 2. Transaction Processing Performance

- Title: Transaction Efficiency
- Objective: Ensure that 99% of all transactions are processed within 2 seconds under normal load conditions.
- Description: This performance target is essential for a smooth customer experience, minimising wait times and enhancing satisfaction during financial transactions.

## 3. API Error Rate

- Title: API Reliability
- Objective: Maintain API error rates below 1%.
- Description: Keeping API error rates low is imperative to ensure stable and reliable interactions with SafeBank's services, directly impacting user experience and system integrity.

## 4. Data Security Compliance

- Title: Data Protection Compliance
- Objective: Achieve 100% compliance with data encryption standards for data at rest and in transit.
- Description: This SLO underscores the importance of stringent data security measures to protect sensitive financial and personal information, meeting regulatory requirements and maintaining customer trust.

## 5. Support Response Times

- Title: Responsive Customer Support
- Objective: Respond to 95% of customer support queries within 4 hours during business hours.
- Description: Prompt response times are crucial for addressing customer concerns effectively, ensuring high levels of service satisfaction and operational responsiveness.
