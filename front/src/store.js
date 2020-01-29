import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

 const store = new Vuex.Store({
  // 共有データ
  state: {
    user: {},
    token: {},
    // ログイン状態
    loggedIn: false,
    // successLoginがtrueだとログイン成功,falseならログイン失敗
    successLogin: false,
    // successLogoutがtrueだとログイン成功,falseならログイン失敗
    successLogout: false
  },
  // stateの値を更新する関数
  mutations: {
    // ログイン状態の更新
    updateLoggedIn (state, boolean) {
      state.loggedIn = boolean
    },
    updateUser (state, data) {
      state.user = data
    },
    updateToken (state, token) {
      state.token = {}
    }
  },
  actions: {
    // ユーザー登録処理
    // 第2引数は呼び出された時の引数を受け継ぐ
    signup ({ commit }, authData) {
      axios.post('http://localhost:3000/api/auth', {
        name: authData.name,
        email: authData.email,
        password: authData.password
      })
      .then(response => {
        // リクエストが成功
        if (response.status === 200) {
          this.token = {
            accessToken: response.headers["access-token"],
            client: response.headers.client,
            uid: response.headers.uid
          }
          // commitで第2引数を引数に渡して、第1引数のmutationsを呼び出し
          commit("updateLoggedIn", true);
          commit("updateUser", {
            user: response.data.data
          });
          router.push("/mypage")
        } else {
          router.push("/")
        }
      })
    },
    // ログイン処理
    signin ({ commit }, authData) {
      axios.post('http://localhost:3000//api/auth/sign_in', {
        email: authData.email,
        password: authData.password
      })
      .then(response => {
        if (response.status === 200) {
          this.token = {
            accessToken: response.headers["access-token"],
            client: response.headers.client,
            uid: response.headers.uid
          }
          commit("updateLoggedIn", true);
          commit("updateUser", {
            user: response.data.data
          })
          router.push("/mypage")
        }
      })
    },
    // ログアウト処理
    signout ({ commit }, out) {
      commit("updateLoggedIn", out);
      commit("updateUser", {})
      commit("updateToken", {})
    }
  },
  // localstrageにstateを保存
  plugins: [
    createPersistedState()
  ]
})

export default store;
