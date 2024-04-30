<template>
  <div>
    <PageLoader v-bind:storage="appLoading" />
    <ServerError v-if="ServerError" />
    <v-snackbar
      v-model="showSnackbar"
      color="rgba(255, 98, 0, 1)"
      right
      top
      :timeout="3000"
    >
      <v-layout wrap>
        <v-flex text-left class="align-self-center">{{ msg }}</v-flex>
        <v-flex text-right>
          <v-btn small :ripple="false" text @click="showSnackbar = false">
            <v-icon style="color: white">mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-snackbar>
    <v-layout wrap justify-center>
      <v-flex
        xs12
        px-4
        pt-4
        text-left
        style="font-weight: 400; font-size: 20px; font-family: LexendRegular"
      >
        <v-layout wrap>
          <v-flex xs12 sm6 md3 pt-2 pr-1 pl-0 pl-md-1>
            <v-autocomplete
              outlined
              class="font2a"
              color="rgba(255, 98, 0, 1)"
              dense
              :items="locationList"
              v-model="location"
              label="Location"
              item-text="name"
              item-value="_id"
              item-color="#FF1313"
              hide-details="true"
            ></v-autocomplete>
            <v-layout wrap pt-3 v-if="location == '6567264a8831e05bfd738ec5'">
              <v-flex
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
          <!-- <v-flex xs12 sm6 md2 pt-2 pr-1>
          <v-text-field  class="font2a"
            v-model="room" label="Rooms"
            hide-details outlined
            flat dense 
          ></v-text-field>
        </v-flex> -->
          <v-flex xs12 sm6 md2 pt-2 pr-1 @click="guest = true">
            <v-card
              v-if="adult"
              outlined
              style="border-color: #626262"
              class="py-1"
            >
              <span
                class="pr-1 pl-2"
                v-if="adult"
                style="
                  font-family: LexendFont;
                  color: #474646;
                  font-size: 16px;
                  font-weight: 400;
                "
                >Guests :</span
              >
              <span
                class="pr-1 pl-2"
                v-if="adult"
                style="
                  font-family: LexendFont;
                  color: #474646;
                  font-size: 16px;
                  font-weight: 400;
                "
                >{{ adult }}<v-icon>mdi-human-male</v-icon></span
              >
              <span
                class="pl-1 pr-2"
                v-if="children"
                style="
                  font-family: LexendFont;
                  color: #474646;
                  font-size: 16px;
                  font-weight: 400;
                "
                >{{ children }}<v-icon>mdi-car-child-seat</v-icon></span
              >
            </v-card>
            <v-card v-else outlined style="border-color: #626262" class="py-1">
              <span
                style="
                  font-family: LexendFont;
                  color: #474646;
                  font-size: 16px;
                  font-weight: 400;
                "
                class="py-2 pl-2"
                >No.of guest</span
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
          <v-flex xs12 sm6 md3 pt-2 pr-1>
            <v-menu
              ref="menuCheckIn"
              v-model="menuCheckIn"
              :close-on-content-click="false"
              :return-value.sync="checkInDate"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="checkInDate"
                  outlined
                  readonly
                  label="Checkin Date"
                  dense
                  hide-details
                  clearable
                  class="rounded-0 font2a"
                  color="rgba(255, 98, 0, 1)"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                color="rgba(255, 98, 0, 1)"
                v-model="checkInDate"
                no-title
                :min="nowDate"
                scrollable
                @change="$refs.menuCheckIn.save(checkInDate)"
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
              class="font2a"
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
              dense
              class="font2a"
            ></v-select>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs11 py-2>
        <v-layout wrap justify-center>
          <v-flex xs12 sm4 lg2 pb-5>
            <v-btn block color="rgba(255, 98, 0, 1)">
              <span
                style="
                  font-weight: 500;
                  color: white;
                  font-size: 18px;
                  font-family: LexendRegular;
                  text-transform: none;
                "
                @click="validation()"
                >Search
              </span>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-dialog width="550px" v-model="guest">
      <v-card class="pa-2">
        <v-layout wrap justify-center pt-5>
          <v-flex xs5 text-left pt-3>
            <span
              style="
                font-family: RobotoRegular;
                color: black;
                font-size: 18px;
                font-weight: 400;
              "
              >No.of Adults</span
            ><span style="color: red">*</span>
            <span style="color: #626262; font-size: 10px">
              Above 5 year child count added to adult count
            </span>
          </v-flex>
          <v-flex xs5>
            <span>
              <v-text-field
                class="font2a"
                color="rgba(255, 98, 0, 1)"
                v-model="adult"
                label="Adults"
                hide-details
                outlined
                flat
                dense
              ></v-text-field>
            </span>
          </v-flex>
          <v-flex xs5 text-left pt-5>
            <span
              style="
                font-family: RobotoRegular;
                color: black;
                font-size: 18px;
                font-weight: 400;
              "
              >No.of Children</span
            >
            <span>
              <span style="color: red">*</span>
              <span style="color: #626262; font-size: 10px">
                Ages below 4 years
              </span>
            </span>
          </v-flex>
          <v-flex xs5 pt-3>
            <span>
              <v-text-field
                class="font2a"
                color="rgba(255, 98, 0, 1)"
                v-model="children"
                label="Children"
                hide-details
                outlined
                flat
                dense
              ></v-text-field>
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
                      font-family: RobotoRegular;
                      color: white;
                      font-size: 16px;
                      font-weight: 400;
                    "
                  >
                    APPLY
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
//   import moment from 'moment'
//   import { format, parseISO } from 'date-fns'
import axios from "axios";
import store from "./../store";
export default {
  props:["queryPopUpDialog"],
  data() {
    return {
      appLoading: false,
      category: "",
      menuCheckIn1: false,
      checkInDate1: null,
      checkInMenuVisible1: false,
      checkInTime1: "",
      checkOutMenuVisible1: false,
      checkOutTime1: "",
      type: "",
      ServerError: false,
      location: "656726678831e05bfd738ece",
      menuCheckIn2: false,
      checkInDate2: null,
      checkInMenuVisible2: false,
      checkInTime2: "",
      checkOutMenuVisible2: false,
      checkOutTime2: "",
      showSnackbar: false,
      checkInDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10),
      timeout: 5000,
      menu1: false,
      menu2: false,
      menu3: false,
      menu4: false,
      checkInMenuVisible: false,
      checkOutMenuVisible: false,
      checkInTime: "",
      checkOutTime: "",
      room: null,
      locationList: [],
      childrens: [
        { id: 1, name: " 1" },
        { id: 2, name: " 2" },
        { id: 3, name: " 3" },
      ],
      adults: [
        { id: 1, name: " 1" },
        { id: 2, name: " 2" },
        { id: 3, name: " 3" },
      ],
      nowDate: new Date().toISOString().slice(0, 10),

      limit: 10,
      triptype: "",
      fromDate: null,
      toDate: null,

      fromDate2: null,
      toDate2: null,
      checkOutDate: null,
      menuCheckIn: false,
      menuCheckOut: false,
      adult: 2,
      children: 1,
      date: null,
      menuCheckInVisiblem: false,
      checkInDatem: null,
      checkInMenuVisiblem: false,
      checkInTimem: "",
      checkOutMenuVisiblem: false,
      checkOutTimem: "",

      guest: false,
      msg: null,
      value: "",
      phone: "",
      cards: [
        {
          title: "bookingCount",
          name: "Total Bookings",
          src: require("./../assets/icons/homeIcon1.png"),
          count: "12",
        },
        {
          title: "reserveCount",
          name: "Reservations",
          src: require("./../assets/icons/homeIcon2.png"),
          count: "40",
        },
        {
          title: "houseBoatCount",
          name: "Houseboats",
          src: require("./../assets/icons/homeIcon3.png"),
          count: "30",
        },
        {
          title: "shikaraCount",
          name: "Shikaras",
          src: require("./../assets/icons/homeIcon4.png"),
          count: "30",
        },
      ],
      availableTimes: [],
      times: [],
    };
  },
  // computed: {
  //   computedDateFormattedMomentjs() {
  //     return this.date ? moment(this.date).format('dddd, MMMM Do YYYY') : ''
  //   },
  //   computedDateFormattedDatefns() {
  //     return this.date ? format(parseISO(this.date), 'EEEE, MMMM do yyyy') : ''
  //   },
  // },
  watch: {
    checkInDate() {
      // Clear checkInTime and checkOutTime when checkInDate changes
      this.checkInTime = null;
      this.checkOutTime = null;
    },
  },
  mounted() {
    this.getData();
    this.checkInTime = this.getAvailableTimes(this.checkInDate)[0];
    this.checkOutTime = this.getAvailableTimes(this.checkInDate)[0];
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
    apply() {
      if (this.adult) {
        this.guest = false;
      } else {
        this.msg = "Please choose number of adults";
        this.showSnackbar = true;
      }
    },
    validation() {
      if (!this.location) {
        this.msg = "Please choose location";
        this.showSnackbar = true;
        return;
      } else if (!this.adult) {
        this.msg = "Please choose number of guests";
        this.showSnackbar = true;
        return;
      } else if (!this.checkInDate) {
        this.msg = "Please choose check-in date";
        this.showSnackbar = true;
        return;
      } else if (!this.checkInTime) {
        this.msg = "Please choose check-in time";
        this.showSnackbar = true;
        return;
      } else if (!this.checkOutTime) {
        this.msg = "Please choose check-out time";
        this.showSnackbar = true;
        return;
      } else {
        this.searchProduct();
      }
    },
    searchProduct() {
      var searchItems = {};

      searchItems.checkInDate = this.checkInDate;
      searchItems.checkInTime = this.checkInTime;
      searchItems.checkOutTime = this.checkOutTime;
      searchItems.children = this.children;
      searchItems.location = this.location;
      searchItems.adult = this.adult;
      store.commit("SKsearchItems", searchItems);

      localStorage.setItem("checkInDate", this.checkInDate);
      localStorage.setItem("checkInTime", this.checkInTime);
      localStorage.setItem("checkOutTime", this.checkOutTime);
      localStorage.setItem("location", this.location);
      if (this.children > 0) {
        localStorage.setItem("children", this.children);
      } else {
        localStorage.setItem("children", 0);
      }
      localStorage.setItem("adult", this.adult);

      var curTab = localStorage.getItem("myTab");
      localStorage.setItem("curTab", curTab);
      // this.$router.push("/ViewShikara")
      this.$emit("stepper", {
        queryPopUpDialog: false,
      });
      this.$router.push("/SearchBoats?type=" + "shikara");
    },
    searchProduct1() {
      this.appLoading = true;
      var headers1 = {};
      // var data = {
      // keyword: this.keyword.productname,
      //     page: this.page,
      //     limit: this.limit,
      // };
      axios({
        method: "POST",
        url: "/product/search",
        // data: data,
        headers: headers1,
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status) {
            this.$store.commit("getSearchResults", response.data.data);

            this.products = response.data.data;
            this.result = response.data;
            this.$router.push("/ViewShikara");
          } else {
            this.products = [];
          }
        })
        .catch((err) => {
          this.appLoading = false;
          this.ServerError = true;
          console.log(err);
        });
    },
    getData() {
      this.appLoading = true;
      axios({
        method: "GET",
        url: "/location/list",
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status) {
            this.locationList = response.data.data;
          } else {
            this.msg = response.data.msg;
            this.showSnackbar = true;
          }
        })
        .catch((err) => {
          this.appLoading = false;
          console.log(err);
          this.ServerError = true;
        });
    },
  },
};
</script>