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
    <v-layout wrap justify-center>
      <v-flex xs12>
        <v-layout wrap justify-center>
          <v-flex xs12 pt-3 pb-3>
            <span
              style="
                font-size: 30px;
                font-weight: 400;
                font-family: LexendRegular;
              "
              >My Bookings</span
            >
          </v-flex>

          <v-flex xs12 pt-8>
            <v-card elevation="0">
              <v-layout wrap>
                <v-flex pt-6>
                  <v-layout wrap justify-center>
                    <v-flex
                      xs8
                      text-left
                      style="
                        font-weight: 400;
                        font-size: 20px;
                        font-family: LexendRegular;
                      "
                      >Recent Bookings</v-flex
                    >
                    <v-flex
                      xs3
                      text-right
                      style="
                        font-weight: 500;
                        font-size: 18px;
                        font-family: LexendRegular;
                        color: #806aad;
                      "
                      >See all</v-flex
                    >
                  </v-layout>
                </v-flex>
              </v-layout>
              <v-layout wrap justify-center class="hidden-md-and-up" pb-5>
              </v-layout>
              <v-layout wrap justify-center class="hidden-sm-and-down" pb-6>
                <v-flex xs11 v-for="(item, i) in list" :key="i" pt-5>
                  <v-card
                    elevation="0"
                    color="#EDEDED"
                    style="border-radius: 12px"
                  >
                    <v-layout wrap justify-center>
                      <v-flex xs3>
                        <v-layout wrap justify-start v-if="item">
                          <v-flex xs12 v-if="item.shikaraid">
                            <v-flex v-if="item.shikaraid.coverImage">
                              <v-img
                                height="150px"
                                width="250px"
                                style="border-radius: 12px 0px 0px 12px"
                                :src="mediaUURL + item.shikaraid.coverImage"
                              ></v-img>
                            </v-flex>
                          </v-flex>
                        </v-layout>
                      </v-flex>

                      <v-flex xs9 pl-6>
                        <v-layout wrap justify-start fill-height>
                          <v-flex xs4 text-left align-self-center>
                            <v-layout wrap>
                              <v-flex xs12>
                                <span
                                  style="
                                    font-weight: 500;
                                    font-size: 20px;
                                    font-weight: bold;
                                    font-family: LexendRegular;
                                  "
                                >
                                  {{ item.shikaraid.shikaraName }}
                                  <!-- <span
                                                                        style="font-weight: 300; font-size: 14px; font-family: LexendRegular;">
                                                                        {{ item.bookingType }}
                                                                    </span> -->
                                </span>
                              </v-flex>
                              <v-flex xs12 pt-3>
                                <span
                                  style="
                                    font-family: LexendRegular;
                                    font-size: 16px;
                                    font-weight: 500;
                                  "
                                >
                                  Booking Id
                                </span>
                                <span style="color: #f17343; font-size: 16px">
                                  &nbsp; {{ item.bookingNo }}
                                </span>
                              </v-flex>

                              <v-flex pt-3>
                                <span
                                  style="
                                    font-family: LexendRegular;
                                    font-size: 16px;
                                    font-weight: 500;
                                  "
                                >
                                  Booking date&nbsp;
                                  <span style="color: #f17343">
                                    {{ item.created_at.slice(0, 10) }}
                                  </span>
                                </span>
                              </v-flex>
                            </v-layout>
                          </v-flex>

                          <v-flex xs4 text-left align-self-center>
                            <v-layout wrap>
                              <v-flex xs12>
                                <span
                                  style="
                                    font-weight: 400;
                                    font-size: 14px;
                                    font-weight: bold;
                                    font-family: LexendRegular;
                                  "
                                >
                                  Customer Name &nbsp;
                                </span>
                                <span
                                  style="
                                    color: #f17343;
                                    font-family: LexendRegular;
                                    font-size: 19px;
                                    font-weight: 400;
                                  "
                                >
                                  {{ item.agentDetails.name }}
                                </span>
                              </v-flex>
                              <v-flex xs12 text-left pt-4>
                                <span
                                  style="
                                    font-family: LexendRegular;
                                    font-size: 16px;
                                    font-weight: 500;
                                  "
                                >
                                  Check-in time&nbsp;
                                  <span style="color: #f17343">
                                    {{ formatTime(item.startTime) }}
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
                                  Check-out time&nbsp;

                                  <span style="color: #f17343">
                                    {{ formatTime(item.endTime) }}
                                  </span>
                                </span>
                              </v-flex>
                            </v-layout>
                          </v-flex>

                          <v-flex xs3 align-self-center>
                            <v-layout wrap justify-end>
                              <v-flex xs12 text-right pl-3 pr-1>
                                <span
                                  style="
                                    font-family: LexendRegular;
                                    color: black;
                                    font-size: 18px;
                                    font-weight: 600;
                                  "
                                >
                                  ₹ {{ item.amount }}
                                </span>
                              </v-flex>
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
      value: "",
      phone: "",
      cards: [
        {
          title: "bookingCount",
          name: "Total Bookings",
          src: require("../../assets/icons/homeIcon1.png"),
          count: "12",
        },
        {
          title: "reserveCount",
          name: "Reservations",
          src: require("../../assets/icons/homeIcon2.png"),
          count: "40",
        },
        {
          title: "houseBoatCount",
          name: "Houseboats",
          src: require("../../assets/icons/homeIcon3.png"),
          count: "30",
        },
        {
          title: "shikaraCount",
          name: "Shikaras",
          src: require("../../assets/icons/homeIcon4.png"),
          count: "30",
        },
      ],
    };
  },
  mounted() {
    this.getList();
  },

  methods: {
    formatTime(time) {
      if (!time) return ""; // handle the case when time is not defined

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
        url: "/my/allBookings",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          page: this.currentPage,
          limit: 10,
          location: this.location,
          memberCount: this.memberCount,
          childrenCount: this.childrenCount,
        },
      }).then((response) => {
        if (response.data.status) {
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
      this.$router.push("/bookingsdetailed");
    },
  },
};
</script>