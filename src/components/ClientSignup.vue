<template>
  <div class="signup-page"> 
    <div class="signup-form">
      <h2>Sign up as a client</h2>
      
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Username</label>
          <input type="text" id="name" v-model="username" required />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>

        <div class="form-group">
          <label for="repeat-password">Repeat Password</label>
          <input type="password" id="repeat-password" v-model="repeatPassword" required />
        </div>

        <button type="submit">Sign Up</button>
      </form>

      <p class="login-link">
        Already have an account? <a href="/clientlogin">Log in here.</a>
        <div class="back"> Go back to the <a href="/">Homepage</a>.</div>
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
      password: '',
      repeatPassword: ''
    };
  },
  methods: {
    async handleSubmit() {
      if (this.password !== this.repeatPassword) {
        alert('Passwords do not match!');
        return;
      }

      try {
        const userData = {
          username: this.username,
          password: this.password
        };

        const response = await axios.post(`${API_BASE_URL}/users`, userData, {
          headers: {
            "Content-Type": "application/json"
          }
        });
        /*const response = await axios.post('http://localhost:5000/users', userData);*/ /* Hardcoded for local */


        console.log('Signup response:', response.data);
        alert('Signup successful');

        // Reset form fields
        this.username = '';
        this.password = '';
        this.repeatPassword = '';

        // Redirect to login page
        this.$router.push('/clientlogin');
      } catch (error) {
        console.error('Error during signup:', error);
        const errorMessage = error.response?.data?.message || 'Signup failed';
        alert(errorMessage);
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

.login-link {
  text-align: center;
  margin-top: 15px;
}

.login-link a {
  color: #1e90ff;
  text-decoration: none;
}

.back{
  margin-top:-10px;
}

</style>






