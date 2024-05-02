<template>
  <div>
    <vue-element-loading
      :active="appLoading"
      :is-full-screen="true"
      background-color="#FFFFFF"
      color="#FF681F"
      spinner="spinner"
    />
    <v-layout wrap justify-center>
      <v-flex xs12 pa-8>
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
        <v-layout wrap justify-center>
          <v-flex xs12 pb-1>
            <span
              class="mainfont"
              style="font-weight: bold; text-transform: none"
            >
              Shikara Booking List
            </span>
          </v-flex>
          <v-flex xs12>
            <v-layout wrap justify-start pt-2>
              <v-flex pt-2 pl-lg-0 pl-2 xs12 sm4 lg2>
                <v-menu
                  ref="HmenuCheckInVisible"
                  v-model="HmenuCheckInVisible"
                  :close-on-content-click="false"
                  :return-value.sync="fromdate"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="fromdate"
                      outlined
                      readonly
                      label=" From Date"
                      color="orange"
                      dense
                      hide-details="auto"
                      clearable
                      class="mainfont rounded-0"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="fromdate"
                    no-title
                    color="orange"
                    scrollable
                    @change="$refs.HmenuCheckInVisible.save(fromdate)"
                  >
                    <v-spacer></v-spacer>
                  </v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex pl-2 pt-2 xs12 sm4 lg2>
                <v-menu
                  ref="HmenuCheckOutVisible"
                  v-model="HmenuCheckOutVisible"
                  :close-on-content-click="false"
                  :return-value.sync="todate"
                  transition="scale-transition"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="todate"
                      outlined
                      readonly
                      label=" To Date"
                      color="orange"
                      dense
                      hide-details="auto"
                      clearable
                      class="rounded-0 mainfont"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="todate"
                    no-title
                    color="orange"
                    :min="fromdate"
                    @change="$refs.HmenuCheckOutVisible.save(todate)"
                  >
                    <v-spacer></v-spacer>
                  </v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex pl-2 pt-2 xs12 sm4 lg2>
                <v-autocomplete
                  outlined
                  class="mainfont"
                  dense
                  color="orange"
                  :items="statuslist"
                  v-model="status"
                  label="Status"
                  style="border-radius: 0px; border-color: #626262"
                  item-text="name"
                  item-value="_id"
                  item-color="#FF1313"
                  hide-details="true"
                ></v-autocomplete>
              </v-flex>

              <v-flex pl-2 pt-2 xs12 sm4 lg2>
                <v-autocomplete
                  outlined
                  class="mainfont"
                  dense
                  color="orange"
                  :items="payedByList"
                  v-model="payedBy"
                  label="Payed By"
                  style="border-radius: 0px; border-color: #626262"
                  item-text="name"
                  item-value="_id"
                  item-color="#FF1313"
                  hide-details="true"
                ></v-autocomplete>
              </v-flex>

              <v-flex pl-2 pt-2 xs12 sm4 lg2>
                <v-text-field
              v-model="keyword"
              outlined
              dense
              hide-details
              clearable
              color="orange"
              label="Search "
              style="border-radius: 0%"
            >
              <template v-slot:label>
                <span
                  class="custom-label-text mainfont"
                  style="color: black; font-size: 14px"
                  >Search
                </span>
              </template>
            </v-text-field>
              </v-flex>

            </v-layout>
          </v-flex>
        </v-layout>
        <v-layout v-if="list.length > 0" wrap justify-center>
          <v-flex xs12>
            <v-layout wrap justify-center>
              <v-flex xs12 pt-8>
                <v-card elevation="0">
                  <v-layout wrap justify-center pb-6>
                    <v-flex xs11 v-for="(item, i) in list" :key="i" pt-5>
                      <v-card
                        elevation="0"
                        color="#EDEDED"
                        style="border-radius: 12px"
                      >
                        <v-layout wrap justify-center>
                          <v-flex class="hidden-sm-and-down" xs12 lg3>
                            <v-layout wrap justify-start v-if="item">
                              <v-flex xs12 v-if="item.shikaraid">
                                <v-flex v-if="item.shikaraid.coverImage">
                                  <v-img
                                    class="customcard2"
                                    height="150px"
                                    width="100%"
                                    style="border-radius: 12px 0px 0px 12px"
                                    :src="
                                      mediaURLnewx + item.shikaraid.coverImage
                                    "
                                  >

                                  <v-layout
                                      wrap
                                      fill-height
                                      justify-center
                                      v-if="
                                        item.advancepaymentStatus === 'Success' && item.status == 'Active'
                                      "
                                    >
                                      <v-flex pb-2 pl-4 pr-4 align-self-end>
                                        <v-btn
                                          @click="downloadTicket(item._id)"
                                          block
                                          color="#F17343"
                                        >
                                          <span
                                            style="
                                              font-family: mainfont;
                                              color: white;
                                              font-size: 11px;
                                            "
                                          >
                                            Download Ticket
                                          </span>
                                          <v-icon color="white"
                                            >mdi-download</v-icon
                                          >
                                        </v-btn>
                                      </v-flex>
                                    </v-layout>
                                    <template v-slot:placeholder>
                                      <ImageLoader />
                                    </template>
                                  </v-img>
                                </v-flex>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                          <v-flex class="hidden-md-and-up" xs12 lg3>
                            <v-layout wrap justify-start v-if="item">
                              <v-flex xs12 v-if="item.shikaraid">
                                <v-flex v-if="item.shikaraid.coverImage">
                                  <v-img
                                    class="customcard2"
                                    height="150px"
                                    width="100%"
                                    :src="
                                      mediaURLnewx + item.shikaraid.coverImage
                                    "
                                  >
                                  <v-layout
                                      wrap
                                      fill-height
                                      justify-center
                                      v-if="
                                        item.advancepaymentStatus === 'Success' && item.status == 'Active'
                                      "
                                    >
                                      <v-flex pb-2 pl-4 pr-4 align-self-end>
                                        <v-btn
                                          @click="downloadTicket(item._id)"
                                          block
                                          color="#F17343"
                                        >
                                          <span
                                            style="
                                              font-family: mainfont;
                                              color: white;
                                              font-size: 11px;
                                            "
                                          >
                                            Download Ticket
                                          </span>
                                          <v-icon color="white"
                                            >mdi-download</v-icon
                                          >
                                        </v-btn>
                                      </v-flex>
                                    </v-layout>
                                    <template v-slot:placeholder>
                                      <ImageLoader />
                                    </template>
                                
                                </v-img>
                                </v-flex>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                          <v-flex xs12 lg9 pl-6>
                            <v-layout wrap justify-start fill-height>
                              <v-flex
                                xs12
                                sm4
                                md4
                                lg4
                                pt-3
                                text-left
                                align-self-center
                              >
                                <v-layout wrap>
                                  <v-flex xs12>
                                    <span
                                      style="
                                        font-weight: 500;
                                        font-size: 20px;
                                        font-weight: bold;
                                        font-family: mainfont;
                                      "
                                    >
                                      {{ item.shikaraid.shikaraName }}
                                      <!-- <span
                                                                          style="font-weight: 300; font-size: 14px; font-family: mainfont;">
                                                                          {{ item.bookingType }}
                                                                      </span> -->
                                    </span>
                                  </v-flex>
                                  <v-flex xs12 pt-3>
                                    <span
                                      style="
                                        font-family: mainfont;
                                        font-size: 14px;
                                        font-weight: 500;
                                      "
                                    >
                                      Booking # :
                                    </span>
                                    <span
                                      style="color: #f17343; font-size: 15px"
                                    >
                                      &nbsp; {{ item.bookingNo }}
                                    </span>
                                  </v-flex>

                                  <v-flex pt-3>
                                    <span
                                      style="
                                        font-family: mainfont;
                                        font-size: 15px;
                                        font-weight: 500;
                                      "
                                    >
                                      Slot :&nbsp;
                                      <span style="color: #f17343">
                                        {{ formattedDate(item.selectedDate) }},
                                        {{ formatTimeNew(item.startTime) }}

                                        -

                                        {{ formatTimeNew(item.endTime)  }}
                                      </span>
                                    </span>
                                  </v-flex>
                                </v-layout>
                              </v-flex>

                              <v-flex
                                xs12
                                sm4
                                md4
                                lg4
                                text-left
                                align-self-center
                                v-if="item"
                              >
                                <v-layout wrap v-if="item.customerDetails">
                                  <v-flex xs12 pt-3>
                                    <span
                                      style="
                                        font-weight: 400;
                                        font-size: 14px;
                                        font-family: mainfont;
                                      "
                                    >
                                      Booked for : &nbsp;
                                    </span>
                                    <span
                                      v-if="item.customerDetails"
                                      style="
                                        color: #f17343;
                                        font-family: mainfont;
                                        font-size: 15px;
                                      "
                                    >
                                      {{ item.customerDetails.name }},
                                      {{ item.customerDetails.phoneNumber }}
                                    </span>
                                  </v-flex>
                                  <v-flex xs12 text-left pt-4>
                                    <span
                                      style="
                                        font-family: mainfont;
                                        font-size: 14px;
                                        font-weight: 500;
                                      "
                                    >
                                      Advance :&nbsp;
                                      <span style="color: #f17343">
                                        ₹ {{ item.advance }}
                                      </span>
                                    </span>
                                  </v-flex>

                                  <v-flex xs12 text-left pt-3>
                                    <span
                                      style="
                                        font-family: mainfont;
                                        font-size: 14px;
                                        font-weight: 500;
                                      "
                                    >
                                      Balance :&nbsp;

                                      <span
                                        style="color: red"
                                        v-if="
                                          item.balancepaymentStatus ==
                                            'Pending' &&
                                          item.advancepaymentMode == 'Agent'
                                        "
                                      >
                                        ₹ {{ item.postBookingamount }} Not Paid
                                      </span>
                                      <span
                                        style="color: green"
                                        v-else-if="
                                          item.balancepaymentStatus ==
                                            'Success' &&
                                          item.advancepaymentMode == 'Agent'
                                        "
                                      >
                                        ₹ {{ item.postBookingamount }} Paid
                                      </span>
                                      <span style="color: green" v-else>
                                        ₹ {{ item.postBookingamount }}
                                      </span>
                                    </span>
                                  </v-flex>
                                </v-layout>
                              </v-flex>

                              <v-flex xs12 sm4 md4 lg4 align-self-center>
                                <v-layout wrap justify-end>
                                  <v-flex
                                    class="hidden-sm-and-down"
                                    xs12
                                    text-center
                                    pl-3
                                    pr-1
                                    pb-2
                                  >
                                    <span
                                      style="
                                        font-family: mainfont;
                                        color: black;
                                        font-size: 20px;
                                        font-weight: 600;
                                      "
                                    >
                                      ₹ {{ item.bookingTotal }}
                                    </span>
                                  </v-flex>
                                  <v-flex
                                    class="hidden-md-and-up"
                                    xs12
                                    text-left
                                    pt-2
                                  >
                                    <span
                                      style="
                                        font-family: mainfont;
                                        color: black;
                                        font-size: 20px;
                                        font-weight: 600;
                                      "
                                    >
                                      ₹ {{ item.bookingTotal }}
                                    </span>
                                  </v-flex>

                                  <v-flex
                                    class="hidden-sm-and-down"
                                    xs12
                                    text-center
                                    pl-3
                                    pr-10
                                    pl-10
                                    pb-3
                                  >
                                    <v-btn
                                    @click="gotoView(item._id)"
                                      block
                                      color="#F17343"
                                    >
                                      <span
                                        style="
                                          font-family: mainfont;
                                          color: white;
                                          font-size: 14px;
                                          font-weight: 400;
                                          text-transform: none;
                                        "
                                      >
                                        View Details
                                      </span>
                                    </v-btn>
                                  </v-flex>

                                  <v-flex
                                  
                                    xs12
                                    md10
                                    lg12
                                    text-center
                                    pl-lg-3
                                    pr-lg-10
                                    pl-lg-10
                                    pr-md-10
                                    pb-3
                                    pr-3
                                  >
                                  <v-btn
                                     v-if="!item.isReschedule == true && isStartDatePassed(item.selectedDate) && item.status == 'Active'"
                                      @click="
                                        $router.push(
                                          'resheduleShikara?id=' +
                                            item._id +
                                            '&&name=' +
                                            item.shikaraid.shikaraName
                                        )
                                      "
                                      block
                                      color="#F17343"
                                    >
                                      <span
                                        style="
                                          font-family: mainfont;
                                          color: white;
                                          font-size: 14px;
                                          font-weight: 400;
                                          text-transform: none;
                                        "
                                      >
                                        Reschedule
                                      </span>
                                    </v-btn>
                                  </v-flex>

                                  <v-flex
                                    class="hidden-md-and-up"
                                    xs12
                                    text-center
                                    pr-3
                                    pt-2
                                    pb-3
                                  >
                                    <v-btn
                                    @click="gotoView(item._id)"
                                      block
                                      color="#F17343"
                                    >
                                      <span
                                        style="
                                          font-family: mainfont;
                                          color: white;
                                          font-size: 14px;
                                          font-weight: 400;
                                          text-transform: none;
                                        "
                                      >
                                        View Details
                                      </span>
                                    </v-btn>
                                  </v-flex>

                                  <v-flex
                                    v-if="isStartDatePassed(item.selectedDate) && item.status == 'Active'"
                                   
                                    xs12
                                    text-center
                                    pl-3
                                    pr-10
                                    pl-10
                                    pb-3
                                  >
                                    <v-btn
                                     
                                      @click="
                                        (bookid = item._id),
                                          (canceldialog = true)
                                      "
                                      block
                                      color="#F17343"
                                    >
                                      <span
                                        style="
                                          font-family: mainfont;
                                          color: white;
                                          font-size: 14px;
                                          font-weight: 400;
                                          text-transform: none;
                                        "
                                      >
                                        Cancel
                                      </span>
                                    </v-btn>
                                  </v-flex>

                                </v-layout>
                              </v-flex>
                            </v-layout>
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
        <v-layout wrap text-center v-else>
          <v-flex xs12 sm12 md12 lg12 xl12 pt-16>
            <span
              style="
                font-weight: 400;
                font-size: 20px;
                font-family: mainfont;
                text-align: center;
              "
            >
              No bookings found
            </span>
          </v-flex>
        </v-layout>
        <v-layout v-if="list.length > 0" wrap justify-center>
          <v-flex xs11 pt-4 pb-3>
            <v-layout wrap>
              <v-flex xs12 id="specific-section" class="mainfont">
                <v-pagination
                  rounded="circle"
                  prev-icon="mdi-menu-left"
                  next-icon="mdi-menu-right"
                  :length="pages"
                  :total-visible="7"
                  v-model="currentPage"
                  color="#F17343"
                ></v-pagination>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>

        <v-dialog
      :retain-focus="true"
      persistent
      v-model="canceldialog"
      max-width="600px"
    >
      <v-card>
        <v-layout wrap>
          <v-flex xs12>
            <v-card-title
              class="LexendRegular"
              style="
                color: black;
                font-size: 18px;
                font-weight: lighter;
                text-transform: none;
              "
            >
              Are you sure you want to cancel the booking?
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="black"
            style="text-transform: none"
            text
            @click="canceldialog = false"
            class="LexendRegular"
            >Cancel</v-btn
          >
          <v-btn
            color="red"
            class="LexendRegular"
            text
            style="text-transform: none"
            @click="cancelBooking(bookid)"
            >Ok</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
      </v-flex>
    </v-layout>
  </div>
</template>
  <script>
import axios from "axios";
export default {
  data() {
    return {
      status: "",
      appLoading: false,
      ServerError: false,
      keyword:"",
      snackbar: false,
      list: [],
      statuslist: ["Active", "Inactive","Cancelled"],
      payedByList: ["Agent", "Customer"],
      timeout: 5000,
      msg: null,
      pages: 0,
      payedBy:"",
      fromdate: "",
      todate: "",
      HmenuCheckInVisible: false,
      HmenuCheckOutVisible: false,
      value: "",
      phone: "",
      currentPage: 1,
      canceldialog: false,
    };
  },
  watch: {
    payedBy(){
      this.getList();
    },
    fromdate() {
      this.getList();
    },

    todate() {
      this.getList();
    },
    keyword(){
      this.getList();

    },
    status(){
this.getList();
    },
    currentPage() {
      this.getList();
    },
  },
  mounted() {
    this.getList();
  },

  methods: {
    isStartDatePassed(ordate) {
  const startDate = new Date(ordate);
  const currentDate = new Date();
  
  return currentDate <= startDate;
},
    cancelBooking(bookid) {
      axios({
        method: "GET",
        url: "/shikara/booking/cancel",
        headers: {
          token: localStorage.getItem("token"),
        },
        params: {
          bookingId: bookid,
        },
      })
        .then((response) => {
          this.msg = response.data.msg;
          this.snackbar = true;
          this.canceldialog = false;
          this.getList();
        })

        .catch((err) => {
          this.ServerError = true;
          console.log(err);
        });
    },
    formattedDate(date) {
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      return new Date(date).toLocaleDateString("en-GB", options);
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
    // gotoView(id) {
    //   this.$router.push({
    //     name: "shikaradetailedview",
    //     query: {
    //       id: id,
    //     },
    //   });
    // },
    downloadTicket(id) {
      const token = localStorage.getItem("token");
      const downloadUrl = "/invoice/shikara/agent";
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          id: id,
        },
        responseType: "blob",
      };

      axios
        .get(downloadUrl, config)
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));

          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Shikara ticket.pdf");
          document.body.appendChild(link);

          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.error("Error downloading invoice:", error);
        });
    },

    gotoView(id) {
      this.$router.push({
        name: "shikaradetailedviewbooking",
        query: {
          id: id,
        },
      });
    },
    formatTime(time) {
      if (!time) return "";

      const formattedTime = new Date(time).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      return formattedTime;
    },
    getList() {
      this.appLoading = true;

      axios({
        method: "POST",
        url: "/admin/all/shikara/bookings",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          keyword:this.keyword,
          fromDate:this.fromdate,
          payedBy:this.payedBy,
          toDate:this.todate,
          status:this.status,
          page: this.currentPage,
          limit: 10,
          type: "shikara",
          location: this.location,
          memberCount: this.memberCount,
          childrenCount: this.childrenCount,
        },
      }).then((response) => {
        if (response.data.status) {
          this.list = response.data.data;
          this.totalData = response.data.totalLength;
          this.pages = Math.ceil(this.totalData / response.data.limit);
          console.log(this.totalData);
          this.appLoading = false;
        } else {
          this.appLoading = false;

          this.msg = response.data.msg;
          this.snackbar = true;
        }
      });
      // }
    },
    detailedView() {
      this.$router.push("/shikaradetailedview");
    },
  },
};
</script>