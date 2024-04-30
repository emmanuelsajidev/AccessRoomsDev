<template>
  <div>
    <vue-element-loading
      :active="appLoading"
      background-color="#FFFFFF"
      color="#F17343"
      spinner="spinner"
    />
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
    <v-layout wrap pt-6>
      <v-flex xs12>
        <v-card elevation="0">
          <v-layout wrap justify-center>
            <v-flex xs11 pt-8 pb-8>
              <v-layout wrap>
                <v-flex xs12 sm6 md6 lg6 xl6>
                  <v-layout wrap justify-center fill-height>
                    <v-flex xs12 v-if="list" align-self-end>
                      <span
                        v-if="list.shikaraId"
                        style="
                          font-weight: 500;
                          font-size: 22px;
                          font-family: LexendRegular;
                        "
                      >
                        <span v-if="list.shikaraId.shikaraName">
                          {{ list.shikaraId.shikaraName }}
                        </span>
                      </span>
                    </v-flex>
                    <v-flex xs12 text-left v-if="durationInHours">
                      <span
                        style="
                          font-weight: 500;
                          font-size: 16px;
                          font-family: LexendRegular;
                        "
                      >
                        Duration of journey : {{ durationInHours }} hours</span
                      >
                    </v-flex>
                    <v-flex xs12 lg12 align-self-end>
                      <v-layout wrap>
                        <v-flex xs1>
                          <v-avatar class="pa-0" size="15px">
                            <v-img
                              contain
                              src="./../../assets/icons/dicon1.png"
                            ></v-img>
                          </v-avatar>
                        </v-flex>
                        <v-flex
                          xs11
                          v-if="
                            list.shikaraId &&
                            list.shikaraId.userid &&
                            list.shikaraId.userid.name
                          "
                        >
                          <span
                            style="
                              font-weight: 400;
                              font-size: 15px;
                              font-family: LexendRegular;
                            "
                          >
                            {{ list.shikaraId.userid.name }}
                          </span>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex xs12 lg12 align-self-end>
                      <v-layout wrap>
                        <v-flex xs1>
                          <v-avatar class="pa-0" size="15px">
                            <v-img
                              contain
                              src="./../../assets/icons/dicon2.png"
                            ></v-img>
                          </v-avatar>
                        </v-flex>
                        <v-flex
                          xs11
                          v-if="
                            list.shikaraId &&
                            list.shikaraId.location &&
                            list.shikaraId.location.name
                          "
                        >
                          <span
                            style="
                              font-weight: 400;
                              font-size: 15px;
                              font-family: LexendRegular;
                            "
                          >
                            {{ list.shikaraId.location.name }}

                            <!-- {{ list.shikaraId.vendorid.userid.district }} -->
                          </span>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex class="hidden-sm-and-down" xs12 lg6 pt-6 pt-lg-0>
                  <v-layout wrap justify-center>
                    <v-flex xs12 text-right>
                      <span
                        style="
                          font-weight: 500;
                          font-size: 28px;
                          font-family: LexendRegular;
                        "
                        >₹ {{ totrate }}</span
                      >
                    </v-flex>

                    <v-flex xs12 text-right>
                      <v-layout justify-end pt-2>
                        <v-flex xs2 lg3>
                          <v-btn @click="gotoBooknow()" block color="#FF6200">
                            <span
                              style="
                                font-weight: 500;
                                font-size: 12px;
                                text-transform: none;
                                font-family: LexendRegular;
                                color: white;
                              "
                              >Book Now</span
                            >
                          </v-btn>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-flex>

                <v-flex class="hidden-md-and-up" xs12 lg6 pt-6 pt-lg-0>
                  <v-layout wrap justify-center>
                    <v-flex xs12 text-left>
                      <span
                        style="
                          font-weight: 500;
                          font-size: 28px;
                          font-family: LexendRegular;
                        "
                        >₹ {{ totrate }}</span
                      >
                    </v-flex>

                    <v-flex xs12 text-left>
                      <v-layout justify-center pt-2>
                        <v-flex xs12>
                          <v-btn @click="gotoBooknow()" block color="#FF6200">
                            <span
                              style="
                                font-weight: 500;
                                font-size: 12px;
                                text-transform: none;
                                font-family: LexendRegular;
                                color: white;
                              "
                              >Book Now</span
                            >
                          </v-btn>
                        </v-flex>
                      </v-layout>
                    </v-flex>

                    

                <v-flex xs12 pl-lg-10 text-right>
                  <v-rating
                    :length="5"
                    :size="18"
                    v-model="list.rating"
                    active-color="#ff6200"
                    color="#ff6200"
                    background-color="#ff6200"
                /></v-flex>
                  </v-layout>
                </v-flex>


                <v-flex xs12 pl-lg-10 text-right>
                  <v-rating
                    :length="5"
                    :size="18"
                    v-model="list.rating"
                    active-color="#ff6200"
                    color="#ff6200"
                    background-color="#ff6200"
                /></v-flex>
                <v-flex
                  xs12
                  pt-5
                  v-if="list && list.shikaraId && list.shikaraId.coverImage"
                >
                  <v-img
                    width="100%"
                    contain
                    max-width="100%"
                    :src="mediaUURL + list.shikaraId.coverImage"
                  ></v-img>
                </v-flex>

                <v-flex xs12 sm6 md4 lg3 xl3 text-left pt-6>
                  <v-layout wrap>
                    <v-flex
                      xs12
                      sm12
                      md12
                      lg12
                      xl12
                      align-self-center
                      text-left
                    >
                      <span
                        style="
                          font-family: LexendRegular;
                          font-weight: 400;
                          font-size: 18px;
                        "
                        >Pickup/Drop Location </span
                      ><br />
                      <span
                        v-if="list.shikaraId?.startingLocation?.name"
                        style="
                          font-family: LexendRegular;
                          font-weight: 300;
                          font-size: 15px;
                          color: black;
                        "
                      >
                        {{ list.shikaraId.startingLocation.name }}
                      </span>
                      <span v-else>-</span>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 pt-4>
                  <v-layout wrap>
                    <v-flex xs12>
                      <span
                        style="
                          font-weight: 400;
                          font-size: 18px;
                          font-family: LexendRegular;
                        "
                        >Facilities</span
                      >
                    </v-flex>
                  </v-layout>
                  <v-layout wrap justify-center v-if="list.shikaraId">
                    <v-flex xs12>
                      <v-layout
                        wrap
                        justify-start
                        class="LexendRegular"
                        style="font-size: 14px"
                      >
                        <v-flex
                          text-left
                          xs11
                          lg3
                          pt-3
                          v-if="list.shikaraId.facilities.airCondition === true"
                        >
                          <v-layout wrap>
                            <v-flex xs2 text-center>
                              <v-img
                                height="20px"
                                width="20px"
                                contain
                                src="./../../assets/icons/ac.png"
                              >
                              </v-img>
                            </v-flex>
                            <v-flex xs6>
                              <span>Air Condition</span>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex
                          text-left
                          xs11
                          lg3
                          pt-3
                          v-if="list.shikaraId.facilities.lifeJacket === true"
                        >
                          <v-layout wrap>
                            <v-flex xs2>
                              <v-img
                                height="20px"
                                width="20px"
                                contain
                                src="./../../assets/icons/lifejacket.png"
                              >
                              </v-img>
                            </v-flex>
                            <v-flex xs6>
                              <span>Lifejacket</span>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex
                          text-left
                          xs11
                          lg3
                          pt-3
                          v-if="list.shikaraId.facilities.parking === true"
                        >
                          <v-layout wrap>
                            <v-flex xs2>
                              <v-img
                                height="20px"
                                width="20px"
                                contain
                                src="./../../assets/icons/parking.png"
                              >
                              </v-img>
                            </v-flex>
                            <v-flex xs6>
                              <span>Parking</span>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex
                          text-left
                          xs11
                          lg3
                          pt-3
                          v-if="list.shikaraId.facilities.restrooms === true"
                        >
                          <v-layout wrap>
                            <v-flex xs2>
                              <v-img
                                height="20px"
                                width="20px"
                                contain
                                src="./../../assets/icons/was.png"
                              >
                              </v-img>
                            </v-flex>
                            <v-flex xs6>
                              <span>Restrooms</span>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex
                          text-left
                          xs11
                          lg3
                          pt-3
                          v-if="list.shikaraId.facilities.television === true"
                        >
                          <v-layout wrap>
                            <v-flex xs2>
                              <v-img
                                height="20px"
                                width="20px"
                                contain
                                src="./../../assets/icons/tv.png"
                              >
                              </v-img>
                            </v-flex>
                            <v-flex xs6>
                              <span>Television</span>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex
                          text-left
                          xs11
                          lg3
                          pt-3
                          v-if="list.shikaraId.facilities.toilet === true"
                        >
                          <v-layout wrap>
                            <v-flex xs2>
                              <v-img
                                height="20px"
                                width="20px"
                                contain
                                src="./../../assets/icons/restroom.png"
                              >
                              </v-img>
                            </v-flex>
                            <v-flex xs6>
                              <span>Toilet</span>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex
                          text-left
                          xs11
                          lg3
                          pt-3
                          v-if="list.shikaraId.facilities.towels === true"
                        >
                          <v-layout wrap>
                            <v-flex xs2>
                              <v-img
                                color="black"
                                height="20px"
                                width="20px"
                                contain
                                src="./../../assets/icons/towel.png"
                              >
                              </v-img>
                            </v-flex>
                            <v-flex xs6>
                              <span>Towels</span>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex
                          text-left
                          xs11
                          lg3
                          pt-3
                          v-if="list.shikaraId.facilities.wifi === true"
                        >
                          <v-layout wrap>
                            <v-flex xs2>
                              <v-img
                                height="20px"
                                width="20px"
                                contain
                                src="./../../assets/icons/wifi.png"
                              >
                              </v-img>
                            </v-flex>
                            <v-flex xs6>
                              <span>Wifi</span>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-flex>

                <v-flex xs12 pt-4>
                  <v-layout wrap>
                    <v-flex xs12>
                      <span
                        style="
                          font-weight: 400;
                          font-size: 18px;
                          font-family: LexendRegular;
                        "
                        >Rules</span
                      >
                    </v-flex>
                  </v-layout>
                  <v-layout
                    wrap
                    justify-center
                    v-if="list.shikaraId && list.shikaraId.addionalRules !== ''"
                  >
                    <v-flex xs12 lg12 pl-1>
                      <span class="LexendRegular" style="font-size: 14px">
                        {{ list.shikaraId.addionalRules }}
                      </span>
                    </v-flex>
                  </v-layout>

                  <v-layout wrap justify-center v-else>
                    <v-flex xs12 lg12 pl-1> - </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 pt-4 v-if="propertyImages.length > 0">
                  <v-layout wrap justify-start>
                    <v-flex xs12 pb-2>
                      <span
                        style="
                          font-weight: 400;
                          font-size: 18px;
                          font-family: LexendRegular;
                        "
                        >Gallery</span
                      >
                    </v-flex>
                    <v-flex xs12 lg12>
                      <viewer
                        :images="propertyImages"
                        :key="propertyImages.length"
                      >
                        <v-layout wrap>
                          <v-flex
                            xs12
                            sm4
                            md3
                            v-for="(item, i) in propertyImages"
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
                        </v-layout>
                      </viewer>
                    </v-flex>

                    <v-flex xs12>
                      <v-layout wrap>
                        <v-flex xs12 pb-lg-4>
                          <span
                            style="
                              font-weight: 400;
                              font-size: 18px;
                              font-family: LexendRegular;
                            "
                            >Reviews</span
                          ></v-flex
                        >
                        <v-flex xs12 lg4 v-for="(item, i) in review" :key="i">
                          <v-layout wrap justify-center>
                            <v-flex xs11>
                              <v-card
                                height="260px"
                                style="
                                  border-radius: 15px;
                                  background-color: #fafafa;
                                "
                              >
                                <v-layout wrap justify-center>
                                  <v-flex
                                    xs9
                                    pt-3
                                    style="
                                      font-weight: 400;
                                      font-size: 18px;
                                      font-family: LexendRegular;
                                    "
                                  >
                                    {{ item.user.name }}
                                  </v-flex>

                                  <v-flex xs10 pl-lg-1 pt-3>
                                    <v-rating
                                      :length="5"
                                      :size="18"
                                      v-model="item.rating"
                                      active-color="#ff6200"
                                      color="#ff6200"
                                      background-color="#ff6200"
                                    />
                                  </v-flex>

                                  <v-flex xs9 pt-3 style="text-align: justify">
                                    <span
                                      style="
                                        font-weight: 400;
                                        font-size: 15px;
                                        font-family: LexendRegular;
                                      "
                                    >
                                      {{ item.comment }}
                                    </span>
                                  </v-flex>
                                </v-layout>
                              </v-card>
                            </v-flex>
                          </v-layout>
                        </v-flex>

                        <v-flex
                          xs12
                          pt-lg-3
                          v-if="review.length === 0"
                          text-center
                        >
                          <span
                            style="
                              font-weight: 400;
                              font-size: 18px;
                              font-family: LexendRegular;
                            "
                            >No reviews found!</span
                          >
                        </v-flex>
                      </v-layout>
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
import "viewerjs/dist/viewer.css";
import VueViewer from "v-viewer";
import Vue from "vue";
Vue.use(VueViewer);
export default {
  data() {
    return {
      shikaraid: this.$route.query.id,
      currentPage: 1,
      ServerError: false,
      msg: null,
      review:[],
      appLoading: false,
      amount: "",
      startinglocation: "",
      customerRate: "",
      agentSaved: "",
      agentRateCommission: "",
      list: {},
      agentrate: "",
      durationInHours: "",
      propertyImages: [],
      snackbar: false,
    };
  },
  created() {
    const {
      checkInDate,
      checkInTime,
      checkOutTime,
      location,
      memberCount,
      childrenCount,
      totrate,
    } = this.$route.query;
    this.totrate = totrate || this.totrate;

    this.checkInDate = checkInDate || this.checkInDate;
    this.checkInTime = checkInTime || this.checkInTime;
    this.checkOutTime = checkOutTime || this.checkOutTime;
    this.location = location || this.location;
    this.memberCount = memberCount || this.memberCount;
    this.childrenCount = childrenCount || this.childrenCount;
  },
  mounted() {
    this.getList();
  },
  methods: {
    convertToTimestamp(dateString) {
      const date = new Date(dateString);
      return date.getTime();
    },
    combineDateTime(dateString, timeString) {
      const formattedDate = `${dateString}T${timeString}:00`;
      return formattedDate;
    },
    getList() {
      this.appLoading = true;
      axios({
        method: "POST",
        url: "/view/shikara",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          memberCount: this.memberCount,
          selectedDate: this.checkInDate,
          startTime: this.combineDateTime(this.checkInDate, this.checkInTime),
          endTime: this.combineDateTime(this.checkInDate, this.checkOutTime),
          shikaraid: this.shikaraid,
        },
      })
        .then((response) => {
          this.review = response.data.reviews;
          (this.durationInHours = response.data.durationInHours),
            (this.customerRate = response.data.customerRate);
          this.agentSaved = response.data.agentSaved;
          this.agentRateCommission = response.data.agentRateCommission;
          this.agentrate = response.data.agentrate;
          this.list = response.data.data;
          this.startinglocation = response.data.startinglocation;
          this.amount = response.data.Amount;
          this.propertyImages = this.list.shikaraId.propertyImages;
          this.appLoading = false;
        })
        .catch((err) => {
          this.ServerError = true;
          console.error(err);
        });
    },
    gotoBooknow() {
      this.$router.push({
        name: "booknow",
        query: {
          totrate: this.totrate,
          agentSaved: this.agentSaved,
          agentrate: this.agentrate,
          shikaraid: this.shikaraid,
          agentRate: this.list.agentRate,
          checkInDate: this.checkInDate,
          checkInTime: this.checkInTime,
          checkOutTime: this.checkOutTime,
          location: this.location,
          memberCount: this.memberCount,
          childrenCount: this.childrenCount,
          agentRateCommission: this.agentRateCommission,
        },
      });
    },
    apply() {
      this.guest = false;
    },
  },
};
</script>