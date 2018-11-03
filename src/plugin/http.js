import axios from 'axios'
const httpHelper = {}
//  配置Vue配件,把axios配制成vue的一个属性来用
httpHelper.install = function fn (Vue) {
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
  axios.interceptors.request.use(function (config) {
    // 一次性设置请求头
    const AUTH_TOKEN = sessionStorage.getItem('token')
    config.headers.common['Authorization'] = AUTH_TOKEN
    return config
  }, function (error) {
    return Promise.reject(error)
  })

  //  添加响应拦截器
  axios.interceptors.response.use(function (response) {
    return response
  }, function (error) {
    return Promise.reject(error)
  })
  Vue.prototype.$http = axios
}
export default httpHelper
