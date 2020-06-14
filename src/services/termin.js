import {Service, SetHeaders, headers} from '@/services/index'


let Termin = {
    async Dodaj(body){
        SetHeaders()
        try {
            return Service.post(`/termini`, body, {headers})
        } catch (error) {
            throw error.response
        }
    },
    async GetTermini(id_frizera, datum){
        SetHeaders()
        try {
            if(!datum){
                console.log("Neuspjeh")
            }
            return Service.get(`/termini/frizer/${id_frizera}?datum=${datum}`, {headers})
        } catch (error) {
            throw error.response
        }
    },
    async SalonGetTermini(id_salon){
        SetHeaders()
        try {
            return Service.get(`/termini/salon/${id_salon}`, {headers})
        } catch (error) {
            throw error.response
        }
    },
    async Obrisi(id){
        SetHeaders()
        try {
            return Service.delete(`/termini/${id}`, {headers})
        } catch (error) {
            throw error.response
        }
    },
    async Update(body, id){
        SetHeaders()
        try {
            return Service.patch(`/termini/${id}`, body, {headers})
        } catch (error) {
            throw error.response
        }
    },
    
}

export default Termin