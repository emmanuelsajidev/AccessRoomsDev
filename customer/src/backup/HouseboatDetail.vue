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
        <v-card outlined color="white" class="py-6 px-2 px-sm-4 px-md-14">
          <v-layout wrap justify-start>
            <v-flex xs12 sm6>
              <v-layout wrap justify-center>
                <v-flex xs12 pb-2 align-self-start>
                  <span
                    v-if="HouseboatDetail.houseBoatName"
                    class="pb-2"
                    style="
                      font-size: 30px;
                      font-weight: 400;
                      font-family: LexendFont;
                    "
                  >
                    {{ HouseboatDetail.houseBoatName }}</span
                  ></v-flex
                >
                <v-flex xs12 v-if="HouseboatDetail.userid">
                  <span
                    style="
                      font-size: 16px;
                      font-weight: 300;
                      font-family: LexendFont;
                    "
                    v-if="HouseboatDetail.userid.name"
                  >
                    <v-icon small>mdi-account-outline</v-icon
                    >{{ HouseboatDetail.userid.name }}</span
                  ></v-flex
                >
                <v-flex xs12 v-if="HouseboatDetail.userid">
                  <span
                    style="
                      font-size: 16px;
                      font-weight: 300;
                      font-family: LexendFont;
                    "
                    v-if="HouseboatDetail.userid.locality"
                  >
                    <v-icon small>mdi-map-marker-outline</v-icon
                    >{{ HouseboatDetail.userid.locality }},</span
                  >
                  <span
                    style="
                      font-size: 16px;
                      font-weight: 300;
                      font-family: LexendFont;
                    "
                    v-if="HouseboatDetail.userid.district"
                    >{{ HouseboatDetail.userid.district }},</span
                  >
                  <span
                    style="
                      font-size: 16px;
                      font-weight: 300;
                      font-family: LexendFont;
                    "
                    v-if="HouseboatDetail.userid.state"
                    >{{ HouseboatDetail.userid.state }},</span
                  >
                  <span
                    style="
                      font-size: 16px;
                      font-weight: 300;
                      font-family: LexendFont;
                    "
                    v-if="HouseboatDetail.userid.country"
                    >{{ HouseboatDetail.userid.country }}</span
                  >
                </v-flex>
                <v-flex xs12 v-if="HouseboatDetail.userid">
                  <span
                    style="
                      font-size: 16px;
                      font-weight: 300;
                      font-family: LexendFont;
                    "
                    v-if="HouseboatDetail.userid.phoneNumber"
                  >
                    <v-icon small>mdi-phone-outline</v-icon
                    >{{ HouseboatDetail.userid.whatsappCountryCode }}
                    {{ HouseboatDetail.userid.phoneNumber }},</span
                  >
                  <span
                    style="
                      font-size: 16px;
                      font-weight: 300;
                      font-family: LexendFont;
                    "
                    v-if="HouseboatDetail.userid.whatsappNumber"
                  >
                    {{ HouseboatDetail.userid.whatsappCountryCode }}
                    {{ HouseboatDetail.userid.whatsappNumber }}</span
                  ></v-flex
                >
              </v-layout>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs12 sm4 md3>
              <v-layout wrap justify-end style="line-height: 15px" pt-4>
                <v-flex xs12 sm10 text-right
                  ><span
                    style="
                      font-size: 30px;
                      font-weight: 500;
                      font-family: RobotoRegular;
                    "
                    >₹1923</span
                  >
                  <!-- <span
                    style="
                      font-size: 12px;
                      font-weight: 300;
                      font-family: LexendFont;
                    "
                    >/per head rate</span
                  > -->
                  </v-flex
                >
                <v-flex xs12 sm10 text-right>
                  <span
                    style="
                      font-size: 10px;
                      font-weight: 300;
                      font-family: LexendFont;
                      color: rgba(134, 134, 134, 1);
                    "
                    >(Inclusive of all taxes)</span
                  >
                </v-flex>
                <v-flex xs12 sm4 pt-8 px-1>
                  <v-btn class="px-0" text
                    ><span
                      ><v-icon small>mdi-share-outline</v-icon>Share</span
                    ></v-btn
                  >
                </v-flex>
                <v-flex xs12 sm6 pt-8 px-1>
                  <v-btn
                    dark
                    block
                    color="rgba(255, 98, 0, 1)"
                    class="px-1"
                    @click="bookNow()"
                    ><span>Book Now </span></v-btn
                  >
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout wrap justify-center pt-4>
            <v-flex xs12
              ><v-card elevation="0">
                <v-img
                  cover
                  height="400px"
                  v-if="HouseboatDetail.coverImage"
                  :src="mediaUURL + HouseboatDetail.coverImage"
                  ><template v-slot:placeholder>
                    <ImageLoader /> </template
                ></v-img>
                <v-img
                  v-else
                  height="300px"
                  src="./../../assets/images/noimg.png"
                >
                  <template v-slot:placeholder>
                    <ImageLoader />
                  </template>
                </v-img> </v-card
            ></v-flex>
          </v-layout>
          <v-layout wrap justify-center pt-4>
            <v-flex xs12>
              <v-card elevation="0" outlined class="pa-4">
                <v-layout wrap>
                  <v-flex xs12 sm2 align-self-center text-left>
                    <span
                      style="
                        font-family: LexendFont;
                        font-weight: 600;
                        font-size: 10px;
                        color: rgba(144, 144, 144, 1);
                        text-transform: uppercase;
                      "
                      >CATEGORY</span
                    >
                    <br />
                    <span
                      style="
                        font-family: LexendFont;
                        font-weight: 600;
                        font-size: 15px;
                        color: rgba(64, 64, 64, 1);
                      "
                    >
                      DELUX</span
                    >
                  </v-flex>
                  <v-flex xs12 sm2 align-self-center text-left>
                    <span
                      style="
                        font-family: LexendFont;
                        font-weight: 600;
                        font-size: 10px;
                        color: rgba(144, 144, 144, 1);
                        text-transform: uppercase;
                      "
                      >HOUSEBOAT TYPE</span
                    >
                    <br />
                    <span
                      style="
                        font-family: LexendFont;
                        font-weight: 600;
                        font-size: 15px;
                        color: rgba(64, 64, 64, 1);
                      "
                      >PRIVATE</span
                    >
                  </v-flex>
                  <v-flex xs12 sm2 align-self-center text-left>
                    <span
                      style="
                        font-family: LexendFont;
                        font-weight: 600;
                        font-size: 10px;
                        color: rgba(144, 144, 144, 1);
                        text-transform: uppercase;
                      "
                      >NO OF PERSONS</span
                    >
                    <br />
                    <span
                      v-if="TripDetail.maxCapacityOfBoat"
                      style="
                        font-family: LexendFont;
                        font-weight: 600;
                        font-size: 15px;
                        color: rgba(64, 64, 64, 1);
                      "
                      >{{ TripDetail.maxCapacityOfBoat }}</span
                    >
                  </v-flex>
                  <v-flex xs12 sm3 align-self-center text-left>
                    <span
                      style="
                        font-family: LexendFont;
                        font-weight: 600;
                        font-size: 10px;
                        color: rgba(144, 144, 144, 1);
                        text-transform: uppercase;
                      "
                      >TRIP TYPE</span
                    >
                    <br />
                    <span
                      style="
                        font-family: LexendFont;
                        font-weight: 600;
                        font-size: 15px;
                        color: rgba(64, 64, 64, 1);
                      "
                      >OVERNIGHT STAY</span
                    >
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout wrap justify-center pt-4>
            <v-flex xs12>
              <v-layout wrap mt-2 v-if="FacilitiesData">
                <v-flex
                  xs12
                  px-0
                  px-md-2
                  style="
                    font-family: LexendFont;
                    font-weight: 400;
                    font-size: 22px;
                  "
                  >Facilities</v-flex
                >
                <v-flex xs12 px-0 px-md-2 v-if="Isfacility == false"
                  ><span
                    style="
                      font-family: RobotoRegular;
                      font-weight: 400;
                      font-size: 16px;
                    "
                    >No facilities added</span
                  ></v-flex
                >
                <v-flex
                  xs12
                  sm3
                  py-3
                  pr-2
                  text-left
                  v-if="FacilitiesData.airCondition == true"
                >
                  <v-layout wrap>
                    <v-flex xs2>
                      <v-img
                        height="20px"
                        contain
                        src="./../../assets/icons/ac.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs10
                      ><span
                        style="
                          font-family: RobotoRegular;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Air condition</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
                <v-flex
                  xs12
                  sm3
                  py-3
                  pr-2
                  text-left
                  v-if="FacilitiesData.wifi == true"
                >
                  <v-layout wrap>
                    <v-flex xs2>
                      <v-img
                        height="20px"
                        contain
                        src="./../../assets/icons/wifi.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs10
                      ><span
                        style="
                          font-family: RobotoRegular;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Wifi</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
                <v-flex
                  xs12
                  sm3
                  py-3
                  pr-2
                  text-left
                  v-if="FacilitiesData.television == true"
                >
                  <v-layout wrap>
                    <v-flex xs2>
                      <v-img
                        height="20px"
                        contain
                        src="./../../assets/icons/tv.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs10
                      ><span
                        style="
                          font-family: RobotoRegular;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Smart TV</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
                <v-flex
                  xs12
                  sm3
                  py-3
                  pr-2
                  text-left
                  v-if="FacilitiesData.lifeJacket == true"
                >
                  <v-layout wrap>
                    <v-flex xs2>
                      <v-img
                        height="20px"
                        contain
                        src="./../../assets/icons/lifejacket.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs10
                      ><span
                        style="
                          font-family: RobotoRegular;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Life Jacket</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
                <v-flex
                  xs12
                  sm3
                  py-3
                  pr-2
                  text-left
                  v-if="FacilitiesData.swimmingPool == true"
                >
                  <v-layout wrap>
                    <v-flex xs2>
                      <v-img
                        height="20px"
                        contain
                        src="./../../assets/icons/swimmingpool.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs10
                      ><span
                        style="
                          font-family: RobotoRegular;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Swimming pool</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
                <v-flex
                  xs12
                  sm3
                  py-3
                  pr-2
                  text-left
                  v-if="FacilitiesData.kettle == true"
                >
                  <v-layout wrap>
                    <v-flex xs2>
                      <v-img
                        height="20px"
                        contain
                        src="./../../assets/icons/kettle.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs10
                      ><span
                        style="
                          font-family: RobotoRegular;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Kettle</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
                <v-flex
                  xs12
                  sm3
                  py-3
                  pr-2
                  text-left
                  v-if="FacilitiesData.parking == true"
                >
                  <v-layout wrap>
                    <v-flex xs2>
                      <v-img
                        height="20px"
                        contain
                        src="./../../assets/icons/parking.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs10
                      ><span
                        style="
                          font-family: RobotoRegular;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Parking</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
                <v-flex
                  xs12
                  sm3
                  py-3
                  pr-2
                  text-left
                  v-if="FacilitiesData.restrooms == true"
                >
                  <v-layout wrap>
                    <v-flex xs2>
                      <v-img
                        height="20px"
                        contain
                        src="./../../assets/icons/restroom.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs10
                      ><span
                        style="
                          font-family: RobotoRegular;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Restroom</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
                <v-flex
                  xs12
                  sm3
                  py-3
                  pr-2
                  text-left
                  v-if="FacilitiesData.fireextinguisher == true"
                >
                  <v-layout wrap>
                    <v-flex xs2>
                      <v-img
                        height="20px"
                        contain
                        src="./../../assets/icons/fire.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs10
                      ><span
                        style="
                          font-family: RobotoRegular;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Fire extinguisher</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
                <v-flex
                  xs12
                  sm3
                  py-3
                  pr-2
                  text-left
                  v-if="FacilitiesData.powerbackup == true"
                >
                  <v-layout wrap>
                    <v-flex xs2>
                      <v-img
                        height="20px"
                        contain
                        src="./../../assets/icons/battery.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs10
                      ><span
                        style="
                          font-family: RobotoRegular;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Power backup</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout wrap justify-center pt-2>
            <v-flex xs12>
              <v-layout wrap v-if="Item1">
                <v-flex
                  xs12
                  px-2
                  style="
                    font-family: LexendFont;
                    font-weight: 400;
                    font-size: 18px;
                  "
                  >Meal plan</v-flex
                >
                <v-flex xs12 v-if="IsMealplan == false"
                  ><span
                    style="
                      font-family: RobotoRegular;
                      font-weight: 400;
                      font-size: 16px;
                    "
                    >No meal plan added</span
                  ></v-flex
                >

                <v-flex xs12 sm2 pt-3 px-2 v-if="Item1.welcomeDrink == true">
                  <v-layout wrap>
                    <v-flex xs2>
                      <v-img
                        height="20px"
                        contain
                        src="./../../assets/icons/welcomedrink.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs10
                      ><span
                        style="
                          font-family: RobotoRegular;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Welcome drink</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
                <v-flex xs12 sm2 pt-3 px-2 v-if="Item1.lunch == true">
                  <v-layout wrap>
                    <v-flex xs2>
                      <v-img
                        height="20px"
                        contain
                        src="./../../assets/icons/lunch.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs10
                      ><span
                        style="
                          font-family: RobotoRegular;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Lunch</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
                <v-flex xs12 sm3 pt-3 px-2 v-if="Item1.teaOrsnacks == true">
                  <v-layout wrap>
                    <v-flex xs2>
                      <v-img
                        height="20px"
                        contain
                        src="./../../assets/icons/food.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs10
                      ><span
                        style="
                          font-family: RobotoRegular;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Tea/Coffee - Snacks</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
                <v-flex xs12 sm2 pt-3 px-2 v-if="Item1.dinner == true">
                  <v-layout wrap>
                    <v-flex xs2>
                      <v-img
                        height="20px"
                        contain
                        src="./../../assets/icons/dinner.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs10
                      ><span
                        style="
                          font-family: RobotoRegular;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Dinner</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
                <v-flex xs12 sm2 pt-3 px-2 v-if="Item1.breakfast == true">
                  <v-layout wrap>
                    <v-flex xs2>
                      <v-img
                        height="20px"
                        contain
                        src="./../../assets/icons/breakfast.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs10
                      ><span
                        style="
                          font-family: RobotoRegular;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Breakfast</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12>
              <v-layout wrap>
                <v-flex
                  xs12
                  px-0
                  px-md-2
                  pt-2
                  style="
                    font-family: LexendFont;
                    font-weight: 400;
                    font-size: 22px;
                  "
                  >Photos</v-flex
                >
                <v-flex px-0 px-md-2 xs12 sm10 v-if="OtherImgs">
                  <v-layout wrap v-if="OtherImgs.length > 0">
                    <v-flex
                      xs12
                      sm4
                      md3
                      v-for="(item, i) in OtherImgs"
                      :key="i"
                      class="pa-1"
                    >
                      <img
                        :src="mediaUURL + item"
                        style="object-fit: cover"
                        height="200px"
                        width="200px"
                      />
                    </v-flex>
                    <v-flex
                      @click="
                        $router.push('/ImageGallery?id=' + $route.query.id)
                      "
                      xs12
                      v-if="moreimg == true"
                      class="mr-2"
                      align-self-center
                      text-center
                    >
                      <span
                        style="
                          font-family: RobotoRegular;
                          font-weight: 500;
                          font-size: 15px;
                          color: rgb(170, 170, 170);
                          cursor: pointer;
                        "
                        >View More</span
                      ></v-flex
                    >
                  </v-layout>
                  <v-layout wrap v-else>
                    <v-flex xs12>
                      <span
                        style="
                          font-family: RobotoRegular;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >No images found</span
                      >
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
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
  data() {
    return {
      showSnackbar: false,
      timeout: 2000,
      ServerError: false,
      appLoading: false,
      msg: "",
      HouseboatDetail: {},
      TripDetail: {},
      FacilitiesData: {},
      IsMealplan: false,
      Isfacility: false,
      Item1: {},
      OtherImgs: [],
      moreimg: false,
    };
  },
  computed: {
    SKsearchItems() {
      return this.$store.state.SKsearchItems;
    },
    HBsearchItems() {
      return this.$store.state.HBsearchItems;
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.appLoading = true;
      axios({
        method: "GET",
        url: "/houseboatbooking/get",
        params: {
          id: this.$route.query.id,
          category: localStorage.getItem("Hcategory"),
          type: localStorage.getItem("Htype"),
          location: localStorage.getItem("Hlocation"),
          room: localStorage.getItem("Hroom"),
          triptype: localStorage.getItem("Htriptype"),
          checkInDate: localStorage.getItem("HcheckInDate"),
          checkOutDate: localStorage.getItem("HcheckOutDate"),
          children: localStorage.getItem("Hchildren"),
          adult: localStorage.getItem("Hadult"),
        },
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status) {
            this.HouseboatDetail = response.data.data;
            this.TripDetail = response.data.trip;
            this.FacilitiesData = this.HouseboatDetail.facilities;
            if (this.FacilitiesData) {
              this.Isfacility = true;
            } else {
              this.Isfacility = false;
            }
            this.Item1 = this.TripDetail.mealPlan;
            if (this.Item1) {
              this.IsMealplan = true;
            } else {
              this.IsMealplan = false;
            }
            this.OtherImgs = this.HouseboatDetail.propertyImages;

            if (this.OtherImgs && this.OtherImgs.length > 5) {
              this.OtherImgs = this.OtherImgs.slice(0, 5);
              this.moreimg = true;
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
    bookNow() {
      this.appLoading = true;
      var headers1 = {};
      // var data = {
      //      productId: item,
      //     quantity: 1,
      // };
      if (this.appLogin) {
        headers1 = {
          token: localStorage.getItem("token"),
        };
      } else
        headers1 = {
          guestid: localStorage.getItem("guestId"),
        };
      axios({
        method: "Post",
        url: "/houseboat/booknow/",
        headers: headers1,
        data: {
          id: this.$route.query.id,
          category: localStorage.getItem("Hcategory"),
          houseBoatType: localStorage.getItem("Htype"),
          location: localStorage.getItem("Hlocation"),
          totalRooms: localStorage.getItem("Hroom"),
          tripType: localStorage.getItem("Htriptype"),
          startDate: localStorage.getItem("HcheckInDate"),
          endDate: localStorage.getItem("HcheckOutDate"),
          children: localStorage.getItem("Hchildren"),
          adult: localStorage.getItem("Hadult"),
          houseBoatId: this.$route.query.id,
        },
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status) {
            this.msg = response.data.msg;
            this.showsnackbar = true;
            var curId = response.data.data._id;
            this.$router.push("/BookHouseboat?id=" + curId);
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