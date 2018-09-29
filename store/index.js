import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'

Vue.use(Vuex)

var state = {
  user: {}
}

var mutations = {
  login(state, data) {
    // 这里的 `state` 对象是模块的局部状态
    Cookies.set('name', data.name,  { expires:7 })
    Cookies.set('token', data.token,  { expires: 1.0/24.0})
    state.user = Object.assign({}, state.user, data)
  },
  logout(state, data) {
    // 这里的 `state` 对象是模块的局部状态
    state.user = {}
  }
}

var getters = {
  token(state) {
    return state.user.token
  }
}

const store = () =>
  new Vuex.Store({
    state: state,
    mutations: mutations,
    getters: getters
  })

export default store
