<template>
  <div class="wrapper">
    <div v-if="id === ''" class="content">
      <Login />
    </div>
    <div v-else class="content">
      <Dashboard v-bind:id="id" />
    </div>
  </div>
</template>

<script>
import Login from "./Login/Login.vue";
import Dashboard from "./Dashboard/Dashboard.vue";
export default {
  name: "HomePage",
  components: {
    Login,
    Dashboard,
  },
  props: {
    id: String,
  },
};
</script>

<style scoped>
.wrapper {
  position: relative;
  display: flexbox;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  height: 70%;
}

.content {
  display: flex;
  margin-top: 50px;
  justify-content: center;
  align-content: center;
}
</style>
