<template>
  <div>
    <vue-element-loading
      :active="appLoading"
      :is-full-screen="true"
      background-color="#FFFFFF"
      color="#182444"
      spinner="bar-fade-scale"
    />
    <ServerError v-if="ServerError" />
    <v-snackbar v-model="showSnackBar" color="#ff6200" right top timeout="2000">
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
    <v-layout wrap justify-center pa-4>
      <v-flex xs12>
        <v-layout wrap justify-start>
          <v-flex xs12 align-self-center>
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
              >Houseboat Reservations</span
            >
          </v-flex>
        </v-layout>
        <v-layout wrap justify-space-around>
          <v-flex xs12>
            <v-card tile class="pa-0 pa-sm-4 pa-md-8">
              <v-layout wrap>
                <v-flex xs12 sm7>
                  <v-card height="500px" width="600px" color="red" tile>
                    <v-date-picker
                      color="#ff6200"
                      no-title
                      ref="datepicker"
                      :picker-date.sync="pickerDate"
                      class="custofont"
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
                            font-family: LexendFont;
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
                            font-family: LexendFont;
                            text-transform: none;
                            color: #787777;
                          "
                          >SELECTED DATE</span
                        >
                      </v-flex>
                      <v-flex xs12 sm5 md4 lg3 xl2 pt-1>
                        <span
                          style="
                            font-weight: 400;
                            font-size: 12px;
                            font-family: LexendFont;
                            text-transform: uppercase;
                          "
                          >Check-In
                        </span>
                      </v-flex>
                      <v-flex xs12 sm6 pl-o pl-sm-7 pl-xl-0 pt-1>
                        <span
                          style="
                            font-weight: 400;
                            font-size: 12px;
                            font-family: LexendFont;
                            text-transform: uppercase;
                          "
                          >Check-Out
                        </span>
                      </v-flex>
                      <v-flex xs12 pt-1>
                        <span
                          style="
                            font-weight: 500;
                            font-size: 18px;
                            color: #ff6200;
                            font-family: LexendFont;
                            text-transform: none;
                          "
                          v-if="dateRangeText"
                          >{{ dateRangeText }}
                        </span>
                      </v-flex>
                      <v-flex xs12 pt-2>
                        <span
                          style="
                            font-weight: 400;
                            font-size: 16px;
                            font-family: LexendFont;
                            text-transform: none;
                            color: #787777;
                          "
                          >RESERVATION NO : {{ reservationData.reservationNo }}
                        </span>
                      </v-flex>
                      <v-flex xs12 pt-2 text-left>
                        <span class="title2" style="color: #2d2d2d"
                          >Boat name</span
                        >
                        <v-text-field
                          dense
                          disabled
                          outlined
                          class="txtfield1"
                          type="text"
                          v-model="reservationData.houseboatName"
                          hide-details="auto"
                        >
                        </v-text-field>
                      </v-flex>
                      <v-flex xs12 pt-2 text-left>
                        <span class="title2" style="color: #2d2d2d"
                          >Trip type</span
                        >
                        <v-autocomplete
                          flat
                          outlined
                          dense
                          class="txtfield1"
                          :items="['DayCruise', 'OverNight', 'NightStay']"
                          v-model="reservationData.tripType"
                          item-text="name"
                          hide-details="true"
                        ></v-autocomplete>
                      </v-flex>
                      <v-flex xs12 pt-2 text-left>
                        <span class="title2" style="color: #2d2d2d"
                          >Boat type</span
                        >
                        <v-autocomplete
                          flat
                          outlined
                          dense
                          class="txtfield1"
                          :items="['Private', 'Sharing']"
                          v-model="reservationData.houseBoatType"
                          item-text="name"
                          hide-details="true"
                        ></v-autocomplete>
                      </v-flex>
                      <v-flex xs12 pt-2 text-left>
                        <span class="title2" style="color: #2d2d2d"
                          >Boat Category</span
                        >
                        <v-autocomplete
                          flat
                          outlined
                          dense
                          class="txtfield1"
                          :items="['Luxury', 'Premium', 'Deluxe']"
                          v-model="reservationData.category"
                          item-text="name"
                          hide-details="true"
                        ></v-autocomplete>
                      </v-flex>
                      <v-flex xs12 pt-2 text-left>
                        <span class="title2" style="color: #2d2d2d">Rooms</span>
                        <v-text-field
                          dense
                          outlined
                          class="txtfield1"
                          type="number"
                          hide-spin-buttons
                          v-model="reservationData.totalRooms"
                          hide-details="auto"
                        >
                        </v-text-field>
                      </v-flex>
                      <v-flex xs12 pt-2 text-left>
                        <span class="title2" style="color: #2d2d2d"
                          >No of Guests</span
                        >
                        <v-text-field
                          dense
                          outlined
                          class="txtfield1"
                          type="number"
                          hide-spin-buttons
                          v-model="reservationData.totalGuests"
                          hide-details="auto"
                        >
                        </v-text-field>
                      </v-flex>
                      <v-flex xs12 pt-2 text-left>
                        <span class="title2" style="color: #2d2d2d"
                          >Rooms Rate
                        </span>
                        <span
                          style="
                            font-family: LexendFont;
                            font-size: 15px;
                            font-weight: 300;
                          "
                          >(per day/per room)</span
                        >
                        <v-text-field
                          dense
                          outlined
                          class="txtfield1"
                          type="number"
                          hide-spin-buttons
                          v-model="reservationData.rate"
                          hide-details="auto"
                        >
                        </v-text-field>
                      </v-flex>
                      <v-flex xs12 pt-2 text-left>
                        <span class="title2" style="color: #2d2d2d"
                          >Extra Person Rate
                        </span>
                        <span
                          style="
                            font-family: LexendFont;
                            font-size: 15px;
                            font-weight: 300;
                          "
                          >(per head/per day)</span
                        >
                        <v-text-field
                          dense
                          outlined
                          class="txtfield1"
                          type="text"
                          hide-spin-buttons
                          v-model="reservationData.extraPersonRate"
                          hide-details="auto"
                        >
                        </v-text-field>
                      </v-flex>
                      <v-flex xs12 pt-2 text-left>
                        <span class="title2" style="color: #2d2d2d"
                          >Booking Mode</span
                        >
                        <v-autocomplete
                          flat
                          outlined
                          dense
                          class="txtfield1"
                          :items="['Guest', 'Driver', 'Agent']"
                          v-model="reservationData.bookingMode"
                          item-text="name"
                          hide-details="true"
                        ></v-autocomplete>
                      </v-flex>
                      <v-flex
                        xs12
                        pt-2
                        text-left
                        v-if="reservationData.bookingMode == 'Agent'"
                      >
                        <span class="title2" style="color: #2d2d2d"
                          >Agent Name</span
                        >
                        <v-text-field
                          dense
                          outlined
                          class="txtfield1"
                          type="text"
                          v-model="reservationData.agentName"
                          hide-details="auto"
                        >
                        </v-text-field>
                      </v-flex>
                      <v-flex xs12 pt-2 text-right>
                        <span
                          style="
                            color: #f17343;
                            font-weight: 500;
                            font-size: 18px;
                            font-family: LexendFont;
                          "
                          >+ GUEST DETAILS</span
                        >
                      </v-flex>
                      <v-flex xs12 pt-2 text-left>
                        <span class="title2" style="color: #2d2d2d">Name</span>
                        <v-text-field
                          dense
                          outlined
                          class="txtfield1"
                          type="text"
                          v-model="reservationData.guestName"
                          hide-details="auto"
                        >
                        </v-text-field>
                      </v-flex>
                      <v-flex xs12 pt-2 text-left>
                        <span class="title2" style="color: #2d2d2d"
                          >Mobile Number</span
                        >
                        <v-text-field
                          dense
                          outlined
                          class="txtfield1"
                          type="number"
                          hide-spin-buttons
                          v-model="reservationData.guestPhoneNumber"
                          hide-details="auto"
                        >
                        </v-text-field>
                      </v-flex>
                      <v-flex xs12 pt-3 text-left>
                        <v-divider></v-divider>
                      </v-flex>
                      <!-- <v-flex xs12 sm6 pt-2 text-left>
                        <v-layout wrap>
                          <v-flex xs12>
                            <span
                              style=" font-family: LexendFont;
    font-weight: 400;
    font-size: 16px;color: #787777"
                              >PERSON/ROOM</span
                            >
                          </v-flex>
                          <v-flex xs12 sm6 style="line-height: 10px;" align-self-end>
                            <span
                              style=" font-family: LexendFont;
    font-weight: 400;
    font-size: 12px;"
                              >Price</span
                            >
                            <v-text-field
                              dense
                              outlined
                              class="txtfield1"
                              type="number"
                              hide-spin-buttons
                              v-model="perRoomRate"
                              hide-details="auto"
                            >
                            </v-text-field>
                          </v-flex>
                          <v-flex xs1 align-self-end text-center>X</v-flex>
                          <v-flex xs12 sm5 style="line-height: 10px;" align-self-end>
                            <span
                              style=" font-family: LexendFont;
    font-weight: 400;
    font-size: 12px;"
                              >Count</span
                            >
                            <v-text-field
                              dense
                              outlined
                              class="txtfield1"
                              type="number"
                              hide-spin-buttons
                              v-model="perRoomNo"
                              hide-details="auto"
                            >
                            </v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs12 sm6 pt-2 text-left pl-1>
                        <v-layout wrap>
                          <v-flex xs12>
                            <span
                              style=" font-family: LexendFont;
    font-weight: 400;
    font-size: 16px;color: #787777"
                              >EXTRA PERSON</span
                            >
                          </v-flex>
                          <v-flex xs12 sm6 style="line-height: 10px;" align-self-end>
                            <span
                              style=" font-family: LexendFont;
    font-weight: 400;
    font-size: 12px;"
                              >Price</span
                            >
                            <v-text-field
                              dense
                              outlined
                              class="txtfield1"
                              type="number"
                              hide-spin-buttons
                              v-model="extraRoomRate"
                              hide-details="auto"
                            >
                            </v-text-field>
                          </v-flex>
                          <v-flex xs1 align-self-end text-center>X</v-flex>
                          <v-flex xs12 sm5 style="line-height: 10px;" align-self-end>
                            <span
                              style=" font-family: LexendFont;
    font-weight: 400;
    font-size: 12px;"
                              >Count</span
                            >
                            <v-text-field
                              dense
                              outlined
                              class="txtfield1"
                              type="number"
                              hide-spin-buttons
                              v-model="extraRoomNo"
                              hide-details="auto"
                            >
                            </v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-flex> -->
                      <v-flex xs12 sm6 pt-3 text-left align-self-center>
                        <span
                          style="
                            font-family: LexendFont;
                            font-weight: 400;
                            font-size: 16px;
                            color: #787777;
                          "
                          >ADVANCE PAYMENT</span
                        >
                      </v-flex>
                      <v-flex xs12 sm6 pt-3 text-left align-self-center>
                        <v-text-field
                          dense
                          outlined
                          class="txtfield1"
                          type="number"
                          hide-spin-buttons
                          v-model="reservationData.advancePayment"
                          hide-details="auto"
                        >
                        </v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 pt-3 text-left align-self-center>
                        <span
                          style="
                            font-family: LexendFont;
                            font-weight: 400;
                            font-size: 16px;
                            color: #787777;
                          "
                          >TOTAL PAYABLE AMOUNT</span
                        >
                      </v-flex>
                      <v-flex xs12 sm6 pt-3 text-left align-self-center>
                        <v-text-field
                          dense
                          outlined
                          class="txtfield1"
                          type="number"
                          hide-spin-buttons
                          v-model="reservationData.totalPayableAmount"
                          hide-details="auto"
                        >
                        </v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 pt-3 text-left align-self-center>
                        <span
                          style="
                            font-family: LexendFont;
                            font-weight: 400;
                            font-size: 16px;
                            color: #787777;
                          "
                          >BALANCE PAYED BY</span
                        >
                      </v-flex>
                      <v-flex xs12 sm6 pt-3 text-left align-self-center>
                        <v-text-field
                          dense
                          outlined
                          class="txtfield1"
                          type="text"
                          v-model="reservationData.balancePayedBy"
                          hide-details="auto"
                        >
                        </v-text-field>
                      </v-flex>
                      <v-flex xs12 pt-3>
                        <v-btn tile dark block color="#ff6200" @click="edit()"
                          >Reserve Now</v-btn
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
      reserveNo: "",
      disableddates: [],
      reservationData: {},
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
      // perRoomRate: "",
      // perRoomNo: "",
      // extraRoomRate: "",
      // extraRoomNo: "",
      advanceAmt: "",
      payableAmt: "",
      balancePayedBy: "",
    };
  },
  watch: {
    selectedDate() {
      if (this.selectedDate.length > 1) {
        this.newfun();
      }
    },
  },
  mounted() {
    this.getReservation();
    this.boatname = this.$route.query.name;
    // this.getData();
  },
  computed: {
    dateRangeText() {
      return this.selectedDate.join(" ~ ");
    },
  },
  methods: {
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
      if (new Date(this.selectedDate[0]) < new Date(this.selectedDate[1])) {
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
      console.log(result);
      this.checkDisabledDates(result);
    },

    checkDisabledDates(result) {
      // console.log("this.selectedDates=",this.selectedDate)
      // const selectedDateObjects = result.map(dateString => new Date(dateString));

      const overlappingDates = result.filter((date) =>
        this.disableddates.includes(date)
      );
      console.log("disableddates=", this.disableddates);
      console.log("overlappingDates=", overlappingDates);

      if (overlappingDates.length > 0) {
        this.showSnackBar = true;
        this.msg = "You cannot choose these dates";
      } else {
        this.showSnackBar = false;
        this.msg = "";
      }
    },
    getData() {
      this.appLoading = true;
      axios({
        url: "/reservation/blocked/dates",
        method: "POST",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          houseBoatId: this.$route.query.id,
          triptype: this.reservationData.tripType,
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

    getReservation() {
      this.appLoading = true;
      axios({
        url: "/reservation/houseboat/view",

        method: "POST",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          id: this.$route.query.id,
        },
      })
        .then((response) => {
          this.appLoading = false;
          this.reservationData = response.data.data;
          // var checkInDateCopy = response.data.data.checkInDateCopy;
          // var checkOutDateCopy = response.data.data.checkOutDateCopy;
          // this.selectedDate.push(checkInDateCopy,checkOutDateCopy)
          this.finalarr = this.reservationData.selectedDate;

          console.log("reservationData=", this.reservationData);
          this.getData();
        })
        .catch((err) => {
          //   this.ServerError = true;
          console.log(err);
        });
    },
    edit() {
      this.appLoading = true;
      axios({
        method: "POST",
        url: "/reservation/houseboat/edit",
        data: {
          reservationNo: this.reservationData.reservationNo,
          selectedDate: this.selectedDate,
          houseBoatType: this.reservationData.houseBoatType,
          tripType: this.reservationData.tripType,
          category: this.reservationData.category,
          totalRooms: this.reservationData.totalRooms,
          totalGuests: this.reservationData.totalGuests,
          rate: this.reservationData.rate,
          extraPersonRate: this.reservationData.extraPersonRate,
          bookingMode: this.reservationData.bookingMode,
          agentName: this.reservationData.agentName,
          guestName: this.reservationData.guestName,
          guestPhoneNumber: this.reservationData.guestPhoneNumber,
          advancePayment: this.reservationData.advancePayment,
          totalPayableAmount: this.reservationData.totalPayableAmount,
          balancePayedBy: this.reservationData.balancePayedBy,
          id: this.$route.query.id,
        },
        headers: {
          token: localStorage.getItem("token"),
        },
      }).then((response) => {
        this.appLoading = false;
        if (response.data.status == true) {
          this.msg = response.data.msg;
          this.showsnackbar = true;
          // this.editBoatData = false;
          this.getReservation();
        } else {
          this.msg = response.data.msg;
          this.showsnackbar = true;
        }
      });
      // }
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
  /* color:"#2d2d2d"; */
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

  background: #f17343 !important;
  border-radius: 5px !important;
}
.v-field,
.v-list-item-title {
  font-size: 0.875rem !important;
}
.v-list-item-title {
  font-family: "LexendFont" !important;
  font-size: 35px; /* Change 'Your Chosen Font' to your preferred font */
}
</style>