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
    }
  }
}
