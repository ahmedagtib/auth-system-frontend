import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from "vuex-persist";
import axios from 'axios';
Vue.use(Vuex);

export default new Vuex.Store({
 state:{
     loggedIn:false,
     user    :null,
     token   :null
 },
 plugins: [new VuexPersistence().plugin],
 mutations:{
     Set_user(state,payload){
        state.user=payload; 
     },
     Set_token(state,payload){
        state.token=payload; 
     },
     Set_loggedIn(state,payload){
        state.loggedIn=payload; 
     },
 },
 actions:{
    loginAction({commit},payload){
      return   new Promise((resolve,reject)=>{
          axios.post("http://127.0.0.1:8000/api/auth/login",{
             email    :payload.email,
             password :payload.password,
            })
            .then(res=>{
              commit('Set_token',res.data.access_token)
              commit('Set_user',res.data.user)
              commit('Set_loggedIn',true)
              resolve(res);
            })
            .catch(err=>{
                reject(err);
            })
        })
    },
    registerAction({commit},payload){
        return   new Promise((resolve,reject)=>{
            axios.post("http://127.0.0.1:8000/api/auth/register",{
               name     :payload.name,  
               email    :payload.email,
               password :payload.password,
              })
              .then(res=>{
                commit('Set_token',res.data.access_token)
                commit('Set_user',res.data.user)
                commit('Set_loggedIn',true)
                resolve(res);
              })
              .catch(err=>{
                  reject(err);
              })
          })
      },
      logoutaction({commit,state}){
          return new Promise((resolve,reject)=>{
              axios.post("http://127.0.0.1:8000/api/auth/logout",{
                    token:state.token                   
                   })
                   .then(res=>{
                    commit('Set_token',null)
                    commit('Set_user',null)
                    commit('Set_loggedIn',false)
                    resolve(res);
                   })
                   .catch(err=>{
                      reject(err); 
                   })
          })
      },
      update_profile({commit,state},payload){
          return new Promise((resolve,reject)=>{
            axios.patch("http://127.0.0.1:8000/api/auth/update",{
                name     :payload.name,  
                email    :payload.email,
                token    :state.token
               })
               .then(res=>{
                 commit('Set_user',res.data.user)
                 resolve(res);
               })
               .catch(err=>{
                   reject(err);
               })
          })
      }
 },
 getters:{
     get_loggedin(state){
         return state.loggedIn;
     },
     get_user(state){
         return state.user;
     }
 }
});