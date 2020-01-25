import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'

Vue.use(Vuex)

 const store = new Vuex.Store({
  state: {
    name: '',
    email: '',
    password: ''
  },
  mutations: {
    updateAuthData (state, payload) {
      state.name = payload.name,
      state.email = payload.email,
      state.password = payload.password
    }
  },
  actions: {
    signup ({ commit }, authData) {
      commit("updateAuthData", authData);
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
          router.push("/mypage")
        } else {
          router.push("/")
        }
      })
    }
  }
})

export default store;
