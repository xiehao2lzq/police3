// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
//todo 封装好的axios
import axios from "./axios"
//todo 使用axios插件
Vue.prototype.$axios = axios;
//todo 引入仓库
import store from './store'

//todo 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//todo 引入公共样式
import "./stylesheets/main.scss"
//todo 使用ElementUI
Vue.use(ElementUI);
/* eslint-disable no-new */
//全局路由拦截
router.beforeEach((to, from, next) => { //路由拦截，切记避免死循环
  store.state.common.animation = false;
  next()
})
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
