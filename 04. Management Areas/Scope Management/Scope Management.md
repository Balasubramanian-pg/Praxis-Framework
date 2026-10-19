---
title: "Scope Management"
aliases:
  - "Scope Management"
  - "Scope Management in Data & BI"
tags:
  - praxis-framework
  - pillar/knowledge
  - section/scope-management
  - type/management-area
  - discipline/data-engineering
  - discipline/business-intelligence
pillar: "Knowledge"
section: "Scope Management"
subarea: "Management"
type: "management-area"
status: "published"
source: "Praxis Framework"
source_url: "https://www.praxisframework.org"
created: 2026-10-17
updated: 2026-10-19
---

> [!NAV] Navigation
> **Vault**: [[00 - Praxis Framework Overview|Praxis Overview]] > **Section**: [[00 - Overview|Scope Management]]
> **Pillar**: Knowledge | **Type**: `management-area` | **Specialization**: Data Engineering & BI

# Comprehensive Study Notes: Scope Management

## General Principles of Scope Management

- **Definition**: Scope management is the function that identifies, defines, and controls the objectives of the work, in the form of outputs, outcomes, and benefits.

- **Scope**: The totality of outputs, outcomes, and benefits that should be delivered by a project, programme, or portfolio.

### The Goals of Scope Management

1. Identify stakeholder wants and needs.
2. Specify the outputs, outcomes, and benefits that will meet the agreed requirements.
3. Maintain and control the scope throughout the life cycle.

> [!IMPORTANT]
> The complexity of the scope is the main distinguishing factor between work that is managed as a project, a programme, or a portfolio. A key element in this decision is whether achieving the objectives requires significant changes to business-as-usual. Extensive and complex change is a strong indicator that programme governance is more appropriate.

---

## Scope Management for Data Engineering, Analytics & Business Intelligence

Traditional project management defines scope through static physical deliverables (Product Breakdown Structures). In modern **Data Engineering**, **Analytics Engineering**, and **Business Intelligence**, scope is fundamentally dynamic because data sources evolve, business questions shift, and data pipelines are living systems.

### 1. The Medallion Architecture Scope Breakdown

In modern Lakehouse platforms (Databricks, Snowflake, Microsoft Fabric, Google BigQuery), scope is structured across three verified data quality tiers:

```
[Source APIs & OLTP Databases]
              │
              ▼
   ┌──────────────────────┐
   │    Bronze Tier       │  Raw Ingestion, immutable landing, CDC streaming, schema-on-read
   └──────────┬───────────┘
              │
              ▼
   ┌──────────────────────┐
   │    Silver Tier       │  Cleansed, conformed dimensions, deduplicated, surrogate keys
   └──────────┬───────────┘
              │
              ▼
   ┌──────────────────────┐
   │     Gold Tier        │  Aggregated Star Schemas, domain marts, certified business metrics
   └──────────┬───────────┘
              │
              ▼
   ┌──────────────────────┐
   │    Semantic Layer    │  Power BI / Tableau models, DAX measures, Row-Level Security (RLS)
   └──────────────────────┘
```

- **Bronze Layer Scope (Raw Landing)**:
  - Scoping ingestion frequency: Batch vs. Micro-batch vs. Real-time Change Data Capture (CDC).
  - Scope boundaries: Preserving source fidelity without transformations; partitioning strategies; raw audit columns (`_ingested_at`, `_source_file`).
- **Silver Layer Scope (Conformed & Cleansed)**:
  - Scoping data quality expectations: Null handling, type casting, deduplication, standardization.
  - Enterprise conformity: Resolving customer IDs across disparate CRM, ERP, and billing systems into unified dimensional surrogate keys.
- **Gold Layer Scope (Domain Business Marts)**:
  - Scoping Kimball Star Schema fact tables (transactional, accumulating snapshot, periodic snapshot) vs. One Big Table (OBT) analytical models.
  - Pre-aggregating critical enterprise KPIs (ARR, Net Margin, Churn Rate).
- **Semantic & Visualisation Scope**:
  - Scoping certified Power BI / Tableau datasets, DAX measure calculation logic, and role-based Row-Level Security (RLS).

### 2. Producer-Consumer Data Contracts

The single largest cause of scope failure in data initiatives is **upstream application drift** (e.g., software engineers altering an OLTP database column or changing an API payload without notifying the data team).

- **Data Contracts as Scope Baselines**:
  - A formal Data Contract establishes an explicit scope agreement between source product teams (producers) and data platform teams (consumers).
  - **Contract Specifications**:
    1. **Schema Definition**: Exact field names, data types, nullability, and allowed categorical values.
    2. **Freshness SLAs**: Guaranteed arrival cadences (e.g., hourly, daily by 06:00 UTC).
    3. **Semantic Meaning**: Business definitions of values (e.g., defining what constitutes an "active subscription").
    4. **Change Notification Protocol**: A mandatory 30-day notice window before any upstream schema alteration is merged.

### 3. Taming Ad-Hoc Scope Creep: Data Products vs. Exploratory Spikes

Without rigorous scope management, data teams quickly become "ad-hoc ticket factories," overwhelmed by executive requests for one-off Excel dumps.

- **Data Product Scoping**:
  - Governed, versioned, automated assets deployed to the lakehouse catalog with automated CI/CD and data quality tests.
  - Requires formal intake, business case evaluation, and acceptance criteria.
- **Exploratory Analytics Spikes**:
  - Timeboxed sandbox investigations (1 to 3 days) to evaluate raw data viability before committing to production pipeline engineering.
  - Results in a feasibility recommendation, not a permanent production asset.

---

## The Five Core Areas of Scope Management

1. **Requirements Management**:
   - Captures and analyses stakeholder views of the work's objectives.
   - Requirements must be **"solution-free"**—describing the analytical need and business decision to be made, rather than specifying the underlying SQL dialect or storage engine.
2. **Solutions Development**:
   - Takes agreed analytical requirements and designs the technical lakehouse pipelines, dbt transformation DAGs, and storage models that optimize performance and compute cost.
3. **Benefits Management**:
   - Tracks data deliverables to actual business outcomes (e.g., reducing inventory stockouts by 12% or accelerating monthly financial close from 10 days to 2 days).
4. **Change Control**:
   - A formal procedure that evaluates proposed modifications to pipeline logic, schema definitions, or reporting metrics before changes are merged.
5. **Configuration Management**:
   - Version control of data pipelines, dbt models, catalog table metadata, semantic layer definitions, and Terraform infrastructure code.

---

## Managing Scope: Linear vs. Flexible Approaches

- **Linear / Predictive Approach**:
  - Applicable to mature, well-understood data migrations (e.g., migrating an existing on-premises SQL Server data warehouse to Snowflake with static schemas).
  - Scope is defined and baselined upfront, with rigid change control.
- **Flexible / Adaptive Approach (Agile DataOps)**:
  - Essential for exploratory data science, greenfield customer analytics, and generative AI initiatives where requirements evolve as data is discovered.
  - Uses iterative sprint delivery: Ingestion Spike -> Bronze Landing -> Silver Cleansing -> Gold Modeling -> BI Showcase.

---

## Scope Management in Projects, Programmes, and Portfolios

### Projects
- **Product Breakdown Structure (PBS)**: Decomposes data deliverables: Data Connectors -> Staging Tables -> Dimension Tables -> Fact Tables -> Semantic Models -> Executive Dashboards.
- **Work Breakdown Structure (WBS)**: Decomposes engineering tasks: Ingestion scripts, dbt testing suites, orchestration DAGs, pipeline alerting runbooks.

### Programmes
- Coordinates multi-project data initiatives (e.g., Enterprise Data Mesh or ERP Modernization) where multiple data domains must conform to shared master data standards.
- Manages cross-project dependencies, such as an upstream CRM migration completing before customer 360 gold marts can be cut over.

### Portfolios
- Prioritizes competing data product investments across finance, marketing, operations, and supply chain based on strategic ROI and compute capacity.

---

## Flashcard Q&A

- **Q:** How does scope management differ between traditional IT and modern Data & BI projects?
  - **A:** Traditional IT scopes static functional deliverables. Data & BI scopes living pipelines across Medallion tiers (Bronze, Silver, Gold), governed by Data Contracts and continuous data quality dimensions.

- **Q:** What is a Data Contract and how does it protect project scope?
  - **A:** It is a formal agreement between upstream data producers and downstream data consumers specifying schema definitions, freshness SLAs, and change notification windows, preventing silent upstream schema drift.

- **Q:** What are the three tiers of the Medallion Architecture from a scope perspective?
  - **A:** Bronze (raw immutable ingestion), Silver (cleansed, conformed dimensions and surrogate keys), and Gold (aggregated business-level star schemas and semantic models).

- **Q:** Why should requirements in data projects be "solution-free"?
  - **A:** Because stakeholders should specify the business decisions, KPIs, and outcomes they need, leaving data architects free to choose the optimal compute, pipeline, and storage models.

---

## Navigation & Related Notes
- **Up**: [[00 - Overview|Scope Management Overview]]
- **Previous**: [[Scope Document]]
- **Next**: [[Scope Management Plan]]

### Related Concepts & Artefacts
- [[00 - Praxis Framework Overview|Praxis Framework Master MOC]]
- [[General Principles of Financial Management|Data FinOps]]
- [[General Principles of Risk Management|Data Risks & Schema Drift]]
- [[Control|DataOps Quality Gates]]
- [[Capability Maturity]]
