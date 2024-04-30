<template>
  <div>
    <vue-element-loading
      :active="appLoading"
      :is-full-screen="true"
      background-color="#FFFFFF"
      color="#002635"
      spinner="bar-fade-scale"
    />
    <ServerError v-if="ServerError" />
    <v-snackbar v-model="showsnackbar" color="#f54c0c" right :timeout="timeout">
      <v-layout wrap justify-center>
        <v-flex text-left class="align-self-center">
          <span style="color: white">
            {{ msg }}
          </span>
        </v-flex>

        <v-flex text-right>
          <v-btn small :ripple="false" text @click="showsnackbar = false">
            <v-icon style="color: white">mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-snackbar>
    <v-layout wrap justify-center pa-0 pa-sm-4>
      <v-flex xs12>
        <v-layout wrap justify-center pt-2>
          <v-flex xs6 sm4 align-self-center>
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
              >Shikara Settlement</span
            >
          </v-flex>
          <v-spacer></v-spacer>
        </v-layout>
        <v-layout wrap justify-end v-if="reportData">
          <v-flex xs12 sm3 md3 text-right pr-2 pl-2 pl-md-0 pr-md-4 pt-3 pb-2>
            <v-text-field
              v-model="keyword1"
              dense
              class="rounded-0"
              label="Search"
              outlined
              hide-details
              clearable
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm3 md2 text-right pr-2 pl-2 pl-md-0 pr-md-4 pt-3 pb-2>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="fromDate"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="fromDate"
                  label="From"
                  outlined
                  readonly
                  dense
                  hide-details
                  clearable
                  class="rounded-0"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="fromDate"
                no-title
                scrollable
                @change="$refs.menu.save(fromDate)"
              >
                <v-spacer></v-spacer>
              </v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs12 sm3 md2 text-right pl-2 pl-md-0 pt-3 pb-2>
            <v-menu
              ref="menu1"
              v-model="menu1"
              :close-on-content-click="false"
              :return-value.sync="toDate"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="toDate"
                  label="To"
                  readonly
                  outlined
                  dense
                  hide-details
                  clearable
                  class="rounded-0"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="toDate"
                no-title
                scrollable
                @change="$refs.menu1.save(toDate)"
              >
                <v-spacer></v-spacer>
              </v-date-picker>
            </v-menu>
          </v-flex>
        </v-layout>
        <v-layout wrap justify-space-around>
          <v-flex xs12 v-if="reportData">
            <v-card tile class="pa-4 pa-sm-6" v-if="reportData.length > 0">
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr class="tablefont">
                      <th class="text-left tablefont">No.</th>
                      <th class="text-left tablefont">Shikara Name</th>
                      <th class="text-left tablefont">Customer Name</th>
                      <th class="text-left tablefont">Payed By</th>
                      <th class="text-left tablefont">Date</th>
                      <th class="text-left tablefont">Check-In</th>
                      <th class="text-left tablefont">Check-Out</th>
                      <th class="text-left tablefont">Total Amt(Rs)</th>
                      <th class="text-left tablefont">
                        Shikara Total amt. payment
                      </th>
                      <th class="text-left tablefont">
                        Agent/Customer paid amt.
                      </th>
                      <th class="text-left tablefont">
                        Access payment balance
                      </th>
                      <th class="text-left tablefont">Access pay receipt</th>
                      <th class="text-left tablefont">Verify</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(value, i) in reportData" :key="i">
                      <td class="table">{{ i + 1 }}</td>
                      <td class="table">
                        {{ value.shikaraid.shikaraName }}
                      </td>
                      <td class="table">{{ value.customerDetails.name }}</td>
                      <td class="table">{{ value.bookingType }}</td>
                      <td class="table">
                        {{ formatDate(value.selectedDate) }}
                      </td>
                      <td class="table">
                        {{ formatTimeNew(value.startTime) }}
                      </td>
                      <td class="table">{{ formatTimeNew(value.endTime) }}</td>
                      <td class="table">{{ value.bookingTotal }}</td>
                      <td class="table">{{ value.vendorNetAmount }}</td>
                      <td class="table">{{ value.postBookingamount }}</td>
                      <td class="table">{{ value.vendorBalance }}</td>
                      <td class="table">
                        <v-btn
                          :disabled="value.accessPayReceipt ? false : true"
                          small
                          color="#f17343"
                          dark
                          :href="mediaUURL + value.accessPayReceipt"
                          target="_blank"
                        >
                          <v-icon
                            small
                            style="
                              font-family: LexendFont;
                              font-weight: 300;
                              font-size: 14px;
                              text-transform: none;
                            "
                            >mdi-file-document-outline</v-icon
                          ><span
                            style="
                              font-family: LexendFont;
                              font-weight: 300;
                              font-size: 14px;
                              text-transform: none;
                            "
                            >View receipt</span
                          ></v-btn
                        >
                      </td>
                      <td class="table">
                        <v-btn
                          v-if="value.settlementStatus == 'Success'"
                          small
                          color="#f17343"
                          dark
                          @click="verify(value._id)"
                          ><span
                            style="
                              font-family: LexendFont;
                              font-weight: 300;
                              font-size: 14px;
                              text-transform: none;
                            "
                            >Verify</span
                          ></v-btn
                        >
                        <v-btn
                          v-if="value.settlementStatus == 'Verified'"
                          small
                          color="success"
                          dark
                          ><span
                            style="
                              font-family: LexendFont;
                              font-weight: 300;
                              font-size: 14px;
                              text-transform: none;
                            "
                            >Verified</span
                          ></v-btn
                        >
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card>
            <v-card tile class="pa-4 pa-sm-6" v-else>
              <v-layout wrap py-0 py-sm-4 justify-start>
                <v-flex xs12>
                  <span
                    style="
                      font-family: LexendFont;
                      font-weight: 400;
                      font-size: 20px;
                    "
                    >No data found</span
                  >
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex xs12 v-else>
            <span
              style="font-family: LexendFont; font-weight: 500; font-size: 18px"
              >No data found</span
            >
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout wrap v-if="reportData">
      <v-flex xs12 pt-4 v-if="reportData.length > 0">
        <v-pagination
          small
          color="#ff6200"
          v-model="page"
          :length="Pagelength"
          :total-visible="7"
        >
        </v-pagination>
      </v-flex>
    </v-layout>
  </div>
</template>
  <script>
import axios from "axios";
export default {
  data() {
    return {
      showsnackbar: false,
      timeout: 2000,
      ServerError: false,
      appLoading: false,
      reportData: [],
      msg: null,
      page: 1,
      limit: 20,
      menu: false,
      keyword1: "",
      fromDate: "",
      menu1: false,
      toDate: "",
      triptype: "",
    };
  },
  mounted() {
    this.getData();
  },
  watch: {
    page() {
      this.getData();
    },
    keyword1() {
      this.getData();
    },
    toDate() {
      this.getData();
    },
    fromDate() {
      this.getData();
    },
    triptype() {
      this.getData();
    },
  },
  methods: {
    getData() {
      this.appLoading = true;
      axios({
        url: "/vendor/shikara/settlement",
        method: "Post",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          page: this.page,
          limit: this.limit,
          keyword: this.keyword1,
          toDate: this.toDate,
          fromDate: this.fromDate,
          triptype: this.triptype,
        },
      })
        .then((response) => {
          this.appLoading = false;
          this.reportData = response.data.data;
          this.Pagelength = Math.ceil(response.data.totalLength / this.limit);
        })
        .catch((err) => {
          //   this.ServerError = true;
          console.log(err);
        });
    },
    verify(id) {
      this.appLoading = true;
      axios({
        method: "POST",
        url: "/vendor/verify/shikara/settlement",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          bookingId: id,
        },
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status == true) {
            this.msg = response.data.msg;
            this.snackbar = true;
            this.getData();
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
    formatTimeNew(item) {
      var dt = new Date(item);
      // var day = dt.getDate();
      // var year = dt.getFullYear();
      var hours = dt.getHours();
      var minutes = dt.getMinutes();
      dt = dt.toString();
      var ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime =
        // day + " " + dt.slice(4, 7) + " " + year;
        // +
        // " , " +
        hours + ":" + minutes + " " + ampm;

      return strTime;
    },
  },
};
</script>
  <style scoped>
.gr1 {
  background: linear-gradient(to bottom, rgba(255, 125, 20, 1), #f17343);
}
</style>