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

  },
  actions: {

  }
}
