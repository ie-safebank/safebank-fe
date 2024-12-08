# **User Stories: A Cloud Architect’s Perspective**

As a Cloud Architect, my role in the SafeBank project went beyond simply designing the infrastructure; it required constant collaboration with developers, ensuring alignment between technical execution and business goals. Throughout the project, I had to actively review, refine, and delete user stories to maintain clarity and focus. This process evolved over time, demanding a structured approach to documenting user stories while addressing the complexity and priority of features.

---

## **Creating and Managing User Stories**

### **1. Dividing the User Stories**
To streamline the development process, I categorized user stories into **Epics**, **Features**, and **User Stories**:
![User Portal User Stories](images/Userportal.png)
- **Epics**: Represented high-level goals such as the Admin Portal, User Portal, and Infrastructure Management.
- **Features**: Subdivided Epics into tangible deliverables like "User Login" or "Modularize Core Infrastructure."
- **User Stories**: Focused on specific user needs, documented using the format:
  - **Title**: "As a [user role], I want to [achieve a goal] so that [benefit is delivered]."

### **2. Prioritizing Complexity and Features**
- User stories were prioritized based on **business value** and **technical complexity**, with priorities ranging between 1 (highest) and 4 (lowest).
- However, given the importance of SafeBank’s features, the majority of stories were prioritized between **1 and 2**, ensuring critical deliverables were tackled first.

---

## **Documenting User Stories**

Each user story was documented with the following details to ensure consistency and clarity:
![User Stories](images/document.png)
1. **Title**: Following the format, "As a [user role], I want to..."
2. **Tasks**:
   - User stories were broken into smaller tasks to simplify execution.
   - Tasks were assigned to appropriate roles such as Infrastructure Developer or Scrum Master.
3. **Acceptance Criteria**:
   - Clear, measurable criteria to verify when a story was complete.
   - Examples:
     - "Admin can add a new user with username validation."
     - "Passwords for new users are hashed before storage."
     - "Error messages are displayed for invalid inputs."

---

## **Example User Stories**

### **Admin Portal**
#### **Epic: Admin Portal**
- **Feature**: Admin Login and User Management
  - **User Story**:  
    - **Title**: "As an admin, I want the ability to create, update, delete, and reset passwords for bank users with proper error handling."
    - **Tasks**:
      - Implement hashing for admin credentials.
      - Display error messages for invalid inputs.
    - **Acceptance Criteria**:
      - Admin can add a new user with username validation.
      - Passwords for new users are hashed before storage.
      - Display error messages for invalid inputs.
      - Successful operations display a confirmation message.
    - **Priority**: 1

---

## **Refining the Backlog**

The backlog was a living document that evolved as the project progressed:
- **Dynamic Updates**: User stories were refined during Sprint Planning and Retrospectives.
- **Deleting User Stories**: I regularly reviewed the backlog to remove outdated or redundant stories, ensuring focus on critical tasks.

---

## **Key Takeaways**

As a Cloud Architect, managing user stories required:
1. **Continuous Collaboration**: Working closely with developers to ensure user stories aligned with technical and business goals.
2. **Attention to Detail**: Breaking down complex requirements into clear, actionable tasks.
3. **Agility**: Adapting to changes and refining the backlog to maintain focus on delivering value.

By documenting user stories effectively and ensuring clarity in their structure, SafeBank successfully delivered a secure, scalable, and user-centric solution.

---

