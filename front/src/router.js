import Vue from "vue"
import Router from 'vue-router'

import Home from './views/Home'
import Signup from './views/Signup'
import Signin from './views/Signin'
import MyPage from './views/MyPage'
import AllUsers from './views/AllUsers'
import Post from './views/Post'
import AllPosts from './views/AllPosts'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/mypage',
      name: 'MyPage',
      component: MyPage
    },
    {
      path: '/users',
      name: 'AllUsers',
      component: AllUsers
    },
    {
      path: '/post',
      name: 'Post',
      component: Post
    },
    {
      path: '/posts',
      name: 'AllPosts',
      component: AllPosts
    }
  ]
})
