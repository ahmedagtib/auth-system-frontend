<template>
    <div class="login">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2 class="display-4 text-center mt-5">Login</h2>
        <div class="text-danger" v-if="error != null">
            {{error}}
        </div>
        <div class="form">
          <div class="form-group">
            <label for="email" class="label-control">email</label>
            <input type="text" class="form-control" id="email" v-model="email" />
          </div>
          <div class="form-group">
            <label for="password" class="label-control">password</label>
            <input type="password" class="form-control" id="password" v-model="password" />
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block" @click.prevent="login()">login</button>
          </div> 
        </div>
        <circle-spin v-show="isloading"></circle-spin>
      </div>
    </div>
</div>
</template>
<script>
import axios from "axios";
export default {
    data(){
      return{
        email:"",
        password:"",
        error:"",
        isloading:false
      }
    },
    methods:{
      login(){
        this.isloading=true;
        this.$store.dispatch('loginAction',{
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
        })
       /*
       axios.post("http://127.0.0.1:8000/api/auth/login",{
             email    :this.email,
             password :this.password,
            })
            .then(res=>{
              console.log(res.data);
              //put token in local storag
                const  Token = localStorage.setItem("token",res.data.access_token);
                const  User = localStorage.setItem("user",res.data.user);
              //if login true we do redirect to profile page
              this.$router.push('/profile');
            })
            .catch(err=>{
              this.error=err.message;
            });
        this.$router.push('/profile');
        //"eslint:recommended"
        */
      }
    }
}
</script>