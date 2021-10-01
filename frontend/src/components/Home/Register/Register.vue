<template>
  <div id="container">
    <form action="" class="form">
      <div class="imageWrapper">
        <img
          src="https://img.icons8.com/external-bearicons-flat-bearicons/64/000000/external-sign-up-call-to-action-bearicons-flat-bearicons-1.png"
        />
      </div>
      <h3>Register an account</h3>
      <input v-model="userID" type="text" placeholder="ID Number" />
      <input v-model="password" type="password" placeholder="Password" />
      <button @click.prevent="register(this.userID, this.password)">
        Register
      </button>
      <div v-if="showError">
        <Error />
      </div>

      <div>
        <p>Already have an account? <a href="/login">click here</a></p>
      </div>
    </form>
  </div>
</template>

<script>
import Error from "../Utils/Error.vue";
import { postRequest } from "../../../node/postRequests";
export default {
  name: "Register",
  components: {
    Error,
  },
  data() {
    return {
      userID: "",
      password: "",
    };
  },
  methods: {
    async register(userID, password) {
      this.$store.commit("setLoading", true);
      const obj = {
        userID: userID,
        password: password,
      };
      const data = await postRequest(obj, "users/register");
      this.$store.commit("setLoading", false);
      if (data.type == "200") {
        this.$router.push({ path: "/login" });
        this.$store.commit("clearServerResponse");
      }
      this.$store.commit("setServerResponse", data);
    },
  },
  computed: {
    showError() {
      return this.$store.state.serverResponse.message !== "";
    },
  },
};
</script>

<style></style>
