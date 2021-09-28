<template>
  <div class="bg">
    <Header v-on:sign-out="signOut()" />
    <div v-if="loading">
      <Modal />
    </div>
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header/Header.vue";
import Footer from "./components/Footer/Footer.vue";
import Modal from "./components/Modal.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
    Modal,
  },
  methods: {
    signOut() {
      this.$store.commit("logout");
      this.$router.push({ path: "/" });
    },
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
  },
};
</script>

<style>
#app {
  height: 100%;
  min-height: 85vh;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  width: 100%;
  overflow: hidden;

  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.bg {
  background: black url("./assets/bg.jpg") center center no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 100%;
  padding: 20px;
}
.logo {
  width: 50px;
}
@media (max-width: 600px) {
  #app {
    overflow: show;
    min-height: 150vh;
  }
}

#container {
  display: flex;
  justify-content: center;
  flex-direction: column;
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
</style>
