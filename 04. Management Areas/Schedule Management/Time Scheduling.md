---
Title: Time scheduling 29183b71d8f380f3a9fed1213ff04eae
Area: Projects
Type: Project
Status: Draft
Source: 05. Projects/Project Management/Time scheduling 29183b71d8f380f3a9fed1213ff04eae.md
Created: ''
Updated: ''
Tags: ''
Topic: ''
---
 

![](white%20158.svg)

# Time scheduling

|   |   |
|---|---|
|![](arrow-circle-down_gray%20158.svg)Area|Knowledge|
|![](arrow-circle-down_gray%20158.svg)Pillar|Manage|
|![](arrow-circle-down_gray%20158.svg)Section|Schedule management|
|![](arrow-circle-down_gray%20158.svg)Sub Area|Management|

# Comprehensive Study Notes: Time Scheduling

## General Principles of Time Scheduling

- **Definition**: Time scheduling techniques are used to develop and present schedules that show **when** work will be performed and products will be delivered.

### The Goals of Time Scheduling

- The primary goals of this function are to:
    
    1. Construct a logical **model** of the work for use in numerical analysis.
    
    2. Calculate the start and finish **dates** for the components of work.
    
    3. Determine where there is **flexibility** (float) in the schedule.

---

## The Time Scheduling Procedure

1. **Model**:
    
    - Once the work has been identified (e.g., through a Work Breakdown Structure), a model is built that reflects the sequence of the work and the time required to complete each component.
    
    - This "logical model" must also be supplemented by **external constraints**, such as a regulatory approval date or the delivery of a procured component.

2. **Calculate**:
    - Once the model reflects the internal logic of the work and the external constraints, the schedule is calculated to determine the start and finish dates for all activities.

3. **Present**:
    - The results of the calculation are then presented in a format suitable for the relevant stakeholders (e.g., a Gantt chart, a milestone chart).

> [NOTE]  
> In reality, these steps are by no means sequential. The model will be adjusted, constraints will be reviewed, and the calculation will be repeated many times in an iterative process to arrive at the optimum schedule.

---

## Key Techniques and Concepts in Time Scheduling

### Choosing the Right Technique

- The choice of scheduling technique depends on the context of the work. Factors affecting the choice include:
    
    - The **life cycle phase** (scheduling in the identification phase is high-level; in the delivery phase, it is detailed).
    
    - Whether the scope is well-defined (**traditional**) or flexible (**agile**).
    
    - Whether the schedule is a **summary** of other schedules (e.g., a programme schedule).
    
    - The **audience** for the information (e.g., a senior stakeholder vs. a delivery team).

> [CAUTION]  
> The use of scheduling methods that are inappropriate to the needs of the work can cause significant problems. An overly complex approach is just as bad as an overly simplistic one.

### Modelling and Calculation Techniques

- **Network Diagram**:
    - The most common mechanism for building a schedule model. It is made up of all the interconnected activities required to achieve the objectives.

- **Critical Path Analysis (CPA)**:
    
    - The simplest form of calculating a schedule based on a network diagram.
    
    - CPA calculates the earliest and latest start and finish dates for all activities.
    
    - Some activities will have flexibility, which is referred to as **float** (or slack).
    
    - The sequence of activities with no float is referred to as the **critical path**. Any delay to an activity on the critical path will delay the entire project.

- **Shortcomings of CPA**:
    
    1. It takes no account of the effect on the schedule of **limited resources**. This is addressed by **resource scheduling**.
    
    2. It assumes a **single-point estimate** of the time required for each activity.

- **Addressing Uncertainty (Range Estimating)**:
    
    - Estimating is an inexact science. It is far more realistic to use a **range of duration estimates** (e.g., optimistic, most likely, pessimistic) rather than a single-point estimate.
    
    - This leads to statistical techniques such as **PERT** (Program Evaluation and Review Technique) or **Monte Carlo analysis**, which calculate a probabilistic finish date rather than a deterministic one.

- **Earned Value Management (EVM)**:
    
    - This is a control technique that combines the effect of both time and cost.
    
    - It measures progress in terms of the "value" of the work completed rather than just the elapsed time, providing more accurate predictions of future performance.

---

## Time Scheduling in Projects, Programmes, and portfolios

### Projects

- Network diagrams are most applicable to **traditional projects** where there is a clear specification for a unique output. They are less suitable for:
    
    - Projects that produce multiple **repetitive products** (e.g., building a housing estate), where techniques like **Line of Balance** may be more appropriate.
    
    - **Agile projects**, where a full specification isn’t available upfront. Agile projects focus more on techniques like **timeboxes**, **sprints**, and **MoSCoW** prioritisation.

- **The Challenge of Scale**: As projects become larger, there is a temptation to build ever-larger and more complex schedule models. However, the larger the model, the harder it is for a manager to have an intuitive feel for cause and effect when making decisions. **Sensitivity analysis** can be useful in assessing the impact of different factors on the schedule.

### Programmes and Large Projects

- Creating a single, homogenous, detailed model for an entire programme is rarely successful or practical.

- Programmes and large projects need to create **multiple schedules** that may be linked by a few key milestones or arranged in a **hierarchy**.

- Ideally, this series of interconnected schedules will reflect the organisation structure to some degree, so that individuals can schedule the work they are responsible for without their schedule being constantly and automatically changed by updates to someone else’s schedule.

- Specialist planning resources, often as part of a **support office**, are needed to manage the interdependencies between these different schedules and interpret the implications for the management team.

### Portfolios

- The logical interdependencies between projects and programmes in a portfolio should be minimal.

- If there are significant dependencies between two or more projects, the portfolio management team should consider whether they would be managed more effectively as a single, larger project or as a programme.

- The portfolio's main concern with time scheduling relates to resource and financial capacity planning, which requires consistent and accurate high-level schedule information from its components.

---

## Flashcard Q&A

- **Q:** What are the three steps in the time scheduling procedure?
    - **A:** Model, Calculate, and Present.

- **Q:** What is the "critical path"?
    - **A:** The sequence of activities in a network diagram that has no flexibility (zero float). Any delay to an activity on the critical path will delay the entire project.

- **Q:** What are the two major shortcomings of simple Critical Path Analysis (CPA)?
    - **A:** 1. It does not account for limited resources, and 2. It assumes a single-point estimate for activity durations.

- **Q:** What is a key difference in the scheduling approach for traditional vs. agile projects?
    - **A:** Traditional projects use network diagrams based on a detailed specification. Agile projects use techniques like timeboxes and sprints where the detailed work is planned iteratively.

- **Q:** Why is creating a single, detailed schedule for an entire programme generally a bad idea?
    - **A:** It is too complex and unmanageable. It is better to create a hierarchy of linked schedules that reflect the programme's structure, with specialists managing the interdependencies.