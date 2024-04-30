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
    <v-snackbar v-model="showSnackbar" color="#ff6200" right top timeout="2000">
      <v-layout wrap justify-center>
        <v-flex text-left class="align-self-center">
          <span style="color: white">
            {{ msg }}
          </span>
        </v-flex>

        <v-flex text-right>
          <v-btn small :ripple="false" text @click="showSnackbar = false">
            <v-icon style="color: white">mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-snackbar>
    <v-layout wrap justify-center pa-4>
      <v-flex xs12>
        <v-layout wrap justify-start>
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
              >Houseboat Reservations</span
            >
          </v-flex>
          <v-flex xs12 sm6 align-self-center text-left text-sm-right>
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
              >{{ $route.query.name }}</span
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
                      class="custofont LexendFont1"
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
                      <!-- <v-flex xs12 sm5 md4 lg3 xl2 pt-1>
                        <span
                          style="
                            font-weight: 400;
                            font-size: 12px;
                            font-family: LexendFont;
                            text-transform: uppercase;
                          "
                          >Check-In
                        </span>
                      </v-flex> -->

                      <!-- <v-flex xs12 sm6 pl-o pl-sm-7 pl-xl-0 pt-1>
                        <span
                          style="
                            font-weight: 400;
                            font-size: 12px;
                            font-family: LexendFont;
                            text-transform: uppercase;
                          "
                          >Check-Out
                        </span>
                      </v-flex> -->
                      <v-flex xs12 pt-1 v-if="finalarr">
                        <span
                          v-for="(item, i) in finalarr"
                          :key="i"
                          style="
                            font-weight: 500;
                            font-size: 18px;
                            color: #ff6200;
                            font-family: LexendFont;
                            text-transform: none;
                          "
                          >{{ item }}
                          <span v-if="i < Object.keys(finalarr).length - 1"
                            >,
                          </span>
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
                          >RESERVATION NO : {{ reserveNo }}
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
                          v-model="boatname"
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
                          v-model="triptype"
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
                          v-model="houseBoatType"
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
                          disabled
                          dense
                          class="txtfield1"
                          :items="['Luxury', 'Premium', 'Deluxe']"
                          v-model="boatCategory"
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
                          v-model="noofrooms"
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
                          v-model="noofguests"
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
                          v-model="roomsrate"
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
                          v-model="extrapersonrate"
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
                          v-model="bookingMode"
                          item-text="name"
                          hide-details="true"
                        ></v-autocomplete>
                      </v-flex>
                      <v-flex xs12 pt-2 text-left v-if="bookingMode == 'Agent'">
                        <span class="title2" style="color: #2d2d2d"
                          >Agent Name</span
                        >
                        <v-text-field
                          dense
                          outlined
                          class="txtfield1"
                          type="text"
                          v-model="agentname"
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
                          v-model="guestname"
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
                          v-model="guestNumber"
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
                          @change="calculateBalance()"
                          v-model="payableAmt"
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
                          >ADVANCE PAYMENT</span
                        >
                      </v-flex>
                      <v-flex xs12 sm6 pt-3 text-left align-self-center>
                        <v-text-field
                          dense
                          outlined
                          class="txtfield1"
                          type="number"
                          @change="calculateBalance()"
                          hide-spin-buttons
                          v-model="advanceAmt"
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
                          >BALANCE</span
                        >
                      </v-flex>
                      <v-flex xs12 sm6 pt-3 text-left align-self-center>
                        <v-text-field
                          dense
                          outlined
                          disabled
                          class="txtfield1"
                          type="text"
                          v-model="balanceAmount"
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
                          v-model="balancePayedBy"
                          hide-details="auto"
                        >
                        </v-text-field>
                      </v-flex>
                      <v-flex xs12 pt-3>
                        <v-btn
                          tile
                          dark
                          block
                          color="#ff6200"
                          @click="reserveboat()"
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
      showSnackbar: false,
      msg: "",
      selectedDate: [],
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
      balanceAmount: 0,
      finalarr: [],
      pickerDate: null,
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
    // payableAmt(){
    //   this.calculateBalance();
    // },
    // advanceAmt(){
    //   this.calculateBalance();
    // },
    selectedDate() {
      console.log("first selected dated=", this.selectedDate);
      if (this.selectedDate.length > 1) {
        this.newfun();
      } else {
        this.finalarr = this.selectedDate.map((date) => {
          const [year, month, day] = date.split("-");
          return `${day}-${month}-${year}`;
        });

        console.log("finalarr single=", this.finalarr);
      }
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
      console.log("previous button clicked");
      this.getData(this.pickerDate);
    });

    const nextBtn = this.$refs.datepicker.$el.querySelector(
      '.v-btn[aria-label="Next month"]'
    );
    nextBtn.addEventListener("click", () => {
      console.log("next button clicked");
      this.getData(this.pickerDate);
    });
    // mounted() {
    this.triptype = "DayCruise";
    this.boatCategory = this.$route.query.type;
    this.getReservationNo();
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
    calculateBalance() {
      console.log("this.advanceAmt", this.advanceAmt);
      console.log("this.payableAmt", this.payableAmt);
      if (this.advanceAmt && this.payableAmt) {
        if (parseInt(this.advanceAmt) <= parseInt(this.payableAmt)) {
          this.balanceAmount = this.payableAmt - this.advanceAmt;
        } else {
          this.balanceAmount = 0;
          this.msg = "Advance amount is greater than payable amount";
          this.showSnackbar = true;
        }
      }
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
      console.log(result);
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
      console.log("overlappingDates=", overlappingDates);

      // console.log("disableddates=", this.disableddates);
      console.log("newdisableddates=", newdisableddates);

      if (overlappingDates.length > 0) {
        this.showSnackbar = true;
        this.msg = "You cannot choose these dates";
      } else {
        console.log("result is=", result);
        this.showSnackbar = false;
        this.msg = "";
        this.finalarr = result;
        console.log("finalarr multiple=", this.finalarr);
      }
    },

    getData(pickerDate) {
      this.appLoading = true;
      axios({
        url: "/reservation/blocked/dates",
        method: "POST",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          houseBoatId: this.$route.query.id,
          tripType: this.triptype,
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
    // validation() {
    //   if (this.triptype=='OverNight' && this.selectedDate.length <= 1) {
    //     this.msg = "Please choose date";
    //     this.showSnackbar = true;
    //     return;
    //   }else if (this.triptype=='NightStay' && this.selectedDate.length <= 1) {
    //     this.msg = "Please choose date";
    //     this.showSnackbar = true;
    //     return;
    //   } else {
    //     console.log("this.selectedDate", this.selectedDate);
    //     this.reserveboat();
    //   }
    // },
    reserveboat() {
      this.appLoading = true;
      axios({
        method: "POST",
        url: "/reservation/houseboat",
        data: {
          reservationNo: this.reserveNo,
          selectedDate: this.finalarr,
          houseBoatType: this.houseBoatType,
          tripType: this.triptype,
          category: this.boatCategory,
          totalRooms: this.noofrooms,
          totalGuests: this.noofguests,
          rate: this.roomsrate,
          extraPersonRate: this.extrapersonrate,
          bookingMode: this.bookingMode,
          agentName: this.agentname,
          guestName: this.guestname,
          guestPhoneNumber: this.guestNumber,
          advancePayment: this.advanceAmt,
          totalPayableAmount: this.payableAmt,
          balancePayedBy: this.balancePayedBy,
          balanceAmount: this.balanceAmount,
          houseBoatId: this.$route.query.id,
        },
        headers: {
          token: localStorage.getItem("token"),
        },
      }).then((response) => {
        this.appLoading = false;
        if (response.data.status == true) {
          this.msg = response.data.msg;
          this.showSnackbar = true;
          this.$router.push("/houseboatReservationsList");
        } else {
          this.msg = response.data.msg;
          this.showSnackbar = true;
        }
      });
    },
    filterAllowedDates(val) {
      const date = new Date(val);
      console.log(
        "asdfghjk",
        this.disableddates.includes(this.formatDate(date))
      );
      // Check if the date is not in the disabledDates array
      return !this.disableddates.includes(this.formatDate(date));
    },
    formatDate(date) {
      // Format the date as 'YYYY-MM-DD' for comparison
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    getReservationNo() {
      this.appLoading = true;
      axios({
        // url: "/reservation/all/",
        url: "/reservation/generatenumber/",

        method: "POST",
        headers: {
          token: localStorage.getItem("token"),
        },
        // data: {
        //   houseboatId: this.$route.query.id,
        // },
      })
        .then((response) => {
          this.appLoading = false;
          this.reserveNo = response.data.reservationNo;
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
</style>