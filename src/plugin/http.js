import axios from 'axios'
const httpHelper = {}
//  配置Vue配件,把axios配制成vue的一个属性来用
httpHelper.install = function fn (Vue) {
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
  Vue.prototype.$http = axios
}
export default httpHelper
