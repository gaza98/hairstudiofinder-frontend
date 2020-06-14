import {Service, headers, SetHeaders} from './index'


let Komentar = {
    async Dodaj(body){
        SetHeaders()
        try {
            return await Service.post(`/komentari/frizer`, body, {headers})
        } catch (error) {
            throw error.response
        }
    },
    async DohvatiSve(id){
        SetHeaders()
        try {
            return await Service.get(`/komentari/${id}`, {headers})
        } catch (error) {
            throw error.response
        }
    },
}


export default Komentar