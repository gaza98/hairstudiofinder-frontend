import {Service, headers, SetHeaders} from './index'


let Frizer = {
    async DodajFrizera(body){
        SetHeaders()
        try {
            return await Service.post('/frizeri', body, {headers})
        } catch (error) {
            throw error.response
        }
    },
    async GetFrizeri(salon_id){
        SetHeaders()
        try {
            return await Service.get(`/frizeri/salon/${salon_id}`, {headers})
        } catch (error) {
            throw error.response
        }
    },
    async GetJedanFrizer(id){
        SetHeaders()
        try {
            return await Service.get(`/frizeri/${id}`, {headers})
        } catch (error) {
            throw error.response
        }
    },
    async ObrisiFrizera(id){
        SetHeaders()
        try {
            return await Service.delete(`/frizeri/${id}`, {headers})
        } catch (error) {
            throw error.response
        }
    },
    async UpdateFrizer(id, body){
        console.log(id);
        SetHeaders()
        try {
            return await Service.patch(`/frizeri/${id}`, body, {headers})
        } catch (error) {
            throw error.response
        }
    },
}


export default Frizer