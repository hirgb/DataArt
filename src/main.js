import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Axios from 'axios'
import Echarts from 'echarts'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueFullPage from 'vue-fullpage.js'

// import PerfectScrollbar from 'vue2-perfect-scrollbar'
// import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'

import Z from '@/assets/js/z.js'
import Utils from '@/assets/js/utils.js'
import config from '@/assets/js/config.js'

import router from './router'
import store from './store'

// import Vuebar from 'vuebar';
// Vue.use(Vuebar);

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueFullPage)
Vue.use(ElementUI, {
  size: 'medium'
})
// Vue.use(PerfectScrollbar)

Vue.prototype.$axios = Axios
Vue.prototype.$echarts = Echarts
Vue.prototype.$z = Z
Vue.prototype.$utils = Utils
Vue.prototype.$config = config

// console.log(Vue.prototype);

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    const jwt = Z.cookie.get('jwt')

    let allowPath = [
        '/404',
        '/login',
        '/index'
    ]

    if (allowPath.includes(to.path) || jwt) {
        next()
    } else {
        next('/login')
    }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
