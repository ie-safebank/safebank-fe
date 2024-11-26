<template>
  <div class="signup-page"> 
    <div class="signup-form">
      <h2>Log in as a client</h2>
      
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" required />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>

        <button type="submit">Log in</button>
      </form>

      <p class="signup-link">
        Don't have an account yet? <a href="/clientsignup">Sign up here.</a>
        <div class = "back"> Or go back to the <a href="/">Homepage</a>.</div>
      </p>

    </div>
  </div>
</template>

<script>

const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

import axios from 'axios';
export default {
  data() {
    return {
      username: '',
      password: '' // Raw password
    };
  },
  methods: {
    async handleSubmit() {
      const userData = {
        username: this.username,
        password: this.password // Send raw password
      };

      console.log('Submitting user data:', userData);

      try {
        const response = await axios.post(`${API_BASE_URL}/clientlogin`, userData, {

          headers: {
            "Content-Type": "application/json"
          }
        });

        // Success: Display a message or redirect
        alert(response.data.message); // "Login successful"

        // Redirect to UserSpace page
        this.$router.push(`/userspace/${this.username}`);
      } catch (error) {
        console.error('Error during login:', error); // Log the error

        // Handle different types of errors
        if (error.response) {
          alert('Login failed: ' + (error.response.data.message || 'An unexpected error occurred.'));
        } else if (error.request) {
          alert('Login failed: No response from server.');
        } else {
          alert('Login failed: ' + error.message);
        }
      } finally {
        // Reset the form fields
        this.username = '';
        this.password = '';
      }
    }
  }
};
</script>



<style scoped>
.signup-page {
  margin-top: -60px;
  height: 100vh; 
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(90deg, #ff7676, #ff803c);
  font-family: Arial, sans-serif;
}

.signup-form {
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: white; 
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button[type="submit"] {
  width: 100%;
  padding: 10px;
  background-color: #ff803c;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

button[type="submit"]:hover {
  background-color: #ff7676;
}

.signup-link {
  text-align: center;
  margin-top: 15px;
}

.signup-link a {
  color: #1e90ff;
  text-decoration: none;
}

.back {
  margin-top: -10px;
}

</style>
