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
      axios.get(process.env.VUE_APP_API_BASE_URL + '/api/users/' + id)
      .then(response => {
        if (response.status === 200) {
          commit("updateLoggedInUser", response.data);
        }
      })
    },
    // ユーザー登録処理
    signUp ({ dispatch, commit }, authData) {
      axios.post(process.env.VUE_APP_API_BASE_URL + '/api/auth', {
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
          // フォロー・フォロワーを取得を取得
          dispatch("user/getFollows", response.data.data.id, {root: true});
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
      axios.post(process.env.VUE_APP_API_BASE_URL + '/api/auth/sign_in', {
        email: authData.email,
        password: authData.password
      })
      .then(response => {
        if (response.status === 200) {
          commit("updateLoggedIn", true);
          dispatch("getLoggedInUser", response.data.data.id);
          dispatch("user/getFollows", response.data.data.id, {root: true});
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
      commit("user/changeFollowings", {}, {root: true})
      commit("user/changeFollowers", {}, {root: true})
    },
    changeEmail ({ commit }, data) {
      axios.put(process.env.VUE_APP_API_BASE_URL + '/api/auth', {
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
      axios.put(process.env.VUE_APP_API_BASE_URL + '/api/auth', {
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
    },
    updateProfile ({ dispatch }, data) {
      // 画像を送信するためのフォームデータ
      let formData = new FormData()
      // urlのことはあまり気にしないで良い
      formData.append("avatar", data.avatar)
      formData.append("name", data.name)
      formData.append("introduce", data.introduce)
      formData.append("address", data.address)
      axios.put(process.env.VUE_APP_API_BASE_URL + '/api/auth', formData,
      // リクエストヘッダーにトークンを追加
      {
        headers: data.token
      })
      .then(response => {
        if (response.status === 200) {
          // ログインユーザー情報を更新
          dispatch("getLoggedInUser", response.data.data.id)
        }
      })
    }
  }
}

export default auth;
