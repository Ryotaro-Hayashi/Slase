import axios from 'axios'
// import router from '../../router'

export const user = {
  namespaced: true,
  state: {
    // 詳細表示するユーザー情報
    detailUser: {},
    followings: {},
    followers: {},
  },
  mutations: {
    // 詳細表示するユーザー情報を更新
    updateDetailUser (state, user) {
      state.detailUser = user
    },
    changeFollowings (state, users) {
      state.followings = users
    },
    changeFollowers (state, users) {
      state.followers = users
    },
  },
  actions: {
    // 詳細表示するユーザー情報を取得
    getDetailUser ({ commit }, id) {
      axios.get('http://localhost:3000/api/users/' + id)
      .then(response => {
        if (response.status === 200) {
          commit("updateDetailUser", response.data);
        }
      })
    },
    // フォロー・フォロワーを取得
    getFollows ({ commit }, id) {
      axios.get('http://localhost:3000/api/followings/' + id)
      .then(response => {
        if (response.status === 200) {
          commit("changeFollowings", response.data)
        }
      })
      axios.get('http://localhost:3000/api/followers/' + id)
      .then(response => {
        if (response.status === 200) {
          commit("changeFollowers", response.data)
        }
      })
    }
  }
}

export default user;
