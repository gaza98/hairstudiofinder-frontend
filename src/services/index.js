import axios from 'axios'

let Service = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 10000
})


let headers ={}

const SetHeaders = () =>{
    headers = {'Authorization':'Bearer ' + localStorage.getItem('token')}
}


let Auth = {
   async kojiUser(){
       SetHeaders()
      try{
          return await Service.get('/kojiuser', {headers})
      }catch(error){
          throw error.response;
      }
    },
   async loginKorisnik(data){
      try{
          return await Service.post('/korisnici/login', data)
          
      }catch(error){
          throw error.response;
      }
    },
    async loginSalon(data){
        try{
            return await Service.post('/saloni/login', data)
            
        }catch(error){
            throw error.response;
        }
      },
    async signUpKorisnik(data){
        try{
            return await Service.post('/korisnici', data)
        }catch(error){
            throw error.response
        }
    },
    async signUpSalon(data){
        try{
            return await Service.post('/saloni',data)
        }catch(error){
            throw error.response
        }
    },
    async logoutKorisnik(){
        SetHeaders()
        try {
            return await Service.post('/korisnici/logout', null ,{headers})
        } catch (error) {
            throw error.response
        }
    },
    async logoutSalon(){
        SetHeaders()
        try {
            return await Service.post('/saloni/logout', null ,{headers})
        } catch (error) {
            throw error.response
        }
    },
    async korisnikUpdateProfile(body){
        SetHeaders()
        try {
            return await Service.patch('/korisnici/me', body ,{headers})
        } catch (error) {
            throw error.response
        }
    },
    async KorisnikMe(){
        SetHeaders()
        try {
            return await Service.get('/korisnici/me', {headers})
        } catch (error) {
            throw error.response
        }
    },
    async SalonMe(){
        SetHeaders()
        try {
            return await Service.get('/salon/me', {headers})
        } catch (error) {
            throw error.response
        }
    },
    async ObrisiSalon(){
        SetHeaders()
        try {
            return await Service.delete(`/saloni/me`, {headers})
        } catch (error) {
            throw error.response
        }
    },
    async ObrisiKorisnika(){
        SetHeaders()
        try {
            return await Service.delete(`/korisnici/me`, {headers})
        } catch (error) {
            throw error.response
        }
    },

}

export {Service, Auth, headers, SetHeaders}