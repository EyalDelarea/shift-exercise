<template>
  <div class="modal">
    <div class="content">
      <h1>Edit Shift</h1>
      <p>Here you can manually change the hours</p>
      <div class="form">
        <span
          >Start : <input v-model="start" type="text" placeholder="start"
        /></span>
        <span>End : <input v-model="end" type="text" placeholder="end"/></span>
        <div class="buttonsWrapper">
          <button class="saveButton" @click="saveButton">Save</button>
          <button class="exitButton" @click="closeModal">Exit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["EditModal"],
  data() {
    return {
      start: "",
      end: "",
    };
  },
  created() {
    this.start = this.$store.state.editShiftInfo.start;
    this.end = this.$store.state.editShiftInfo.end;
  },
  methods: {
    closeModal() {
      //vuex close
      this.$store.commit("setEditModal", false);
    },
    saveButton() {
      //save new data to database
      const index = this.$store.state.editShiftInfo.index;
      const shiftObject = {
        start: this.start,
        end: this.end,
      };
      this.$emit("edit-shift", index, shiftObject);
    },
  },
};
</script>

<style scoped>
.modal {
  display: grid;
  justify-content: center;
  align-items: center;
  z-index: 101;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
}

p {
  text-align: center;
}

button {
  align-self: center;
  border-radius: 15%;
  margin: 5px;
  min-width: 50px;
  min-height: 35px;
}

button:hover {
  color: white;
}

input {
  background: rgba(0, 0, 0, 0.363);
  max-width: 100px;
}
.content {
  background: white;
  padding: 15px;
  min-width: 300px;
  border-radius: 15%;
  justify-content: center;
}

.saveButton {
  background: green;
}

.exitButton {
  background: red;
}

.buttonsWrapper {
  margin-top: 35px;
}

.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
span {
  display: flex;
  text-align: center;
  align-items: center;
}
</style>
