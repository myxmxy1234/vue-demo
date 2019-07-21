import Vue from 'vue'
import Vuex from "vuex"

Vue.use(Vuex)

const state = {
    direction: 'forward'  // 路由切换状态  forward是下一页  reverse是下一页
}

const getter = {
    getDirection(state) {
        return state.direction
    }
}

const mutations = {
    updateDirection(state, payload) {
        state.direction = payload.direction
    }
}

export default new Vuex.Store({
    state,
    getter,
    mutations
})