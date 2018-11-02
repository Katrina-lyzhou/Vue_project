// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import moment from 'moment'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import '@/assets/css/style.css'
import http from '@/plugin/http.js'

Vue.use(ElementUI)
Vue.use(http)
// 处理创建日期的文本格式,用过滤器,设置一个全局的过滤器
Vue.filter('fmtDate', function (v) {
  return moment(v).format('YYYY-MM-DD hh:mm:ss')
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
