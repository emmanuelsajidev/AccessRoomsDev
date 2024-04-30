<template>
  <div>
    <PageLoader v-bind:storage="appLoading" />
    <ServerError v-if="ServerError" />
    <v-snackbar v-model="snackbar" color="#ff6200" right :timeout="3000">
      <v-layout wrap>
        <v-flex text-left class="align-self-center">{{ msg }}</v-flex>
        <v-flex text-right>
          <v-btn small :ripple="false" text @click="snackbar = false">
            <v-icon style="color: white">mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-snackbar>
    <v-layout wrap justify-center pa-0 pa-sm-4>
      <v-flex xs12>
        <v-layout wrap justify-start pt-2>
          <v-flex xs12 sm3 align-self-center>
            <span
              class="title1"
              :style="{
                'font-size':
                  $vuetify.breakpoint.name == 'xs'
                    ? '20px'
                    : $vuetify.breakpoint.name == 'sm'
                    ? '20px'
                    : $vuetify.breakpoint.name == 'md'
                    ? '25px'
                    : $vuetify.breakpoint.name == 'lg'
                    ? '25px'
                    : '30px',
              }"
              >Shikara bookings</span
            >
          </v-flex>
        </v-layout>
        <v-layout wrap justify-end v-if="list">
          <v-flex xs12 sm4 md3 text-right pr-2 pl-2 pl-md-0 pr-md-4 pt-3 pb-2>
            <v-text-field
              v-model="keyword1"
              dense
              class="rounded-0"
              placeholder="Search"
              outlined
              hide-details
              clearable
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm4 md2 text-right pr-2 pl-2 pl-md-0 pr-md-4 pt-3 pb-2>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="fromDate"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="fromDate"
                  placeholder="From"
                  outlined
                  readonly
                  dense
                  hide-details
                  clearable
                  class="rounded-0"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="fromDate"
                no-title
                scrollable
                @change="$refs.menu.save(fromDate)"
              >
                <v-spacer></v-spacer>
              </v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs12 sm4 md2 text-right pr-2 pl-2 pl-md-0 pr-md-4 pt-3 pb-2>
            <v-menu
              ref="menu1"
              v-model="menu1"
              :close-on-content-click="false"
              :return-value.sync="toDate"
              transition="scale-transition"
              offset-y
              left
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="toDate"
                  placeholder="To"
                  readonly
                  outlined
                  dense
                  hide-details
                  clearable
                  class="rounded-0"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="toDate"
                no-title
                scrollable
                @change="$refs.menu1.save(toDate)"
              >
                <v-spacer></v-spacer>
              </v-date-picker>
            </v-menu>
          </v-flex>
        </v-layout>
        <v-layout wrap justify-center v-if="list">
          <v-flex xs12 v-if="list.length > 0">
            <v-card elevation="0">
              <v-layout wrap justify-center class="hidden-sm-and-down" pb-6>
                <v-flex xs11 v-for="(item, i) in list" :key="i" pt-5>
                  <v-card
                    elevation="0"
                    color="#EDEDED"
                    style="border-radius: 12px"
                  >
                    <v-layout wrap justify-center>
                      <v-flex xs3>
                        <v-layout wrap justify-start>
                          <v-flex xs12>
                            <v-img
                              style="border-radius: 12px 0px 0px 12px"
                              :src="mediaUURL + item.shikaraid.coverImage"
                              height="160px"
                              width="250px"
                              ><template v-slot:placeholder>
                                <ImageLoader /> </template
                            ></v-img>
                          </v-flex>
                        </v-layout>
                      </v-flex>

                      <v-flex xs9 pl-6>
                        <v-layout wrap justify-start fill-height>
                          <v-flex xs4 text-left align-self-center>
                            <v-layout wrap fill-height>
                              <v-flex xs12 align-self-start>
                                <span
                                  style="
                                    font-weight: 500;
                                    font-size: 20px;
                                    font-weight: bold;
                                    font-family: LexendRegular;
                                  "
                                >
                                  {{ item.shikaraid.shikaraName }}
                                </span>
                              </v-flex>
                              <v-flex xs12 pt-2 align-self-end>
                                <span
                                  style="
                                    font-family: LexendRegular;
                                    font-size: 14px;
                                    font-weight: 500;
                                  "
                                >
                                  Booking # :
                                </span>
                                <span
                                  style="
                                    color: #f17343;
                                    font-size: 15px;
                                    font-family: LexendFont;
                                  "
                                >
                                  &nbsp; {{ item.bookingNo }}
                                </span>
                              </v-flex>
                              <v-flex xs11 pt-2 align-self-end>
                                <span
                                  style="
                                    font-family: LexendRegular;
                                    font-size: 15px;
                                    font-weight: 500;
                                  "
                                >
                                  Date :&nbsp;
                                  <span style="color: #f17343">
                                    {{ formatDate(item.selectedDate) }}
                                  </span>
                                </span>
                              </v-flex>
                              <v-flex pt-2 align-self-end>
                                <span
                                  style="
                                    font-family: LexendRegular;
                                    font-size: 15px;
                                    font-weight: 500;
                                  "
                                >
                                  Check-in :&nbsp;
                                  <span style="color: #f17343">
                                    {{ formatTimeNew(item.startTime) }}
                                  </span>
                                </span>
                              </v-flex>
                              <v-flex pt-2 align-self-end>
                                <span
                                  style="
                                    font-family: LexendRegular;
                                    font-size: 15px;
                                    font-weight: 500;
                                  "
                                >
                                  Check-out :&nbsp;
                                  <span style="color: #f17343">
                                    {{ formatTimeNew(item.endTime) }}
                                  </span>
                                </span>
                              </v-flex>
                            </v-layout>
                          </v-flex>

                          <v-flex xs5 text-left align-self-end pb-0 pb-md-3>
                            <v-layout wrap fill-height>
                              <v-flex
                                xs12
                                v-if="item.customerDetails"
                                align-self-start
                              >
                                <span
                                  style="
                                    font-weight: 400;
                                    font-size: 14px;
                                    font-family: LexendRegular;
                                  "
                                >
                                  Booked for : &nbsp;
                                </span>
                                <span
                                  v-if="item.bookedbyid"
                                  style="
                                    font-family: LexendRegular;
                                    font-size: 14px;
                                    font-weight: 400;
                                  "
                                >
                                  {{ item.bookedbyid.name }}</span
                                >
                                <span
                                  v-if="item.bookedbyid.phoneNumber"
                                  style="
                                    font-family: LexendRegular;
                                    font-size: 14px;
                                    font-weight: 400;
                                  "
                                >
                                  ,{{ item.bookedbyid.phoneNumber }}
                                </span>
                              </v-flex>
                              <v-flex xs12 text-left pt-2 align-self-end>
                                <span
                                  style="
                                    font-family: LexendRegular;
                                    font-size: 14px;
                                    font-weight: 500;
                                  "
                                >
                                  Advance :&nbsp;
                                  <span
                                    style="color: #f17343"
                                    v-if="item.advance"
                                  >
                                    ₹ {{ item.advance }}
                                  </span>
                                </span>
                              </v-flex>

                              <v-flex
                                xs12
                                text-left
                                pt-2
                                align-self-end
                                v-if="item.balancepaymentStatus"
                              >
                                <span
                                  style="
                                    font-family: LexendRegular;
                                    font-size: 15px;
                                    font-weight: 500;
                                  "
                                >
                                  Balance :&nbsp;

                                  <span
                                    style="color: red"
                                    v-if="
                                      item.balancepaymentStatus == 'Pending' &&
                                      item.advancepaymentMode == 'Agent'
                                    "
                                  >
                                    ₹ {{ item.postBookingamount }} Not Paid
                                  </span>
                                  <span
                                    style="color: green"
                                    v-else-if="
                                      item.balancepaymentStatus == 'Success' &&
                                      item.advancepaymentMode == 'Agent'
                                    "
                                  >
                                    ₹ {{ item.postBookingamount }} Paid
                                  </span>
                                  <span style="color: green" v-else>
                                    ₹ {{ item.postBookingamount }}
                                  </span>
                                </span>
                              </v-flex>
                              <v-flex
                                xs12
                                text-left
                                pt-2
                                align-self-end
                                v-if="item.shikaraid"
                              >
                                <span
                                  style="
                                    font-family: LexendRegular;
                                    font-size: 14px;
                                    font-weight: 500;
                                  "
                                >
                                  Pickup/drop :&nbsp;
                                  <span
                                    style="color: #f17343"
                                    v-if="item.shikaraid.startingLocation"
                                  >
                                    {{ item.shikaraid.startingLocation.name }}
                                  </span>
                                </span>
                              </v-flex>
                            </v-layout>
                          </v-flex>

                          <v-flex xs3 align-self-center>
                            <v-layout wrap justify-end>
                              <v-flex
                                xs12
                                text-center
                                px-1
                                pb-2
                                v-if="item.bookingTotal"
                              >
                                <span
                                  style="
                                    font-family: LexendFont;
                                    color: black;
                                    font-size: 20px;
                                    font-weight: 600;
                                  "
                                >
                                  ₹ {{ item.bookingTotal }}
                                </span>
                              </v-flex>

                              <v-flex xs12 text-center px-3>
                                <v-btn
                                  @click="gotoView(item._id)"
                                  block
                                  color="#F17343"
                                >
                                  <span
                                    style="
                                      font-family: LexendFont;
                                      color: white;
                                      font-size: 14px;
                                      font-weight: 400;
                                      text-transform: none;
                                    "
                                  >
                                    View Details
                                  </span>
                                </v-btn>
                              </v-flex>
                              <!-- <v-flex xs12 text-center pl-3 pr-1>
                                                                <span
                                                                    style="font-family: RobotoRegular; color: black; font-size: 10px; font-weight: 600">
                                                                    ₹ {{ item.bookingTotal }}
                                                                </span>
                                                            </v-flex> -->
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-flex>
              </v-layout>

              <v-layout wrap justify-center class="hidden-md-and-up" pb-6>
                <v-flex xs11 v-for="(item, i) in list" :key="i" pt-5>
                  <v-card
                    elevation="0"
                    color="#EDEDED"
                    style="border-radius: 12px"
                  >
                    <v-layout wrap justify-center>
                      <v-flex xs12>
                        <v-layout wrap justify-start>
                          <v-flex xs12>
                            <v-img
                              style="border-radius: 12px 12px 0px 0px"
                              :src="mediaUURL + item.shikaraid.coverImage"
                              height="150px"
                              width="100%"
                              ><template v-slot:placeholder>
                                <ImageLoader /> </template
                            ></v-img>
                          </v-flex>
                        </v-layout>
                      </v-flex>

                      <v-flex xs12>
                        <v-layout wrap justify-center fill-height>
                          <v-flex xs12 text-left align-self-center>
                            <v-layout wrap justify-center>
                              <v-flex xs11 pt-2>
                                <span
                                  style="
                                    font-weight: 500;
                                    font-size: 20px;
                                    font-weight: bold;
                                    font-family: LexendRegular;
                                  "
                                >
                                  {{ item.shikaraid.shikaraName }}
                                </span>
                              </v-flex>
                              <v-flex xs11 pt-2>
                                <span
                                  style="
                                    font-family: LexendRegular;
                                    font-size: 14px;
                                    font-weight: 500;
                                  "
                                >
                                  Booking # :
                                </span>
                                <span style="color: #f17343; font-size: 15px">
                                  &nbsp; {{ item.bookingNo }}
                                </span>
                              </v-flex>

                              <v-flex xs11 pt-3>
                                <span
                                  style="
                                    font-family: LexendRegular;
                                    font-size: 15px;
                                    font-weight: 500;
                                  "
                                >
                                  Date :&nbsp;
                                  <span style="color: #f17343">
                                    {{ formatDate(item.selectedDate) }}
                                  </span>
                                </span>
                              </v-flex>
                              <v-flex xs11 pt-3>
                                <span
                                  style="
                                    font-family: LexendRegular;
                                    font-size: 15px;
                                    font-weight: 500;
                                  "
                                >
                                  Check-in :&nbsp;
                                  <span style="color: #f17343">
                                    {{ formatTimeNew(item.startTime) }}
                                  </span>
                                </span>
                              </v-flex>
                              <v-flex xs11 pt-3>
                                <span
                                  style="
                                    font-family: LexendRegular;
                                    font-size: 15px;
                                    font-weight: 500;
                                  "
                                >
                                  Check-out :&nbsp;
                                  <span style="color: #f17343">
                                    {{ formatTimeNew(item.endTime) }}
                                  </span>
                                </span>
                              </v-flex>
                            </v-layout>
                          </v-flex>

                          <v-flex xs11 pt-3 text-left align-self-center>
                            <v-layout wrap justify-center>
                              <v-flex xs12 text-left>
                                <span
                                  style="
                                    font-weight: 400;
                                    font-size: 14px;
                                    font-family: LexendRegular;
                                  "
                                >
                                  Booked for : &nbsp;
                                </span>
                                <span
                                  v-if="item.bookedbyid"
                                  style="
                                    font-family: LexendRegular;
                                    font-size: 14px;
                                    font-weight: 400;
                                  "
                                >
                                  {{ item.bookedbyid.name }}</span
                                >
                                <span
                                  v-if="item.bookedbyid.phoneNumber"
                                  style="
                                    font-family: LexendRegular;
                                    font-size: 14px;
                                    font-weight: 400;
                                  "
                                >
                                  ,{{ item.bookedbyid.phoneNumber }}
                                </span>
                              </v-flex>
                              <v-flex xs12 text-left pt-4>
                                <span
                                  style="
                                    font-family: LexendRegular;
                                    font-size: 14px;
                                    font-weight: 500;
                                  "
                                >
                                  Advance :&nbsp;
                                  <span style="color: #f17343">
                                    ₹ {{ item.advance }}
                                  </span>
                                </span>
                              </v-flex>

                              <v-flex xs12 text-left pt-3>
                                <span
                                  style="
                                    font-family: LexendRegular;
                                    font-size: 15px;
                                    font-weight: 500;
                                  "
                                >
                                  Balance :&nbsp;

                                  <span
                                    style="color: red"
                                    v-if="
                                      item.balancepaymentStatus == 'Pending' &&
                                      item.advancepaymentMode == 'Agent'
                                    "
                                  >
                                    ₹ {{ item.postBookingamount }} Not Paid
                                  </span>
                                  <span
                                    style="color: green"
                                    v-else-if="
                                      item.balancepaymentStatus == 'Success' &&
                                      item.advancepaymentMode == 'Agent'
                                    "
                                  >
                                    ₹ {{ item.postBookingamount }} Paid
                                  </span>
                                  <span style="color: green" v-else>
                                    ₹ {{ item.postBookingamount }}
                                  </span>
                                </span>
                              </v-flex>
                              <v-flex xs12 text-left pt-3 v-if="item.shikaraid">
                                <span
                                  style="
                                    font-family: LexendRegular;
                                    font-size: 14px;
                                    font-weight: 500;
                                  "
                                >
                                  Pickup/drop :&nbsp;
                                  <span
                                    style="color: #f17343"
                                    v-if="item.shikaraid.startingLocation"
                                  >
                                    {{ item.shikaraid.startingLocation.name }}
                                  </span>
                                </span>
                              </v-flex>
                            </v-layout>
                          </v-flex>

                          <v-flex pt-3 xs11 align-self-center>
                            <v-layout wrap justify-center>
                              <v-flex xs12 text-center pb-2>
                                <span
                                  style="
                                    font-family: LexendFont;
                                    color: black;
                                    font-size: 20px;
                                    font-weight: 600;
                                  "
                                >
                                  ₹ {{ item.bookingTotal }}
                                </span>
                              </v-flex>

                              <v-flex pb-3 xs12 text-center>
                                <v-btn
                                  @click="gotoView(item._id)"
                                  block
                                  color="#F17343"
                                >
                                  <span
                                    style="
                                      font-family: LexendFont;
                                      color: white;
                                      font-size: 14px;
                                      font-weight: 400;
                                      text-transform: none;
                                    "
                                  >
                                    View Details
                                  </span>
                                </v-btn>
                              </v-flex>
                              <!-- <v-flex xs12 text-center pl-3 pr-1>
                                                                <span
                                                                    style="font-family: RobotoRegular; color: black; font-size: 10px; font-weight: 600">
                                                                    ₹ {{ item.bookingTotal }}
                                                                </span>
                                                            </v-flex> -->
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex xs12 pa-4 v-else>
            <span
              style="
                font-weight: 400;
                font-size: 20px;
                font-family: LexendRegular;
                text-align: center;
              "
            >
              No bookings found
            </span>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-layout v-if="list.length > 0" wrap justify-center>
      <v-flex xs11 pt-4 pb-3>
        <v-layout wrap>
          <v-flex xs12 id="specific-section">
            <v-pagination
              rounded="circle"
              prev-icon="mdi-menu-left"
              next-icon="mdi-menu-right"
              :length="pages"
              :total-visible="7"
              v-model="currentPage"
              color="#F17343"
            ></v-pagination>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      appLoading: false,
      ServerError: false,
      snackbar: false,
      list: [],
      timeout: 5000,
      msg: null,
      pages: 0,
      carouselSpeed: 1000,

      value: "",
      phone: "",
      currentPage: 1,

      // filter
      keyword1: "",
      menu: false,
      menu1: false,
      toDate: "",
      fromDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
    };
  },
  watch: {
    currentPage() {
      this.getList();
    },

    keyword1() {
      this.getList();
    },
    toDate() {
      this.getList();
    },
    fromDate() {
      this.getList();
    },
  },
  mounted() {
    this.getList();
  },

  methods: {
    formattedDate(date) {
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      return new Date(date).toLocaleDateString("en-GB", options);
    },
    gotoView(id) {
      this.$router.push({
        name: "shikaradetailedview",
        query: {
          id: id,
        },
      });
    },
    formatTime(time) {
      if (!time) return "";
      const formattedTime = new Date(time).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      return formattedTime;
    },
    getList() {
      this.appLoading = true;

      axios({
        method: "POST",
        url: "/vendor/shikara/bookings",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          page: this.currentPage,
          limit: 10,
          keyword: this.keyword1,
          toDate: this.toDate,
          fromDate: this.fromDate,
        },
      }).then((response) => {
        if (response.data.status == true) {
          this.list = response.data.data;
          this.totalData = response.data.totalLength;
          this.pages = Math.ceil(this.totalData / response.data.limit);
          this.appLoading = false;
        } else {
          this.appLoading = false;

          this.msg = response.data.msg;
          this.snackbar = true;
        }
      });
      // }
    },
    detailedView() {
      this.$router.push("/shikaradetailedview");
    },
    formatDate(item) {
      var dt = new Date(item);
      var day = dt.getDate();
      var year = dt.getFullYear();
      // var hours = dt.getHours();
      // var minutes = dt.getMinutes();
      dt = dt.toString();
      // var ampm = hours >= 12 ? "pm" : "am";
      // hours = hours % 12;
      // hours = hours ? hours : 12;
      // minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = day + " " + dt.slice(4, 7) + " " + year;
      // +
      // " , " +
      // hours +
      // ":" +
      // minutes +
      // " " +
      // ampm;

      return strTime;
    },
    formatTimeNew(item) {
      var dt = new Date(item);
      // var day = dt.getDate();
      // var year = dt.getFullYear();
      var hours = dt.getHours();
      var minutes = dt.getMinutes();
      dt = dt.toString();
      var ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime =
        // day + " " + dt.slice(4, 7) + " " + year;
        // +
        // " , " +
        hours + ":" + minutes + " " + ampm;

      return strTime;
    },
  },
};
</script>