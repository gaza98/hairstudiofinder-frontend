import {Service} from './index'


let Salon = {
    async SviSaloni(search){
        try {
            return await Service.get(`/saloni?pretraga=${search}`)
        } catch (error) {
            throw error.response
        }
    },
    async GetSalonById(id){
        try {
            return await Service.get(`/saloni/${id}`)
        } catch (error) {
            throw error.response
        }
    },
}


export default Salon