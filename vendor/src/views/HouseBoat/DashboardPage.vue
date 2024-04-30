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
        <v-layout wrap justify-center>
          <v-flex xs12>
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
              >OverView</span
            >
          </v-flex>
        </v-layout>
        <v-layout wrap >
          <v-flex xs12 sm6 md3 v-for="(item, i) in newArr" :key="i">
            <v-card elevation="0" class="pa-2 mb-4r-4 mb-md-0">
              <v-layout wrap fill-height>
                <v-flex xs4 align-self-center>
                  <v-img height="60px" contain :src="item.src"></v-img>
                </v-flex>
                <v-flex xs8 pa-3 align-self-center>
                  <v-layout wrap justify-center>
                    <v-flex xs12
                      ><span
                        style="
                          font-weight: 700;
                          font-size: 30px;
                          font-family: LexendFont;
                        "
                        >{{ item.count }}</span
                      ></v-flex
                    >
                    <v-flex xs12
                      ><span
                        style="
                          font-weight: 400;
                          font-size: 16px;
                          font-family: LexendFont;
                        "
                        >{{ item.name }}</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex xs12 pt-5>
        <chart />
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
  import chart from "./ChartData.vue";

import axios from "axios";
export default {
  components: {
    chart,
    },
  data() {
    return {
      showSnackBar: false,
      ServerError: false,
      msg: "",
      graphdata:[],
      appLoading: false,
      cards: [
        {
          title: "bookingCount",
          name: "Total Bookings",
          src: require("../../assets/icons/homeIcon1.png"),
          count: "",
        },
        {
          title: "reserveCount",
          name: "Reservations",
          src: require("../../assets/icons/homeIcon2.png"),
          count: "",
        },
        {
          title: "houseBoatCount",
          name: "Houseboats",
          src: require("../../assets/icons/homeIcon3.png"),
          count: "",
        },
        {
          title: "shikaraCount",
          name: "Shikaras",
          src: require("../../assets/icons/homeIcon4.png"),
          count: "",
        },
      ],
      cardCount: [],
      newArr: [],
    };
  },
  mounted() {
    this.getData();
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
          if (response.data.status == true) {
            this.graphdata = response.data.data;
          
           

          } else {
            this.msg = response.data.msg;
            this.showSnackBar = true;
          }
        })
        .catch((err) => {
          this.appLoading = false;
          console.log(err);
          this.ServerError = true;
        });
    },
    getData() {
      this.appLoading = true;
      axios({
        method: "POST",
        url: "/dashboard/data",
        headers: {
          token: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status == true) {
            this.cardCount = response.data.data;
            this.newArr = [];
            for (let i = 0; i < this.cardCount.length; i++) {
              for (let j = 0; j < this.cards.length; j++) {
                if (this.cards[j].name == this.cardCount[i].name) {
                  this.cards[j].count = this.cardCount[i].count;
                  this.newArr.push(this.cards[j]);
                }
              }
            }

            console.log("arr==", this.newArr);
          } else {
            this.msg = response.data.msg;
            this.showSnackBar = true;
          }
        })
        .catch((err) => {
          this.appLoading = false;
          console.log(err);
          this.ServerError = true;
        });
    },
  },
};
</script>