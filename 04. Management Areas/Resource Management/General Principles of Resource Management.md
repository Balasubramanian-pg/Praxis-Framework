---
title: "Resource Management"
aliases:
  - "Resource Management"
  - "General Principles of Resource Management"
tags:
  - praxis-framework
  - pillar/knowledge
  - section/resource-management
  - type/management-area
  - praxis/data-bi
  - topic/resourcing
  - discipline/dataops
pillar: "Knowledge"
section: "Resource Management"
subarea: "Management"
type: "management-area"
status: "published"
source: "Praxis Framework"
source_url: "https://www.praxisframework.org"
created: 2026-10-17
updated: 2026-10-17
---

> [!NAV] Navigation
> **Vault**: [[00 - Praxis Framework Overview|Praxis Overview]] > **Section**: [[00 - Overview|Resource Management]]
> **Pillar**: Knowledge | **Type**: `management-area`

# Comprehensive Study Notes: Resource Management

## General Principles of Resource Management

- **Definition**: Resource management covers all aspects of the planning, acquisition, deployment, and control of the resources required to deliver a project, programme, or portfolio.

- **Resources**: These include people, machinery, materials, technology, property, and anything else required to deliver the work. Resources may be obtained internally from the host organisation or procured from external sources (suppliers).

### The Goals of Resource Management

- The primary goals of this function are to:

    1. Determine the best way to **resource** the work (the resourcing strategy).

    2. **Acquire and mobilise** the necessary resources.

    3. **Control** resources throughout the life cycle.

    4. **Demobilise** resources at the end of the life cycle.

    5. Finalise all **contractual arrangements**.

### The Three Main Components of Resource Management

1. **Procurement**:

    - This is primarily concerned with identifying and selecting **external suppliers**.

    - Many of the principles (e.g., clear specification of requirements) can also be applied to securing internal suppliers.

    - The degree of formality required will depend on the complexity of the supply chain and the associated risk.

2. **Contract Management**:

    - This deals with the continuing relationship between the management team and its suppliers.

    - This relationship may be governed by a formal legal **contract**, an internal **Service Level Agreement (SLA)**, or simpler documented agreements for supply.

3. **Mobilisation**:

    - This is about getting the **right resources in the right place at the right time**.

    - It also covers the reverse exercise of **demobilisation** when the resources are no longer required.


## The Resource Management Procedure

1. **Plan**:
    - A **resource management plan** is created. This initially defines how resources should be procured, mobilised, and controlled according to organisational policies (e.g., policies for tendering, contracting, and matrix management).

2. **Initiate**:
    - The resources and infrastructure needed to perform the resource management function itself are mobilised.

3. **Identify and Specify Resources**:
    - This step involves an assessment of what resources are needed to complete the scope of work.

4. **Procure Resources**:
    - This step can be a significant project in itself and must consider factors such as:

        - The decision to **make or buy**.

        - The use of a single integrated supplier vs. multiple specialist suppliers.

        - Formal supplier selection processes (e.g., tendering).

        - The desired supplier relationships (e.g., partnership vs. transactional).

        - The conditions and forms of contract or agreement.

        - Payment methods and internal cross-charging mechanisms.

5. **Mobilise Resources**:
    - The management infrastructure is set up and the acquired resources are put in place.

6. **Control Resources**:
    - Once in place, resources need to be controlled. This involves activities such as monitoring progress, rescheduling work, reviewing contracts or SLAs, responding to resource issues, introducing new resources, and closing contracts for completed work.

7. **Demobilise Resources**:
    - At the end of the work, the resource infrastructure is dismantled. This includes the disposal of capital assets, the formal closure of all contracts, and the redeployment of internal staff.

### Acquiring Internal vs. External Resources

- **External Resources**: Normally acquired through a formal procurement procedure that involves tendering and results in a legal contract. For complex or innovative requirements, the P3 manager may enter into a dialogue with potential suppliers to help develop the solution, but clear rules on confidentiality and fairness must be maintained.

- **Internal Resources**: May be governed by formal SLAs or simple Terms of Reference.

> [!CAUTION]
> All too often, arrangements for the provision of internal resources are informal and undocumented. This can lead to the P3 manager having no real control over whether the right resources are available at the right time. Even small projects benefit from some form of documented agreement between the management team and the departments providing the resources.


## Resource Management in Projects, Programmes, and Portfolios

### Projects

- Some projects will be completely internal, drawing purely on the resources of the host organisation. In this situation, the project manager will need good **negotiation and influencing skills** to compete for limited internal resources. The **project sponsor** has an important role to play in ensuring the host organisation commits to providing these resources.

- Larger, more complex projects will utilise a mixture of internal and external resources. The project manager may need support from specialists who have expertise in supplier selection and contract negotiations.

### Programmes

- The different elements of a programme will have varying resource needs. For example, the projects may make greater use of external resources, while the change management and benefits realisation work is primarily done by internal resources.

- The programme manager must define how the responsibility for managing resources will be shared between the project and programme levels in a **programme-level resource management plan**.

- The approach should provide co-ordination while delegating sufficient authority to individual projects. The programme manager will need to consider factors such as:

    - Elements of the management infrastructure that can be shared between projects.

    - Opportunities for **pan-programme procurement** (e.g., negotiating a bulk deal with a major supplier for all projects).

    - Structuring tranches to make resource usage more efficient across the programme.

> [IMPORTANT]
> Projects and programmes are sometimes initiated without the resource implications being fully understood. All aspects of resource management, particularly the impact on business-as-usual, need to be thoroughly investigated during the definition process.

### Portfolios

- The infrastructure of a portfolio is usually permanent, but the resource demands will vary according to the number of concurrent projects and programmes.

- The portfolio management team must constantly **balance the commitment** to new and existing projects and programmes with the **capacity of the host organisation** to provide the necessary resources.

- This is a key part of the portfolio management process, where the team must prioritise the allocation of limited resources to the initiatives that provide the most strategic value.


## Praxis for Data & Business Intelligence: Resourcing the Modern Data Stack

Resource management in modern analytics initiatives requires a dual approach: orchestrating specialized multidisciplinary engineering talent and managing dynamic, consumption-based cloud compute infrastructure. Failing to balance human skill distribution with automated infrastructure provisioning leads to either severe project delivery bottlenecks or runaway cloud expenditure.

```
Traditional Resourcing Trap (The "Unicorn" Fallacy):
[1 Overburdened Data Engineer] ──► Ingestion + dbt + Spark + DAX + Governance + Dashboards
                                           │
                                           ▼ (Result: Burnout, Technical Debt, 6-Month Backlog)

Praxis Specialized Hub-and-Spoke Operating Model:
               ┌──────────────── Central Data Platform Team (Hub) ────────────────┐
               │  - Cloud Infrastructure & Lakehouse Architecture (Terraform)     │
               │  - Orchestration & CI/CD Frameworks (Airflow / GitHub Actions)    │
               │  - Enterprise Data Governance & Unity Catalog Metastore           │
               └────────────────────────────────┬─────────────────────────────────┘
                                                │
                 ┌──────────────────────────────┴──────────────────────────────┐
                 ▼                                                             ▼
  [Domain Analytics Engineers]                                  [Domain BI & Viz Specialists]
  - dbt SQL Modeling & Metric Logic                             - Certified Power BI / Tableau UX
  - Kimball Star Schemas & Contracts                            - DAX Measures & Fast Rendering
  - Automated Great Expectations Tests                          - Row-Level Security & Adoption
```

---

### 1. Modern Data Team Roles & Competency Profiles

A common failure in IT data project management is treating "Data Engineer" or "BI Developer" as interchangeable roles. Praxis establishes clear competency boundaries across four primary specialized disciplines:

| Role | Primary Deliverables | Core Technical Tooling | Key Project Risk Mitigated |
| :--- | :--- | :--- | :--- |
| **Data Platform Engineer** | Ingestion pipelines, lakehouse infrastructure, cluster compute, networking, security | Spark, Delta Lake, Python, Terraform, Kafka, Azure/AWS | Pipeline fragility, unscalable storage, network security breaches |
| **Analytics Engineer** | Conformed Silver/Gold models, business metric logic, automated data tests, semantic layer | dbt, SQL, Kimball Dimensional Modeling, Git | Undocumented logic, spaghetti queries, broken business metrics |
| **BI / Visualization Developer** | Executive dashboards, operational reports, mobile views, interactive drill-paths | Power BI, Tableau, DAX, Tabular Editor, Looker | Dashboard abandonment, poor query performance, confusing visual UX |
| **Data Governance Steward** | Data contracts, PII classification, catalog curation, access entitlement workflows | Unity Catalog, Collibra, Purview, Alation | Regulatory fines (GDPR/HIPAA), unauthorized access, lack of discovery |

> [!NOTE] The Analytics Engineer Bridge
> The emergence of the **Analytics Engineer** role directly solves the historic friction between backend Data Engineers (who prioritize infrastructure, streaming, and throughput) and business-facing BI analysts (who prioritize KPIs, calculations, and reporting). The Analytics Engineer applies software engineering practices (version control, automated CI/CD, unit testing) to data transformation and semantic modeling.

---

### 2. Cloud Compute as a Dynamic "Non-Human" Resource

In the cloud-native data landscape (Snowflake, Databricks, BigQuery), computing capacity is an elastic, on-demand resource whose allocation directly impacts the project budget and delivery timeline. 

Praxis requires Data Project Managers to apply structured resource management to cloud infrastructure:

- **Resource Mobilisation (Environment Provisioning)**: Infrastructure as Code (Terraform) must provision dedicated, isolated compute clusters for Development, Staging, and Production. Dev clusters must have aggressive auto-suspend timers (e.g., terminate after 15 minutes of inactivity).
- **Cluster Sizing & Resource Levelling**: High-throughput nightly ingestion workloads require compute-optimized nodes, whereas complex dbt transformation models benefit from memory-optimized worker pools. Project managers must prevent developers from running ad-hoc exploratory queries on shared production warehouse clusters.
- **Demobilisation of Ephemeral Resources**: In automated CI/CD pipelines (e.g., dbt Slim CI), ephemeral schemas and short-lived virtual warehouses must be automatically torn down upon pull request merge to prevent orphaned compute costs.

---

### 3. Make vs. Buy: Procurement in Modern Data Platforms

During the **Identify and Specify Resources** step, the Data PM must evaluate the total cost of ownership (TCO) between building custom integrations and purchasing managed SaaS utilities:

1. **Ingestion & Connectors**: Building and maintaining custom API scrapers for 50+ SaaS platforms (Salesforce, Stripe, HubSpot) requires ongoing engineering maintenance. Procuring managed ELT tools (e.g., Fivetran, Airbyte) often reduces ongoing labor costs despite monthly subscription fees.
2. **Data Observability**: For large enterprises with thousands of data tables, purchasing an anomaly detection platform (e.g., Monte Carlo, Databand) can free up senior data engineers from building custom alerting scrapers.
3. **Open Standards vs. Vendor Lock-In**: Prioritizing open table formats (Apache Iceberg, Delta Lake) guarantees data portability and prevents proprietary storage lock-in across multi-cloud environments.

---

## Flashcard Q&A

- **Q:** What are the three main components of resource management?
    - **A:** Procurement, Contract Management, and Mobilisation.

- **Q:** What is the key difference between mobilisation and demobilisation?
    - **A:** **Mobilisation** is about getting the right resources in the right place at the right time. **Demobilisation** is the reverse exercise of dismantling the infrastructure and redeploying resources when they are no longer required.

- **Q:** What is the major risk of using informal, undocumented agreements for internal resources?
    - **A:** The P3 manager has no real control over whether the right resources will be available at the right time, as departmental priorities can change.

- **Q:** What is "pan-programme procurement"?
    - **A:** The practice of co-ordinating procurement across multiple projects within a programme to gain advantages such as bulk discounts or better contract terms.

- **Q:** What is the key resource management task of a portfolio management team?
    - **A:** To constantly balance the resource demands of the component projects and programmes with the capacity of the host organisation to provide those resources, and to prioritise allocation accordingly.


---
## Navigation & Related Notes
- **Up**: [[00 - Overview|Resource Management Overview]]
- **Next**: [[Manage Resources]]

### Related Concepts & Artefacts
- [[00 - Praxis Framework Overview|Praxis Framework Master MOC]]
- [[Capability Maturity]]
- [[Complexity]]
