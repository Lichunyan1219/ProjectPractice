import router from '@/router'
import store from '@/store'
const whiteList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  const token = store.state.user.token
  if (token) {
    if (!store.getters.userId) {
    // 如果没有id这个值 才会调用 vuex的获取资料的action
      store.dispatch('user/getUserInfo')
    // 为什么要写await 因为我们想获取完资料再去放行
    }
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    const isCludes = whiteList.includes(to.path)
    if (isCludes) {
      next()
    } else {
      next('/login')
    }
  }
})
