import {Service, SetHeaders, headers} from '@/services/index'


let Usluga = {
    async Dodaj(body){
        SetHeaders()
        try {
            return await Service.post(`/usluga`, body, {headers})
        } catch (error) {
            throw error.response
        }
    },
    async MojeUsluge(){
        SetHeaders()
        try {
            return await Service.get(`/usluga/me`, {headers})
        } catch (error) {
            throw error.response
        }
    },
    async GetUslugeById(id){
        SetHeaders()
        try {
            return await Service.get(`/usluga/${id}`, {headers})
        } catch (error) {
            throw error.response
        }
    },
    async Obrisi(id){
        SetHeaders()
        try {
            return await Service.delete(`/usluga/${id}`, {headers})
        } catch (error) {
            throw error.response
        }
    },
    async Update(body, id){
        SetHeaders()
        try {
            return await Service.patch(`/usluga/${id}`, body, {headers})
        } catch (error) {
            throw error.response
        }
    },
}

export default Usluga