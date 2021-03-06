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
import Following from './views/Following'
import Follower from './views/Follower'

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
      path: '/myemail',
      name: 'MyEmail',
      component: MyEmail
    },
    {
      path: '/mypassword',
      name: 'MyPasword',
      component: MyPassword
    },
    {
      path: '/following',
      name: 'Following',
      component: Following
    },
    {
      path: '/follower',
      name: 'Follower',
      component: Follower
    }
  ]
})
