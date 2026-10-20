---
title: "Manage The Business Case Competency"
aliases:
  - "Business Case Competency"
  - "Data Business Case Justification"
tags:
  - praxis-framework
  - pillar/competence
  - section/scope-management
  - type/competency
  - praxis/data-bi
  - topic/business-case
  - discipline/finops
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

# Manage The Business Case Competency: Data Platform Justification & Feasibility

> [!SUMMARY] Overview
> Demonstrates the capability to formulate, justify, and maintain the business case for data engineering, analytics, and BI platforms—anchoring investment in the "Triple-Test of Data Viability" (Desirability, Viability, and Achievability via Data Spikes).

## Purpose
The **Manage The Business Case** competency certifies that a project manager, lead data architect, or commercial data product owner can establish and continuously defend the ongoing economic justification of data investments.

In enterprise Data & Business Intelligence initiatives, projects frequently fail due to the **"Field of Dreams Fallacy"**—the mistaken belief that building a central data lake will automatically yield business value. Competent data leaders ensure that every pipeline, dimensional model, and dashboard is bound to an auditable business case with clear ROI metrics.

```
                    The Triple-Test of Modern Data Viability
                    
┌─────────────────────────────────────────────────────────────────────────────────┐
│               1. Desirability: Decision Velocity & Business Need                │
│  - Which specific executive decision will this dataset improve?                 │
│  - What is the business cost of current manual spreadsheet latency (3-5 days)?  │
└────────────────────────────────────────┬────────────────────────────────────────┘
                                         │
                                         ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│               2. Viability: Financial ROI & Cloud FinOps TCO                    │
│  - Does Net Margin Uplift + Labor Hours Saved > Multi-Year Cloud Compute OpEx?  │
│  - Is the Discounted Payback Period within the 12–18 month corporate hurdle?    │
└────────────────────────────────────────┬────────────────────────────────────────┘
                                         │
                                         ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│               3. Achievability: Empirical Data Feasibility                      │
│  - Does the raw source API exist with adequate historical depth and cleanliness?│
│  - Validated empirically via a 3-day time-boxed "Data Feasibility Spike."       │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## Performance Criteria

An individual certified in this competency demonstrates the following practical capabilities:

1. **Formulate the Outline Business Case via Data Spikes**:
   - Refuse to write an Outline Business Case based solely on stakeholder interviews; mandate an exploratory **Data Feasibility Spike** during the [[Identification Process]] to inspect raw schemas and row counts.
   - Establish the baseline problem statement: quantify weekly hours lost to manual CSV manipulation and the financial impact of conflicting departmental metrics.

2. **Develop the Comprehensive Full Business Case**:
   - Construct a multi-year Total Cost of Ownership (TCO) model balancing cloud compute (Snowflake/Databricks), lakehouse storage, SaaS ingestion tooling, and engineering sprint labor against legacy database retirements.
   - Integrate signed [[Product Documents#1. The Producer-Consumer Data Contract|Producer-Consumer Data Contracts]] to guarantee upstream source commitment.

3. **Re-evaluate Viability at Every Medallion Stage Boundary**:
   - Review the business case after delivering each vertical value slice (Bronze $\to$ Silver $\to$ Gold $\to$ BI).
   - Re-forecast ongoing cloud compute credit consumption against actual operational burn rates.
   - If an upstream source platform deprecates an API or source data quality proves permanently irreparable, immediately advise the Sponsor to either descope the deliverable or initiate premature project closure.

4. **Certify Realized ROI at Project Closure**:
   - Audit post-go-live operational metrics at 90 days, certifying realized financial returns against the original business case before releasing project contingency reserves.

---

## Knowledge & Competence Criteria

To achieve proficiency, the practitioner must master:

- **The Economics of Cloud Analytics**: Understanding how the transition from CapEx to OpEx impacts corporate balance sheets and EBITDA.
- **The "Cost of Inaction" (COI)**: Calculating the hidden business cost of remaining on legacy spreadsheets (audit vulnerability, revenue leakage from slow pricing reactions, lost analyst productivity).
- **Stage-Gate Decision Frameworks**: Utilizing the business case as the primary governance instrument at Identification, Definition, Delivery Sprints, and Handover gateways.

---

## Flashcard Q&A

- **Q:** What is the "Field of Dreams Fallacy" in enterprise data project management?
    - **A:** The assumption that simply ingesting raw data into a modern lakehouse will naturally produce business value. Value requires aligning data models with specific operational decisions and driving stakeholder adoption.

- **Q:** Why must an Outline Business Case for a data project include a "Data Feasibility Spike"?
    - **A:** Because data cannot be delivered if the underlying raw sources do not support it. A feasibility spike empirically verifies source API access, row depth, and cleanliness before the organization funds a full multi-month project definition.

- **Q:** When should a data project manager recommend premature closure of a project based on the business case?
    - **A:** When emerging technical realities (such as irreparable upstream data corruption, massive cloud compute cost inflation, or stakeholder rejection) destroy the project's financial viability and Net Present Value (NPV).

---
## Navigation & Related Notes
- **Up**: [[00 - Overview|Scope Management Overview]]
- **Previous**: [[Manage Requirements]]
- **Next**: [[Develop Investment Appraisal]]

### Related Concepts & Artefacts
- [[00 - Praxis Framework Overview|Praxis Framework Master MOC]]
- [[Develop Investment Appraisal]]
- [[Realise Benefits]]
- [[Product Documents]]
- [[Capability Maturity]]
