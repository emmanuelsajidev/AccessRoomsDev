<template>
  <div>
    <PageLoader v-bind:storage="appLoading" />
    <ServerError v-if="ServerError" />
    <v-snackbar v-model="showSnackBar" color="#F86031" right :timeout="timeout">
      <v-layout wrap justify-center>
        <v-flex text-left align-self-center>{{ msg }}</v-flex>
        <v-flex text-right>
          <v-btn small :ripple="false" text @click="showSnackBar = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-snackbar>
    <v-layout wrap justify-center>
      <v-flex xs12>
        <v-card outlined tile>
          <v-layout wrap justify-center>
            <v-flex xs12 text-center align-self-center pa-2 text-uppercase>
              <v-btn
                :disabled="
                  this.months[this.thisMonth] == this.month  ? true : false
                "
                text
                small
                :ripple="false"
                color="grey darken-2"
                @click="$refs.calendar.prev()"
              >
                <v-icon> mdi-chevron-left </v-icon>
              </v-btn>
              <span
                style="
                  font-family: montserratRegular;
                  font-size: 16px;
                  color: #000000;
                "
              >
                {{ month }} {{ year }}
              </span>
              <v-btn
                :disabled="month == lastDate ? true : false"
                text
                small
                :ripple="false"
                color="grey darken-2"
                @click="$refs.calendar.next()"
              >
                <v-icon> mdi-chevron-right </v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-sheet height="600">
      <v-calendar
        ref="calendar"
        v-model="bookingDate"
        color="primary"
        type="month"
        :events="holidays"
        event-color="deep-purple"
      >
        <template v-slot:day-label="{ day, date, weekday }">
          <v-layout
            wrap
            justify-center
            :style="{
              'background-color': bookingDate == date ? '#F86031' : '',
            }"
            @click="
              date >= today && dateExist(date) ? (bookingDate = date) : null
            "
            py-6
          >
            <v-flex
              xs12
              :style="{
                color:
                  bookingDate == date
                    ? '#FFFFFF'
                    : date < today
                    ? '#F7F7F7'
                    : weekday == 0 || weekday == 6
                    ? '#673ab7'
                    : dateExist(date)
                    ? '#000000'
                    : '#FF0000',
              }"
              style="font-weight: 500"
            >
              {{ day }}
            </v-flex>
          </v-layout>
        </template>
        <!-- <template v-slot:event="{ event }">
          <v-card tile color="deep-purple" dark >
            <v-layout wrap justify-center>
              <v-flex xs12 text-center text-capitalize>
                {{ event.name }}
              </v-flex>
            </v-layout>
          </v-card>
        </template> -->
      </v-calendar>
    </v-sheet>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data: () => ({
    appLoading: false,
    ServerError: false,
    showSnackBar: false,
    timeout: 5000,
    msg: null,
    today: new Date(new Date().getTime() + 1000 * 3600 * 24), // This Day for checking availability
    thisMonth: Number(new Date().getMonth()), // This Month for checking availability
    bookingDate: new Date(new Date().getTime() + 1000 * 3600 * 24), // Date Selected for Booking
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    selected: "",
    month: null, // Month used to display as heder for Calender
    year: null, // Year used to display as heder for Calender
    availableDates: [],
    holidays: [],
    lastDate: null,
    availableDatesF: null,
  }),
  beforeMount() {
    if (Number(this.today.getHours()) >= 17) {
      this.today.setDate(this.today.getDate() + 1);
      this.today = new Date(this.today.setHours(0, 0));
    }
    if (Number(this.bookingDate.getHours()) >= 17) {
      this.bookingDate.setDate(this.bookingDate.getDate() + 1);
      this.bookingDate = new Date(this.bookingDate.setHours(0, 0));
    }
    // this.today = this.formatDate(this.today);
    
    // console.log("thismnth=",this.thisMonth)
    this.bookingDate = this.formatDate(this.bookingDate);
    // this.getData();
  },
  watch: {
    bookingDate() {
      if (this.bookingDate) {
        this.$emit("stepper", {
          date: this.bookingDate,
        });
        let date = this.bookingDate;
        let mn=date.slice(5,7)
        var month=parseInt(mn)
        // if(month<10) {
          
        // month = date.slice(6, 7);
        // }
        // else {
          
        // month = date.slice(4, 7);
        // }
        this.month = this.months[month-1];
        // console.log("month cap fin=",this.month)
        // console.log("gher=", this.bookingDate);
        this.formatDate(this.bookingDate);
      }
    },
    // bookingDate() {
    //   if (this.bookingDate) {
    //     this.$emit("stepper", {
    //       date: this.bookingDate,
    //     });
    //     let date = new Date(this.bookingDate);
    //     let month = date.getMonth();
    //     this.month = this.months[month];
    //     console.log("gher=", this.bookingDate);
    //     this.formatDate(this.bookingDate);
    //   }
    // },
  },
  methods: {
    // checkDate(inday, seldate) {
    //   let a = new Date(inday);
    //   a = a.getMonth();
    //   let b = new Date(seldate);
    //   b = b.getMonth();
    //   if (a !== b) {
    //     console.log("Today=", a);
    //     console.log("Sel Date=", b);
    //   }
    // },
    getData() {
      var myDate = new Date();
      this.appLoading = true;
      axios({
        method: "GET",
        url: "/booking/getavailabledates",
        params: {
          start: myDate,
          programme: this.$route.query.type,
        },
      })
        .then((response) => {
          this.appLoading = false;
          this.availableDates = response.data.data;
          this.availableDatesF = response.data.data;
          this.availableDates = this.availableDates.map((item) =>
            this.formatDate(item)
          );
          // if (this.availableDates[0]) {
          //   console.log("bookdt=", this.availableDates[0]);
          // }
          if (response.data.data) {
            if (response.data.data[0]) {
              this.bookingDate = response.data.data[0].slice(0, 10);
              
              this.today=response.data.data[0].slice(0, 10)
            }
            if(response.data.data.length>0) {
              var lmonth= response.data.data[response.data.data.length - 1]
              // console.log("lmonth",lmonth.slice(5,7))
              let l=lmonth.slice(5,7)
              l=parseInt(l)
              //  console.log("lastt==",l)
               this.lastDate = this.months[l-1]
            }
          }
          // this.bookingDate = this.availableDates[0].slice(0, 10);
          // console.log(this.bookingDate)
          this.holidays = response.data.holiday;
          // this.lastDate = this.months[
          //   new Date(
          //     this.availableDates[this.availableDates.length - 1]
          //   ).getMonth()
          // ];
        
          for (var i = 0; i < this.holidays.length; i++) {
            this.holidays[i].start = this.ftDate(this.holidays[i].start);
            // var tz=this.holidays[i].start
            // // tz=tz.toUTCString()
            // console.log("-----------")
            // console.log("-",tz )
            // this.holidays[i].start=tz
            // console.log("-----------")

            this.holidays[i].end = this.ftDate(this.holidays[i].end);

            // var tzz=this.holidays[i].end
            // tzz=tzz.toUTCString()
            // console.log("-----------")
            // console.log("ebnd-",tzz )
            // this.holidays[i].end=tzz
            // console.log("-----------")
          }
        })
        .catch((err) => {
          this.appLoading = false;
          this.ServerError = true;
          console.log(err);
        });
    },
    dateExist(item) {
      // console.log("available dt", item);
      // console.log(this.availableDates);

      if (this.availableDatesF) {
      // console.log("l==",this.availableDatesF);
        var exist = this.availableDatesF.find((date) => {
          date = date.slice(0,10)
          // console.log("fu=", date);
          return date == item;
        });
        return exist;
      }
    },
    monthExist() {
      console.log(this.existingMonths);
    },
    // formatDate(item) {
    //   var dt = new Date(item);

    //   // console.log("EminDy=", day);
    //   var month = dt.getMonth();
    //   this.year = dt.getFullYear();

    //   dt = dt.toUTCString();
    //   var day = dt.slice(5, 7);
    //   month = month + 1;
    //   if (month < 10) month = "0" + month;
    //   if (day < 10) day = "" + day;
    //   var strTime = this.year + "-" + month + "-" + day;
    //   console.log("error after= ",strTime)
    //   return strTime;
    // },

    // testing
    formatDate(item) {
      let a = JSON.stringify(item);
      let d = a.slice(1, 11);
      this.year = a.slice(1,5)
      // console.log(d);
      return d
    },

    // end testing
    // formatDate(item) {
    //   var dt = new Date(item);
    //   var day = dt.getDate();
    //   var month = dt.getMonth();
    //   this.year = dt.getFullYear();
    //   month = month + 1;
    //   if (month < 10) month = "0" + month;
    //   if (day < 10) day = "0" + day;
    //   var strTime = this.year + "-" + month + "-" + day;
    //   console.log("error after= ",strTime)
    //   return strTime;
    // },
    ftDate(item) {
      // var dt = new Date(item);
      // var month = dt.getMonth();
      // this.year = dt.getFullYear();
      // dt = dt.toUTCString();
      // var day = dt.slice(5, 7);
      // month = month + 1;
      // if (month < 10) month = "0" + month;
      // // if (day < 10) day = "0" + day;
      // var strTime = this.year + "-" + month + "-" + day;
      // return strTime;

      let a = JSON.stringify(item);
      let d = a.slice(1, 11);
      // console.log("holy=",d);
      return d
    },

    // prev data 
    // ftDate(item) {
    //   var dt = new Date(item);
    //   var month = dt.getMonth();
    //   this.year = dt.getFullYear();
    //   dt = dt.toUTCString();
    //   var day = dt.slice(5, 7);
    //   month = month + 1;
    //   if (month < 10) month = "0" + month;
    //   // if (day < 10) day = "0" + day;
    //   var strTime = this.year + "-" + month + "-" + day;
    //   return strTime;
    // },
  },
};
</script>
<style>
.v-event.v-event-start.v-event-end {
  width: 100% !important;
}
</style>
