export const post = {
  state: {
    q: {},
    // 詳細表示する投稿情報
    question: {},
    // 全投稿
    questions: {},
    // ログイン中のユーザーの全投稿
    myQuestions: {},
    postSuccessSnackbar: false
  },
  getters: {

  },
  mutations: {
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
    changePostSnackbar (state, boolean) {
      state.postSuccessSnackbar = boolean
    }
  },
  actions: {

  }
}
