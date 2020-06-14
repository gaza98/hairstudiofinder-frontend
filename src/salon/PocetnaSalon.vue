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
            <label>Grad: <div class="d-inline font-weight-bold">{{salon.grad}} </div></label>
         </div>
         <div>
            <label>Email: <div class="d-inline font-weight-bold">{{salon.email}} </div></label>
         </div>
          <div>
            <label>Kontakt: <div class="d-inline font-weight-bold">{{salon.telefon}} </div></label>
          </div>
          <div class="container">
           <router-link :to="{name: 'DodajFrizera', params: {imeSalona: salon.ime, id: salon._id }}"> 
            <button class="btn btn-primary">Dodaj Frizera</button>
          </router-link>
           <router-link :to="{name: 'DodajUslugu', params: {id: salon._id }}"> 
            <button class="btn btn-primary">Dodaj Uslugu</button>
          </router-link>
           <router-link :to="{name: 'PregledUsluga', params: {id: salon._id }}"> 
            <button class="btn btn-primary">Pregled usluga</button>
          </router-link>
            <router-link :to="{name: 'PregledRezervacija', params: {id_salona: salon._id }}"> 
                <button class="btn btn-primary">Pogledaj Rezervacije</button>
            </router-link>
        </div>
        </div>
      
        </div>
    
  <div class="card-deck justify-content-center">
          <div v-for="frizer in frizeri" :key="frizer._id">
                <div class="card mb-sm-4" style="width: 18rem;">
                      <img src="https://st.depositphotos.com/2101611/3925/v/450/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg" class="card-img-top" alt="">
                      <div class="card-body">
                          <h5 class="card-title text-center">{{frizer.ime}} {{frizer.prezime}}</h5>
                      </div>
                      <ul class="list-group list-group-flush">
                          <li class="list-group-item">{{frizer.email}}</li>
                          <li class="list-group-item">{{frizer.telefon}}</li>
                      </ul>
                      <div class="card-body text-center">
                          <router-link :to="{name : 'DodajTermin', params: {id: frizer._id, ime: `${frizer.ime} ${frizer.prezime}`}}"> 
                          <button class="btn btn-primary">Dodaj Termin</button>
                          </router-link>
                          <router-link :to="{name : 'PregledTermina', params: {id: frizer._id}}"> 
                          <button class="btn btn-primary">Pregledaj termine</button>
                          </router-link>
                          <br/>
                          <router-link :to="{name: 'ProfilFrizer', params: {id: frizer._id }}">  
                          <button class="btn btn-primary">Pogledaj Profil</button>
                          </router-link>
                           <br/>
                          <button @click.prevent="obrisiFrizera(frizer._id)" class="btn btn-danger">Obriši</button>
                        
                      </div>
                  </div>            
          </div>

    </div>



       
    </div>
</div>
</template>

<script>
// import Salon from '@/services/salon'
import {Auth} from '@/services/index'
import Frizer from '@/services/frizer'
import Navbar from '@/components/layout/Navbar'
export default {
    components: {
        Navbar
    },
    data(){
        return{
            salon:{},
            frizeri:[]
        }
    },
    async created(){
        try {
            let res = await Auth.SalonMe()
            this.salon = res.data
            await this.getFrizeri()
            console.log(res);
            
        } catch (error) {
            console.log(error);
        }
    },
    methods: {
        async obrisiFrizera(id){
            try {
                let res = await Frizer.ObrisiFrizera(id)
                await this.getFrizeri()
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        },
        async getFrizeri(){
            try {
                let friz = await Frizer.GetFrizeri(this.salon._id)
                console.log(friz);
                this.frizeri = friz.data
            } catch (error) {
                console.log(error);
            }
        }
    },
}
</script>

<style>

.btn-primary{
    background-color: red;
}


</style>