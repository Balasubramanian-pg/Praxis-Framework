---
title: "Risk Management"
aliases:
  - "Risk Management"
  - "General Principles of Risk Management"
  - "Data Risk Management"
tags:
  - praxis-framework
  - pillar/knowledge
  - section/risk-management
  - type/management-area
  - discipline/data-governance
  - discipline/dataops
pillar: "Knowledge"
section: "Risk Management"
subarea: "Management"
type: "management-area"
status: "published"
source: "Praxis Framework"
source_url: "https://www.praxisframework.org"
created: 2026-10-17
updated: 2026-10-19
---

> [!NAV] Navigation
> **Vault**: [[00 - Praxis Framework Overview|Praxis Overview]] > **Section**: [[00 - Overview|Risk Management]]
> **Pillar**: Knowledge | **Type**: `management-area` | **Specialization**: Data Risks, Schema Drift & DataOps

# Comprehensive Study Notes: Risk Management

## General Principles of Risk Management

- **Definition**: Risk management is the function that allows individual risk events and overall risk to be understood and managed proactively. It aims to optimise the chances of success by minimising threats and maximising opportunities.

### The Goals of Risk Management

1. Ensure that the levels of **overall risk** within a project, programme, or portfolio are compatible with organisational objectives and risk appetite.
2. Ensure that individual **risks and their responses** are identified and managed.
3. Minimise the impact of **threats** to the objectives.
4. Optimise the realisation of **opportunities** within the scope of the work.

### Understanding Risk: Events vs. Uncertainty

- **Risk Event**: An identifiable event that, *if it occurs*, will have an adverse (threat) or beneficial (opportunity) impact on objectives.
- **Uncertainty**: The non-specific risk inherent in estimations, innovative technology, or rapidly shifting business contexts.

---

## Modern Data Risk Management: Five Failure Modes in Data & Analytics

In software application development, bugs produce visible compiler or runtime errors. In **Data Engineering and Business Intelligence**, the most catastrophic risks occur **silently**—pipelines run to completion with exit code 0, yet the underlying numbers delivered to executives are completely wrong.

```
Traditional IT Risk:       Application Crashes / Server Down (Explicit Failure)
Data & Analytics Risk:     Pipelines Complete Successfully, but Data is Wrong (Silent Corruption)
```

### 1. Schema Drift & Breaking Upstream Contract Changes

- **The Threat**: Upstream software developers alter an operational database (renaming `cust_id` to `customer_uuid`, changing an integer to a string, or dropping a legacy column) without notifying the data team. Ingestion pipelines fail, or worse, load corrupted null values downstream.
- **Response Strategy**:
  - **Proactive Mitigation**: Implement strict **Data Contracts** with upstream product teams.
  - **Technical Defense**: Use schema evolution policies (`mergeSchema` in Delta Lake / Iceberg) and schema registry validation in ingestion tools (Kafka, Fivetran, Airbyte).

### 2. Silent Data Corruption & Semantic Degradation

- **The Threat**: Upstream business logic changes (e.g., introducing a new order status code `REFUNDED_PENDING`), causing downstream revenue metrics to double-count transactions. No technical errors occur, but the CEO views inaccurate quarterly sales figures.
- **Response Strategy**:
  - **Automated Quality Gates**: Integrate assertions into transformation layers using **dbt test**, **Great Expectations**, or **Soda Core**.
  - **Fail-Fast Boundaries**: Configure pipelines to halt table promotion from Silver to Gold if primary key uniqueness or null threshold constraints are violated.

### 3. Pipeline SLA Breaches & Latency Drift

- **The Threat**: Unexpected volume spikes (e.g., Black Friday transaction floods) cause 2-hour nightly ETL batch jobs to stretch to 8 hours, failing to refresh executive dashboards before 08:00 AM business standups.
- **Response Strategy**:
  - **Auto-Scaling Compute**: Use multi-cluster virtual warehouses and auto-scaling Databricks pools to handle seasonal throughput spikes.
  - **Observability Alerting**: Establish automated heartbeat monitors alerting Slack/PagerDuty whenever ingestion lag exceeds predefined tolerance thresholds.

### 4. PII Exposure & Regulatory Compliance Violations (GDPR, HIPAA, CCPA)

- **The Threat**: Unstructured logs or new CRM fields containing unmasked Personally Identifiable Information (PII) land in raw object storage (S3/ADLS), violating data residency or compliance laws and exposing the organization to severe regulatory fines.
- **Response Strategy**:
  - **Automated PII Scanning**: Run classification routines during Bronze ingestion to detect social security numbers, emails, and payment card data.
  - **Access Governance**: Enforce dynamic column-level masking and row-level security policies through enterprise data catalogs (Unity Catalog, Microsoft Purview, Snowflake Data Governance).

### 5. Dashboard Abandonment & Business Distrust

- **The Threat**: Business stakeholders discover a discrepancy between the new enterprise Power BI model and their legacy manual Excel spreadsheets. Trust evaporates, stakeholders abandon the certified BI model, and return to ungoverned shadow IT.
- **Response Strategy**:
  - **Parallel Run Validation**: Run certified BI models concurrently alongside legacy reports for 30 to 60 days to reconcile and explain mathematical variances.
  - **Data Lineage Transparency**: Expose interactive data lineage graphs showing users exactly how every metric is calculated from source to report.

---

## The Risk Management Procedure

1. **Plan**: Establish the **Risk Management Plan**, defining risk thresholds, qualitative severity matrices (Probability vs. Impact), and escalation pathways.
2. **Initiate**: Appoint Risk Owners across Data Engineering, Analytics, and Business Governance.
3. **Identify**: Conduct collaborative data failure mode workshops (FMEA) to identify single points of pipeline failure and upstream dependencies.
4. **Assess**: Quantify data downtime risks using qualitative (RAG rating) and quantitative techniques (Expected Monetary Value of inaccurate regulatory reporting).
5. **Plan Responses**:
   - **Avoid**: Refactor single-threaded monolithic pipelines into decoupled micro-pipelines.
   - **Reduce**: Deploy automated data quality test suites to catch bad records before downstream mart ingestion.
   - **Transfer**: Secure cloud vendor Service Level Agreements (SLAs) for managed database infrastructure.
   - **Accept**: Acknowledge non-critical latency in historical analytical models where real-time freshness is not required.
6. **Implement Responses**: Implement automated retry policies, dead-letter queues (DLQs) for malformed records, and data circuit breakers.

---

## Risk Management in Projects, Programmes, and Portfolios

### Projects
- Manages localized technical risks: Specific API connector rate limits, pipeline performance bottlenecks, or dbt model compilation failures.

### Programmes
- Manages systemic domain risks: Harmonizing master customer definitions across multiple constituent project streams, preventing conflicting business definitions from reaching the enterprise lakehouse.

### Portfolios
- Manages organizational strategic risk: Assessing data vendor lock-in risks, overall cloud compute budget volatility, and cybersecurity posture across all data platforms.

---

## Flashcard Q&A

- **Q:** Why is "silent data corruption" considered the most dangerous risk in Data & BI projects?
  - **A:** Because data pipelines complete without error codes, yet corrupt business metrics are delivered to decision-makers, leading to flawed executive choices and regulatory penalties.

- **Q:** How do automated DataOps testing gates mitigate schema drift risk?
  - **A:** They enforce validation checks (uniqueness, type assertions, allowed values) before data is merged from Silver to Gold, preventing malformed upstream data from polluting certified business marts.

- **Q:** What is the recommended mitigation strategy for "Dashboard Abandonment"?
  - **A:** Conduct parallel reporting runs alongside legacy spreadsheets for 30 to 60 days, openly reconcile calculation differences, and publish transparent data lineage to build stakeholder trust.

- **Q:** What is the function of a Dead-Letter Queue (DLQ) in data pipeline risk management?
  - **A:** It diverts malformed, unparseable source records into an isolated holding container for engineering inspection, allowing the main pipeline to continue processing clean records without aborting the entire batch.

---

## Navigation & Related Notes
- **Up**: [[00 - Overview|Risk Management Overview]]
- **Next**: [[Manage Risk]]

### Related Concepts & Artefacts
- [[Risk Management Plan]]
- [[Risk Register]]
- [[Scope Management|Data Contracts]]
- [[Control|DataOps Quality Gates]]
- [[General Principles of Financial Management|FinOps]]
