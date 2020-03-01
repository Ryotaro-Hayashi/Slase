import axios from 'axios'
import router from '../../router'

export const post = {
  namespaced: true,
  state: {
    // 詳細表示する投稿
    detailPost: {},
    // 詳細表示するユーザーの投稿一覧
    detailUserPosts: {},
    // 投稿成功時に表示するスナックバー
    successSnackbar: false
  },
  mutations: {
    changeDetailPost (state, post) {
      state.detailPost = post
    },
    updateDetailUserPosts (state, posts) {
      state.detailUserPosts = posts
    },
    changeSuccessSnackbar (state, boolean) {
      state.successSnackbar = boolean
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
          commit("changePostSnackbar", true);
          setTimeout(function() {
            commit("changePostSnackbar", false)
          }, 2500)
        }
      })
    },
    // 投稿の詳細を取得
    getDetailPost ({ commit }, id) {
      axios.get('http://localhost:3000/api/post/questions/' + id)
      .then(response => {
        commit("changeDetailPost", response.data)
      })
    },
    // 詳細表示するユーザーの投稿一覧を取得
    getDetailUserPosts ({ commit }, id) {
      axios.get('http://localhost:3000/api/post/mypost/' + id)
      .then(response => {
        commit("updateDetailUserPosts", response.data)
      })
    }
  }
}

export default post;
