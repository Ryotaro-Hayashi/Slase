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
    detailUserFollowersNum: {}
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
    }
  },
  actions: {
    // ユーザーのフォロー数・フォロワー数を取得
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
    getFollowings () {
      axios.get('http://localhost:3000/api/followings/' + this.detailUser.id)
      .then(response => {
        if (response.status === 200) {
          this.followings = response.data
        }
      })
    }
  }
}

export default option;
