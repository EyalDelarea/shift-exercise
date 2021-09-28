<template>
  <div class="wrapper">
    <div class="textWrapper">
      <p>
        Start:{{ item.start }}

        End{{ item.end }}
      </p>
      <div class="buttonWrapper">
        <button @click="editClick" class="edit">Edit</button>
        <button @click="emitRemove" class="remove">Remove</button>
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
        index:this.index
      });
      //load date to vuex

      this.$store.commit("setEditModal", true);
    },
  },
};
</script>

<style scoped>
button {
  min-width: 80px;
  border-radius: 50%;
}
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

.buttonWrapper {
  display: flex;
  justify-content: center;
  flex-direction: row;
}
.textWrapper {
  display: flex;
  background: rgba(0, 0, 0, 0.267);
  border-radius: 20%;

  text-align: center;
}
.textWrapper:hover {
  background: rgb(0, 98, 128);
}

.edit {
  background: rgba(255, 166, 0, 0.767);
}
.remove {
  background: rgba(255, 0, 0, 0.74);
}
</style>
