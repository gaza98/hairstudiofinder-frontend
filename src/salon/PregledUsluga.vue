<template>
<div>
<Navbar/>

<b-container>
    
  <div class="group" role="group">
    <!-- <input v-model="searchTerm" class="search form-control mr-sm-2 upis-mjesta" type="search" placeholder="Upišite mjesto" aria-label="Search"> -->
  <div v-for="usluga in usluge" :key="usluga._id" class="card text-center">
      <!-- vfor -->
    <div >

      <div class="card-body text-left offset-lg-5">
          <div>
            <label>Opis: <div class="d-inline font-weight-bold">{{usluga.opis}}</div></label>
          </div>
          <div>
            <label>Cijena: <input type="number" v-model="usluga.cijena" class="d-inline font-weight-bold"></label>
          </div>
         <div>
            <label>Trajanje: <div class="d-inline font-weight-bold">{{usluga.trajanje}} min</div></label>
         </div>
        <button @click="obrisi(usluga._id)" class="btn btn-danger"> 
              Obrisi
        </button>
        <button @click="update(usluga)" class="btn btn-info"> 
              Update
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
import Usluga from '@/services/usluga'
export default {
    components: {
        Navbar
    },
    name: 'PregledUsluga',
    data(){
        return {
            usluge: [],
        }
    },
    async mounted(){
     await this.getUsluge()
    },
    methods: {
      async getUsluge(){
       try {
         let res = await Usluga.MojeUsluge()
         console.log(res);
         this.usluge = res.data
        } catch (error) {
          console.log(error);
        } 
      },
      async obrisi(id){
        try {
          let res = await Usluga.Obrisi(id)
          await this.getUsluge()
          console.log(res);
        } catch (error) {
          console.log(error);
        }
      },
      async update(usluga){
        let body = {
          'cijena': usluga.cijena
        }
        try {
          let res = await Usluga.Update(body, usluga._id)
          await this.getUsluge()
          console.log(res);
        } catch (error) {
          console.log(error);
        }
      },
    },
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