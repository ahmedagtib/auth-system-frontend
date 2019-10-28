<template>
  <div id="app">
      <Navbar></Navbar>
      
         <router-view />
     
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar';
export default {
  name: 'app',
  data(){
   return{
   
   }
  },
  components: {
    Navbar
  },
  methods:{
    login:function(){
      console.log(JSON.stringify("ahmed"));
    }
  }
}
</script>

<style>

</style>
