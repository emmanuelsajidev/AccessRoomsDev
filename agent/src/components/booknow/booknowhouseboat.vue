<template>
  <div>
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
      <!-- <v-flex xs12>
                <span style="font-family: LexendRegular;font-size: 25px;font-weight: 500;color: #313131;">Book Now</span>
            </v-flex> -->

      <v-flex xs11 lg12 pt-6>
        <v-card elevation="0">
          <v-layout pb-4 wrap justify-center>
            <v-flex xs11 pt-6 pb-4 class="LexendRegular">
              <span
                style="
                  color: #f17343;
                  text-transform: none;
                  font-size: 20px;
                  font-weight: 500;
                "
              >
                House Boat Details
              </span>
            </v-flex>
            <v-flex xs11 md11 lg6 pb-lg-6 pb-0>
              <v-layout
                wrap
                justify-left
                v-for="(item, i) in HouseboatDetail"
                :key="i"
              >
                <v-flex xs12 sm6 md6 lg6 xl3>
                  <v-layout wrap>
                    <v-flex xs6 lg12 text-left>
                      <span class="heading"> House Boat Name </span>
                    </v-flex>
                    <v-flex xs6 lg12 text-left >
                      <span class="subheading">
                        {{ item.houseBoatName }}
                      </span>
                    </v-flex>
                  </v-layout>
                </v-flex>

                <v-flex xs12 sm6 md6 lg6 xl3>
                  <v-layout wrap>
                    <v-flex xs6 lg12 text-left>
                      <span class="heading"> Total Rooms </span>
                    </v-flex>
                    <v-flex xs6 lg12 text-left >
                      <span class="subheading">
                        {{ totalRoomsor }}
                      </span>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs11 md11  lg5>
                <v-layout wrap>
                    <v-flex xs12 sm6 md6 lg6 xl3>
                  <v-layout wrap>
                    <v-flex xs6 md6 lg12 text-left>
                      <span class="heading"> check In Time </span>
                    </v-flex>
                    <v-flex xs6 md6 lg12 text-left >
                      <span class="subheading">
                        {{ tripDetails.checkInTime }}
                      </span>
                    </v-flex>
                  </v-layout>
                </v-flex>

                <v-flex xs12 sm6 md6 lg6 xl3>
                  <v-layout wrap>
                    <v-flex xs6 lg12 text-left>
                      <span class="heading"> check Out Time </span>
                    </v-flex>
                    <v-flex xs6 lg12 text-left >
                      <span class="subheading">
                        {{ tripDetails.checkOutTime }}
                      </span>
                    </v-flex>
                  </v-layout>
                </v-flex>
                </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs11 lg12 pt-6>
        <v-card elevation="0">
          <v-layout pb-4 wrap justify-center>
            <v-flex xs11 pt-6 pb-4 class="LexendRegular">
              <span
                style="
                  color: #f17343;
                  text-transform: none;
                  font-size: 20px;
                  font-weight: 500;
                "
              >
                Booking Details
              </span>
            </v-flex>
            <v-flex xs11  pb-lg-6 pb-0 pl-0>
              <v-layout wrap >
                <v-flex xs12 sm6 md6 lg2 xl2 v-if="OtherDetails.location">
                  <v-layout wrap>
                    <v-flex xs6 lg12 text-left>
                      <span class="heading"> Location </span>
                    </v-flex>
                    <v-flex xs6 lg12 text-left >
                      <span class="subheading">
                        {{ OtherDetails.location.name }}
                      </span>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 sm6 md6 lg2 xl2>
                  <v-layout wrap>
                    <v-flex xs6 lg12 text-left>
                      <span class="heading"> Adults </span>
                    </v-flex>
                    <v-flex xs6 lg12 text-left >
                      <span class="subheading">
                        {{ OtherDetails.noOfAdults }}
                      </span>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 sm6 md6 lg2 xl2>
                  <v-layout wrap>
                    <v-flex xs6 lg12 text-left>
                      <span class="heading"> Children </span>
                      <span style="font-size: 10px;color: red;font-family: LexendRegular;">
                        (Ages below 5 years) </span>
                    </v-flex>
                    <v-flex xs6 lg12 text-left  v-if="OtherDetails">
                      <span class="subheading">
                        {{ OtherDetails.noOfChildren }}
                      </span>
                    </v-flex>
                    <v-flex xs6 lg12 text-left  v-else>
                      <span class="subheading"> Nil </span>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex pl-2 xs12  sm6 md6 lg2 xl2>
                  <v-layout wrap>
                    <v-flex xs6 lg12 text-left>
                      <span class="heading"> Check in date </span>
                    </v-flex>
                    <v-flex xs6 lg12 text-left >
                      <span class="subheading">
                        {{ formatDate(OtherDetails.startDate) }}
                      </span>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 sm6 md6 lg2 xl2>
                  <v-layout wrap>
                    <v-flex xs6 lg12 text-left>
                      <span class="heading"> Check out date </span>
                    </v-flex>
                    <v-flex xs6 lg12 text-left >
                      <span class="subheading">
                        {{ formatDate(OtherDetails.endDate) }}
                      </span>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 sm6 md6 lg2 xl2>
                  <v-layout wrap>
                    <v-flex xs6 lg12 text-left>
                      <span class="heading"> Category </span>
                    </v-flex>
                    <v-flex xs6 lg12 text-left >
                      <span class="subheading">
                        {{ OtherDetails.category }}
                      </span>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-layout wrap justify-center>
          <v-flex xs11 lg6 pt-7 pr-lg-8 pr-xs-0>
            <v-card elevation="0">
              <v-layout wrap justify-center pb-10>
                <v-flex xs10 pt-8>
                  <span
                    style="
                      font-family: LexendRegular;
                      color: #f17343;
                      text-transform: none;
                      font-size: 20px;
                      font-weight: 500;
                    "
                  >
                    Guest Details
                    <span style="
                      font-family: LexendRegular;
                      color: red;
                      font-weight: bold;
                      text-transform: none;
                      font-size: 12px;
                      font-weight: 500;
                    ">
                    (Name and Phone number are mandatory)

                    </span>
                  </span>
                </v-flex>
                <v-flex xs10 pt-5>
                  <span class="formfont">Name</span>

                  <v-text-field
                    type="text"
                    dense
                    hide-details="true"
                    outlined
                    color="orange"
                    v-model="agentDetails.name"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs10 pt-5>
                  <span class="formfont">Email</span>

                  <v-text-field
                    :rules="emailRules"
                    dense
                    outlined
                    color="orange"
                    type="email"
                    v-model="agentDetails.email"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs10>
                  <span class="formfont">Phone Number</span>

                  <v-text-field
                    type="number"
                    hide-spin-buttons
                    dense
                    :rules="phoneNumberRules"
                    outlined
                    color="orange"
                    v-model="agentDetails.phoneNumber"
                    required
                  >
                  </v-text-field>
                </v-flex>
                <v-flex xs10>
                  <span class="formfont">Address</span>

                  <v-textarea
                    type="number"
                    height="80px"
                    hide-details="true"
                    outlined
                    color="orange"
                    v-model="agentDetails.address"
                    required
                  ></v-textarea>
                </v-flex>
                <!-- <v-flex xs10 pt-5>
                                    <span class="formfont"> Registered Company Name</span>

                                    <v-text-field color="orange" dense hide-details="true" outlined
                                        v-model="agentDetails.regCompanyaName" required></v-text-field>

                                </v-flex> -->
                <!-- <v-flex xs10 pt-5>
                                    <span class="formfont">Registered Company Address</span>
                                    <v-text-field color="orange" dense hide-details="true" outlined
                                        v-model="agentDetails.regCompanyAddress" required></v-text-field>

                                </v-flex> -->
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex xs11 lg6 pt-7 pl-lg-8 pl-xs-0>
            <v-card elevation="0">
              <v-layout wrap justify-center pb-12 style="font-weight: 500">
                <v-flex xs10 pt-10>
                  <span
                    style="
                      font-family: LexendRegular;
                      color: #f17343;
                      text-transform: none;
                      font-size: 20px;
                      font-weight: 500;
                    "
                  >
                    Booking Summary
                  </span>
                </v-flex>
                <v-flex xs10 pt-13>
                  <v-layout wrap>
                    <v-flex xs6 text-left>
                      <span class="formfont"> Total Booking Amount</span>
                    </v-flex>
                    <v-flex xs6 text-right>
                      <span class="formfont"
                        >₹{{ OtherDetails.totalAmount }}</span
                      >
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs10 pt-6 class="formfont">
                  <v-layout wrap>
                    <v-flex xs6 text-left>
                      <span class="formfont">Advance (30%)</span>
                    </v-flex>
                    <v-flex xs6 text-right>
                      <span class="formfont"
                        >₹{{ OtherDetails.payableAmount }}</span
                      >
                    </v-flex>
                  </v-layout>
                </v-flex>
                <!-- <v-flex xs10 pt-7>
                                    <v-layout wrap>
                                        <v-flex xs6 text-left>
                                            <span class="formfont">GST</span>
                                        </v-flex>
                                        <v-flex xs6 text-right>
                                            <span class="formfont">₹{{ OtherDetails.gstAmount }}</span>
                                        </v-flex>
                                    </v-layout>
                                </v-flex> -->

                <v-flex xs10 pt-7>
                  <v-layout wrap>
                    <v-flex xs6 text-left>
                      <span class="formfont">Balance Amount(70%)</span><br />
                      <span class="formfont" style="font-size: 12px"
                        >To be paid before checkin</span
                      >
                    </v-flex>
                    <v-flex xs6 text-right>
                      <span class="formfont"
                        >₹{{ OtherDetails.balancePayAmount }}</span
                      >
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs10 pt-7>
                  <v-layout wrap>
                    <v-flex xs8 text-left>
                      <span class="formfont"
                        >Mode of Payment (Balance Amount)</span
                      >
                    </v-flex>
                    <v-flex xs4 text-right>
                      <v-autocomplete
                        height="4px"
                        outlined
                        flat
                        solo
                        dense
                        color="black"
                        :items="types"
                        v-model="advancepaymentMode"
                        item-text="name"
                        item-color="#FF1313"
                        hide-details="true"
                      >
                        <template v-slot:append>
                          <v-layout wrap>
                            <v-flex xs12 pt-1>
                              <v-icon color="black">mdi-chevron-down</v-icon>
                            </v-flex>
                          </v-layout>
                        </template>
                        <template v-slot:label>
                          <span
                            class="custom-label-text"
                            style="color: black; font-size: 12px"
                          >
                            Type</span
                          >
                        </template>
                      </v-autocomplete>
                    </v-flex>
                    <!-- <v-flex xs4 text-right class="formfont">
                                            ₹200.0
                                        </v-flex> -->
                  </v-layout>
                </v-flex>
                <v-flex xs10 pt-4>
                  <v-img
                    height="30px"
                    contain
                    src="./../../assets/images/pattern2.png"
                  ></v-img>
                </v-flex>
                <!-- <v-flex xs10 pt-6>
                                    <v-layout wrap>
                                        <v-flex xs6 text-left>
                                            <span class="formfont">Total Payable Amount</span>
                                        </v-flex>
                                        <v-flex xs6 text-right>
                                            <span class="formfont">₹500.0</span>
                                        </v-flex>
                                    </v-layout>
                                </v-flex> -->
                <v-flex xs10 pt-6>
                  <v-layout wrap>
                    <v-flex>
                      <v-btn block color="#FF6200" @click="validatFeilds()">
                        <span
                          style="
                            text-transform: none;
                            color: white;
                            font-family: LexendRegular;
                          "
                          >Pay Now
                         
                        </span>
                      </v-btn>
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
// import store from "./../store";
export default {
  data() {
    return {
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      phoneNumberRules: [
        (v) => !!v || "Phone number is required",
        (v) => (v && v.length === 10) || "Phone number must be 10 digits",
        (v) => /^\d+$/.test(v) || "Phone number must contain only digits",
      ],
      snackbar: false,
      timeout: 2000,
      ServerError: false,
      appLoading: false,
      advancepaymentMode: null,
      msg: "",
      HouseboatDetail: [],
      types: ["Guest", "Driver", "Agent"],
      totalRoomsor:"",
      OtherDetails: {},
      address: "",
      email: "",
      tripDetails:{},
      agentRateCommission:this.$route.query.agentRateCommission,
      userid: this.$route.query.userid,
      houseBoatIds: [],
      agentDetails: {
        name: "",
        email: "",
        phoneNumber: "",
        regCompanyaName: "",
        regCompanyAddress: "",
        address: "",
      },
      number: "",
      fname: "",
    };
  },

  created() {
    const {
      Hcategory,
      Htype,
      Hroom,
      Hadult,
      Hchildren,
      HcheckInDate,

      Hlocation,
      Htriptype,
      HcheckOutDate,
    } = this.$route.query;
    this.Hcategory = Hcategory || this.Hcategory;
    this.Htype = Htype || this.Htype;
    this.Hlocation = Hlocation || this.Hlocation;
    this.Hroom = Hroom || this.Hroom;
    this.Hadult = Hadult || this.Hadult;
    this.Hchildren = Hchildren || this.Hchildren;
    this.Htriptype = Htriptype || this.Htriptype;
    this.HcheckInDate = HcheckInDate || this.HcheckInDate;
    this.HcheckOutDate = HcheckOutDate || this.HcheckOutDate;
  },
  computed: {
    SKsearchItems() {
      return this.$store.state.SKsearchItems;
    },
    HBsearchItems() {
      return this.$store.state.HBsearchItems;
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.appLoading = true;
      axios({
        method: "POST",
        url: "/agent/houseboatbooked/view",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          id: this.$route.query.uid,
          // id: this.$route.query.userid,
        },
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status) {
            this.HouseboatDetail = response.data.data.houseBoatIds;
            this.totalRoomsor = response.data.data.totalRooms;
            console.log("hgbj",this.totalRoomsor)
            this.OtherDetails = response.data.data;
            this.tripDetails =  response.data.tripDetails;
            // this.houseBoatIds = this.HouseboatDetail.houseBoatIds;
          } else {
            this.msg = response.data.msg;
            this.snackbar = true;
          }
        })
        .catch((err) => {
          this.appLoading = false;
          console.log(err);
          this.ServerError = true;
        });
    },
    isValidEmail(value) {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value);
    },
    isValidPhoneNumber(value) {
      const phoneRules = [
        (v) => !!v || "Phone number is required",
        (v) =>
          (v && v.length === 10) ||
          "Invalid number length (should be 10 digits)",
        (v) => /^\d+$/.test(v) || "Phone number must be a number",
      ];

      for (const rule of phoneRules) {
        const result = rule(value);
        if (typeof result === "string") {
          return result; // Return the error message if the rule is not satisfied
        }
      }

      return true; // All rules passed, phone number is valid
    },

    validatFeilds() {
      if (!this.agentDetails.name) {
        this.msg = "Please enter name";
        this.snackbar = true;
        return;
      }
      //  else if (!this.agentDetails.email) {
      //   this.msg = "Please enter email";
      //   this.snackbar = true;
      //   return;
      // }
       else if (!this.agentDetails.phoneNumber) {
        this.msg = "Please enter Phone number";
        this.snackbar = true;
        return;
      }
      //  else if (!this.agentDetails.address) {
      //   this.msg = "Please enter Address";
      //   this.snackbar = true;
      //   return;
      // }
       else if (!this.advancepaymentMode) {
        this.msg = "Please enter mode of payment";
        this.snackbar = true;
        return;
      }

      // else if (!this.agentDetails.regCompanyaName) {
      //     this.msg = "Please enter Registered Company Name";
      //     this.snackbar = true;
      //     return;
      // }
      // else if (!this.agentDetails.regCompanyAddress) {
      //     this.msg = "Please enter Registered Company Address";
      //     this.snackbar = true;
      //     return;
      // }
      else {
        this.submitPayment();
      }
    },

    submitPayment() {
      this.appLoading = true;
      axios({
        method: "POST",
        url: "/agent/houseboat/checkout",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          bookingId: this.$route.query.uid,
          fullName: this.agentDetails.name,
          email: this.agentDetails.email,
          phoneNumber: this.agentDetails.phoneNumber,
          address: this.agentDetails.address,
          totalAmount: this.OtherDetails.totalAmount,
          gstAmount: this.OtherDetails.gstAmount,
          payableAmount: this.OtherDetails.payableAmount,
          advanceAmount: this.OtherDetails.advanceAmountPaid,

          advancepaymentMode: this.advancepaymentMode,
        },
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status == true) {
            // this.msg = "Booking Successfull";
            // location.reload();
            // this.snackbar = true;
            // // this.$router.push("/bookings");
            this.url = response.data.url;
            //   this.msg = "Booking Successful";
            //   this.snackbar = true;
            window.location.href = this.url;
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
    BookHouseboat() {
      this.appLoading = true;
      var headers1 = {};
      if (this.appLogin) {
        headers1 = {
          token: localStorage.getItem("token"),
        };
      }
      axios({
        headers: headers1,
        method: "POST",
        url: "/customer/houseboat/checkout",
        data: {
          guestId: localStorage.getItem("guestId"),
          totalAmount: this.OtherDetails.totalAmount,
          gstAmount: this.OtherDetails.gstAmount,
          payableAmount: this.OtherDetails.payableAmount,
          advanceAmount: this.OtherDetails.advanceAmountPaid,
          fullName: this.fname,
          phoneNumber: this.number,
          email: this.email,
          address: this.address,
          bookingId: this.$route.query.id,
        },
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status) {
            // this.$router.push("/myBookings");
            const url = response.data.url;
            window.open(url, "_blank");
          } else {
            this.msg = response.data.msg;
            this.snackbar = true;
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
<style>
.heading {
  color: #000000;
  text-transform: none;
  font-family: LexendRegular;
  font-size: 16px;
}

.subheading {
  color: #000000;
  text-transform: none;
  font-family: LexendRegular;
  font-size: 13px;
  font-weight: 600;
}

.formfont {
  color: #000000;
  text-transform: none;
  font-family: LexendRegular;
  font-size: 14px;
  font-weight: 600;
}

.v-autocomplete__content .v-list__tile {
  height: 2px;
}
</style>