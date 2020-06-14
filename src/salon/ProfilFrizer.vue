<template>
    <div>
      <Navbar/>

        
        <div class="wrapper fadeInDown group">
  <div id="formContent">
    <form @submit.prevent="updateFrizer" class="container">
        <h3>Frizer profil</h3>
        <div class="form-group">
            <label for="ime">Ime: </label>
            <input type="text" class="form-control" id="ime" placeholder="Unesite ime frizera" v-model="frizer.ime">
        </div>
         <div class="form-group">
            <label for="prezime">Prezime: </label>
            <input type="text" class="form-control" id="prezime" placeholder="Unesite prezime" v-model="frizer.prezime">
        </div>
         <div class="form-group">
            <label for="email">Email: </label>
            <input type="email" class="form-control" id="email" placeholder="Unesite email" v-model="frizer.email">
        </div>
        <div class="form-group">
            <label for="telefon">Telefon: </label>
            <input type="text" class="form-control" id="telefon" placeholder="Unesite telefon" v-model="frizer.telefon">
        </div>
        <button type="submit" class="btn btn-primary">Update</button>
    </form>
  </div>
        </div>
    </div>
</template>


<script>
import Navbar from '@/components/layout/Navbar'
import Frizer from '@/services/frizer'
export default {
  components:{
    Navbar
  },
    data(){
        return{
            frizer: {}
        }
    },
    methods:{
       async updateFrizer(){
         let body = {
           'ime': this.frizer.ime,
           'prezime': this.frizer.prezime,
           'telefon': this.frizer.telefon
         }
         try {
           let res = await Frizer.UpdateFrizer(this.frizer._id, body)
           console.log(res);
         } catch (error) {
           console.log(error);
         }
       }
    },
    async created(){
       try {
         let res = await Frizer.GetJedanFrizer(this.$route.params.id)
         console.log(res);
         this.frizer = res.data
       } catch (error) {
         console.log(error);
       }
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