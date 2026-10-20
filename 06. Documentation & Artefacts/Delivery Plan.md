---
title: "Delivery Plan"
aliases:
  - "Stage Plan"
  - "Tranche Plan"
  - "Work Plan"
  - "Data Sprint Plan"
tags:
  - praxis-framework
  - pillar/method
  - section/delivery-documents
  - type/artefact
  - praxis/data-bi
  - topic/delivery-plan
  - discipline/dataops
pillar: "Method"
section: "Delivery Documents"
subarea: "Documentation"
type: "artefact"
status: "published"
source: "Praxis Framework"
source_url: "https://www.praxisframework.org"
created: 2026-10-17
updated: 2026-10-20
---

> [!NAV] Navigation
> **Vault**: [[00 - Praxis Framework Overview|Praxis Overview]] > **Section**: [[00 - Overview|Delivery Documents]]
> **Pillar**: Method | **Type**: `artefact`

# Delivery Plan: The Medallion Platform Sprint & Release Roadmap

> [!SUMMARY] Overview
> The Delivery Plan specifies the operational execution roadmap, sprint cadences, resource allocations, cloud FinOps budgets, and quality tolerances for delivering an enterprise Lakehouse and BI analytics platform.

## Purpose
The **Delivery Plan** is the operational master document governing the execution of a project stage or programme tranche. 

In enterprise Data Engineering, Analytics Engineering, and Business Intelligence (BI), traditional waterfall Gantt charts fail because stakeholders cannot evaluate analytical logic until data is rendered in reports. Praxis adapts the Delivery Plan into an **Agile-Medallion Delivery Plan** structured around **Vertical End-to-End Value Slices** rather than siloed horizontal layers.

```
                 The Vertical Slice Data Delivery Strategy
                 
                      Sprint 1-2              Sprint 3-4              Sprint 5-6
                  (Customer Slice)         (Orders Slice)        (Executive BI Slice)
                ┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
Presentation    │ PBI Customer 360 │    │ Orders Drilldown │    │ Executive Margin │
Semantic Layer  │ DAX Active Churn │    │ Settled Revenue  │    │ Enterprise SSOT  │
Gold Layer      │ Dim Customers    │    │ Fct Daily Orders │    │ Star Schema Mart │
Silver Layer    │ dbt Cleaned CRM  │    │ dbt POS Billing  │    │ Conformed Joins  │
Bronze Layer    │ Raw CDC Ingestion│    │ Kafka Streaming  │    │ Automated DLQ    │
                └──────────────────┘    └──────────────────┘    └──────────────────┘
```

---

## Exemplar: Enterprise Lakehouse & BI Delivery Roadmap

The following Delivery Plan details a 12-week operational execution cycle for migrating legacy reporting to a modern Databricks/Snowflake and Power BI platform:

| Sprint / Stage | Medallion Focus | Key Engineering Deliverables | Technical Tooling | Acceptance Criteria & Quality Gate |
| :--- | :--- | :--- | :--- | :--- |
| **Sprint 0: Mobilisation** | Platform Foundations | Terraform IaC multi-tier environments (Dev/Staging/Prod); Unity Catalog metastore; Git CI/CD. | Terraform, Azure Entra ID, GitHub Actions | Zero-defect automated deployment; developer sandboxes provisioned. |
| **Sprint 1: Bronze Ingestion** | Raw Landing | Ingest historical SAP ERP & Salesforce raw tables; configure automated schema validation. | Fivetran, Azure Data Factory, Delta Lake | Ingestion payload conforms to [[Product Documents#1. The Producer-Consumer Data Contract\|Data Contracts]]; DLQ active. |
| **Sprint 2: Silver Modeling** | Conformed Staging | Cleanse customer and store data; standardize date formats; build SCD Type 2 dimension models. | dbt Core, SQL, Great Expectations | 100% passing tests for primary keys (`unique`, `not_null`); zero orphan foreign keys. |
| **Sprint 3: Gold Marts** | Curated Star Schema | Develop `fct_daily_sales` and `dim_product_sku`; optimize clustering keys and z-ordering. | dbt, Snowflake / Databricks SQL | Pipeline execution runtime completes before 06:00 UTC cutoff; GL delta $< 0.001\%$. |
| **Sprint 4: Semantic Layer** | Metric Certification | Implement certified metric definitions (Net Margin, Churn, ARR); configure XMLA endpoints. | dbt Semantic Layer, Power BI Shared Datasets | Financial metrics reconciled with Corporate General Ledger; sign-off from Finance Controller. |
| **Sprint 5: Executive BI** | Presentation & UX | Build Executive Revenue Cockpit; configure Row-Level Security (RLS); optimize visual loading. | Power BI, DAX Studio, Tabular Editor | Cold visual render time $< 2.0$ seconds; 100% passing RLS security audit. |
| **Sprint 6: Closure & Handover** | DataOps Handover | Deliver pipeline runbooks; configure PagerDuty escalation; execute spreadsheet deprecation. | Datadog, Slack, PagerDuty | Operations team accepts support handover; legacy Excel extracts decommissioned. |

---

## Operational Control Tolerances

The Delivery Plan enforces strict boundaries within which the management team can operate without escalating to the Project Sponsor:

- **Schedule Tolerance**: $\pm 3$ business days on sprint milestone commitments; nightly batch pipeline completion cutoff hard-capped at **06:00 UTC**.
- **Financial Tolerance (Cloud FinOps)**: $\pm 10\%$ variance on daily virtual warehouse credit consumption; any query running $> 5$ minutes terminated automatically.
- **Data Quality Error Budget**: $0.00\%$ tolerance for duplicate primary keys or corrupted general ledger reconciliations; non-fatal attribute anomalies capped at $< 0.10\%$.
- **Performance Budget**: $95\%$ of dashboard visuals must render within **2.0 seconds** on a standard broadband connection.

---

## Flashcard Q&A

- **Q:** Why does a modern Data Delivery Plan emphasize "vertical slicing" over horizontal layer delivery?
    - **A:** Horizontal delivery (e.g., spending 4 months only ingesting data) delivers zero visible business value and delays feedback. Vertical slicing delivers an end-to-end slice (Bronze through to BI) in every sprint, enabling business validation every 2 weeks.

- **Q:** What is the role of "Sprint 0" in a data platform delivery plan?
    - **A:** Sprint 0 establishes infrastructure and governance foundations: deploying Infrastructure as Code (Terraform), provisioning isolated Dev/Staging/Prod environments, configuring Git repositories, and establishing data catalog access.

- **Q:** What is a "Performance Budget" in a Business Intelligence Delivery Plan?
    - **A:** A contractual tolerance specifying maximum permissible visual render times (e.g., cold cache $< 2.0$s, slicer recalculation $< 800$ms), ensuring developers optimize underlying SQL and DAX models before production release.

---
## Navigation & Related Notes
- **Up**: [[00 - Overview|Delivery Documents Overview]]
- **Previous**: [[Delivery Documents]]
- **Next**: [[Documentation]]

### Related Concepts & Artefacts
- [[00 - Praxis Framework Overview|Praxis Framework Master MOC]]
- [[Delivery Process]]
- [[Control Management Plan]]
- [[Product Documents]]
- [[Capability Maturity]]
