<template>
  <div class="jumbotron vertical-center">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h1>Accounts</h1>
          <hr />
          <br />
          <!-- Allert Message -->
          <b-alert v-if="showMessage" variant="success" show>{{
            message
          }}</b-alert>
          <!-- b-alert v-if="error" variant="danger" show>{{ error }}</b-alert-->

          <button
            type="button"
            class="btn btn-success btn-sm"
            v-b-modal.account-modal
          >
            Create Account
          </button>

          <button
            type="button"
            class="btn btn-success btn-sm"
            v-b-modal.user-modal
          >
            Create User
          </button>
          <br /><br />

          <h2>Users</h2>
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Username</th>
                <th scope="col">Country</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.username }}</td>
                <td>{{ user.country }}</td>
                <td>
                  <div class="btn-group" role="group">
                    <button
                      type="button"
                      class="btn btn-info btn-sm"
                      v-b-modal.edit-user-modal
                      @click="editUser(user)"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger btn-sm"
                      @click="deleteUser(user)"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>


          <h2>Accounts</h2>
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Username </th>
                <th scope="col">Account Name</th>
                <th scope="col">Account Number</th>
                <th scope="col">Account Balance</th>
                <th scope="col">Account Currency</th>
                <th scope="col">Account Country</th>
                <th scope="col">Account Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="account in accounts" :key="account.id">
                <td>{{ account.username }}</td>
                <td>{{ account.name }}</td>
                <td>{{ account.account_number }}</td>
                <td>{{ account.balance }}</td>
                <td>{{ account.currency }}</td>
                <td>{{ account.country }}</td>
                <td>
                  <span
                    v-if="account.status == 'Active'"
                    class="badge badge-success"
                    >{{ account.status }}</span
                  >
                  <span v-else class="badge badge-danger">{{
                    account.status
                  }}</span>
                </td>
                <td>
                  <div class="btn-group" role="group">
                    <button
                      type="button"
                      class="btn btn-info btn-sm"
                      v-b-modal.edit-account-modal
                      @click="editAccount(account)"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger btn-sm"
                      @click="deleteAccount(account)"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Transaction Log -->
          <h2>Transactions</h2>
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Made By</th>
                <th scope="col">Source Account</th>
                <th scope="col">Target Account</th>
                <th scope="col">Currency</th>
                <th scope="col">Amount</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="transaction in transactions" :key="transaction.id">
                <td>{{ transaction.username }}</td>
                <td>{{ transaction.source_account }}</td>
                <td>{{ transaction.target_account }}</td>
                <td>{{ transaction.currency }}</td>
                <td>{{ transaction.amount }}</td>
                <td>{{ transaction.created_at }}</td>
              </tr>
            </tbody>
          </table>


          <footer class="text-center">
            Copyright &copy; All Rights Reserved.
          </footer>
        </div>
      </div>

      <!-- CREATE ACCOUNT MODAL -->
      <b-modal
        ref="addAccountModal"
        id="account-modal"
        title="Create a new account"
        hide-backdrop
        hide-footer
      >
        <b-form @submit="onSubmit" class="w-100">

          <b-form-group
            id="form-name-group"
            label="Username:"
            label-for="form-username-input"
          >
            <b-form-input
              id="form-username-input"
              type="text"
              v-model="createAccountForm.username"
              placeholder="Username"
              required
            >
            </b-form-input>
          </b-form-group>

          <b-form-group
            id="form-name-group"
            label="Account Name:"
            label-for="form-name-input"
          >
            <b-form-input
              id="form-name-input"
              type="text"
              v-model="createAccountForm.name"
              placeholder="Account Name"
              required
            >
            </b-form-input>
          </b-form-group>
          <b-form-group
            id="form-currency-group"
            label="Currency:"
            label-for="form-currency-input"
          >
            <b-form-input
              id="form-currency-input"
              type="text"
              v-model="createAccountForm.currency"
              placeholder="$ or €"
              required
            >
            </b-form-input>
          </b-form-group>
          <b-form-group
            id="form-country-group"
            label="Country:"
            label-for="form-country-input"
          >
            <b-form-input
              id="form-country-input"
              type="text"
              v-model="createAccountForm.country"
              placeholder="Enter Country"
              required
            >
            </b-form-input>
          </b-form-group>

          <b-button type="submit" variant="outline-info">Submit</b-button>
        </b-form>
      </b-modal>
      <!-- End of Modal for Create Account-->
      <!-- Start of Modal for Edit Account-->
      <b-modal
        ref="editAccountModal"
        id="edit-account-modal"
        title="Edit the account"
        hide-backdrop
        hide-footer
      >
        <b-form @submit="onSubmitUpdate" class="w-100">
          <b-form-group
            id="form-edit-name-group"
            label="Account Name:"
            label-for="form-edit-name-input"
          >
            <b-form-input
              id="form-edit-name-input"
              type="text"
              v-model="editAccountForm.name"
              placeholder="Account Name"
              required
            >
            </b-form-input>
          </b-form-group>
          <b-form-group 
            id="form-edit-country-group" 
            label="Country:" 
            label-for="form-edit-country-input"
          >
            <b-form-input
              id="form-edit-country-input"
              type="text"
              v-model="editAccountForm.country"
              placeholder="Enter Country"
              required
            >
            </b-form-input>
          </b-form-group>

          <b-button type="submit" variant="outline-info">Update</b-button>
        </b-form>
      </b-modal>
      <!-- End of Modal for Edit Account-->

      <!-- CREATE USER MODAL -->
      <b-modal
        ref="addUserModal"
        id="user-modal"
        title="Create a new user"
        hide-backdrop
        hide-footer
      >
        <b-form @submit="onSubmitUser" class="w-100">

          <b-form-group
            id="form-username-group"
            label="Username:"
            label-for="form-username-input"
          >
            <b-form-input
              id="form-username-input"
              type="text"
              v-model="createUserForm.username"
              placeholder="Username"
              required
            >
            </b-form-input>
          </b-form-group>

          <b-form-group
            id="form-password-group"
            label="Password:"
            label-for="form-password-input"
          >
            <b-form-input
              id="form-password-input"
              type="text"
              v-model="createUserForm.password"
              placeholder="Password"
              required
            >
            </b-form-input>
          </b-form-group>

          <b-form-group
            id="form-country-group"
            label="Country:"
            label-for="form-country-input"
          >
            <b-form-input
              id="form-country-input"
              type="text"
              v-model="createUserForm.country"
              placeholder="Enter Country"
              required
            >
            </b-form-input>
          </b-form-group>

          <b-button type="submit" variant="outline-info">Submit</b-button>
        </b-form>
      </b-modal>
      <!-- End of Modal for Create User-->

      <!-- EDIT USER MODAL -->
      <b-modal
        ref="editUserModal"
        id="edit-user-modal"
        title="Edit the user"
        hide-backdrop
        hide-footer
      >
        <b-form @submit="onSubmitUpdateUser" class="w-100">
          <b-form-group 
            id="form-edit-country-group" 
            label="Country:" 
            label-for="form-edit-country-input"
          >
            <b-form-input
              id="form-edit-country-input"
              type="text"
              v-model="editUserForm.country"
              placeholder="Enter Country"
              required
            >
            </b-form-input>
          </b-form-group>

          <b-button type="submit" variant="outline-info">Update</b-button>
        </b-form>
      </b-modal>
      <!-- End of Modal for Edit User-->

    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AppAccounts",
  data() {
    return {
      accounts: [],
      transactions: [],
      users: [],
      createAccountForm: {
        name: "",
        currency: "",
        country: "",
        username: "",
      },
      editAccountForm: {
        id: "",
        name: "",
        country: "",
      },
      createUserForm: {
        username: "",
        password: "",
        country: "",
      },
      editUserForm: {
        username: "",
        country: "",
      },
      showMessage: false,
      message: "",
    };
  },
  methods: {
    /***************************************************
     * RESTful requests
     ***************************************************/


    
    //GET function
    RESTgetAccounts() {
      const path = `${process.env.VUE_APP_ROOT_URL}/accounts`;
      axios
        .get(path)
        .then((response) => {
          this.accounts = response.data.accounts;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    RESTgetTransactions() {
      const path = `${process.env.VUE_APP_ROOT_URL}/transactions`;
      axios
        .get(path)
        .then((response) => {
          this.transactions = response.data.transactions;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    RESTgetUsers() {
      const path = `${process.env.VUE_APP_ROOT_URL}/users`;
      axios
        .get(path)
        .then((response) => {
          this.users = response.data.users;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    // POST function
    RESTcreateAccount(payload) {
      const path = `${process.env.VUE_APP_ROOT_URL}/accounts`;
      axios
        .post(path, payload)
        .then((response) => {
          this.RESTgetAccounts();
          // For message alert
          this.message = "Account Created succesfully!";
          // To actually show the message
          this.showMessage = true;
          // To hide the message after 3 seconds
          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
        })
        .catch((error) => {
          console.error(error);
          this.RESTgetAccounts();
        });
    },
    // POST function
    RESTcreateUser(payload) {
      const path = `${process.env.VUE_APP_ROOT_URL}/users`;
      axios
        .post(path, payload)
        .then((response) => {
          this.RESTgetUsers();
          this.RESTgetAccounts();
          // For message alert
          this.message = "Account Created succesfully!";
          // To actually show the message
          this.showMessage = true;
          // To hide the message after 3 seconds
          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
        })
        .catch((error) => {
          console.error(error);
          // For message alert
          this.message = error;
          // To actually show the message
          this.showMessage = true;
          // To hide the message after 3 seconds
          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
          this.RESTgetUsers();
          this.RESTgetAccounts();
        });
    },

    // Update function
    RESTupdateAccount(payload, accountId) {
      const path = `${process.env.VUE_APP_ROOT_URL}/accounts/${accountId}`;
      axios
        .put(path, payload)
        .then((response) => {
          this.RESTgetAccounts();
          // For message alert
          this.message = "Account Updated succesfully!";
          // To actually show the message
          this.showMessage = true;
          // To hide the message after 3 seconds
          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
        })
        .catch((error) => {
          console.error(error);
          this.RESTgetAccounts();
        });
    },

    // Update function
    RESTupdateUser(payload, username) {
      const path = `${process.env.VUE_APP_ROOT_URL}/users/${username}`;
      axios
        .put(path, payload)
        .then((response) => {
          this.RESTgetUsers();
          // For message alert
          this.message = "User Updated succesfully!";
          // To actually show the message
          this.showMessage = true;
          // To hide the message after 3 seconds
          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
        })
        .catch((error) => {
          console.error(error);
          this.RESTgetUsers();
        });
    },

    // Delete account
    RESTdeleteAccount(accountId) {
      const path = `${process.env.VUE_APP_ROOT_URL}/accounts/${accountId}`;
      axios
        .delete(path)
        .then((response) => {
          this.RESTgetAccounts();
          // For message alert
          this.message = "Account Deleted succesfully!";
          // To actually show the message
          this.showMessage = true;
          // To hide the message after 3 seconds
          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
        })
        .catch((error) => {
          console.error(error);
          this.RESTgetAccounts();
        });
    },

    // Delete user
    RESTdeleteUser(username) {
      const path = `${process.env.VUE_APP_ROOT_URL}/users/${username}`;
      axios
        .delete(path)
        .then((response) => {
          this.RESTgetUsers();
          this.RESTgetAccounts();
          // For message alert
          this.message = "User Deleted succesfully!";
          // To actually show the message
          this.showMessage = true;
          // To hide the message after 3 seconds
          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
        })
        .catch((error) => {
          console.error(error);
          this.RESTgetUsers();
          this.RESTgetAccounts();
        });
    },

    /***************************************************
     * FORM MANAGEMENT
     * *************************************************/

    // Initialize forms empty
    initForm() {
      this.createAccountForm.name = "";
      this.createAccountForm.currency = "";
      this.createAccountForm.username = "";
      this.createAccountForm.country = "";
      this.editAccountForm.id = "";
      this.editAccountForm.name = "";
      this.editAccountForm.country = "";
      this.createUserForm.username = "";
      this.createUserForm.password = "";
      this.createUserForm.country = "";
      this.editUserForm.country = "";
    },

    // Handle submit event for create account
    onSubmit(e) {
      e.preventDefault(); //prevent default form submit form the browser
      this.$refs.addAccountModal.hide(); //hide the modal when submitted
      const payload = {
        name: this.createAccountForm.name,
        currency: this.createAccountForm.currency,
        username: this.createAccountForm.username,
        country: this.createAccountForm.country,
      };
      this.RESTcreateAccount(payload);
      this.initForm();
    },


    // Handle submit event for create account
    onSubmitUser(e) {
      e.preventDefault(); //prevent default form submit form the browser
      this.$refs.addUserModal.hide(); //hide the modal when submitted
      const payload = {
        username: this.createUserForm.username,
        password: this.createUserForm.password,
        country: this.createUserForm.country,
      };
      this.RESTcreateUser(payload);
      this.initForm();
    },

    // Handle submit event for edit account
    onSubmitUpdate(e) {
      e.preventDefault(); //prevent default form submit form the browser
      this.$refs.editAccountModal.hide(); //hide the modal when submitted
      const payload = {
        name: this.editAccountForm.name,
        country: this.editAccountForm.country,
      };
      this.RESTupdateAccount(payload, this.editAccountForm.id);
      this.initForm();
    },

    // Handle submit event for edit account
    onSubmitUpdateUser(e) {
      e.preventDefault(); //prevent default form submit form the browser
      this.$refs.editUserModal.hide(); //hide the modal when submitted
      const payload = {
        country: this.editUserForm.country,
      };
      this.RESTupdateUser(payload, this.editUserForm.username);
      this.initForm();
    },

    // Handle edit button
    editAccount(account) {
      this.editAccountForm = account;
    },

    // Handle edit button
    editUser(user) {
      this.editUserForm = user;
    },

    // Handle Delete button
    deleteAccount(account) {
      this.RESTdeleteAccount(account.id);
    },

    // Handle Delete button
    deleteUser(user) {
      this.RESTdeleteUser(user.username);
    },
  },

  /***************************************************
   * LIFECYClE HOOKS
   ***************************************************/
  created() {
    this.RESTgetAccounts();
    this.RESTgetTransactions();
    this.RESTgetUsers();
  },
};
</script>
