// 用户模块

export default {
  namespaced: true,
  state () {
    return {
    //   用户信息
      profile: {
        // 用户id
        id: '',
        // 用户头像
        avatar: '',
        // 用户昵称
        nickname: '',
        // 用户账户
        account: '',
        // 用户的手机号
        mobile: '',
        // 用户的token
        token: ''
      }
    }
  },
  mutations: {
    //   修改用户信息对象
    setUser (state, payload) {
      state.profile = payload
    }
  }
}
