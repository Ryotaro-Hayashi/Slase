import axios from 'axios'
import router from '../../router'

export const auth = {
  state: {
    // ログイン中のユーザー情報
    user: {},
    // ログインユーザーの情報
    loggedInUser: {user: {name: ""}},
    // ユーザー登録済みのユーザー情報
    users: [],
    // トークン情報
    token: {},
    // ログイン状態
    loggedIn: false,
    // 成功時のスナックバー
    userSuccessSnackbar: false,
    // エラー時のスナックバー
    userErrorSnackbar: false,
    // successLogoutがtrueだとログイン成功,falseならログイン失敗
    successLogout: false,
    error: ""
  },
  getters: {
    loggedInUserInfo: state => state.loggedInUser,
    detailUserInfo: state => state.user
  },
  mutations: {
    // ログイン状態の更新
    updateLoggedIn (state, boolean) {
      state.loggedIn = boolean
    },
    // ログイン中のユーザー情報を更新
    updateUser (state, user) {
      state.loggedInUser = user
    },
    // 登録済みのユーザーを追加
    addUser (state, user) {
      // 他と違いユーザー情報を蓄積していくので、配列に追加していく
      state.users.push(user)
    },
    updateToken (state, token) {
      state.token = token
    },
    detailUser (state, user) {
      state.user = user
    },
    updateAvatar (state, avatar) {
      state.loggedInUser.user.avatar.url = avatar
    },
    updateEmail (state, email) {
      state.user.email = email
    },
    updatePassword (state, password) {
      state.user.password = password
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
          commit("auth/updateLoggedIn", true);
          commit("auth/updateUser", {
            user: response.data.data
          });
          commit("auth/addUser", response.data.data)
          commit("auth/updateToken", {
            "access-token": response.headers["access-token"],
            client: response.headers.client,
            uid: response.headers.uid
          });
          router.push("/mypage")
          commit("auth/changeSuccessSnackbar", true)
        }
      })
      .catch(error => {
        // とりあえずerrorを使う
        commit("auth/updateError", error)
        commit("auth/changeErrorSnackbar", true)
        setTimeout(function() {
          commit("auth/changeErrorSnackbar", false)
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
          commit("auth/updateLoggedIn", true);
          commit("auth/updateUser", {
            user: response.data.data
          });
          commit("auth/updateToken", {
            "access-token": response.headers["access-token"],
            client: response.headers.client,
            uid: response.headers.uid
          });
          router.push("/mypage")
          commit("auth/changeSuccessSnackbar", true)
        }
      })
      .catch(error => {
        // とりあえずerrorを使う
        commit("auth/updateError", error)
        commit("auth/changeErrorSnackbar", true)
        setTimeout(function() {
          commit("auth/changeErrorSnackbar", false)
        }, 2500)
      })
    },
    // ログアウト処理
    signout ({ commit }, out) {
      commit("auth/changeSuccessSnackbar", false)
      commit("auth/updateLoggedIn", out);
      commit("auth/updateUser", {user: {name: ""}})
      commit("auth/updateToken", {})
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
          commit("auth/updateAvatar", data.avatarUrl)
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
          commit("auth/updateEmail", data.email)
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
          commit("auth/updatePassword", data.password)
          router.push("/")
        }
      })
    }
  }
}
