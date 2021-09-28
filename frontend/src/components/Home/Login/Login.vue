<template>
  <div id="container">
    <form class="form">
      <div class="imageWrapper">
        <img
          src="https://img.icons8.com/external-bearicons-blue-bearicons/100/000000/external-login-call-to-action-bearicons-blue-bearicons.png"
        />
      </div>

      <h3>Hello Stranger! Please login</h3>
      <input v-model="userID" autocomplete="username" type="text" placeholder="userID" />
      <input v-model="password" autocomplete="current-password" type="password" placeholder="password" />
      <button @click.prevent="logIn(userID, password)">Login</button>
      <div v-if="showError">
        <Error />
      </div>
      <div>
        <p>Forgot your password? <a href="/forgot-password">click here</a></p>
        <p>Don't have an account yet? <a href="/register">click here</a></p>
      </div>
    </form>
  </div>
</template>

<script>
import Error from "../Utils/Error.vue";
import { postRequest } from "../../../node/postRequests";
export default {
  name: "Login",
  data() {
    return {
      userID: "",
      password: "",
    };
  },
  components: {
    Error,
  },
  created() {
    const userID = this?.$store.state?.auth?.payload?._id;

    if (userID !== "" && userID !== undefined) {
      console.log("already logged in");
      this.$router.push({ path: "/" });
    }
  },
  methods: {
    async logIn(userID, password) {
      this.$store.commit("setLoading", true);
      const obj = {
        userID: userID,
        password: password,
      };
      const data = await postRequest(obj, "users/login");
      this.$store.commit("setServerResponse", data);
      this.$store.commit("setLoading", false);
      if (data.type == "200") {
        this.$store.commit("loadUser", { payload: data.message });
        this.$store.commit("clearServerResponse");
        this.$router.push({ path: "/" });
      }
    },
  },
  computed: {
    showError() {
      return this.$store.state.serverResponse.message !== "";
    },
  },
};
</script>

<style>
input {
  display: flex;
  justify-content: center;
  margin: 5px;
  border: 0px;
  border-radius: 5%;
  min-height: 25px;
  text-align: center;
  max-width: 250px;
}
a {
  text-decoration: none;
  color: black;
}

a:hover {
  color: blue;
}

.imageWrapper {
  display: grid;
  justify-content: center;
  align-content: center;
}

button {
  margin: 5px;
  border-radius: 5%;
  background: white;
  border: 5px;
  min-height: 25px;
}
button:hover {
  background: rgba(0, 0, 0, 0.39);
  cursor: pointer;
  box-shadow: 5px 5px #888888;
}
.form {
  display: grid;
  text-align: center;
  justify-content: center;
}
</style>
