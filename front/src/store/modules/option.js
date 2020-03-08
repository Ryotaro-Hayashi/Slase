import axios from 'axios'
// import router from '../../router'

export const option = {
  namespaced: true,
  state: {
    loggedInUserFollowingNum: {},
    loggedInUserFollowerNum: {}
  },
  mutations: {
    updateLoggedInUserFollowingNum (state, num) {
      state.loggedInUserFollowingNum = num
    },
    updateLoggedInUserFollowerNum (state, num) {
      state.loggedInUserFollowerNum = num
    }
  },
  actions: {
    getLoggedInUserFollowNum ({ commit }, id) {
      axios.get('http://localhost:3000/api/followings/num/' + id)
      .then(response => {
        if (response.status === 200) {
          commit("updateLoggedInUserFollowingNum", response.data)
        }
      });
      axios.get('http://localhost:3000/api/followers/num/' + id)
      .then(response => {
        if (response.status === 200) {
          commit("updateLoggedInUserFollowerNum", response.data)
        }
      })
    }
  }
}

export default option;
