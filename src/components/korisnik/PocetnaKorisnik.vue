<template>
<div>
<Navbar/>

<b-container>
    
  <div class="group" role="group">
    <!-- <input v-model="searchTerm" class="search form-control mr-sm-2 upis-mjesta" type="search" placeholder="Upišite mjesto" aria-label="Search"> -->
  <div v-for="salon in saloni" :key="salon._id" class="card text-center">
      <!-- vfor -->
    <div >
      
      <div class="card-header font-weight-bold">
          <!-- <div>{{salon.naziv_salona}}</div> -->
      </div>
      <div class="card-body text-left offset-lg-5">
          <div>
            <label>Ime: <div class="d-inline font-weight-bold">{{salon.ime}}</div></label>
          </div>
          <div>
            <label>Adresa: <div class="d-inline font-weight-bold">{{salon.adresa}} </div></label>
          </div>
         <div>
            <label>Grad: <div class="d-inline font-weight-bold">{{salon.grad}} </div></label>
         </div>
         <div>
            <label>Email: <div class="d-inline font-weight-bold">{{salon.email}} </div></label>
         </div>
          <div>
            <label>Kontakt: <div class="d-inline font-weight-bold">{{salon.telefon}} </div></label>
          </div>
        
        <button class="btn btn-primary offset-sm-1 mt-sm-2">
            <router-link :to="{name: 'OdabraniSalon', params: {id: salon._id}}"> 
              <div class="otvori">ODABERI</div>
            </router-link>
        </button>

      </div>
      
    
      <div class="card-footer text-muted">
        <!-- <div>{{salon.korisnickoImeSalona}}</div> -->
      </div>
    </div>
  </div>
    <!-- This will only be shown if the preceding input has an invalid state -->
    <b-form-invalid-feedback id="input-live-feedback">
      Enter at least 3 letters
    </b-form-invalid-feedback>

    <!-- This is a form text block (formerly known as help block) -->
  
  </div>
</b-container>
</div>
</template>

<script>
import Navbar from '@/components/layout/Navbar'
import Salon from '@/services/salon'
export default {
    components: {
        Navbar
    },
    data(){
        return {
            name: 'PocetnaKorisnik',
            saloni: [],
            searchTerm:''
        }
    },
    async mounted(){
      console.log(this.$route.params.search);
     try {
         let res = await Salon.SviSaloni(this.$route.params.search)
         console.log(res);
         this.saloni = res.data
     } catch (error) {
         console.log(error);
     }
    },
    computed:{
     
    }
}
</script>

<style scoped>


.otvori{
  color: white;
}

.upis-mjesta{
  margin: 30px 0px;
 
}


.card-footer {
  margin-bottom: 30px;

}

.card{
  background-color: rgb(209, 205, 201);
}

.card-header{
  background-color: rgb(189, 183, 175);
}
body{
    background-color: #a69180;
}
.btn-primary{
    background-color: #463D36;
    border-color: #463D36;
}
.btn-primary:hover{
    background-color: rgb(115, 190, 100);
    border-color: rgb(115, 190, 100);
}

/* .nav1{
    position: initial;
    background: red;
} */
.card{
  margin: 20px 0;
}

.nav1{
  background-color: #8b6d53 !important;
}
.group{
  margin-top: 100px;
}
</style>