<template>
  <div class="wrapper">
    <div class="textWrapper">
      <p>Start: {{ item.start }}</p>
      <p>End : {{ item.end }}</p>

      <div class="buttonWrapper">
        <div class="actionWrapper">
          <img
            src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/000000/external-edit-miscellaneous-kiranshastry-gradient-kiranshastry.png"
            @click="editClick"
          />
        </div>

        <div class="actionWrapper">
          <img
            src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/000000/external-delete-miscellaneous-kiranshastry-gradient-kiranshastry.png"
            @click="emitRemove"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Shift",
  props: {
    item: Object,
    index: Number,
  },
  data() {
    return {
      select: "",
    };
  },
  methods: {
    emitRemove() {
      this.$emit("remove-shift", this.index);
    },
    editClick() {
      this.$store.commit("setEditShiftInfo", {
        start: this.item.start,
        end: this.item.end,
        index: this.index,
      });
      //load date to vuex
      this.$store.commit("setEditModal", true);
    },
  },
};
</script>

<style scoped>
button:hover {
  background: rgba(0, 0, 0, 0.377) !important;
}
.wrapper {
  display: flex;
  justify-content: center;
  overflow: visible;
  scrollbar-arrow-color: black;
  height: 50px;
  width: auto;
  margin-top: 5px;
}

p {
  margin-right: 20px;
}
.buttonWrapper {
  display: flex;
  justify-content: center;
  flex-direction: row;
}
.textWrapper {
  display: flex;
  border-radius: 10%;
  text-align: center;
  background: rgba(80, 235, 59, 0.315);
}
.textWrapper:hover {
  background: rgba(255, 255, 255, 0.63);
}
img {
  max-width: 35px;
}

img:hover {
  background: rgba(0, 0, 0, 0.295);
  border-radius: 50%;
}

.actionWrapper {
  display: grid;
  align-items: center;
  justify-content: center;
}
</style>
