import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import cart from './modules/cart'
import user from './modules/user'
import category from './modules/category'
export default createStore({
  modules: {
    cart,
    user,
    category
  },
  // 配置插件
  plugins: [
    //   默认存储在localStoreage中
    createPersistedState({
      // 本地存储的名字
      key: 'eribbit-client-pc',
      //   指定需要存储的模块
      paths: ['user', 'cart']
    })
  ]
})
