import axios from 'axios'
import router from '../../router'

export const post = {
  namespaced: true,
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
  // getters: {
  //
  // },
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
          commit("post/postQuestion", post);
          commit("post/changePostSnackbar", true);
          setTimeout(function() {
            commit("post/changePostSnackbar", false)
          }, 2500)
        }
      })
    },
    // 投稿一覧を取得
    posts ({ commit }) {
      axios.get('http://localhost:3000/api/post/questions')
      .then(response => {
        commit("post/AllQuestions", response.data)
      })
    },
    // 投稿の詳細を取得
    posting ({ commit }, id) {
      axios.get('http://localhost:3000/api/post/questions/' + id)
      .then(response => {
        commit("post/detailQuestion", response.data)
      })
    },
    // ログインユーザーの投稿一覧を取得
    myposts ({ commit}, id) {
      axios.get('http://localhost:3000/api/post/mypost/' + id)
      .then(response => {
        commit("post/myQuestions", response.data)
      })
    }
  }
}

export default post;
