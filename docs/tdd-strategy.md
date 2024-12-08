# Testing Strategy 🧪

## Test-Driven Development (TDD)

- We implemented TDD by follwing this cycle:

  1. Write tests 📝
  2. Tests fail ❌
  3. Write code 🧑‍💻
  4. Tests pass ✅
  5. Refactor 🔄

- Using this method, we made sure that all user acceptance criteria was met and produced high quality code.

## Behavior-Driven Development (BDD) 🧑‍🤝‍🧑

- We defined system behaviors in clear scenarios using the "Given, When, Then" format. This approach improved communication between developers and non-technical stakeholders, ensuring everyone had a shared understanding of the system's behavior.

## Unit Tests

- Unit tests were developed using **Pytest**, focusing on validating individual components of the system.

## Functional Tests

- Functional tests were expanded using **Postman**, with **Postbot** utilized to validate end-to-end scenarios (e.g., user login, account management, and transaction processing) in the User Acceptance Testing (UAT) environment.

## Integration with CI/CD 🔗

- Functional tests are integrated into the build and deployment workflows. We use GitHub status checks to ensure that only pull requests passing all tests can be merged into the main branch.
- This integration ensures high-quality code throughout the development lifecycle, from development to deployment.

---

## Example Tests for Specific User Stories

Below are some examples of tests implemented for specific user stories, found in `safebank-be/tests/functional/test_routes.py`:

| **User Story**                                                                                        | **Acceptance Criteria**                                                                                                                                                                                                                                                                | **Related Tests**                                                                                                                                                                                                                                                                                                                                                                                |
| ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **[215 Transfer Money](https://dev.azure.com/rsagasteguiieu2022/safebank/_workitems/edit/215)**       | **GIVEN** a transfer request<br>**WHEN**:<br>- The source and target bank accounts exist<br>- The source account belongs to the user<br>- The amount to transfer is a non-negative number<br>- The source account has sufficient balance<br>**THEN** the transfer is made successfully | `test_transfer(...):`<br>Test that a transfer between accounts of a user is made successfully.<br>`test_invalid_transfers(...):`<br>Test that a transfer fails if the amount is negative or too large.<br>`test_transfer_between_users(...):`<br>Test that a transfer between two different users is successful.                                                                                 |
| **[165 Manage User Accounts](https://dev.azure.com/rsagasteguiieu2022/safebank/_workitems/edit/165)** | **GIVEN** valid admin credentials<br>**WHEN** accessing the user management portal<br>**THEN** Admins can:<br>- View a list of all users<br>- View a list of all transactions<br>- Create, update, and delete users                                                                    | `test_create_user(...):`<br>Test that a user is created successfully.<br>`test_get_users(...):`<br>Test that a list of users can be retrieved.<br>`test_get_transactions(...):`<br>Test that a list of transactions can be retrieved.<br>`test_update_user(...):`<br>Test that a user’s information can be updated.<br>`test_delete_user(...):`<br>Test that a user can be deleted successfully. |
| **[207 User Login](https://dev.azure.com/rsagasteguiieu2022/safebank/_workitems/edit/207)**           | **GIVEN** valid user credentials<br>**WHEN** a user fills out the login form<br>**THEN** the system will authenticate the user and redirect them to their user page. If credentials are invalid, the user sees an error message.                                                       | `test_user_login(...):`<br>Test that a user can log in successfully.<br>`test_unsuccessful_user_login(...):`<br>Test that a user with invalid credentials cannot log in.                                                                                                                                                                                                                         |
