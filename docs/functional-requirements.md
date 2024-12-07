# Functional Requirements

## User Portal

### Welcome Page  
- **FR1:** The website must display a welcome page with three button options:  
  - "Create New User Account"  
  - "User Log In"  
  - "Admin Log In"

---

### User Registration  
- **FR2:** When users click the "Create New User Account" button, they must be directed to a registration page.  
- **FR3:** The registration page must include fields for entering:  
  - "Username"  
  - "Password"  
  - "Password Confirmation"  
- **FR4:** If the user does not enter matching passwords, an error message must be displayed.  
- **FR5:** If the user selects a username that already exists, an error message must be displayed.  
- **FR6:** Upon successful registration, the system must:  
  - Automatically generate a unique bank account number for the user.  
  - Link the account number to the user's profile.  
- **FR7:** After completing registration, the system must display a confirmation message indicating that the account has been created and providing next steps for login.

---

### User Login  
- **FR8:** When users click the "User Log In" button, they must be directed to a login page with fields for entering:  
  - "Username"  
  - "Password"  
- **FR9:** If users enter incorrect login credentials, the system must display an error message prompting them to re-enter valid login details.  
- **FR10:** Both the login page and the registration page must include an option to return to the home page.  
- **FR11:** Upon successful login, users must be redirected to their personalized account management portal.

---

### Account Management Portal  
- **FR12:** The account management portal must display a list of all bank accounts linked to the user’s profile, showing:  
  - Username  
  - Account number  
  - Account balance  
  - Currency  
  - Status  
- **FR13:** Users must be able to view details for specific transactions in their transaction history, including:  
  - Transaction origin  
  - Source account  
  - Currency  
  - Amount  
  - Date  
- **FR14:** The account management portal must include a "Transfer Money" button, accessible to logged-in users.

---

### Money Transfers  
- **FR15:** When users click "Transfer Money," they must be directed to a transfer form where they can enter:  
  - The recipient's account number  
  - The transfer amount  
- **FR16:** If users attempt to transfer an amount exceeding their account balance, the system must display an error message.  
- **FR17:** Upon successful completion of a money transfer, the system must display a confirmation message with transaction details.

---

### Form Validation  
- **FR18:** All forms in the user portal (e.g., registration, login, money transfer) must include basic validation to ensure all required fields are filled before submission.

---

## Admin Portal

### Admin Login  
- **FR19:** When admins click the "Admin Log In" button, they must be directed to an admin login page with fields for entering:  
  - Administrator username  
  - Administrator password  
- **FR20:** If admins enter incorrect login credentials, the system must display an error message prompting them to re-enter valid login details.  
- **FR21:** Upon successful login, admins must gain access to a user management portal.

---

### User Management  
- **FR22:** The user management portal must display a list of all registered bank users.  
- **FR23:** Admins must be able to view each user account, including:  
  - Username  
  - Account name  
  - Account number  
  - Account balance  
  - Account currency  
  - Status  
  - Actions (edit and delete)  
- **FR24:** Admins must have the ability to create new users by filling out a form with:  
  - Username  
  - Initial password  
- **FR25:** Admins must be able to update existing user information, including resetting passwords.  
- **FR26:** Admins must have the ability to delete users, which includes:  
  - Removing their bank accounts  
  - Deleting all associated data from the system  

---

### Transaction Management  
- **FR27:** Admins must also have the ability to view the transaction history of all accounts.

---

### Form Validation  
- **FR28:** All forms in the admin portal (e.g., user creation, updating information) must include basic validation to ensure all required fields are filled before submission.
