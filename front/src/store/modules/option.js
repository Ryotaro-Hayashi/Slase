import axios from 'axios'
// import router from '../../router'

export const option = {
  namespaced: true,
  state: {
    // ログインユーザーがフォローしているユーザー数
    loggedInUserFollowingsNum: {},
    loggedInUserFollowersNum: {},
    // 詳細表示するユーザーがフォローしているユーザー数
    detailUserFollowingsNum: {},
    detailUserFollowersNum: {},
    // フォローしているユーザー
    followings: {},
    // フォロワー
    followers: {}
  },
  mutations: {
    updateLoggedInUserFollowingsNum (state, num) {
      state.loggedInUserFollowingsNum = num
    },
    updateLoggedInUserFollowersNum (state, num) {
      state.loggedInUserFollowersNum = num
    },
    updateDetailUserFollowingsNum (state, num) {
      state.detailUserFollowingsNum = num
    },
    updateDetailUserFollowersNum (state, num) {
      state.detailUserFollowersNum = num
    },
    changeFollowings (state, user) {
      state.followings = user
    },
    changeFollowers (state, user) {
      state.followers = user
    }
  },
  actions: {
    // ログインユーザーのフォロー数・フォロワー数を取得
    getLoggedInUserFollowNum ({ commit }, id) {
      // フォロー数を取得
      axios.get('http://localhost:3000/api/followings/num/' + id)
      .then(response => {
        if (response.status === 200) {
          commit("updateLoggedInUserFollowingsNum", response.data)
        }
      });
      // フォロワー数を取得
      axios.get('http://localhost:3000/api/followers/num/' + id)
      .then(response => {
        if (response.status === 200) {
          commit("updateLoggedInUserFollowersNum", response.data)
        }
      })
    },
    // 詳細表示するユーザーのフォロー数・フォロワー数を取得
    getDetailUserFolloNum ({ commit }, id) {
      // フォロー数を取得
      axios.get('http://localhost:3000/api/followings/num/' + id)
      .then(response => {
        if (response.status === 200) {
          commit("updateDetailUserFollowingsNum", response.data)
        }
      });
      // フォロワー数を取得
      axios.get('http://localhost:3000/api/followers/num/' + id)
      .then(response => {
        if (response.status === 200) {
          commit("updateDetailUserFollowersNum", response.data)
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
    }
  }
}

export default option;
