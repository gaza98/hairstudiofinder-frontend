<template>
<div>
    <Navbar/>
    <div class="container">
        <div class="card mb-3 group">
        <img src="" class="card-img-top" alt="">
        <div class="card-body">
            <h5 class="card-title"><div>{{salon.ime}}</div></h5>
         <div>
            <label>Adresa: <div class="d-inline font-weight-bold">{{salon.adresa}} </div></label>
         </div>
          <div>
            <label>Kontakt: <div class="d-inline font-weight-bold">{{salon.telefon}} </div></label>
          </div>
        </div>
        </div>

        <div class="usluge">
            Odaberi uslugu
            <div v-for="usluga in usluge" :key="usluga._id" class="card usluga" style="width: 18rem; margin:10px 0">
            <div class="card-body">
                <h5 class="card-title">{{usluga.opis}}</h5>
                <h6 class="card-subtitle text-muted">{{Math.floor(usluga.trajanje / 60) + ' h :' + usluga.trajanje % 60}} min</h6>
                <p class="card-text">{{usluga.cijena}} kn</p>
                <label class="btn btn-secondary">
                <input v-model="body.title" type="radio" name="usluga" :value="usluga.opis" autocomplete="off"> Odaberi
            </label>
            </div>
            </div>
        </div>
        <p>Članovi tima</p>
  <div v-if="body.title" class="card-deck justify-content-center frizeri">
        
          <div v-for="frizer in frizeri" :key="frizer._id">
                <div class="card mb-sm-4" style="width: 18rem;">
                      <div class="card-body">
                          <h5 class="card-title text-center">{{frizer.ime}} {{frizer.prezime}}</h5>
                      </div>
                      <div class="card-body">
                          <router-link :to="{name : 'FrizerKomentari', params: {id: frizer._id, ime: `${frizer.ime} ${frizer.prezime}`, id_salona: $route.params.id}}"> 
                          <button class="btn btn-primary">Komentari</button>
                          </router-link><br>
                        <input v-model="odabraniFrizer" type="radio" name="frizer" :value="frizer._id" autocomplete="off"> Odaberi
                      </div>
                  </div>            
          </div>

    </div>
    <div v-if="odabraniFrizer">
        <input v-model="datum" type="text" onfocus="(this.type='date')" placeholder="Odaberite datum">
        <button @click.prevent="SlobodniTermini()">Pretraži</button>
    </div>

    <div v-if="termini" class="usluge group">
            <div v-for="termin in termini" :key="termin._id" class="card usluga" style="width: 18rem; margin:10px 0">
            <div class="card-body">
                <h5 class="card-title"></h5>
                <h6 class="card-subtitle text-muted">{{termin.range}}</h6>
                <p class="card-text"></p>
                <label class="btn btn-secondary">
                <input v-model="odabranTermin" type="radio" name="termin" :value="termin" autocomplete="off"> Odaberi
            </label>
            </div>
            </div>
        </div>
    <button @click="UpisiTermin()" v-if="odabranTermin" class="btn btn-success">Upiši se</button>

       
    </div>
</div>
</template>

<script>
import Salon from '@/services/salon'
import Usluga from '@/services/usluga'
import store from '@/store'
import Frizer from '@/services/frizer'
import Termin from '@/services/termin'
import Navbar from '@/components/layout/Navbar'
import moment from 'moment'
export default {
    components: {
        Navbar
    },
    data(){
        return{
            salon:{},
            frizeri:[],
            usluge: [],
            termini: [],
            odabranaUsluga: '',
            odabraniFrizer: '',
            odabranTermin: '',
            datum: '',
            body:{
                title: '',
                content: ''
            },
            feedback: '',
            korisnik: JSON.parse(JSON.stringify(store)).korisnik
        }
    },
    async created(){
       console.log(this.$route.params);
       await this.OdabraniSalon()
       await this.UslugeZaSalon()
       await this.FizeriZaSalon()
       
    },
    methods: {
      async OdabraniSalon(){
          try {
              let res = await Salon.GetSalonById(this.$route.params.id)
              this.salon = res.data
              console.log(res);
          } catch (error) {
              console.log(error);
          }
      },
      async UslugeZaSalon(){
          try {
              let res = await Usluga.GetUslugeById(this.$route.params.id)
              this.usluge = res.data
              console.log(res);
          } catch (error) {
              console.log(error);
          }
      },
      async FizeriZaSalon(){
          try {
              let res = await Frizer.GetFrizeri(this.$route.params.id)
              this.frizeri = res.data
              console.log(res);
          } catch (error) {
              console.log(error);
          }
      },
      async SlobodniTermini(){
         try {
             let res = await Termin.GetTermini(this.odabraniFrizer, this.datum)
             console.log(res);
             this.termini = res.data.map((termin) =>{
                 return {
                     ...termin,
                     range: `${moment(termin.start).format('HH:mm')} ~ ${moment(termin.end).format('HH:mm')}`
                 }
             })
         } catch (error) {
             console.log(error);
         }
      },
      async UpisiTermin(){
          console.log();
          try {
              this.body.title = `${this.body.title} ${this.odabranTermin.title}`
              this.body.salon = this.$route.params.id
              this.body.content = `Klijent ${this.korisnik.ime} ${this.korisnik.prezime}`
              let res = await Termin.Update(this.body, this.odabranTermin._id)
              console.log(res);
              this.odabranTermin = ''
              await this.SlobodniTermini()
          } catch (error) {
              console.log(error);
          }
      }
    },
}
</script>

<style>

.btn-primary{
   margin-bottom: 10px;
}

body{
    background-color: #a69180;
}
.card{
  background-color: rgb(209, 205, 201);
}
.btn-primary{
    background-color: #463D36;
    border-color: #463D36;
}
.btn-primary:hover{
    background-color: rgb(115, 190, 100);
    border-color: rgb(115, 190, 100);
}

.nav1{
  background-color: #8b6d53 !important;
}
.group{
  margin-top: 100px;
}

.usluge{
    display: flex;
    flex-direction: column;
  align-items: center;
  justify-content: center
}

.frizeri{
    margin-top: 40px;
}
</style>