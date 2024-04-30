<template>
  <div>
    <v-layout wrap justify-center pb-8 class="mainfont mainbg2">
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
      <vue-element-loading
        :active="appLoading"
        :is-full-screen="true"
        background-color="#FFFFFF"
        color="#FF681F"
        spinner="spinner"
      />
      <v-flex xs12 class="mainbg2">
        <v-layout justify-center>
          <v-flex xs12 pl-4>
            <v-layout wrap justify-center>
              <v-flex xs12 pt-8 text-left>
                <span style="font-size: 25px; font-weight: bolder"
                  >DASHBOARD</span
                >
              </v-flex>
              <v-flex xs11 lg12 pt-3>
                <v-layout wrap justify-center>
                  <v-flex
                    xs11
                    sm5
                    md4
                    lg3
                    pt-3
                    pr-4
                    style="cursor: pointer"
                    @click="$router.push('/approvedagent')"
                  >
                    <v-card elevation="0" class="pa-3" height="120px">
                      <v-layout wrap fill-height justify-center align-center>
                        <v-flex xs8>
                          <v-layout wrap>
                            <v-flex xs12 pt-3>
                              <span style="font-size: 16px; font-weight: bold"
                                >AGENT COUNT</span
                              >
                            </v-flex>
                            <v-flex xs6 pt-1 pl-1>
                              <span style="font-size: 23px; font-weight: bold">
                                {{ list.agentCount }}</span
                              >
                            </v-flex>
                            <v-flex xs6 pt-3>
                              <v-icon color="#FF681F">mdi-arrow-right</v-icon>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex pt-3 pb-3 xs3 text-right>
                          <v-img
                            height="40px"
                            contain
                            src="../../assets/Images/vendor.png"
                          ></v-img>
                        </v-flex>
                      </v-layout>
                    </v-card>
                  </v-flex>
                  <v-flex
                    @click="$router.push('/approvedvendor')"
                    style="cursor: pointer"
                    xs11
                    sm5
                    md4
                    lg3
                    pr-4
                    pt-4
                    pt-lg-3
                  >
                    <v-card elevation="0" class="pa-3" height="120px">
                      <v-layout wrap fill-height justify-center align-center>
                        <v-flex xs8>
                          <v-layout wrap>
                            <v-flex xs12 pt-3>
                              <span style="font-size: 16px; font-weight: bold"
                                >VENDOR COUNT</span
                              >
                            </v-flex>
                            <v-flex xs4 xs6 pt-1 pl-1>
                              <span style="font-size: 23px; font-weight: bold">
                                {{ list.vendorCount }}</span
                              >
                            </v-flex>
                            <v-flex xs6 pt-3>
                              <v-icon color="#FF681F">mdi-arrow-right</v-icon>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex pt-3 pb-3 xs3 text-right>
                          <v-img
                            height="40px"
                            contain
                            src="../../assets/Images/users1.png"
                          ></v-img>
                        </v-flex>
                      </v-layout>
                    </v-card>
                  </v-flex>
                  <v-flex style="cursor: pointer" xs11 sm5 md4 lg3 pt-3 pr-4>
                    <v-card elevation="0" class="pa-3" height="120px">
                      <v-layout wrap fill-height justify-center align-center>
                        <v-flex xs8>
                          <v-layout wrap>
                            <v-flex xs12 pt-3>
                              <span style="font-size: 16px; font-weight: bold">
                                RESERVATION
                              </span>
                            </v-flex>
                            <v-flex xs6 pt-1 pl-1>
                              <span style="font-size: 23px; font-weight: bold">
                                {{ list.reservationcount }}</span
                              >
                            </v-flex>
                            <v-flex xs6 pt-3>
                              <v-icon color="#FF681F">mdi-arrow-right</v-icon>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex pt-3 pb-3 xs3 text-right>
                          <v-img
                            height="40px"
                            contain
                            src="../../assets/Images/acco.png"
                          ></v-img>
                        </v-flex>
                        <v-flex xs12>
                          <v-layout wrap justify-start>
                            <v-flex pl-4 xs12 lg9 style="font-size: 13px">
                              Houseboat
                              {{ list.HBreservcount }}&nbsp; Shikara
                              {{ list.SKreservcount }}
                            </v-flex>
                          </v-layout>
                        </v-flex>
                      </v-layout>
                    </v-card>
                  </v-flex>
                  <v-flex xs11 sm5 md4 lg3 pt-3 pr-4 style="cursor: pointer">
                    <v-card elevation="0" class="pa-4" height="120px">
                      <v-layout wrap fill-height justify-center align-center>
                        <v-flex xs9>
                          <v-layout wrap>
                            <v-flex xs12 pt-3>
                              <span style="font-size: 16px; font-weight: bold"
                                >TOTAL BOOKINGS
                              </span>
                            </v-flex>
                            <v-flex xs6 pt-1 pl-1>
                              <span style="font-size: 23px; font-weight: bold">
                                {{ list.totalbooking }}</span
                              >
                            </v-flex>
                            <v-flex xs6 pt-3>
                              <v-icon color="#FF681F">mdi-arrow-right</v-icon>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex pt-3 pb-3 xs3 text-right>
                          <v-img
                            height="40px"
                            contain
                            src="../../assets/Images/advb.png"
                          ></v-img>
                        </v-flex>
                        <v-flex xs12 pl-2 style="font-size: 13px">
                          Houseboat
                          {{ list.hbbookigCount }}&nbsp; Shikara
                          {{ list.shikarabookCount }}
                        </v-flex>
                      </v-layout>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-layout pt-lg-12 wrap justify-center>
          <v-flex xs12 pa-5>
            <v-card elevation="0">
              <v-layout
                wrap
                justify-center
                style="background-color: #f2f2f2"
                pa-2
              >
                <v-flex xs12 lg6 v-if="flag">
                  <v-layout justify-center>
                    <v-flex xs9 lg9 text-left pa-3>
                      <span style="font-weight: bold">BOOKING 
                        PERCENTAGE</span>
                    </v-flex>
                  </v-layout>
                  <div>
                    <center>
                      <apexchart
                        type="pie"
                        height="300px"

                        :options="chartOptions1"
                        :series="series1"
                      >
                      </apexchart>
                    </center>
                  </div>
                </v-flex>
                

                <v-flex xs12 lg6 v-if="flag">
                  <v-layout justify-center>
                    <v-flex xs12 lg9 text-left pa-3>
                      <span style="font-weight: bold"
                        >AGENT AND VENDOR PERCENTAGE</span
                      >
                    </v-flex>
                  </v-layout>

                  <div>
                    <center>
                      <apexchart
                        type="pie"
                        height="300px"

                        :options="chartOptions2"
                        :series="series2"
                      >
                      </apexchart>
                    </center>
                  </div>
                </v-flex>


<v-flex xs12>
  <v-divider></v-divider>
</v-flex>


                <v-flex xs12 lg6 v-if="flag">
                  <v-layout justify-center>
                    <v-flex xs12 lg9 text-left pa-3>
                      <span style="font-weight: bold"
                        >HB  BOOKING  BASED ON TRIP TYPE </span
                      >
                    </v-flex>
                  </v-layout>

                  <div>
                    <center>
                      <apexchart
                        type="pie"
                        height="300px"

                        :options="chartOptions3"
                        :series="series3"
                      >
                      </apexchart>
                    </center>
                  </div>
                </v-flex>

                <v-flex xs12 lg6 v-if="flag">
                  <v-layout justify-center>
                    <v-flex xs12 lg9 text-left pa-3>
                      <span style="font-weight: bold"
                        > BOOKING  BASED ON AGENT OR CUSTOMER </span
                      >
                    </v-flex>
                  </v-layout>

                  <div>
                    <center>
                      <apexchart
                        type="pie"
                        height="300px"
                        :options="chartOptions4"
                        :series="series4"
                      >
                      </apexchart>
                    </center>
                  </div>
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
import VueApexCharts from "vue-apexcharts";
import moment from "moment";
export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      chartOptions1: {
        colors: ["#FFBF00", "#022954"],
        chart: {
          type: "pie",
          toolbar: { show: true },
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
          },
        },
        labels: ["SHIKARA", "HOUSEBOAT"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                // width: 300,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
      chartOptions2: {
        colors: ["#FF681F", "#00abc5"],
        chart: {
          type: "pie",
          toolbar: { show: true },
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
          },
        },
        labels: ["VENDOR", "AGENT"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                // width: 300,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
      chartOptions3: {
        colors: ["#FF0000", "#722F37","#00ffff"],
        chart: {
          type: "pie",
          toolbar: { show: true },
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
          },
        },
        labels: ["DAY CRUISE", "NIGHT STAY","OVER-NIGHT"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                // width: 300,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },


      chartOptions4: {
        colors: ["#50C878", "#AA336A",],
        chart: {
          type: "pie",
          toolbar: { show: true },
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
          },
        },
        labels: [ "CUSTOMER COUNT","AGENT COUNT "],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                // width: 300,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
      series1: [],
      series2: [],

      name: null,
      labels: [],

      dialog3: false,
      appLoading: false,

      deletedialog: false,
      minAmount: null,
      password: null,
      categoryarray: [],
      formData: new FormData(),
      id: this.$route.query.id,
      productname: null,
      productarray: [],
      list: {},
      currentpage: 1,
      flag: false,

      limit: 10,
      msg: null,
      showSnackBar: false,
      curid: [],
      dialog2: false,
    };
  },
  mounted() {
    this.getList();
    this.getGraph();
    this.lar();
  },
  methods: {
    lar() {
  var age = [1, 2, 3, 12, 21, 1, 2];
  let flag = null;

  age.forEach(function (element) {
    if (flag !== null) {
      flag = element;
   

    }
    else if (flag > element)
    {
      console.log(element);

    }


    console.log(element);
    // You can perform operations on each element here
  });
},

    getGraph() {
      this.appLoading = true;
      this.flag = false;

      axios({
        method: "POST",
        url: "/dashboard/graph",
        headers: {
          token: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          if (response.data.status == true) {
            this.series1 = [];
            this.series2 = [];
            this.series3 = [];
            this.series4 = [];

            this.labels = [];
            this.piedata1 = response.data.BookingData.data;
            this.piedata2 = response.data.UserData.data;
            this.piedata3 = response.data.hbTripData.data;
            this.piedata4 = response.data.hbCustomerOrAgentData.data;



            for (let i = 0; i < this.piedata1.length; i++) {
              this.series1.push(this.piedata1[i].percentage);
            }

            for (let i = 0; i < this.piedata2.length; i++) {
              this.series2.push(this.piedata2[i].percentage);
            }
            for (let i = 0; i < this.piedata3.length; i++) {
              this.series3.push(this.piedata3[i].percentage);
            }
            for (let i = 0; i < this.piedata4.length; i++) {
              this.series4.push(this.piedata4[i].count);
            }
            this.flag = true;
          }
          this.appLoading = false;
        })
        .catch((err) => {
          this.appLoading = false;
          this.ServerError = true;
          console.log(err);
        });
    },

    formatTime(time) {
      return moment(time).format("HH:mm");
    },

    getList() {
      this.appLoading = true;
      axios({
        method: "POST",
        url: "/dashboard/count",
        headers: {
          token: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          this.list = response.data;
          this.appLoading = false;
        })

        .catch((err) => {
          this.ServerError = true;
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
</style>