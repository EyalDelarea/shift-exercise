import { createStore } from "vuex";

export const store = createStore({
  state: {
    auth: {},
    loading: false,
    serverResponse: {
      message: "",
      type: "",
    },
    isEditModalOpen:false,
    editShiftInfo:{
      start:'',
      end:'',
      index:''
    }
  },
  mutations: {
    loadUser(state, payload) {
      state.auth = payload;
    },
    logout(state) {
      state.auth = {};
    },
    setLoading(state, bool) {
      state.loading = bool;
    },
    setServerResponse(state, response) {
      state.serverResponse = response;
    },
    clearServerResponse(state) {
      state.serverResponse = {
        message: "",
        type: "",
      };
    },
    setEditModal(state,bool){
      state.isEditModalOpen = bool
    }
    ,
    setEditShiftInfo(state,shift){
      state.editShiftInfo =shift
    }
  },
  getters: {
    auth(state) {
      return state.auth;
    },
  },

  modules: {},
});
