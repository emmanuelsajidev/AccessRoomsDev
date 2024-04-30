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
              >Shikara Reservations</span
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
                      scrollable
                      :class="{ 'custom-date-picker': true }"
                      v-model="reservationData.checkInDateCopy"
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
                          >SELECTED DATE : </span
                        ><br />
                        <span
                          style="
                            font-weight: 500;
                            font-size: 18px;
                            color: #ff6200;
                            font-family: LexendFont;
                            text-transform: none;
                          "
                          v-if="reservationData.checkInDateCopy"
                          >{{ reservationData.checkInDateCopy }}
                        </span>
                      </v-flex>
                      <v-flex xs12 pt-2>
                        <span
                          v-if="reservationData.reservationNo"
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
                          >Shikara name</span
                        >
                        <v-text-field
                          dense
                          disabled
                          outlined
                          class="txtfield1"
                          type="text"
                          v-model="reservationData.shikaraName"
                          hide-details="auto"
                        >
                        </v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 pt-2 pr-0 pr-sm-1 text-left>
                        <span class="title2" style="color: #2d2d2d"
                          >Start Time</span
                        >
                        <v-dialog
                          ref="checkInMenuVisible"
                          v-model="checkInMenuVisible"
                          :return-value.sync="reservationData.startTimeCopy"
                          persistent
                          width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="reservationData.startTimeCopy"
                              hide-details="auto"
                              class="txtfield1"
                              color="#ff6200"
                              v-bind="attrs"
                              v-on="on"
                              outlined
                              dense
                            ></v-text-field>
                          </template>
                          <v-time-picker
                            v-if="checkInMenuVisible"
                            v-model="reservationData.startTimeCopy"
                            ampm-in-title
                            full-width
                            color="#f17343"
                          >
                            <v-spacer></v-spacer>
                            <v-btn
                              text
                              color="#f17343"
                              @click="checkInMenuVisible = false"
                            >
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="#f17343"
                              @click="
                                $refs.checkInMenuVisible.save(
                                  reservationData.startTimeCopy
                                )
                              "
                            >
                              OK
                            </v-btn>
                          </v-time-picker>
                        </v-dialog>
                      </v-flex>
                      <v-flex xs12 sm6 pt-2 pl-0 pl-sm-1 text-left>
                        <span class="title2" style="color: #2d2d2d"
                          >End Time</span
                        >
                        <v-dialog
                          ref="checkOutMenuVisible"
                          v-model="checkOutMenuVisible"
                          :return-value.sync="reservationData.endTimeCopy"
                          persistent
                          width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="reservationData.endTimeCopy"
                              hide-details="auto"
                              class="txtfield1"
                              color="#ff6200"
                              v-bind="attrs"
                              v-on="on"
                              outlined
                              dense
                            ></v-text-field>
                          </template>
                          <v-time-picker
                            v-if="checkOutMenuVisible"
                            v-model="reservationData.endTimeCopy"
                            ampm-in-title
                            full-width
                            color="#f17343"
                          >
                            <v-spacer></v-spacer>
                            <v-btn
                              text
                              color="#f17343"
                              @click="checkOutMenuVisible = false"
                            >
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="#f17343"
                              @click="
                                $refs.checkOutMenuVisible.save(
                                  reservationData.endTimeCopy
                                )
                              "
                            >
                              OK
                            </v-btn>
                          </v-time-picker>
                        </v-dialog>
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
                      <v-flex xs12 pt-2 text-left v-if="bookingMode == 'Agent'">
                        <span class="title2" style="color: #2d2d2d"
                          >Agent Name</span
                        >
                        <v-text-field
                          dense
                          outlined
                          class="txtfield1"
                          type="text"
                          v-model="reservationData.agentname"
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
                          @change="calculateBalance()"
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
                          >BALANCE</span
                        >
                      </v-flex>
                      <v-flex xs12 sm6 pt-3 text-left align-self-center>
                        <v-text-field
                          dense
                          outlined
                          class="txtfield1"
                          type="number"
                          hide-spin-buttons
                          v-model="reservationData.balanceAmount"
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
                        <v-btn
                          tile
                          dark
                          block
                          color="#ff6200"
                          @click="validation()"
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
      checkInMenuVisible: false,
      checkOutMenuVisible: false,
      msg: "",
      selectedDate1: "",
      reserveNo: "",
      disableddates: [],
      reservationData: {},
      nowDate: new Date().toISOString().slice(0, 10),
      shikaraName: "",
      startTime: "",
      endTime: "",
      totalGuests: "",
      bookingMode: "",
      agentname: "",
      guestName: "",
      guestPhoneNumber: "",
      pickerDate: null,
      // perRoomRate: "",
      // perRoomNo: "",
      // extraRoomRate: "",
      // extraRoomNo: "",
      advancePayment: "",
      totalPayableAmount: "",
      balancePayedBy: "",
    };
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
    this.getReservation();
    this.shikaraName = this.$route.query.name;
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();
    const currentMonthYear = `${currentYear}-${String(currentMonth).padStart(
      2,
      "0"
    )}`;
    this.getData(currentMonthYear);
  },
  methods: {
    filterAllowedDates(val) {
      const date = new Date(val);
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

    getData(pickerDate) {
      this.appLoading = true;
      axios({
        url: "/reservation/blocked/shikara/dates",
        method: "POST",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          shikaraId: this.$route.query.id,
          chooseDate: pickerDate,
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
    combineDateTime(dateString, timeString) {
      const formattedDate = `${dateString}T${timeString}:00`;
      return formattedDate;
    },
    validation() {
      // if (!this.selectedDate1) {
      //   this.msg = "Please choose date";
      //   this.showSnackBar = true;
      //   return;
      // } else {
      console.log("this.selectedDate1=", this.selectedDate1);
      this.reserveboat();
      // }
    },
    calculateBalance() {
      console.log("this.advanceAmt", this.reservationData.advancePayment);
      console.log("this.payableAmt", this.reservationData.totalPayableAmount);
      if (
        this.reservationData.advancePayment &&
        this.reservationData.totalPayableAmount
      ) {
        if (
          parseInt(this.reservationData.advancePayment) <=
          parseInt(this.reservationData.totalPayableAmount)
        ) {
          this.reservationData.balanceAmount =
            this.reservationData.totalPayableAmount -
            this.reservationData.advancePayment;
        } else {
          this.reservationData.balanceAmount = 0;
          this.msg = "Advance amount is greater than payable amount";
          this.showSnackBar = true;
        }
      }
    },
    reserveboat() {
      var newarr = [
        this.reservationData.checkInDateCopy,
        this.reservationData.checkInDateCopy,
      ];
      this.appLoading = true;
      axios({
        method: "POST",
        url: "/reservation/shikara/edit",
        data: {
          reservationNo: this.reservationData.reserveNo,
          selectedDate: newarr,
          startTime: this.combineDateTime(
            this.reservationData.checkInDateCopy,
            this.reservationData.startTimeCopy
          ),
          endTime: this.combineDateTime(
            this.reservationData.checkInDateCopy,
            this.reservationData.endTimeCopy
          ),
          totalGuests: this.reservationData.totalGuests,
          bookingMode: this.reservationData.bookingMode,
          agentName: this.reservationData.agentname,
          guestName: this.reservationData.guestName,
          guestPhoneNumber: this.reservationData.guestPhoneNumber,
          advancePayment: this.reservationData.advancePayment,
          totalPayableAmount: this.reservationData.totalPayableAmount,
          balanceAmount: this.reservationData.balanceAmount,
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
          this.showSnackBar = true;
          this.$router.push("/shikaraReservationsList");
        } else {
          this.msg = response.data.msg;
          this.showSnackBar = true;
        }
      });
    },
    getReservation() {
      this.appLoading = true;
      axios({
        url: "/reservation/shikara/view",

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