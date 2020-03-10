import axios from 'axios'
// import router from '../../router'

export const user = {
  namespaced: true,
  state: {
    // 詳細表示するユーザー情報
    detailUser: {},
    // ログインユーザーがフォローしているユーザー
    followings: {},
    followers: {},
    // ログインユーザーがフォローしているユーザー数
    followingsNum: {},
    followersNum: {}
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
    updateFollowingsNum (state, num) {
      state.followingsNum = num
    },
    updateFollowersNum (state, num) {
      state.followersNum = num
    }
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
    // フォローしているユーザーを取得
    getFollowings ({ commit }, id) {
      axios.get('http://localhost:3000/api/followings/' + id)
      .then(response => {
        if (response.status === 200) {
          commit("changeFollowings", response.data)
        }
      })
    },
    // フォロワーを取得
    getFollowers ({ commit }, id) {
      axios.get('http://localhost:3000/api/followers/' + id)
      .then(response => {
        if (response.status === 200) {
          commit("changeFollowers", response.data)
        }
      })
    },
    // ログインユーザーのフォロー数・フォロワー数を取得
    getFollowNum ({ commit }, id) {
      // フォロー数を取得
      axios.get('http://localhost:3000/api/followings/num/' + id)
      .then(response => {
        if (response.status === 200) {
          commit("updateFollowingsNum", response.data)
        }
      });
      // フォロワー数を取得
      axios.get('http://localhost:3000/api/followers/num/' + id)
      .then(response => {
        if (response.status === 200) {
          commit("updateFollowersNum", response.data)
        }
      })
    }
  }
}

export default user;
