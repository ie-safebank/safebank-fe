# Monitoring Strategy Design for SafeBank

## Introduction

This document outlines a robust monitoring strategy for SafeBank, a modern online banking platform serving 2000 users. The strategy leverages Azure's monitoring tools to ensure the system meets high standards of reliability, performance, security, and scalability. The cost estimations provided are based on calculations using the Azure Pricing Calculator, ensuring alignment with budgetary constraints.

## Objectives

1. System Reliability and Performance: Ensure SafeBank achieves 99% uptime and maintains transaction speeds and data retrieval times within defined thresholds.
2. Proactive Incident Detection: Identify and address performance or security issues before they impact users.
3. Cost Efficiency: Manage Azure service costs effectively while providing comprehensive monitoring.

## Tools and Technologies

- Azure Monitor: Centralized monitoring for metrics and logs
- Application Insights: Application performance management and diagnostics
- Azure Log Analytics: In-depth log analysis and querying
- Azure Security Center: Continuous security monitoring and compliance support

## Cost Estimation

We used the Azure Pricing Calculator to estimate the cost of using Azure as a cloud platform for SafeBank. We consider these costs to be realistic predictions as the pricing calculator platform provides detailed pricing calculations and clearly outlines costs for all services, ensuring transparency and predictability when planning budgets. Secondly, to calculate the pricing we considered the Pay-as-you-go pricing model using Azure's pricing is usage-based, which will allow SafeBank to scale resources up or down and pay only for what we use, reducing unnecessary expenses and aligning costs with actual demand.

Using the Azure Pricing Calculator without the enterprise discount:

- Data Ingestion: 1000 GB/month for 2000 users at an average cost of $4.30 per GB
  - Azure Monitor: $2,150/month
  - Application Insights: $2,150/month
- Total Monitoring Cost: Approximately $4,300/month

This includes data ingestion and analysis but excludes extended data retention and additional alerts.

## Key Metrics (SLIs)

1. Uptime Percentage: Ensure system availability meets or exceeds 99% monthly
2. Transaction Speed: Process 99% of transactions within 2 seconds
3. API Error Rate: Keep API error rates below 1%
4. Data Retrieval Time: Ensure 95% of data retrievals are completed within 3 seconds
5. Load Handling Capability: Maintain performance under double the average load during peak times without performance degradation

## Expanded Alerting Strategy

1. Uptime Alerts: Triggered if uptime drops below 99%, notifying the infrastructure team
2. Transaction Speed Alerts: Activated if transaction completion times exceed 2 seconds, prompting immediate application checks
3. API Error Alerts: Alerted if API errors exceed 1%, involving the backend development team
4. Data Retrieval Alerts: Monitored for 3-second thresholds, with notifications sent to database administrators
5. Load Alerts: Triggered if system performance degrades under peak load, notifying both infrastructure and operations teams

## Detailed Incident Response for Each SLI

1. Uptime and Performance Issues: Automated scaling actions or traffic rerouting are triggered. The infrastructure team investigates root causes like resource saturation or regional outages
2. Slow Transactions: Application teams analyze logs and metrics to identify bottlenecks, such as inefficient code or database latency
3. API Errors: Backend teams assess failure types and patterns using Application Insights to address misconfigurations or bugs
4. Data Retrieval Delays: Database administrators optimize queries or adjust indexing to restore retrieval times
5. Load Handling Failures: Operations teams review scaling policies and add capacity manually if automated scaling falls short

## Comprehensive Reporting for All SLIs

1. Weekly Reports: Focus on individual SLIs, highlighting any deviations and actions taken. These reports are shared with the technical team and stakeholders
2. Monthly Summaries: Provide a high-level overview of system health, performance trends, and resolved incidents
3. Quarterly Reviews: Include detailed analysis of all SLIs to assess long-term trends, propose optimizations, and validate system scalability

## Log Management

1. Collection: Logs from all applications, services, and virtual machines are collected using Azure Monitor
2. Storage: Stored in Azure Blob Storage with a standard 90-day retention policy
3. Analysis: Log Analytics is used for advanced querying to identify patterns, anomalies, and root causes

## Data Visualization and Reporting

1. Dashboards: Azure Monitor dashboards display real-time SLI metrics, historical data, and alert statuses
2. Interactive Filtering: Dashboards allow filtering by region, user segment, or system component for deeper insights

## Incident Management Integration

1. Automated Ticketing: Alerts automatically create incident tickets in an IT Service Management tool for tracking and resolution
2. Escalation Policies: Define escalation paths for critical alerts to ensure rapid resolution
3. Proactive Monitoring: Automated responses (e.g., scaling or retries) are implemented for predictable issues

## Cost Optimization

1. Review and Adjust: Monthly reviews of ingestion rates and data retention policies ensure costs align with usage patterns
2. Scaling Policies: Dynamically scale monitoring resources during off-peak hours to reduce costs

## Documentation and Training

1. Documentation Updates: The monitoring strategy documentation is updated biannually or after major system changes
2. Training Programs: Teams are trained quarterly on using monitoring tools and interpreting metrics to foster proactive issue resolution

## Implementation and Use of Azure Workbook

The Azure Workbook will serve as a central dashboard to monitor SafeBank's key metrics, providing real-time and historical insights into system performance and health.

### Purpose

- Visualize all SLIs: uptime, transaction speed, API error rates, data retrieval times, and system load
- Support operational decisions through interactive charts and filters
- Enable quick root cause analysis during incidents

### Design and Features

- Data Sources: Application Insights and Azure Log Analytics for unified metrics
- Visualizations:
  - Uptime (time-series chart), transaction speed (bar graph), API errors (pie chart), and system load (performance graph)
- Interactive Filters: Time ranges, regions, and service-specific views for customization
- Alert Integration: Link alerts directly to detailed logs for deeper analysis

### Implementation Steps

1. Create and Configure: Set up the workbook in Azure Monitor with visualizations for each SLI
2. Test: Validate accuracy of metrics and usability of visualizations
3. Share: Grant access to operations and stakeholders for daily use

### Usage

- Daily Monitoring: Real-time tracking of SLIs
- Incident Management: Centralized view for analyzing issues and trends
- Reporting: Source for weekly and monthly performance reviews

### Maintenance

- Update the workbook monthly to refine metrics and visualizations
- Gather stakeholder feedback to improve usability

The Azure workbook is crucial as it tracks SafeBank's performance in order for the team to maintain the site's reliability and meet every one of our goals in the short and long term.

## Conclusion

This monitoring strategy ensures SafeBank achieves its operational and performance goals while maintaining cost efficiency. By leveraging Azure's tools, the strategy provides a detailed framework for monitoring all SLIs, proactive incident response, and data-driven decision-making. Regular reviews and updates will keep the strategy aligned with evolving business needs and technological advancements.
