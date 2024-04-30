<template>
  <div>
    <vue-element-loading :active="appLoading" :is-full-screen="true" background-color="#FFFFFF"
      color="rgba(0, 38, 53, 1)" spinner="bar-fade-scale" />
    <ServerError v-if="ServerError" />
    <v-snackbar v-model="showSnackbar" color="rgba(0, 38, 53, 1)" right :timeout="timeout">
      <v-layout wrap justify-center>
        <v-flex text-left class="align-self-center">
          <span style="color: white">
            {{ msg }}
          </span>
        </v-flex>

        <v-flex text-right>
          <v-btn small :ripple="false" text @click="showSnackbar = false">
            <v-icon style="color: #000">mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-snackbar>
    <v-layout wrap justify-center>
      <v-flex xs12 sm11 md10 style="position:relative;margin-top:-4%" pb-4>
        <v-card outlined color="white" class="py-8" v-if="shikaradata">
          <v-layout wrap justify-center>
            <v-flex xs12 sm11> <span style="font-size: 20px;font-weight:400;color: black;font-family: LexendFont;">{{
                Datalength }} Total results</span></v-flex>
            <v-flex xs12 sm11 py-4>
              <v-divider></v-divider>
            </v-flex>
          </v-layout>
          <v-layout wrap justify-center px-1 px-sm-6 v-if="shikaradata.length>0">
            <v-flex xs12 sm6 md4 v-for="(item, i) in shikaradata" :key="i" pa-1 pa-sm-2 pa-md-6
              style="background-color: transparent;">
              <v-card class="pa-4" elevation="1" style="border-radius: 10px;" @click="navigateToShikaraDetail(item)">
                <v-layout wrap>
                  <v-flex xs12>
                    <v-card elevation="0" width="330px" style="border-radius: 10px;">
                      <v-img v-if="item.shikaraId" height="150px" :src="mediaUURL + item.shikaraId.coverImage">
                        <template v-slot:placeholder>
                          <ImageLoader />
                        </template>
                      </v-img>
                      <v-img v-else height="150px" src="./../../assets/images/nophoto.jpg"></v-img>
                    </v-card>
                  </v-flex>
                  <v-flex xs12 v-if="item.shikaraId" text-left px-2 pt-2
                    style="font-family: LexendFont;font-weight: 500;font-size: 16px;">
                    {{ item.shikaraId.shikaraName }}
                  </v-flex>
                  <v-flex xs12 text-left px-2 v-if="item.shikaraId">
                    <v-icon x-small color="black">mdi-bed-outline</v-icon> <span
                      style="font-family: LexendFont;font-weight: 500;font-size: 15px;"> {{ item.shikaraId.totalSeats
                      }} Seats</span>
                  </v-flex>
                  <v-flex xs12 md5 text-left pl-2>
                    <span style="font-family: LexendFont;font-weight: 600;font-size: 20px;"> ₹{{ item.totalcusRate
                      }}</span>
                    <!-- <br/> <span style="font-family: LexendFont;font-weight: 400;font-size: 12px;">Per head rate</span> -->
                  </v-flex>
                  <v-flex xs12 md7 text-left text-md-right>
                    <v-btn dark small style="border-radius: 10px;" color="rgba(255, 98, 0, 1)">
                      <span style="font-weight:500;font-size: 15px;font-family: LexendFont;text-transform: none;">Book
                        Now</span>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout wrap justify-center v-else>
            <v-flex xs11 py-4>
              <span style="
                      font-family: LexendFont;
                      font-weight: 400;
                      font-size: 16px;
                    ">No data found</span>
            </v-flex>
          </v-layout>
          <v-layout wrap v-if="shikaradata">
            <v-flex xs12 v-if="shikaradata.length > 0">
              <v-pagination small color="rgba(241, 115, 67, 1)" v-model="page" :length="Datalength" :total-visible="7">
              </v-pagination>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
  import axios from "axios";
  // import store from "./../store";
  export default {
    props: ['shikaradata', 'Datalength'],
    data() {
      return {
        showSnackbar: false,
        timeout: 2000,
        ServerError: false,
        appLoading: false,
        msg: "",
        page: 1,
        BoatList: [],
      };
    },
    computed: {
      SKsearchItems() {
        return this.$store.state.SKsearchItems;
      },
      HBsearchItems() {
        return this.$store.state.HBsearchItems;
      }
    },

    methods: {
      navigateToShikaraDetail(item) {
        const id = item.shikaraId._id;
        const children = localStorage.getItem('children');
        const checkInDate = localStorage.getItem('checkInDate');
        const checkInTime = localStorage.getItem('checkInTime');
        const checkOutTime = localStorage.getItem('checkOutTime');
        const location = localStorage.getItem('location');
        const adult = localStorage.getItem('adult');
        const shikaraname = item.shikaraId.shikaraName;

        const url = `/ShikaraBoat?shikaraboatname=${shikaraname}&id=${id}&children=${children}&checkInDate=${checkInDate}&checkInTime=${checkInTime}&checkOutTime=${checkOutTime}&location=${location}&adult=${adult}`;

        this.$router.push(url);
      },
      getData() {
        this.appLoading = true;
        axios({
          url: "/filter/available/shikaras",
          method: "POST",
          headers: {
            token: localStorage.getItem("token"),
          },
          data: {
            location: localStorage.getItem("location"),
            childrenCount: localStorage.getItem("children"),
            memberCount: localStorage.getItem("adult"),
            selectedDate: localStorage.getItem("checkInDate"),
            startTime: localStorage.getItem("checkInTime"),
            endTime: localStorage.getItem("checkOutTime"),
          },
        })
          .then((response) => {
            this.appLoading = false;
            if (response.data.status == true) {
              this.BoatList = response.data.data;
            } else {
              this.msg = response.data.msg;
              this.showSnackbar = true;
            }

          })
          .catch((err) => {
            //   this.ServerError = true;
            console.log(err);
          });
      },
    },
  };
</script>