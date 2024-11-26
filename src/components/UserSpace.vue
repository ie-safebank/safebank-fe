<template>
  <div class="jumbotron vertical-center">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h1>User Accounts</h1>
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
            v-b-modal.transfer-modal
          >
            Transfer
          </button>
          <br /><br />

          <h2>Accounts</h2>
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Username</th>
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

      <b-modal
        ref="transferModal"
        id="transfer-modal"
        title="Transfer Money"
        hide-backdrop
        hide-footer
      >
        <b-form @submit="onSubmitTransfer" class="w-100">
          <b-form-group
            id="form-source-group"
            label="Source Account Number:"
            label-for="form-source-input"
          >
            <b-form-input
              id="form-source-input"
              type="text"
              v-model="transfer.source"
              placeholder="Source Account"
              required
            >
            </b-form-input>
          </b-form-group>

          <b-form-group
            id="form-Target-group"
            label="Target Account Number:"
            label-for="form-Target-input"
          >
            <b-form-input
              id="form-Target-input"
              type="text"
              v-model="transfer.target"
              placeholder="Target Account"
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
              v-model="transfer.currency"
              placeholder="$ or €"
              required
            >
            </b-form-input>
          </b-form-group>

          <b-form-group
            id="form-amount-group"
            label="Amount:"
            label-for="form--input"
          >
            <b-form-input
              id="form-amount-input"
              type="text"
              v-model="transfer.amount"
              placeholder="Enter Amount"
              required
            >
            </b-form-input>
          </b-form-group>

          <b-button type="submit" variant="outline-info">Submit</b-button>
        </b-form>
      </b-modal>
      <!-- End of Modal for Transfer-->
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Account",
  data() {
    return {
      username: this.$route.params.username,  // Accessing username from route params
      accounts: [],
      transactions: [],
      showMessage: false,
      message: "",
      transfer:{
        source: "",
        target: "",
        currency: "",
        amount: "",
      },
      editAccountForm: {
        id: "",
        name: "",
        country: "",
      },
    };
  },
  methods: {
    /***************************************************
     * RESTful requests
     ***************************************************/

    //GET accounts function
    RESTgetUserAccounts() {
      const path = `${process.env.VUE_APP_ROOT_URL}/userspace/${this.username}/accounts`;
      axios
        .get(path)
        .then((response) => {
          this.accounts = response.data.accounts;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    //GET transactions function
    RESTgetUserTransactions() {
      const path = `${process.env.VUE_APP_ROOT_URL}/accounts/${accountId}`;
      axios
        .get(path)
        .then((response) => {
          this.transactions = response.data.transactions;
        })
        .catch((error) => {
          console.error(error);
        });
    },


    // Update function
    RESTupdateAccount(payload, accountId) {
      const path = `${process.env.VUE_APP_ROOT_URL}/accounts/${accountId}`;
      axios
        .put(path, payload)
        .then((response) => {
          this.RESTgetUserAccounts();
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
          this.RESTgetUserAccounts();
        });
    },

    // Delete account
    RESTdeleteAccount(accountId) {
      const path = `${process.env.VUE_APP_ROOT_URL}/accounts/${accountId}`;
      axios
        .delete(path)
        .then((response) => {
          this.RESTgetUserAccounts();
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
          this.RESTgetUserAccounts();
        });
    },

    // Transfer Money1
    RESTtransferMoney(payload) {
      const path = `${process.env.VUE_APP_ROOT_URL}/userspace/${this.username}/transfer`;
      axios
        .put(path, payload)
        .then((response) => {
          if (response.status === 200) {
            // Refresh account and transaction data
            this.RESTgetUserAccounts();
            this.RESTgetUserTransactions();
          } else {
            console.error("Unexpected response:", response);
          }
        })
        .catch((error) => {
          console.error("Transfer Error:", error);
        });
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

    // Handle edit button
    editAccount(account) {
      this.editAccountForm = account;
    },

    // Handle Delete button
    deleteAccount(account) {
      this.RESTdeleteAccount(account.id);
    },

    /***************************************************
     * FORM MANAGEMENT
     * *************************************************/

    // Initialize forms empty
    initForm() {
      this.transfer.source = "";
      this.transfer.target = "";
      this.transfer.amount = "";
      this.transfer.currency = "";
      this.editAccountForm.id = "";
      this.editAccountForm.name = "";
      this.editAccountForm.country = "";
    },

    // Handle transfer form button
    onSubmitTransfer(e) {
      e.preventDefault(); //prevent default form submit form the browser
      this.$refs.transferModal.hide(); //hide the modal when submitted

      this.RESTtransferMoney(this.transfer);
      this.initForm();
    },
  },

  /***************************************************
   * LIFECYClE HOOKS
   ***************************************************/
  created() {
    console.log("API Base URL:", process.env.VUE_APP_ROOT_URL);
    this.RESTgetUserAccounts(); 
    this.RESTgetUserTransactions();
  },
};
</script>

