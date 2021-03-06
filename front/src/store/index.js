import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import auth from './modules/auth';
import post from './modules/post';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    post,
    user
  },
  // localstrageにstateを保存
  plugins: [
    createPersistedState({
      paths: ['auth.loggedIn', 'auth.loggedInUser', 'auth.token','auth.loggedInUserInfo', 'auth.successSnackbar', 'post', 'user']
    })
  ]
});
