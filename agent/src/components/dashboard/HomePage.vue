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
    <v-layout wrap justify-center pt-lg-3 pt-11>
      <v-flex xs12>
        <v-layout wrap justify-center>
          <v-flex xs12 pt-3 pb-3>
            <span
              style="
                font-size: 30px;
                font-weight: 400;
                font-family: LexendRegular;
              "
              >Overview</span
            >
          </v-flex>
          <v-flex xs12 sm6 md4 v-for="(item, i) in cards" :key="i">
            <v-card elevation="0" class="pa-2 mr-4 mb-4 mb-md-0">
              <v-layout wrap fill-height>
                <v-flex xs4 pa-2 align-self-center>
                  <v-img height="75px" contain :src="item.src"></v-img>
                </v-flex>
                <v-flex xs8 align-self-center pl-6>
                  <v-layout wrap justify-center>
                    <v-flex xs12
                      ><span
                        style="
                          font-weight: 700;
                          font-size: 30px;
                          font-family: LexendRegular;
                        "
                        >{{ item.count }}</span
                      ></v-flex
                    >
                    <v-flex xs12
                      ><span
                        style="
                          font-weight: 400;
                          font-size: 18px;
                          color: #7c7474;
                          font-family: LexendRegular;
                        "
                        >{{ item.name }}</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <!-- ---------shikara----------- -->
          <v-flex xs12 pt-8 pr-3>
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
                      >Recent Shikara Bookings</v-flex
                    >
                    <v-flex xs3 text-right @click="gotoShikara()">
                      <v-btn text plain>
                        <span
                          style="
                            font-weight: 500;
                            font-size: 16px;
                            font-family: LexendRegular;
                            color: #806aad;
                          "
                        >
                          See all
                        </span>
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
              <v-layout wrap>
                <v-flex xs12>
                  <v-layout wrap justify-center>
                    <v-flex xs12>
                      <v-layout wrap justify-center>
                        <v-flex xs12>
                          <v-card elevation="0">
                            <v-layout wrap justify-center pb-6>
                              <v-flex
                                xs11
                                v-for="(item, i) in list"
                                :key="i"
                                pt-5
                              >
                                <v-card
                                  elevation="0"
                                  color="#EDEDED"
                                  style="border-radius: 12px"
                                >
                                  <v-layout wrap justify-center>
                                    <v-flex lg3 xs12>
                                      <v-layout wrap justify-start v-if="item">
                                        <v-flex xs12 v-if="item.shikaraid">
                                          <v-flex
                                            class="hidden-sm-and-down"
                                            v-if="item.shikaraid.coverImage"
                                          >
                                            <v-img
                                              class="customcard"
                                              height="170px"
                                              width="100%"
                                              :src="
                                                mediaUURL +
                                                item.shikaraid.coverImage
                                              "
                                            ></v-img>
                                          </v-flex>
                                          <v-flex
                                            class="hidden-md-and-up"
                                            v-if="item.shikaraid.coverImage"
                                          >
                                            <v-img
                                              class="customcard2"
                                              height="170px"
                                              width="100%"
                                              :src="
                                                mediaUURL +
                                                item.shikaraid.coverImage
                                              "
                                            ></v-img>
                                          </v-flex>
                                        </v-flex>
                                      </v-layout>
                                    </v-flex>

                                    <v-flex xs12 lg9 pl-6>
                                      <v-layout wrap justify-start fill-height>
                                        <v-flex
                                          xs12
                                          sm4
                                          lg4
                                          text-left
                                          align-self-center
                                        >
                                          <v-layout wrap>
                                            <v-flex xs12 pt-4 pt-lg-0>
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
                                                style="
                                                  color: #f17343;
                                                  font-size: 15px;
                                                "
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
                                                Check In :&nbsp;
                                                <span style="color: #f17343">
                                                  {{
                                                    formattedDate(
                                                      item.selectedDate
                                                    )
                                                  }}<br />
                                                  {{ formatTimeNew(item.startTime) }} - {{ formatTimeNew(item.endTime) }}

                                                </span>
                                              </span>
                                            </v-flex>
                                          </v-layout>
                                        </v-flex>

                                        <v-flex
                                          xs12
                                          sm4
                                          lg4
                                          text-left
                                          align-self-center
                                          v-if="item"
                                        >
                                          <v-layout
                                            wrap
                                            v-if="item.customerDetails"
                                          >
                                            <v-flex xs12 pt-4>
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
                                                {{
                                                  item.customerDetails
                                                    .phoneNumber
                                                }}
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
                                                    item.advancepaymentMode ==
                                                      'Agent'
                                                  "
                                                >
                                                  ₹
                                                  {{ item.postBookingamount }}
                                                  Not Paid
                                                </span>
                                                <span
                                                  style="color: green"
                                                  v-else-if="
                                                    item.balancepaymentStatus ==
                                                      'Success' &&
                                                    item.advancepaymentMode ==
                                                      'Agent'
                                                  "
                                                >
                                                  ₹
                                                  {{ item.postBookingamount }}
                                                  Paid
                                                </span>
                                                <span
                                                  style="color: green"
                                                  v-else
                                                >
                                                  ₹ {{ item.postBookingamount }}
                                                </span>
                                              </span>
                                            </v-flex>
                                          </v-layout>
                                        </v-flex>

                                        <v-flex xs12 sm4 lg4 align-self-center>
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
                                              pt-1
                                              pb-1
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
                                              pb-4
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
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <!-- ---------houseoat----------- -->

          <v-flex xs12 pt-8 pr-3>
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
                      >Recent Houseboat Bookings</v-flex
                    >
                    <v-flex xs3 text-right @click="gotoHouseboat()">
                      <v-btn text plain>
                        <span
                          style="
                            font-weight: 500;
                            font-size: 16px;
                            font-family: LexendRegular;
                            color: #806aad;
                          "
                        >
                          See all
                        </span>
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
              <v-layout wrap>
                <v-flex xs12>
                  <v-layout wrap justify-center>
                    <v-flex xs12>
                      <v-layout wrap justify-center>
                        <v-flex xs12>
                          <v-card elevation="0">
                            <v-layout wrap justify-center pb-6>
                              <v-flex
                                xs11
                                v-for="(item, i) in houseboat"
                                :key="i"
                                pt-5
                              >
                                <v-card
                                  elevation="0"
                                  color="#EDEDED"
                                  style="border-radius: 12px"
                                >
                                  <v-layout wrap justify-center>
                                    <v-flex xs12 lg3>
                                      <v-layout wrap justify-start>
                                        <v-flex xs12 v-if="item.houseBoatId">
                                          <v-carousel
                                            :show-arrows="false"
                                            :progress="false"
                                            :continuous="false"
                                            hide-controls-on-hover="true"
                                            height="100%"
                                            width="100%"
                                            hide-delimiters
                                            :cycle="true"
                                          >
                                            <v-carousel-item>
                                              <v-img
                                                class="customcard hidden-sm-and-down"
                                                :src="
                                                  mediaUURL +
                                                  item.houseBoatId.coverImage
                                                "
                                                height="200px"
                                                width="100%"
                                              ></v-img>
                                              <v-img
                                                class="customcard2 hidden-md-and-up"
                                                :src="
                                                  mediaUURL +
                                                  item.houseBoatId.coverImage
                                                "
                                                height="200px"
                                                width="100%"
                                              ></v-img>
                                            </v-carousel-item>
                                          </v-carousel>
                                        </v-flex>
                                      </v-layout>
                                    </v-flex>

                                    <v-flex xs12 lg9 pl-6>
                                      <v-layout wrap justify-start fill-height>
                                        <v-flex
                                          xs12
                                          sm4
                                          lg4
                                          text-left
                                          align-self-center
                                        >
                                          <v-layout wrap>
                                            <v-flex
                                              pt-4
                                              pt-lg-2
                                              xs12
                                              v-if="item.houseBoatId"
                                            >
                                              <span
                                                style="
                                                  font-weight: 500;
                                                  font-size: 20px;
                                                  font-weight: bold;
                                                  font-family: LexendRegular;
                                                "
                                              >
                                                {{ item.houseBoatName }}
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
                                                style="
                                                  color: #f17343;
                                                  font-family: LexendRegular;
                                                  font-size: 15px;
                                                "
                                              >
                                                &nbsp; {{ item.bookingNo }}
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
                                                Trip Type :&nbsp;
                                                <span
                                                  style="
                                                    color: #f17343;
                                                    font-size: 14px;
                                                    font-weight: 500;
                                                  "
                                                >
                                                  {{ item.tripType }}
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
                                                    item.advancepaymentMode ==
                                                      'Agent'
                                                  "
                                                >
                                                  ₹
                                                  {{
                                                    item.balancePayAmount
                                                  }}
                                                  Not Paid
                                                </span>
                                                <span
                                                  style="color: green"
                                                  v-else-if="
                                                    item.balancepaymentStatus ==
                                                      'Success' &&
                                                    item.advancepaymentMode ==
                                                      'Agent'
                                                  "
                                                >
                                                  ₹
                                                  {{
                                                    item.balancePayAmount
                                                  }}
                                                  Paid
                                                </span>
                                                <span
                                                  style="color: green"
                                                  v-else
                                                >
                                                  ₹ {{ item.balancePayAmount }}
                                                </span>
                                              </span>
                                            </v-flex>
                                          </v-layout>
                                        </v-flex>

                                        <v-flex
                                          xs12
                                          sm4
                                          lg4
                                          text-left
                                          align-self-center
                                        >
                                          <v-layout wrap>
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
                                                style="
                                                  color: #f17343;
                                                  font-family: LexendRegular;
                                                  font-size: 15px;
                                                "
                                              >
                                                {{ item.fullName }},
                                                {{ item.phoneNumber }}
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
                                                Check In :&nbsp;
                                                <span style="color: #f17343">
                                                  {{
                                                    formattedDate(
                                                      item.startDate
                                                    )
                                                  }}
                                                 
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
                                                Check Out :&nbsp;
                                                <span style="color: #f17343">
                                                  {{
                                                    formattedDate(
                                                      item.startDate
                                                    )
                                                  }}
                                                 
                                                </span>
                                              </span>
                                            </v-flex>
                                           
                                            <v-flex
                                              xs12
                                              text-left
                                              pt-3
                                              v-if="
                                                item.houseBoatId
                                                  .startingLocation
                                              "
                                            >
                                              <span
                                                style="
                                                  font-family: LexendRegular;
                                                  font-size: 14px;
                                                  font-weight: 500;
                                                "
                                              >
                                                Pickup/ Drop :&nbsp;

                                                <span
                                                  style="color: #f17343"
                                                  v-if="
                                                    item.houseBoatId
                                                      .startingLocation.length >
                                                    0
                                                  "
                                                >
                                                  {{
                                                    item.houseBoatId
                                                      .startingLocation[0].name
                                                  }}
                                                </span>
                                                <span v-else>-</span>
                                              </span>
                                            </v-flex>
                                          </v-layout>
                                        </v-flex>

                                        <v-flex xs12 sm4 lg4 align-self-center>
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
                                                ₹ {{ item.totalAmount }}
                                              </span>
                                            </v-flex>
                                            <v-flex
                                              class="hidden-md-and-up"
                                              xs12
                                              text-left
                                              pt-2
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
                                                ₹ {{ item.totalAmount }}
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
                                                @click="
                                                  gotohouseboatView(
                                                    item._id
                                                  )
                                                "
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
                                              pt-2
                                              pr-3
                                              pb-3
                                            >
                                              <v-btn
                                                @click="
                                                  gotohouseboatView(
                                                    item._id
                                                  )
                                                "
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
      timeout: 5000,
      houseboat: [],
      pages: 0,
      list: [],
      msg: null,
      cards: [],
      value: "",
      phone: "",
    };
  },
  mounted() {
    this.getCount();
    this.getShikara();
    this.getHouseboat();
  },
  methods: {
    formattedDate(date) {
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      return new Date(date).toLocaleDateString("en-GB", options);
    },
    gotoShikara() {
      this.$router.push({
        name: "shikarabookings",
      });
    },

    gotoHouseboat() {
      this.$router.push({
        name: "houseboatbookings",
      });
    },

    getCount() {
      this.appLoading = true;
      axios({
        method: "POST",
        url: "/counts/",
        headers: {
          token: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          const counts = response.data;

          this.cards = [
            {
              title: "bookingCount",
              name: "Total Bookings",
              src: require("../../assets/icons/homeIcon1.png"),
              count: counts.totalBookings || 0,
            },
            // {
            //   title: "reserveCount",
            //   name: "Reservations",
            //   src: require("../../assets/icons/homeIcon2.png"),
            //   count: counts.totalreservations || 0,
            // },
            {
              title: "houseBoatCount",
              name: "Houseboat Bookings",
              src: require("../../assets/icons/homeIcon3.png"),
              count: counts.totalHouseboats || 0,
            },
            {
              title: "shikaraCount",
              name: "Shikara Bookings",
              src: require("../../assets/icons/homeIcon4.png"),
              count: counts.totalShikaras || 0,
            },
          ];

          this.appLoading = false;
        })
        .catch((err) => {
          this.ServerError = true;
          console.error(err);
        });
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
    getHouseboat() {
      this.appLoading = true;
      axios({
        method: "POST",
        url: "/agent/my/bookings",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          page: this.currentPage,
          limit: 10,
        },
      }).then((response) => {
        if (response.data.status) {
          this.houseboat = response.data.data;
          this.totalData = response.data.totalLength;
          this.pages = Math.ceil(this.totalData / response.data.limit);
          this.houseboat = this.houseboat.slice(0, 2);
          this.appLoading = false;
        } else {
          this.appLoading = false;
          this.msg = response.data.msg;
          this.snackbar = true;
        }
      });
      // }
    },
    gotoView(id) {
      this.$router.push({
        name: "bookingsdetailed",
        query: {
          id: id,
        },
      });
    },

    gotohouseboatView(id) {
      this.$router.push({
        name: "houseboatdetailedview",
        query: {
          id: id,
        },
      });
    },

    getShikara() {
      this.appLoading = true;
      axios({
        method: "POST",
        url: "/my/allBookings",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          page: this.currentPage,
          type: "shikara",
          location: this.location,
          memberCount: this.memberCount,
          childrenCount: this.childrenCount,
        },
      }).then((response) => {
        if (response.data.status) {
          this.list = response.data.data;
          this.totalData = response.data.totalLength;
          this.list = this.list.slice(0, 2);
          this.appLoading = false;
        } else {
          this.appLoading = false;
          this.msg = response.data.msg;
          this.snackbar = true;
        }
      });
    },
  },
};
</script>
