import axios from 'axios'
// import router from '../../router'

export const option = {
  namespaced: true,
  state: {
    loggedInUserFollowingsNum: {},
    loggedInUserFollowersNum: {}
  },
  mutations: {
    updateLoggedInUserFollowingsNum (state, num) {
      state.loggedInUserFollowingsNum = num
    },
    updateLoggedInUserFollowersNum (state, num) {
      state.loggedInUserFollowersNum = num
    }
  },
  actions: {
    getLoggedInUserFollowNum ({ commit }, id) {
      axios.get('http://localhost:3000/api/followings/num/' + id)
      .then(response => {
        if (response.status === 200) {
          commit("updateLoggedInUserFollowingsNum", response.data)
        }
      });
      axios.get('http://localhost:3000/api/followers/num/' + id)
      .then(response => {
        if (response.status === 200) {
          commit("updateLoggedInUserFollowersNum", response.data)
        }
      })
    }
  }
}

export default option;
