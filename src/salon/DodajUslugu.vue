<template>
    <div>
      <Navbar/>
                
        <div class="wrapper fadeInDown group">
  <div id="formContent">
    <form @submit.prevent="dodajUslugu" class="container">
        <h3>Dodavanje usluge</h3>
        <div class="form-group">
            <label for="ime">Opis: </label>
            <input type="text" class="form-control" id="ime" placeholder="Opis usluge" v-model="body.opis">
        </div>
         <div class="form-group">
            <label for="prezime">Cijena: </label>
            <input type="number" class="form-control" id="prezime" placeholder="Cijena" v-model="body.cijena">
        </div>
         <div class="form-group">
            <label for="email">Trajanje: </label>
            <input type="number" class="form-control" id="email" placeholder="Trajanje u minutama" v-model="body.trajanje">
        </div>
        <button type="submit" class="btn btn-primary">Dodaj uslugu</button>
    </form>
  </div>
        </div>
    </div>
</template>


<script>
import Navbar from '@/components/layout/Navbar'
import Usluga from '@/services/usluga'
export default {
  components:{
    Navbar
  },
    data(){
        return{
            body: {
              opis: '',
              cijena: '',
              trajanje: ''
            }
        }
    },
    methods:{
       async dodajUslugu(){
         try {
           let res = await Usluga.Dodaj(this.body)
           console.log(res);
           this.$router.go(-1)
         } catch (error) {
           console.log(error);
         }
       }
    },
    created(){
       
    }
    
}
</script>

<style>
.card{
  background-color: rgb(209, 205, 201);
}

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