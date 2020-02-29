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

  }
}
