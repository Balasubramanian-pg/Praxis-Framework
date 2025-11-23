---
Title: Resource scheduling 29183b71d8f38034ba46fa9d9880fa15
Area: Projects
Type: Project
Status: Draft
Source: 05. Projects/Project Management/Resource scheduling 29183b71d8f38034ba46fa9d9880fa15.md
Created: ''
Updated: ''
Tags: ''
Topic: ''
---
 

![](white%20135.svg)

# Resource scheduling

|   |   |
|---|---|
|![](arrow-circle-down_gray%20135.svg)Area|Knowledge|
|![](arrow-circle-down_gray%20135.svg)Pillar|Manage|
|![](arrow-circle-down_gray%20135.svg)Section|Schedule management|
|![](arrow-circle-down_gray%20135.svg)Sub Area|Management|

# Comprehensive Study Notes: Resource Scheduling

## General Principles of Resource Scheduling

- **Definition**: Resource scheduling is a collection of techniques used to analyse the resources required to deliver the work and _when_ they will be required.

- It is a **supplement** to time scheduling, not an alternative. It takes the logical model from time scheduling and adds the constraint of resource availability to create a more realistic plan.

### The Goals of Resource scheduling

- The primary goals of this function are to ensure:
    
    1. **Efficient and effective utilisation** of resources.
    
    2. **Confidence** that the resulting schedule is realistic and achievable.
    
    3. Early identification of resource capacity **bottlenecks and conflicts**.

---

## The Resource Scheduling Procedure

1. **Allocate Resources**:
    
    - The model of work activities developed in the time scheduling function is used as the basis for allocating resources to each component of work.
    
    - This will comprise quantities of **consumable resources** (e.g., materials) or the **effort** required from **reusable resources** (e.g., people, machinery).

2. **Aggregate Resources**:
    
    - Once resources have been allocated and an initial time schedule has been calculated, the resources required for each time period can be aggregated (summed up).
    
    - The results of this aggregation are normally presented as a **resource histogram**, which shows the total demand for a resource period by period (e.g., day-by-day or week-by-week).

3. **Calculate Schedule (Resource-Limited)**:
    
    - The initial aggregation almost inevitably leads to a demand profile with periods where demand exceeds the available supply (peaks) or where resources are idle (troughs).
    
    - The purpose of this final step is to use resource-limited scheduling techniques to modify the timings of activities to deal with these peaks and troughs.

---

## Consumable vs. Reusable Resources

- From a scheduling point of view, there are two broad categories of resources:
    
    1. **Consumable Resources**:
        
        - These are typically materials that are used up by an activity (e.g., bricks, concrete, paper).
        
        - The schedule for consumable resources forms the basis of the procurement plan, including details such as the timing of deliveries.
        
        - Scheduling may reveal issues with materials or components that have long lead times and need to be ordered well in advance, sometimes even before the work is fully authorised.
    
    2. **Reusable Resources**:
        
        - These are resources like people and machinery that perform the work but are not consumed by it.
        
        - Reusable resources are rarely, if ever, limitless, and the schedule needs to be reviewed to take these limitations into account. This leads to the techniques of resource-limited scheduling.

---

## Resource-Limited Scheduling Techniques

- There are two main approaches to reconciling the conflict between resource limits and time constraints: resource smoothing and resource levelling.

### 1. Resource Smoothing (Time-Limited Resource Scheduling)

- **Process**: This technique reschedules activities, using their available float, to reduce the peaks and troughs of resource demand _while retaining the original finish date_ calculated by critical path analysis.

- **Outcome**: It results in a "smoothed" resource histogram where the variations in demand are reduced but not necessarily eliminated. Demand may still exceed supply in some periods.

- **When to Use**: A smoothed schedule is useful where it is possible and practical to procure additional temporary resources to cover the remaining periods of peak demand. The primary constraint is **time**.

### 2. Resource Levelling (Resource-Limited Scheduling)

- **Process**: This technique reschedules activities to ensure that the demand for a resource **never exceeds its availability**.

- **Outcome**: This almost always results in an **increase in the time taken to complete the work** (i.e., the project finish date will be delayed).

- **When to Use**: This approach is more appropriate when there are strict, fixed limits on the available resources and the finish date is flexible. The primary constraint is the **resource**.

> [NOTE]  
> In reality, a simple smoothing or levelling of all resources simultaneously does not reflect the true situation. Some resources may be flexible while others are not. A better understanding can be achieved through a form of sensitivity analysis where resources are scheduled individually to see their specific impact. Techniques like Critical Chain can also be used to address these issues in a different way.

---

## Resource Scheduling in Projects, Programmes, and Portfolios

### Projects

- Most detailed resource-limited scheduling techniques are performed at the project level, based on the network diagram created during time scheduling.

### Programmes and Large Projects

- As explained in time scheduling, creating a single, detailed schedule for an entire programme is impractical.

- Once the overall schedule is broken down into component schedules, each one can be resource-scheduled locally.

- The problem with this is that local resource decisions (e.g., a project manager deciding to use a key specialist for an extra month) can have a wider impact on other projects that is then lost.

- A balance must be found between creating an overly large and detailed central schedule and creating a series of local schedules that do not reflect all the interdependencies.

### Portfolios and Programmes (Capacity Planning)

- Where the work is sufficiently large or complex to warrant multiple schedules, the programme or portfolio management team should focus on **capacity planning**.

- **Capacity**: The maximum amount of work that an organisation is capable of completing in a given period with the resources available.

- The programme or portfolio management team must consider the capacity of the resources available to their work.

- A common approach is for the portfolio/programme team to allocate portions of the available resources to the component projects, where the detailed scheduling is then done.

- The component resource schedules may then be consolidated for review at the higher level, and the process is repeated until a satisfactory balance of resource distribution is achieved.

- This is a key part of the **balancing** activity in the portfolio management process.

---

## Flashcard Q&A

- **Q:** What is the primary purpose of resource scheduling?
    - **A:** To supplement time scheduling by analysing resource requirements to ensure efficient utilisation and to create a realistic, achievable schedule.

- **Q:** What is the main difference between resource smoothing and resource levelling?
    - **A:** **Resource smoothing** aims to reduce peaks in resource demand while keeping the original finish date (time-constrained). **Resource levelling** ensures resource demand never exceeds availability, which usually delays the finish date (resource-constrained).

- **Q:** What is a resource histogram?
    - **A:** A chart that shows the aggregated demand for a specific resource period by period (e.g., week-by-week) over the course of the project.

- **Q:** What are the two broad categories of resources from a scheduling perspective?
    - **A:** Consumable resources (e.g., materials) and reusable resources (e.g., people, machinery).

- **Q:** What is "capacity planning" and at what level is it most important?
    - **A:** It is the process of considering the maximum amount of work an organisation can complete in a given period. It is a key focus for programme and portfolio management teams.