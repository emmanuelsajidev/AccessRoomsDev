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
        <v-layout wrap justify-start py-2>
          <v-flex xs12 sm6 align-self-center>
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
              >Booking details</span
            >
          </v-flex>
        </v-layout>
        <v-layout wrap justify-center style="background-color: white">
          <v-flex xs12>
            <v-layout wrap justify-center pb-6>
              <v-flex xs12>
                <v-card elevation="0" style="border-radius: 12px">
                  <v-layout wrap justify-center>
                    <v-flex xs12>
                      <v-layout wrap justify-start>
                        <v-flex xs12>
                          <v-img
                            style="border-radius: 0px 0px 0px 0px"
                            :src="mediaUURL + shikaraData.coverImage"
                            height="100%"
                            width="100%"
                          ><template v-slot:placeholder>
                                      <ImageLoader />
                                    </template></v-img>
                        </v-flex>
                      </v-layout>
                    </v-flex>

                    <v-flex xs12 px-4 pt-4>
                      <v-layout wrap justify-start fill-height>
                        <v-flex xs12>
                              <span
                                style="
                                  font-weight: 500;
                                  font-size: 20px;
                                  font-weight: bold;
                                  font-family: LexendRegular;
                                "
                              >
                                {{ shikaraData.shikaraName }}
                              </span>
                            </v-flex>
                        <v-flex
                          xs12
                          sm6
                          md4
                          lg4
                          xl4
                          text-left
                          align-self-center
                        >
                          <v-layout wrap>
                          
                            <v-flex xs12 pt-3>
                              <span class="subh"> Booking # </span>
                              <span class="subh" v-if="list.bookingNo">
                                &nbsp; {{ list.bookingNo }} </span
                              ><span v-else>-</span>
                            </v-flex>
                            <v-flex xs12 pt-3>
                              <span
                                style="
                                  font-family: LexendRegular;
                                  font-size: 16px;
                                  font-weight: 500;
                                "
                              >
                                Date :
                                <span>
                                  {{ formatDate(list.selectedDate) }}
                                </span>
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
                                Check-in :&nbsp;
                                <span>
                                  {{ formatTimeNew(list.startTime) }}
                                </span>
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
                                Check-out :&nbsp;
                                <span>
                                  {{ formatTimeNew(list.endTime) }}
                                </span>
                              </span> 
                             
                            </v-flex>
                          </v-layout>
                        </v-flex>

                        <v-flex
                          xs12
                          sm6
                          md5
                          lg5
                          xl5
                          text-left
                          align-self-start
                        >
                          <v-layout wrap fill-height >
                            <v-flex xs12 text-left pt-3 v-if="list.shikaraid" >
                              <span class="subh">
                                Pickup/drop :&nbsp;
                                <span v-if="list.shikaraid.startingLocation">
                                  {{ list.shikaraid.startingLocation.name }}</span
                                >
                              </span>
                            </v-flex>
                            <v-flex xs12 text-left pt-3>
                              <span class="subh">
                                Members :&nbsp;
                                <span v-if="list.memberCount">
                                  {{ list.memberCount }}, </span
                                >
                                <!-- <span v-if="list.noOfAdults">
                                  {{ list.noOfAdults }} Adults</span
                                > -->
                                <span v-if="list.childrenCount">
                                 {{ list.childrenCount }} Children (below 5 years)
                                </span>
                              </span>
                            </v-flex>

                            <v-flex xs12 text-left pt-3>
                              <span class="subh">
                                Balance :&nbsp;

                                <span
                                  class="subh"
                                  style="color: red"
                                  v-if="list.balancepaymentStatus == 'Pending'"
                                >
                                  ₹ {{ list.postBookingamount }} Not Paid
                                </span>
                                <span class="subh" style="color: green" v-else>
                                  ₹ {{ list.advance }} Paid
                                </span>
                              </span>
                            </v-flex>
                          </v-layout>
                        </v-flex>

                        <v-flex xs12 sm12 md2 lg2 xl2 align-self-center>
                          <v-layout wrap justify-end>
                            <v-flex
                              xs12
                              text-left
                              pr-1
                            >
                              <span v-if="list.bookingTotal"
                                style="
                                  font-family: LexendFont;
                                  font-size: 20px;
                                  font-weight: 600;
                                "
                              >
                                ₹ {{ list.vendorNetAmount }}
                              </span>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-flex>
              <v-flex xs12 px-4 pt-3>
                <v-layout wrap>
                  <v-flex xs12>
                    <span
                      style="
                        font-family: LexendFont;
                        color: #f17343;
                        text-transform: none;
                        font-size: 20px;
                        font-weight: 400;
                      "
                    >
                      CUSTOMER DETAILS
                    </span>
                  </v-flex>
                  <v-flex xs12>
                    <v-layout wrap justify-center>
                      <v-flex xs12 sm6 md3 lg3 xl3>
                        <v-layout wrap justify-start>
                          <v-flex xs12>
                            <v-layout wrap>
                              <v-flex xs12 pt-1>
                                <span class="subh"> Name </span>
                              </v-flex>
                              <v-flex xs12 pt-1 class="subheading" v-if="list.customerDetails">
                                <span v-if="list.customerDetails.name">
                                  {{ list.customerDetails.name }}
                                </span>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs12 sm6 md3 lg3>
                        <v-layout wrap justify-start>
                          <v-flex xs12>
                            <v-layout wrap>
                              <v-flex xs12 pt-1>
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
                      <v-flex xs12 sm6 md3 lg3>
                        <v-layout wrap justify-start>
                          <v-flex xs12>
                            <v-layout wrap>
                              <v-flex xs12 pt-1>
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
                      <v-flex xs12 sm6 md3 lg3>
                        <v-layout wrap justify-start>
                          <v-flex xs12>
                            <v-layout wrap>
                              <v-flex xs12 pt-1>
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

              <v-flex xs12 px-4 pt-2>
                <span
                  style="
                    font-family: LexendFont;
                    color: #f17343;
                    text-transform: none;
                    font-size: 20px;
                    font-weight: 400;
                  "
                >
                  PAYMENT DETAILS
                </span>
              </v-flex>
              <v-flex xs12 px-4 pt-2>
                <v-layout wrap justify-center>
                  <v-flex xs12>
                    <v-layout wrap justify-start>
                      <v-flex xs12 sm6 md3 lg1 pr-2>
                        <v-layout wrap>
                          <v-flex xs12>
                            <span class="subh"> Id </span>
                          </v-flex>
                          <v-flex pt-1 xs12 class="subheading">
                            <span>
                              {{ list.bookingNo }}
                            </span>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs12 sm6 md3 lg2>
                        <v-layout wrap>
                          <v-flex xs12>
                            <span class="subh"> Booking On </span>
                          </v-flex>
                          <v-flex pt-1 xs12 class="subheading">
                            <span>
                              {{ formatDate(list.bookedOn) }}
                            </span>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs12 sm6 md3 lg2>
                        <v-layout wrap>
                          <v-flex xs10 text-left>
                            <span class="subh"> Total Amount </span>
                          </v-flex>
                          <v-flex xs10 pt-1 text-left>
                            <span class="subheading">
                              ₹ {{ list.bookingTotal }}
                            </span>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs12 sm6 md3 lg2>
                        <v-layout wrap>
                          <v-flex xs10 text-left>
                            <span class="subh"> Advance Paid </span>
                          </v-flex>
                          <v-flex xs10 pt-1 text-left>
                            <span class="subheading">
                              ₹ {{ list.advance }}
                            </span>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs12 sm6 md3 lg2>
                        <v-layout wrap>
                          <v-flex xs12 text-left>
                            <span class="subh"> Balance Amount </span>
                          </v-flex>
                          <v-flex xs12 pt-1 text-left v-if="list.postBookingamount">
                            <span class="subheading">
                              ₹ {{ list.postBookingamount }}
                            </span>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs6 lg3>
                        <v-layout wrap>
                          <v-flex xs12 text-left>
                            <span class="subh"> Status of Balance Amount </span>
                          </v-flex>
                          <v-flex xs12 pt-1 text-left>
                            <span
                              class="subheading"
                              v-if="list.balancepaymentStatus == 'Pending'"
                            >
                              Not Paid
                            </span>
                            <span v-else>Paid</span>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-flex>

              <v-flex xs12 pt-3 px-4>
                <v-divider></v-divider>
              </v-flex>
              <v-flex xs12 pt-3 px-4>
                <span
                  style="
                    font-family: LexendFont;
                    color: #f17343;
                    text-transform: none;
                    font-size: 20px;
                    font-weight: 400;
                  "
                >
          BALANCE PAYMENT
                </span>
              </v-flex>
              <v-flex xs12 pt-1 px-4>
                <v-layout wrap>
                  <v-flex xs11 lg3 v-if="advancepaymentMode">
                    <span class="subh" style="text-transform: none"
                      >Payee Deatils</span
                    >
                    <v-autocomplete
                      disabled
                      outlined
                      dense
                      color="black"
                      :items="categorys"
                      v-model="advancepaymentMode"
                      item-text="name"
                      item-color="#FF1313"
                      hide-details="true"
                      class="custom-autocomplete rounded-lg"
                    >
                    </v-autocomplete>

                    <br />
                    <span
                        class="pb-2"
                        style="
                          font-size: 12px;
                          font-weight: 400;
                          font-family: LexendFont;
                          color: red;
                        "
                        >* Balance Payment from {{ advancepaymentMode }}.</span
                      >
                   
                  </v-flex>


                  <v-flex xs11 lg3 v-else>
                    <span class="subh" style="text-transform: none"
                      >Payee Details</span
                    >
                    <br />
                  <span class="subh">
                    Customer
                  </span>
                  <span
                        class="pb-2"
                        style="
                          font-size: 12px;
                          font-weight: 400;
                          font-family: LexendFont;
                          color: red;
                        "
                        >* Balance Payment from Customer.</span
                      >
                  </v-flex>
                  
               

                 
                  <!-- <v-flex
                    xs11
                    lg3
                    pt-7 pl-2
                    v-if="list.advancepaymentMode === 'Agent'&&list.balancepaymentStatus=='Verified'"
                  >
                    <v-btn  color="success" block>
                      <span style="color: white"> Verified Payment </span>
                      <v-icon color="white">mdi-check-circle</v-icon>
                    </v-btn>
                  </v-flex> -->
                  <v-flex
                    xs11
                    lg3
                    pt-7 pl-2
                    v-if="list.advancepaymentMode === 'Agent'&&list.balancepaymentStatus=='Verified'"
                  >
                    <v-btn  color="success" block>
                      <span style="color: white"> Verified Payment </span>
                      <v-icon color="white">mdi-check-circle</v-icon>
                    </v-btn>
                  </v-flex>
                  <v-flex
                    xs11
                    lg3
                    pt-7 pl-2
                    v-if="list.advancepaymentMode === 'Agent'&&list.balancepaymentStatus=='Success'"
                  >
                    <v-btn @click="submitPayment()" color="#F17343" block>
                      <span style="color: white"> Verify Payment </span>
                      <v-icon color="white">mdi-check-circle</v-icon>
                    </v-btn>
                  </v-flex>
                  <v-flex
                    xs11
                    lg2
                    pt-7 pl-2
                    v-if="list.advancepaymentMode === 'Agent'&&list.balancepaymentStatus=='Verified'"
                  >
                  <v-btn
                    color="#F17343"
                    block dark
                    download
                    :href="mediaUURL + list.paymentReceipt"
                    target="_blank"
                  >
                    <v-icon small>mdi-file-document-outline</v-icon
                    ><span
                      style="
                        font-family: LexendFont;
                        font-weight: 400;
                        font-size: 16px;
                        text-transform: none;
                      "
                      >View receipt</span
                    ></v-btn
                  >
                  </v-flex>
                  <v-flex
                    xs11
                    lg2
                    pt-7 pl-2
                    v-if="list.advancepaymentMode === 'Agent'&&list.balancepaymentStatus=='Success'"
                  >
                  <v-btn
                    color="#F17343"
                    block dark
                    download
                    :href="mediaUURL + list.paymentReceipt"
                    target="_blank"
                  >
                    <v-icon small>mdi-file-document-outline</v-icon
                    ><span
                      style="
                        font-family: LexendFont;
                        font-weight: 400;
                        font-size: 16px;
                        text-transform: none;
                      "
                      >View receipt</span
                    ></v-btn
                  >
                  </v-flex>
                  <!-- <v-flex
                      @click="
                        copyToClipboard(list.shikaraid.vendorid.bankDetails.upiId)
                      "
                      xs11
                      sm11
                      md4
                      lg4
                      xl4
                      pt-7
                      v-if="list.advancepaymentMode === 'Agent'"
                    >
                      <div style="display: flex; align-items: center">
                        <span style="color: black"
                          >COPY UPI ID OF THE VENDOR
                        </span>
                        <v-icon
                          color="black"
                          style="cursor: pointer; margin-left: 5px"
                        >
                          mdi-content-copy
                        </v-icon>
                      </div>
                      <div>
                        <span>{{
                          list.shikaraid.vendorid.bankDetails.upiId
                        }}</span>
                      </div>
                    </v-flex>
                    <v-flex
                      xs11
                      sm11
                      md4
                      lg4
                      xl4
                      pt-7
                      v-if="list.advancepaymentMode === 'Agent'"
                    >
                      <span style="color: black"> QR CODE OF THE VENDOR </span>
                      <v-img
                        height="100%"
                        width="100%"
                        style="border-radius: 12px 12px 12px 12px"
                        :src="
                          mediaUURL + list.shikaraid.vendorid.bankDetails.qrCode
                        "
                      ></v-img>
                    </v-flex> -->
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
      shikaraData: {},
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
        url: "/vendor/my/bookings/details/shikara",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          bookingId: this.id,
        },
      })
        .then((response) => {
          this.list = response.data.data;
          this.shikaraData = response.data.data.shikaraid;
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
      this.appLoading = true;
      axios({
        method: "POST",
        url: "/vendor/verify/shikara/payment",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          bookingId: this.id,
        },
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status == true) {
            this.msg = response.data.msg;
            this.snackbar = true;
            this.getList();
            // this.$router.push("/bookings");
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
  <style>
.bg {
  background: url("./../../assets/images/reg1Back.png") no-repeat center center;
}

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
  font-family: LexendFont;
  font-size: 16px;
  font-weight: 400;
}

.subheading {
  color: #000000;
  text-transform: none;
  font-family: LexendFont;
  font-size: 14px;
  font-weight: 400;
}
.subh {
  font-family: LexendRegular;
  font-size: 16px;
  font-weight: 500;
}
.v-autocomplete__content .v-list__tile {
  height: 2px;
}
</style>