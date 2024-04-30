<template>
  <div>
    <vue-element-loading
      :active="appLoading"
      :is-full-screen="true"
      background-color="#FFFFFF"
      color="#ff6200"
      spinner="spinner"
    />
    <ServerError v-if="ServerError" />
    <v-snackbar v-model="showSnackBar" color="black">
      <v-layout wrap justify-center>
        <v-flex text-left class="align-self-center">
          <span style="color: white">
            {{ msg }}
          </span>
        </v-flex>
        <v-flex text-right>
          <v-btn small :ripple="false" text @click="showSnackBar = false">
            <v-icon style="color: white">mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-snackbar>
    <v-layout class="mainfont" wrap justify-center pa-4>
      <v-flex xs12>
        <v-layout wrap justify-start>
          <v-flex xs12 sm6 pb-2 align-self-center>
            <span
              class="mainfont"
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
              >Reschedule Booking</span
            >
          </v-flex>
          <v-flex xs12 sm6 align-self-center text-left text-sm-right>
            <span
              class="mainfont"
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
              >{{ $route.query.name }}</span
            >
          </v-flex>
        </v-layout>
        <v-layout wrap justify-space-around>
          <v-flex xs12>
            <v-card tile class="pa-0 pa-sm-4 pa-md-8">
              <v-layout wrap>
                <v-flex xs12 sm7>
                  <v-card
                    elevation="0"
                    height="500px"
                    width="600px"
                    color="red"
                    tile
                  >
                    <v-date-picker
                      color="rgba(255, 98, 0, 1)"
                      no-title
                      ref="datepicker"
                      :picker-date.sync="pickerDate"
                      class="custofont mainfont"
                      theme="custom-theme"
                      :class="{ 'custom-date-picker': true }"
                      v-model="selectedDate"
                      range
                      :allowed-dates="filterAllowedDates"
                      :min="nowDate"
                      full-width
                      style="height: 500px; line-height: 60px; font-size: 28px"
                    >
                      <v-spacer></v-spacer>
                    </v-date-picker>
                  </v-card>
                </v-flex>
                <v-flex xs12 sm5 pl-0 pl-sm-8>
                  <v-card
                    elevation="0"
                    color="rgba(247, 247, 247, 1)"
                    class="pa-4 styl"
                  >
                    <v-layout wrap>
                      <v-flex xs12>
                        <span
                          style="
                            font-weight: 500;
                            font-size: 20px;
                            font-family: mainfont;
                            text-transform: none;
                          "
                          >BOOKING SUMMARY</span
                        >
                      </v-flex>
                      <v-flex xs12 pt-1>
                        <span
                          style="
                            font-weight: 400;
                            font-size: 18px;
                            font-family: mainfont;
                            text-transform: none;
                            color: rgba(120, 119, 119, 1);
                          "
                          >SELECTED DATE</span
                        >
                      </v-flex>
                      <v-flex xs12 pt-1 v-if="finalarr">
                        <span
                          v-for="(item, i) in finalarr"
                          :key="i"
                          style="
                            font-weight: 500;
                            font-size: 18px;
                            color: rgba(255, 98, 0, 1);
                            font-family: mainfont;
                            text-transform: none;
                          "
                          >{{ item }}
                          <span v-if="i < Object.keys(finalarr).length - 1"
                            >,
                          </span>
                        </span>
                      </v-flex>
                      <v-flex xs12 pt-3 text-left>
                        <span class="mainfont">Booking ID : </span>
                        <span class="mainfont">{{
                          reservationData.bookingNo
                        }}</span>
                      </v-flex>
                      <v-flex xs12 pt-3 text-left>
                        <span class="mainfont">Trip Type : </span>
                        <span class="mainfont">{{
                          reservationData.tripType
                        }}</span>
                      </v-flex>
                      <v-flex xs12 pt-3 text-left>
                        <span class="mainfont">Members : </span>
                        <span class="mainfont">
                          {{ reservationData.noOfAdults }} Adults,
                          {{ reservationData.noOfChildren }} Children (below 5 years)</span
                        >
                      </v-flex>
                      <v-flex xs12 pt-3 text-left>
                        <span class="mainfont">Check In Date : </span>
                        <span class="mainfont">
                          {{ formattedDate(reservationData.startDate) }}
                        </span>
                      </v-flex>
                      <v-flex xs12 pt-3 text-left>
                        <span class="mainfont">Check Out Date : </span>
                        <span class="mainfont">
                          {{ formattedDate(reservationData.endDate) }}</span
                        >
                      </v-flex>
                      <v-flex
                        xs12
                        pt-3
                        text-left
                        v-if="reservationData.houseBoatId"
                      >
                        <span class="mainfont">Pickup/ Drop : </span>
                        <span
                          class="mainfont"
                          v-if="reservationData.houseBoatId.startingLocation"
                        >
                          {{
                            reservationData.houseBoatId.startingLocation.name
                          }}</span
                        >
                      </v-flex>
                      <v-flex xs12 pt-3 text-left>
                        <span class="mainfont">Advance payed : </span>
                        <span class="mainfont">
                          ₹ {{ reservationData.advanceAmountPaid }}</span
                        >
                      </v-flex>
                      <v-flex xs12 pt-3 text-left>
                        <span class="mainfont">Balance Amount : </span>
                        <span class="mainfont">
                          ₹ {{ reservationData.balancePayAmount }}</span
                        >
                      </v-flex>
                      <v-flex xs12 pt-3 text-left>
                        <span class="mainfont">Total Amount : </span>
                        <span class="mainfont">
                          ₹ {{ reservationData.totalAmount }}</span
                        >
                      </v-flex>
                      <v-flex xs12 pt-3 text-left>
                        <v-divider></v-divider>
                      </v-flex>
                      <v-flex xs12 pt-3 class="mainfont">
                        <v-btn
                          tile
                          dark
                          block
                          color="rgba(255, 98, 0, 1)"
                          @click="reschedulenow()"
                          >Reschedule Now</v-btn
                        >
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
  </div>
</template>
  <script>
import axios from "axios";
export default {
  data() {
    return {
      appLoading: false,
      ServerError: false,
      showSnackBar: false,
      msg: "",
      selectedDate: [],
      reservationData: [],
      reserveNo: "",
      disableddates: [],
      nowDate: new Date().toISOString().slice(0, 10),
      boatname: "",
      triptype: "",
      houseBoatType: "",
      boatCategory: "",
      noofrooms: "",
      noofguests: "",
      roomsrate: "",
      extrapersonrate: "",
      bookingMode: "",
      agentname: "",
      guestname: "",
      guestNumber: "",
      oldArr: [],
      finalarr: [],
      pickerDate: null,
      dateLength: "",
      advanceAmt: "",
      payableAmt: "",
      balancePayedBy: "",
      flag: true,
    };
  },
  watch: {
    // selectedDate() {
    //   if (this.selectedDate.length > 1) {
    //     this.newfun();
    //   } else {
    //     this.finalarr = this.selectedDate.map((date) => {
    //       const [year, month, day] = date.split("-");
    //       return `${day}-${month}-${year}`;
    //     });

    //     console.log("finalarr single=", this.finalarr);
    //   }
    // },
    selectedDate() {
      if (this.selectedDate.length === 1) {
        // Get the first date
        console.log("first selectedDate=", this.selectedDate);
        console.log("dateLength=", this.dateLength);

        const firstDate = new Date(this.selectedDate[0]);

        // Calculate the second date (5 days after the first date)
        const secondDate = new Date(firstDate);
        secondDate.setDate(firstDate.getDate() + (this.dateLength - 1));

        // Add the second date to the array
        this.selectedDate.push(secondDate.toISOString().substr(0, 10)); // Assuming you want to store the date in "YYYY-MM-DD" format
      }
      console.log("second date formed=", this.selectedDate);
      this.newfun();
    },
    triptype() {
      this.getData(this.pickerDate);
    },
  },
  async mounted() {
    await this.$nextTick();
    const prevBtn = this.$refs.datepicker.$el.querySelector(
      '.v-btn[aria-label="Previous month"]'
    );
    prevBtn.addEventListener("click", () => {
      // console.log("previous button clicked");
      this.getData(this.pickerDate);
    });

    const nextBtn = this.$refs.datepicker.$el.querySelector(
      '.v-btn[aria-label="Next month"]'
    );
    nextBtn.addEventListener("click", () => {
      // console.log("next button clicked");
      this.getData(this.pickerDate);
    });
    // mounted() {
    this.triptype = "DayCruise";
    this.getRescheduleData();
    this.boatname = this.$route.query.name;
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();
    const currentMonthYear = `${currentYear}-${String(currentMonth).padStart(
      2,
      "0"
    )}`;
    this.getData(currentMonthYear);
  },
  // computed: {
  //   dateRangeText() {
  //     return this.selectedDate.join(" to ");
  //   },
  // },
  methods: {
    formattedDate(date) {
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      return new Date(date).toLocaleDateString("en-GB", options);
    },
    newfun() {
      function formatDate(date) {
        const dd = String(date.getDate()).padStart(2, "0");
        const mm = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
        const yy = String(date.getFullYear());

        return `${dd}-${mm}-${yy}`;
      }

      function getDates(startDate, endDate) {
        const dateArray = [];
        const currentDate = new Date(startDate);

        while (currentDate <= new Date(endDate)) {
          dateArray.push(formatDate(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }

        return dateArray;
      }
      var result = [];
      if (new Date(this.selectedDate[0]) <= new Date(this.selectedDate[1])) {
        console.log("1");
        result = getDates(this.selectedDate[0], this.selectedDate[1]);
      } else {
        console.log("2");

        result = getDates(this.selectedDate[1], this.selectedDate[0]);
        console.log("before-rearragedate==", this.selectedDate);
        var newarr3 = [this.selectedDate[1], this.selectedDate[0]];
        this.selectedDate = newarr3;
        console.log("rearragedate==", newarr3);
      }
      //   const result = getDates(this.selectedDate[0], this.selectedDate[1]);
      console.log("result befor checking disabled=", result);
      this.checkDisabledDates(result);
    },

    checkDisabledDates(result) {
      function formatDate(date) {
        const dd = String(date.getDate()).padStart(2, "0");
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const yy = String(date.getFullYear());

        return `${dd}-${mm}-${yy}`;
      }

      // Convert date strings to Date objects
      const dateObjects = this.disableddates.map(
        (dateString) => new Date(dateString)
      );

      // Use map to convert each element in dateObjects
      const newdisableddates = dateObjects.map((date) => formatDate(date));

      const overlappingDates = newdisableddates.filter((date) =>
        result.includes(date)
      );
      // console.log("overlappingDates=", overlappingDates);

      // console.log("disableddates=", this.disableddates);
      // console.log("newdisableddates=", newdisableddates);

      if (overlappingDates.length > 0) {
        this.showSnackBar = true;
        this.msg = "You cannot choose these dates";
      } else {
        // console.log("result is=", result);
        this.showSnackBar = false;
        this.msg = "";
        this.finalarr = result;
        console.log("finalarr formed is=", this.finalarr);
      }
    },

    getData(pickerDate) {
      this.appLoading = true;
      axios({
        url: "/reschedule/houseboat/getdates",
        method: "POST",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          bookingId: this.$route.query.id,
          month: pickerDate,
        },
      })
        .then((response) => {
          this.appLoading = false;
          this.disableddates = response.data.data;
        })
        .catch((err) => {
          //   this.ServerError = true;
          console.log(err);
        });
    },
    reschedulenow() {
      console.log("old arr=", this.oldArr[0]);
      console.log("final arr=", this.finalarr[0]);

      if (this.oldArr[0] === this.finalarr[0]) {
        // this.flag=false;
        this.msg = "Cannot reschedule to same date";
        this.showSnackBar = true;
      } else {
        // this.flag=true;
        console.log("qwertyu");
        this.edit();
      }
    },
    edit() {
      console.log("this.finalarr to submit=====", this.finalarr);
      this.appLoading = true;
      axios({
        method: "POST",
        url: "/reschedule/houseboat/admin",
        data: {
          startDate: this.finalarr[0],
          endDate: this.finalarr[this.finalarr.length - 1],
          id: this.$route.query.id,
        },
        headers: {
          token: localStorage.getItem("token"),
        },
      }).then((response) => {
        this.appLoading = false;
        if (response.data.status) {
          this.msg = response.data.msg;
          this.showSnackBar = true;
          // this.editBoatData = false;
          this.getRescheduleData();
        } else {
          this.msg = response.data.msg;
          this.showSnackBar = true;
        
        }
      });
      // }
    },
    filterAllowedDates(val) {
      const date = new Date(val);
      return !this.disableddates.includes(this.formatDate(date));
    },
    formatDate(date) {
      // Format the date as 'YYYY-MM-DD' for comparison
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    getRescheduleData() {
      this.appLoading = true;
      axios({
        url: "reschedule/houseboatbooking/details",

        method: "POST",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          bookingId: this.$route.query.id,
        },
      })
        .then((response) => {
          this.appLoading = false;
          this.reservationData = response.data.data;
          this.oldArr = response.data.data.bookedDates.map((dateString) => {
            const date = new Date(dateString);
            const formattedDate = `${date
              .getDate()
              .toString()
              .padStart(2, "0")}-${(date.getMonth() + 1)
              .toString()
              .padStart(2, "0")}-${date.getFullYear()}`;
            return formattedDate;
          });
          this.finalarr = response.data.data.bookedDates.map((dateString) => {
            const date = new Date(dateString);
            const formattedDate = date.toISOString().slice(0, 10);
            return formattedDate;
          });
          this.selectedDate = response.data.data.bookedDates.map(
            (dateString) => {
              const date = new Date(dateString);
              const formattedDate = date.toISOString().slice(0, 10);
              return formattedDate;
            }
          );
          this.dateLength = this.selectedDate.length;
          this.getData();
        })
        .catch((err) => {
          //   this.ServerError = true;
          console.log(err);
        });
    },
  },
};
</script>
  <style scoped>
.custom-date-picker .v-date-picker-header,
.custom-date-picker .v-date-picker-date,
.custom-date-picker .v-date-picker-month,
.custom-date-picker .v-date-picker-table-header,
.custom-date-picker .v-date-picker-table-date {
  font-size: 58px; /* Adjust the font size as needed */
}
.theme--custom-theme {
  --v-date-picker-title-font-size: 50px; /* Adjust the font size as needed */
  --v-date-picker-table-date-font-size: 50px; /* Adjust the font size as needed */
  /* Add other custom styles as needed */
}
/* .custom-date-picker {
    height: 800px !important; 
  } */
.custofont {
  font-size: 50px;
}
.v-date-picker-table table {
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  top: 0;
  height: 100%;
  font-size: 30px;
  table-layout: fixed;
  width: 100%;
}
.v-date-picker-table v-date-picker-table--date theme--light {
  font-size: 30px;
}
.txtfield1 {
  /* color:"rgba(45, 45, 45, 1)"; */
  background-color: white !important;
}
.styl {
  /* overflow: scroll; */
  overflow-y: auto;
  min-height: 50px;
  max-height: 500px;
}
::-webkit-scrollbar {
  width: 5px !important;
  height: 1px !important;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 0px grey !important;
  border-radius: 5px !important;
}
::-webkit-scrollbar-thumb {
  display: none;

  background: rgba(241, 115, 67, 1) !important;
  border-radius: 5px !important;
}
</style>