import Vue from "vue";
import axios from 'axios'
import App from './App'
import router from './router'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  // el: '#app',
  router,
  vuetify,
  axios,
  render: h => h(App)
  // components: { App },
  // template: '<App/>'
})
.$mount('#app')
