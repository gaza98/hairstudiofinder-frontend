<template>

  <div>
 <section class="jumbotron">
    <Navbar/>
  
  <h1>REZERVIRAJ TERMIN</h1>
  <p>U SAMO JEDNOM KLIKU</p>
  
<div class="container">
    <b-form @submit.prevent="onSubmit" v-if="show">
      <b-form-group
        id="input-group-1"
        
        label-for="input-1"
        
      >
        <b-form-input
          id="input-1"
          v-model="search"
          type="text"
          required
          placeholder="Unesite ime željenog salona ili grad u kojem se nalazi"
        ></b-form-input>
      </b-form-group>

     
    
      <button class="button" type="submit">POTRAŽI SALON</button>
      
    </b-form>
    
  </div>
</section>
<div class="container">

  <h1>Ako želiš rezervirati termin za frizera na pravom si mjestu!</h1>

</div>

<b-container class="container">
  <b-row >
    <b-col>
    <div>
       <b-spinner label="Loading..."></b-spinner>
       
       <h2>Pronađi željeni salon!</h2>
    </div>
    </b-col>
    <b-col>
      <div>
      <b-spinner type="grow" label="Loading..."></b-spinner>
      <h2>Registiraj se, te odaberi željenog frizera, datum i vrijeme</h2>
    </div>
    </b-col>
    <b-col>
      <lottie-player class="container" src="https://assets1.lottiefiles.com/datafiles/8UjWgBkqvEF5jNoFcXV4sdJ6PXpS6DwF7cK4tzpi/Check Mark Success/Check Mark Success Data.json"  background="transparent"  speed="1"  style="width: 45px; height: 45px;"  loop autoplay></lottie-player>
      <h2>Uspio si, brzo i lako!</h2>
    </b-col>
  </b-row>
</b-container>


</div>
</template>

<script>

 import Navbar from '@/components/layout/Navbar'

export default {
    name: 'Home',
    components: {
        Navbar
   
 },
    data() {
      return {
        search: '',
        show: true,
      }
    },
    methods: {
      onSubmit() {
        this.$router.push({ name: 'PocetnaKorisnik' , params: {search: this.search}})
      },
      
      
    }
  }



</script>

<style scoped>
  html, body {
  margin: 0;
  padding: 0;
}

.jumbotron {
  font-family: 'Montserrat', sans-serif;
  padding: 250px 0;
  background: url('../assets/frizerski.jpg') center center;
  background-size: cover;
  text-align: center;
  color: #fff;
  position: relative;
}

.jumbotron h1 {
  font-size: 70px;
  margin-bottom: 0;
}

.jumbotron p {
  font-family: serif;
  font-size: 30px;
  font-style: italic;
  margin: 0 0 30px;
}

.button {
  display: inline-block;
  border: 2px solid #fff;
  padding: 10px 20px;
  color: grey;
  text-decoration: none;
  transition: 0.3s;
}

.button:hover {
  background: black;
  color: white;
}
</style>