<template>
  <div>
    <PageLoader v-bind:storage="appLoading" />
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
    <v-layout wrap justify-center pa-0>
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
              >Settlement</span
            >
          </v-flex>
        </v-layout>
        <v-card color="transparent" elevation="0" v-if="newflag == true">
          <v-tabs
            v-model="myTab"
            background-color="transparent"
            color="#ff6200"
            left
          >
            <v-tab
              v-if="tab1Flag == true"
              :style="
                myTab == 0
                  ? 'background-color:#ff6200'
                  : 'background-color:white'
              "
            >
              <span
                :style="myTab == 0 ? 'color:white' : 'color:black'"
                style="
                  font-family: LexendFont;
                  font-weight: 500;
                  font-size: 14px;
                "
                >Houseboat</span
              ></v-tab
            >
            <v-tab
              v-if="tab2Flag == true"
              :style="
                myTab == 1
                  ? 'background-color:#ff6200'
                  : 'background-color:white'
              "
            >
              <span
                :style="myTab == 1 ? 'color:white' : 'color:black'"
                style="
                  font-family: LexendFont;
                  font-weight: 500;
                  font-size: 14px;
                "
                >Shikara</span
              ></v-tab
            >
            <v-tab-item v-if="tab1Flag == true">
              <v-layout wrap justify-end v-if="houseboatData">
                <v-flex
                  xs12
                  sm4
                  md3
                  text-right
                  pr-2
                  pl-2
                  pl-md-0
                  pr-md-4
                  pt-3
                  pb-2
                >
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
                <v-flex
                  xs12
                  sm4
                  md2
                  text-right
                  pr-2
                  pl-2
                  pl-md-0
                  pr-md-4
                  pt-3
                  pb-2
                >
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
                <v-flex
                  xs12
                  sm4
                  md2
                  text-right
                  pr-2
                  pl-2
                  pl-md-0
                  pr-md-4
                  pt-3
                  pb-2
                >
                  <v-menu
                    ref="menu1"
                    v-model="menu1"
                    :close-on-content-click="false"
                    :return-value.sync="toDate"
                    transition="scale-transition"
                    offset-y
                    left
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

                <v-flex
                  xs12
                  sm4
                  md2
                  text-right
                  pr-2
                  pl-2
                  pl-md-0
                  pr-md-4
                  pt-3
                  pb-2
                >
                  <v-btn
                    class="downlink"
                    target="_blank"
                    @click="getExcelhouseboat()"
                    color="#FF681F"
                    block
                  >
                    <v-icon color="white">mdi-download</v-icon>
                    <span style="color: white">Excel Report</span>
                  </v-btn>
                </v-flex>
              </v-layout>
              <v-layout wrap justify-center v-if="houseboatData">
                <v-flex xs12 v-if="houseboatData.length > 0">
                  <v-card
                    tile
                    class="pa-4 pa-sm-6"
                    elevation="0"
                    v-if="houseboatData.length > 0"
                  >
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr class="tablefont">
                            <th class="text-left tablefont">No.</th>
                            <th class="text-left tablefont">Houseboat Name</th>
                            <th class="text-left tablefont">
                              Customer/ Agent Name
                            </th>
                            <th class="text-left tablefont">Booked By</th>

                            <th class="text-left tablefont">Check-In</th>
                            <th class="text-left tablefont">Check-Out</th>

                            <th class="text-left tablefont">Trip-Type</th>
                            <th class="text-left tablefont">No. of Rooms</th>

                            <th class="text-left tablefont">Total Amt(Rs)</th>
                            <th class="text-left tablefont">
                              Houseboat Total amt. payment
                            </th>
                            <th class="tablefont">Advance Amount</th>
                            <th class="text-left tablefont">Balance Amount</th>
                            <th class="text-left tablefont">
                              Balance Amount Mode
                            </th>
                            <th class="text-left tablefont">
                              Balance Amount Status
                            </th>

                            <th class="text-left tablefont">
                              Access Payment Balance
                            </th>
                            <th class="text-left tablefont">
                              Access pay receipt
                            </th>
                            <th class="text-left tablefont">Verify</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(value, i) in houseboatData" :key="i">
                            <td class="table">{{ i + 1 }}</td>
                            <td class="table">
                              {{ value.houseBoatId.houseBoatName }}
                            </td>
                            <td class="table">
                              <span v-if="value.fullName">
                                {{ value.fullName }}
                              </span>
                              <span v-if="value.userid.companyName">
                                ({{ value.userid.companyName }})
                              </span>
                            </td>
                            <td class="table">{{ value.bookingType }}</td>

                            <td class="table">
                              {{ formatDate(value.startDate) }}
                            </td>
                            <td class="table">
                              {{ formatDate(value.endDate) }}
                            </td>

                            <td class="table">
                              {{ value.tripType }}
                            </td>
                            <td>
                              <span
                                style="font-size: 16px"
                                class="table"
                                v-if="value.totalRooms"
                              >
                                {{ value.totalRooms }}
                              </span>
                            </td>

                            <td class="table">{{ value.totalAmount }}</td>
                            <td class="table">{{ value.vendorNetAmount }}</td>
                            <td class="table">
                              Rs. {{ value.advanceAmountPaid }}
                            </td>

                            <td class="table">
                              Rs. {{ value.balancePayAmount }}
                            </td>
                            <td v-if="value" class="table">
                              <span v-if="value.advancepaymentMode">
                                {{ value.advancepaymentMode }}
                              </span>
                              <span v-else> Payment at houseboat </span>
                            </td>

                            <td
                              class="table"
                              v-if="value.advancepaymentMode == 'Agent'"
                            >
                              {{ value.balancepaymentStatus }}
                            </td>
                            <td class="table" v-else>-</td>

                            <td>
                              <span
                                class="table"
                                style="font-size: 16px"
                                v-if="value.vendorBalance"
                              >
                                Rs. {{ value.vendorBalance }}
                              </span>
                              <span
                                v-else
                                style="font-size: 16px"
                                class="table"
                              >
                                0
                              </span>
                            </td>
                            <td class="table">
                              <v-btn
                                :disabled="
                                  value.accessPayReceipt ? false : true
                                "
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
                  <v-card tile class="pa-4 pa-sm-6" elevation="0" v-else>
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
                <v-flex xs12 pa-4 v-else>
                  <span
                    style="
                      font-weight: 400;
                      font-size: 20px;
                      font-family: LexendRegular;
                      text-align: center;
                    "
                  >
                    No settlements found
                  </span>
                </v-flex>
              </v-layout>

              <v-layout
                v-if="houseboatData.length > 0"
                wrap
                justify-center
                pb-3
              >
                <v-flex xs11>
                  <v-layout wrap>
                    <v-flex xs12 id="specific-section">
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
                </v-flex>
              </v-layout>
            </v-tab-item>
            <v-tab-item v-if="tab2Flag == true">
              <v-layout wrap justify-end v-if="shikaraData">
                <v-flex
                  xs12
                  sm4
                  md3
                  text-right
                  pr-2
                  pl-2
                  pl-md-0
                  pr-md-4
                  pt-3
                  pb-2
                >
                  <v-text-field
                    v-model="keyword2"
                    dense
                    class="rounded-0"
                    label="Search"
                    outlined
                    hide-details
                    clearable
                  ></v-text-field>
                </v-flex>
                <v-flex
                  xs12
                  sm4
                  md2
                  text-right
                  pr-2
                  pl-2
                  pl-md-0
                  pr-md-4
                  pt-3
                  pb-2
                >
                  <v-menu
                    ref="menu2"
                    v-model="menu2"
                    :close-on-content-click="false"
                    :return-value.sync="fromDate2"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="fromDate2"
                        label="From"
                        outlined
                        readonly
                        hide-details
                        dense
                        clearable
                        class="rounded-0"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="fromDate2"
                      no-title
                      scrollable
                      @change="$refs.menu2.save(fromDate2)"
                    >
                      <v-spacer></v-spacer>
                    </v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex
                  xs12
                  sm4
                  md2
                  text-right
                  pr-2
                  pl-2
                  pl-md-0
                  pr-md-4
                  pt-3
                  pb-2
                >
                  <v-menu
                    ref="menu3"
                    v-model="menu3"
                    :close-on-content-click="false"
                    :return-value.sync="toDate2"
                    transition="scale-transition"
                    offset-y
                    left
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="toDate2"
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
                      v-model="toDate2"
                      no-title
                      scrollable
                      @change="$refs.menu3.save(toDate2)"
                    >
                      <v-spacer></v-spacer>
                    </v-date-picker>
                  </v-menu>
                </v-flex>

                <v-flex
                  xs12
                  sm4
                  md2
                  text-right
                  pr-2
                  pl-2
                  pl-md-0
                  pr-md-4
                  pt-3
                  pb-2
                >
                  <v-btn
                    class="downlink"
                    target="_blank"
                    @click="getExcelshikara()"
                    color="#FF681F"
                    block
                  >
                    <v-icon color="white">mdi-download</v-icon>
                    <span style="color: white">Excel Report</span>
                  </v-btn>
                </v-flex>
              </v-layout>
              <v-layout wrap justify-center v-if="shikaraData">
                <v-flex xs12 v-if="shikaraData.length > 0">
                  <v-card
                    tile
                    class="pa-4 pa-sm-6"
                    elevation="0"
                    v-if="shikaraData.length > 0"
                  >
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr class="tablefont">
                            <th class="text-left tablefont">No.</th>
                            <th class="text-left tablefont">Shikara Name</th>
                            <th class="text-left tablefont">
                              Agent/Customer Name
                            </th>

                            <th class="text-left tablefont">Booked By</th>
                            <th class="text-left tablefont">Payed By</th>
                            <th class="text-left tablefont">Date</th>
                            <th class="text-left tablefont">Check-In</th>
                            <th class="text-left tablefont">Check-Out</th>
                            <th class="text-left tablefont">Total Amt(Rs)</th>
                            <th class="text-left tablefont">
                              Shikara Total amt. payment
                            </th>

                            <th class="text-left tablefont">Advance Amount</th>
                            <th class="text-left tablefont">
                              Agent/Customer paid amt.
                            </th>

                            <th class="text-left tablefont">Balance Amount Mode</th>
                            <th class="text-left tablefont">
                              Balance Amount Status
                            </th>

                            <th class="text-left tablefont">
                              Access payment balance
                            </th>
                            <th class="text-left tablefont">
                              Access pay receipt
                            </th>
                            <th class="text-left tablefont">Verify</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(value, i) in shikaraData" :key="i">
                            <td class="table">{{ i + 1 }}</td>
                            <td class="table">
                              {{ value.shikaraid.shikaraName }}
                            </td>
                            <td class="table">
                              {{ value.customerDetails.name }}
                            </td>
                            <td class="table">
                              {{ value.bookedbyid.role }}
                            </td>

                            <td class="table">{{ value.bookingType }}</td>
                            <td class="table">
                              {{ formatDate(value.selectedDate) }}
                            </td>
                            <td class="table">
                              {{ formatTimeNew(value.startTime) }}
                            </td>
                            <td class="table">
                              {{ formatTimeNew(value.endTime) }}
                            </td>
                            <td class="table">{{ value.bookingTotal }}</td>

                            <td class="table">{{ value.vendorNetAmount }}</td>
                            <td class="table">
                              Rs. {{ parseInt(value.advance) }}
                            </td>
                            <td class="table">{{ value.postBookingamount }}</td>

                            <td v-if="value" class="table">
                              <span v-if="value.advancepaymentMode">
                                {{ value.advancepaymentMode }}
                              </span>
                              <span v-else> Payment at Shikara </span>
                            </td>

                            <td
                              class="table"
                              v-if="value.advancepaymentMode == 'Agent'"
                            >
                              {{ value.balancepaymentStatus }}
                            </td>
                            <td class="tablefont" v-else>-</td>

                            <td>
                              <span class="tablefont" v-if="value.vendorBalance">
                                Rs. {{ value.vendorBalance }}
                              </span>
                              <span v-else class="tablefont"> 0 </span>
                            </td>

                            <td class="tablefont">
                              <v-btn
                                :disabled="
                                  value.accessPayReceipt ? false : true
                                "
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
                            <td class="tablefont">
                              <v-btn
                                v-if="value.settlementStatus == 'Success'"
                                small
                                color="#f17343"
                                dark
                                @click="verify2(value._id)"
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
                  <v-card tile class="pa-4 pa-sm-6" elevation="0" v-else>
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
              </v-layout>

              <v-layout v-if="shikaraData.length > 0" wrap justify-center pb-3>
                <v-flex xs11>
                  <v-layout wrap>
                    <v-flex xs12 id="specific-section">
                      <v-pagination
                        small
                        color="#ff6200"
                        v-model="page2"
                        :length="Pagelength2"
                        :total-visible="7"
                      >
                      </v-pagination>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
     <script>
import axios from "axios";
export default {
  data() {
    return {
      snackbar: false,
      timeout: 2000,
      ServerError: false,
      appLoading: false,
      houseboatData: [],
      msg: null,
      page: 1,
      limit: 20,
      newflag: false,
      menu: false,
      keyword1: "",
      fromDate: "",
      menu1: false,
      toDate: "",
      triptype: "",
      //    shikara
      shikaraData: [],
      page2: 1,
      limit2: 20,
      menu2: false,
      keyword2: "",
      fromDate2: "",
      menu3: false,
      toDate2: "",
      //
      myTab: "",
      tab1Flag: false,
      tab2Flag: false,
    };
  },
  computed: {
    boatType() {
      return this.$store.state.boatType;
    },
  },
  mounted() {
    this.getData();
    this.getData2();
  },
  watch: {
    // houseboat
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
    //    shikara
    page2() {
      this.getData2();
    },
    keyword2() {
      this.getData2();
    },
    toDate2() {
      this.getData2();
    },
    fromDate2() {
      this.getData2();
    },
  },
  methods: {
    // houseboat
    getData() {
      this.appLoading = true;
      axios({
        url: "/vendor/houseboat/settlement",
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
          this.houseboatData = response.data.data;

          //   this.myTab = 0;
          if (this.boatType) {
            console.log("boatType length=", this.boatType.length);
            console.log("boatType=", this.boatType.length);
            if (this.boatType.length == 2) {
              this.tab1Flag = true;
              this.tab2Flag = true;
            } else {
              if (this.boatType[0] == "Houseboat") {
                this.tab1Flag = true;
                this.tab2Flag = false;
                this.myTab = 0;
              } else {
                this.tab1Flag = false;
                this.tab2Flag = true;
                this.myTab = 1;
              }
            }
            console.log("tab1Flag=", this.tab1Flag);
            console.log("tab2Flag=", this.tab2Flag);
            console.log("myTab=", this.myTab);
          }
          this.Pagelength = Math.ceil(response.data.totalLength / this.limit);
          this.newflag = true;
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
        url: "/vendor/verify/houseboat/settlement",
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
            this.myTab = 0;
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
    //    shikara
    getData2() {
      this.appLoading = true;
      axios({
        url: "/vendor/shikara/settlement",
        method: "Post",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          page: this.page2,
          limit: this.limit2,
          keyword: this.keyword2,
          toDate: this.toDate2,
          fromDate: this.fromDate2,
        },
      })
        .then((response) => {
          this.appLoading = false;
          this.shikaraData = response.data.data;
          //   this.myTab = 1;
          this.Pagelength2 = Math.ceil(response.data.totalLength / this.limit2);
        })
        .catch((err) => {
          //   this.ServerError = true;
          console.log(err);
        });
    },
    verify2(id) {
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
            this.myTab = 1;
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
    getExcelshikara() {
      this.appLoading = true;
      axios({
        method: "GET",
        url: "/download/excel/skbooking",
        headers: {
          token: localStorage.getItem("token"),
        },
        responseType: "blob",
        params: {
          tripType: this.triptype,
          keyword: this.keywordcurrent,
          fromDate: this.fromdatecurrent,
          toDate: this.todatecurrent,
        },
      })
        .then((response) => {
          this.appLoading = false;
          const url = URL.createObjectURL(
            new Blob([response.data], {
              type: "application/vnd.ms-excel",
            })
          );
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Settlement shikara.xlsx");
          document.body.appendChild(link);
          link.click();
        })
        .catch((err) => {
          this.appLoading = false;
          this.ServerError = true;
          console.log(err);
        });
    },
    getExcelhouseboat() {
      this.appLoading = true;
      axios({
        method: "GET",
        url: "/download/excel/hbbooking",
        headers: {
          token: localStorage.getItem("token"),
        },
        responseType: "blob",
        params: {
          tripType: this.triptype,
          keyword: this.keywordcurrent,
          fromDate: this.fromdatecurrent,
          toDate: this.todatecurrent,
        },
      })
        .then((response) => {
          this.appLoading = false;
          const url = URL.createObjectURL(
            new Blob([response.data], {
              type: "application/vnd.ms-excel",
            })
          );
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Settlement Houseboat.xlsx");
          document.body.appendChild(link);
          link.click();
        })
        .catch((err) => {
          this.appLoading = false;
          this.ServerError = true;
          console.log(err);
        });
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