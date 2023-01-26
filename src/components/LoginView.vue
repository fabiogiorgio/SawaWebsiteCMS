<template>
  <form name="login-form">
    <img src="@/assets/SawaLogo.png" alt="Logo">
    <div class="mb-3">
      <label for="username">Username: </label>
      <input type="text" id="username" v-model="input.username" />
    </div>
    <div class="mb-3">
      <label for="password">Password: </label>
      <input type="password" id="password" v-model="input.password" />
    </div>
    <button class="btn btn-outline-dark" type="submit" v-on:click.prevent="login()">
      Login
    </button>
  </form>
</template>

<script>
import axios from 'axios';
import { SET_AUTHENTICATION, SET_USERNAME, SET_ID } from "../store/storeconstants";

export default {
  name: 'LoginView',
  data() {
    return {
      input: {
        username: "",
        password: ""
      },
      output: "",
    }
  },
  methods: {
    login() {
      //make sure username OR password are not empty
      if (this.input.username != "" || this.input.username != "") {

        axios.post('https://sawacms.azurewebsites.net/api/Login', {
          username: this.input.username ,
          password: this.input.password
        })
          .then(response => {
            // console.log(response.data);
            //this.$store.commit('updateValue', response.data)
            this.$store.commit(`auth/${SET_AUTHENTICATION}`, true);
            this.$store.commit(`auth/${SET_USERNAME}`, this.input.username);
            this.$store.commit(`auth/${SET_ID}`, response.data);
            this.$router.push('/home')
          })
          .catch(error => {
            alert("Invalid credentials");
            console.log(error);
            // handle login error, display message to user, etc
          });
        
      } else {
        this.$store.commit(`auth/${SET_AUTHENTICATION}`, false);
        this.output = "Username and password can not be empty"
      }
    },
  },


}
</script>

<style>
  /* Add your custom CSS here */
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }

  input {
    width: 300px;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
  }

  button {
    width: 300px;
    padding: 14px 20px;
    margin: 8px 0;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
</style>