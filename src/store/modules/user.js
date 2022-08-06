import { getUserInfoApi, login } from '@/api/user'
import { setTimeToken } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    token: '',
    userId: '',
    userInfo: {}
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
    setUserInfo(state, payload) {
      state.userInfo = payload
    },
    setResInfo(state, payload) {
      state.userId = payload
    }
  },
  actions: {
    async getToken(context, payload) {
      const res = await login(payload)
      context.commit('setToken', res.token)
      context.commit('setResInfo', res.userId)
      setTimeToken()
    },
    async getUserInfo(context) {
      const id = context.state.userId
      console.log(id)
      const userInfo = await getUserInfoApi(id)
      context.commit('setUserInfo', userInfo.data)
    },
    logout({ commit }) {
      commit('setResInfo', '')
      commit('setUserInfo', '')
      commit('setToken', '')
    }
  }
}
