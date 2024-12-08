# **Functional Requirements**

Each functional requirement in this document was thoughtfully designed with a **user-centric approach**. Regular collaboration between **Karl (Product Owner)** and **Clara (Cloud Architect)** ensured that user needs remained the focal point of the design process. The requirements were frequently revisited and adapted based on the team’s capacity and evolving decisions, striking a balance between functionality, scalability, and feasibility.


---

## **User Portal**

### **Welcome Page**  
- **FR1:** The website must display a welcome page with three button options:  
  - **"Create New User Account"** 🟢  
  - **"User Log In"** 🔵  
  - **"Admin Log In"** 🔴

---

### **User Registration**  
- **FR2:** When users click the **"Create New User Account"** button, they must be directed to a registration page.  
- **FR3:** The registration page must include fields for entering:  
  - **"Username"** 🧾  
  - **"Password"** 🔒  
  - **"Password Confirmation"** 🔑  
- **User story**: https://dev.azure.com/rsagasteguiieu2022/safebank/_backlogs/backlog/safebank%20Team/Epics?workitem=176
- **FR4:** If the user does not enter matching passwords, an **error message** must be displayed.  
- **FR5:** If the user selects a username that already exists, an **error message** must be displayed.  
- **FR6:** Upon successful registration, the system must:  
  - Automatically generate a **unique bank account number** for the user.  
  - Link the account number to the user's profile.  
- **FR7:** After completing registration, the system must display a **confirmation message** indicating that the account has been created and providing next steps for login.

---

### **User Login**  
- **FR8:** When users click the **"User Log In"** button, they must be directed to a login page with fields for entering:  
  - **"Username"**  
  - **"Password"**  
- **User story**: https://dev.azure.com/rsagasteguiieu2022/safebank/_backlogs/backlog/safebank%20Team/Epics?workitem=328
- **FR9:** If users enter incorrect login credentials, the system must display an **error message** prompting them to re-enter valid login details.  
- **FR10:** Both the login page and the registration page must include an option to return to the home page.  
- **FR11:** Upon successful login, users must be redirected to their personalized account management portal.

---

### **Account Management Portal**  
- **FR12:** The account management portal must display a list of all bank accounts linked to the user’s profile, showing:  
  - **Username**  
  - **Account number**  
  - **Country**
  - **Account balance**  
  - **Currency**  
  - **Status**  
- **User story**: https://dev.azure.com/rsagasteguiieu2022/safebank/_backlogs/backlog/safebank%20Team/Epics?workitem=173
- **FR13:** Users must be able to view details for specific transactions in their transaction history, including:  
  - **Transaction origin**  
  - **Source account**  
  - **Currency**  
  - **Amount**  
  - **Date**  
- **FR14:** The account management portal must include a **"Transfer Money"** button, accessible to logged-in users.
- **User story**: https://dev.azure.com/rsagasteguiieu2022/safebank/_backlogs/backlog/safebank%20Team/Epics?workitem=170

---

### **Money Transfers**  
- **FR15:** When users click **"Transfer Money"**, they must be directed to a transfer form where they can enter:  
  - The **recipient's account number**  
  - The **transfer amount**  
- **FR16:** If users attempt to transfer an amount exceeding their account balance, the system must display an **error message**.  
- **FR17:** Upon successful completion of a money transfer, the system must display a **confirmation message** with transaction details.

---

### **Form Validation**  
- **FR18:** All forms in the user portal (e.g., registration, login, money transfer) must include basic validation to ensure all required fields are filled before submission.

---

## **Admin Portal**

### **Admin Login**  
- **FR19:** When admins click the **"Admin Log In"** button, they must be directed to an admin login page with fields for entering:  
  - **Administrator username**  
  - **Administrator password**  
- **User story**: https://dev.azure.com/rsagasteguiieu2022/safebank/_backlogs/backlog/safebank%20Team/Epics?workitem=162

- **FR20:** If admins enter incorrect login credentials, the system must display an **error message** prompting them to re-enter valid login details.  
- **FR21:** Upon successful login, admins must gain access to a user management portal.

---

### **User Management**  
- **FR22:** The user management portal must display a list of all registered bank users.  
- **FR23:** Admins must be able to view each user account, including:  
  - **Username**  
  - **Account name**  
  - **Account number**  
  - **Account balance**  
  - **Account currency**  
  - **Status**  
  - **Actions (edit and delete)**  
- **FR24:** Admins must have the ability to create new users by filling out a form with:  
  - **Username**  
  - **Initial password**  
- **FR25:** Admins must be able to update existing user information, including resetting passwords.  
- **FR26:** Admins must have the ability to delete users, which includes:  
  - Removing their bank accounts  
  - Deleting all associated data from the system  

---

### **Transaction Management**  
- **FR27:** Admins must also have the ability to view the transaction history of all accounts.

---

### **Form Validation**  
- **FR28:** All forms in the admin portal (e.g., user creation, updating information) must include basic validation to ensure all required fields are filled before submission.

# **FR to User Story Mapping**

| **FR Number** | **Functional Requirement**                                                                                  | **Related User Stories**                                                                                                                                  | **Acceptance Criteria**                                                                                                                |
|---------------|--------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| **FR1–FR7**   | The system must allow users to register and create a new bank account with validation for unique usernames and secure password storage.            | **As a new user, I want to register and create a bank account.**                                                                                         | User successfully signs up, and a unique account is created. Passwords are hashed before storage. Errors are displayed for invalid inputs. |
| **FR8–FR11**  | Users must be able to log in securely and access their personalized account management portal.                                                    | **As an admin, I want a default account with hashed credentials to access the system securely.**                                                         | Admin credentials are hashed and stored securely. Default credentials cannot be deleted. Error message for invalid login credentials.       |
| **FR12–FR14** | Users can view their bank accounts and transaction history within the account management portal.                                                   | **As a user, I want to view my bank accounts and transactions.**                                                                                         | Accounts and transactions are displayed with details.                                                                                     |
| **FR15–FR17** | The system must allow users to transfer money between accounts with validation for sufficient balance.                                              | **As a user, I want to transfer money between accounts.**                                                                                                | Transfer completes successfully if the amount is within balance limits. Errors are displayed for invalid or insufficient transfers.         |
| **FR18**      | All forms in the system must include validation to ensure required fields are filled before submission.                                             | **As a Site Reliability Engineer, I want to monitor key SLIs to ensure performance and reliability targets are met.**                                     | Monitoring includes key metrics like uptime, speed, error rates, and transaction success rates. Alerts trigger automatically for breaches.   |
| **FR19–FR21** | Admins must be able to securely log in to an admin portal with proper authentication and error handling.                                            | **As a DevOps engineer, I want to update the backend deployment workflow to use Azure Key Vault for managing secrets securely.**                          | Backend deployment workflows use Key Vault for secrets. Workflows are secure and succeed without hardcoded credentials.                     |
| **FR22–FR26** | Admins must be able to create, update, delete, and reset passwords for user accounts, with proper error handling and validation.                    | **As an admin, I want the ability to create, update, delete, and reset passwords for bank users with proper error handling.**                             | Admin can manage user accounts, validate inputs, hash passwords, and display success or error messages for actions.                         |
| **FR27**      | Admins must be able to view the transaction history of all user accounts.                                                                          | **As a Site Reliability Engineer, I want to create an interactive Azure Workbook that visualizes key SLIs.**                                              | Workbook includes real-time and historical trends, filters for regions and components, and displays alerts for breached thresholds.         |
| **FR28**      | All forms in the admin portal must include validation to ensure required fields are filled before submission.                                       | **As a cybersecurity engineer, I want to securely store sensitive credentials in Azure Key Vault.**                                                      | Key Vault stores all secrets securely, and logs track secret access.                                                                      