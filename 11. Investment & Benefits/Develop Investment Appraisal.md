---
title: "Develop Investment Appraisal Competency"
aliases:
  - "Investment Appraisal Competency"
  - "Data Platform Business Case Appraisal"
tags:
  - praxis-framework
  - pillar/competence
  - section/financial-management
  - type/competency
  - praxis/data-bi
  - topic/investment-appraisal
  - discipline/finops
pillar: "Competence"
section: "Financial Management"
subarea: "Management Competencies"
type: "competency"
status: "published"
source: "Praxis Framework"
source_url: "https://www.praxisframework.org"
created: 2026-10-17
updated: 2026-10-20
---

> [!NAV] Navigation
> **Vault**: [[00 - Praxis Framework Overview|Praxis Overview]] > **Section**: [[00 - Overview|Financial Management]]
> **Pillar**: Competence | **Type**: `competency`

# Develop Investment Appraisal Competency: Data Platform TCO & Financial ROI

> [!SUMMARY] Overview
> Demonstrates the capability to construct rigorous financial investment appraisals for modern cloud data platforms—modeling multi-year Total Cost of Ownership (TCO), calculating Net Present Value (NPV) and Internal Rate of Return (IRR), and benchmarking legacy infrastructure retirement savings.

## Purpose
The **Develop Investment Appraisal** competency certifies that a project manager, lead data architect, or commercial finance lead can build an audit-ready financial business case for modernizing enterprise data and business intelligence architectures.

Migrating to a modern Lakehouse (Snowflake, Databricks, Microsoft Fabric, dbt, Power BI) shifts enterprise IT finance from **periodic Capital Expenditures (CapEx)** for physical hardware to **dynamic Operational Expenditures (OpEx)**. A defensible investment appraisal balances multi-year cloud consumption with auditable labor efficiency gains, margin improvements, and legacy cost take-outs.

```
                  The 3-5 Year Cloud Data Investment Model
                  
┌─────────────────────────────────────────────────────────────────────────────────┐
│                     Life Cycle Costs: Total Cost of Ownership                   │
├─────────────────────────┬─────────────────────────────┬─────────────────────────┤
│    Initial Delivery     │    Ongoing Cloud OpEx       │     SaaS & Licensing    │
│ - 12-Week Agile Sprints │ - Databricks DBUs / Compute │ - Fivetran Managed ELT  │
│ - Data Platform Squad   │ - Delta Lake Storage Tiering│ - dbt Cloud Developer   │
│ - Security & IaC Setup  │ - Virtual Warehouse Credits │ - Power BI Capacity     │
└────────────┬────────────┴──────────────┬──────────────┴────────────┬────────────┘
             │                           │                           │
             └──────────────────────┬─────┴────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    Financial Returns: Audited Value Realization                 │
├───────────────────────────────────────┬─────────────────────────────────────────┤
│    Legacy Cost Avoidance (Cash In)    │     Labor Recovery & Margin Uplift      │
│ - Decommissioned Oracle / Teradata    │ - 400 hours/month manual scraping saved │
│ - Cancelled on-prem maintenance fees  │ - 120 bps margin expansion via pricing  │
└───────────────────────────────────────┴─────────────────────────────────────────┘
```

---

## Performance Criteria

An individual certified in this competency demonstrates the following practical capabilities:

1. **Model Multi-Year Cloud Total Cost of Ownership (TCO)**:
   - Forecast upfront delivery labor (sprint velocity costs across platform engineers, analytics engineers, and BI developers).
   - Build consumption-based OpEx models accounting for annual data volume growth ($20-30\%$), batch ingestion schedules, and query concurrency.
   - Price SaaS utilities (dbt Cloud seats, Fivetran Monthly Active Rows, Power BI Premium/Fabric capacities).

2. **Quantify Auditable Cash & Operational Savings**:
   - Calculate legacy infrastructure cost elimination: cancelled maintenance contracts for legacy on-prem data warehouses, retired third-party ETL licenses (Informatica, SSIS), and reduced physical server depreciation.
   - Benchmark business analyst labor efficiency: multiply quantified weekly hours saved from manual spreadsheet manipulation by fully burdened hourly compensation.

3. **Compute Core Financial Appraisal Metrics**:
   - Calculate **Net Present Value (NPV)** discounted by the organization's Weighted Average Cost of Capital (WACC):
     $$\text{NPV} = \sum_{t=1}^{n} \frac{\text{Net Cash Flow}_t}{(1 + r)^t} - \text{Initial Investment}$$
   - Determine **Internal Rate of Return (IRR)** and calculate the **Discounted Payback Period** (targeting breakeven within 12–18 months).

4. **Execute FinOps Sensitivity & Stress-Testing**:
   - Stress-test the investment appraisal against pessimistic operational scenarios: $+40\%$ data volume surge, $20\%$ higher cloud warehouse credit burn, or a 3-month delay in business adoption.
   - Determine the economic break-even threshold and establish cloud spend guardrails in the [[Control Management Plan]].

---

## Exemplar: Modern Lakehouse Investment Appraisal Summary

| Financial Appraisal Metric | 3-Year Baseline Forecast | Sensitivity Stress-Test (+30% Compute) |
| :--- | :--- | :--- |
| **Initial Implementation Cost (CapEx/Labor)** | \$320,000 | \$320,000 |
| **Annual Cloud OpEx (Compute + Storage + SaaS)** | \$115,000 / year | \$149,500 / year |
| **Annual Legacy Cost Eliminated (On-Prem DB)** | \$185,000 / year | \$185,000 / year |
| **Annual Labor Productivity Savings** | \$240,000 / year | \$240,000 / year |
| **Net Annual Cash Benefit** | **+\$310,000 / year** | **+\$275,500 / year** |
| **Net Present Value (NPV @ 10% WACC)** | **+\$450,864** | **+\$365,066** |
| **Internal Rate of Return (IRR)** | **64.2%** | **52.8%** |
| **Discounted Payback Period** | **14.2 Months** | **16.8 Months** |

---

## Flashcard Q&A

- **Q:** Why is calculating the TCO of a modern cloud data platform fundamentally different from traditional on-prem data warehouses?
    - **A:** Traditional warehouses require large upfront capital expenditures (CapEx) for hardware and multi-year perpetual licenses. Modern cloud platforms operate as ongoing operational expenditures (OpEx), requiring dynamic consumption modeling for compute, storage, and SaaS tooling.

- **Q:** What is the primary source of hard cash savings when justifying a modern data platform migration?
    - **A:** The immediate elimination of recurring legacy maintenance contracts, proprietary on-premises software licenses, physical datacenter hosting fees, and costly specialized legacy DBA support.

- **Q:** Why is sensitivity analysis critical in a cloud analytics investment appraisal?
    - **A:** Because cloud compute costs are variable. Stress-testing the model against unexpected data growth or unoptimized query spikes ensures the project remains financially viable even under adverse operational conditions.

---
## Navigation & Related Notes
- **Up**: [[00 - Overview|Financial Management Overview]]
- **Previous**: [[General Principles of Financial Management]]
- **Next**: [[Manage Benefits]]

### Related Concepts & Artefacts
- [[00 - Praxis Framework Overview|Praxis Framework Master MOC]]
- [[General Principles of Financial Management]]
- [[Develop Budgets And Control Costs]]
- [[Realise Benefits]]
- [[Capability Maturity]]
