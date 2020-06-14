<template>
<div class="wrapper fadeInDown">
  
  <div id="formContent">
    <!-- Tabs Titles -->

<form @submit.prevent="login" method="post" class="container">
        <h3>Prijava salon</h3>
  <div class="form-group">
    <label for="email-adresa">Email adresa: </label>
    <input type="email" class="form-control" id="email-adresa" aria-describedby="emailHelp" placeholder="Unesite email" v-model="body.email">
  </div>
  <div class="form-group">
    <label for="lozinka">Lozinka: </label>
    <input type="password" class="form-control" id="lozinka" placeholder="Unesite lozinku" v-model="body.password">
  </div>
  <p class="text-danger text-center">{{this.error}}</p>
  <button type="submit" class="btn btn-primary">Prijavi me!</button>
</form>
  </div>
  </div>
</template>

<script>

import {Auth} from "@/services";
import store1 from "@/store1";

export default {
    name: 'Login',
    data(){
        return {
          body:{
            email: '',
            password: '',
          },
          store1,
          error: ''
        }
    },
    methods: {
       async login(){
          try{
            let response = await Auth.loginSalon(this.body)
            this.store1.salon = response.data.salon
            this.store1.token = response.data.token
            console.log(response);
            await localStorage.setItem('token', response.data.token)
            this.$router.push({ name: 'PocetnaSalon'})
          }catch(error){
            this.error = "Unijeli ste krivu lozinku ili email! Pokušajte ponovno!"
          }
          
        }

    }
    
}
</script>

<style>
body{
    background-color: #a69180;
}
form{
    margin: 30px 30px;
}
form h3{
    text-align: center;
}
.btn-primary{
    background-color: #463D36;
    border-color: #463D36;
}
.btn-primary:hover{
    background-color: rgb(115, 190, 100);
    border-color: rgb(115, 190, 100);
}
.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column; 
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 20px;
}

#formContent {
  -webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
  background: rgb(209, 205, 201);
  padding: 30px;
  width: 90%;
  max-width: 450px;
  position: relative;
  padding: 0px;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
  box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
  text-align: center;
}

/* Simple CSS3 Fade-in-down Animation */
.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

</style>