import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LoginKorisnik from '../autentikacija/LoginKorisnik.vue'
import LoginSalon from '../autentikacija/LoginSalon.vue'
import PocetnaSalon from '../salon/PocetnaSalon.vue'
import DodajFrizera from '../salon/DodajFrizera.vue'
import DodajTermin from '../salon/DodajTermin.vue'
import DodajUslugu from '../salon/DodajUslugu.vue'
import ProfilFrizer from '../salon/ProfilFrizer.vue'
import PregledUsluga from '../salon/PregledUsluga.vue'
import PregledTermina from '../salon/PregledTermina.vue'
import PregledRezervacija from '../salon/PregledRezervacija.vue'
import SignUpSalon from '../autentikacija/SignUpSalon.vue'
import SignUpKorisnik from '../autentikacija/SignUpKorisnik.vue'
import PocetnaKorisnik from '../components/korisnik/PocetnaKorisnik.vue'
import OdabraniSalon from '../components/korisnik/OdabraniSalon.vue'
import ProfilKorisnik from '../components/korisnik/ProfilKorisnik.vue'
import FrizerKomentari from '../components/korisnik/FrizerKomentari.vue'

import store from '@/store'
import store1 from '@/store1'
import {Auth} from '@/services/index'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/loginkorisnik',
    name: 'LoginKorisnik',
    component: LoginKorisnik
    
  },
  {
    path: '/loginsalon',
    name: 'LoginSalon',
    component: LoginSalon
    
  },
  {
    path: '/signupsalon',
    name: 'SignUpSalon',
    component: SignUpSalon
  },
  {
    path: '/signupkorisnik',
    name: 'SignUpKorisnik',
    component: SignUpKorisnik
  },
  {
    path: '/pocetnakorisnik',
    name: 'PocetnaKorisnik',
    component: PocetnaKorisnik,
    beforeEnter: KorisnikGuard
  },
  {
    path: '/odabranisalon/:id',
    name: 'OdabraniSalon',
    component: OdabraniSalon
  },
  {
    path: '/profilkorisnik',
    name: 'ProfilKorisnik',
    component: ProfilKorisnik,
    beforeEnter: KorisnikGuard
  },
  {
    path: '/profilfrizer/:id',
    name: 'ProfilFrizer',
    component: ProfilFrizer,
    beforeEnter: SalonGuard
  },
  {
    path: '/pocetnasalon',
    name: 'PocetnaSalon',
    component: PocetnaSalon,
    beforeEnter: SalonGuard
  },
  {
    path: '/dodajfrizera/:imeSalona/:id',
    name: 'DodajFrizera',
    component: DodajFrizera,
    beforeEnter: SalonGuard
  },
  {
    path: '/frizerkomentari/:id/:ime/:id_salona',
    name: 'FrizerKomentari',
    component: FrizerKomentari,
    beforeEnter: KorisnikGuard
  },
  {
    path: '/dodajtermin/:id/:ime',
    name: 'DodajTermin',
    component: DodajTermin,
    beforeEnter: SalonGuard
  },
  {
    path: '/dodajuslugu',
    name: 'DodajUslugu',
    component: DodajUslugu,
    beforeEnter: SalonGuard
  },
  {
    path: '/pregledusluga',
    name: 'PregledUsluga',
    component: PregledUsluga,
    beforeEnter: SalonGuard
  },
  {
    path: '/pregledtermina',
    name: 'PregledTermina',
    component: PregledTermina,
    beforeEnter: SalonGuard
  },
  {
    path: '/pregledrezervacija/:id_salona',
    name: 'PregledRezervacija',
    component: PregledRezervacija,
    beforeEnter: SalonGuard
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

async function SalonGuard(to, from, next)
{
  try {
    let res = await Auth.kojiUser()
    console.log(res);
    if(res.data.korisnik){
      store.korisnik = res.data.korisnik
      store.token = res.data.token
      console.log(store);
    }
    if(res.data.salon){
      store1.salon = res.data.salon
      store1.token = res.data.token
      console.log(store1);

    }
  } catch (error) {
    console.log(error);
  }
  
    let salon = store1.salon
    if(salon === false || salon === undefined) {
      next('/loginsalon');
    }else {
      next()
    }  
}
async function KorisnikGuard(to, from, next)
{
  try {
    let res = await Auth.kojiUser()
    console.log(res);
    if(res.data.korisnik){
      this.store.korisnik = res.data.korisnik
      this.store.token = res.data.token
      console.log(this.store);
      return
    }
    if(res.data.salon){
      this.store1.salon = res.data.salon
      this.store1.token = res.data.token
      console.log(this.store1);
      return
    }
  } catch (error) {
    console.log(error);
  }
    let korisnik = store.korisnik
    if(korisnik === false || korisnik === undefined) {
      next('/loginkorisnik');
    }else {
      next()
    }  
}


export default router
