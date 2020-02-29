import axios from 'axios'
import router from '../../router'

export const auth = {
  namespaced: true,
  state: {
    // 詳細表示するユーザー情報
    detailUser: {},
    // ログインユーザーの情報
    loggedInUser: {name: ""},
    // トークン情報
    token: {},
    // ログイン状態
    loggedIn: false,
    // 認証成功時のスナックバー
    userSuccessSnackbar: false,
    // 認証エラー時のスナックバー
    userErrorSnackbar: false,
    // エラーをcatchしたあとに形式的に使うためのstate
    error: ""
  },
  // getters: {
  //   loggedInUserInfo: state => state.loggedInUser,
  //   detailUserInfo: state => state.user
  // },
  mutations: {
    // ログイン状態の更新
    updateLoggedIn (state, boolean) {
      state.loggedIn = boolean
    },
    // ログイン中のユーザー情報を更新
    updateUser (state, user) {
      state.loggedInUser = user
    },
    updateToken (state, token) {
      state.token = token
    },
    detailUser (state, user) {
      state.detailUser = user
    },
    updateAvatar (state, avatar) {
      state.loggedInUser.user.avatar.url = avatar
    },
    updateEmail (state, email) {
      state.detailUser.email = email
    },
    updatePassword (state, password) {
      state.detailUser.password = password
    },
    // スナックバーで認証成功表示
    changeSuccessSnackbar (state, boolean) {
      state.userSuccessSnackbar = boolean
    },
    // スナックバーで認証エラー表示
    changeErrorSnackbar (state, boolean) {
      state.userErrorSnackbar = boolean
    },
    updateError (state, error) {
      state.error = error
    }
  },
  actions: {
    // ユーザー登録処理
    signup ({ commit }, authData) {
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
          commit("updateUser", {
            user: response.data.data.user
          });
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
    // ログイン処理
    signin ({ commit }, authData) {
      axios.post('http://localhost:3000/api/auth/sign_in', {
        email: authData.email,
        password: authData.password
      })
      .then(response => {
        if (response.status === 200) {
          commit("updateLoggedIn", true);
          commit("updateUser", {
            user: response.data.data.user
          });
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
    signout ({ commit }, out) {
      commit("changeSuccessSnackbar", false)
      commit("updateLoggedIn", out);
      commit("updateUser", {user: {name: ""}})
      commit("updateToken", {})
      router.push("/")
    },
    setavatar ({ commit }, data) {
      let formData = new FormData ()
      formData.append("avatar", data.avatarFile)
      axios.put('http://localhost:3000/api/auth', formData,
      // リクエストヘッダーにトークンを追加
      {
        headers: data.token
      })
      .then(response => {
        if (response.status === 200) {
          commit("updateAvatar", data.avatarUrl)
          router.push("/")
        }
      })
    },
    email ({ commit }, data) {
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
    password ({ commit }, data) {
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
