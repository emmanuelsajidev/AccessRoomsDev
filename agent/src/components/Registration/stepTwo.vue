<template>
  <div>
    <PageLoader v-bind:storage="appLoading" />
    <ServerError v-if="ServerError" />
    <v-snackbar  v-model="snackbar" color="#ff6200" right top :timeout="3000">
  <v-layout wrap >
    <v-flex text-center class="align-self-center">{{ msg }}</v-flex>
    <v-flex text-right>
      <v-btn small :ripple="false" text @click="snackbar = false">
        <v-icon style="color: white">mdi-close</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</v-snackbar>
    <div>
      <v-img src="./../../assets/images/reg1.png">
        <v-layout wrap justify-center pt-10>
          <v-flex
            xs12
            sm6
            md4
            text-center
            pt-xs-0
            pt-sm-10
            pt-lg-15
            pt-md-10
            pt-xl-15
          >
            <v-layout wrap justify-center>
              <v-flex xs12>
                <span style="font-family: LexendRegular"
                  >Agent Registration Process</span
                >
              </v-flex>
              <v-flex xs12>
                <span style="font-family: RobotoLight; font-size: 14px"
                  >Complete all required fields with accurate information to
                  ensure a smooth and personalized experience</span
                >
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-img>
    </div>
    <div>
      <!-- <v-img src="./../../assets/images/reg1Back.png"> -->
      <v-layout wrap justify-center pb-10 class="bg">
        <v-flex xs11 sm8 md5 class="changeStyle">
          <v-form v-model="reg" ref="profileForm" lazy-validation>
            <v-card rounded="xl">
              <v-layout wrap justify-center px-10 py-10>
                <v-flex xs11 sm10>
                  <v-layout wrap justify-center>
                    <v-flex xs12 pb-8>
                      <v-img
                        contain
                        src="./../../assets/images/reg2Bar.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs12>
                      <v-divider></v-divider>
                    </v-flex>
                    <v-flex xs12 pb-2 pt-5>
                      <span style="font-family: LexendRegular">Address </span>
                    </v-flex>
                    <v-flex
                      xs12
                      style="font-family: LexendRegular; font-size: 13px"
                    >
                      <span>Do you have a Company ? </span>
                      <v-radio-group
                        v-model="iscompany"
                        column
                        :hide-details="true"
                      >
                        <v-layout justify="center">
                          <v-flex xs12 sm6 cols="12" sm="6">
                            <v-radio
                              color="#F17343"
                              label="Yes"
                              value="Yes"
                            ></v-radio>
                          </v-flex>
                          <v-flex xs12 sm6 cols="12" sm="6"
                            ><v-radio
                              color="#F17343"
                              label="No"
                              value="No"
                            ></v-radio
                          ></v-flex>
                        </v-layout>
                      </v-radio-group>
                    </v-flex>
                    <v-flex
                      xs12
                      pt-3
                      style="font-family: LexendRegular; font-size: 13px"
                    >
                      <span>Company name </span>
                      <v-text-field
                        dense
                        outlined
                        color="orange"
                        :rules="Rules"
                        v-model="companyName"
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex
                      xs12
                      style="font-family: LexendRegular; font-size: 13px"
                    >
                      <span>Do you have a GST Number ? </span>
                      <v-radio-group
                        v-model="isGst"
                        column
                        :hide-details="true"
                      >
                        <v-layout justify="center">
                          <v-flex xs12 sm6>
                            <v-radio
                              color="#F17343"
                              label="Yes"
                              value="Yes"
                            ></v-radio>
                          </v-flex>
                          <v-flex xs12 sm6>
                            <v-radio
                              color="#F17343"
                              label="No"
                              value="No"
                            ></v-radio>
                          </v-flex>
                        </v-layout>
                      </v-radio-group>
                    </v-flex>

                    <v-flex
                      xs12
                      pt-3
                      style="font-family: LexendRegular; font-size: 13px"
                      v-if="isGst === 'Yes'"
                    >
                      <span>GST Number </span>
                      <v-text-field
                        color="orange"
                        hide-details="auto"
                        dense
                        outlined
                        v-model="gstNo"
                      ></v-text-field>
                    </v-flex>
                    <v-flex
                      pb-4
                      pt-4
                      xs12
                      style="font-family: LexendRegular; font-size: 13px"
                    >
                      <span>Building No </span>
                      <v-text-field
                        dense
                        hide-details="auto"
                        outlined
                        :rules="Rules"
                        color="orange"
                        v-model="buildingNo"
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex
                      xs12
                      style="font-family: LexendRegular; font-size: 13px"
                    >
                      <span>Locality </span>
                      <v-text-field
                        dense
                        outlined
                        color="orange"
                        :rules="Rules"
                        v-model="locality"
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex
                      xs12
                      style="font-family: LexendRegular; font-size: 13px"
                    >
                      <span>District </span>
                      <v-text-field
                        dense
                        color="orange"
                        outlined
                        :rules="Rules"
                        v-model="district"
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex
                      xs12
                      style="font-family: LexendRegular; font-size: 13px"
                    >
                      <span>State </span>
                      <v-text-field
                        color="orange"
                        dense
                        outlined
                        :rules="Rules"
                        v-model="state"
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex
                      xs12
                      style="font-family: LexendRegular; font-size: 13px"
                    >
                      <span>Country </span>
                      <v-text-field
                        color="orange"
                        dense
                        outlined
                        :rules="Rules"
                        v-model="country"
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex
                      xs12
                      style="font-family: LexendRegular; font-size: 13px"
                    >
                      <span>Pin code </span>
                      <v-text-field
                        color="orange"
                        type="number"
                        dense
                        outlined
                        :rules="Rules"
                        v-model="pincode"
                      >
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card>
            <v-layout wrap justify-end pt-10>
              <!-- <v-flex cols="12" sm="6" md="3" class="text-left">
                <v-btn
                  block=""
                  rounded="xl"
                  color="white"
                  to="/StepOne"
                  ><span style="font-family: LexendRegular; text-transform: none"
                    >Previous</span
                  ></v-btn
                >
              </v-col> -->
              <v-flex xs12 sm6 md3 text-right>
                <v-btn
                  block
                  :disabled="!reg"
                  rounded
color="#F17343"

                  @click="setpTwo()"
                  style="
                    background: linear-gradient(
                      to bottom,
                     orange
                    );
                    color: white;
                  "
                  ><span
                    style="font-family: LexendRegular; text-transform: none"
                    >Next</span
                  ></v-btn
                >
              </v-flex>
            </v-layout>
          </v-form>
        </v-flex>
      </v-layout>
      <!-- </v-img> -->
    </div>
  </div>
</template>
    <script>
import axios from "axios";
import store from "../../store";
export default {
  data() {
    return {
      appLoading: false,
      ServerError: false,
      snackbar: false,
      timeout: 5000,
      msg: null,
      reg: false,
      favorites: [],
      states: ["Travel Agent", "Tours & Travels", "Tour Guide"],
      value: "",
      phone: "",
      markers: [],
      places: [],
      currentPlace: null,
      // currentLocation: null,
      cordinates: null,
      lat: "",
      lon: "",
      currentLocation: { lat: 0, lng: 0 },
      agent: {
        lat: 10.535387441362912,
        lon: 76.21544288981148,
      },
      isGst: null,
      iscompany: "",
      companyName: "",
      gstNo: "",
      buildingNo: "",
      locality: "",
      district: "",
      state: "",
      country: "",
      pincode: "",
      Rules: [(v) => !!v || "Required"],
    };
  },
  computed: {
    appUser() {
      return this.$store.state.userData;
    },
  },
  created() {
    // Fetch the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.handlePosition);
    }

    // Example: Adding other positions to the markers array, including the current location
    this.markers = [
      { position: { lat: 0, lng: 0 } }, // Add your positions here
      { position: { lat: 0, lng: 0 } },
      // Add more positions as needed
    ];
  },
  beforeMount() {
    // const marker = {
    //   lat: this.lat,
    //   lng: this.lon,
    // };
    // this.markers.push({ position: marker });
    this.pincode = this.appUser.pincode;
    this.locality = this.appUser.locality;
    this.companyName = this.appUser.companyName;
    this.gstNo = this.appUser.gstNo;
    this.buildingNo = this.appUser.buildingNo;
    this.district = this.appUser.district;
    this.state = this.appUser.state;
    this.country = this.appUser.country;
    this.isGst = this.appUser.isGst;
    this.iscompany = this.appUser.iscompany;
  },
  methods: {
    handlePosition(position) {
      // Extract latitude and longitude from the position object
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      // Update the currentLocation data property
      this.currentLocation = { lat, lng };

      // Add the current location to the markers array
      this.markers.push({ position: { lat, lng } });
    },
    // clickPlace(location) {
    //   this.markers.splice(0, 1);
    //   this.currentLocation = location;
    //   const marker = {
    //     lat: location.latLng.lat(),
    //     lng: location.latLng.lng(),
    //   };
    //   this.markers.push({ position: marker });
    //   this.lat = marker.lat;
    //   this.lon = marker.lng;
    // },
    // geolocate: function () {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     // this.center = {
    //     //   lat: position.coords.latitude,
    //     //   lng: position.coords.longitude,
    //     // };
    //     this.lat = position.coords.latitude;
    //     this.lon = position.coords.longitude;
    //     const marker = {
    //       lat: position.coords.latitude,
    //       lng: position.coords.longitude,
    //     };
    //     this.markers.push({ position: marker });
    //   });
    // },

    setpTwo() {
      // if (this.$refs.form.validate()) {
      axios({
        method: "POST",
        url: "/agent/registration/level2",
        data: {
          isGst: this.isGst,
          iscompany: this.iscompany,
          companyName: this.companyName,
          gstNo: this.gstNo,
          buildingNo: this.buildingNo,
          locality: this.locality,
          district: this.district,
          state: this.state,
          country: this.country,
          pincode: this.pincode,
          long: this.currentLocation.lng,
          lat: this.currentLocation.lat,
        },
        headers: {
          token: localStorage.getItem("token"),
        },
      }).then((response) => {
        if (response.data.status) {
          this.msg = "Successfully Registered";
          this.snackbar = true;
          // store.commit("loginUser", response.data.data);
          store.commit("userData", response.data.data);
          store.commit("level", response.data.data.level);
          this.$router.push("/StepThree");
          // localStorage.setItem("token", response.data.signingData.token);
          // localStorage.removeItem("userId");
        } else {
          this.msg = response.data.msg;
          this.snackbar = true;
        }
      });
      // }
    },
  },
};
</script>
    
    <style>
.bg {
  background: url("./../../assets/images/reg1Back.png") no-repeat center center;
}
.changeStyle {
  position: relative;
  margin-top: -18%;
  @media (max-width: 960px) {
    position: relative;
    margin-top: 0%;
  }
}
@media only screen and (min-width: 960px) and (max-width: 1100px) {
  .changeStyle {
    position: relative;
    margin-top: -10%;
  }
}
</style>