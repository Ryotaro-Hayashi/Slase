import Vue from "vue"
import Router from 'vue-router'

import Home from './views/Home'
import SignUp from './views/SignUp'
import SignIn from './views/SignIn'
import MyPage from './views/MyPage'
// import AllUsers from './views/AllUsers'
import Post from './views/Post'
import DetailPost from './views/DetailPost'
import DetailUser from './views/DetailUser'
import MyEmail from './views/MyEmail'
import MyPassword from './views/MyPassword'

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
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/mypage',
      name: 'MyPage',
      component: MyPage
    },
    // {
    //   path: '/users',
    //   name: 'AllUsers',
    //   component: AllUsers
    // },
    {
      path: '/post',
      name: 'Post',
      component: Post
    },
    {
      path: '/detail/post',
      name: 'DetailPost',
      component: DetailPost
    },
    {
      path: '/detail/user',
      name: 'DetailUser',
      component: DetailUser
    },
    {
      path: '/mypage/email',
      name: 'MyEmail',
      component: MyEmail
    },
    {
      path: '/mypage/password',
      name: 'MyPasword',
      component: MyPassword
    }
  ]
})
