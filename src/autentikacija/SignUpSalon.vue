<template>
<div class="wrapper fadeInDown">
  <div id="formContent">
    <form @submit.prevent="signUpSalon" method="post" class="container">
        <h3>Registracija salona</h3>
 <div class="form-group">
    <label for="ime">Ime salona: </label>
    <input type="text" class="form-control" id="ime" placeholder="Unesite ime salona" v-model="body.ime">
  </div>
  <div class="form-group">
    <label for="adresa">Adresa: </label>
    <input type="text" class="form-control" id="adresa" placeholder="Unesite adresu salona" v-model="body.adresa">
  </div>
    <div class="form-group">
    <label for="grad">Grad: </label>
    <input type="text" class="form-control" id="grad" placeholder="Unesite grad u kojem se salon nalazi" v-model="body.grad">
  </div>
   <div class="form-group">
    <label for="oib">OIB: </label>
    <input type="text" class="form-control" id="oib" placeholder="Unesite OIB salona" v-model="body.oib">
  </div>
  <div class="form-group">
    <label for="email-adresa">Email adresa: </label>
    <input type="email" class="form-control" id="email-adresa" aria-describedby="emailHelp" placeholder="Unesite email" v-model="body.email">
  </div>
  <div class="form-group">
    <label for="broj-telefona">Broj telefona: </label>
    <input type="number" class="form-control" id="broj-telefona"  placeholder="Unesite broj telefona" v-model="body.telefon">
  </div>
  <div class="form-group">
    <label for="lozinka">Lozinka: </label>
    <input type="password" class="form-control" id="lozinka" placeholder="Unesite lozinku" v-model="body.password">
  </div>
  <div class="form-group">
    <label for="lozinka2">Ponovite lozinku: </label>
    <input type="password" class="form-control" id="lozinka2" placeholder="Ponovite lozinku" v-model="password2">
  </div>


<p class="text-danger text-center" v-if="feedback">{{this.feedback}}</p>
   <p class="text-danger text-center" v-if="error">{{this.error }} </p>
  <button type="submit" class="btn btn-primary">Registriraj me!</button>
</form>
  </div>
</div>
</template>

<script>

import {Auth} from '@/services/index';
import store1 from '@/store1';

export default {
    name: 'SignUpSalon',
    data(){
        return{
            body:{
                ime: '',
                adresa: '',
                oib: '',
                grad:'',
                telefon: '',
                email: '',
                password: '',
            },
            password2: '',
            store1,
             error: '',
            feedback: ''
        }
    },
    methods: {
      
       async signUpSalon(){

         try{
           if(this.body.password != this.password2){
               return this.feedback = "Lozinke nisu iste!"
           }
        
            let response = await Auth.signUpSalon(this.body)
            this.store1.salon = response.data.salon
            this.store1.token = response.data.token
            localStorage.setItem("token", response.data.token);
            this.$router.push({ name: 'PocetnaSalon'})
        
        }catch(error){
             this.error = error.data.error
             console.log(error);
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