import { send_get_request } from '../utils/Axios-common'
import router from '../router'

export default {
  namespaced: true,

  state: {
    user: null,
    token: null
  },

  getters: {
    token(state){
      return state.token
    }
    // authenticated (state) {
    //   return state.authenticated
    // },
    //
    // user (state) {
    //   return state.user
    // },
    /*errors(state){
      return state.errors
    }*/
  },

  mutations: {
    set_user_data (state, data) {
      state.user = data.user
      state.token = data.token
    },

    remove_user_data(state){
      state.user = null
      state.token = null
    }

  },

  actions: {
    set_user_data({commit}, data){
      commit('set_user_data', data)
      localStorage.setItem('user_data', JSON.stringify(data))
    },

    async logout({ commit }){
      await send_get_request('/logout');

      commit('remove_user_data');
      localStorage.removeItem('user_data');
      router.push('/sign_in');
    },

    async get_user_data({ commit }){
      let user_data = JSON.parse(localStorage.getItem('user_data'));
      if(user_data) {
        commit('set_user_data', user_data);
        let res = await send_get_request('/profile');
        if (!res.success) {
          commit('remove_user_data');
          localStorage.removeItem('user_data');

          if (router.currentRoute.fullPath !== '/sign_in') {
            router.push('/sign_in');
          }
        }
      } else {
        if (router.currentRoute.fullPath !== '/sign_in') {
          router.push('/sign_in');
        }
      }

    }
    /*async sign_in (context, params) {
      let res = await signIn(params);
      console.log(res);
    },

    remove_errors({commit}){
       commit('SET_ERRORS')
    }*/


    // async signOut ({ dispatch }) {
    //   await axios.post('/logout');
    //
    //   return dispatch('me');
    // },
  }
}