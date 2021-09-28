<template>
  <div class="wrapper">
    <div v-if="this.$store.state.auth.payload !== undefiend">
      <button @click="signOut">Sign Out</button>
    </div>
    <a href="/">
      <img alt="Vue logo" src="../../assets/delarea.png" class="logo" />
    </a>
    <p class="text">Welcome to the Shift Manager App!</p>
  </div>
</template>

<script>
export default {
  props: {},
  created() {},
  methods: {
    signOut() {
      this.$store.commit("logout");
      this.$store.commit("clearError");
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.logo {
  min-width: 200px;
  min-height: 150px;

}
@media (max-width:600px){

  .logo{
    min-width: 120px;
    min-height: 50px;
  }
}

button {
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.548);
  box-shadow: none !important;
}

.text {
  font-weight: bold;
  text-align: center;
  color: black;
}
</style>
