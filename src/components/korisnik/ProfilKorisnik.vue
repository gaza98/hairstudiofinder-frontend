<template>

<div>
  <Navbar/>
  <div class="wrapper fadeInDown group">
    <div id="formContent">
      <form @submit.prevent="UpdateKorisnik" method="post" class="container">
          <h3>Podaci o mom Profilu</h3>
  <div class="form-group">
      <label for="ime">Ime: </label>
      <input type="text" class="form-control" id="ime" placeholder="Unesite Vaše ime" v-model="store.korisnik.ime">
    </div>
    <div class="form-group">
      <label for="prezime">Prezime: </label>
      <input type="text" class="form-control" id="prezime" placeholder="Unesite Vaše prezime" v-model="store.korisnik.prezime">
    </div>
    <div class="form-group">
      <label for="broj-telefona">Broj telefona: </label>
      <input type="number" class="form-control" id="broj-telefona"  placeholder="Unesite broj telefona" v-model="store.korisnik.telefon">
    </div>
    <div class="form-group">
      <label for="lozinka">Lozinka: </label>
      <input type="password" class="form-control" id="lozinka" placeholder="Unesite novu lozinku" v-model="store.korisnik.password">
    </div>


  <p class="text-danger text-center" v-if="feedback">{{this.feedback}}</p>
    <p class="text-danger text-center" v-if="error">{{this.error }}</p> 
    <button type="submit" class="btn btn-primary">Update </button>
  </form>
    </div>
  </div>
</div>
</template>

<script>

// import {Auth} from '@/services/index';
import store from '@/store';
import Navbar from '@/components/layout/Navbar'
import {Auth} from '@/services/index'

export default {
  components:{
    Navbar
  },
    name: 'ProfilKorisnik',
    data(){
        return{
            store,
            error: '',
            feedback: ''
        }
    },
    methods: {
      async UpdateKorisnik(){
        let body = this.store.korisnik
        delete body.username
        delete body.email
        delete body._id
        delete body.__v
        try {
          let res = await Auth.korisnikUpdateProfile(body)
          console.log(res);
        } catch (error) {
          console.log(error);
        }
      }
    },
    async created() {
      try {
          let res = await Auth.KorisnikMe()
          this.store.korisnik = res.data
          console.log(res);
        } catch (error) {
          console.log(error);
        }
    },
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