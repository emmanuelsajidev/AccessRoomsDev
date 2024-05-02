<template>
  <div>
    <PageLoader v-bind:storage="appLoading" />
    <ServerError v-if="ServerError" />
    <v-snackbar v-model="snackbar" color="#ff6200" right :timeout="3000">
      <v-layout wrap class="mainfont">
        <v-flex text-left class="align-self-center" style="color: white">{{
          msg
        }}</v-flex>
        <v-flex text-right>
          <v-btn small :ripple="false" text @click="snackbar = false">
            <v-icon style="color: white">mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-snackbar>
    <v-layout wrap justify-center>
      <v-flex xs12 pt-8>
        <v-layout wrap justify-center style="background-color: white">
          <v-flex xs11>
            <v-layout wrap justify-center pb-6>
              <v-flex text-left pt-6>
                <span
                  style="
                    font-family: mainfont;
                    color: #f17343;
                    text-transform: none;
                    font-size: 20px;
                    font-weight: 500;
                  "
                >
                  BOOKING DETAILS
                </span>
              </v-flex>
              <v-flex xs12 pt-5>
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
                            v-if="
                              list.houseBoatId && list.houseBoatId.coverImage
                            "
                            style="border-radius: 0px 0px 0px 0px"
                            :src="mediaURLnewx + list.houseBoatId.coverImage"
                            height="100%"
                            width="100%"
                          ></v-img>
                        </v-flex>
                      </v-layout>
                    </v-flex>

                    <v-flex xs12 pl-6>
                      <v-layout wrap pb-6 justify-start fill-height>
                        <v-flex
                          xs12
                          sm6
                          md4
                          lg4
                          xl4
                          pt-6
                          text-left
                          align-self-center
                        >
                          <v-layout wrap>
                            <v-flex xs12>
                              <span
                                v-if="
                                  list.houseBoatId &&
                                  list.houseBoatId.houseBoatName
                                "
                                style="
                                  font-weight: 500;
                                  font-size: 20px;
                                  font-weight: bold;
                                  font-family: mainfont;
                                "
                              >
                                {{ list.houseBoatId.houseBoatName }}
                              </span>
                            </v-flex>

                            <v-flex xs12 pt-3>
                              <span
                                style="
                                  font-family: mainfont;
                                  font-size: 14px;
                                  font-weight: 500;
                                "
                              >
                                Booking # :
                              </span>
                              <span
                                style="
                                  color: #f17343;
                                  font-family: mainfont;
                                  font-size: 15px;
                                "
                              >
                                &nbsp; {{ list.bookingNo }}
                              </span>
                            </v-flex>

                            <v-flex xs12 pt-3>
                              <span
                                style="
                                  font-family: mainfont;
                                  font-size: 14px;
                                  font-weight: 500;
                                "
                              >
                                Trip Type :&nbsp;
                                <span
                                  style="color: #f17343; font-family: mainfont"
                                >
                                  {{ list.tripType }}
                                </span>
                              </span>
                            </v-flex>

                            <v-flex xs12 pt-3>
                              <span
                                style="
                                  font-family: mainfont;
                                  font-size: 14px;
                                  font-weight: 500;
                                "
                              >
                                Category :&nbsp;
                                <span
                                  style="color: #f17343; font-family: mainfont"
                                >
                                  {{ list.category }}
                                </span>
                              </span>
                            </v-flex>

                            <v-flex xs12 text-left pt-3>
                              <span
                                style="
                                  font-family: mainfont;
                                  font-size: 14px;
                                  font-weight: 500;
                                "
                              >
                                Total Rooms :&nbsp;

                                <span
                                  style="
                                    color: #f17343;
                                    font-family: mainfont;
                                    font-size: 15px;
                                    font-weight: 400;
                                  "
                                  v-if="list.totalRooms"
                                >
                                 {{ list.totalRooms }}
                                </span>
                                <span v-else style="
                                    color: #f17343;
                                    font-family: mainfont;
                                    font-size: 15px;
                                    font-weight: 400;
                                  " >
                                  Customer
                                  </span>
                              
                              </span>
                            
                            </v-flex>
                          </v-layout>
                        </v-flex>

                        <v-flex
                          xs12
                          sm6
                          md4
                          lg4
                          xl4
                          pt-6
                          text-left
                          align-self-center
                        >
                          <v-layout wrap>
                            <v-flex xs12>
                              <span
                                style="
                                  font-weight: 400;
                                  font-size: 14px;
                                  font-weight: bold;
                                  font-family: mainfont;
                                "
                              >
                                Booked for : &nbsp;
                              </span>
                              <span
                                style="
                                  color: #f17343;
                                  font-family: mainfont;
                                  font-size: 15px;
                                  font-weight: 400;
                                "
                                v-if="list.userid && list.userid.companyName"
                              >
                                {{
                                  list.userid && list.userid.companyName
                                    ? list.userid.companyName
                                    : ""
                                }}
                              </span>
                              <span
                              style="
                                  color: #f17343;
                                  font-family: mainfont;
                                  font-size: 15px;
                                  font-weight: 400;
                                "
                                v-else>
                                {{ list.fullName }}
                              </span>
                            </v-flex>
                            <v-flex xs12 text-left pt-4>
                              <span
                                style="
                                  font-family: mainfont;
                                  font-size: 14px;
                                  font-weight: 500;
                                "
                              >
                                Members :&nbsp;
                                <span
                                  style="
                                    color: #f17343;
                                    font-family: mainfont;
                                    font-size: 15px;
                                    font-weight: 400;
                                  "
                                >
                                  {{ list.noOfAdults }} Adults,
                                  {{ list.noOfChildren }} Children (below 5 years)
                                </span>
                              </span>
                            </v-flex>

                            <v-flex xs12 text-left pt-3>
                              <span
                                style="
                                  font-family: mainfont;
                                  font-size: 14px;
                                  font-weight: 500;
                                "
                              >
                                Check In Date :&nbsp;

                                <span
                                  style="
                                    color: #f17343;
                                    font-family: mainfont;
                                    font-size: 15px;
                                    font-weight: 400;
                                  "
                                  v-if="list"
                                >
                                  {{ formattedDate(list.startDate) }}
                                </span>
                              </span>
                            </v-flex>

                            <v-flex xs12 pt-3>
                              <span
                                style="
                                  font-family: mainfont;
                                  font-size: 14px;
                                  font-weight: 500;
                                "
                              >
                                House Boat Type :&nbsp;
                                <span
                                  style="color: #f17343; font-family: mainfont"
                                >
                                  {{ list.houseBoatType }}
                                </span>
                              </span>
                            </v-flex>
                          </v-layout>
                        </v-flex>

                        <v-flex
                          xs12
                          sm6
                          md4
                          lg4
                          xl4
                          pt-6
                          text-left
                          align-self-center
                        >
                          <v-layout wrap>
                            <v-flex xs12>
                              <span
                                style="
                                  font-weight: 400;
                                  font-size: 14px;
                                  font-weight: bold;
                                  font-family: mainfont;
                                "
                              >
                              </span>
                              <span
                                v-if="list.vendorName && list.vendorName.name"
                                style="
                                  color: #f17343;
                                  font-family: mainfont;
                                  font-size: 15px;
                                  font-weight: 400;
                                "
                              >
                                {{ list.vendorName.name }} {{ list.vendorName.phoneNumber }}
                              </span>
                            </v-flex>
                            <v-flex xs12 text-left pt-3 v-if="list.houseBoatId">
                              <span
                                style="
                                  font-family: mainfont;
                                  font-size: 14px;
                                  font-weight: 500;
                                "
                              >
                                Pickup/ Drop :&nbsp;

                                <span
                                  style="
                                    color: #f17343;
                                    font-family: mainfont;
                                    font-size: 15px;
                                    font-weight: 400;
                                  "
                                >
                                  {{ list.houseBoatId.location.name }}
                                </span>
                              </span>
                            </v-flex>
                            <v-flex xs12 text-left pt-3>
                              <span
                                style="
                                  font-family: mainfont;
                                  font-size: 14px;
                                  font-weight: 500;
                                "
                              >
                                Check Out Date :&nbsp;

                                <span
                                  style="
                                    color: #f17343;
                                    font-family: mainfont;
                                    font-size: 15px;
                                    font-weight: 400;
                                  "
                                  v-if="list"
                                >
                                  {{ formattedDate(list.endDate) }}
                                </span>
                              </span>
                            </v-flex>



                            <v-flex xs12 text-left pt-3>
                              <span
                                style="
                                  font-family: mainfont;
                                  font-size: 14px;
                                  font-weight: 500;
                                "
                              >
                                Balance Paid By :&nbsp;

                                <span
                                  style="
                                    color: #f17343;
                                    font-family: mainfont;
                                    font-size: 15px;
                                    font-weight: 400;
                                  "
                                  v-if="list.advancepaymentMode"
                                >
                                 {{ list.advancepaymentMode }}
                                </span>
                                <span v-else style="
                                    color: #f17343;
                                    font-family: mainfont;
                                    font-size: 15px;
                                    font-weight: 400;
                                  " >
                                  Customer
                                  </span>
                              
                              </span>
                            
                            </v-flex>

                            


                          </v-layout>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-flex>
              <v-flex xs12 pt-10>
                <v-layout wrap>
                  <v-flex xs12>
                    <span
                      style="
                        font-family: mainfont;

                        color: #f17343;
                        text-transform: none;
                        font-size: 20px;
                        font-weight: 500;
                      "
                    >
                      CUSTOMER DETAILS
                    </span>
                  </v-flex>
                  <v-flex xs12>
                    <v-layout wrap justify-center>
                      <v-flex xs12 sm6 md3 lg3 xl3 pt-6>
                        <v-layout wrap justify-start>
                          <v-flex xs6>
                            <v-layout wrap>
                              <v-flex xs12>
                                <span class="heading"> Name </span>
                              </v-flex>
                              <v-flex pt-1 xs12 class="subheading">
                                <span>
                                  {{ list.fullName }}
                                </span>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs12 sm6 md3 lg3 xl3 pt-6>
                        <v-layout wrap justify-start>
                          <v-flex xs6>
                            <v-layout wrap>
                              <v-flex xs12>
                                <span class="heading"> Phone Number </span>
                              </v-flex>
                              <v-flex xs12 pt-1>
                                <span class="subheading">
                                  {{ list.phoneNumber }}
                                </span>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs12 sm6 md3 lg3 xl3 pt-6>
                        <v-layout wrap justify-start>
                          <v-flex xs6>
                            <v-layout wrap>
                              <v-flex xs12>
                                <span class="heading"> Email </span>
                              </v-flex>
                              <v-flex xs12 pt-1>
                                <span class="subheading">
                                  {{ list.email }}
                                </span>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs12 sm6 md3 lg3 xl3 pt-6>
                        <v-layout wrap justify-start>
                          <v-flex xs6>
                            <v-layout wrap>
                              <v-flex xs12>
                                <span class="heading"> Address </span>
                              </v-flex>
                              <v-flex xs12 pt-1>
                                <span class="subheading">
                                  {{ list.address }}
                                </span>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-flex>

              <v-flex xs12 pt-3>
                <span
                  style="
                    font-family: mainfont;

                    color: #f17343;
                    text-transform: none;
                    font-size: 20px;
                    font-weight: 500;
                  "
                >
                  PAYMENT DETAILS
                </span>
              </v-flex>
              <v-flex xs12>
                <v-layout wrap justify-center>
                  <v-flex xs12 pt-6>
                    <v-layout wrap justify-start>
                      <v-flex xs6 lg2>
                        <v-layout wrap>
                          <v-flex xs12>
                            <span class="heading"> Booking # </span>
                          </v-flex>
                          <v-flex pt-1 xs12 class="subheading">
                            <span>
                              {{ list.bookingNo }}
                            </span>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs6 lg2>
                        <v-layout wrap>
                          <v-flex xs12>
                            <span class="heading"> Booked On </span>
                          </v-flex>
                          <v-flex
                            pt-1
                            xs12
                            class="subheading"
                            v-if="list.bookingDate"
                          >
                            <span>
                              {{ formattedDate(list.bookingDate) }}
                            </span>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs6 lg2>
                        <v-layout wrap>
                          <v-flex xs10 text-left>
                            <span class="heading"> Total Amount </span>
                          </v-flex>
                          <v-flex xs10 pt-1 text-left>
                            <span class="subheading">
                              ₹ {{ list.totalAmount }}
                            </span>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs6 lg2>
                        <v-layout wrap>
                          <v-flex xs10 text-left>
                            <span class="heading"> Advance Paid </span>
                          </v-flex>
                          <v-flex xs10 pt-1 text-left>
                            <span class="subheading">
                              ₹ {{ list.advanceAmountPaid }}
                            </span>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs6 lg2>
                        <v-layout wrap>
                          <v-flex xs12 text-left>
                            <span class="heading"> Balance Amount </span>
                          </v-flex>
                          <v-flex xs12 pt-1 text-left>
                            <span class="subheading">
                              ₹ {{ list.balancePayAmount }}
                            </span>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs6 lg2>
                        <v-layout wrap>
                          <v-flex xs12 text-left>
                            <span class="heading">
                              Status of Balance Amount
                            </span>
                          </v-flex>
                          <v-flex xs12 pt-1 text-left>
                            <span
                              class="subheading"
                              v-if="list.balancepaymentStatus == 'Pending'"
                            >
                              Not Paid
                            </span>
                            <span
                              style="
                                font-weight: 600;
                                font-size: 12px;
                                text-transform: none;
                              "
                              class="mainfont"
                              v-else-if="
                                list.advancepaymentMode === 'Agent' &&
                                list.balancepaymentStatus === 'Verified'
                              "
                              >Paid and Verified by Vendor</span
                            >

                            <span
                              style="
                                font-weight: 600;
                                font-size: 12px;
                                text-transform: none;
                              "
                              class="mainfont"
                              v-else-if="
                                list.advancepaymentMode === 'Agent' &&
                                list.balancepaymentStatus === 'Success'
                              "
                            >
                              Payment done waiting for approval from Vendor
                            </span>
                            <span
                              v-else
                              style="
                                font-weight: 600;
                                font-size: 12px;
                                text-transform: none;
                              "
                              class="mainfont"
                            >
                              Paid
                            </span>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
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
      carouselSpeed: 2000,
      appLoading: false,
      ServerError: false,
      snackbar: false,
      timeout: 5000,
      list: {},
      balancepaymentMode: null,
      msg: null,
      favorites: [],
      categorys: ["Agent", "Guest", "Driver"],
      mode: ["UPI Id", "Bank Transfer", "QR code"],

      value: "",
      phone: "",
      imageFileFront: "",
      imageFileBack: "",
      imageFile: "",
      advancepaymentMode: null,
      id: this.$route.query.id,
      docsFront: "",
      docsBack: "",
      docs: "",
      docs1: "",
      file: "",
      formData: new FormData(),
    };
  },
  computed: {
    appUser() {
      return this.$store.state.userData;
    },
  },
  beforeMount() {
    // this.imageFileFront=this.appUser.agentIdProofFront
  },
  mounted() {
    this.getList();
  },
  methods: {
    formattedDate(date) {
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      return new Date(date).toLocaleDateString("en-GB", options);
    },

    getList() {
      this.appLoading = true;
      axios({
        method: "POST",
        url: "/agent/my/bookings/details",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          bookingId: this.id,
        },
      })
        .then((response) => {
          this.list = response.data.data;
          this.advancepaymentMode = this.list.advancepaymentMode;
          this.appLoading = false;
        })
        .catch((err) => {
          this.ServerError = true;
          console.error(err);
        });
    },

    formatTime(time) {
      if (!time) return "";

      const date = new Date(time);
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const seconds = date.getSeconds().toString().padStart(2, "0");

      return `${hours}:${minutes}:${seconds}`;
    },
    validate() {
      if (!this.docsFront || this.docsFront == "") {
        this.msg = "Please Upload Reciept";
        this.snackbar = true;
      }
      if (!this.balancepaymentMode) {
        this.msg = "Please Select Mode";
        this.snackbar = true;
      } else {
        this.submitPayment();
      }
    },
  },
};
</script>
<style>
.changeStyle {
  position: relative;
  margin-top: -18%;

  @media (max-width: 960px) {
    position: relative;
    margin-top: 0%;
  }
}

@media only screen and (min-width: 960px) and (max-width: 1100px) {
  .changeStyle {
    position: relative;
    margin-top: -10%;
  }
}

.heading {
  color: #000000;
  text-transform: none;
  font-family: mainfont;
  font-size: 16px;
}

.subheading {
  color: #000000;
  text-transform: none;
  font-family: mainfont;
  font-size: 13px;
  font-weight: 600;
}

.v-autocomplete__content .v-list__tile {
  height: 2px;
}
</style>