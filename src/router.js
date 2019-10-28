import Vue from 'vue';
import Router from 'vue-router';
import home from './Views/home';
import login from './Views/login';
import register from './Views/register';
import profile from './Views/profile';
import store from './store';

Vue.use(Router);
const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
      {
        path: "/",
        name: "home",
        component: home
      },
      {
        path: "/login",
        name: "login",
        component: login,
        meta:{
          guest:true
        }
        
      },
      {
        path: "/register",
        name: "register",
        component: register,
        meta:{
          guset:true
        } 
      },
      {
        path: "/profile",
        name: "profile",
        component: profile,
        meta:{
              secure:true
         }
        
      }
    ]
});

router.beforeEach((to,from,next)=>{
  if(to.matched.some(record => record.meta.secure)){
    if(!store.state.loggedIn){
      next({
         path:'/login'
      })
    }else{
      next();
    }
  }
  else if(to.matched.some(record => record.meta.guest)){
       if(!store.state.loggedIn){
         next();
        }else{
         next({
           path:'/profile'
        })
        }
  }else{
   next();
  }

});



/*
router.beforeEach((to,from,next)=>{
   if(to.matched.some(record => record.meta.secure)){
     if(localStorage.getItem("token") == null){
       next({
          path:'/login'
       })
     }else{
       next();
     }
   }
   else if(to.matched.some(record => record.meta.guest)){
        if(localStorage.getItem("token") == null){
          next();
         }else{
          next({
            path:'/profile'
         })
         }
   }else{
    next();
   }

});
*/



export default router;