import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import auth from './modules/auth';
import post from './modules/post';
import option from './modules/option';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    post,
    option,
    user
  },
  // localstrageにstateを保存
  plugins: [
    createPersistedState({
      paths: ['auth.loggedIn', 'auth.loggedInUser', 'auth.token','auth.detailUser', 'auth.successSnackbar', 'option']
    })
  ]
});
