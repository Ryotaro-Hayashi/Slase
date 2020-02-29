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
    // 詳細表示するユーザー情報
    detailUser: {},
    // 認証成功時のスナックバー
    successSnackbar: false,
    // 認エラー時のスナックバー
    errorSnackbar: false,
    // エラーをcatchしたあとに形式的に使うためのstate
    error: ""
  },
  mutations: {
    // ログイン状態の更新
    updateLoggedIn (state, boolean) {
      state.loggedIn = boolean
    },
    // ログイン中のユーザー情報を更新
    updateLoggedInUser (state, user) {
      state.loggedInUser = user
    },
    updateToken (state, token) {
      state.token = token
    },
    // 詳細表示するユーザーを変更
    changeDetailUser (state, user) {
      state.detailUser = user
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
    // updateAvatar (state, avatar) {
    //   state.loggedInUser.avatar.url = avatar
    // },
  },
  actions: {
    // ユーザー登録処理
    signUp ({ commit }, authData) {
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
          // -----------------
          commit("updateLoggedInUser", response.data.data);
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
    signIn ({ commit }, authData) {
      axios.post('http://localhost:3000/api/auth/sign_in', {
        email: authData.email,
        password: authData.password
      })
      .then(response => {
        if (response.status === 200) {
          commit("updateLoggedIn", true);
          commit("updateLoggedInUser", response.data.data);
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
      router.push("/")
    },
    // setavatar ({ commit }, data) {
    //   let formData = new FormData ()
    //   formData.append("avatar", data.avatarFile)
    //   axios.put('http://localhost:3000/api/auth', formData,
    //   // リクエストヘッダーにトークンを追加
    //   {
    //     headers: data.token
    //   })
    //   .then(response => {
    //     if (response.status === 200) {
    //       commit("updateAvatar", data.avatarUrl)
    //       router.push("/")
    //     }
    //   })
    // },
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
