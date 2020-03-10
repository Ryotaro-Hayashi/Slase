import axios from 'axios'
import router from '../../router'

export const auth = {
  namespaced: true,
  state: {
    // ログイン状態
    loggedIn: false,
    // ログインユーザーの情報
    loggedInUser: {name: ""},
    // トークン情報
    token: {},
    // 認証成功時のスナックバー
    successSnackbar: false,
    // 認証エラー時のスナックバー
    errorSnackbar: false,
    // エラーをcatchしたあとに形式的に使うためのstate
    error: ""
  },
  mutations: {
    // ログイン状態の更新
    updateLoggedIn (state, boolean) {
      state.loggedIn = boolean
    },
    // ログインユーザー情報を更新
    updateLoggedInUser (state, info) {
      state.loggedInUser = info
    },
    updateToken (state, token) {
      state.token = token
    },
    updateEmail (state, email) {
      state.loggedInUser.email = email
    },
    updatePassword (state, password) {
      state.loggedInUser.password = password
    },
    // スナックバーで認証成功表示の切り替え
    changeSuccessSnackbar (state, boolean) {
      state.successSnackbar = boolean
    },
    // スナックバーで認証エラー表示の切り替え
    changeErrorSnackbar (state, boolean) {
      state.errorSnackbar = boolean
    },
    updateError (state, error) {
      state.error = error
    }
  },
  actions: {
    // ログインユーザーの情報を取得
    getLoggedInUser ({ commit }, id) {
      axios.get('http://localhost:3000/api/users/' + id)
      .then(response => {
        if (response.status === 200) {
          commit("updateLoggedInUser", response.data);
        }
      })
    },
    // ユーザー登録処理
    signUp ({ dispatch, commit }, authData) {
      axios.post('http://localhost:3000/api/auth', {
        name: authData.name,
        email: authData.email,
        password: authData.password,
        password_confirmation: authData.password_confirmation
      })
      .then(response => {
        // リクエストが成功
        if (response.status === 200) {
          commit("updateLoggedIn", true);
          // レスポンスデータのidを使ってログインユーザー情報を取得
          dispatch("getLoggedInUser", response.data.data.id);
          commit("updateToken", {
            "access-token": response.headers["access-token"],
            client: response.headers.client,
            uid: response.headers.uid
          });
          router.push("/mypage")
          // ページ遷移後にスナックバーを表示
          commit("changeSuccessSnackbar", true)
        }
      })
      .catch(error => {
        // とりあえずerrorを使う
        commit("updateError", error)
        // スナックバーを表示してから一定時間後に非表示にfalseにする
        commit("changeErrorSnackbar", true)
        setTimeout(function() {
          commit("changeErrorSnackbar", false)
        }, 2500)
      })
    },
    // ログイン処理
    signIn ({ dispatch, commit }, authData) {
      axios.post('http://localhost:3000/api/auth/sign_in', {
        email: authData.email,
        password: authData.password
      })
      .then(response => {
        if (response.status === 200) {
          commit("updateLoggedIn", true);
          dispatch("getLoggedInUser", response.data.data.id)
          commit("updateToken", {
            "access-token": response.headers["access-token"],
            client: response.headers.client,
            uid: response.headers.uid
          });
          router.push("/mypage")
          commit("changeSuccessSnackbar", true)
        }
      })
      .catch(error => {
        // とりあえずerrorを使う
        commit("updateError", error)
        commit("changeErrorSnackbar", true)
        setTimeout(function() {
          commit("changeErrorSnackbar", false)
        }, 2500)
      })
    },
    // ログアウト処理
    signOut ({ commit }) {
      commit("changeSuccessSnackbar", false)
      commit("updateLoggedIn", false);
      commit("updateLoggedInUser", {name: ""})
      commit("updateToken", {})
    },
    changeEmail ({ commit }, data) {
      axios.put('http://localhost:3000/api/auth', {
        email: data.email
      },
      {
        headers: data.token
      })
      .then(response => {
        if (response.status === 200) {
          commit("updateEmail", data.email)
          router.push("/")
        }
      })
    },
    changePassword ({ commit }, data) {
      axios.put('http://localhost:3000/api/auth', {
        password: data.password
      },
      {
        headers: data.token
      })
      .then(response => {
        if (response.status === 200) {
          commit("updatePassword", data.password)
          router.push("/")
        }
      })
    }
  }
}

export default auth;
