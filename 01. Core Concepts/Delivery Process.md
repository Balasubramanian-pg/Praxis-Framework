---
title: "Delivery Process"
aliases:
  - "Delivery Process"
tags:
  - praxis-framework
  - pillar/knowledge
  - section/core-concepts
  - type/process
  - praxis/data-bi
  - topic/delivery-process
  - discipline/dataops
pillar: "Knowledge"
section: "Core Concepts"
subarea: "Management"
type: "process"
status: "published"
source: "Praxis Framework"
source_url: "https://www.praxisframework.org"
created: 2026-10-17
updated: 2026-10-17
---

> [!NAV] Navigation
> **Vault**: [[00 - Praxis Framework Overview|Praxis Overview]] > **Section**: [[00 - Overview|Core Concepts]]
> **Pillar**: Knowledge | **Type**: `process`

# Comprehensive Study Notes: The Delivery Process

## General Principles of the Delivery Process

- The delivery phase is where the main work of creating the project's outputs or managing the programme's components is performed.

- Most projects and programmes will comprise multiple **stages** (for projects) or **tranches** (for programmes) that can be conducted in series or in parallel.

- Whatever the context, managing each stage or tranche follows a basic **Plan-Do-Check-Act (PDCA)** cycle, sometimes known as the Shewhart Cycle.

### The PDCA Cycle in the Delivery Process

- **Plan** becomes **"Authorise Work"**: Breaking down the stage/tranche into manageable sections and delegating them.

- **Do** becomes **"Co-ordinate and Monitor Progress"**: Overseeing the parallel work streams and collecting progress information.

- **Check** becomes **"Update and Communicate"**: Updating plans with actual progress and communicating status to stakeholders.

- **Act** becomes **"Corrective Action"**: Taking action to deal with deviations from the plan.

### The Goals of the Delivery Process

- The primary goals of this process are to:

    - Delegate responsibility for producing deliverables to the appropriate people.

    - Monitor the performance of the work and track it against the delivery plans.

    - Take action where necessary to keep the work in line with the plans.

    - Escalate issues and replan if necessary.

    - Formally accept work as it is completed.

    - Maintain effective communications with all stakeholders.


## The Activities of the Delivery Process

> [NOTE]
> This process is a continuous cycle. While the activities are shown as discrete steps in a workflow, a project or programme manager’s day will involve elements of all of them concurrently. The management team will operate this cycle within their defined authority (tolerances). If tolerances are predicted to be exceeded, issues must be escalated to the sponsor.

### 1. Authorise Work

- This activity involves breaking down the stage or tranche into manageable sections (e.g., work packages, sub-projects) and formally delegating them to individuals, teams, or suppliers.

- Delegation requires that those being assigned the work are clear about the objectives and how the work will be co-ordinated and monitored.

- Clear specifications for the delegated work must be accompanied by relevant extracts from the governance documents (management plans).

### 2. Co-ordinate and Monitor Progress

- Different individuals and teams will be working on different aspects of the work at any one time. This requires active **co-ordination** to manage interdependencies and avoid conflicts (e.g., for physical space or shared resources).

- Each delivery team will provide the management team with regular **progress reports** (which can be time-based or event-based).

- The management team must **consolidate** these reports to understand the overall status of the project or programme.

- This activity utilises many of the specific steps of the individual delivery function procedures, such as assessing change requests, implementing risk responses, and engaging with stakeholders.

### 3. Update and Communicate

- Documentation will be updated on a regular basis as specified by the relevant management plans.

- Some documents, like schedules, will be very dynamic with frequent updates. Others, like the business case, will be reviewed at significant points, such as stage or tranche boundaries.

- Progress will be routinely communicated to stakeholders in accordance with the **communications plan**.

- Crucially, where any aspect of the work exceeds, or is predicted to exceed, the agreed **tolerances**, this must be formally escalated to the **sponsor**.

### 4. Corrective Action

- This activity is about taking more significant action that constitutes a deviation from the baseline plan.

- **Understanding Inter-relationships**: When taking corrective action, it is vital to understand how the fundamental components of the work inter-relate. A change in one area (e.g., a product failing a quality test) will have knock-on effects on others (e.g., schedule, cost, risk). In short, if the work was inadequately planned, it will be very difficult to control.

- **Severity and Escalation**: The first distinction for severity comes from the **tolerances**. If a deviation is within tolerance, the manager can handle it. If it is predicted to exceed tolerance, it must be escalated to the sponsor.

- **Exception Plans**: If a major, unforeseen event occurs, the corrective action may involve significant re-planning. The delivery plans may need to be completely reworked. These new plans are referred to as **exception plans** and must be submitted to the sponsor for authorisation.

- **Business Case Impact**: The ultimate consideration is the effect of the issue on the business case. If the plans cannot be reworked in a way that keeps the project or programme justifiable, the ultimate corrective action may be to **prematurely close** it.

### 5. Accept Completed Work

- At some point, a delivery team will report that a piece of work is finished.

- The management team is then responsible for **quality control** to verify that the work is complete and meets its specification.

- This can range from a straightforward inspection to extensive testing and formal, contractual sign-off.

- Formal acceptance signifies the **transfer of ownership** of the work and its products from the delivery team to the management team.


## Managing Complexity in Delivery

- As the complexity of the work increases, it becomes necessary to break it up into manageable pieces. This decomposition takes two main forms:

    1. **Horizontal Decomposition (Stages/Tranches)**:

        - This involves splitting the entire delivery phase into sequential or parallel chunks of time.

        - These are called **stages** in a project and **tranches** in a programme.

        - This approach enables techniques like go/no-go control at the end of each chunk and facilitates rolling wave planning.

        - The boundaries between these stages and tranches are managed by the **Boundaries Process**.

    2. **Vertical Decomposition (Delegation)**:

        - This involves delegating packages of work to different teams.

        - This can take the form of sub-projects or work packages within a project, or projects within a programme.

        - The interface with these delegated delivery teams is managed through the **Development Process**.


## Praxis for Data & Business Intelligence: The Medallion Delivery Cadence

In Data Engineering and Business Intelligence projects, traditional waterfall stage gates fail because business stakeholders cannot validate requirements until they see concrete numbers rendered in reports. Conversely, unconstrained agile sprints frequently devolve into messy, unversioned SQL scripts and fragmented data silos.

Praxis resolves this tension by structuring delivery around **Vertical End-to-End Slices** governed by the **Medallion Architecture Delivery Cadence**.

```
The Anti-Pattern (Horizontal Siloed Delivery):
[Months 1-3: Ingestion Only] ──► [Months 4-6: Warehousing] ──► [Month 7: BI Reports]
Result: Zero business feedback for 6 months; requirements drift; high project failure risk.

Praxis Recommended Delivery (Vertical End-to-End Slices):
Sprint N (Slice 1: Core Orders & Revenue):
[Bronze Ingestion] ──► [Silver Cleansing] ──► [Gold Star Schema] ──► [Certified Dashboard]
                                                                            │
                                                                            ▼ (Value in 2 Weeks)
Sprint N+1 (Slice 2: Customer Retention & Churn):
[Bronze Delta CDC] ──► [Silver dbt Models] ──► [Gold Semantic Mart] ──► [Executive Cockpit]
```

---

### 1. The Four Continuous Delivery Quality Gates

During the **Authorise Work** and **Accept Completed Work** activities of the Delivery Process, data products must traverse four automated and architectural quality gates:

```
[Upstream Data Source]
         │
         ▼
[Gate 1: Ingestion Gate (Bronze)] ──► Checks: Contract validation, CDC event parity, landing DLQ
         │
         ▼
[Gate 2: Transformation Gate (Silver)] ─► Checks: Primary key uniqueness, zero orphan FKs, dbt test
         │
         ▼
[Gate 3: Semantic Gate (Gold)] ────────► Checks: General Ledger financial reconciliation, metric tests
         │
         ▼
[Gate 4: Business Acceptance Gate (BI)] ─► Checks: User persona sign-off, cold render < 2.0s, RLS audit
```

| Quality Gate | Phase Owner | Mandatory Acceptance Criteria | Governance Verification Method |
| :--- | :--- | :--- | :--- |
| **Gate 1: Ingestion** | Lead Data Engineer | Upstream payload strictly conforms to [[Product Documents#1. The Producer-Consumer Data Contract|Data Contract]]; zero dropped records. | Automated API schema validation; dead-letter queue (DLQ) monitor. |
| **Gate 2: Transformation** | Analytics Engineer | Zero surrogate key duplicates; referential integrity tests pass 100%; dbt documentation generated. | Pull request CI/CD pipeline (`dbt build --select state:modified+`). |
| **Gate 3: Semantic Layer** | Analytics Engineer / Modeler | Aggregated revenue matches finance source of truth within 0.001%; certified metric definitions locked. | Automated reconciliation SQL tests against production General Ledger. |
| **Gate 4: BI Acceptance** | Lead BI Developer / BCM | Cold-cache visual render time $< 2.0$ seconds; Row-Level Security (RLS) validated across all user roles. | Performance Analyzer trace audit; formal UAT sign-off from Department Champion. |

---

### 2. Managing Deviations: Code Rollback vs. Data Time-Travel Rollback

In generic software engineering, the **Corrective Action** activity typically involves reverting a git commit or deploying a previous application container. In Data & BI projects, code rollback alone is insufficient because **bad data may have already persisted into storage**:

1. **Code Reversion**: Reverting the dbt model or Spark transformation script in Git prevents future corruption.
2. **Storage State Correction (Time Travel)**: Data lakes built on open formats (Delta Lake, Apache Iceberg) provide historical snapshot retention. The team can execute time-travel restoration:
   ```sql
   -- Restore corrupted customer dimensions to pre-incident state
   RESTORE TABLE silver.dim_customers TO TIMESTAMP AS OF '2026-10-18 23:00:00';
   ```
3. **Idempotent Backfilling**: Reprocessing historical date partitions with explicit partition overwrites (`INSERT OVERWRITE` or `MERGE`) ensures duplicate rows are not introduced during remediation.

---

### 3. Acceptance of Delegated Work Packages

In Praxis, work packages delegated to internal data squads or external system integrators are formally accepted against the project's **Definition of Done (DoD)**:

- Deliverable code merged into `main` branch via peer-reviewed pull request.
- 100% passing rate across all automated dbt and Great Expectations test suites.
- Published table metadata, lineage graph, and data dictionary entries in Unity Catalog or Microsoft Purview.
- Completed operational runbook documenting pipeline schedules, upstream dependencies, and on-call escalation routes in the [[Control Management Plan]].

---

## Flashcard Q&A

- **Q:** The delivery process is based on what four-step management cycle?
    - **A:** The Plan-Do-Check-Act (PDCA) cycle.

- **Q:** What is the primary purpose of the "Authorise Work" activity?
    - **A:** To break down the work of a stage or tranche into manageable sections and formally delegate them to individuals, teams, or suppliers.

- **Q:** When must a P3 manager escalate an issue to the sponsor?
    - **A:** When any aspect of the work exceeds, or is predicted to exceed, the agreed tolerances.

- **Q:** What is an "exception plan"?
    - **A:** A new delivery plan that is created to show how a major, unforeseen issue will be overcome. It must be submitted to the sponsor for authorisation.

- **Q:** What is the difference between horizontal and vertical decomposition of the delivery phase?
    - **A:** **Horizontal decomposition** is splitting the work into time-based stages or tranches (managed by the Boundaries Process). **Vertical decomposition** is delegating packages of work to different teams (managed by the Development Process).


---
## Navigation & Related Notes
- **Up**: [[00 - Overview|Core Concepts Overview]]
- **Previous**: [[Definition Process]]
- **Next**: [[Development Process]]

### Related Concepts & Artefacts
- [[00 - Praxis Framework Overview|Praxis Framework Master MOC]]
- [[Capability Maturity]]
- [[Complexity]]
