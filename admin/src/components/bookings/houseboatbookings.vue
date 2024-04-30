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
              HouseBoat Booking List
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
                          <v-flex xs12 lg3>
                            <v-layout wrap justify-start>
                              <v-flex
                                class="hidden-md-and-up"
                                xs12
                                v-if="item.houseBoatId"
                              >
                                <v-carousel
                                  :show-arrows="false"
                                  :progress="false"
                                  :continuous="false"
                                  hide-controls-on-hover="true"
                                  height="100%"
                                  width="100%"
                                  hide-delimiters
                                  :cycle="true"
                                >
                                  <v-carousel-item>
                                    <v-img
                                      class="customcard2"
                                      :src="
                                        mediaURLnewx +
                                        item.houseBoatId.coverImage
                                      "
                                      height="200px"
                                      width="100%"
                                    >
                                    <v-layout
                                        wrap
                                        fill-height
                                        justify-center
                                        v-if="item.paymentStatus === 'Success' && item.status == 'Active'"
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
                                  </v-carousel-item>
                                </v-carousel>
                              </v-flex>
                              <v-flex
                                class="hidden-sm-and-down"
                                xs12
                                v-if="item.houseBoatId"
                              >
                                <v-carousel
                                  :show-arrows="false"
                                  :progress="false"
                                  :continuous="false"
                                  hide-controls-on-hover="true"
                                  height="100%"
                                  width="100%"
                                  hide-delimiters
                                  :cycle="true"
                                >
                                  <v-carousel-item>
                                    <v-img
                                      class="customcard"
                                      :src="
                                        mediaURLnewx +
                                        item.houseBoatId.coverImage
                                      "
                                      height="200px"
                                      width="100%"
                                    >
                                    <v-layout
                                        wrap
                                        fill-height
                                        justify-center
                                        v-if="item.paymentStatus === 'Success' && item.status == 'Active'"
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
                                  </v-carousel-item>
                                </v-carousel>
                              </v-flex>
                            </v-layout>
                          </v-flex>

                          <v-flex xs12 lg9 pl-6>
                            <v-layout wrap justify-start fill-height>
                              <v-flex
                                pt-xs-0
                                pt-4
                                xs12
                                sm4
                                md4
                                lg4
                                text-left
                                align-self-center
                              >
                                <v-layout wrap>
                                  <v-flex xs12 v-if="item.houseBoatId">
                                    <span
                                      style="
                                        font-weight: 500;
                                        font-size: 20px;
                                        font-weight: bold;
                                        font-family: mainfont;
                                      "
                                    >
                                      {{ item.houseBoatName }}
                                    </span>
                                  </v-flex>
                                  <v-flex xs12 pt-3>
                                    <span
                                      v-if="item.bookCategory === 'Combination'"
                                      style="
                                        font-family: mainfont;
                                        font-size: 14px;
                                        font-weight: bold;
                                        color: red;
                                      "
                                    >
                                      Group Booking
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
                                      style="
                                        color: #f17343;
                                        font-family: mainfont;
                                        font-size: 15px;
                                      "
                                    >
                                      &nbsp; {{ item.bookingNo }}
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
                                      Trip Type :&nbsp;
                                      <span
                                        style="
                                          color: #f17343;
                                          font-size: 14px;
                                          font-weight: 500;
                                        "
                                      >
                                        {{ item.tripType }}
                                      </span>
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
                                      Location :&nbsp;
                                      <span
                                        style="
                                          color: #f17343;
                                          font-size: 14px;
                                          font-weight: 500;
                                        "
                                      >
                                        {{ item.location.name }}
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
                              >
                                <v-layout wrap>
                                  <v-flex xs12>
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
                                      style="
                                        color: #f17343;
                                        font-family: mainfont;
                                        font-size: 15px;
                                      "
                                    >
                                      {{ item.fullName }},
                                      {{ item.phoneNumber }}
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
                                      Slot :&nbsp;
                                      <span style="color: #f17343">
                                        {{ formattedDate(item.startDate) }} -
                                        {{ formattedDate(item.endDate) }}
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
                                        ₹ {{ item.balancePayAmount }} Not Paid
                                      </span>
                                      <span
                                        style="color: green"
                                        v-else-if="
                                          item.balancepaymentStatus ==
                                            'Success' &&
                                          item.advancepaymentMode == 'Agent'
                                        "
                                      >
                                        ₹ {{ item.balancePayAmount }} Paid
                                      </span>
                                      <span style="color: green" v-else>
                                        ₹ {{ item.balancePayAmount }}
                                      </span>
                                    </span>
                                  </v-flex>
                                  <v-flex
                                    xs12
                                    text-left
                                    pt-3
                                    v-if="item.houseBoatId.startingLocation"
                                  >
                                    <span
                                      style="
                                        font-family: mainfont;
                                        font-size: 14px;
                                        font-weight: 500;
                                      "
                                    >
                                      Pickup/ Drop :&nbsp;

                                      <span
                                        style="color: #f17343"
                                        v-if="
                                          item.houseBoatId.startingLocation
                                            .length > 0
                                        "
                                      >
                                        {{
                                          item.houseBoatId.startingLocation[0]
                                            .name
                                        }}
                                      </span>
                                      <span v-else>-</span>
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
                                      ₹ {{ item.totalAmount }}
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
                                      ₹ {{ item.totalAmount }}
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
                                    v-if="item.bookCategory != 'Combination' && isStartDatePassed(item.startDate) && item.status == 'Active'"
                                  >
                                  <v-btn
                                     
                                      @click="
                                        $router.push(
                                          'resheduleHouseboat?id=' +
                                            item._id +
                                            '&&name=' +
                                            item.houseBoatId.houseBoatName
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
                                  v-if="isStartDatePassed(item.startDate) && item.status == 'Active'"
                                    
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
                                     
                                      @click="
                                        (bookid = item.houseboatBookId),
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

                                  <v-flex
                                    class="hidden-md-and-up"
                                    xs12
                                    text-center
                                    pr-3
                                    pt-2
                                    pb-4
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
      appLoading: false,
      ServerError: false,
      snackbar: false,
      list: [],
      timeout: 5000,
      msg: null,
      keyword:"",
      pages: 0,
      statuslist: ["Active", "Inactive","Cancelled"],
      payedByList: ["Agent", "Customer"],
      status: "",
      payedBy:"",
      carouselSpeed: 1000,
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
    currentPage() {
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
        url: "houseboat/booking/cancel",
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
          location.reload();
        })

        .catch((err) => {
          this.ServerError = true;
          console.log(err);
        });
    },
    downloadTicket(id) {
      const token = localStorage.getItem("token");
      const downloadUrl = "/get/ticket/houseboat";
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
          link.setAttribute("download", "Hb ticket.pdf");
          document.body.appendChild(link);

          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.error("Error downloading invoice:", error);
        });
    },
    formattedDate(date) {
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      return new Date(date).toLocaleDateString("en-GB", options);
    },
    gotoView(id) {
      this.$router.push({
        name: "houseboatdetailedviewbookings",
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
        url: "/admin/all/houseboat/bookings",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          keyword:this.keyword,
          payedBy:this.payedBy,
          fromDate:this.fromdate,
          toDate:this.todate,
          status:this.status,
          page: this.currentPage,
          limit: 10,
        },
      }).then((response) => {
        if (response.data.status) {
          this.list = response.data.data;
          this.totalData = response.data.totalLength;
          this.pages = Math.ceil(this.totalData / response.data.limit);
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
      this.$router.push("/houseboatdetailedviewbookings");
    },
  },
};
</script>