<template>

 <div class="wrapper fadeInDown">
   <Navbar/>
    <div id="kalendar">
      <form @submit.prevent="termin">
      <h1 class="text-center">Dodaj slobodni termin:</h1>
       
        <h5>Odaberi vrijeme i datum naručivanja</h5>
      <date-picker v-model="range"
        lang="en"
        range
        confirm type="datetime" 
        :time-picker-options="{start: '08:00', step:'00:30' , end: '20:00', format: 'HH:mm' }"
        format="YYYY-MM-DD [at] HH:mm a" 
        width="1000"  >
      </date-picker>
       <div class="text-center">
                  <button type="submit" class="btn btn-primary mt-5">Kreiraj termin</button>
                </div> 
                 </form>
      </div>
 </div>
     
</template>
<script>
  import Navbar from '@/components/layout/Navbar'
  import DatePicker from 'vue2-datepicker';
  import moment from 'moment'
  import 'vue2-datepicker/index.css';
  import Termin from '@/services/termin'
  export default {
    name:"DodajTermin",
    components: { DatePicker, Navbar },
    data() {
      return {
        bookirano: true,
        year:"",
        date:"",
        time:'',
        datetime:'',
        range:''
      
      }
      },
    methods: {
       async termin(){
         console.log(this.range);
         let start = moment(this.range[0]).format('YYYY-MM-DD HH:mm')
         let end = moment(this.range[1]).format('YYYY-MM-DD HH:mm')
         console.log(start);
         console.log(end);
         let body = {
           start,
           end,
           'frizer': this.$route.params.id,
           'title': ` kod ${this.$route.params.ime}`
         }
         try {
           console.log(body);
           let res = await Termin.Dodaj(body)
           this.$router.go(-1)
           console.log(res);
         } catch (error) {
           console.log(error);
         }
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
.mx-icon-calendar{
    height: 30px;
}

</style>