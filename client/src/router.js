import Vue from "vue"
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import CreateUser from '@/components/CreateUser'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/users',
      name: 'CreateUser',
      component: CreateUser
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    }
  ]
})
