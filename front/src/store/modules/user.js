import axios from 'axios'
// import router from '../../router'

export const user = {
  namespaced: true,
  state: {
    // 詳細表示するユーザー（ローカルストレージに保存する）
    detailUser: {},
    // 詳細表示するユーザー情報
    detailUserInfo: {}
  },
  mutations: {
    // 詳細表示するユーザー情報を更新
    updateDetailUser (state, user) {
      state.detailUserInfo = user
    },
    // 詳細表示するユーザー情報を更新
    updateDetailUserInfo (state, info) {
      state.detailUserInfo = info
    }
  },
  actions: {
    // 詳細表示するユーザー情報を取得
    getDetailUserInfo ({ commit }, id) {
      axios.get('http://localhost:3000/api/users/' + id)
      .then(response => {
        if (response.status === 200) {
          commit("updateDetailUserInfo", response.data);
        }
      })
    }
  }
}

export default user;
