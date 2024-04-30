<template>
  <div>
    <PageLoader v-bind:storage="appLoading" />
    <ServerError v-if="ServerError" />
    <v-snackbar v-model="showSnackBar" color="#ff6200" right :timeout="3000">
      <v-layout wrap>
        <v-flex text-left class="align-self-center">{{ msg }}</v-flex>
        <v-flex text-right>
          <v-btn small :ripple="false" text @click="showSnackBar = false">
            <v-icon style="color: white">mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-snackbar>
    <div>
      <v-img
        src="./../../assets/images/layout6.png"
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
      <!-- <v-img src="./../../assets/images/reg1Back.png"> -->
      <v-layout wrap justify-center pb-10 class="bg">
        <v-flex xs11 sm8 md5 class="changeStyle">
          <v-form v-model="reg" ref="profileForm" lazy-validation>
            <v-card rounded="xl">
              <v-layout wrap justify-center px-4 px-md-10 py-10>
                <v-flex xs12 sm10>
                  <v-layout wrap justify-center>
                    <v-flex xs12 pb-8>
                      <v-img
                        contain
                        src="./../../assets/images/reg3Bar.png"
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
                        >Bank details</span
                      >
                    </v-flex>
                    <v-flex
                      xs12
                      pt-3
                      style="font-family: LexendRegular; font-size: 13px"
                    >
                      <span class="font3">Bank name</span>
                      <v-text-field
                        dense
                        hide-details="auto"
                        outlined
                        :rules="Rules"
                        v-model="bankName"
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex
                      xs12
                      pt-3
                      style="font-family: LexendRegular; font-size: 13px"
                    >
                      <span class="font3">Account holder name </span>
                      <v-text-field
                        dense
                        outlined
                        v-model="accHolderName"
                        hide-details="auto"
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex
                      xs12
                      pt-3
                      style="font-family: LexendRegular; font-size: 13px"
                    >
                      <span class="font3">Account Number </span>
                      <v-text-field
                        dense
                        outlined
                        v-model="accNumber"
                        type="number"
                        hide-details="auto"
                        hide-spin-buttons
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex
                      xs12
                      pt-3
                      style="font-family: LexendRegular; font-size: 13px"
                    >
                      <span class="font3">Account type </span>
                      <!-- <v-text-field
                      dense
                      outlined
                      :rules="Rules"
                      v-model="accType"
                    >
                    </v-text-field> -->
                      <v-select
                        v-model="accType"
                        :items="['Credit', 'Current', 'Savings']"
                        :menu-props="{ maxHeight: '400' }"
                        outlined
                        persistent-hint
                        hide-details="auto"
                        dense
                      ></v-select>
                    </v-flex>
                    <v-flex
                      xs12
                      pt-3
                      style="font-family: LexendRegular; font-size: 13px"
                    >
                      <span class="font3">IFSC code </span>
                      <v-text-field
                        dense
                        outlined
                        hide-details="auto"
                        :rules="Rules"
                        v-model="IFSC"
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex
                      xs12
                      pt-3
                      style="font-family: LexendRegular; font-size: 13px"
                    >
                      <span class="font3">Branch </span>
                      <v-text-field
                        dense
                        outlined
                        :rules="Rules"
                        v-model="branch"
                        hide-details="auto"
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex
                      xs12
                      pt-3
                      style="font-family: LexendRegular; font-size: 13px"
                    >
                      <span class="font3">UPI Id </span>
                      <v-text-field
                        hide-details="auto"
                        dense
                        outlined
                        :rules="Rules"
                        v-model="UPIid"
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex
                      xs12
                      style="font-family: LexendRegular; font-size: 13px"
                      pt-4
                    >
                      <span class="font3">QR code</span
                      ><span style="color: #f17343">*</span
                      ><span
                        style="
                          font-family: LexendFont;
                          font-size: 14px;
                          font-weight: 300;
                          color: grey;
                        "
                        >payment QR</span
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
                            small
                            class="hidden-xs-only mb-2"
                            style="
                              background: linear-gradient(
                                to bottom,
                                rgba(255, 133, 86, 1),
                                rgba(247, 75, 9, 1),
                                rgba(255, 70, 0, 1)
                              );
                              color: white;
                            "> -->
                          <v-btn
                            @click="openFileInput"
                            dense
                            small
                            class="hidden-xs-only mb-2"
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
                      <span class="font3">Bank passbook</span
                      ><span style="color: #f17343">*</span
                      ><span
                        style="
                          font-family: LexendFont;
                          font-size: 14px;
                          font-weight: 300;
                          color: grey;
                        "
                      >
                        front side in single file</span
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
                            small
                            class="hidden-xs-only mb-2"
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
                            small
                            class="hidden-xs-only mb-2"
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
            <v-layout wrap justify-space-between pt-10>
              <v-flex
                xs12
                sm6
                md3
                class="text-left"
                pb-2
                pb-sm-0
                pr-0
                pr-sm-1
                pr-md-0
              >
                <v-btn block="" rounded="xl" color="white" to="/StepTwo"
                  ><span
                    style="font-family: LexendRegular; text-transform: none"
                    >Previous</span
                  ></v-btn
                >
              </v-flex>
              <v-flex xs12 sm6 md3 text-right pl-0 pl-sm-1 pl-md-0>
                <v-btn
                  block
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
  </div>
</template>
    <script>
import axios from "axios";
import store from "../../store";
export default {
  // beforeRouteLeave(to, from, next) {
  //   if (from.name === "stepThree" && to.name === "stepTwo") {
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
      bankName: "",
      accHolderName: "",
      accNumber: "",
      accType: "",
      IFSC: "",
      branch: "",
      UPIid: "",
      voteridProof: "",
      flag1: false,
      attachments: null,
      attachments2: null,
      attachmentsformData: new FormData(),
      attachmentsformData2: new FormData(),
      isQR: false,
      isPass: false,
      licenseProof: "",
      Rules: [(v) => !!v || "Required"],
    };
  },
  computed: {
    appUser() {
      return this.$store.state.userData;
    },
    passbook1() {
      return this.$store.state.passbook;
    },
    qrCode1() {
      return this.$store.state.qrCode;
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

    if (this.appUser) {
      if (this.appUser.vendorId.bankDetails) {
        this.bankName = this.appUser.vendorId.bankDetails.bankName;
        this.accHolderName = this.appUser.vendorId.bankDetails.accHolderName;
        this.accNumber = this.appUser.vendorId.bankDetails.accNo;
        this.accType = this.appUser.vendorId.bankDetails.accType;
        this.IFSC = this.appUser.vendorId.bankDetails.ifscCode;
        this.branch = this.appUser.vendorId.bankDetails.branchName;
        this.UPIid = this.appUser.vendorId.bankDetails.upiId;
        this.voteridProof = this.qrCode1;
        if (this.qrCode1) {
          this.isQR = true;
        }
        this.licenseProof = this.passbook1;
        if (this.passbook1) {
          this.isPass = true;
        }
      }
      if (this.appUser.level) {
        console.log("appUser.level=", this.appUser.level);
        this.flag1 = true;
        console.log("flag=", this.flag1);
        // this.getData();
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
    },
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
      if (!this.bankName) {
        this.msg = "Please enter bank name";
        this.showSnackBar = true;
        return;
      } else if (!this.accHolderName) {
        this.msg = "Please enter account holder name";
        this.showSnackBar = true;
        return;
      } else if (!this.accNumber) {
        this.msg = "Please enter account number";
        this.showSnackBar = true;
        return;
      } else if (!this.accType) {
        this.msg = "Please enter account type";
        this.showSnackBar = true;
        return;
      } else if (!this.IFSC) {
        this.msg = "Please enter IFSC code";
        this.showSnackBar = true;
        return;
      } else if (!this.branch) {
        this.msg = "Please enter branch";
        this.showSnackBar = true;
        return;
      } else if (!this.UPIid) {
        this.msg = "Please enter UPI Id";
        this.showSnackBar = true;
        return;
      } else if (!this.voteridProof) {
        this.msg = "Please Please upload QR";
        this.showSnackBar = true;
        return;
      } else if (!this.licenseProof) {
        this.msg = "Please upload passbook";
        this.showSnackBar = true;
        return;
      } else {
        this.setpThree();
      }
    },
    setpThree() {
      this.appLoading = true;
      var bankDetails = {};
      (bankDetails.bankName = this.bankName),
        (bankDetails.accHolderName = this.accHolderName),
        (bankDetails.accNo = this.accNumber),
        (bankDetails.accType = this.accType),
        (bankDetails.ifscCode = this.IFSC),
        (bankDetails.branchName = this.branch),
        (bankDetails.upiId = this.UPIid),
        axios({
          method: "POST",
          url: "/vendor/registration/level3",
          data: {
            bankDetails: bankDetails,
          },
          headers: {
            token: localStorage.getItem("token"),
          },
        }).then((response) => {
          this.appLoading = false;
          if (response.data.status == true) {
            this.msg = "Successfully Registered";
            this.showSnackBar = true;
            store.commit("userData", response.data.data);
            store.commit("level", response.data.data.level);
            store.commit("passbook", response.data.passbook);
            store.commit("qrCode", response.data.qrCode);
            if (this.voteridProof && this.licenseProof) {
              this.uploadattachments();
            }
          } else {
            this.msg = response.data.msg;
            this.showSnackBar = true;
          }
        });
      // }
    },
    uploadattachments() {
      this.appLoading = true;
      this.attachmentsformData.append("qrCode", this.attachments);
      this.attachmentsformData.append("passBook", this.attachments2);
      axios({
        method: "POST",
        url: "/vendor/proofupload/level3",
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
            this.$router.push("/StepFour");
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
      this.attachmentsformData2.append("passBook", this.attachments2);
      console.log("licenseProof=", this.attachments2);
      // this.attachmentsformData.append("image2", this.attachments2);
      //  console.log("img2=",this.attachments2)
      axios({
        method: "POST",
        url: "/passbook/UploadImageSingle",
        data: this.attachmentsformData2,

        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status == true) {
            // this.attachmentsformData2 = new FormData();
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