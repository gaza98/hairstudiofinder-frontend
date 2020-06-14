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
           <date-picker
                lang="en"
                range
                confirm type="datetime"
                :placeholder="usluga.range"
                v-model="usluga.range"
                
                :time-picker-options="{start: '08:00', step:'00:30' , end: '20:00', format: 'HH:mm' }"
                format="YYYY-MM-DD [at] HH:mm a" 
                width="1000"  >
            </date-picker>
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
import Termin from '@/services/termin'
import DatePicker from 'vue2-datepicker';
import moment from 'moment'
import 'vue2-datepicker/index.css';
export default {
    components: {
        Navbar,
        DatePicker
    },
    name: 'PregledTermina',
    data(){
        return {
            usluge: [],
        }
    },
    async mounted(){
     await this.getTermini()
    },
    methods: {
      async getTermini(){
       try {
         let res = await Termin.GetTermini(this.$route.params.id, undefined)
         console.log(res);
         res.data = res.data.map((date) =>{
             return{
                ...date,
                range: `${moment(date.start).format('YYYY-MM-DD HH:mm')} ~ ${moment(date.end).format('YYYY-MM-DD HH:mm')}`
             }
         })
         this.usluge = res.data
        } catch (error) {
          console.log(error);
        } 
      },
      async obrisi(id){
        try {
          let res = await Termin.Obrisi(id)
          await this.getTermini()
          console.log(res);
        } catch (error) {
          console.log(error);
        }
      },
      async update(usluga){
        let start = moment(usluga.range[0]).format('YYYY-MM-DD HH:mm')
        let end = moment(usluga.range[1]).format('YYYY-MM-DD HH:mm')

        let body = {
           start,
           end
         }
        try {
          let res = await Termin.Update(body, usluga._id)
          await this.getTermini()
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