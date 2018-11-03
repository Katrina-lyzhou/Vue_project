// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import moment from 'moment'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import http from '@/plugin/http.js'
import App from './App'
import MyBread from '@/components/myBread'
import router from './router'
import '@/assets/css/style.css'

Vue.use(ElementUI)
Vue.use(http)
// 处理创建日期的文本格式,用过滤器,设置一个全局的过滤器
Vue.filter('fmtDate', function (v) {
  return moment(v).format('YYYY-MM-DD hh:mm:ss')
})
// 设置面包屑子组件(父子组件传值)
Vue.component(MyBread.name, MyBread)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
