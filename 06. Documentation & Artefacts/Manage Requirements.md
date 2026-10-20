---
title: "Manage Requirements Competency"
aliases:
  - "Requirements Engineering Competency"
tags:
  - praxis-framework
  - pillar/competence
  - section/scope-management
  - type/competency
  - praxis/data-bi
  - topic/requirements-engineering
  - discipline/dataops
pillar: "Competence"
section: "Scope Management"
subarea: "Management Competencies"
type: "competency"
status: "published"
source: "Praxis Framework"
source_url: "https://www.praxisframework.org"
created: 2026-10-17
updated: 2026-10-20
---

> [!NAV] Navigation
> **Vault**: [[00 - Praxis Framework Overview|Praxis Overview]] > **Section**: [[00 - Overview|Scope Management]]
> **Pillar**: Competence | **Type**: `competency`

# Manage Requirements Competency

> [!SUMMARY] Overview
> Demonstrates the capability to elicit, structure, and baseline analytical requirements—translating ambiguous executive business questions into rigorous data grain specifications, metric definitions, and Producer-Consumer Data Contracts.

## Purpose
The **Manage Requirements** competency certifies that a project manager, analytics translator, or lead data architect can bridge the divide between high-level business queries and concrete data engineering architectures.

In enterprise Data & Business Intelligence initiatives, conventional software user stories (*"As a user, I want a dashboard..."*) fail because they specify visual layouts without defining **data grain, calculation logic, historical depth, or freshness tolerances**. Competent data requirements engineering links business decision-making directly to the modern data stack.

```
                    The Data Requirements Traceability Chain
                    
[Executive Business Decision]   "Should we terminate product lines with margin erosion?"
             │
             ▼
[Semantic Metric Definition]   Net Margin % = (Gross Revenue - Total Direct COGS) / Gross Revenue
             │
             ▼
[Dimensional Grain Spec]       1 row per settled order line item per store per day (Kimball Star Schema)
             │
             ▼
[Data Contract Specification]  Source billing API payload schema: order_id, sku, amount_usd, timestamp
             │
             ▼
[Quality & Freshness SLAs]     Daily cutoff at 06:00 UTC; 0.00% primary key duplicate tolerance
```

---

## Performance Criteria

An individual certified in this competency demonstrates the following capabilities:

1. **Elicit Decision-Centric Analytical Requirements**:
   - Interrogate stakeholder requests using the **"Decision Backwards"** technique: identify the specific business decision the stakeholder will make, the required frequency, and the minimum acceptable data freshness.
   - Deconstruct ambiguous metric names (e.g., "Active User", "Churn", "Gross Margin") into mathematically unambiguous calculation formulas agreed upon across departments.

2. **Define Dimensional Grain & Data Model Specifications**:
   - Establish the exact **grain** of the proposed dataset (e.g., snapshot vs. transactional, atomic vs. aggregated).
   - Classify entity attributes into Slowly Changing Dimensions (SCD Type 1 for overwrites vs. SCD Type 2 for historical audit tracking).
   - Validate whether upstream operational systems possess sufficient historical data depth to satisfy reporting needs.

3. **Draft & Negotiate Producer-Consumer Data Contracts**:
   - Document formal technical specifications (`contract.yaml`) detailing column names, data types, nullability rules, and breaking-change notification lead times.
   - Secure mutual sign-off between upstream transactional application owners and downstream analytics engineering leads.

4. **Establish Acceptance Criteria & Quality Gates**:
   - Define explicit automated test criteria: unique constraints, foreign key relationships, accepted enumeration values, and source-to-target reconciliation thresholds.
   - Specify visual performance budgets for frontend reporting: initial dashboard render $< 2.0$ seconds and filter slice response $< 800$ milliseconds.

---

## Knowledge & Competence Criteria

To achieve proficiency, the practitioner must master:

- **Kimball Dimensional Modeling**: The architectural difference between Fact tables (metrics, foreign keys) and Dimension tables (descriptive context), conformed dimensions, and star vs. snowflake schemas.
- **The "Data Feasibility Spike"**: Why requirements cannot be baselined until raw source schemas, historical depth, and data cleanliness have been empirically profiled via exploratory SQL queries.
- **Metric Layer Governance**: How centralized semantic layers (dbt Semantic Layer, Power BI Shared Datasets, Cube.js) decouple business metric logic from physical storage tables.
- **Data Privacy & Security Requirements**: Classifying data fields by sensitivity (Public, Internal, Confidential, PII) and translating regulatory mandates (GDPR, HIPAA) into technical masking requirements.

---

## Flashcard Q&A

- **Q:** Why do standard agile user stories often fail in data engineering and BI projects?
    - **A:** Because they focus on frontend visual interactions while neglecting essential data parameters: calculation grain, historical depth, metric definitions, pipeline freshness SLAs, and data quality constraints.

- **Q:** What is the "Decision Backwards" method for data requirements gathering?
    - **A:** Starting with the specific business decision an executive needs to make, determining what metric informs that decision, and then tracing backwards to identify the required data grain, transformations, and raw source fields.

- **Q:** What is the primary purpose of defining the "grain" of a fact table during requirements definition?
    - **A:** The grain establishes exactly what a single row in the table represents (e.g., one line item on an invoice), preventing accidental aggregation errors, fan-out joins, and duplicated metrics downstream.

---
## Navigation & Related Notes
- **Up**: [[00 - Overview|Scope Management Overview]]
- **Previous**: [[Lessons Log]]
- **Next**: [[Product Documents]]

### Related Concepts & Artefacts
- [[00 - Praxis Framework Overview|Praxis Framework Master MOC]]
- [[Product Documents]]
- [[Scope Management]]
- [[General Principles of Requirements Management]]
- [[Capability Maturity]]
