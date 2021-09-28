<template>
   <div id="container">
    <form action="" class="form">
      <h3>Reset password</h3>
      <input v-model="password" type="password" placeholder="id number" />
      <button @click.prevent="logIn(this.name, this.password)">Reset</button>
      <div>
        <p>This feature isn't working yet </p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
name:'ForgotPassword'
}
</script>

<style>

</style>