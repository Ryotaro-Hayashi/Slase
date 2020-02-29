import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import router from '../router'
import createPersistedState from 'vuex-persistedstate';

import auth from './modules/auth';
import post from './modules/post'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    post
  },
  // localstrageにstateを保存
  plugins: [
    createPersistedState()
  ]
});
