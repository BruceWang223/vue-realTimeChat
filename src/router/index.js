import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import Chat from '@/components/Chat'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat,
      props: true,
      // route guard, if the props does not have the name property, it will be re-driected back to home page
      beforeEnter: (to, from, next) => {
        if(to.params.name){
          next();
        }
        else{
          next({name: 'Welcome'});
        }
      }
    }
  ]
})
