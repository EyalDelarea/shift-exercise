<template>
  <div id="container">
    <div class="errorStyle">
      <div v-bind:class="this.errorType">
        <h4>{{ errorType }}</h4>
        <div v-if="errorType !== 'Success'">
          <p>{{ errorMessage }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async created() {
    //After created,clear the message after 8 seconds
    setTimeout(() => {
      this.$store.commit("clearServerResponse");
    }, 8000);
  },
  computed: {
    errorType() {
      const status = this.$store.state.serverResponse.type;
      const statusCode = parseInt(status / 100);
      switch (statusCode) {
        //400 codes
        case 4: {
          //404 -> warnning
          if (parseInt(status) % 100 === 4) {
            return "Warnning";
          } else {
            //40x
            return "Error";
          }
        }
        //20x
        case 2: {
          return "Success";
        }
        //50x / 30x
        default: {
          return "Error";
        }
      }
    },
    errorMessage() {
      return this.$store.state.serverResponse.message;
    },
  },
};
</script>

<style>
.errorStyle div {
  border-radius: 25px 25px;
  max-width: 250px;
}

.Warnning {
  background-color: orange;
}
.Success {
  background-color: green;
}
.Error {
  background-color: red;
}
</style>
