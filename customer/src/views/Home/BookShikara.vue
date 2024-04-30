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
                    (Shikara)</span
                  >
          </v-flex>
        </v-layout>
        <v-layout wrap justify-center py-4>
          <v-flex xs12 sm6>
            <v-card outlined elevation="1" color="white" class="pa-4">
              <v-layout wrap justify-center>
                <v-flex xs12
                  ><v-card elevation="0">
                    <v-img
                      cover
                      height="200px"
                      v-if="shikaradata.coverImage"
                      :src="mediaUURL + shikaradata.coverImage"
                      ><template v-slot:placeholder>
                        <ImageLoader /> </template
                    ></v-img>
                    <v-img
                      v-else
                      height="300px"
                      src="./../../assets/images/noimg.png"
                    >
                      <template v-slot:placeholder>
                        <ImageLoader />
                      </template>
                    </v-img> </v-card
                ></v-flex>
                <v-flex xs12 pt-2>
                  <span
                    v-if="shikaradata.shikaraName"
                    class="pb-2"
                    style="
                      font-size: 25px;
                      font-weight: 400;
                      font-family: LexendFont;
                    "
                  >
                    {{ shikaradata.shikaraName }}</span
                  >
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
                    Check-In Time: </span
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
                    {{ formatTime(bookData.startTime) }}
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
                    Check-Out Time: </span
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
                  >{{ formatTime(bookData.endTime) }}
                  </span>
                </v-flex>
                <v-flex xs12 pt-8 pb-6>
                  <div class="dottedline"></div>
                </v-flex>
                <!-- <v-flex xs4>
                    <v-layout wrap>
                      <v-flex xs12 pt-2 v-if="shikaradata.location">
                        <span v-if="shikaradata.location.name" style="font-size: 15px;font-weight:600;font-family: LexendFont;">Location</span>
                      </v-flex>
                      <v-flex xs12 pb-2 v-if="shikaradata.location">
                        <span v-if="shikaradata.location.name" style="font-size: 15px;font-weight:400;font-family: LexendFont;">{{ OtherDetails.location.name }}</span>
                      </v-flex>
                    </v-layout>
                  </v-flex> -->

                <v-flex xs4>
                  <v-layout wrap>
                    <v-flex xs12 pt-2 v-if="bookData.location">
                      <span
                        style="
                          font-size: 15px;
                          font-weight: 600;
                          font-family: LexendFont;
                        "
                        >Location</span
                      >
                    </v-flex>
                    <v-flex xs12 pb-2 v-if="bookData.location">
                      <span
                        v-if="bookData.location.name"
                        style="
                          font-size: 15px;
                          font-weight: 400;
                          font-family: LexendFont;
                        "
                        >{{ bookData.location.name }}</span
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
                        >Date</span
                      >
                    </v-flex>
                    <v-flex xs12 pb-2>
                      <span
                        style="
                          font-size: 15px;
                          font-weight: 400;
                          font-family: LexendFont;
                        "
                        >{{ formatDate(bookData.selectedDate) }}</span
                      >
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs4>
                  <v-layout wrap>
                    <v-flex xs12 pt-2 v-if="bookData.memberCount">
                      <span
                        style="
                          font-size: 15px;
                          font-weight: 600;
                          font-family: LexendFont;
                        "
                        >No.of Guests</span
                      >
                    </v-flex>
                    <v-flex xs12 pb-2 v-if="bookData.memberCount">
                      <span
                        style="
                          font-size: 15px;
                          font-weight: 400;
                          font-family: LexendFont;
                        "
                        >{{ bookData.memberCount
                        }}<v-icon>mdi-human-male</v-icon></span
                      >
                      <span
                        style="
                          font-size: 15px;
                          font-weight: 400;
                          font-family: LexendFont;
                        "
                        v-if="bookData.childrenCount > 0"
                        >{{ bookData.childrenCount
                        }}<v-icon>mdi-car-child-seat</v-icon></span
                      >
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex class="vertical-divider">
            <!-- Custom vertical divider -->
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
                      font-family: LexendFont;
                      color: rgba(241, 115, 67, 1);
                    "
                  >
                    Add Guest Details</span
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
                    First and Last name</span
                  >
                  <v-text-field dense outlined type="text" hide-details="auto" v-model="fname">
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
                  <v-text-field dense outlined type="text" hide-details="auto" v-model="email"  :rules="[rules.email]">
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
                  <v-text-field dense outlined type="number" hide-spin-buttons hide-details="auto" v-model="number" :rules="phoneRules">
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
                  <v-textarea dense outlined type="text" hide-details="auto" v-model="address">
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
                      font-family: LexendFont;
                      color: rgba(241, 115, 67, 1);
                    "
                  >
                    Booking Summary</span
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
                        >₹ {{ amt.bookingTotal }}</span
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
                        >₹ {{ amt.advance }}</span
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
                        >* Balance Payment in Shikara is required prior to check-in.</span
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
                        >₹ {{ amt.postBookingamount }}</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
                <v-flex xs12 pt-8 pb-6>
                  <div class="dottedline"></div>
                </v-flex>
              </v-layout>
              <v-layout wrap>
                  <!-- <v-flex xs12 sm6 pt-4>  <span
                    class="pb-2"
                    style="
                      font-size: 16px;
                      font-weight: 400;
                      font-family: LexendFont;
                    ">Total Payable Amount</span></v-flex>
                     <v-flex xs12 sm6 pt-4>  <span
                    class="pb-2"
                    style="
                      font-size: 16px;
                      font-weight: 300;
                      font-family: LexendFont;
                    ">{{ subtotal}}</span></v-flex> -->
                    <v-flex xs12><v-btn  @click="validation()" block dark tile color="rgba(241, 115, 67, 1)">
                      <span
                  
                    style="
                      font-size: 18px;
                      font-weight: 400;
                      font-family: LexendFont;
                      color: white;
                    "
                  >Book Now</span>
                    </v-btn></v-flex>
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
      bookData: {},
      shikaradata: {},
      subtotal:this.$route.query.rate,
      AmountData:{},
      amt:{},
      fname:"",
      email:"",
      number:"",
      address:"",
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
    SKsearchItems() {
      return this.$store.state.SKsearchItems;
    },
    HBsearchItems() {
      return this.$store.state.HBsearchItems;
    },
    appLogin() {
      return this.$store.state.isLoggedIn;
    },
  },
  mounted() {
    this.getshikara();
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
      axios({
        headers: headers1,
        method: "POST",
        url: "/booking/summary",
        data: {
          totalAmount: this.$route.query.rate,
        },
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status) {
            this.amt = response.data;
            this.OtherDetails = response.data.data;
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
    convertToTimestamp(dateString) {
      const date = new Date(dateString);
      return date.getTime();
    },
    combineDateTime(dateString, timeString) {
      const formattedDate = `${dateString}T${timeString}:00`;
      return formattedDate;
    },
    getshikara() {
      this.appLoading = true;
      var time1 = localStorage.getItem("checkInTime");
      var time2 = localStorage.getItem("checkOutTime");
      var time3 = localStorage.getItem("checkInDate");
      axios({
        method: "POST",
        url: "/view/details",
        data: {
          shikbookid: this.$route.query.id,
          location: localStorage.getItem("location"),
          childrenCount: localStorage.getItem("children"),
          memberCount: localStorage.getItem("adult"),
          selectedDate: localStorage.getItem("checkInDate"),
          startTime: this.combineDateTime(time3, time1),
          endTime: this.combineDateTime(time3, time2),
        },
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status) {
            this.shikaradata = response.data.data.shikaraid;
            this.bookData = response.data.data;
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
        this.BookShikara();
      }
    },
    BookShikara() {
      var bookedbyid=null;
      var time1 = localStorage.getItem("checkInTime");
        var time2=localStorage.getItem("checkOutTime");
          var time3=localStorage.getItem("checkInDate");
      this.appLoading = true;
      var customerDetails= {
        name: this.fname,
        phoneNumber: this.number,
        email: this.email,
        address: this.address

    };
      var headers1 = {};
      if (this.appLogin) {
        headers1 = {
          token: localStorage.getItem("token"),
        };
        bookedbyid=localStorage.getItem("customerId")
      } 
      else{
        bookedbyid=localStorage.getItem("guestId")
      }
      axios({
        headers: headers1,

        method: "POST",

        url: "/shikara/customer/bookingfinal",

        data: {
          // bookedbyid: localStorage.getItem("guestId"),
          bookedbyid:bookedbyid,

          selectedDate: localStorage.getItem("checkInDate"),
          startTime: this.combineDateTime(time3, time1),
          endTime: this.combineDateTime(time3, time2),
           amount: this.$route.query.rate,
           location: localStorage.getItem("location"),
           shikaraid: this.$route.query.id,
           memberCount: this.bookData.memberCount,
           bookingTotal: this.amt.bookingTotal,
           gstAmount: this.amt.gstAmount,
           postBookingamount: this.amt.postBookingamount,
           advance: this.amt.advance,
           childrenCount: this.bookData.childrenCount,
           customerDetails:customerDetails,
           shikbookid:this.$route.query.id,
        },

      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status) {
          //  this.$router.push('/myBookings');
          const url = response.data.url;
            window.location.href = url;
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

    formatTime(item) {
      var dt = new Date(item);
      var day = dt.getDate();
      var year = dt.getFullYear();
      var hours = dt.getHours();
      var minutes = dt.getMinutes();
      dt = dt.toString();
      var ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime =
        day + " " + dt.slice(4, 7) + " " +
        year
      +" , " +
       hours + ":" + minutes + " " + ampm;

      return strTime;
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