import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'

Vue.use(Vuex)

 const store = new Vuex.Store({
  state: {
    name: '',
    email: '',
    password: '',
    loggedIn: false,
    // successLoginがtrueだとログイン成功,falseならログイン失敗
    successLogin: false,
    // successLogoutがtrueだとログイン成功,falseならログイン失敗
    successLogout: false
  },
  mutations: {
    updateSignupData (state, payload) {
      state.name = payload.name,
      state.email = payload.email,
      state.password = payload.password
    },
    updateSigninData (state, payload) {
      state.email = payload.email,
      state.password = payload.password
    // },
    // updateLoggedIn (state, boolean) {
    //   state.loggedin = boolean
    // }

  },
  actions: {
    signup ({ commit }, authData) {
      commit("updateSignupData", authData);
      axios.post('http://localhost:3000/api/auth', {
        name: authData.name,
        email: authData.email,
        password: authData.password
      })
      .then(response => {
        if (response.status === 200) {
          // this.Tokens = {
          //   accessToken: response.headers["access-token"],
          //   client: response.headers.client,
          //   uid: response.headers.uid
          // }
          // commit("updateLoggedIn", true);
          router.push("/mypage")
        } else {
          router.push("/")
        }
      })
    },
    signin ({ commit }, authData) {
      commit("updateSigninData", authData);
      axios.post('http://localhost:3000//api/auth/sign_in', {
        email: authData.email,
        password: authData.password
      })
      .then(response => {
        if (response.status === 200) {
          router.push("/mypage")
        }
          // this.$router.push("/mypage")


      })
    }
  }
})

export default store;
