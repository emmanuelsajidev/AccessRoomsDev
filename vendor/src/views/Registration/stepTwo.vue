<template>
  <div>
    <PageLoader v-bind:storage="appLoading" />
    <ServerError v-if="ServerError" />
    <v-snackbar v-model="showSnackBar" color="#ff6200" right :timeout="3000">
      <v-layout wrap>
        <v-flex text-left class="align-self-center">{{ msg }}</v-flex>
        <v-flex text-right>
          <v-btn small :ripple="false" text @click="snackbar = false">
            <v-icon style="color: white">mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-snackbar>
    <div>
      <v-img
        src="./../../assets/images/reg1.png"
        :height="
          $vuetify.breakpoint.name == 'xs'
            ? '180px'
            : $vuetify.breakpoint.name == 'sm'
            ? '200px'
            : $vuetify.breakpoint.name == 'md'
            ? '290px'
            : $vuetify.breakpoint.name == 'lg'
            ? '420px'
            : '690px'
        "
      >
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
                <span
                  style="font-family: LexendFont; font-weight: 500"
                  :style="{
                    'font-size':
                      $vuetify.breakpoint.name == 'xs'
                        ? '20px'
                        : $vuetify.breakpoint.name == 'sm'
                        ? '20px'
                        : $vuetify.breakpoint.name == 'md'
                        ? '20px'
                        : $vuetify.breakpoint.name == 'lg'
                        ? '25px'
                        : '35px',
                  }"
                  >Vendor Registration Process</span
                >
              </v-flex>
              <v-flex xs12>
                <span
                  style="font-family: RobotoLight; font-weight: 400"
                  :style="{
                    'font-size':
                      $vuetify.breakpoint.name == 'xs'
                        ? '15px'
                        : $vuetify.breakpoint.name == 'sm'
                        ? '15px'
                        : $vuetify.breakpoint.name == 'md'
                        ? '15px'
                        : $vuetify.breakpoint.name == 'lg'
                        ? '18px'
                        : '30px',
                  }"
                  >Please provide us with the necessary details to enhance your
                  experience and ensure everything runs smoothly.</span
                >
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-img>
    </div>
    <div>
      <!-- <v-img src="./../../assets/images/background.png"> -->
      <v-layout wrap justify-center pb-10 class="bg">
        <v-flex xs11 sm8 md5 class="changeStyle">
          <v-form v-model="reg" ref="profileForm" lazy-validation>
            <v-card rounded="xl">
              <v-layout wrap justify-center px-5 px-md-10 py-10>
                <v-flex xs12 sm10>
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
                      <span
                        style="
                          font-family: LexendFont;
                          font-size: 22px;
                          font-weight: 400;
                        "
                        >Additional Information
                      </span>
                    </v-flex>
                    <v-flex
                      xs12
                      pt-3
                      style="font-family: LexendRegular; font-size: 13px"
                    >
                      <span class="font3">Company Name </span>
                      <v-text-field
                        dense
                        outlined
                        :rules="Rules"
                        v-model="companyName"
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex
                      xs12
                      style="font-family: LexendRegular; font-size: 13px"
                    >
                      <span class="font3">Do you have a GST Number?</span>
                      <v-radio-group
                        v-model="isGst"
                        column
                        :hide-details="true"
                        class="mt-0 pt-0"
                      >
                        <v-layout justify="center">
                          <v-flex xs12 sm6>
                            <v-radio
                              color="#F17343"
                              label="Yes"
                              value="Yes"
                            ></v-radio>
                          </v-flex>
                          <v-flex xs12 sm6
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
                      pt-4
                      pt-3
                      v-if="isGst == 'Yes'"
                      style="font-family: LexendRegular; font-size: 13px"
                    >
                      <span class="font3">GST Number </span>
                      <v-text-field
                        hide-details="auto"
                        dense
                        outlined
                        v-model="gstNo"
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex
                      xs12
                      pt-4
                      style="font-family: LexendRegular; font-size: 13px"
                    >
                      <span class="font3">Locality </span>
                      <v-text-field
                        dense
                        outlined
                        :rules="Rules"
                        v-model="locality"
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex
                      xs12
                      style="font-family: LexendRegular; font-size: 13px"
                    >
                      <span class="font3">District </span>
                      <v-text-field
                        dense
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
                      <span class="font3">State </span>
                      <v-text-field
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
                      <span class="font3">Country </span>
                      <v-text-field
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
                      <span class="font3">Location link</span>
                      <v-text-field dense outlined v-model="locationLink">
                      </v-text-field>
                    </v-flex>
                    <v-flex
                      xs12
                      style="font-family: LexendRegular; font-size: 13px"
                    >
                      <span class="font3">Pin code </span>
                      <v-text-field
                        dense
                        outlined
                        hide-details="auto"
                        :rules="pinRules"
                        v-model="pincode"
                        type="number"
                        hide-spin-buttons
                      >
                      </v-text-field>
                    </v-flex>
                    <!-- <v-flex
                    xs12
                    style="font-family: LexendRegular; font-size: 13px"
                  >
                    <span class="font3">Location </span>
                    <v-flex lg12>
                      <v-card class="mx-auto" outlined>
                        <v-layout wrap pa-3>
                          <v-flex xs12 md12 lg12 :key="lon">
                            <Gmap-map
                              :center="currentLocation"
                              :zoom="12"
                              style="width: 100%; height: 200px"
                            >
                              <gmap-marker :position="currentLocation" />

                              <gmap-marker
                                :key="index"
                                v-for="(marker, index) in markers"
                                :position="marker.position"
                              ></gmap-marker>
                            </Gmap-map>
                          </v-flex>
                        </v-layout>
                      </v-card>
                    </v-flex>
                  </v-flex> -->
                    <v-flex
                      xs12
                      style="font-family: LexendRegular; font-size: 13px"
                      pt-6
                    >
                      <span class="font3">ID Proof </span
                      ><span style="color: #f17343">*</span
                      ><span
                        style="
                          font-family: LexendFont;
                          font-size: 14px;
                          font-weight: 300;
                          color: grey;
                        "
                        >ID proof *front & back side in single file</span
                      >
                      <v-file-input
                        hide-details="auto"
                        ref="fileInput"
                        label="File input"
                        outlined
                        dense
                        class="pt-1"
                        v-model="voteridProof"
                        @change="getFiles"
                      >
                        <template v-slot:append>
                          <!-- <v-btn text color="#F17343"> -->
                          <!-- <v-btn
                            @click="openFileInput"
                            dense
                            class="hidden-xs-only mb-2"
                            small
                            style="
                              background: linear-gradient(
                                to bottom,
                                rgba(255, 133, 86, 1),
                                rgba(247, 75, 9, 1),
                                rgba(255, 70, 0, 1)
                              );
                              color: white;
                            "
                            > -->
                          <v-btn
                            @click="openFileInput"
                            dense
                            class="hidden-xs-only mb-2"
                            small
                            color="#F17343"
                          >
                            <span style="color: white">Choose File</span></v-btn
                          >
                          <!-- </v-btn> -->
                        </template>
                      </v-file-input>
                      <v-chip
                        class="my-2"
                        v-if="isQR == true"
                        :href="mediaUURL + voteridProof"
                        target="_blank"
                        >{{ voteridProof }}</v-chip
                      >
                    </v-flex>
                    <v-flex
                      xs12
                      pt-4
                      style="font-family: LexendRegular; font-size: 13px"
                    >
                      <span class="font3">Company Registration</span
                      ><span style="color: #f17343">*</span
                      ><span
                        style="
                          font-family: LexendFont;
                          font-size: 14px;
                          font-weight: 300;
                          color: grey;
                        "
                      >
                        front & back side in single file</span
                      >
                      <v-file-input
                        hide-details="auto"
                        ref="fileInput2"
                        label="File input"
                        outlined
                        dense
                        class="pt-1"
                        v-model="licenseProof"
                        @change="getFiles2"
                      >
                        <template v-slot:append>
                          <!-- <v-btn text color="#F17343"> -->
                          <!-- <v-btn
                            @click="openFileInput2"
                            dense
                            class="hidden-xs-only mb-2"
                            small
                            style="
                              background: linear-gradient(
                                to bottom,
                                rgba(255, 133, 86, 1),
                                rgba(247, 75, 9, 1),
                                rgba(255, 70, 0, 1)
                              );
                              color: white;
                            "
                            > -->
                          <v-btn
                            @click="openFileInput2"
                            dense
                            class="hidden-xs-only mb-2"
                            small
                            color="#F17343"
                          >
                            <span style="color: white">Choose File</span></v-btn
                          >
                          <!-- </v-btn> -->
                        </template>
                      </v-file-input>
                      <v-chip
                        class="my-2"
                        v-if="isPass == true"
                        :href="mediaUURL + licenseProof"
                        target="_blank"
                        >{{ licenseProof }}</v-chip
                      >
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card>
            <v-layout wrap justify-end pt-10>
              <!-- <v-flex xs12 sm6 md3 class="text-left"> -->
              <!-- to="/StepOne" -->
              <!-- @click="confirmDialog=true" -->
              <!-- <v-btn
                  block
                  rounded
                  color="white"
                  to="/StepOne"
                  class="mb-2 mb-sm-0 mx-1 mx-sm-0"
                  ><span style="font-family: LexendRegular; text-transform: none"
                    >Previous</span
                  ></v-btn
                >
              </v-flex> -->
              <v-flex xs12 sm6 md3 text-right>
                <!-- :disabled="!reg" -->
                <v-btn
                  block
                  :disabled="!reg"
                  rounded
                  @click="validation()"
                  color="#f17343"
                  style="cursor: pointer"
                  ><span
                    style="
                      font-family: LexendFont;
                      text-transform: none;
                      color: white;
                    "
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
    <v-dialog width="450px" v-model="confirmDialog">
      <v-card width="450px" class="pa-2" style="border-radius: 10px">
        <v-card-text class="pa-4">
          <v-layout wrap justify-center>
            <v-flex xs11 py-6 text-center>
              <span
                style="
                  font-family: LexendFont;
                  font-weight: 600;
                  font-size: 20px;
                  color: black;
                "
                >Are you sure you want <br />to leave?</span
              >
            </v-flex>
            <v-flex xs5 ml-4 py-4 text-center>
              <v-img src="./../../assets/images/img1.png" contain></v-img>
            </v-flex>
            <v-flex xs11 text-center pb-6>
              <span
                style="
                  font-family: RobotoLight;
                  font-weight: 400;
                  font-size: 18px;
                  color: black;
                "
              >
                Profile verification will commence only <br />after you have
                completed all the<br />
                required details.</span
              >
            </v-flex>
            <v-flex xs11 sm5 text-left pb-6>
              <v-btn color="#f17343" outlined @click="handleCancel">
                <span
                  style="
                    font-family: LexendFont;
                    font-weight: 400;
                    font-size: 18px;
                    color: #f17343;
                  "
                  >Leave</span
                >
              </v-btn>
            </v-flex>
            <v-flex xs11 sm5 text-right pb-6>
              <v-btn color="#f17343" dark @click="handleConfirm">
                <span
                  style="
                    font-family: LexendFont;
                    font-weight: 400;
                    font-size: 18px;
                    color: white;
                  "
                  >Continue</span
                >
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogVisible" max-width="400">
      <v-card>
        <v-card-title class="headline">
          Are you sure you want to leave?
        </v-card-title>
        <v-card-actions>
          <v-btn @click="handleConfirm">Yes</v-btn>
          <v-btn @click="handleCancel">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
    <script>
import axios from "axios";
import store from "../../store";
export default {
  // beforeRouteLeave(to, from, next) {
  //   if (from.name === "stepTwo" && to.name === "stepOne") {
  //     this.confirmDialog = true;
  //     this.navigationCallback = next;
  //   } else {
  //     next();
  //   }
  // },
  data() {
    return {
      appLoading: false,
      ServerError: false,
      showSnackBar: false,
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
      flag1: false,
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
      locationLink: "",
      voteridProof: "",
      confirmDialog: false,
      attachments: null,
      attachments2: null,
      attachmentsformData: new FormData(),
      attachmentsformData2: new FormData(),
      dialogVisible: false,
      licenseProof: "",
      Rules: [(v) => !!v || "Required"],
      isQR: false,
      isPass: false,
      pinRules: [
        (v) => !!v || "PIN is required",
        (v) => (v && v.length === 6) || "PIN must be 6 digits",
        // (v) => /^\d{4}$/.test(v) || "PIN must be a number",
      ],
    };
  },
  computed: {
    appUser() {
      return this.$store.state.userData;
    },
    voteridProof1() {
      return this.$store.state.voteridProof;
    },
    licenseProof1() {
      return this.$store.state.licenseProof;
    },
  },
  created() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.handlePosition);
    }
    this.markers = [
      { position: { lat: 0, lng: 0 } },
      { position: { lat: 0, lng: 0 } },
    ];
  },
  beforeMount() {
    if (this.appUser) {
      this.pincode = this.appUser.pincode;
      this.locality = this.appUser.locality;
      this.locationLink = this.appUser.link;
      this.companyName = this.appUser.companyName;
      this.gstNo = this.appUser.gstNo;
      this.buildingNo = this.appUser.buildingNo;
      this.district = this.appUser.district;
      this.state = this.appUser.state;
      this.country = this.appUser.country;
      this.isGst = this.appUser.isGst;
      this.iscompany = this.appUser.iscompany;
      this.voteridProof = this.voteridProof1;
      if (this.voteridProof1) {
        this.isQR = true;
      }
      console.log("voteridProof1=", this.voteridProof1);
      this.licenseProof = this.licenseProof1;
      if (this.licenseProof1) {
        console.log(this.isPass, "==qq");
        this.isPass = true;
        console.log(this.isPass, "==pp");
      }
      if (this.appUser.level) {
        console.log("appUser.level=", this.appUser.level);
        this.flag1 = true;
        console.log("flag=", this.flag1);
      }
    }
  },
  methods: {
    openFileInput() {
      // Trigger a click event on the file input element
      this.$refs.fileInput.$el.querySelector("input").click();
      this.isQR = false;
    },
    openFileInput2() {
      // Trigger a click event on the file input element
      this.$refs.fileInput2.$el.querySelector("input").click();
      this.isPass = false;
    },
    handleConfirm() {
      this.confirmDialog = false;
      location.reload();
      // this.$router.push('/stepOne');
    },
    handleCancel() {
      this.confirmDialog = false;
      // Prevent redirection
    },
    //
    handlePosition(position) {
      // Extract latitude and longitude from the position object
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      // Update the currentLocation data property
      this.currentLocation = { lat, lng };

      // Add the current location to the markers array
      this.markers.push({ position: { lat, lng } });
    },
    getFiles() {
      var selectedFiles = this.voteridProof;
      console.log("img=", this.voteridProof);
      if (this.voteridProof) {
        this.msg = null;
        this.attachments = selectedFiles;
        console.log("attachments=", this.attachments);
        this.isQR = false;
      }
    },
    getFiles2() {
      // this.categoryImg = this.Image
      var selectedFiles2 = this.licenseProof;
      console.log("img=", this.licenseProof);
      if (this.licenseProof) {
        this.msg = null;
        this.attachments2 = selectedFiles2;
        console.log("attachments2=", this.attachments2);
        this.isPass = false;
      }
    },
    validation() {
      if (!this.companyName) {
        this.msg = "Please enter company name";
        this.showSnackBar = true;
        return;
      } else if (!this.isGst) {
        this.msg = "Please choose GST status";
        this.showSnackBar = true;
        return;
      } else if (!this.gstNo && this.isGst == "Yes") {
        this.msg = "Please enter gstNo";
        this.showSnackBar = true;
        return;
      } else if (!this.locality) {
        this.msg = "Please enter locality";
        this.showSnackBar = true;
        return;
      } else if (!this.district) {
        this.msg = "Please enter district";
        this.showSnackBar = true;
        return;
      } else if (!this.state) {
        this.msg = "Please enter state";
        this.showSnackBar = true;
        return;
      } else if (!this.country) {
        this.msg = "Please enter country";
        this.showSnackBar = true;
        return;
      } else if (!this.pincode) {
        this.msg = "Please enter pincode";
        this.showSnackBar = true;
        return;
      } else if (!this.voteridProof) {
        this.msg = "Please upload voter Id proof";
        this.showSnackBar = true;
        return;
      } else if (!this.licenseProof) {
        this.msg = "Please upload company registration";
        this.showSnackBar = true;
        return;
      } else {
        this.setpTwo();
      }
    },
    setpTwo() {
      this.appLoading = true;
      // if (this.$refs.form.validate()) {
      axios({
        method: "POST",
        url: "/vendor/registration/level2",
        data: {
          isGst: this.isGst,
          iscompany: this.iscompany,
          companyName: this.companyName,
          gstNo: this.gstNo,
          buildingNo: this.buildingNo,
          locality: this.locality,
          link: this.locationLink,
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
        if (response.data.status == true) {
          this.appLoading = false;
          this.msg = "Successfully Registered";
          this.showSnackBar = true;
          store.commit("userData", response.data.data);
          store.commit("level", response.data.data.level);

          if (this.voteridProof) {
            this.uploadattachments();
          }
          // this.level=response.data.data.level
          //   if(this.level==0)
          //   {
          //       this.$router.push("/StepOne");

          //   }
          //   else if(this.level==1)
          //   {
          //       this.$router.push("/StepTwo");

          //   }
          //   else if(this.level==2)
          //   {
          //       this.$router.push("/StepThree");

          //   }
          //   else if(this.level==3)
          //   {
          //       this.$router.push("/StepFour");

          //   }
          //   else{
          //     this.$router.push("/");
          //   }
        } else {
          this.msg = response.data.msg;
          this.showSnackBar = true;
        }
      });
      // }
    },
    uploadattachments() {
      this.appLoading = true;
      this.attachmentsformData.append("voteridProof", this.attachments);
      this.attachmentsformData.append("licenseProof", this.attachments2);
      console.log("voteridProof=", this.attachments);
      axios({
        method: "POST",
        url: "/vendor/proofupload/level2",
        data: this.attachmentsformData,

        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status == true) {
            this.msg = response.data.msg;
            this.showSnackBar = true;
            this.attachmentsformData = {};
            store.commit("voteridProof", response.data.voterid);
            store.commit("licenseProof", response.data.license);
            this.level = response.data.data.level;
            // if(this.level==0)
            // {
            //     this.$router.push("/StepOne");

            // }
            // else if(this.level==1)
            // {
            //     this.$router.push("/StepTwo");

            // }
            // else if(this.level==2)
            // {
            //     this.$router.push("/StepThree");

            // }
            // else if(this.level==3)
            // {
            //     this.$router.push("/StepFour");

            // }
            // else{
            //   this.$router.push("/");
            // }
            this.$router.push("/StepThree");
            // this.uploadattachments2();
          } else {
            this.attachmentsformData = new FormData();
            this.msg = response.data.msg;
            this.showSnackBar = true;
          }
        })
        .catch((err) => {
          this.appLoading = false;
          this.ServerError = true;
          console.log(err);
        });
    },
    uploadattachments2() {
      this.appLoading = true;
      this.attachmentsformData2.append("licenseProof", this.attachments2);
      console.log("licenseProof=", this.attachments2);
      axios({
        method: "POST",
        url: "/licenseproof/UploadImageMultiple",
        data: this.attachmentsformData2,

        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status == true) {
            this.msg = response.data.msg;
            this.showSnackBar = true;
            this.level = response.data.data.level;
            if (this.level == 0) {
              this.$router.push("/StepOne");
            } else if (this.level == 1) {
              this.$router.push("/StepTwo");
            } else if (this.level == 2) {
              this.$router.push("/StepThree");
            } else if (this.level == 3) {
              this.$router.push("/StepFour");
            } else {
              this.$router.push("/");
            }
          } else {
            this.attachmentsformData2 = new FormData();
            this.msg = response.data.msg;
            this.showSnackBar = true;
          }
        })
        .catch((err) => {
          this.appLoading = false;
          this.ServerError = true;
          console.log(err);
        });
    },
  },
};
</script>
    
    <style>
.bg {
  background: url("./../../assets/images/background.png") no-repeat center
    center;
}
.changeStyle {
  position: relative;
  margin-top: -15%;
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