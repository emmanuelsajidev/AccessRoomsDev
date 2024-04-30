<template>
  <div>
    <vue-element-loading
      :active="appLoading"
      :is-full-screen="true"
      background-color="#FFFFFF"
      color="rgba(0, 38, 53, 1)"
      spinner="bar-fade-scale"
    />
    <ServerError v-if="ServerError" />
    <v-snackbar
      v-model="showSnackbar"
      color="rgba(0, 38, 53, 1)"
      right
      :timeout="timeout"
    >
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
      <v-flex xs12 sm11 md10 style="position: relative; margin-top: -4%" pb-4>
        <v-card outlined color="white" class="py-8" v-if="housedata">
          <v-layout wrap justify-center>
            <v-flex xs12 sm11>
              <span
                style="
                  font-size: 20px;
                  font-weight: 400;
                  color: black;
                  font-family: LexendFont;
                "
                >{{ Datalength }} Total results</span
              ></v-flex
            >
            <v-flex xs12 sm11 py-4><v-divider></v-divider></v-flex>
          </v-layout>
          <v-layout wrap justify-start px-0 px-sm-6 v-if="filterType == true && housedata.length > 0">
            <v-flex
              xs12
              sm6
              md4
              v-for="(item, i) in housedata"
              :key="i"
              pa-1
              pa-sm-2
              pa-md-6
              style="background-color: transparent"
            >
              <v-card
                class="pa-4"
                elevation="1"
                style="border-radius: 10px"
                @click="navigateToHouseboatDetail(item)">
                <!-- @click="$router.push('/HouseboatDetail?id=' + item._id)" -->
              
                <v-layout wrap>
                  <v-flex xs12>
                    <v-card
                      elevation="0"
                      width="330px"
                      style="border-radius: 10px"
                    >
                      <v-img
                        v-if="item.fullImage"
                        height="150px"
                        :src="mediaUURL + item.fullImage"
                      >
                        <template v-slot:placeholder>
                          <ImageLoader /> </template
                      ></v-img>
                      <v-img
                        v-else
                        height="150px"
                        src="./../../assets/images/nophoto.jpg"
                      ></v-img>
                    </v-card>
                  </v-flex>
                  <v-flex
                    xs12
                    text-left
                    px-2
                    pt-2
                    style="
                      font-family: LexendFont;
                      font-weight: 500;
                      font-size: 16px;
                    "
                  >
                    <span>
                      {{ item.houseBoatName }}
                    </span>
                  </v-flex>
                  <v-flex xs12 text-left px-2>
                    <v-icon x-small color="black">mdi-bed-outline</v-icon>
                    <span
                      style="
                        font-family: LexendFont;
                        font-weight: 500;
                        font-size: 15px;
                      "
                    >
                      {{ item.totalRooms }} Rooms</span
                    >
                    <!-- <span    style="
                        font-family: LexendFont;
                        font-weight: 500;
                        font-size: 15px;
                      ">
    {{ item.length > 1 ? item.reduce((sum, item1) => sum + item1.totalRooms, 0) : item[0].totalRooms }} Rooms
  </span> -->
                  </v-flex>
                  <v-flex xs12 md6 text-left pl-2>
                    <span
                      v-if="item.customerRate"
                      style="
                        font-family: LexendFont;
                        font-weight: 600;
                        font-size: 20px;
                      "
                    >
                      ₹{{ item.customerRate }}</span
                    >
                    <span v-else>-</span>
                  </v-flex>
                  <v-flex xs12 md6  text-left text-md-right>
                    <v-btn
                      dark
                      small
                      style="border-radius: 10px"
                      color="rgba(255, 98, 0, 1)"
                    >
                      <span
                        style="
                          font-weight: 500;
                          font-size: 15px;
                          font-family: LexendFont;
                          text-transform: none;
                        "
                        >Book Now</span
                      ></v-btn
                    >
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout wrap justify-center v-if="filterType == true && housedata.length <= 0">
            <v-flex xs11 py-4>
              <span
                    style="
                      font-family: LexendFont;
                      font-weight: 400;
                      font-size: 16px;
                    "
                    >No data found</span>
            </v-flex>
          </v-layout>
          <!------------------------------- if multiple filter result ---------------------------------------->
          <v-layout wrap justify-start px-0 px-sm-6 v-if="filterType == false && housedata.length > 0">
            <v-flex
              xs12
              sm6
              md4
              v-for="(item, i) in housedata"
              :key="i"
              pa-1
              pa-sm-2
              pa-md-6
              style="background-color: transparent"
            >
              <v-card
                class="pa-4"
                elevation="1"
                style="border-radius: 10px"
                @click="navigateToPage2(item)"
              >
                <!-- @click="$router.push('/HouseboatDetail?id=' + item._id)"
              > -->
                <v-layout wrap>
                  <v-flex xs12>
                    <v-card
                      elevation="0"
                      width="330px"
                      style="border-radius: 10px"
                    >
                      <v-img
                        v-if="item.houseBoatDetails[0].fullImage"
                        height="150px"
                        :src="mediaUURL + item.houseBoatDetails[0].fullImage"
                      >
                        <template v-slot:placeholder>
                          <ImageLoader /> </template
                      ></v-img>
                      <v-img
                        v-else
                        height="150px"
                        src="./../../assets/images/nophoto.jpg"
                      ></v-img>
                    </v-card>
                  </v-flex>
                  <v-flex
                    xs12
                    text-left
                    px-2
                    pt-2
                    style="
                      font-family: LexendFont;
                      font-weight: 500;
                      font-size: 16px;
                    "
                  >
                    <span v-for="(item1, j) in item.houseBoatDetails" :key="j">
                      {{ item1.houseBoatName }}
                      <span v-if="j < Object.keys(item.houseBoatDetails).length - 1">, </span>
                    </span>
                  </v-flex>
                  <v-flex xs12 text-left px-2>
                    <v-icon x-small color="black">mdi-bed-outline</v-icon>
                    <span
                      style="
                        font-family: LexendFont;
                        font-weight: 500;
                        font-size: 15px;
                      "
                    >
                      {{
                        item.houseBoatDetails.length > 1
                          ? item.houseBoatDetails.reduce(
                              (sum, item1) => sum + item1.totalRooms,
                              0
                            )
                          : item.houseBoatDetails[0].totalRooms
                      }}
                      Rooms
                    </span>
                  </v-flex>
                  <v-flex xs12 md5 text-left pl-2>
                    <span
                      v-if="item.totalAmount"
                      style="
                        font-family: LexendFont;
                        font-weight: 600;
                        font-size: 20px;
                      "
                    >
                      ₹ {{ item.totalAmount}}
                      <!-- {{
                        item.length > 1
                          ? item.reduce(
                              (sum, item1) => sum + item1.customerRate,
                              0
                            )
                          : item[0].customerRate
                      }} -->
                    </span>
                    <span v-else>-</span>
                  </v-flex>
                  <v-flex xs12 md7 text-left text-md-right>
                    <v-btn
                      dark
                      small
                      style="border-radius: 10px"
                      color="rgba(255, 98, 0, 1)"
                    >
                      <span
                        style="
                          font-weight: 500;
                          font-size: 15px;
                          font-family: LexendFont;
                          text-transform: none;
                        "
                        >Book Now</span
                      ></v-btn
                    >
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout wrap justify-center v-if="filterType == false && housedata.length <= 0">
            <v-flex xs11 py-4>
              <span
                    style="
                      font-family: LexendFont;
                      font-weight: 400;
                      font-size: 16px;
                    "
                    >No data found</span>
            </v-flex>
          </v-layout>
          <!---------------------------------------------------------------------------------------------->
          <v-layout wrap v-if="housedata">
            <v-flex xs12 v-if="housedata.length > 0">
              <v-pagination
                small
                color="rgba(241, 115, 67, 1)"
                v-model="page"
                :length="Pagelength"
                :total-visible="7"
              >
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
  props: ["housedata", "Datalength", "filterType"],
  data() {
    return {
      showSnackbar: false,
      timeout: 2000,
      ServerError: false,
      appLoading: false,
      Pagelength: 0,
      limit:20,
      msg: "",
      page: 1,
      HouseboatList: [],
    };
  },
mounted(){
  this.Pagelength = Math.ceil(this.Datalength / this.limit);

},
watch:{
page(){
  console.log("page changed")
this.sendData();
}
},
  methods: {
    navigateToHouseboatDetail(item) {
      const id = item._id;
      const category = localStorage.getItem('Hcategory');
      const type = localStorage.getItem('Htype');
      const location = localStorage.getItem('Hlocation');
      const room = localStorage.getItem('Hroom');
      const triptype = localStorage.getItem('Htriptype');
      const checkInDate = localStorage.getItem('HcheckInDate');
      const checkOutDate = localStorage.getItem('HcheckOutDate');
      const children = localStorage.getItem('Hchildren');
      const adult = localStorage.getItem('Hadult');
      const houseboatname = item.houseBoatName;

      const url = `/HouseBoat?houseboatname=${houseboatname}&id=${id}&category=${category}&type=${type}&triptype=${triptype}&room=${room}&checkInDate=${checkInDate}&location=${location}&checkOutDate=${checkOutDate}&children=${children}&adult=${adult}`;

      this.$router.push(url);
    },
    sendData(){
      this.$emit("stepper", {
        ref: "pagecount",
        page: this.page,
      });
    },
    // navigateToPage2(item) {
    //   const itemIds = item.map((item) => item._id);
    //   console.log("itemIds", itemIds);
    //   this.$router.push({
    //     path: "/HouseboatDetailMultiple",
    //     query: { ids: item._id },
    //   });
    // },
    navigateToPage2(item) {
  const category = localStorage.getItem('Hcategory');
  const type = localStorage.getItem('Htype');
  const location = localStorage.getItem('Hlocation');
  const room = localStorage.getItem('Hroom');
  const triptype = localStorage.getItem('Htriptype');
  const checkInDate = localStorage.getItem('HcheckInDate');
  const checkOutDate = localStorage.getItem('HcheckOutDate');
  const children = localStorage.getItem('Hchildren');
  const adult = localStorage.getItem('Hadult');

  this.$router.push({
    path: "/HouseboatDetailMultiple",
    query: {
      ids: item._id,
      category,
      type,
      location,
      room,
      triptype,
      checkInDate,
      checkOutDate,
      children,
      adult,
    },
  });
},
    getHouseboat() {
      this.appLoading = true;
      // var data = {
      //      productId: item,
      //     quantity: 1,
      // };
      // if (this.appLogin) {
      //   headers1 = {
      //   "token": localStorage.getItem("token"),
      //   };
      // } else data["guestid"] = localStorage.getItem("guestId");
      axios({
        method: "POST",
        url: "/houseboat/booking/filter",
        data: {
          category: localStorage.getItem("Hcategory"),
          houseBoatType: localStorage.getItem("Htype"),
          location: localStorage.getItem("Hlocation"),
          numberOfRooms: localStorage.getItem("Hroom"),
          children: localStorage.getItem("Hchildren"),
          adult: localStorage.getItem("Hadult"),
          tripType: localStorage.getItem("Htriptype"),
          checkInDate: localStorage.getItem("HcheckInDate"),
          checkOutDate: localStorage.getItem("HcheckOutDate"),
        },
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status) {
            this.HouseboatList = response.data.data;
            if (this.HouseboatList.length > 0) {
              this.flag = true;
            }
          } else {
            this.msg = response.data.msg;
            this.showsnackbar = true;
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