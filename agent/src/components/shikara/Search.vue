<template>
  <div>
    <v-snackbar v-model="snackbar" color="#F17343" right :timeout="3000">
      <v-layout wrap>
        <v-flex text-left class="align-self-center">{{ msg }}</v-flex>
        <v-flex text-right>
          <v-btn small :ripple="false" text @click="snackbar = false">
            <v-icon style="color: white">mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-snackbar>

    <v-layout wrap>
      <v-flex xs12>
        <v-card elevation="0">
          <v-layout wrap justify-center pt-14 pt-lg-0>
            <v-flex
              xs12
              px-4
              pt-4
              text-left
              style="
                font-weight: 400;
                font-size: 20px;
                font-family: LexendRegular;
              "
            >
              <v-layout wrap>
                <v-flex xs12 sm6 md3 pt-2 pr-1 pl-0 pl-md-1>
                  <v-autocomplete
                    outlined
                    class="LexendRegular"
                    dense
                    color="orange"
                    :items="locations"
                    v-model="location"
                    label="Location"
                    style="
                      border-radius: 0px;
                      border-color: #626262;
                      text-transform: none;
                    "
                    item-text="name"
                    item-value="_id"
                    item-color="#FF1313"
                    hide-details="true"
                  ></v-autocomplete>
                  <v-layout
                    wrap
                    pt-3
                    v-if="location == '6567264a8831e05bfd738ec5'"
                  >
                    <v-flex
                      xs12
                      style="
                        font-family: 'LexendRegular';
                        font-size: 14px;
                        color: black;
                        line-height: 1;
                      "
                    >
                      <span>Note: Max Capacity of shikaras is 7</span>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 sm6 md2 pt-2 pr-1 @click="guest = true">
                  <v-card
                    v-if="memberCount"
                    outlined
                    style="border-radius: 0px; border-color: #626262"
                    class="py-1"
                  >
                    <span
                      class="pr-1 pl-2"
                      v-if="memberCount"
                      style="
                        font-family: LexendRegular;
                        color: #474646;
                        font-size: 14px;
                        font-weight: 400;
                      "
                      >GUESTS :</span
                    >
                    <span
                      class="pr-1 pl-2"
                      v-if="memberCount"
                      style="
                        font-family: LexendRegular;
                        color: #474646;
                        font-size: 14px;
                        font-weight: 400;
                      "
                      >{{ memberCount
                      }}<v-icon size="130%">mdi-human-male</v-icon></span
                    >
                    <span
                      class="pl-1 pr-2"
                      v-if="childrenCount"
                      style="
                        font-family: LexendRegular;
                        color: #474646;
                        font-size: 14px;
                        font-weight: 400;
                      "
                      >{{ childrenCount
                      }}<v-icon size="130%">mdi-car-child-seat</v-icon></span
                    >
                  </v-card>
                  <v-card
                    v-else
                    outlined
                    style="border-color: #626262; border-radius: 0%"
                    class="py-1"
                  >
                    <span
                      style="
                        font-family: LexendRegular;
                        color: #474646;
                        font-size: 16px;
                        font-weight: 400;
                      "
                      class="py-2 pl-2"
                      >No of guest</span
                    >
                  </v-card>
                  <v-layout wrap pt-3>
                    <v-flex
                      style="
                        font-family: 'LexendRegular';
                        font-size: 14px;
                        color: black;
                        line-height: 1;
                      "
                    >
                      <span>Note: Children below 4 years do not count</span>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 sm6 md2 pt-2 pr-1>
                  <v-menu
                    ref="menuCheckIn"
                    v-model="menuCheckIn"
                    :close-on-content-click="false"
                    :return-value.sync="checkInDate"
                    transition="scale-transition"
                    offset-y
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="checkInDate"
                        outlined
                        readonly
                        label="Date"
                        color="orange"
                        dense
                        hide-details="auto"
                        clearable
                        class="rounded-0"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="checkInDate"
                      no-title
                      :min="nowDate"
                      scrollable
                      @change="$refs.menuCheckIn.save(checkInDate)"
                      @input="checkDate"
                    >
                      <v-spacer></v-spacer>
                    </v-date-picker>
                  </v-menu>
                </v-flex>
                
                <v-flex xs12 sm6 md2 lg2 xl2 pt-2 pr-1>
                  <v-select
                    v-model="checkInTime"
                    :items="getAvailableTimes(checkInDate)"
                    label="Checkin time"
                    hide-details
                    outlined
                    flat
                    dense
                    color="#F17343"
                    class="rounded-0"

                    @change="clearCheckOutTime"
                  ></v-select>
                  <v-layout wrap>
                    <v-flex
                      v-if="
                        location === '656726678831e05bfd738ece' ||
                        location === '656726558831e05bfd738ec8'
                      "
                      xs12
                      pt-2
                    >
                      <v-flex
                        style="
                          font-family: 'LexendRegular';
                          font-size: 14px;
                          color: black;
                          line-height: 1;
                        "
                      >
                        <span>Note:&nbsp;Minimum hours is 2</span>
                      </v-flex>
                    </v-flex>
                  </v-layout>
                </v-flex>

                <v-flex xs12 sm6 md2 lg2 xl2 pt-2 pr-1>
                  <v-select
                    v-model="checkOutTime"
                    :items="getAvailableTimes(checkInDate, checkInTime)"
                    label="Checkout time"
                    hide-details
                    outlined
                    flat
                    color="#F17343"
                    dense
                    class="rounded-0"
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-flex>

            <v-flex xs11 lg11 pa-4>
              <v-layout wrap justify-center>
                <v-flex xs12 md3 lg2 @click="validateSearch()">
                  <v-btn block color="rgba(255, 98, 0, 1)">
                    <span
                      style="
                        font-weight: 500;
                        color: white;
                        font-size: 18px;
                        font-family: LexendRegular;
                        text-transform: none;
                      "
                      >Search</span
                    >
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog width="550px" v-model="guest">
      <v-card class="pa-2">
        <v-layout wrap justify-center pt-5>
          <v-flex xs5 text-left pt-3>
            <span
              style="
                font-family: LexendRegular;
                color: black;
                font-size: 16px;
                font-weight: 400;
              "
              >No of Adults</span
            >
            <span class="LexendRegular">
              <span style="color: red">*</span>
              <span
                style="color: #626262; font-size: 10px; text-transform: none"
              >
                Above 5 year child count added to Adult count
              </span>
            </span>
          </v-flex>
          <v-flex xs5>
            <span>
              <v-text-field
                flat
                hide-spin-buttons
                type="number"
                dense
                outlined
                style="border-color: #626262; border-radius: 0px"
                color="orange"
                v-model="memberCount"
                item-text="name"
                item-color="#FF1313"
                hide-details="true"
                class="LexendRegular"
              >
              </v-text-field>
            </span>
          </v-flex>
          <v-flex xs5 text-left pt-11>
            <span
              style="
                font-family: LexendRegular;
                color: black;
                font-size: 16px;
                font-weight: 400;
              "
              >No of Childrens</span
            >
            <span>
              <span style="color: red">*</span>
              <span
                style="
                  color: #626262;
                  font-size: 10px;
                  font-family: LexendRegular;
                "
              >
                Ages below 4 years
              </span>
            </span>
          </v-flex>
          <v-flex xs5 pt-9>
            <span>
              <v-text-field
                flat
                style="border-radius: 0%"
                dense
                outlined
                hide-spin-buttons
                type="number"
                color="orange"
                v-model="childrenCount"
                item-text="name"
                item-color="#FF1313"
                hide-details="true"
                class="LexendRegular"
              >
              </v-text-field>
            </span>
          </v-flex>
          <v-flex xs10 pt-5 pb-3>
            <v-divider></v-divider>
          </v-flex>
          <v-flex xs10 pt-1 pb-3>
            <v-layout wrap justify-end>
              <v-flex xs7 lg3 text-right>
                <v-btn color="#FF6200" @click="apply()">
                  <span
                    style="
                      font-family: LexendRegular;
                      color: white;
                      font-size: 16px;
                      text-transform: none;
                      font-weight: 400;
                    "
                  >
                    Apply
                  </span>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import axios from "axios";
// import VueTimepicker from "vue2-timepicker";
// import "vue2-timepicker/dist/VueTimepicker.css";
export default {
  components: {
    // VueTimepicker,
  },
  data() {
    return {
      appLoading: false,
      memberCount: "",
      menuCheckIn2: false,
      checkInDate2: null,
      checkInMenuVisible2: false,
      checkOutMenuVisible2: false,
      // checkInTime: '',
      // checkInDate: null,
      minDate: new Date().toISOString().substr(0, 10),
      checkInDate: new Date().toISOString().substr(0, 10), // Today's date in 'YYYY-MM-DD' format
      checkInTime: "",
      checkOutTime: "",
      menuCheckInVisible: false,
      menuCheckOutVisible: false,
      checkInMenuVisible: false,
      checkOutMenuVisible: false,
      category: "",
      type: "",
      ServerError: false,
      location: "",
      snackbar: false,
      timeout: 5000,
      menu1: false,
      menu2: false,
      menu3: false,
      menu4: false,
      room: null,

      limit: 10,
      triptype: "",
      fromDate: null,
      toDate: null,
      childrenCount: "",
      // nowDate: new Date().toISOString().slice(0, 10),
      fromDate2: null,
      toDate2: null,
      checkOutDate: new Date().toISOString().substr(0, 10), // Current date in 'YYYY-MM-DD' format
      menuCheckIn: false,
      // checkInTime: new Date().toISOString().substr(11, 5), // Current time in 'HH:mm' format
      menuCheckOut: false,
      adult: null,
      children: "",
      date: null,
      menuCheckInVisiblem: false,
      checkInMenuVisiblem: false,
      checkInTimem: "",
      checkOutMenuVisiblem: false,
      checkOutTimem: "",
      guestSectionVisible: true,
      guest: false,
      msg: null,
      value: "",
      locations: [],
      phone: "",
      selectedTime: "",
      defaultTimeRange: { start: "06:00", end: "17:00" },
      currentHour: new Date().getHours(),
      currentMinute: new Date().getMinutes(),
    };
  },
  mounted() {
    this.getLocation();

    // this.checkInDate = this.searchFilters.checkInDate;
    // this.location = this.searchFilters.location;
    // this.memberCount = this.searchFilters.memberCount;
    // this.childrenCount = this.searchFilters.childrenCount;
  },
  watch: {
    checkInDate() {
      // Clear checkInTime and checkOutTime when checkInDate changes
      this.checkInTime = null;
      this.checkOutTime = null;
    },
  },

  created() {
    const savedFilters = localStorage.getItem("shikaraSearchFilters");

    if (savedFilters) {
      const parsedFilters = JSON.parse(savedFilters);
      this.checkInDate = parsedFilters.checkInDate || "";
      this.checkInTime = parsedFilters.checkInTime || "";
      this.checkOutTime = parsedFilters.checkOutTime || "";
      this.location = parsedFilters.location || "";
      this.memberCount = parsedFilters.memberCount || "";
      this.childrenCount = parsedFilters.childrenCount || "";
    }
  },
  computed: {
    timepickerOptions() {
      const isToday =
        this.checkInDate === new Date().toISOString().split("T")[0];
      const startTime = isToday
        ? this.getCurrentTime()
        : this.defaultTimeRange.start;
      const endTime = this.defaultTimeRange.end;
      console.log(endTime);
      return [[startTime.slice(0, 2), endTime.slice(0, 2)]];
    },

    nowDate() {
      const now = new Date();
      return now.toISOString().substr(0, 10);
    },
  },
  methods: {
    clearCheckOutTime() {
      if (this.checkOutTime && this.checkOutTime < this.checkInTime) {
        this.checkOutTime = null;
      }
    },
    getAvailableTimes(date) {
      const isToday = date === this.nowDate;
      const currentHour = new Date().getHours();
      const maxHour = 17;
      const availableTimes = [];

      const startHour = isToday ? currentHour : 6;

      for (let hour = startHour; hour <= maxHour; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const formattedHour = hour < 10 ? `0${hour}` : hour;
          const formattedMinute = minute === 0 ? "00" : minute;
          availableTimes.push(`${formattedHour}:${formattedMinute}`);
        }
      }

      return availableTimes;
    },
    checkDate() {
      this.$forceUpdate();

      this.$nextTick(() => {
        // Clear selectedTime when selectedDate changes

        this.$refs.checkInTime.value = "";
        this.$refs.checkOutTime.value = "";
        this.checkInTime = "";
        this.checkOutTime = "";
      });
    },
    getCurrentTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    },
    validateSearch() {
      if (!this.location) {
        this.msg = "Please enter Location";
        this.snackbar = true;
        return;
      } else if (!this.memberCount) {
        this.msg = "Please enter No of Adults";
        this.snackbar = true;
        return;
      }
      // else if (!this.childrenCount) {
      //     this.msg = "Please enter No of Children";
      //     this.snackbar = true;
      //     return;
      // }
      else if (!this.checkInDate) {
        this.msg = "Please enter Check in Date";
        this.snackbar = true;
        return;
      } else if (!this.checkInTime) {
        this.msg = "Please enter Check in Time";
        this.snackbar = true;
        return;
      } else if (!this.checkOutTime) {
        this.msg = "Please enter Check Out Time";
        this.snackbar = true;
        return;
      } else {
        this.search();
      }
    },
    getLocation() {
      this.appLoading = true;
      axios({
        method: "GET",
        url: "/location/list",
        headers: {
          token: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          this.locations = response.data.data;

          this.appLoading = false;
        })

        .catch((err) => {
          this.ServerError = true;
          console.log(err);
        });
    },
    clearFilters() {
      this.$store.commit("clearFilters");
    },
    search() {
      localStorage.setItem(
        "shikaraSearchFilters",
        JSON.stringify({
          checkInDate: this.checkInDate,
          checkInTime: this.checkInTime,
          checkOutTime: this.checkOutTime,
          location: this.location,
          memberCount: this.memberCount,
          childrenCount: this.childrenCount,
        })
      );
      this.$store.commit("setFilters", {
        checkInDate: this.checkInDate,
        checkInTime: this.checkInTime,
        checkOutTime: this.checkOutTime,
        location: this.location,
        memberCount: this.memberCount,
        childrenCount: this.childrenCount,
      });
      this.$emit("search" /* Pass your search data here */);

      this.$router.push({
        name: "list",
        query: {
          checkInDate: this.checkInDate,
          checkInTime: this.checkInTime,
          checkOutTime: this.checkOutTime,
          location: this.location,
          memberCount: this.memberCount,
          childrenCount: this.childrenCount,
          hash: "#specific-section",
        },
      });
    },
    apply() {
      this.guestSectionVisible = false;
      this.guest = false;
    },
  },
};
</script>
<style scoped>
.custom-autocomplete.v-autocomplete input {
  border: none !important;
  outline: none !important;
}

.v-input__slot::before {
  border-style: none !important;
}

.custom-autocomplete.v-autocomplete input {
  border: none !important;
  outline: none !important;
}

.v-input__slot::before {
  border-style: none !important;
}

.text-field-transparent .v-input__slot {
  background: transparent !important;
}

.black-border {
  border: 1px solid #d3d3d3;
  padding: 20px;
}

.black-border2 {
  border: 1px solid #d3d3d3;
  padding-top: 20px;
  padding-left: 10px;

  border-radius: 8px 0px 0px 8px;
}

.black-borderz {
  border: 1px solid #d3d3d3;
  padding-top: 8px;
  padding-left: 16px;

  /* Add padding if desired */
  border-radius: 0px 8px 8px 0px;
  /* Top-left and top-right are curved, bottom-left and bottom-right are sharp */
}

.black-borderm {
  border: 1px solid #d3d3d3;
  /* Light grey color for the border */
  padding-left: 20px;
  padding-right: 13px;
  padding-top: 20px;
  padding-bottom: 20px;

  /* Add padding if desired */
  /* Top-left and top-right are curved, bottom-left and bottom-right are sharp */
}

.black-borderu {
  border: 1px solid #d3d3d3;
  /* Light grey color for the border */
  padding-top: 22px;
  padding-left: 16px;

  border-radius: 0px 0px 0px 0px;
}

.black-border3 {
  border: 1px solid #d3d3d3;
  padding: 20px;
  border-radius: 0px 8px 8px 0px;
}

.black-borderx {
  border: 1px solid #d3d3d3;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 8px;

  border-radius: 0px 0px 0px 0px;
}

.black-borderv {
  border: 1px solid #d3d3d3;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 8px;
  border-radius: 0px 0px 0px 0px;
}

.text-field-transparent .v-input__slot {
  background: transparent !important;
}

.black-border {
  border: 1px solid #d3d3d3;
  padding: 20px;
}

#app {
  border-radius: 0px;
  border-color: #626262;
  font-family: LexendRegular;
  text-align: center;
  font-size: 18px;
  color: #2c3e50;
}

h1 {
  font-size: 2em;
  margin-bottom: 20px;
}

.time-picker-container {
  display: flex;
  align-items: center;
}

span.mdi {
  font-size: 24px;
  margin-right: 10px;
}

label {
  margin-right: 10px;
}

.vue__time-picker input.display-time {
  width: 50em !important;
}

.vue__time-picker input.display-time {
  width: 50px !important;
}
</style>