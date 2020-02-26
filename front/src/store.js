import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

 const store = new Vuex.Store({
  // 共有データ
  state: {
    // ログイン中のユーザー情報
    user: {},
    loggedInUser: {},
    // ユーザー登録済みのユーザー情報
    users: [],
    // トークン情報
    token: {},
    // ログイン状態
    loggedIn: false,
    //
    userSuccessSnackbar: false,
    // successLogoutがtrueだとログイン成功,falseならログイン失敗
    successLogout: false,
    q: {},
    // 詳細表示する投稿情報
    question: {},
    // 全投稿
    questions: {},
    // ログイン中のユーザーの全投稿
    myQuestions: {}
  },
  // 複数回使うcomputedをまとめて定義する
  getters: {
    loggedInUserInfo: state => state.loggedInUser,
    detailUserInfo: state => state.user
  },
  // stateの値を更新する関数
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
    postQuestion (state, post) {
      state.q = post
    },
    AllQuestions (state, posts) {
      state.questions = posts
    },
    myQuestions (state, posts) {
      state.myQuestions = posts
    },
    detailQuestion (state, post) {
      state.question = post
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
    userErrorSnackbar (state) {
      state.loggedInSnackbar = false
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
            user: response.data.data
          });
          commit("addUser", response.data.data)
          commit("updateToken", {
            "access-token": response.headers["access-token"],
            client: response.headers.client,
            uid: response.headers.uid
          });
          router.push("/mypage")
          commit("changeSuccessSnackbar", true)
        }
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
            user: response.data.data
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
    },
    // ログアウト処理
    signout ({ commit }, out) {
      commit("changeSuccessSnackbar", false)
      commit("updateLoggedIn", out);
      commit("updateUser", {user: {name: ""}})
      commit("updateToken", {})
      commit("userErrorSnackbar")
      router.push("/")
    },
    // 投稿の処理
    post ({ commit }, post) {
      // 画像を送信するためのフォームデータ
      let formData = new FormData()
      formData.append("title", post.title)
      formData.append("body", post.body)
      // urlのことはあまり気にしないで良い
      formData.append("image", post.image)
      axios.post('http://localhost:3000/api/post/questions', formData,
      // リクエストヘッダーにトークンを追加
      {
        headers: post.token
      })
      .then(response => {
        if (response.status === 200) {
          router.push("/")
          commit("postQuestion", post);
        }
      })
    },
    // 投稿一覧を取得
    posts ({ commit }) {
      axios.get('http://localhost:3000/api/post/questions')
      .then(response => {
        commit("AllQuestions", response.data)
      })
    },
    // 投稿の詳細を取得
    posting ({ commit }, id) {
      axios.get('http://localhost:3000/api/post/questions/' + id)
      .then(response => {
        commit("detailQuestion", response.data)
      })
    },
    // ログインユーザーの投稿一覧を取得
    myposts ({ commit}, id) {
      axios.get('http://localhost:3000/api/post/mypost/' + id)
      .then(response => {
        commit("myQuestions", response.data)
      })
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
  },
  // localstrageにstateを保存
  plugins: [
    createPersistedState()
  ]
})

export default store;
