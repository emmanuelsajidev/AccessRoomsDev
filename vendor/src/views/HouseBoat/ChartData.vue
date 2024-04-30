<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-layout wrap justify-center>
        <v-flex xs12 lg6>
          <v-layout style="background-color: white" wrap justify-center>
            <v-flex xs12 sm5 lg5 pa-3>
              <v-layout wrap>
               
                <v-flex xs12>
                  <div id="radial-chart-1"></div>
                </v-flex>
              </v-layout>
              <!-- First radial bar chart -->
            </v-flex>
            <v-flex xs1>
              <center>
                <v-divider vertical> </v-divider>
              </center>
            </v-flex>
            <v-flex xs12 sm5 lg5 pa-3>
              <v-layout wrap>
               
                <v-flex xs12>
                  <div id="radial-chart-2"></div>
                </v-flex>
              </v-layout>
              <!-- Second radial bar chart -->
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 sm5 lg6 pl-lg-5 p>
          <v-layout style="background-color: white" wrap justify-center>
            <v-flex v-if="shikara" xs11 pt-3>
              <span style="font-family: LexendRegular; font-weight: bold">
                shikara
              </span>
            </v-flex>

            <v-flex xs11 v-if="shikara" pt-1>
              <v-card elevation="0" color="#EDEDED" style="border-radius: 12px">
                <v-layout wrap justify-center>
                  <v-flex xs12 sm12 lg4>
                    <v-layout wrap justify-start>
                      <v-flex
                        xs12
                        v-if="
                          shikara &&
                          shikara.shikaraid &&
                          shikara.shikaraid.coverImage
                        "
                      >
                        <v-img
                          :src="mediaUURL + shikara.shikaraid.coverImage"
                          height="130px"
                          style="border-radius: 12px 0px 0px 12px"
                          width="auto"
                          ><template v-slot:placeholder>
                            <ImageLoader /> </template
                        ></v-img>
                      </v-flex>
                    </v-layout>
                  </v-flex>

                  <v-flex xs11 lg8 pa-lg-4>
                    <v-layout wrap fill-height>
                      <v-flex xs6 align-self-center>
                        <span
                          v-if="
                            shikara &&
                            shikara.shikaraid &&
                            shikara.shikaraid.shikaraName
                          "
                          style="
                            font-weight: 500;
                            font-size: 20px;
                            font-weight: bold;
                            font-family: LexendRegular;
                          "
                        >
                          {{ shikara.shikaraid.shikaraName }}
                        </span>
                      </v-flex>

                      <v-flex xs12>
                        <span
                          style="
                            font-family: LexendRegular;
                            font-size: 14px;
                            font-weight: 500;
                          "
                        >
                          Booking # :
                        </span>
                        <span
                          style="
                            color: #f17343;
                            font-size: 15px;
                            font-family: LexendFont;
                          "
                        >
                          &nbsp; {{ shikara.bookingNo }}
                        </span>
                      </v-flex>

                      <v-flex xs12 v-if="shikara.customerDetails">
                        <span
                          style="
                            font-weight: 400;
                            font-size: 14px;
                            font-family: LexendRegular;
                          "
                        >
                          Booked for : &nbsp;
                        </span>
                        <span
                          v-if="shikara.customerDetails"
                          style="
                            font-family: LexendRegular;
                            font-size: 14px;
                            font-weight: 400;
                          "
                        >
                          {{ shikara.customerDetails.name }}</span
                        >
                        <span
                          v-if="shikara.customerDetails.phoneNumber"
                          style="
                            font-family: LexendRegular;
                            font-size: 14px;
                            font-weight: 400;
                          "
                        >
                          ,{{ shikara.customerDetails.phoneNumber }}
                        </span>
                      </v-flex>

                      <v-flex xs12 text-left v-if="shikara.shikaraid">
                        <span
                          style="
                            font-family: LexendRegular;
                            font-size: 14px;
                            font-weight: 500;
                          "
                        >
                          Pickup/drop :&nbsp;
                          <span
                            style="color: #f17343"
                            v-if="shikara.shikaraid.startingLocation"
                          >
                            {{ shikara.shikaraid.startingLocation.name }}
                          </span>
                        </span>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>

            <v-flex v-if="houseboat" xs11 pt-3>
              <span style="font-family: LexendRegular; font-weight: bold">
                Houseboat
              </span>
            </v-flex>

            <v-flex v-if="houseboat" xs11 pt-1 pb-4>
              <v-card elevation="0" color="#EDEDED" style="border-radius: 12px">
                <v-layout wrap justify-center>
                  <v-flex xs12 lg4>
                    <v-layout wrap justify-start>
                      <v-flex
                        xs12
                        v-if="
                          houseboat &&
                          houseboat.houseBoatId &&
                          houseboat.houseBoatId.coverImage
                        "
                      >
                        <v-img
                          :src="mediaUURL + houseboat.houseBoatId.coverImage"
                          height="130px"
                          style="border-radius: 12px 0px 0px 12px"
                          width="auto"
                          ><template v-slot:placeholder>
                            <ImageLoader /> </template
                        ></v-img>
                      </v-flex>
                    </v-layout>
                  </v-flex>

                  <v-flex xs11 lg8 pa-lg-4>
                    <v-layout wrap>
                      <v-flex xs6 align-self-center>
                        <span
                          v-if="houseboat"
                          style="
                            font-weight: 500;
                            font-size: 20px;
                            font-weight: bold;
                            font-family: LexendRegular;
                          "
                        >
                          {{ houseboat.houseBoatName }}
                        </span>
                      </v-flex>

                      <v-flex xs12 align-self-end>
                        <span
                          style="
                            font-family: LexendRegular;
                            font-size: 14px;
                            font-weight: 500;
                          "
                        >
                          Booking # :
                        </span>
                        <span
                          style="
                            color: #f17343;
                            font-size: 15px;
                            font-family: LexendFont;
                          "
                        >
                          &nbsp; {{ houseboat.bookingNo }}
                        </span>
                      </v-flex>

                      <v-flex xs12 v-if="houseboat.fullName" align-self-start>
                        <span
                          style="
                            font-weight: 400;
                            font-size: 14px;
                            font-family: LexendRegular;
                          "
                        >
                          Booked for : &nbsp;
                        </span>
                        <span
                          v-if="houseboat.fullName"
                          style="
                            font-family: LexendRegular;
                            font-size: 14px;
                            font-weight: 400;
                          "
                        >
                          {{ houseboat.fullName }}</span
                        >
                        <span
                          v-if="houseboat.phoneNumber"
                          style="
                            font-family: LexendRegular;
                            font-size: 14px;
                            font-weight: 400;
                          "
                        >
                          ,{{ houseboat.phoneNumber }}
                        </span>
                      </v-flex>

                      <v-flex xs12 text-left align-self-end>
                        <span
                          style="
                            font-family: LexendRegular;
                            font-size: 14px;
                            font-weight: 500;
                          "
                        >
                          Pickup/drop :

                          <span
                            style="color: #f17343"
                            v-if="
                              houseboat &&
                              houseboat.houseBoatId &&
                              houseboat.houseBoatId.startingLocation
                            "
                          >
                            {{ houseboat.houseBoatId.startingLocation.name }}
                          </span>
                        </span>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>
  
  <script>
import axios from "axios";
import ApexCharts from "apexcharts";

export default {
  data() {
    return {
      appLoading: false,
      ServerError: false,
      snackbar: false,
      graphdata: [],

      houseboat: [],
      shikara: {},

      timeout: 5000,
      msg: null,
      pages: 0,
      carouselSpeed: 1000,

      value: "",
      phone: "",
      currentPage: 1,

      // filter
      keyword1: "",
      menu: false,
      menu1: false,
      toDate: "",
      fromDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
    };
  },

  mounted() {
    this.getBookings();
    this.graphData();
  },

  methods: {
    graphData() {
      this.appLoading = true;

      axios({
        method: "POST",
        url: "/vendor/dashboard/booking",
        headers: {
          token: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status) {
            this.graphData = response.data.data;
          
            this.renderRadialCharts();
          } else {
            this.errorMsg = response.data.msg;
            this.showSnackBar = true;
          }
        })
        .catch((err) => {
          this.appLoading = false;
          console.error(err);
          this.ServerError = true;
        });
    },
    renderRadialCharts() {
  if (this.graphData.length > 0) {
    var radialChartOptions1 = {
      series: [parseInt(this.graphData[0].percentage)],
      chart: {
        height: 320,
        type: "radialBar",
        fontFamily: "LexendRegular",
        color: "#202A44",
      },
      plotOptions: {
        radialBar: {
          hollow: {
            // size: '70%',
          },
        },
      },
      fill: {
        colors: ["#202A44"],
      },
      labels: [this.graphData[0].name], // Use the name as the label
    };

    // Render the first radial chart
    var radialChart1 = new ApexCharts(
      document.querySelector("#radial-chart-1"),
      radialChartOptions1
    );
    radialChart1.render();

    // Check if graphData has more than one object
    if (this.graphData.length > 1) {
      var radialChartOptions2 = {
        series: [parseInt(this.graphData[1].percentage)],
        chart: {
          height: 320,
          type: "radialBar",
          fontFamily: "LexendRegular",
        },
        plotOptions: {
          radialBar: {
            hollow: {
              // size: '70%',
            },
          },
        },
        fill: {
          colors: ["#FFA500"],
        },
        labels: [this.graphData[1].name], // Use the name as the label
      };

      // Render the second radial chart
      var radialChart2 = new ApexCharts(
        document.querySelector("#radial-chart-2"),
        radialChartOptions2
      );
      radialChart2.render();
    }
  }
},



    formattedDate(date) {
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      return new Date(date).toLocaleDateString("en-GB", options);
    },
    gotoView(id) {
      this.$router.push({
        name: "shikaradetailedview",
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
    getBookings() {
      this.appLoading = true;

      axios({
        method: "POST",
        url: "/vendor/dashboard/recentbookings",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {},
      }).then((response) => {
        if (response.data.status == true) {
          this.shikara = response.data.data.shikara;
          this.houseboat = response.data.data.houseboat;

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
  
  <style>
.LexendFont {
  font-family: LexendFont;
}
</style>
  