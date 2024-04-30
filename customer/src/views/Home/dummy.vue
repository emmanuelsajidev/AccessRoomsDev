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
        <!-- <v-flex xs12>
          <v-layout wrap>
            <v-spacer></v-spacer>
              <v-flex xs12 sm4 md3>
                <v-layout wrap justify-end style="line-height: 15px" pt-4>
                  <v-flex xs12 sm10 text-right
                    ><span
                      style="
                        font-size: 30px;
                        font-weight: 500;
                        font-family: LexendFont;
                      "
                      >₹1923</span
                    >
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
                      ><span>Book Now</span></v-btn
                    >
                  </v-flex>
                </v-layout>
              </v-flex>
          </v-layout>
        </v-flex> -->
        <v-flex xs12 sm11 md10  pb-4>
          <v-card outlined color="white" class="py-6 px-2 px-sm-4 px-md-14" v-for="(item,i) in fulldata" :key="i">
            <v-layout wrap justify-start>
              <v-flex xs12 sm6>
                <v-layout wrap justify-center>
                  <v-flex xs12 pb-2 align-self-start>
                    <span
                      v-if="item.houseBoatDetails.houseBoatName"
                      class="pb-2"
                      style="
                        font-size: 30px;
                        font-weight: 400;
                        font-family: LexendFont;
                      "
                    >
                      {{ item.houseBoatDetails.houseBoatName }}</span
                    ></v-flex
                  >
                  <v-flex xs12 v-if="item.houseBoatDetails.userid">
                    <span
                      style="
                        font-size: 16px;
                        font-weight: 300;
                        font-family: LexendFont;
                      "
                      v-if="item.houseBoatDetails.userid.name"
                    >
                      <v-icon small>mdi-account-outline</v-icon
                      >{{ item.houseBoatDetails.userid.name }}</span
                    ></v-flex
                  >
                  <v-flex xs12 v-if="item.houseBoatDetails.userid">
                    <span
                      style="
                        font-size: 16px;
                        font-weight: 300;
                        font-family: LexendFont;
                      "
                      v-if="item.houseBoatDetails.userid.locality"
                    >
                      <v-icon small>mdi-map-marker-outline</v-icon
                      >{{ item.houseBoatDetails.userid.locality }},</span
                    >
                    <span
                      style="
                        font-size: 16px;
                        font-weight: 300;
                        font-family: LexendFont;
                      "
                      v-if="item.houseBoatDetails.userid.district"
                      >{{ item.houseBoatDetails.userid.district }},</span
                    >
                    <span
                      style="
                        font-size: 16px;
                        font-weight: 300;
                        font-family: LexendFont;
                      "
                      v-if="item.houseBoatDetails.userid.state"
                      >{{ item.houseBoatDetails.userid.state }},</span
                    >
                    <span
                      style="
                        font-size: 16px;
                        font-weight: 300;
                        font-family: LexendFont;
                      "
                      v-if="item.houseBoatDetails.userid.country"
                      >{{ item.houseBoatDetails.userid.country }}</span
                    >
                  </v-flex>
                  <v-flex xs12 v-if="item.houseBoatDetails.userid">
                    <span
                      style="
                        font-size: 16px;
                        font-weight: 300;
                        font-family: LexendFont;
                      "
                      v-if="item.houseBoatDetails.userid.phoneNumber"
                    >
                      <v-icon small>mdi-phone-outline</v-icon
                      >{{ item.houseBoatDetails.userid.whatsappCountryCode }}
                      {{ item.houseBoatDetails.userid.phoneNumber }},</span
                    >
                    <span
                      style="
                        font-size: 16px;
                        font-weight: 300;
                        font-family: LexendFont;
                      "
                      v-if="item.houseBoatDetails.userid.whatsappNumber"
                    >
                      {{ item.houseBoatDetails.userid.whatsappCountryCode }}
                      {{ item.houseBoatDetails.userid.whatsappNumber }}</span
                    ></v-flex
                  >
                </v-layout>
              </v-flex>
              <v-spacer></v-spacer>
              <!-- <v-flex xs12 sm4 md3>
                <v-layout wrap justify-end style="line-height: 15px" pt-4>
                  <v-flex xs12 sm10 text-right
                    ><span
                      style="
                        font-size: 30px;
                        font-weight: 500;
                        font-family: LexendFont;
                      "
                      >₹1923</span
                    >
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
                      ><span>Book Now</span></v-btn
                    >
                  </v-flex>
                </v-layout>
              </v-flex> -->
            </v-layout>
            <v-layout wrap justify-center pt-4>
              <v-flex xs12
                ><v-card elevation="0">
                  <v-img
                    cover
                    height="400px"
                    v-if="item.houseBoatDetails.coverImage"
                    :src="mediaUURL + item.houseBoatDetails.coverImage"
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
                    <v-flex xs12 sm2 align-self-center text-left v-if="item.houseBoatDetails">
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
                      <span v-if="item.houseBoatDetails.category"
                        style="
                          font-family: LexendFont;
                          font-weight: 600;
                          font-size: 15px;
                          color: rgba(64, 64, 64, 1);
                        "
                      >
                        {{ item.houseBoatDetails.category }}</span
                      >
                      <span v-else>-</span>
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
                    <v-flex xs12 sm2 align-self-center text-left  v-if="item.tripDetails">
                      <span
                        style="
                          font-family: LexendFont;
                          font-weight: 600;
                          font-size: 10px;
                          color: rgba(144, 144, 144, 1);
                          text-transform: uppercase;
                        "
                        >MAX PERSONS</span
                      >
                      <br />
                      <span
                        v-if="item.tripDetails.maxCapacityOfBoat"
                        style="
                          font-family: LexendFont;
                          font-weight: 600;
                          font-size: 15px;
                          color: rgba(64, 64, 64, 1);
                        "
                        >{{ item.tripDetails.maxCapacityOfBoat }}</span
                      >
                    </v-flex>
                    <v-flex xs12 sm3 align-self-center text-left v-if="item.tripDetails">
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
                      <span v-if="item.tripDetails.tripType"
                        style="
                          font-family: LexendFont;
                          font-weight: 600;
                          font-size: 15px;
                          color: rgba(64, 64, 64, 1);
                        "
                        >{{ item.tripDetails.tripType }}</span
                      >
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-flex>
            </v-layout>
            <v-layout wrap justify-center pt-4>
              <v-flex xs12 v-if="item.houseBoatDetails">
                <v-layout wrap mt-2  v-if="item.houseBoatDetails.facilities">
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
                
                  <v-flex
                    xs12
                    sm3
                    py-3
                    pr-2
                    text-left
                    v-if="item.houseBoatDetails.facilities.airCondition == true"
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
                            font-family: LexendFont;
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
                    v-if="item.houseBoatDetails.facilities.wifi == true"
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
                            font-family: LexendFont;
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
                    v-if="item.houseBoatDetails.facilities.television == true"
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
                            font-family: LexendFont;
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
                    v-if="item.houseBoatDetails.facilities.lifeJacket == true"
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
                            font-family: LexendFont;
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
                    v-if="item.houseBoatDetails.facilities.swimmingPool == true"
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
                            font-family: LexendFont;
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
                    v-if="item.houseBoatDetails.facilities.kettle == true"
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
                            font-family: LexendFont;
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
                    v-if="item.houseBoatDetails.facilities.parking == true"
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
                            font-family: LexendFont;
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
                    v-if="item.houseBoatDetails.facilities.restrooms == true"
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
                            font-family: LexendFont;
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
                    v-if="item.houseBoatDetails.facilities.fireextinguisher == true"
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
                            font-family: LexendFont;
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
                    v-if="item.houseBoatDetails.facilities.powerbackup == true"
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
                            font-family: LexendFont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Power backup</span
                        ></v-flex
                      >
                    </v-layout>
                  </v-flex>
                </v-layout>
                <v-layout wrap mt-2 v-else>
                  <v-flex xs12 px-0 px-md-2 
                    ><span
                      style="
                        font-family: LexendFont;
                        font-weight: 400;
                        font-size: 16px;
                      "
                      >No facilities added</span
                    ></v-flex
                  >
                </v-layout>
              </v-flex>
            </v-layout>
            <v-layout wrap justify-center pt-2>
              <v-flex xs12 v-if="item.tripDetails">
                <v-layout wrap v-if="item.tripDetails.mealPlan">
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
                
  
                  <v-flex xs12 sm2 pt-3 px-2 v-if="item.tripDetails.mealPlan.welcomeDrink == true">
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
                            font-family: LexendFont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Welcome drink</span
                        ></v-flex
                      >
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 sm2 pt-3 px-2 v-if="item.tripDetails.mealPlan.lunch == true">
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
                            font-family: LexendFont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Lunch</span
                        ></v-flex
                      >
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 sm3 pt-3 px-2 v-if="item.tripDetails.mealPlan.teaOrsnacks == true">
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
                            font-family: LexendFont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Tea/Coffee - Snacks</span
                        ></v-flex
                      >
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 sm2 pt-3 px-2 v-if="item.tripDetails.mealPlan.dinner == true">
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
                            font-family: LexendFont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Dinner</span
                        ></v-flex
                      >
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 sm2 pt-3 px-2 v-if="item.tripDetails.mealPlan.breakfast == true">
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
                            font-family: LexendFont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Breakfast</span
                        ></v-flex
                      >
                    </v-layout>
                  </v-flex>
                </v-layout>
                <v-layout wrap v-else>
                  <v-flex xs12
                    ><span
                      style="
                        font-family: LexendFont;
                        font-weight: 400;
                        font-size: 16px;
                      "
                      >No meal plan added</span
                    ></v-flex
                  >
                </v-layout>
              </v-flex>
              <v-flex xs12>
                <v-layout wrap v-if="item.houseBoatDetails">
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
                  <v-flex px-0 px-md-2 xs12 sm10 v-if="item.houseBoatDetails.propertyImages">
                    <v-layout wrap v-if="item.houseBoatDetails.propertyImages.length > 0">
                      <v-flex
                        xs12
                        sm4
                        md3
                        v-for="(item, i) in item.houseBoatDetails.propertyImages.slice(0,4)"
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
                          $router.push('/ImageGalleryHouseboat?id=' + item.houseBoatDetails._id)
                        "
                        xs12
                        v-if="item.houseBoatDetails.propertyImages.length > 4"
                        class="mr-2"
                        align-self-center
                        text-center
                      >
                        <span
                          style="
                            font-family: LexendFont;
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
                            font-family: LexendFont;
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
        fulldata: {},
        TripDetail: {},
        
        IsMealplan: false,
        Isfacility: false,
        Item1: {},
        OtherImgs: [],
        moreimg: false,
        itemIds:[],
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
    created() {
      this.itemIds = this.$route.query.ids;
      console.log("page2 itemIds",this.itemIds);
    },
    methods: {
      getData() {
        var newARR= this.itemIds.map(x=>x.toString())
        this.appLoading = true;
        axios({
          method: "GET",
          // url: "/houseboatbooking/get",
          url: "/houseboatbooking/multiple/view",
  
          params: {
            id: newARR,
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
              this.fulldata = response.data.data;
              this.TripDetail = response.data.trip;
              // this.FacilitiesData = this.item.houseBoatDetails.facilities;
              // if (this.FacilitiesData) {
              //   this.Isfacility = true;
              // } else {
              //   this.Isfacility = false;
              // }
              // this.Item1 = this.TripDetail.mealPlan;
              // if (this.Item1) {
              //   this.IsMealplan = true;
              // } else {
              //   this.IsMealplan = false;
              // }
              // this.OtherImgs = this.HouseboatDetail.propertyImages;
  
              // if (this.OtherImgs && this.OtherImgs.length > 5) {
              //   this.OtherImgs = this.OtherImgs.slice(0, 5);
              //   this.moreimg = true;
              // }
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