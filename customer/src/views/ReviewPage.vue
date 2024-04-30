<template>
    <div>
        <v-layout wrap justify-center style="height: 100vh;">
           <v-flex xs12 pt-10>
            <v-layout wrap>
                <v-flex xs12>
                    <v-img
              :src="require('./../assets/images/bg4.png')"
              height="100vh"
            >
            <v-layout wrap justify-center>
                <v-flex xs9 pt-6>
                    <v-layout wrap justify-start>

                   
                    <v-flex xs2>
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
                  Add  Review
                  </span>
                </v-btn>
            </v-flex>
        </v-layout>
                </v-flex>
            </v-layout>
        
        </v-img>
                </v-flex>
                
              
            </v-layout>
        </v-flex>
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
                      color="ff6200"

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
    // getReview() {
    //   this.appLoading = true;
    //   axios({
    //     headers: {
    //       token: localStorage.getItem("token"),
    //     },
    //     method: "get",
    //     url: "/review/myreviews",
    //     params: {
    //       houseBoatId: this.currentBookings.houseBoatId._id,
    //     },
    //   })
    //     .then((response) => {
    //       this.appLoading = false;
    //       if (response.data.status) {
    //         this.currentReview = response.data.data;
    //       } else {
    //         this.msg = response.data.msg;
    //         this.showsnackbar = true;
    //       }
    //     })
    //     .catch((err) => {
    //       this.appLoading = false;
    //       console.log(err);
    //       this.ServerError = true;
    //     });
    // },
    showReview() {
    //   this.getReview();
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