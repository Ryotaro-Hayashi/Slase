import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import auth from './modules/auth';
import post from './modules/post';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    post
  },
  // localstrageにstateを保存
  plugins: [
    createPersistedState({
      paths: ['auth.loggedIn', 'auth.loggedInUser', 'auth.token','auth.detailUser', 'auth.successSnackbar']
    })
  ]
});
