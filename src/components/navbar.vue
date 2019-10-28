<template>
    <nav class="navbar navbar-expand-sm navbar-light bg-light">
        <a class="navbar-brand" href="#">app-jwt</a>
        <button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavId">
            <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
                <li class="nav-item">
                    <router-link class="nav-link" to="/login" v-if="!loggedIn">login</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/register" v-if="!loggedIn">register</router-link>
                </li>
                <li class="nav-item" v-if="loggedIn">
                    <a class="nav-link"  @click.prevent="logout()">logout</a>
                </li>
            </ul>
           
        </div>
    </nav>
</template>
<script>
export default {
    name:"navbar",
    data(){
      return{
          token:null
      }
    },
    mounted(){
      this.userstatus();
    },
    computed:{
       loggedIn(){
          
           //console.log(this.$store.getters.get_loggedin);
           return this.$store.getters.get_loggedin;
       }
    },
    methods:{
      userstatus(){
         if(localStorage.getItem("token")!=null){
             this.token=localStorage.getItem("token");
         }
      },
      logout(){
          this.$store.dispatch('logoutaction')
          .then(res=>{
              this.$router.push('/login');
          })
          .catch(err=>{
             console.log(err.message);
          })
         // this.$router.push('/login');
      }
    }

}
</script>

/*
logout(){
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.token=null;
          this.$router.push('/login');
      }
 */     