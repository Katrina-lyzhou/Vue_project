import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import User from '@/views/user'
import rights from '@/views/rights'
import role from '@/views/role'
Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home,
      // 设置主页的子组件,用户列表
      children: [{
        name: 'user',
        path: '/user',
        component: User
      },
      {
        name: 'rights',
        path: '/rights',
        component: rights
      },
      {
        name: 'role',
        path: '/roles',
        component: role
      }]
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    }
  ]
})
