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
    <v-snackbar v-model="showSnackbar" color="#f54c0c" right :timeout="timeout">
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
          >{{ $route.query.name }}</span
        >
      </v-flex>
    </v-layout>

    <vue-horizontal class="hidden-sm-and-up">
      <v-row class="scrollable-row" no-gutters>
        <v-col cols="12">
          <v-card outlined class="py-2 pr-1" width="1200px">
            <v-layout wrap justify-start>
              <v-flex xs6 text-left>
                <span
                  style="
                    font-family: LexendFont;
                    font-weight: 400;
                    font-size: 20px;
                  "
                  >Shikara special rates</span
                >
              </v-flex>
              <v-flex xs6 text-right>
                <v-btn
                  x-small
                  dense
                  outlined
                  color="grey"
                  class="px-0 custom-btn"
                  @click="goBack()"
                  ><v-icon>mdi-menu-left</v-icon></v-btn
                >
                <!-- <v-btn x-small dense outlined color="grey" style="border-radius: 0;"><v-icon>mdi-menu-left</v-icon></v-btn> -->
                <v-btn
                  x-small
                  dense
                  outlined
                  color="grey"
                  class="px-0 custom-btn2"
                  @click="goFront()"
                  ><v-icon>mdi-menu-right</v-icon></v-btn
                >
              </v-flex>
            </v-layout>
            <v-layout
              wrap
              justify-start
              justify-sm-end
              my-4
              pa-2
              style="background-color: rgb(229, 229, 229)"
            >
              <v-flex
                xs2
                text-right
                align-self-center
                class="mx-0 mx-sm-1 px-4"
              >
                <!-- <span
                            style="
                              font-family: LexendFont;
                              font-weight: 400;
                              font-size: 16px;
                            "
                            >Dates</span
                          > -->
              </v-flex>
              <v-card
                width="140px"
                outlined
                v-for="(item, i) in weekArray"
                :key="i"
                class="mx-0 mx-sm-1"
              >
                <v-card height="80px" width="100%" pa-2 elevation="0">
                  <v-layout wrap justify-center fill-height>
                    <v-flex
                      xs12
                      align-self-center
                      text-center
                      style="line-height: 17px"
                    >
                    <span
                      style="
                        font-family: LexendFont;
                        font-weight: 400;
                        font-size: 10px;
                        text-transform: uppercase;
                      "
                      >{{ item.month }}</span
                    ><br />
                      <span
                        style="
                          font-family: LexendFont;
                          font-weight: 400;
                          font-size: 20px;
                        "
                        >{{ item.dayOfMonth }}</span
                      ><br />
                      <span
                        style="
                          font-family: LexendFont;
                          font-weight: 400;
                          font-size: 10px;
                          text-transform: uppercase;
                        "
                        >{{ item.day }}</span
                      >
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-card>
            </v-layout>
            <v-layout wrap justify-start>
              <v-flex xs2 text-left class="mx-0 mx-sm-1">
                <v-layout wrap>
                  <v-flex xs12 pt-3 text-right px-2>
                    <v-card tile elevation="0" class="ma-1" height="45px">
                      <v-layout wrap fill-height>
                        <v-flex xs12 align-self-center>
                          <span
                            style="
                              font-family: LexendFont;
                              font-weight: 400;
                              font-size: 16px;
                            "
                            >Agent Rate (₹)</span
                          ></v-flex
                        >
                        <v-flex xs12 align-self-center pt-3>
                          <span
                            style="
                              font-family: LexendFont;
                              font-weight: 400;
                              font-size: 14px;
                            "
                            >Net rate (₹)
                          </span></v-flex
                        >
                      </v-layout></v-card
                    >
                  </v-flex>
                  <v-flex xs12 pt-3 text-right px-2>
                    <v-card tile elevation="0" class="ma-1 mt-6" height="65px">
                      <v-layout wrap fill-height>
                        <v-flex xs12 align-self-center>
                          <span
                            style="
                              font-family: LexendFont;
                              font-weight: 400;
                              font-size: 16px;
                            "
                            >Customer Rate (₹)</span
                          >
                        </v-flex>
                        <v-flex xs12 pt-0>
                          <span
                            style="
                              font-family: LexendFont;
                              font-weight: 400;
                              font-size: 14px;
                            "
                            >Net rate (₹)
                          </span></v-flex
                        >
                      </v-layout></v-card
                    >
                  </v-flex>
                  <v-flex xs12 pt-3 text-right px-2>
                    <v-card tile elevation="0" class="ma-1" height="35px">
                      <v-layout wrap fill-height>
                        <v-flex xs12 align-self-center>
                          <span
                            style="
                              font-family: LexendFont;
                              font-weight: 400;
                              font-size: 16px;
                            "
                            >Availability</span
                          ></v-flex
                        >
                      </v-layout></v-card
                    >
                  </v-flex>
                  <!-- <v-flex xs12 pt-3 text-right px-2>
                    <v-card tile elevation="0" class="ma-1" height="35px">
                      <v-layout wrap fill-height>
                        <v-flex xs12 align-self-center>
                          <span
                            style="
                              font-family: LexendFont;
                              font-weight: 400;
                              font-size: 16px;
                            "
                            >No of rooms</span
                          ></v-flex
                        >
                      </v-layout></v-card
                    >
                  </v-flex> -->
                </v-layout>
              </v-flex>
              <v-card
                width="140px"
                outlined
                v-for="(item, i) in newArr"
                :key="i"
                class="mx-0 mx-sm-1"
              >
                <v-layout wrap>
                  <v-flex xs12 pt-2>
                    <v-card elevation="0" tile class="ma-1">
                      <v-text-field
                        dense
                        outlined
                        type="text"
                        @change="calAgentNetRate(i, item.agentRate)"
                        style="border-radius: 5px"
                        v-model="item.agentRate"
                        hide-details
                      >
                      </v-text-field>
                      <span
                        v-if="item.agentRate"
                        class="pl-2"
                        style="
                          font-family: LexendFont;
                          font-size: 12px;
                          font-weight: 300;
                        "
                        >{{ item.agentNetrate }}</span
                      >
                      <span
                        v-else
                        class="pl-2"
                        style="
                          font-family: LexendFont;
                          font-size: 12px;
                          font-weight: 300;
                        "
                        >{{ item.agentNetrate }}</span
                      ></v-card
                    >
                  </v-flex>
                  <v-flex xs12 py-2>
                    <v-card elevation="0" tile class="ma-1">
                      <v-text-field
                        dense
                        outlined
                        type="text"
                        @change="calCustomerNetRate(i, item.customerRate)"
                        style="border-radius: 5px"
                        v-model="item.customerRate"
                        hide-details
                      >
                      </v-text-field
                      ><span
                        v-if="item.customerRate"
                        class="pl-2"
                        style="
                          font-family: LexendFont;
                          font-size: 12px;
                          font-weight: 300;
                        "
                        >{{ item.customerNetrate }}</span
                      ><span
                        v-else
                        class="pl-2"
                        style="
                          font-family: LexendFont;
                          font-size: 12px;
                          font-weight: 300;
                        "
                        >{{ item.customerNetrate }}</span
                      >
                    </v-card>
                  </v-flex>
                  <v-flex xs12 py-2 text-center px-6>
                    <v-switch
                    @change="callAvailabilityChange(i)"
                      dense
                      class="mt-0"
                      hide-details
                      inset
                      v-model="item.isAvailable"
                      color="#F17343"
                    ></v-switch>
                  </v-flex>
                  <!-- <v-flex xs12 py-2>
                    <v-card elevation="0" tile class="ma-1">
                      <v-text-field
                        dense
                        outlined
                        type="text"
                        style="border-radius: 5px"
                        v-model="item.numberOfRooms"
                        hide-details
                      >
                      </v-text-field
                    ></v-card>
                  </v-flex> -->
                </v-layout>
              </v-card>
            </v-layout>
            <v-layout wrap pt-2 justify-end>
              <v-flex xs1 pr-4
                ><v-btn class="btnstly" block dark @click="editHouseboat()"
                  >save</v-btn
                ></v-flex
              >
            </v-layout>
          </v-card>
        </v-col>
      </v-row>
    </vue-horizontal>

    <v-layout wrap justify-space-around pt-0 pt-sm-2 class="hidden-xs-only">
      <v-flex xs12>
        <v-card tile class="pa-1 pa-md-8 pa-sm-6">
          <v-layout wrap justify-start>
            <v-flex xs12 sm6 text-left>
              <span
                style="
                  font-family: LexendFont;
                  font-weight: 400;
                  font-size: 20px;
                "
                >Shikara special rates</span
              >
            </v-flex>
            <v-flex xs12 sm6 text-right>
              <v-btn
                x-small
                dense
                outlined
                color="grey"
                class="px-0 custom-btn"
                @click="goBack()"
                ><v-icon>mdi-menu-left</v-icon></v-btn
              >
              <!-- <v-btn x-small dense outlined color="grey" style="border-radius: 0;"><v-icon>mdi-menu-left</v-icon></v-btn> -->
              <v-btn
                x-small
                dense
                outlined
                color="grey"
                class="px-0 custom-btn2"
                @click="goFront()"
                ><v-icon>mdi-menu-right</v-icon></v-btn
              >
            </v-flex>
          </v-layout>
          <v-layout
            wrap
            justify-start
            justify-sm-end
            my-4
            pa-2
            style="background-color: rgb(229, 229, 229)"
          >
            <v-flex
              xs3
              sm1
              md1
              text-center
              v-for="(item, i) in weekArray"
              :key="i"
              class="mx-0 mx-sm-1"
            >
              <v-card height="80px" width="80px" pa-2 elevation="0">
                <v-layout wrap justify-center fill-height>
                  <v-flex xs12 align-self-center style="line-height: 17px">
                    <span
                      style="
                        font-family: LexendFont;
                        font-weight: 400;
                        font-size: 10px;
                        text-transform: uppercase;
                      "
                      >{{ item.month }}</span
                    ><br />
                    <span
                      style="
                        font-family: LexendFont;
                        font-weight: 400;
                        font-size: 20px;
                      "
                      >{{ item.dayOfMonth }}</span
                    ><br />
                    <span
                      style="
                        font-family: LexendFont;
                        font-weight: 400;
                        font-size: 10px;
                        text-transform: uppercase;
                      "
                      >{{ item.day }}</span
                    >
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
          <!-- <v-layout wrap justify-start justify-sm-end my-4>
            <v-flex xs12> -->
          <v-card outlined class="py-2 pr-1">
            <v-layout wrap justify-end>
              <v-flex xs3 md4 text-center class="mx-0 mx-sm-1">
                <v-layout wrap>
                  <v-flex xs12 pt-3 text-right px-2>
                    <v-card tile elevation="0" class="ma-1 mt-2" height="65px">
                      <v-layout wrap fill-height>
                        <v-flex xs12 align-self-center>
                          <span
                            style="
                              font-family: LexendFont;
                              font-weight: 400;
                              font-size: 16px;
                            "
                            >Agent Rate (₹)</span
                          ></v-flex
                        >
                        <v-flex xs12>
                          <span
                            style="
                              font-family: LexendFont;
                              font-weight: 400;
                              font-size: 14px;
                            "
                            >Net rate (₹)
                          </span></v-flex
                        >
                      </v-layout></v-card
                    >
                  </v-flex>
                  <v-flex xs12 pt-2 text-right px-2>
                    <v-card tile elevation="0" class="ma-1" height="55px">
                      <v-layout wrap fill-height>
                        <v-flex xs12>
                          <span
                            style="
                              font-family: LexendFont;
                              font-weight: 400;
                              font-size: 16px;
                            "
                            >Customer Rate</span
                          ></v-flex
                        >
                        <v-flex xs12 pt-0>
                          <span
                            style="
                              font-family: LexendFont;
                              font-weight: 400;
                              font-size: 14px;
                            "
                            >Net rate (₹)
                          </span></v-flex
                        >
                      </v-layout></v-card
                    >
                  </v-flex>
                  <v-flex xs12 pt-3 text-right px-2>
                    <v-card tile elevation="0" class="ma-1" height="35px">
                      <v-layout wrap fill-height>
                        <v-flex xs12 align-self-center>
                          <span
                            style="
                              font-family: LexendFont;
                              font-weight: 400;
                              font-size: 16px;
                            "
                            >Availability</span
                          ></v-flex
                        >
                      </v-layout></v-card
                    >
                  </v-flex>
                  <!-- <v-flex xs12 pt-3 text-right px-2>
                    <v-card tile elevation="0" class="ma-1" height="35px">
                      <v-layout wrap fill-height>
                        <v-flex xs12 align-self-center>
                          <span
                            style="
                              font-family: LexendFont;
                              font-weight: 400;
                              font-size: 16px;
                            "
                            >No of rooms</span
                          ></v-flex
                        >
                      </v-layout></v-card
                    >
                  </v-flex> -->
                </v-layout>
              </v-flex>
              <v-flex
                xs3
                sm1
                md1
                text-center
                v-for="(item, i) in newArr"
                :key="i"
                class="mx-0 mx-sm-1"
              >
                <v-layout wrap>
                  <v-flex xs12 pt-2 text-left>
                    <v-card elevation="0" tile class="ma-1">
                      <v-text-field
                        dense
                        outlined
                        type="text"
                        style="border-radius: 5px"
                        @change="calAgentNetRate(i, item.agentRate)"
                        v-model="item.agentRate"
                        hide-details
                      >
                      </v-text-field>
                      <span
                        v-if="item.agentRate"
                        class="pl-2"
                        style="
                          font-family: LexendFont;
                          font-size: 12px;
                          font-weight: 300;
                        "
                        >{{ item.agentNetrate }}</span
                      >
                      <span
                        v-else
                        class="pl-2"
                        style="
                          font-family: LexendFont;
                          font-size: 12px;
                          font-weight: 300;
                        "
                        >{{ item.agentNetrate }}</span
                      ></v-card
                    >
                  </v-flex>
                  <v-flex xs12 py-2 text-left>
                    <v-card elevation="0" tile class="ma-1">
                      <v-text-field
                        dense
                        outlined
                        type="text"
                        @change="calCustomerNetRate(i, item.customerRate)"
                        style="border-radius: 5px"
                        v-model="item.customerRate"
                        hide-details
                      >
                      </v-text-field>
                      <span
                        v-if="item.customerRate"
                        class="pl-2"
                        style="
                          font-family: LexendFont;
                          font-size: 12px;
                          font-weight: 300;
                        "
                        >{{ item.customerNetrate }}</span
                      >
                      <span
                        v-else
                        class="pl-2"
                        style="
                          font-family: LexendFont;
                          font-size: 12px;
                          font-weight: 300;
                        "
                        >{{ item.customerNetrate }}</span
                      >
                    </v-card>
                  </v-flex>
                  <v-flex xs12 py-2 text-center px-6>
                    <v-switch
                    @change="callAvailabilityChange(i)"
                      dense
                      class="mt-0"
                      hide-details
                      inset
                      v-model="item.isAvailable"
                      color="#F17343"
                    ></v-switch>
                  </v-flex>
                  <!-- <v-flex xs12 py-2>
                    <v-card elevation="0" tile class="ma-1">
                      <v-text-field
                        dense
                        outlined
                        type="text"
                        style="border-radius: 5px"
                        v-model="item.numberOfRooms"
                        hide-details
                      >
                      </v-text-field
                    ></v-card>
                  </v-flex> -->
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card>
          <v-layout wrap pt-2 pr-0 pr-sm-3 pr-md-0 justify-end>
            <v-flex xs1
              ><v-btn class="btnstly" block dark @click="SaveRate()"
                >save</v-btn
              ></v-flex
            >
          </v-layout>
          <!-- </v-flex>
        </v-layout> -->
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import VueHorizontal from "vue-horizontal";
import axios from "axios";
export default {
  components: { VueHorizontal },
  data() {
    return {
      appLoading: false,
      ServerError: false,
      showSnackbar: false,
      timeout: 5000,
      msg: null,
      curdate: new Date().toISOString().split("T")[0],
      enddate: null,
      weekArray: [],
      newArr: [],
      tenpercent11: 0,
      tenpercent33: 0,
      items: [
        { title: "Card 1", description: "Description for Card 1" },
        { title: "Card 2", description: "Description for Card 2" },
        { title: "Card 3", description: "Description for Card 3" },
        { title: "Card 1", description: "Description for Card 1" },
        { title: "Card 2", description: "Description for Card 2" },
        { title: "Card 3", description: "Description for Card 3" },
        { title: "Card 1", description: "Description for Card 1" },
        { title: "Card 2", description: "Description for Card 2" },
        { title: "Card 3", description: "Description for Card 3" },
      ],
    };
  },

  mounted() {
    console.log("000000000000")
    if (this.curdate) {
      console.log("1111111111111")
      this.curdate = new Date().toISOString().split("T")[0];
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 7);
      this.enddate = currentDate.toISOString().split("T")[0];
      this.getWeekDates(this.curdate);
    }
  },
  methods: {
    callAvailabilityChange(index) {
      console.log("index", index);
      for (let j = 0; j < this.newArr.length; j++) {
        if (j == index) {
          this.newArr[j].isEdit = true;
          console.log("this.newArr[j].isEdit", this.newArr[j].isEdit);

          this.flag = true;

          break;
        }
      }
    },
    goBack() {
      this.editHouseboat();
      this.prevWeekArray();
    },
    goFront() {
      this.editHouseboat();
      this.updateWeekArray();
    },
    updateWeekArray() {
      // Update curdate to the date after the last date in weekArray
      const lastDate = this.weekArray[this.weekArray.length - 1].date;
      const nextDate = new Date(lastDate);
      nextDate.setDate(nextDate.getDate() + 1);
      this.curdate = nextDate.toISOString().split("T")[0];

      // Call the getWeekDates method to update weekArray with the new starting date
      this.getWeekDates(this.curdate);
    },
    prevWeekArray() {
      // Update curdate to 7 days back from the current date
      const currentDate = new Date(this.curdate);
      currentDate.setDate(currentDate.getDate() - 7);
      this.curdate = currentDate.toISOString().split("T")[0];

      // Call the getWeekDates method to update weekArray with the new starting date
      this.getWeekDates(this.curdate);
    },
    getWeekDates(startDate) {
      console.log("get weeks called")
      const currentDate = new Date(startDate);
      const weekDates = [];

      for (let i = 0; i < 7; i++) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() + i);

        const formattedDate = date.toISOString().split("T")[0];

        const dayOfWeek = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ][date.getDay()];
        const dayOfMonth = date.getDate(); // New variable to get the day of the month
        const month = date.toLocaleString("default", { month: "long" });
        weekDates.push({
          date: formattedDate,
          day: dayOfWeek,
          dayOfMonth: dayOfMonth,
          month: month,
        });
      }
      this.weekArray = weekDates;
      console.log("this.weekArray=",this.weekArray)
      this.enddate = this.weekArray[6].date;
      this.getData();
    },

    getData() {
      this.appLoading = true;
      axios({
        method: "POST",
        url: "/shikara/package/data",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          tripTypeId: this.$route.query.id,
          shikaraId: this.$route.query.boatId,
          startDate: this.curdate,
          endDate: this.enddate,
        },
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status == true) {
            // this.newArr = response.data.data;
            this.newArr = response.data.data.map((item) => {
              item.agentNetrate = this.calculateNetrate(item.agentRate);
              item.customerNetrate = this.calculateNetrate(item.customerRate);
              return item;
            });
            console.log("newArr=", this.newArr);
          } else {
            this.msg = response.data.msg;
            this.showSnackbar = true;
          }
        })
        .catch((err) => {
          this.appLoading = false;
          console.log(err);
          this.ServerError = true;
        });
    },
    calculateNetrate(rate) {
      // Assuming 20% reduction, adjust as needed
      const netRate = (rate * 100) / 120;
      return netRate.toFixed(2);
    },
    calAgentNetRate(index, oldrate) {
      console.log("index", index);
      for (let j = 0; j < this.newArr.length; j++) {
        if (j == index) {
          this.newArr[j].agentNetrate = this.calculateNetrate(oldrate);
          this.newArr[j].isEdit = true;
          console.log("this.newArr[j].isEdit",this.newArr[j].isEdit);
          this.flag = true;
          console.log("oldrate", oldrate);

          break;
        }
      }
    },

    calCustomerNetRate(index, oldrate) {
      console.log("index", index);
      for (let j = 0; j < this.newArr.length; j++) {
        if (j == index) {
          this.newArr[j].customerNetrate = this.calculateNetrate(oldrate);
          this.newArr[j].isEdit = true;
          console.log("this.newArr[j].isEdit", this.newArr[j].isEdit);

          this.flag = true;
          console.log("oldrate", oldrate);

          break;
        }
      }
    },

    editHouseboat() {
      this.appLoading = true;
      axios({
        method: "POST",
        url: "/shikara/specialrate/add",
        data: {
          packageDetails: this.newArr,
          tripTypeId: this.$route.query.id,
          shikaraId: this.$route.query.boatId,
          startDate: this.curdate,
          endDate: this.enddate,
        },
        // data: this.formData2,
        headers: {
          token: localStorage.getItem("token"),
        },
      }).then((response) => {
        this.appLoading = false;
        if (response.data.status == true) {
          this.msg = response.data.msg;
          // this.showSnackbar = true;
        } else {
          this.msg = response.data.msg;
          this.showSnackbar = true;
        }
      });
      // }
    },
    SaveRate() {
      this.appLoading = true;
      axios({
        method: "POST",
        url: "/shikara/specialrate/add",
        data: {
          packageDetails: this.newArr,
          tripTypeId: this.$route.query.id,
          shikaraId: this.$route.query.boatId,
          startDate: this.curdate,
          endDate: this.enddate,
        },
        // data: this.formData2,
        headers: {
          token: localStorage.getItem("token"),
        },
      }).then((response) => {
        this.appLoading = false;
        if (response.data.status == true) {
          this.msg = response.data.msg;
          this.showSnackbar = true;
          this.getData();
        } else {
          this.msg = response.data.msg;
          this.showSnackbar = true;
        }
      });
      // }
    },
  },
};
</script>
<style scoped>
.custom-calendar .v-calendar-dates {
  height: 100px; /* Adjust the height as needed */
}

.delete-button {
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
}
.custom-btn {
  border-top-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 0;
}
.custom-btn2 {
  border-top-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 5px;
}
.btnstly {
  background: linear-gradient(
    to bottom,
    rgba(255, 133, 86, 1),
    rgba(247, 75, 9, 1),
    rgba(255, 70, 0, 1)
  );
  color: white;
}
.container {
  overflow-x: auto;
  white-space: nowrap;
}
</style>