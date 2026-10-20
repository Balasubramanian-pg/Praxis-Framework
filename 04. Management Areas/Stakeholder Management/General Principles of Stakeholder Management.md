---
title: "Stakeholder management"
aliases:
  - "Stakeholder management"
  - "General Principles of Stakeholder Management"
tags:
  - praxis-framework
  - pillar/knowledge
  - section/stakeholder-management
  - type/management-area
  - praxis/data-bi
  - topic/stakeholder-management
  - discipline/dataops
pillar: "Knowledge"
section: "Stakeholder Management"
subarea: "Management"
type: "management-area"
status: "published"
source: "Praxis Framework"
source_url: "https://www.praxisframework.org"
created: 2026-10-17
updated: 2026-10-17
---

> [!NAV] Navigation
> **Vault**: [[00 - Praxis Framework Overview|Praxis Overview]] > **Section**: [[00 - Overview|Stakeholder Management]]
> **Pillar**: Knowledge | **Type**: `management-area`

# Comprehensive Study Notes: Stakeholder Management

## General Principles of Stakeholder Management

- **Definition**: Stakeholder management is the function that ensures stakeholders are appropriately identified, understood, and involved in all relevant aspects of the project, programme, or portfolio.

- **Stakeholders**: Individuals or groups with an interest in the project, programme, or portfolio because they are involved in the work or affected by its outcomes.

### The Goals of Stakeholder Management

- The primary goals of the stakeholder management function are to:

    1. Ensure that the views, attitudes, and interests of all stakeholders are understood.

    2. Influence stakeholders to be supportive of the work wherever possible.

    3. Maximise the impact of supportive stakeholders.

    4. Minimise the impact of unsupportive or negative stakeholders.

### The Importance of Stakeholder Management

- Most P3 initiatives will have a variety of stakeholders with different, and sometimes competing, interests. These individuals and groups can have a significant influence over the eventual success or failure of the work.

- Understanding stakeholders is so important to other functions that significant effort should be invested in this activity early in the **identification process**.

- **Examples of inter-dependencies**:

    - **Requirements management** is based on stakeholders’ wants and needs.

    - **Risk management** is based on understanding stakeholder appetite for, and attitude to, risk.


## The Stakeholder Management Procedure

- The stakeholder management procedure has six key steps. It begins with planning and initiation before moving into a cycle of identification, assessment, and communication.

1. **Plan**: This initial step defines the scope and objectives of stakeholder management for the specific initiative and results in the formal **stakeholder management plan**.

2. **Initiate**: Once the work is approved, the resources needed to manage stakeholders are mobilised.

3. **Identify**: This involves identifying who the stakeholders are. Techniques can include interviews, brainstorming, checklists, and reviewing lessons learned from previous work. Common types of stakeholders include:

    - Staff, contractors, and suppliers performing the work.

    - Individuals and groups affected by the creation of outputs or outcomes.

    - Owners, customers, or funders of the host organisation.

    - Statutory, regulatory, and governmental bodies.

4. **Assess**: This step involves understanding the relationships between stakeholders and their different areas of interest. This is usually achieved through **stakeholder mapping**.

    - A common approach is to assess each stakeholder in terms of their **interest** in the work and their **influence** over how it is performed.

    - Those with a high ability to directly affect the objectives are often highlighted as **key stakeholders**.

    - Typical questions to consider when assessing each stakeholder include:

        - How will they be affected by the work?

        - Will they be openly for, against, or ambivalent to the work?

        - What are their expectations and how can these be managed?

        - Who and what are the primary influences on their view of the work?

        - Who would be the best person to engage with this stakeholder?

5. **Plan Communications**: Once stakeholders have been assessed, detailed plans can be put in place to communicate with them, with a view to influencing their interest and influence in a positive way.

    - The principles of how stakeholders will be approached are described in the stakeholder management plan.

    - The detailed, specific communications (what, when, who) are set out in a **communications plan**.

    - Plans for communication with stakeholders who have high levels of interest and influence will be very different from those who have low levels.

6. **Engage**: This is the execution of the communications plan.

    - The communications plan will identify the ideal people to engage with each stakeholder. The P3 manager will often take on this task, but it is also useful to call upon peers, senior managers, or others who may be better placed.

    - Engaging with more senior or powerful stakeholders is often a key role for the **sponsor**.

> [!IMPORTANT]
> Stakeholder management becomes more complex because stakeholders’ views, roles, or allegiances can change throughout the life cycle. For this reason, the stakeholder management steps (Identify, Assess, Plan Communications, Engage) must be repeated throughout the life cycle as part of an ongoing cycle of review.


## Stakeholder Management in Projects, Programmes, and Portfolios

### Small Projects

- On a small project, the project manager will probably be able to identify all the stakeholders, perhaps with help from the sponsor.

- A simple stakeholder map will suffice, and the communications activities may be included directly in the overall project plan rather than a separate document.

- Stakeholder management is an important activity, even on the smallest of projects. A project manager can make a big difference to the eventual success of the project simply by understanding their stakeholders and taking the time to engage with and influence them.

### Programmes and Large Projects

- Stakeholder maps should be created at different levels (e.g., a programme-level map and separate maps for each component project).

- Stakeholders should only appear on a map where they have an identifiable interest or influence for that level.

    - Those with an interest in a single project should be on that project-level map.

    - Those with an interest in multiple projects, or the business-as-usual areas being affected by the programme, should also appear on the **programme-level map**.

- Where stakeholders appear on the programme-level map because they have an interest in multiple projects, the map must clearly differentiate their interests and influence in each one.

- This ensures that a single stakeholder appears in **only one communication plan** (the programme-level one), which avoids the danger of them receiving mixed or conflicting messages from different project managers.

- The programme support office will often maintain the stakeholder documentation and may include a communication specialist.

### Structured Portfolios

- The portfolio management team needs to co-ordinate the stakeholder management activity of all component projects, programmes, and business-as-usual areas within the portfolio.

- They must also create and maintain a portfolio-wide stakeholder management plan, which needs to cover strategic aspects such as:

    - The overall stakeholder management **policy**, including key stakeholder groups and interfaces with corporate functions.

    - How adherence to the stakeholder management policy will be **monitored**.

    - How stakeholder management at the project and programme level will be **co-ordinated and supported**.

    - Gathering and publicising **senior management support** for the portfolio's processes and content.

> [!WARNING]
> Stakeholder management can be one of the most challenging activities within a structured portfolio. The broad and significant change management across the entire portfolio can be undermined if there are local areas of the organisation with poor stakeholder commitment.


## Praxis for Data & Business Intelligence: Managing the Analytics Stakeholder Matrix

Stakeholder management in Data Engineering and Business Intelligence projects is uniquely complex because data teams sit in the middle of a **two-sided marketplace**: they consume data from operational application owners (who rarely care about analytical reporting) and deliver insights to business executives (who demand absolute accuracy but lack technical data fluency).

```
The Data Team at the Center of Competing Stakeholder Pressures:
           ┌────────────────────────────────────────────────────────┐
           │        Upstream Source Owners (SAP / CRM / ERP)        │
           │  Priority: High uptime, rapid feature delivery        │
           │  Friction: View downstream pipelines as secondary     │
           └───────────────────────────┬────────────────────────────┘
                                       │
                                       ▼ (Upstream Schema Changes)
                     ┌───────────────────────────────────┐
                     │ Central Data & Analytics Squad    │
                     │ (Data PM, Analytics Eng, BI Devs) │
                     └─────────────────┬─────────────────┘
                                       │
            ┌──────────────────────────┴──────────────────────────┐
            ▼                                                     ▼
┌──────────────────────────────────────┐  ┌──────────────────────────────────────┐
│  Executive Decision Makers (CFO/VPs) │  │ Department Power Users (Excel Leads) │
│  Priority: Decision speed, trust     │  │ Priority: Autonomy, speed, ad-hoc    │
│  Friction: Low patience for delays   │  │ Friction: Fear central IT bottlenecks│
└──────────────────────────────────────┘  └──────────────────────────────────────┘
```

---

### 1. The Four Primary Data Stakeholder Archetypes

Praxis defines tailored engagement strategies across four dominant stakeholder archetypes:

| Stakeholder Archetype | Dominant Concerns & Motivations | Primary Project Risk | Tactical Praxis Engagement Strategy |
| :--- | :--- | :--- | :--- |
| **Executive Decision Makers** (C-Suite, VP Finance, Head of Sales) | Decision velocity, auditability, single source of truth for revenue and KPIs. | Dashboard abandonment; losing trust after a single bad data incident. | Deliver vertical MVP slices early; establish automated General Ledger reconciliations; schedule monthly adoption reviews. |
| **Upstream Source Owners** (Core Banking, Salesforce, ERP Leads) | Operational transactional uptime; low database query overhead; developer autonomy. | Breaking downstream pipelines via unannounced schema migrations. | Institute formal [[Product Documents#1. The Producer-Consumer Data Contract|Producer-Consumer Data Contracts]]; integrate contract schema checks into upstream CI/CD pipelines. |
| **Department Analysts** ("Excel Power Users") | Agility, flexibility, ability to answer ad-hoc questions without waiting for IT. | Reverting to shadow databases and ungoverned desktop spreadsheets. | Provide "Analyze in Excel" live bridges to Gold semantic models; establish weekly Data Office Hours; embed "Data Champions." |
| **Security & Compliance** (CISO, DPO, Internal Audit) | Zero regulatory liability; GDPR, HIPAA, SOC-2 compliance; least-privilege access. | Project delivery blocked by last-minute compliance and privacy audits. | Involve compliance during the [[Definition Process]]; implement automated PII classification and dynamic column masking in Unity Catalog. |

---

### 2. The Analytics Translator: Bridging Business & Engineering

A common failure in enterprise data initiatives is assigning a pure infrastructure engineer to gather business requirements, resulting in either misunderstood KPIs or technical over-engineering. 

Praxis champions the role of the **Analytics Translator** (often performed by the Data Product Owner or Lead Analytics Engineer):

- **Bi-Directional Translation**: Translates ambiguous business queries (*"We need a 360-degree view of churn"*) into rigorous technical criteria (*"SCD Type-2 customer dimension tracking monthly active subscriptions with 30-day inactivity threshold"*).
- **Managing Metric Disputes**: When Sales and Marketing calculate "Qualified Lead" differently, the Translator facilitates consensus workshops to standardize enterprise metric definitions in the semantic layer.

---

### 3. Stakeholder Influence-Interest Grid for Modern Data Platforms

```
HIGH INFLUENCE
  ▲
  │ [Upstream Source Owners]              [Executive Sponsors (CFO / CDO)]
  │ - Strategy: Keep Satisfied            - Strategy: Manage Closely
  │ - Mechanism: Data Contracts & APIs    - Mechanism: KPI Dashboards & Demos
  │
  │ [Security & Legal / CISO]             [Department Power Users & Champions]
  │ - Strategy: Monitor & Involve Early   - Strategy: Keep Informed & Empower
  │ - Mechanism: PII Masking & Purview    - Mechanism: Training & Self-Service
  └────────────────────────────────────────────────────────────────────────►
LOW INTEREST                                                  HIGH INTEREST
```

---

## Flashcard Q&A

- **Q:** Who is a stakeholder?
    - **A:** Any individual or group with an interest in the project, programme, or portfolio because they are involved in the work or affected by its outcomes.

- **Q:** What are the four primary goals of stakeholder management?
    - **A:** 1. Understand stakeholder views, 2. Influence them to be supportive, 3. Maximise the impact of supporters, and 4. Minimise the impact of non-supporters.

- **Q:** What is stakeholder mapping?
    - **A:** A technique used to assess stakeholders, typically based on their level of interest and influence, to help plan how to engage with them.

- **Q:** Why is it important to repeat the stakeholder management procedure throughout the life cycle?
    - **A:** Because stakeholders’ views, roles, or allegiances can change over time.

- **Q:** In a programme, why should a stakeholder who is interested in multiple projects be managed at the programme level?
    - **A:** To ensure they appear in only one communication plan and to avoid the danger of them receiving mixed or conflicting messages from different project managers.


---
## Navigation & Related Notes
- **Up**: [[00 - Overview|Stakeholder Management Overview]]
- **Next**: [[Manage Stakeholders]]

### Related Concepts & Artefacts
- [[Stakeholder Management Plan]]
- [[Stakeholder Register]]
- [[Communication Plan]]
- [[Manage Stakeholders Competency|Manage Stakeholders]]
