<template>
    <div>
        <Navbar/>
        <vue-cal class="container cal"
         :time-step="30"
         :time-from="8 * 60"
         :time-to="20 * 60"
         :time-cell-height="100"
         :disable-views="['years', 'year', 'month']"
         hide-weekends
         resize-x
         :events="events">
        </vue-cal>

    </div>
        



</template>




<script>
 import Navbar from '@/components/layout/Navbar'
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import moment from "moment";
import Termin from '@/services/termin'

export default {
    name: 'PregledRezervacija',
    components: {
        VueCal,
        Navbar
    },
    data(){
        return{
            events:[]
        }
    },
    async created() {
        await this.DohvatiTermine()
    },
    methods: {
        async DohvatiTermine(){
            try {
                let res = await Termin.SalonGetTermini(this.$route.params.id_salona)
                console.log(res);
                this.events = res.data.map((termin) =>{
                    return{
                        ...termin,
                        start: moment(termin.start).format('YYYY-MM-DD HH:mm'),
                        end: moment(termin.end).format('YYYY-MM-DD HH:mm')
                    }
                })
            } catch (error) {
                console.log(error);
            }
        }
    },
}
</script>





<style>
    .vuecal{
      background-color: white;
    }

    .vuecal__event {
    color: white;
    background-color:#654321;
    position: relative;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    left: 0;
    width: 100%;
    z-index: 1;
    -webkit-transition: left .3s,width .3s,-webkit-box-shadow .3s;
    transition: left .3s,width .3s,-webkit-box-shadow .3s;
    transition: box-shadow .3s,left .3s,width .3s;
    transition: box-shadow .3s,left .3s,width .3s,-webkit-box-shadow .3s;
    overflow: hidden;
}

.cal{
    height: 500px;
}

</style>