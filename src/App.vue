<template>
  <div id="app">
    <!-- <Navbar/> -->
    <router-view/>
    <Footer/>
  </div>
</template>

<script>


import Footer from '@/components/layout/Footer'
// import Navbar from '@/components/layout/Navbar'
import store from "@/store";
import store1 from "@/store1";
export default {
 name: 'App',
 components: {
  // Navbar,
  Footer
 },
 data(){
        return {
          store,
          store1
        }
 },
 async mounted(){
   
 }
}
</script>



<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
