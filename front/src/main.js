import Vue from "vue";
import axios from 'axios'
import App from './App'
import router from './router'
import vuetify from './plugins/vuetify';
import store from './store/index'

import { extend, localize, ValidationProvider, ValidationObserver } from 'vee-validate';
import ja from "vee-validate/dist/locale/ja.json"
import { required, max, min, email, confirmed } from 'vee-validate/dist/rules';// バリデーションルール

// VeeValidateがデフォルトで用意している各ルールを使用するよう指定
extend("required", required) // 必須項目のバリデーション
extend("email", email) // emailのバリデーション
extend("max", max) // 最大文字数のバリデーション
extend("min", min) // 最小文字数のバリデーション
extend("confirmed", confirmed) // パスワード確認で同一か調べるバリデーション

Vue.component("ValidationProvider", ValidationProvider)
Vue.component("ValidationObserver", ValidationObserver)
localize("ja", ja)


Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  axios,
  store,
  render: h => h(App)
})
.$mount('#app')
