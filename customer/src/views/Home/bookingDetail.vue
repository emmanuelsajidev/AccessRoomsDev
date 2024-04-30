<template>
  <div>
    <vue-element-loading
      :active="appLoading"
      :is-full-screen="true"
      background-color="#FFFFFF"
      color="rgba(0, 38, 53, 1)"
      spinner="bar-fade-scale"
    />
    <ServerError v-if="ServerError" />
    <v-snackbar
      v-model="showSnackbar"
      color="rgba(0, 38, 53, 1)"
      right
      :timeout="timeout"
    >
      <v-layout wrap justify-center>
        <v-flex text-left class="align-self-center">
          <span style="color: white">
            {{ msg }}
          </span>
        </v-flex>

        <v-flex text-right>
          <v-btn small :ripple="false" text @click="showSnackbar = false">
            <v-icon style="color: #000">mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-snackbar>

    <v-layout wrap justify-center style="background-color: #f9f9f9">
      <v-flex xs12 md9 text-left pt-8 pb-4 pl-4 pl-md-0>
        <span
          style="
            font-size: 20px;
            font-weight: 400;
            font-family: LexendFont;
            color: rgba(241, 115, 67, 1);
          "
          >BOOKING DETAILS</span
        >
      </v-flex>
      <v-flex xs12 md9 pb-4>
        <v-card class="px-6 py-8">
          <v-layout wrap justify-start>
            <!-- <v-flex xs12 pl-1 pl-md-0><span
                        style="
                          font-size: 20px;
                          font-weight: 400;
                          font-family: LexendFont;color: rgba(241, 115, 67, 1);
                        "
                        >BOOKING DETAILS</span></v-flex> -->
          </v-layout>
          <v-layout wrap style="background-color: rgba(237, 237, 237, 1)">
            <v-flex xs12>
              <v-layout wrap>
                <v-flex xs12 sm12 md2>
                  <v-card
                    elevation="0"
                    width="330px"
                    class="hidden-sm-and-down"
                  >
                    <v-img
                      v-if="currentBookings.houseBoatId"
                      height="150px"
                      :src="mediaUURL + currentBookings.houseBoatId.coverImage"
                    >
                      <template v-slot:placeholder> <ImageLoader /> </template
                    ></v-img>
                    <v-img
                      v-else
                      height="150px"
                      src="./../../assets/images/nophoto.jpg"
                    ></v-img>
                  </v-card>
                  <v-card elevation="0" width="100%" class="hidden-md-and-up">
                    <v-img
                      v-if="currentBookings.houseBoatId"
                      height="150px"
                      :src="mediaUURL + currentBookings.houseBoatId.coverImage"
                    >
                      <template v-slot:placeholder> <ImageLoader /> </template
                    ></v-img>
                    <v-img
                      v-else
                      height="150px"
                      src="./../../assets/images/nophoto.jpg"
                    ></v-img>
                  </v-card>
                </v-flex>
                <v-flex xs12 sm5 md3 py-1 py-sm-4 pl-4>
                  <v-layout wrap fill-height>
                    <v-flex xs12 text-left align-self-start>
                      <span
                        style="
                          font-family: LexendFont;
                          font-size: 20px;
                          font-weight: 500;
                        "
                        >{{ currentBookings.houseBoatId.houseBoatName }}</span
                      >
                      <!-- <span  style="
                                    font-family: LexendFont;
                                    font-size: 20px;
                                    font-weight: 500;
                                  " v-for="(item1, j) in currentBookings.houseBoatId" :key="j">
            {{ item1.houseBoatName }}
            <span v-if="j < Object.keys(currentBookings.houseBoatId).length - 1">, </span>
          </span> -->
                      <!-- </v-flex>
                                  <v-flex xs12 text-left> --><br />
                      <span
                        style="
                          font-family: LexendFont;
                          font-size: 14px;
                          font-weight: 400;
                        "
                        >Houseboat</span
                      >
                    </v-flex>
                    <v-flex xs12 text-left align-self-end>
                      <span
                        style="
                          font-family: LexendFont;
                          font-size: 14px;
                          font-weight: 400;
                        "
                        >Booking No: {{ currentBookings.bookingNo }}</span
                      >
                      <!-- </v-flex>
                                <v-flex xs12 text-left> --><br />
                      <span
                        style="
                          font-family: LexendFont;
                          font-size: 14px;
                          font-weight: 400;
                        "
                        >Booked On:
                        {{ formatDate(currentBookings.bookingDate) }}</span
                      >
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 sm3 md2 py-1 py-sm-4 pl-sm-1 pl-4 pr-4 pr-sm-0>
                  <v-layout wrap fill-height>
                    <v-flex xs12 text-left align-self-start>
                      <span
                        style="
                          font-family: LexendFont;
                          font-size: 12px;
                          font-weight: 400;
                          text-transform: uppercase;
                          color: rgba(117, 117, 117, 1);
                        "
                      >
                        Rooms</span
                      ><br />
                      <span
                        v-if="currentBookings.totalRooms"
                        style="
                          font-family: LexendFont;
                          font-size: 14px;
                          font-weight: 500;
                          text-transform: uppercase;
                        "
                      >
                        {{ currentBookings.totalRooms }}
                      </span>
                      <span v-else>-</span></v-flex
                    >
                    <v-flex xs12 text-left align-self-end>
                      <span
                        style="
                          font-family: LexendFont;
                          font-size: 12px;
                          font-weight: 400;
                          text-transform: uppercase;
                          color: rgba(117, 117, 117, 1);
                        "
                      >
                        Category</span
                      ><br />
                      <span
                        v-if="currentBookings.category"
                        style="
                          font-family: LexendFont;
                          font-size: 14px;
                          font-weight: 500;
                          text-transform: uppercase;
                        "
                      >
                        {{ currentBookings.category }}
                      </span>
                      <span v-else>-</span></v-flex
                    >
                  </v-layout>
                </v-flex>
                <v-flex xs12 sm2 md2 py-1 py-sm-4 pl-sm-1 pl-4 pr-4 pr-sm-0>
                  <v-layout wrap fill-height>
                    <v-flex xs12 text-left align-self-start>
                      <span
                        style="
                          font-family: LexendFont;
                          font-size: 12px;
                          font-weight: 400;
                          text-transform: uppercase;
                          color: rgba(117, 117, 117, 1);
                        "
                      >
                        No.of Guests</span
                      ><br />
                      <span
                        v-if="currentBookings.noOfAdults"
                        style="
                          font-family: LexendFont;
                          font-size: 14px;
                          font-weight: 500;
                          text-transform: uppercase;
                        "
                      >
                        {{ currentBookings.noOfAdults }}
                        <v-icon>mdi-human-male</v-icon></span
                      ><span v-else>0</span>
                      <span
                        v-if="currentBookings.noOfChildren"
                        style="
                          font-family: LexendFont;
                          font-size: 14px;
                          font-weight: 500;
                          text-transform: uppercase;
                        "
                      >
                        {{ currentBookings.noOfChildren }}
                        <v-icon>mdi-car-child-seat</v-icon></span
                      >
                    </v-flex>
                    <v-flex xs12 text-left align-self-end>
                      <span
                        style="
                          font-family: LexendFont;
                          font-size: 12px;
                          font-weight: 400;
                          text-transform: uppercase;
                          color: rgba(117, 117, 117, 1);
                        "
                      >
                        Houseboat type</span
                      ><br />
                      <span
                        v-if="currentBookings.houseBoatType"
                        style="
                          font-family: LexendFont;
                          font-size: 14px;
                          font-weight: 500;
                          text-transform: uppercase;
                        "
                      >
                        {{ currentBookings.houseBoatType }}
                      </span>
                      <span v-else>-</span></v-flex
                    >
                  </v-layout>
                </v-flex>
                <v-flex xs12 sm2 md2 py-1 py-sm-4 pl-sm-1 pl-4 pr-4 pr-sm-0>
                  <v-layout wrap fill-height>
                    <v-flex xs12 text-left align-self-start>
                      <span
                        style="
                          font-family: LexendFont;
                          font-size: 12px;
                          font-weight: 400;
                          text-transform: uppercase;
                          color: rgba(117, 117, 117, 1);
                        "
                      >
                        Check In</span
                      ><br />
                      <span
                        v-if="currentBookings.startDate"
                        style="
                          font-family: LexendFont;
                          font-size: 14px;
                          font-weight: 500;
                          text-transform: uppercase;
                        "
                      >
                        {{ formatDate(currentBookings.startDate) }}</span
                      >
                      <span v-else>-</span></v-flex
                    >
                    <v-flex xs12 text-left align-self-end>
                      <span
                        style="
                          font-family: LexendFont;
                          font-size: 12px;
                          font-weight: 400;
                          text-transform: uppercase;
                          color: rgba(117, 117, 117, 1);
                        "
                      >
                        Check Out</span
                      ><br />
                      <span
                        v-if="currentBookings.endDate"
                        style="
                          font-family: LexendFont;
                          font-size: 14px;
                          font-weight: 500;
                          text-transform: uppercase;
                        "
                      >
                        {{ formatDate(currentBookings.endDate) }}
                      </span>
                      <span v-else>-</span></v-flex
                    >
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout wrap pt-2>
            <v-flex
              xs12
              sm3
              px-0
              px-md-2
              py-1
              py-sm-0
              v-if="isCancelButtonVisible(currentBookings.bookingDate)"
            >
              <v-btn
                block
                @click="
                  $router.push(
                    'resheduleHouseboat?id=' +
                      $route.query.id +
                      '&&name=' +
                      currentBookings.houseBoatId.houseBoatName
                  )
                "
                dark
                class="px-0"
                color="#ff6200"
              >
                <span
                  style="
                    font-family: LexendFont;
                    font-size: 14px;
                    font-weight: 500;
                  "
                >
                  Reschedule
                </span>
              </v-btn>
            </v-flex>
            <v-flex
              xs12
              sm4
              md3
              px-0
              px-sm-2
              py-1
              py-sm-0
              v-if="isCancelButtonVisible(currentBookings.bookingDate)"
            >
              <v-btn
                block
                @click="cancelDialog = true"
                dark
                class="px-0"
                color="#ff6200"
              >
                <span
                  style="
                    font-family: LexendFont;
                    font-size: 14px;
                    font-weight: 500;
                  "
                >
                  Cancel Booking
                </span>
              </v-btn>
            </v-flex>
            <v-flex xs12 sm2 px-0 px-sm-2 px-md-0 py-1 py-sm-0>
              <v-btn
                block
                @click="showReview()"
                dark
                class="px-0"
                color="#ff6200"
              >
                <span
                  style="
                    font-family: LexendFont;
                    font-size: 14px;
                    font-weight: 500;
                  "
                >
                  Review
                </span>
              </v-btn>
            </v-flex>
          </v-layout>
          <v-layout wrap pt-1>
            <v-flex xs12
              ><span
                style="
                  font-size: 20px;
                  font-weight: 400;
                  font-family: LexendFont;
                  color: rgba(241, 115, 67, 1);
                "
                >PAYMENT DETAILS</span
              ></v-flex
            >
            <v-flex xs12>
              <v-layout wrap>
                <v-flex xs12 sm6 md2>
                  <v-layout wrap fill-height>
                    <v-flex xs12 text-left align-self-start>
                      <span
                        style="
                          font-family: LexendFont;
                          font-size: 14px;
                          font-weight: 300;
                          text-transform: uppercase;
                        "
                      >
                        Booking No</span
                      ><br />
                      <span
                        v-if="currentBookings.bookingNo"
                        style="
                          font-family: LexendFont;
                          font-size: 16px;
                          font-weight: 500;
                          text-transform: uppercase;
                        "
                      >
                        {{ currentBookings.bookingNo }}
                      </span>
                      <span v-else>-</span></v-flex
                    >
                  </v-layout>
                </v-flex>
                <!-- <v-spacer></v-spacer> -->
                <!-- <v-flex xs12 sm6 md2  pl-1>
                            <v-layout wrap fill-height>
                              <v-flex xs12 text-left align-self-start>
                                <span
                                  style="
                                    font-family: LexendFont;
                                    font-size: 14px;
                                    font-weight: 300;
                                    text-transform: uppercase;
                                  "
                                >
                                GST</span
                                ><br />
                                <span
                                  v-if="currentBookings.gstAmount"
                                  style="
                                    font-family: LexendFont;
                                    font-size: 16px;
                                    font-weight: 500;
                                    text-transform: uppercase;
                                  "
                                >
                                  {{ currentBookings.gstAmount }}
                                </span>
                                <span v-else>0</span></v-flex
                              >
                            </v-layout>
                          </v-flex> -->

                <v-flex xs12 sm6 md3 pl-1>
                  <v-layout wrap fill-height>
                    <v-flex xs12 text-left align-self-start>
                      <span
                        style="
                          font-family: LexendFont;
                          font-size: 14px;
                          font-weight: 300;
                          text-transform: uppercase;
                        "
                      >
                        Advance Payment (₹)</span
                      ><br />
                      <span
                        v-if="currentBookings.advanceAmountPaid"
                        style="
                          font-family: LexendFont;
                          font-size: 16px;
                          font-weight: 500;
                          text-transform: uppercase;
                        "
                      >
                        {{ currentBookings.advanceAmountPaid }}
                      </span>
                      <span v-else>-</span></v-flex
                    >
                  </v-layout>
                </v-flex>
                <v-flex xs12 sm6 md3 pl-2>
                  <v-layout wrap fill-height>
                    <v-flex xs12 text-left align-self-start>
                      <span
                        style="
                          font-family: LexendFont;
                          font-size: 14px;
                          font-weight: 300;
                          text-transform: uppercase;
                        "
                      >
                        Balance Amount(₹)</span
                      ><br />
                      <span
                        v-if="currentBookings.balancePayAmount"
                        style="
                          font-family: LexendFont;
                          font-size: 16px;
                          font-weight: 500;
                          text-transform: uppercase;
                        "
                      >
                        {{ currentBookings.balancePayAmount }}
                      </span>
                      <span v-else>0</span></v-flex
                    >
                  </v-layout>
                </v-flex>
                <v-flex xs12 sm6 md3 pl-2>
                  <v-layout wrap fill-height>
                    <v-flex xs12 text-left align-self-start>
                      <span
                        style="
                          font-family: LexendFont;
                          font-size: 14px;
                          font-weight: 300;
                          text-transform: uppercase;
                        "
                      >
                        Total Amount(₹)</span
                      ><br />
                      <span
                        v-if="currentBookings.totalAmount"
                        style="
                          font-family: LexendFont;
                          font-size: 16px;
                          font-weight: 500;
                          text-transform: uppercase;
                        "
                      >
                        {{ currentBookings.totalAmount }}
                      </span>
                      <span v-else>0</span></v-flex
                    >
                  </v-layout>
                </v-flex>
                <!-- <v-flex xs2  pl-1>
                            <v-layout wrap fill-height>
                              <v-flex xs12 text-left align-self-start>
                                <span
                                  style="
                                    font-family: LexendFont;
                                    font-size: 14px;
                                    font-weight: 300;
                                    text-transform: uppercase;
                                  "
                                >
                                Post Booking Amt.</span
                                ><br />
                                <span
                                  v-if="currentBookings.bookingNo"
                                  style="
                                    font-family: LexendFont;
                                    font-size: 16px;
                                    font-weight: 500;
                                    text-transform: uppercase;
                                  "
                                >
                                  {{ currentBookings.bookingNo }}
                                </span>
                                <span v-else>-</span></v-flex
                              >
                            </v-layout>
                          </v-flex> -->
              </v-layout>
            </v-flex>
          </v-layout>
          <!-- <v-layout wrap>
                    <v-flex xs12><span
                        style="
                          font-size: 20px;
                          font-weight: 400;
                          font-family: LexendFont;color: rgba(241, 115, 67, 1);
                        "
                        >POST BOOKING</span></v-flex>
                        
                </v-layout> -->
        </v-card>
        <v-dialog width="400px" v-model="cancelDialog">
          <v-card width="400px" class="pa-2">
            <v-layout wrap justify-center>
              <v-flex xs11 text-center
                ><span
                  style="
                    color: #ff6200;
                    font-size: 23px;
                    font-weight: 400;
                    font-family: LexendFont;
                  "
                  >Cancel Booking</span
                ></v-flex
              >
              <v-flex xs1 text-right>
                <v-icon @click="cancelDialog = false" color="#ff6200"
                  >mdi-close-box</v-icon
                ></v-flex
              >
              <v-flex xs8 text-center py-4>
                <v-divider></v-divider>
              </v-flex>
            </v-layout>
            <v-layout wrap justify-center>
              <v-flex xs12 text-center align-self-center>
                <span
                  class="pa-4"
                  style="
                    font-size: 20px;
                    font-weight: 300;
                    font-family: LexendFont;
                  "
                  >Are you sure you want to <br />cancel this booking?
                </span>
              </v-flex>
            </v-layout>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="#ff6200"
                class="buttons1"
                dark
                @click="cancelBooking()"
                >Cancel</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog width="400px" v-model="reviewDialog">
          <v-card width="400px" class="pa-2">
            <v-layout wrap justify-center>
              <v-flex xs11 text-center
                ><span
                  style="
                    color: #ff6200;
                    font-size: 23px;
                    font-weight: 400;
                    font-family: LexendFont;
                  "
                  >Review</span
                ></v-flex
              >
              <v-flex xs1 text-right>
                <v-icon @click="reviewDialog = false" color="#ff6200"
                  >mdi-close-box</v-icon
                ></v-flex
              >
              <v-flex xs8 text-center py-4>
                <v-divider></v-divider>
              </v-flex>
            </v-layout>
            <v-layout wrap px-4>
              <v-flex xs12 py-1 pr-2>
                <v-layout wrap>
                  <v-flex xs12 pr-2>
                    <v-rating
                      :length="5"
                      :size="42"
                      v-model="currentReview.rating"
                      active-color="#ff6200"
                      color="#ff6200"
                      background-color="#ff6200"
                  /></v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 py-1 pr-2>
                <v-layout wrap>
                  <v-flex
                    xs12
                    style="
                      font-weight: 300;
                      font-size: 16px;
                      font-family: LexendFont;
                    "
                    text-left
                    pr-2
                  >
                    <span>Comments</span></v-flex
                  >
                  <v-flex xs12 pr-2>
                    <v-textarea
                      v-model="currentReview.comment"
                      outlined
                      :rules="rules"
                      type="text"
                      dense
                      hide-details="auto"
                    ></v-textarea
                  ></v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
            <v-card-actions class="pt-3">
              <v-layout wrap>
                <v-spacer></v-spacer>
                <v-flex xs2 mx-4>
                  <v-btn
                    color="#ff6200"
                    class="buttons1"
                    dark
                    block
                    @click="addReview()"
                    >Save</v-btn
                  >
                </v-flex>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </div>
</template>
  <script>
import axios from "axios";
// import store from "./../store";
export default {
  data() {
    return {
      showSnackbar: false,
      timeout: 2000,
      ServerError: false,
      appLoading: false,
      msg: "",
      currentBookings: {},
      myTab: "",
      cancelDialog: false,
      reviewDialog: false,
      todaysDate: new Date(),
      currentReview: {
        comment: "",
        rating: 0,
      },
      rules: [(v) => v.length <= 200 || "Max 200 characters"],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    isCancelButtonVisible(startDate) {
      console.log("todaysDate==", this.todaysDate);

      const backDate = this.calculateBackDate(startDate);
      return backDate <= this.todaysDate;
    },
    calculateBackDate(startDate) {
      const startDateObject = new Date(startDate);

      const backDate = new Date(startDateObject);
      backDate.setDate(startDateObject.getDate() - 8);
      return backDate;
    },
    getData() {
      this.appLoading = true;
      var headers1 = {};
      if (this.appLogin) {
        headers1 = {
          token: localStorage.getItem("token"),
        };
      }
      //  else
      //   headers1 = {
      //     guestid: localStorage.getItem("guestId"),
      //   };
      axios({
        headers: headers1,
        method: "post",
        url: "/customer/houseboatbooked/data",
        data: {
          id: this.$route.query.id,
        },
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status) {
            this.currentBookings = response.data.data;
          } else {
            this.msg = response.data.msg;
            this.showsnackbar = true;
          }
        })
        .catch((err) => {
          this.appLoading = false;
          console.log(err);
          this.ServerError = true;
        });
    },
    getReview() {
      this.appLoading = true;
      axios({
        headers: {
          token: localStorage.getItem("token"),
        },
        method: "get",
        url: "/review/myreviews",
        params: {
          houseBoatId: this.currentBookings.houseBoatId._id,
        },
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status) {
            this.currentReview = response.data.data;
          } else {
            this.msg = response.data.msg;
            this.showsnackbar = true;
          }
        })
        .catch((err) => {
          this.appLoading = false;
          console.log(err);
          this.ServerError = true;
        });
    },
    showReview() {
      this.getReview();
      this.reviewDialog = true;
    },

    cancelBooking() {
      this.appLoading = true;
      var headers1 = {};
      if (this.appLogin) {
        headers1 = {
          token: localStorage.getItem("token"),
        };
      }
      axios({
        headers: headers1,
        method: "get",
        url: "/customer/houseboat/booking/cancel",
        params: {
          id: this.$route.query.id,
        },
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status) {
            this.cancelDialog = false;
            this.msg = response.data.msg;
            this.showsnackbar = true;
            setTimeout(() => {
              this.$router.push("/myBookings");
            }, 3000);
          } else {
            this.msg = response.data.msg;
            this.showsnackbar = true;
          }
        })
        .catch((err) => {
          this.appLoading = false;
          console.log(err);
          this.ServerError = true;
        });
    },
    addReview() {
      this.appLoading = true;
      axios({
        headers: {
          token: localStorage.getItem("token"),
        },
        method: "post",
        url: "/review/add/houseboat",
        data: {
          houseBoatId: this.currentBookings.houseBoatId._id,
          comment: this.currentReview.comment,
          rating: this.currentReview.rating,
        },
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status) {
            this.reviewDialog = false;
            this.msg = response.data.msg;
            this.showsnackbar = true;
            //       setTimeout(() => {
            //  location.reload();
            //   }, 2000);
            location.reload();
          } else {
            this.msg = response.data.msg;
            this.showsnackbar = true;
          }
        })
        .catch((err) => {
          this.appLoading = false;
          console.log(err);
          this.ServerError = true;
        });
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
  },
};
</script>
  <style scoped>
.vertical-divider {
  display: flex;
  align-items: center;
}

.divider {
  width: 1px;
  height: 100%;
  background-color: #ccc; /* Adjust the color as needed */
  margin: 0 auto; /* Center the divider */
}
.dottedline {
  border: none;
  border-top: 1px dashed rgb(82, 79, 79);
  color: #fff;
  background-color: #fff;
  height: 1px;
  width: 100%;
}
</style>