import { createStore } from "vuex";

export const store = createStore({
  state: {
    auth: {},
    loading: false,
    serverResponse: {
      message: "",
      type: "",
    },
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
  },
  getters: {
    auth(state) {
      return state.auth;
    },
  },

  modules: {},
});
