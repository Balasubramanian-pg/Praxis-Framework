---
title: "Control"
aliases:
  - "Control"
  - "DataOps Quality Control"
tags:
  - praxis-framework
  - pillar/knowledge
  - section/quality-management
  - type/concept
  - discipline/dataops
  - discipline/quality-engineering
pillar: "Knowledge"
section: "Quality Management"
subarea: "Delivery"
type: "concept"
status: "published"
source: "Praxis Framework"
source_url: "https://www.praxisframework.org"
created: 2026-10-17
updated: 2026-10-19
---

> [!NAV] Navigation
> **Vault**: [[00 - Praxis Framework Overview|Praxis Overview]] > **Section**: [[00 - Overview|Quality Management]]
> **Pillar**: Knowledge | **Type**: `concept` | **Specialization**: DataOps & Data Quality Gates

# Comprehensive Study Notes: Control

## General Principles of Control

- **Definition**: Control is the management function that involves monitoring actual performance against approved baselines, updating delivery documents as necessary, and taking corrective action to manage deviations.
- Control is required throughout the entire life cycle, but is primarily concentrated in the **delivery process**.

### The Goals of Control

1. Review performance against established **baselines**.
2. Evaluate the effect of actual performance to date on **future plans**.
3. Take corrective action to restore performance to planning tolerances or negotiate revised baselines.

---

## DataOps Quality Gates & Pipeline Observability

In traditional project control, managers compare weekly work package timesheets against Gantt charts. In modern **Data Engineering, Analytics Engineering, and Business Intelligence**, control is a continuous, automated engineering discipline known as **DataOps**.

Data pipelines process billions of records daily. Manual inspection is impossible; control must be automated directly into the pipeline execution lifecycle through **automated quality gates** and **pipeline observability**.

```
[Ingestion Pipeline] ──> [Data Quality Gate: dbt / Great Expectations] ──> Pass: Merge to Gold Mart
                                       │
                                       └──> Fail: Quarantine to DLQ & PagerDuty Alert
```

### 1. Cybernetic Control in DataOps: The Automated Feedback Loop

Praxis defines cybernetic control as an active steering mechanism based on a feedback loop:
1. **System Monitored**: Ongoing lakehouse ingestion and transformation runs.
2. **Feedback Generated**: Data quality metrics recorded (row counts, null percentages, latency, schema hash).
3. **Comparison Against Baseline**: Automated assertion checks against predefined tolerances (Data Contracts).
4. **Corrective Steering**:
   - If deviations are minor (within warning tolerance): Pipeline completes; warning logged to DataOps telemetry.
   - If deviations exceed tolerance (e.g., duplicate customer IDs or negative transaction values): Pipeline execution automatically halts before bad data merges into downstream Gold marts.

### 2. The Six Data Quality Dimensions as Control Baselines

Every data asset must have explicit control baselines established across the six universal dimensions of data quality:

| Dimension | Control Baseline Definition | Implementation in Modern Stack |
| :--- | :--- | :--- |
| **Freshness (Timeliness)** | Maximum acceptable elapsed time between source event and lakehouse landing | Ingestion heartbeat checks; dbt source freshness tests (`warn_after: 12h, error_after: 24h`) |
| **Completeness** | Maximum acceptable percentage of missing/null values in critical attributes | Column nullability constraints (`not_null` tests in dbt/Soda) |
| **Uniqueness** | Prevention of duplicate records in primary keys or grain definitions | Primary key deduplication checks (`unique` test on `order_id`) |
| **Validity (Conformity)** | Conformance to expected formats, regex patterns, or allowed domain values | `accepted_values: ['PENDING', 'SHIPPED', 'CANCELLED']`; ISO-8601 date validation |
| **Accuracy** | Values represent real-world events within plausible mathematical bounds | Numeric range assertions (`unit_price > 0`, `discount_rate between 0 and 1`) |
| **Consistency** | Referential integrity between downstream fact tables and dimensional parent keys | Foreign key relationship assertions (`relationships` test between fact and dimension) |

### 3. Implementation of Quality Gates: dbt, Great Expectations, and DLT

- **dbt (Data Build Tool) Tests**:
  - Executed during pipeline transformation: `dbt test --select tag:production_quality_gate`.
  - Singular SQL assertions and generic tests fail the CI/CD deployment or batch job if constraints are broken.
- **Delta Live Tables (DLT) Expectations**:
  - Declarative data quality rules written directly in pipeline DDL:
    - `CONSTRAINT valid_timestamp EXPECT (order_date IS NOT NULL) ON VIOLATION DROP ROW`
    - `CONSTRAINT valid_account EXPECT (account_balance >= 0) ON VIOLATION FAIL UPDATE`
- **Great Expectations / Soda Core**:
  - Contract validation executed prior to ingestion and prior to reporting model refresh.

### 4. Go/No-Go Gateways for Model Promotion (Slim CI)

In DataOps, Go/No-Go control is exercised through automated CI/CD deployment pipelines:
- **Zero-Copy Clone / Ephemeral Schemas**: When a developer opens a pull request, the CI/CD system creates an isolated temporary schema (e.g., Snowflake zero-copy clone or Databricks temporary catalog).
- **Automated Regression Testing**: The pipeline compiles and runs all modified models and tests on ephemeral data.
- **Merge Gate**: Only when 100% of data quality and performance assertions pass does the gate permit merging to the `main` production branch.

### 5. Post-Control: Incident Post-Mortems & Data Downtime Metrics

When pipeline failures or silent corruption events occur, post-control ensures continuous systemic learning:
- **Incident Logging in Daily Log & Issue Register**: Recording the root cause (e.g., upstream SAP API deprecation).
- **Mean Time to Detection (MTTD)**: Measuring the elapsed time between when corrupt data landed and when monitoring flagged it.
- **Mean Time to Resolution (MTTR)**: Measuring the duration required to isolate, fix, and backfill clean data.

---

## Control Methods and Techniques

- **Cybernetic Control**: Continuous operational steering via pipeline alerts, automated test suites, and RAG status monitoring.
- **Go/No-Go Control**: Gateway stage-gate approvals between lifecycle phases (e.g., Data Feasibility Gate, Architecture Approval Gate, Production Cutover Gate).
- **Post-Control**: Retrospective reviews, lessons learned capture, and data platform downtime post-mortems.

---

## Control in Projects, Programmes, and Portfolios

### Projects
- Monitored by the Data Project Manager / Scrum Master: Sprint burndown velocity, daily pipeline SLA achievement, and dbt test pass rates.

### Programmes
- Monitored by the Data Programme Director: Cross-project integration milestones, enterprise master data conformity, and platform compute budget variances.

### Portfolios
- Monitored by the Chief Data Officer (CDO) / Portfolio Board: Overall platform ROI, organizational data literacy adoption metrics, and regulatory audit compliance.

---

## Flashcard Q&A

- **Q:** How does cybernetic control apply to modern DataOps pipelines?
  - **A:** It acts as an automated steering feedback loop where continuous pipeline metrics are compared against Data Contract baselines, automatically triggering alerts or halting execution when tolerances are breached.

- **Q:** Name four of the six universal dimensions of data quality monitored in DataOps.
  - **A:** Freshness (timeliness), Completeness, Uniqueness, Validity, Accuracy, and Consistency.

- **Q:** What is the function of Delta Live Tables (DLT) Expectations in pipeline control?
  - **A:** They define declarative constraints on streaming and batch data, with automated policies to either drop malformed rows, retain with warnings, or fail the entire update.

- **Q:** How does "Slim CI" implement Go/No-Go control in analytics engineering?
  - **A:** It automatically compiles and tests modified models in temporary ephemeral schemas during pull requests, preventing untested pipeline code from reaching production.

---

## Navigation & Related Notes
- **Up**: [[00 - Overview|Quality Management Overview]]
- **Previous**: [[Control Management Plan]]
- **Next**: [[Exercise Control]]

### Related Concepts & Artefacts
- [[Scope Management|Data Contracts]]
- [[General Principles of Risk Management|Data Risks]]
- [[General Principles of Financial Management|FinOps]]
- [[Issue Register|DataOps Incidents]]
- [[Delivery Process]]
