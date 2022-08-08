import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import * as directives from '@/directives'
import '@/icons' // icon
import '@/permission' // permission control
import '@/assets/fonts/iconfont.css'
import dayjs from "dayjs";
Vue.prototype.dayjs = dayjs;
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// 注册自定义指令
// 遍历所有的导出的指令对象 完成自定义全局注册
for (const key in directives) {
  Vue.directive(key, directives[key])
}

// Vue.filter('datefmt', function(input) {
//   return moment.unix(input).format('YYYY-MM-DD')
// })
// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
