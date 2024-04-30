<template>
  <div>
    <vue-element-loading
      :active="appLoading"
      background-color="#FFFFFF"
      color="#F17343"
      spinner="spinner"
    />

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
    <v-layout
      class="LexendRegular"
      wrap
      justify-center
      style="background-color: #f9f9f9; text-transform: none"
    >
      <v-flex xs12 sm9 lg12>
        <v-layout wrap justify-center>
          <v-flex xs12 text-left pt-8 pl-4>
            <span
              style="
                font-weight: 400;
                font-size: 20px;
                font-family: LexendRegular;
                text-transform: none;
              "
              >Your Booking</span
            >
          </v-flex>
        </v-layout>
        <v-layout wrap justify-center py-4>
          <v-flex xs12 sm6>
            <v-card outlined color="white" class="pa-4">
              <v-layout wrap justify-center>
                <v-flex xs12 pt-2>
                  <span
                    v-for="(item1, j) in HouseboatDetail"
                    :key="j"
                    class="pb-2"
                    style="
                      font-size: 22px;
                      font-weight: 400;
                      font-family: LexendRegular;
                    "
                  >
                    {{ item1.houseBoatName }},</span
                  >
                  <!-- <span v-if="j < Object.keys(item1).length - 1">, </span> -->
                </v-flex>

                <v-flex pt-5 xs12 sm3 text-left>
                  <span
                    class="pb-2"
                    style="
                      font-size: 15px;
                      font-weight: 600;
                      font-family: LexendRegular;
                    "
                  >
                    Check In Date</span
                  >
                </v-flex>
                <v-flex pl-5 pt-5 xs12 sm9 text-left>
                  <span
                    class="pb-2"
                    style="
                      font-size: 15px;
                      font-weight: 300;
                      font-family: LexendRegular;
                    "
                  >
                    {{ formatDate(OtherDetails.startDate) }}
                  </span>
                </v-flex>
                <v-flex pt-3 xs12 sm3 text-left>
                  <span
                    class="pb-2"
                    style="
                      font-size: 15px;
                      font-weight: 600;
                      font-family: LexendRegular;
                    "
                  >
                    Check Out Date</span
                  >
                </v-flex>
                <v-flex pl-5 pt-3 xs12 sm9 text-left>
                  <span
                    class="pb-2"
                    style="
                      font-size: 15px;
                      font-weight: 300;
                      font-family: LexendRegular;
                    "
                  >
                    {{ formatDate(OtherDetails.endDate) }}
                  </span>
                </v-flex>
                <v-flex xs12 pt-8 pb-6>
                  <div class="dottedline"></div>
                </v-flex>
                <v-flex xs4>
                  <v-layout wrap>
                    <v-flex xs12 pt-2 v-if="OtherDetails.location">
                      <span
                        v-if="OtherDetails.location.name"
                        style="
                          font-size: 15px;
                          font-weight: 600;
                          font-family: LexendRegular;
                        "
                        >Location</span
                      >
                    </v-flex>
                    <v-flex xs12 pb-2 v-if="OtherDetails.location">
                      <span
                        v-if="OtherDetails.location.name"
                        style="
                          font-size: 15px;
                          font-weight: 400;
                          font-family: LexendRegular;
                        "
                        >{{ OtherDetails.location.name }}</span
                      >
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs4>
                  <v-layout wrap v-if="OtherDetails">
                    <v-flex xs12 pt-2 v-if="OtherDetails.totalRooms">
                      <span
                        style="
                          font-size: 15px;
                          font-weight: 600;
                          font-family: LexendRegular;
                        "
                        >Rooms</span
                      >
                    </v-flex>
                    <v-flex xs12 pb-2 v-if="OtherDetails.totalRooms">
                      <span
                        style="
                          font-size: 15px;
                          font-weight: 400;
                          font-family: LexendRegular;
                        "
                        >{{ OtherDetails.totalRooms }}</span
                      >
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs4>
                  <v-layout wrap>
                    <v-flex xs12 pt-2 v-if="OtherDetails.totalGuests">
                      <span
                        style="
                          font-size: 15px;
                          font-weight: 600;
                          font-family: LexendRegular;
                        "
                        >No of Guests</span
                      >
                    </v-flex>
                    <v-flex xs12 pb-2 v-if="OtherDetails.totalGuests">
                      <span
                        style="
                          font-size: 15px;
                          font-weight: 400;
                          font-family: LexendRegular;
                        "
                        >{{ OtherDetails.totalGuests }}</span
                      >
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs4>
                  <v-layout wrap>
                    <v-flex xs12 pt-2>
                      <span
                        style="
                          font-size: 15px;
                          font-weight: 600;
                          font-family: LexendRegular;
                        "
                        >Trip Type</span
                      >
                    </v-flex>
                    <v-flex xs12 pb-2>
                      <span
                        style="
                          font-size: 15px;
                          font-weight: 400;
                          font-family: LexendRegular;
                        "
                        >{{ OtherDetails.tripType }}</span
                      >
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs4>
                  <v-layout wrap>
                    <v-flex xs12 pt-2>
                      <span
                        style="
                          font-size: 15px;
                          font-weight: 600;
                          font-family: LexendRegular;
                        "
                        >Houseboat Type</span
                      >
                    </v-flex>
                    <v-flex xs12 pb-2>
                      <span
                        style="
                          font-size: 15px;
                          font-weight: 400;
                          font-family: LexendRegular;
                        "
                        >{{ OtherDetails.houseBoatType }}</span
                      >
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs4>
                  <v-layout wrap>
                    <v-flex xs12 pt-2>
                      <span
                        style="
                          font-size: 15px;
                          font-weight: 600;
                          font-family: LexendRegular;
                        "
                        >Category</span
                      >
                    </v-flex>
                    <v-flex xs12 pb-2>
                      <span
                        style="
                          font-size: 15px;
                          font-weight: 400;
                          font-family: LexendRegular;
                        "
                        >{{ OtherDetails.category }}</span
                      >
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex class="vertical-divider">
            <div class="divider"></div>
          </v-flex>
          <v-flex xs12 sm5>
            <v-card elevation="0">
              <v-layout wrap justify-center pb-10>
                <v-flex xs10 pt-8>
                  <span
                    style="
                      color: #f17343;
                      text-transform: none;
                      font-size: 20px;
                      font-weight: 500;
                    "
                  >
                    Guest Details
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
                    outlined
                    color="orange"
                    v-model="agentDetails.phoneNumber"
                    :rules="phoneNumberRules"
                    required
                  ></v-text-field>
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
            <v-card outlined color="white" class="pa-4">
              <v-layout wrap justify-center>
                <v-flex xs12>
                  <span
                    class="pb-2"
                    style="
                      font-size: 25px;
                      font-weight: 400;
                      font-family: LexendRegular;
                      color: #f17343;
                    "
                  >
                    Booking summary</span
                  >
                </v-flex>
              </v-layout>
              <v-layout wrap justify-center>
                <v-flex xs8 sm8 text-left>
                  <v-layout wrap>
                    <v-flex xs12 pt-4>
                      <span
                        class="pb-2"
                        style="
                          font-size: 16px;
                          font-weight: 400;
                          font-family: LexendRegular;
                        "
                        >Total Amount</span
                      ></v-flex
                    >
                    <v-flex xs12 pt-4>
                      <span
                        class="pb-2"
                        style="
                          font-size: 16px;
                          font-weight: 400;
                          font-family: LexendRegular;
                        "
                        >Advance</span
                      ></v-flex
                    >
                    <!-- <v-flex xs12 pt-4>
                      <span
                        class="pb-2"
                        style="
                          font-size: 16px;
                          font-weight: 400;
                          font-family: LexendRegular;
                        "
                        >GST</span
                      ></v-flex
                    > -->
                    <v-flex xs12 pt-4>
                      <span
                        class="pb-2"
                        style="
                          font-size: 16px;
                          font-weight: 400;
                          font-family: LexendRegular;
                        "
                        >Balance Payment Amount</span
                      ></v-flex
                    >

                    <v-flex xs12 pt-7>
                      <span
                        class="pb-2"
                        style="
                          font-size: 16px;
                          font-weight: 400;
                          font-family: LexendRegular;
                        "
                        >Mode of Payment</span
                      ></v-flex
                    >
                    <!-- <v-flex xs12 pt-4>  <span
                      class="pb-2"
                      style="
                        font-size: 16px;
                        font-weight: 400;
                        font-family: LexendRegular;
                      ">Post Booking Amount</span></v-flex> -->
                  </v-layout>
                </v-flex>
                <v-flex xs4 sm4 text-right>
                  <v-layout wrap>
                    <v-flex xs12 pt-4>
                      <span
                        class="pb-2"
                        style="
                          font-size: 16px;
                          font-weight: 300;
                          font-family: LexendRegular;
                        "
                        >₹{{ OtherDetails.totalAmount }}</span
                      ></v-flex
                    >

                    <v-flex xs12 pt-4>
                      <span
                        class="pb-2"
                        style="
                          font-size: 16px;
                          font-weight: 300;
                          font-family: LexendRegular;
                        "
                        >₹{{ OtherDetails.payableAmount }}</span
                      ></v-flex
                    >

                    <!-- <v-flex xs12 pt-4>
                      <span
                        class="pb-2"
                        style="
                          font-size: 16px;
                          font-weight: 300;
                          font-family: LexendRegular;
                        "
                        >₹{{ OtherDetails.gstAmount }}</span
                      ></v-flex
                    > -->
                    <v-flex xs12 pt-4>
                      <span
                        class="pb-2"
                        style="
                          font-size: 16px;
                          font-weight: 300;
                          font-family: LexendRegular;
                        "
                        >₹{{ OtherDetails.balancePayAmount }}</span
                      ></v-flex
                    >
                    <v-flex xs12 pt-10 pt-4>
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
                        clearable
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
                      </v-autocomplete></v-flex
                    >

                    <!-- <v-flex xs12 pt-4>  <span
                      class="pb-2"
                      style="
                        font-size: 16px;
                        font-weight: 300;
                        font-family: LexendRegular;
                      ">{{ amt.postBookingamount }}</span></v-flex> -->
                  </v-layout>
                </v-flex>
                <v-flex xs12 pt-8 pb-6>
                  <div class="dottedline"></div>
                </v-flex>
              </v-layout>
              <v-layout wrap>
                <v-flex xs12
                  ><v-btn
                    @click="validatFeilds()"
                    block
                    dark
                    tile
                    color="rgba(241, 115, 67, 1)"
                  >
                    <span
                      style="
                        font-size: 18px;
                        font-weight: 400;
                        font-family: LexendRegular;
                        color: white;
                      "
                      >Book Now</span
                    >
                  </v-btn></v-flex
                >
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

      OtherDetails: {},
      address: "",
      email: "",
      userid: this.$route.query.userid,

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
            console.log("HouseboatDetail=", this.HouseboatDetail);
            this.OtherDetails = response.data.data;
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
      
      // else if (!this.agentDetails.email) {
      //   this.msg = "Please enter email";
      //   this.snackbar = true;
      //   return;
      // } 
      
      else if (!this.agentDetails.phoneNumber) {
        this.msg = "Please enter Phone number";
        this.snackbar = true;
        return;
      } 
      
      // else if (!this.agentDetails.address) {
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
            this.url = response.data.url;
              //   this.msg = "Booking Successful";
              //   this.snackbar = true;
              window.location.href = this.url;
            this.snackbar = true;
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
<style scoped>
.vertical-divider {
  display: flex;
  align-items: center;
}

.divider {
  width: 1px;
  height: 100%;
  background-color: #ccc;
  /* Adjust the color as needed */
  margin: 0 auto;
  /* Center the divider */
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