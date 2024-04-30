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
        <!-- <v-flex xs12 pt-14 pt-lg-4>
          <span
            style="font-size: 12px; font-weight: 400; font-family: mainfont"
            >My Bookings</span
          >
        </v-flex> -->
        <v-flex class="mainfont" xs12 pt-8>
          <v-layout wrap justify-center style="background-color: white">
            <v-flex xs11>
              <v-layout wrap justify-center pb-6>
                <v-flex text-left pt-6>
                  <span style="
                      color: #f17343;
                      text-transform: none;
                      font-size: 20px;
                      font-weight: 500;
                    ">
                    BOOKING DETAILS
                  </span>
                </v-flex>
                <v-flex xs12 pt-5>
                  <v-card elevation="0" color="#EDEDED" style="border-radius: 12px">
                    <v-layout wrap justify-center>
                      <v-flex xs12 v-if="list.shikaraid">
                        <v-layout wrap justify-start>
                          <v-flex xs12>
                            <v-flex>
                              <v-img style="border-radius: 0px 0px 0px 0px" :src="mediaURLnewx + list.shikaraid.coverImage">
                              </v-img>
                            </v-flex>
                          </v-flex>
                        </v-layout>
                      </v-flex>
  
                      <v-flex xs12 pl-6 v-if="list.shikaraid">
                        <v-layout wrap pb-6 justify-start fill-height>
                          <v-flex xs12 sm4 md4 lg4 xl4 pt-6 text-left align-self-center>
                            <v-layout wrap>
                              <v-flex xs12>
                                <span style="
                                    font-weight: 500;
                                    font-size: 20px;
                                    font-weight: bold;
                                    font-family: mainfont;
                                  ">
                                  {{ list.shikaraid.shikaraName }}
                                  <!-- <span
                                          style="font-weight: 300; font-size: 14px; font-family: mainfont;">
                                          {{ list.bookingType }}
                                      </span> -->
                                </span>
                              </v-flex>
                              <v-flex xs12 pt-3>
                                <span style="
                                    font-family: mainfont;
                                    font-size: 14px;
                                    font-weight: 500;
                                  ">
                                  Booking #
                                </span>
                                <span style="
                                    color: #f17343;
                                    font-family: mainfont;
                                    font-size: 15px;
                                    font-weight: 400;
                                  ">
                                  &nbsp; {{ list.bookingNo }}
                                </span>
                              </v-flex>
  
                              <v-flex pt-3>
                                <span style="
                                    font-family: mainfont;
                                    font-size: 15px;
                                    font-weight: 500;
                                  ">
                                  Slot :&nbsp;
                                  <span style="
                                      color: #f17343;
                                      font-family: mainfont;
                                      font-size: 15px;
                                      font-weight: 400;
                                    ">
                                    {{ formattedDate(list.selectedDate) }},
  
                                    {{ formatTimeNew(list.startTime)  }}
  
                                    -
  
                                    {{ formatTimeNew(list.endTime) }}
                                  </span>
                                </span>
                              </v-flex>
                            </v-layout>
                          </v-flex>
  
                          <v-flex xs12 sm4 md5 lg5 xl5 pt-6 text-left align-self-center>
                            <v-layout wrap>
                              <v-flex xs12 v-if="list.customerDetails">
                                <span style="
                                    font-weight: 400;
                                    font-size: 14px;
                                    font-weight: bold;
                                    font-family: mainfont;
                                  ">
                                  Booked for : &nbsp;
                                </span>
                                <span style="
                                    color: #f17343;
                                    font-family: mainfont;
                                    font-size: 15px;
                                    font-weight: 400;
                                  ">
                                  {{ list.bookedbyid.name }},
                                  {{ list.customerDetails.phoneNumber }}
                                </span>
                              </v-flex>
                              <v-flex xs12 text-left pt-4 v-if="list.memberCount">
                                <span style="
                                    font-family: mainfont;
                                    font-size: 14px;
                                    font-weight: 500;
                                  ">
                                  Members :&nbsp;
                                  <span style="
                                      color: #f17343;
                                      font-family: mainfont;
                                      font-size: 15px;
                                      font-weight: 400;
                                    ">
                                    {{ list.memberCount }} Adults,
                                    {{ list.childrenCount }} Children (below 5 years)
                                  </span>
                                </span>
                              </v-flex>
  
                              <v-flex xs12 text-left pt-3>
                                <span style="
                                    font-family: mainfont;
                                    font-size: 14px;
                                    font-weight: 500;
                                  ">
                                  Balance :&nbsp;
  
                                  <span style="
                                      color: red;
                                      font-family: mainfont;
                                      font-size: 15px;
                                      font-weight: 400;
                                    " v-if="list.balancepaymentStatus == 'Pending'">
                                    ₹ {{ list.postBookingamount }} Not Paid
                                  </span>
                                  <span style="
                                      color: green;
                                      font-family: mainfont;
                                      font-size: 15px;
                                      font-weight: 400;
                                    " v-else>
                                    ₹ {{ list.postBookingamount }} Paid
                                  </span>
                                </span>
                              </v-flex>
                            </v-layout>
                          </v-flex>
  
                          <v-flex xs12 sm4 md2 lg2 xl2 pt-6 align-self-center>
                            <v-layout wrap justify-end>
                              <v-flex xs12 text-left>
                                <span style="
                                    color: #f17343;
                                    font-family: mainfont;
                                    font-size: 15px;
                                    font-weight: 400;
                                  ">
                                  {{ list.shikaraid.vendorid.userid.name }} &nbsp; {{ list.shikaraid.vendorid.userid.phoneNumber }}
                                  </span>
                              </v-flex>
                              
                              <v-flex xs12 pt-3>
                                <span
                                style="
                                  font-family: mainfont;
                                  font-size: 12px;
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

                              <v-flex class="hidden-sm-and-down" xs12 text-left pr-1 pt-lg-2>
                                <span style="
                                    font-family: mainfont;
                                    color: black;
                                    font-size: 22px;
                                    font-weight: 600;
                                  ">
                                  ₹ {{ list.bookingTotal }}
                                </span>
                              </v-flex>
                              <v-flex class="hidden-md-and-up" xs12 text-left pr-1>
                                <span style="
                                    font-family: mainfont;
                                    color: black;
                                    font-size: 22px;
                                    font-weight: 600;
                                  ">
                                  ₹ {{ list.bookingTotal }}
                                </span>
                              </v-flex>
                              

                              <!-- <v-flex xs12 text-left pt-4 pr-1 style="font-family:mainfont">
                                <span style="color:		#50C878;font-size:13px;font-weight:bolder">
                                  Commission: &nbsp;
                                </span>
                                <span style="font-family: mainfont;color:#50C878;font-size: 15px;font-weight:600">
                                  ₹ {{ list.agentgetAmount }}
  
                                </span>
  
                              </v-flex> -->
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
                      <span style="
                          color: #f17343;
                          text-transform: none;
                          font-size: 20px;
                          font-weight: 500;
                        ">
                        CUSTOMER DETAILS
                      </span>
                    </v-flex>
                    <v-flex xs12 v-if="list.customerDetails">
                      <v-layout wrap justify-center>
                        <v-flex xs12 sm12 md3 lg3 xl3 pt-6>
                          <v-layout wrap justify-start>
                            <v-flex xs6>
                              <v-layout wrap>
                                <v-flex xs12>
                                  <span class="heading"> Name </span>
                                </v-flex>
                                <v-flex pt-1 xs12 class="subheading">
                                  <span>
                                    {{ list.customerDetails.name }}
                                  </span>
                                </v-flex>
                              </v-layout>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex xs12 lg3 pt-6>
                          <v-layout wrap justify-start>
                            <v-flex xs6>
                              <v-layout wrap>
                                <v-flex xs12>
                                  <span class="heading"> Phone Number </span>
                                </v-flex>
                                <v-flex xs12 pt-1>
                                  <span class="subheading">
                                    {{ list.customerDetails.phoneNumber }}
                                  </span>
                                </v-flex>
                              </v-layout>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex xs12 lg3 pt-6>
                          <v-layout wrap justify-start>
                            <v-flex xs6>
                              <v-layout wrap>
                                <v-flex xs12>
                                  <span class="heading"> Email </span>
                                </v-flex>
                                <v-flex xs12 pt-1>
                                  <span class="subheading">
                                    {{ list.customerDetails.email }}
                                  </span>
                                </v-flex>
                              </v-layout>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex xs12 lg3 pt-6>
                          <v-layout wrap justify-start>
                            <v-flex xs6>
                              <v-layout wrap>
                                <v-flex xs12>
                                  <span class="heading"> Address </span>
                                </v-flex>
                                <v-flex xs12 pt-1>
                                  <span class="subheading">
                                    {{ list.customerDetails.address }}
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
                  <span style="
                      color: #f17343;
                      text-transform: none;
                      font-size: 20px;
                      font-weight: 500;
                    ">
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
                              <span class="heading"> Booking On </span>
                            </v-flex>
                            <v-flex pt-1 xs12 class="subheading">
                              <span>
                                {{ formattedDate(list.bookedOn) }}
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
                                ₹ {{ list.bookingTotal }}
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
                                ₹ {{ list.advance }}
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
                                ₹ {{ list.postBookingamount }}
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
                              Payment done  waiting for approval from Vendor
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
  
                <v-flex xs12 pt-5 pb-5>
                  <v-divider></v-divider>
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
      copyToClipboard(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        this.msg = "UPI ID copied to clipboard";
        this.snackbar = true;
      },
      getList() {
        this.appLoading = true;
        axios({
          method: "POST",
          url: "/view/shikbook",
          headers: {
            token: localStorage.getItem("token"),
          },
          data: {
            shikbookid: this.id,
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
  
      validate() {
        if (!this.imageFileFront && !this.appUser.agentId.agentIdProofFront) {
          this.msg = "Please Upload Front Side Document";
          this.snackbar = true;
        } else if (
          !this.imageFileBack &&
          !this.appUser.agentId.agentIdProofBack
        ) {
          this.msg = "Please Upload Back Side Document";
          this.snackbar = true;
        } else if (!this.imageFile && !this.appUser.agentId.agentGSTProof) {
          this.msg = "Please Upload Document Details";
          this.snackbar = true;
        } else {
          this.setpThree();
        }
      },
      uploadFront(event) {
        this.docsFront = event.target.files[0];
        if (this.docsFront) {
          this.imageFileFront = this.docsFront;
        }
      },
      uploadBack(event) {
        this.docsBack = event.target.files[0];
        if (this.docsBack) {
          this.imageFileBack = this.docsBack;
        }
      },
      upload(event) {
        console.log(this.imageFile);
        this.docs = event.target.files[0];
        if (this.docs) {
          this.imageFile = this.docs;
        }
      },
      formatTime(time) {
        if (!time) return "";
  
        const date = new Date(time);
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");
  
        return `${hours}:${minutes}:${seconds}`;
      },
  
      submitPayment() {
        this.formData.append("shikbookid", this.id);
        this.formData.append("balancepaymentMode", this.balancepaymentMode);
        this.formData.append("paymentReceipt", this.imageFileFront);
        this.appLoading = true;
        axios({
          method: "POST",
          url: "/postpay/shikara",
          headers: {
            token: localStorage.getItem("token"),
          },
          data: this.formData,
        })
          .then((response) => {
            this.appLoading = false;
            if (response.data.status == true) {
              this.msg = "Payment Successfull";
              this.snackbar = true;
              this.$router.push("/shikarabookings");
            } else {
              this.msg = response.data.msg;
              this.snackbar = true;
            }
          })
          .catch((err) => {
            this.ServerError = true;
            console.error(err);
          });
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