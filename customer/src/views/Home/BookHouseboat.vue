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
      right top
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
      <v-flex xs12 sm9>
        <v-layout wrap justify-center>
          <v-flex xs12 text-left pt-8>
            <span
              style="
                font-weight: 400;
                font-size: 20px;
                font-family: LexendFont;
                text-transform: none;
              "
              >Your Booking</span
            > <span
                    class="pb-2"
                    style="
                      font-size: 18px;
                      font-weight: 500;
                      font-family: LexendFont;
                    "
                  >
                    (Houseboat)</span
                  >
          </v-flex>
        </v-layout>
        <v-layout wrap justify-center py-4>
          <v-flex xs12 sm6>
            <v-card outlined color="white" class="pa-4">
              <v-layout wrap >
                <v-flex xs12
                  ><v-card elevation="0" v-if="HouseboatDetail">
                    <v-img
                cover
                height="200px"
                v-if="coverImg"
                :src="mediaUURL + coverImg"
                ><template v-slot:placeholder>
                  <ImageLoader />
                </template></v-img>
                    <v-img v-else height="300px" src="./../../assets/images/noimg.png">
                        <template v-slot:placeholder>
                  <ImageLoader />
                </template>
                    </v-img>
                  </v-card></v-flex
                >
                <v-flex xs12 pt-2>
                  <span
                    v-for="(item1, j) in HouseboatDetail"
                    :key="j"
                    class="pb-2"
                    style="
                      font-size: 25px;
                      font-weight: 400;
                      font-family: LexendFont;
                    "
                  >
                    {{ item1.houseBoatName }}
                  <span v-if="j < Object.keys(HouseboatDetail).length - 1">, </span></span
                  >
                </v-flex>
                <!-- <v-flex xs12 text-center>
                  <span
                    class="pb-2"
                    style="
                      font-size: 18px;
                      font-weight: 500;
                      font-family: LexendFont;
                    "
                  >
                    Houseboat</span
                  >
                </v-flex> -->
                <v-flex xs12 sm3 text-left>
                  <span
                    class="pb-2"
                    style="
                      font-size: 15px;
                      font-weight: 600;
                      font-family: LexendFont;
                    "
                  >
                    Check-in</span
                  >
                </v-flex>
                <v-flex xs12 sm9 text-left>
                  <span
                    class="pb-2"
                    style="
                      font-size: 15px;
                      font-weight: 300;
                      font-family: LexendFont;
                    "
                  >
                    {{ formatDate(OtherDetails.startDate) }}
                  </span>
                </v-flex>
                <v-flex xs12 sm3 text-left>
                  <span
                    class="pb-2"
                    style="
                      font-size: 15px;
                      font-weight: 600;
                      font-family: LexendFont;
                    "
                  >
                    Check-out</span
                  >
                </v-flex>
                <v-flex xs12 sm9 text-left>
                  <span
                    class="pb-2"
                    style="
                      font-size: 15px;
                      font-weight: 300;
                      font-family: LexendFont;
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
                          font-family: LexendFont;
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
                          font-family: LexendFont;
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
                          font-family: LexendFont;
                        "
                        >Rooms</span
                      >
                    </v-flex>
                    <v-flex xs12 pb-2 v-if="OtherDetails.totalRooms">
                      <span
                        style="
                          font-size: 15px;
                          font-weight: 400;
                          font-family: LexendFont;
                        "
                        >{{ OtherDetails.totalRooms }}</span
                      >
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs4>
                  <v-layout wrap>
                    <v-flex xs12 pt-2 v-if="OtherDetails.noOfAdults">
                      <span
                        style="
                          font-size: 15px;
                          font-weight: 600;
                          font-family: LexendFont;
                        "
                        >Adults</span
                      >
                    </v-flex>
                    <v-flex xs12 pb-2 v-if="OtherDetails.noOfAdults">
                      <span
                        style="
                          font-size: 15px;
                          font-weight: 400;
                          font-family: LexendFont;
                        "
                        >{{ OtherDetails.noOfAdults }}</span
                      >
                    </v-flex>
                  </v-layout>
                </v-flex>


                <v-flex xs4>
                  <v-layout wrap>
                    <v-flex xs12 pt-2 v-if="OtherDetails.noOfChildren">
                      <span
                        style="
                          font-size: 15px;
                          font-weight: 600;
                          font-family: LexendFont;
                        "
                        >Children </span>
                        <span style="font-size: 10px;color: red;font-family: LexendRegular;">
                        (Ages below 5 years) </span>
                    </v-flex>
                    <v-flex xs12 pb-2 v-if="OtherDetails.noOfChildren">
                      <span
                        style="
                          font-size: 15px;
                          font-weight: 400;
                          font-family: LexendFont;
                        "
                        >{{ OtherDetails.noOfChildren }}</span
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
                          font-family: LexendFont;
                        "
                        >Trip type</span
                      >
                    </v-flex>
                    <v-flex xs12 pb-2>
                      <span
                        style="
                          font-size: 15px;
                          font-weight: 400;
                          font-family: LexendFont;
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
                          font-family: LexendFont;
                        "
                        >Houseboat type</span
                      >
                    </v-flex>
                    <v-flex xs12 pb-2>
                      <span
                        style="
                          font-size: 15px;
                          font-weight: 400;
                          font-family: LexendFont;
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
                          font-family: LexendFont;
                        "
                        >Category</span
                      >
                    </v-flex>
                    <v-flex xs12 pb-2>
                      <span
                        style="
                          font-size: 15px;
                          font-weight: 400;
                          font-family: LexendFont;
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
            <v-card outlined color="white" class="pa-4">
              <v-layout wrap justify-center>
                <v-flex xs12>
                  <span
                    class="pb-2"
                    style="
                      font-size: 20px;
                      font-weight: 400;
                      font-family: RobotoRegular;
                      color: rgba(241, 115, 67, 1);
                    "
                  >
                    Add Guest details</span
                  >
                </v-flex>
                <v-flex xs12 pt-4>
                  <span
                    class="pb-2"
                    style="
                      font-size: 16px;
                      font-weight: 400;
                      font-family: LexendFont;
                    "
                  >
                    First and last name</span
                  >
                  <v-text-field
                    dense
                    outlined
                    type="text"
                    hide-details="auto"
                    v-model="fname"
                  >
                  </v-text-field>
                </v-flex>
                <v-flex xs12 pt-4>
                  <span
                    class="pb-2"
                    style="
                      font-size: 16px;
                      font-weight: 400;
                      font-family: LexendFont;
                    "
                  >
                    Email address</span
                  >
                  <v-text-field
                    dense
                    outlined
                    type="email"
                    :rules="[rules.email]"
                    hide-details="auto"
                    v-model="email"
                  >
                  </v-text-field>
                </v-flex>
                <v-flex xs12 pt-4>
                  <span
                    class="pb-2"
                    style="
                      font-size: 16px;
                      font-weight: 400;
                      font-family: LexendFont;
                    "
                  >
                    Mobile number</span
                  >
                  <v-text-field
                    dense
                    outlined
                    :rules="phoneRules"
                    type="number"
                    hide-spin-buttons
                    hide-details="auto"
                    v-model="number"
                  >
                  </v-text-field>
                </v-flex>
                <v-flex xs12 pt-4>
                  <span
                    class="pb-2"
                    style="
                      font-size: 16px;
                      font-weight: 400;
                      font-family: LexendFont;
                    "
                  >
                    Address</span
                  >
                  <v-textarea
                    dense
                    outlined
                    type="text"
                    hide-details="auto"
                    v-model="address"
                  >
                  </v-textarea>
                </v-flex>
              </v-layout>
            </v-card>
            <v-card outlined color="white" class="pa-4">
              <v-layout wrap justify-center>
                <v-flex xs12>
                  <span
                    class="pb-2"
                    style="
                      font-size: 20px;
                      font-weight: 400;
                      font-family: RobotoRegular;
                      color: rgba(241, 115, 67, 1);
                    "
                  >
                    Booking summary</span
                  >
                </v-flex>
              </v-layout>
              <v-layout wrap justify-center>
                <v-flex xs12  text-left>
                  <v-layout wrap>
                    <v-flex xs12 sm8 pt-4>
                      <span
                        class="pb-2"
                        style="
                          color: #000000;
    text-transform: none;
    font-size: 14px;
    font-weight: 600;
                          font-family: LexendFont;
                        "
                        >Total Booking Amount</span
                      ></v-flex
                    > <v-flex xs12 sm4 pt-4>
                      <span
                        class="pb-2"
                        style="
                          color: #000000;
    text-transform: none;
    font-size: 14px;
    font-weight: 600;
                          font-family: LexendFont;
                        "
                        >₹ {{ OtherDetails.totalAmount }}</span
                      ></v-flex
                    >
                    </v-layout>
                    <!-- <v-flex xs12 pt-4>
                      <span
                        class="pb-2"
                        style="
                          font-size: 16px;
                          font-weight: 400;
                          font-family: LexendFont;
                        "
                        >GST</span
                      ></v-flex
                    > -->
                  <v-layout wrap>

                    <v-flex xs12 sm8 pt-4>
                      <span
                        class="pb-2"
                        style="
                         color: #000000;
    text-transform: none;
    font-size: 14px;
    font-weight: 600;
                          font-family: LexendFont;
                        "
                        >Advance(30%)</span
                      ></v-flex
                    >  <v-flex xs12 sm4 pt-4>
                      <span
                        class="pb-2"
                        style="
                          color: #000000;
    text-transform: none;
    font-size: 14px;
    font-weight: 600;
                          font-family: LexendFont;
                        "
                        >₹ {{ OtherDetails.payableAmount }}</span
                      ></v-flex
                    >
                    </v-layout>
                  <v-layout wrap>

                    <v-flex xs12 sm8 pt-4>
                      <span
                        class="pb-2"
                        style="
                          color: #000000;
    text-transform: none;
    font-size: 14px;
    font-weight: 600;
                          font-family: LexendFont;
                        "
                        >Balance Amount(70%)<br/></span>
                        <span
                        class="pb-2"
                        style="
                          font-size: 12px;
                          font-weight: 400;
                          font-family: LexendFont;
                          color: red;
                        "
                        >* Balance Payment in Houseboat is required prior to check-in.</span
                      ></v-flex
                    >
                    <v-flex xs12 sm4 pt-4>
                      <span
                        class="pb-2"
                        style="
                          color: #000000;
    text-transform: none;
    font-size: 14px;
    font-weight: 600;
                          font-family: LexendFont;
                        "
                        >₹ {{ OtherDetails.balancePayAmount }}</span
                      ></v-flex
                    >
                    <!-- <v-flex xs12 pt-4>  <span
                    class="pb-2"
                    style="
                      font-size: 16px;
                      font-weight: 400;
                      font-family: LexendFont;
                    ">Post Booking Amount</span></v-flex> -->
                  </v-layout>
                </v-flex>
                <v-flex xs12 pt-8 pb-6>
                  <div class="dottedline"></div>
                </v-flex>
              </v-layout>
              <v-layout wrap>
                <v-flex xs12
                  ><v-btn
                    @click="validation()"
                    block
                    dark
                    tile
                    color="rgba(241, 115, 67, 1)"
                  >
                    <span
                      style="
                        font-size: 18px;
                        font-weight: 400;
                        font-family: LexendFont;
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
      showSnackbar: false,
      timeout: 2000,
      ServerError: false,
      appLoading: false,
      msg: "",
      HouseboatDetail: [],
      OtherDetails: {},
      address: "",
      email: "",
      number: "",
      fname: "",
      coverImg:null,
      phoneRules: [
        (v) => !!v || "Phone number is required",
        (v) =>
          (v && v.length >= 7 && v.length <= 15) ||
          "Invalid number length (between 7 and 15 digits)",
        (v) =>
          /^\d{7,15}$/.test(v) ||
          "Phone number must be a number with 7 to 15 digits",
      ],
      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) => value.length <= 20 || "Max 20 characters",

        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
        password: (value) => {
          const pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
          return (
            pattern.test(value) ||
            "Password must contain at least one number, one uppercase and lowercase letter, and be at least 8 characters long."
          );
        },
      },
    };
  },
  computed: {
    appLogin() {
      return this.$store.state.isLoggedIn;
    },
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
      var headers1 = {};
      if (this.appLogin) {
        headers1 = {
          token: localStorage.getItem("token"),
        };
      } else
        headers1 = {
          guestid: localStorage.getItem("guestId"),
        };
        const childrenValue = localStorage.getItem("Hchildren");
const isChildrenAvailable = childrenValue !== null && childrenValue !== undefined && childrenValue !== '';
      axios({
        headers: headers1,
        method: "GET",
        url: "/bookeddata/list",
        params: {
          id: this.$route.query.id,
          category: localStorage.getItem("Hcategory"),
          type: localStorage.getItem("Htype"),
          location: localStorage.getItem("Hlocation"),
          room: localStorage.getItem("Hroom"),
          triptype: localStorage.getItem("Htriptype"),
          checkInDate: localStorage.getItem("HcheckInDate"),
          checkOutDate: localStorage.getItem("HcheckOutDate"),
          children: isChildrenAvailable ? childrenValue : 0,
          adult: localStorage.getItem("Hadult"),
        },
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status) {
            this.HouseboatDetail = response.data.data.houseBoatIds;
            console.log("HouseboatDetail=", this.HouseboatDetail);
            if(this.HouseboatDetail){
              if(this.HouseboatDetail.length>0){
                if(this.HouseboatDetail[0].coverImage){
                  this.coverImg=this.HouseboatDetail[0].coverImage;
                }
              }
            }
            this.OtherDetails = response.data.data;
          } else {
            this.msg = response.data.msg;
            this.showSnackbar = true;
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

    validation() {
     if (!this.fname) {
        this.msg = "Please enter name";
        this.showSnackbar = true;
        return;
      } else if (!this.number) {
        this.msg = "Please enter phone number";
        this.showSnackbar = true;
        return;
      } else if (!this.email) {
        this.msg = "Please enter email";
        this.showSnackbar = true;
        return;
      }
      // else if (this.email && !this.isValidEmail(this.email)) {
      //   this.msg = "Invalid email format";
      //   this.showSnackbar = true;
      // }else if (this.number && !this.isValidPhoneNumber(this.number)) {
      //   this.msg = "Invalid phone number format";
      //   this.showSnackBar = true;
      // } 
       else {
        // console.log("asdfghjk")
        this.BookHouseboat();
      }
    },
    BookHouseboat() {
      this.appLoading = true;
      var headers1 = {};
      if (this.appLogin) {
        headers1 = {
          token: localStorage.getItem("token"),
        };
      } else
        headers1 = {
          guestid: localStorage.getItem("guestId"),
        };
        console.log("haii token", headers1)
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
            const url = response.data.url;
            window.location.href = url;
          } else {
            this.msg = response.data.msg;
            this.showSnackbar = true;
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