<template>
    <div class="register">
    <div class>
      <div class="col-md-6 offset-md-3">
        <h2 class="display-4 text-center mt-5">register</h2>
        <div class="text-danger" v-if="error != null">
            {{error}}
        </div>
        <div class="form">
           <div class="form-group">
            <label for="name" class="label-control">name</label>
            <input type="text" class="form-control" id="name" v-model="name" />
          </div>
          <div class="form-group">
            <label for="email" class="label-control">email</label>
            <input type="text" class="form-control" id="email" v-model="email" />
          </div>
          <div class="form-group">
            <label for="password" class="label-control">password</label>
            <input type="text" class="form-control" id="password" v-model="password" />
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block" @click.prevent="register()">login</button>
          </div> 
        </div>
        <circle-spin v-show="isloading"></circle-spin>
      </div>
    </div>
</div>
</template>
<script>
import axios from 'axios';
export default {
    data(){
      return{
        name:"",
        email:"",
        password:"",
        error   :"",
        isloading:false
      }
    },
    methods:{
      register(){
        this.isloading=true;
        this.$store.dispatch('registerAction',{
          name:this.name,
          email:this.email,
          password:this.password,
        })
        .then(res=>{
           this.isloading=false;
           this.$router.push("/profile")
        })
        .catch(err=>{
          this.isloading=false;
          this.error=err.message;
          });
      }
     }
}
</script>
 /*
         axios.post("http://127.0.0.1:8000/api/auth/register",{
           name     :this.name,
           email    :this.email,
           password :this.password
         })
         .then(res=>{
             console.log(res.data);
             const  Token = localStorage.setItem("token",res.data.access_token);
             const  User = localStorage.setItem("user",res.data.user);
             this.$router.push('/profile');
         })
         .catch(err=>{
            this.error=err.message;
         })
         
      }
  */

