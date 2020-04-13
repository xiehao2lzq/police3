import Vue from 'vue'
import Vuex from 'vuex'
import community from './modules/community'
import dealData from './modules/dealData.js'
import common from './modules/common.js'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    community,
    dealData,
    common
  }
})