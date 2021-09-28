<template>
  <div id="container">
    <div class="container">
      <div class="imageWrapper">
        <img
          src="https://img.icons8.com/external-vitaliy-gorbachev-blue-vitaly-gorbachev/60/000000/external-timer-food-delivery-vitaliy-gorbachev-blue-vitaly-gorbachev.png"
        />
      </div>
      <h1>Welcome back ID: {{ auth?.userID }}</h1>

      <div>
        <!-- insert a new shift -->
        <div v-if="isNewShiftOpen">
          <form>
            <p>Add new shift info:</p>
            <div class="datePicker">
              <span>Start</span>
              <vue-timepicker
                format="HH:mm"
                @change="changeHandler($event, 'start')"
              ></vue-timepicker>
            </div>
            <div class="datePicker">
              <span>End</span>
              <vue-timepicker
                format="HH:mm"
                @change="changeHandler($event, 'end')"
              ></vue-timepicker>
            </div>
            <div>
              <button @click.prevent="saveNewShift()" class="saveButton">
                <img
                  src="https://img.icons8.com/external-bearicons-blue-bearicons/64/000000/external-plus-essential-collection-bearicons-blue-bearicons.png"
                />
              </button>
            </div>
          </form>
        </div>
        <div v-else>
          <div class="container">
            <div v-if="this.$store.state.isEditModalOpen">
              <EditModal @edit-shift="editShift" />
            </div>
            <button @click="openNewShiftWindow()">Add a New Shift</button>
            <div class="errorWrapper" v-if="this.response.message">
              <Error />
            </div>
            <div class="container scroll">
              <div
                v-if="shiftsArray.length === 0 && this.isNewShiftOpen === false"
                class="container"
              >
                Looks like you don't have any shifts yet...
                <br />
                Click on add new shift to start!
                <div class="imageWrapper">
                  <img
                    src="https://img.icons8.com/external-flatarticons-blue-flatarticons/65/000000/external-error-contact-us-flatarticons-blue-flatarticons.png"
                  />
                </div>
              </div>

              <div v-else>
                <div v-for="(item, index) in shiftsArray" :key="index">
                  <Shift
                    :item="item"
                    :index="index"
                    @remove-shift="removeShift"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <br />
  </div>
</template>

<script>
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";
import "vue2-timepicker/dist/VueTimepicker.css";
import Shift from "./shift.vue";
import { getRequest } from "../../../node/getRequests";
import { postRequest, putRequest } from "../../../node/postRequests";
import Error from "../Utils/Error.vue";
import EditModal from "../../EditModal.vue";

export default {
  data() {
    return {
      isNewShiftOpen: false,
      isWatchShiftsOpen: false,
      startTime: "0",
      endTime: "0",
      shiftsArray: [],
    };
  },
  components: { VueTimepicker, Shift, Error, EditModal },

  methods: {
    redirect() {
      if (this.auth === undefined) {
        console.log("Not logged in -redirecting to login page");
        this.$router.push({ path: "/login" });
      } else {
        this.$store.commit("clearServerResponse");
        console.log("logged in");
      }
    },
    openNewShiftWindow() {
      this.isNewShiftOpen = !this.isNewShiftOpen;
    },
    async fetchData() {
      const id = this.$store.state.auth?.payload?._id;
      const data = await getRequest("shifts?userID=" + id);
      const array = JSON.parse(data.message);
      this.shiftsArray = array[0].shifts;
    },
    async saveNewShift() {
      const userID = this.$store.state.auth.payload._id;
      this.$store.commit("setLoading", true);
      const object = {
        start: this.startTime,
        end: this.endTime,
        userID: userID,
      };
      const data = await postRequest(object, "shifts");

      this.$store.commit("setLoading", false);
      if (data.type == "201") {
        //load user to vuex
        this.shiftsArray.push({
          start: this.startTime,
          end: this.endTime,
        });
        this.openNewShiftWindow();
      }
    },
    async editShift(index, shiftObject) {
      this.shiftsArray[index] = shiftObject;
      //save to server
      await this.updateShiftListOnServer();
      this.$store.commit("setEditModal", false);
    },
    async removeShift(objectIndex) {
      this.shiftsArray = this.shiftsArray.filter(function(item, index) {
        return index !== objectIndex;
      });

      await this.updateShiftListOnServer();
    },
    changeHandler(eventData, type) {
      const { displayTime } = eventData;
      switch (type) {
        case "start":
          this.startTime = displayTime;
          break;
        case "end":
          this.endTime = displayTime;
          break;
      }
    },
    async updateShiftListOnServer() {
      this.$store.commit("setLoading", true);
      //This is a hack to remove proxy
      const arr = [];
      for (var [, data] of Object.entries({ ...this.shiftsArray })) {
        arr.push({ ...data });
      }
      console.log(arr);
      //update server
      const userUniqueID = this?.$store.state?.auth?.payload?._id;
      const res = await putRequest(arr, `shifts/${userUniqueID}`);
      this.$store.commit("setServerResponse", res);
      this.$store.commit("setLoading", false);
    },
  },

  async created() {
    this.$store.commit("clearServerResponse");
    this.redirect();
    await this.fetchData();
  },
  computed: {
    auth() {
      return this.$store.state?.auth?.payload;
    },
    response() {
      console.log(this.$store.state?.serverResponse);
      return this.$store.state?.serverResponse;
    },
  },
  watch: {
    auth: function() {
      this.redirect();
    },
    shiftsArray: {
      deep: true,
      async handler(a) {
        this.shiftsArray = a;
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
.container {
  text-align: center;
  justify-content: center;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}

.datePicker {
  text-align: center;
}

.saveButton {
  background: rgba(0, 0, 0, 0);
}
.saveButton:hover {
  box-shadow: none;
  /* background: rgba(0, 0, 0, 0.295); */
}
button :hover {
  transition: all 0.3s;
  background-color: #fdfdfd;
  border-radius: 50%;
  color: black;
}

.errorWrapper {
  display: grid;
  justify-content: center;
  min-width: 200px;
  min-height: 50px;
}
.scroll {
  margin-top: 10px;
  padding: 4px;
  height: 300px;
  overflow-y: auto;
  text-align: justify;
}
.datePicker.span {
  background: black;
}
</style>
