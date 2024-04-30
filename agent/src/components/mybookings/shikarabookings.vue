<template>
  <div>
    <v-layout wrap fill-height>
      <v-flex xs12>
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
          <v-flex xs12 pb-1 pt-3 pt-md-lg-xl-0>
            <span
              class="LexendRegular"
              style="font-weight: bold; text-transform: none"
            >
              Shikara Booking List
            </span>
          </v-flex>
          <v-flex xs12>
            <v-layout wrap justify-start pt-2>
              <v-flex pt-2 pl-lg-0 pl-2 xs12 sm4 lg2>
                <v-menu
                  ref="HmenuCheckInVisible"
                  v-model="HmenuCheckInVisible"
                  :close-on-content-click="false"
                  :return-value.sync="fromdate"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="fromdate"
                      outlined
                      readonly
                      label=" From Date"
                      color="orange"
                      style="text-transform: none"
                      dense
                      hide-details="auto"
                      clearable
                      class="LexendRegular rounded-0"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="fromdate"
                    no-title
                    color="orange"
                    scrollable
                    @change="$refs.HmenuCheckInVisible.save(fromdate)"
                  >
                    <v-spacer></v-spacer>
                  </v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex pl-2 pt-2 xs12 sm4 lg2>
                <v-menu
                  ref="HmenuCheckOutVisible"
                  v-model="HmenuCheckOutVisible"
                  :close-on-content-click="false"
                  :return-value.sync="todate"
                  transition="scale-transition"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="todate"
                      outlined
                      readonly
                      label=" To Date"
                      color="orange"
                      dense
                      style="text-transform: none"
                      hide-details="auto"
                      clearable
                      class="rounded-0 LexendRegular"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="todate"
                    no-title
                    color="orange"
                    :min="fromdate"
                    @change="$refs.HmenuCheckOutVisible.save(todate)"
                  >
                    <v-spacer></v-spacer>
                  </v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex pl-2 pt-2 xs12 sm4 lg2>
                <v-autocomplete
                  outlined
                  class="LexendRegular"
                  dense
                  color="orange"
                  :items="statuslist"
                  v-model="status"
                  label="Status"
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
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-layout v-if="list.length > 0" wrap justify-center>
          <v-flex xs12>
            <v-layout wrap justify-center>
              <v-flex xs12 pt-8>
                <v-card elevation="0">
                  <v-layout wrap justify-center pb-6>
                    <v-flex xs11 v-for="(item, i) in list" :key="i" pt-5>
                      <v-card
                        elevation="0"
                        color="#EDEDED"
                        style="border-radius: 12px"
                      >
                        <v-layout wrap justify-center>
                          <v-flex class="hidden-sm-and-down" xs12 lg3>
                            <v-layout wrap justify-start v-if="item">
                              <v-flex xs12 v-if="item.shikaraid">
                                <v-flex v-if="item.shikaraid.coverImage">
                                  <v-img
                                    class="customcard2"
                                    height="170px"
                                    width="100%"
                                    style="border-radius: 12px 0px 0px 12px"
                                    :src="mediaUURL + item.shikaraid.coverImage"
                                  >
                                    <v-layout
                                      wrap
                                      fill-height
                                      justify-center
                                      v-if="
                                        item.advancepaymentStatus === 'Success' && item.status == 'Active'
                                      "
                                    >
                                      <v-flex pb-2 pl-4 pr-4 align-self-end>
                                        <v-btn
                                          @click="downloadTicket(item._id)"
                                          block
                                          color="#F17343"
                                        >
                                          <span
                                            style="
                                              font-family: LexendRegular;
                                              color: white;
                                              font-size: 11px;
                                            "
                                          >
                                            Download Ticket
                                          </span>
                                          <v-icon color="white"
                                            >mdi-download</v-icon
                                          >
                                        </v-btn>
                                      </v-flex>
                                    </v-layout>
                                    <template v-slot:placeholder>
                                      <ImageLoader />
                                    </template>
                                  </v-img>
                                </v-flex>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                          <v-flex class="hidden-md-and-up" xs12 lg3>
                            <v-layout wrap justify-start v-if="item">
                              <v-flex xs12 v-if="item.shikaraid">
                                <v-flex v-if="item.shikaraid.coverImage">
                                  <v-img
                                    class="customcard2"
                                    height="170px"
                                    width="100%"
                                    :src="mediaUURL + item.shikaraid.coverImage"
                                  >
                                    <v-layout
                                      wrap
                                      fill-height
                                      justify-center
                                      v-if="
                                        item.advancepaymentStatus === 'Success' && item.status == 'Active'
                                      "
                                    >
                                      <v-flex pb-2 pl-4 pr-4 align-self-end>
                                        <v-btn
                                          @click="downloadTicket(item._id)"
                                          block
                                          color="#F17343"
                                        >
                                          <span
                                            style="
                                              font-family: LexendRegular;
                                              color: white;
                                              font-size: 11px;
                                            "
                                          >
                                            Download Ticket
                                          </span>
                                          <v-icon color="white"
                                            >mdi-download</v-icon
                                          >
                                        </v-btn>
                                      </v-flex>
                                    </v-layout>
                                  </v-img>
                                </v-flex>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                          <v-flex xs12 lg9 pl-6>
                            <v-layout wrap justify-start fill-height>
                              <v-flex
                                xs12
                                sm4
                                md4
                                lg4
                                pt-3
                                text-left
                                align-self-center
                              >
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
                                        font-size: 14px;
                                        font-weight: 500;
                                      "
                                    >
                                      Booking # :
                                    </span>
                                    <span
                                      style="color: #f17343; font-size: 15px"
                                    >
                                      &nbsp; {{ item.bookingNo }}
                                    </span>
                                  </v-flex>

                                  <v-flex pt-3>
                                    <span
                                      style="
                                        font-family: LexendRegular;
                                        font-size: 15px;
                                        font-weight: 500;
                                      "
                                    >
                                      Timings :&nbsp;
                                      <span style="color: #f17343">
                                        {{ formattedDate(item.selectedDate)
                                        }}<br />

                                        {{ formatTimeNew(item.startTime) }} -
                                        {{ formatTimeNew(item.endTime) }}
                                      </span>
                                      <!-- <span style="color: #f17343">
        Backdate: {{ formattedDate(calculateBackDate(item.selectedDate)) }}
      </span>
      <br />
      today date
      {{ formattedDate(todaysDate) }}  -->
                                    </span>
                                  </v-flex>

                                  <v-flex xs12 pr-2 v-if="item">
                                    <v-rating
                                      v-if="
                                        item.shikaraid && item.shikaraid.rating
                                      "
                                      :length="5"
                                      :size="18"
                                      v-model="item.shikaraid.rating"
                                      active-color="#ff6200"
                                      color="#ff6200"
                                      background-color="#ff6200"
                                    />
                                  </v-flex>
                                </v-layout>
                              </v-flex>

                              <v-flex
                                pl-4
                                xs12
                                sm4
                                md4
                                lg4
                                text-left
                                align-self-center
                                v-if="item"
                              >
                                <v-layout wrap v-if="item.customerDetails">
                                  <v-flex xs12 pt-3>
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
                                      v-if="item.customerDetails"
                                      style="
                                        color: #f17343;
                                        font-family: LexendRegular;
                                        font-size: 15px;
                                      "
                                    >
                                      {{ item.customerDetails.name }},
                                      {{ item.customerDetails.phoneNumber }}
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
                                        font-size: 14px;
                                        font-weight: 500;
                                      "
                                    >
                                      Balance :&nbsp;

                                      <span
                                        style="color: red"
                                        v-if="
                                          item.balancepaymentStatus ==
                                            'Pending' &&
                                          item.advancepaymentMode == 'Agent'
                                        "
                                      >
                                        ₹ {{ item.postBookingamount }} Not Paid
                                      </span>
                                      <span
                                        style="color: green"
                                        v-else-if="
                                          item.balancepaymentStatus ==
                                            'Success' &&
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
                                </v-layout>
                              </v-flex>

                              <v-flex xs12 sm4 md4 lg4 align-self-center>
                                <v-layout wrap justify-end>
                                  <v-flex
                                    class="hidden-sm-and-down"
                                    xs12
                                    text-center
                                    pl-3
                                    pr-1
                                    pb-2
                                  >
                                    <span
                                      style="
                                        font-family: LexendRegular;
                                        color: black;
                                        font-size: 20px;
                                        font-weight: 600;
                                      "
                                    >
                                      ₹ {{ item.bookingTotal }}
                                    </span>
                                  </v-flex>
                                  <v-flex
                                    class="hidden-md-and-up"
                                    xs12
                                    text-left
                                    pt-2
                                  >
                                    <span
                                      style="
                                        font-family: LexendRegular;
                                        color: black;
                                        font-size: 20px;
                                        font-weight: 600;
                                      "
                                    >
                                      ₹ {{ item.bookingTotal }}
                                    </span>
                                  </v-flex>

                                  <v-flex
                                    class="hidden-sm-and-down"
                                    xs12
                                    text-center
                                    pl-3
                                    pr-10
                                    pl-10
                                    pb-3
                                  >
                                    <v-btn
                                      @click="gotoView(item._id)"
                                      block
                                      color="#F17343"
                                    >
                                      <span
                                        style="
                                          font-family: LexendRegular;
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
                                  <v-flex
                                    class="hidden-md-and-up"
                                    xs12
                                    text-center
                                    pr-3
                                    pt-2
                                    pb-3
                                  >
                                    <v-btn
                                      @click="gotoView(item._id)"
                                      block
                                      color="#F17343"
                                    >
                                      <span
                                        style="
                                          font-family: LexendRegular;
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

                                  <v-flex
                                    v-if="item.status !== 'Cancelled'"
                                    class="hidden-sm-and-down"
                                    xs12
                                    text-center
                                    pl-3
                                    pr-10
                                    pl-10
                                    pb-3
                                  >
                                    <v-btn
                                      v-if="
                                        isCancelButtonVisible(item.selectedDate) && item.status == 'Active'
                                      "
                                      block
                                      @click="
                                        (bookid = item._id),
                                          (canceldialog = true)
                                      "
                                      color="#F17343"
                                    >
                                      <span
                                        style="
                                          font-family: LexendRegular;
                                          color: white;
                                          font-size: 14px;
                                          font-weight: 400;
                                          text-transform: none;
                                        "
                                      >
                                        Cancel
                                      </span>
                                    </v-btn>
                                  </v-flex>

                                  <v-flex
                                    v-if="item.status !== 'Cancelled'"
                                    class="hidden-md-and-up"
                                    xs12
                                    pr-3
                                    pb-4
                                    text-center
                                  >
                                    <v-btn
                                      v-if="
                                        isCancelButtonVisible(item.selectedDate) && item.status == 'Active'
                                      "
                                      block
                                      @click="
                                        (bookid = item._id),
                                          (canceldialog = true)
                                      "
                                      color="#F17343"
                                    >
                                      <span
                                        style="
                                          font-family: LexendRegular;
                                          color: white;
                                          font-size: 14px;
                                          font-weight: 400;
                                          text-transform: none;
                                        "
                                      >
                                        Cancel
                                      </span>
                                    </v-btn>
                                  </v-flex>

                                  <v-flex
                                    pb-3
                                    xs12
                                    pr-2
                                    lg10
                                    pr-lg-10
                                    text-center
                                    v-if="isEndDateOver(item.selectedDate)"
                                  >
                                    <v-btn
                                      block
                                      @click="
                                        (bookid2 = item.shikaraid._id),
                                          (reviewDialog = true)
                                      "
                                      color="#F17343"
                                    >
                                      <span
                                        style="
                                          font-family: LexendRegular;
                                          color: white;
                                          font-size: 14px;
                                          font-weight: 400;
                                          text-transform: none;
                                        "
                                      >
                                        Add Review
                                      </span>
                                    </v-btn>
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
        <v-layout wrap text-center v-else>
          <v-flex xs12 sm12 md12 lg12 xl12 pt-16>
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
      </v-flex>
      <v-dialog
        :retain-focus="true"
        persistent
        v-model="canceldialog"
        max-width="600px"
      >
        <v-card>
          <v-layout wrap>
            <v-flex xs12>
              <v-card-title
                class="LexendRegular"
                style="
                  color: black;
                  font-size: 18px;
                  font-weight: lighter;
                  text-transform: none;
                "
              >
                Are you sure you want to cancel the booking?
              </v-card-title>
            </v-flex>
          </v-layout>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="black"
              style="text-transform: none"
              text
              @click="canceldialog = false"
              class="LexendRegular"
              >Cancel</v-btn
            >
            <v-btn
              color="red"
              class="LexendRegular"
              text
              style="text-transform: none"
              @click="cancelBooking(bookid)"
              >OK</v-btn
            >
            <v-spacer></v-spacer>
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
                  font-family: LexendRegular;
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
                    font-family: LexendRegular;
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
                    color="ff6200"
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
                  @click="addReview(bookid2)"
                  >Save</v-btn
                >
              </v-flex>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      status: "",
      reviewDialog: false,
      bookid2: "",
      appLoading: false,
      ServerError: false,
      snackbar: false,
      canceldialog: false,
      list: [],
      statuslist: ["Active", "Inactive", "Cancelled"],
      timeout: 5000,
      msg: null,
      pages: 0,
      bookid: "",
      fromdate: "",
      todaysDate: new Date(),
      currentReview: {
        comment: "",
        rating: 0,
      },
      rules: [(v) => v.length <= 200 || "Max 200 characters"],
      todate: "",
      HmenuCheckInVisible: false,
      HmenuCheckOutVisible: false,
      value: "",
      phone: "",
      currentPage: 1,
    };
  },
  watch: {
    currentPage() {
      this.getList();
    },
    fromdate() {
      this.getList();
    },
    todate() {
      this.getList();
    },
    status() {
      this.getList();
    },
  },
  mounted() {
    this.getList();
  },

  methods: {
    isEndDateOver(endDate) {
      const now = new Date();
      const end = new Date(endDate);
      end.setDate(end.getDate() + 1);
      return end <= now;
    },

    addReview(bookid2) {
      this.appLoading = true;
      axios({
        headers: {
          token: localStorage.getItem("token"),
        },
        method: "post",
        url: "/review/add/shikara",
        data: {
          shikaraId: bookid2,
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
    cancelBooking(bookid) {
      axios({
        method: "GET",
        url: "shikara/booking/cancel",
        headers: {
          token: localStorage.getItem("token"),
        },
        params: {
          bookingId: bookid,
        },
      })
        .then((response) => {
          this.msg = response.data.msg;
          this.snackbar = true;
          this.canceldialog = false;
          location.reload();
        })

        .catch((err) => {
          this.ServerError = true;
          console.log(err);
        });
    },
    formattedDate(date) {
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      return new Date(date).toLocaleDateString("en-GB", options);
    },
    gotoView(id) {
      this.$router.push({
        name: "bookingsdetailed",
        query: {
          id: id,
        },
      });
    },
    downloadTicket(id) {
      const token = localStorage.getItem("token");
      const downloadUrl = "/invoice/shikara/agent";
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          id: id,
        },
        responseType: "blob",
      };

      axios
        .get(downloadUrl, config)
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));

          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Shikara ticket.pdf");
          document.body.appendChild(link);

          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.error("Error downloading invoice:", error);
        });
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
          type: "shikara",
          fromDate: this.fromdate,
          toDate: this.todate,
          status: this.status,
          location: this.location,
          memberCount: this.memberCount,
          childrenCount: this.childrenCount,
        },
      }).then((response) => {
        if (response.data.status) {
          this.list = response.data.data;
          this.totalData = response.data.totalLength;
          this.pages = Math.ceil(this.totalData / response.data.limit);
          console.log(this.totalData);
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
    formatTime(timeString) {
      if (!timeString) return "";

      const formattedTime = timeString.slice(11, 16);
      return formattedTime;
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

    isCancelButtonVisible(selectedDate) {
      const backDate = this.calculateBackDate(selectedDate);
      return backDate >= this.todaysDate;
    },
    calculateBackDate(selectedDate) {
      const startDateObject = new Date(selectedDate);

      const backDate = new Date(startDateObject);
      backDate.setDate(startDateObject.getDate() - 8);
      return backDate;
    },
  },
};
</script>
