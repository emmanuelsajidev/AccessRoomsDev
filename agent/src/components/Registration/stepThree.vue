<template>
  <div>
    <PageLoader v-bind:storage="appLoading" />
    <ServerError v-if="ServerError" />

    <v-snackbar v-model="snackbar" color="#ff6200" right top :timeout="3000">
      <v-layout wrap>
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
        <v-row justify="center" class="pt-10">
          <v-col
            cols="12"
            sm="6"
            md="5"
            lg="4"
            class="text-center pt-xs-0 pt-sm-10 pt-lg-15 pt-md-10 pt-xl-15"
          >
            <v-row justify="center">
              <v-col cols="12" class="pa-0">
                <span style="font-family: LexendRegular"
                  >Agent Registration Process</span
                >
              </v-col>
              <v-col cols="12">
                <span style="font-family: LexendRegular; font-size: 14px"
                  >Complete all required fields with accurate information to
                  ensure a smooth and personalized experience</span
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-img>
    </div>
    <div>
      <!-- <v-img src="./../../assets/images/reg1Back.png"> -->
      <v-row justify="center" class="pb-10 bg pt-4">
        <v-col cols="11" sm="8" md="5" class="changeStyle">
          <v-card rounded="xl">
            <v-row justify="center" class="px-10 py-10">
              <v-col cols="11" sm="10">
                <v-row justify="center">
                  <v-col cols="12" class="pb-8">
                    <v-img
                      contain
                      src="./../../assets/images/reg3Bar.png"
                    ></v-img>
                  </v-col>
                  <v-col cols="12" class="pa-0">
                    <v-divider></v-divider>
                  </v-col>
                  <v-col cols="12" class="pa-0 pb-2 pt-5">
                    <span
                      style="
                        font-family: LexendRegular;
                        font-size: 22px;
                        color: red;
                      "
                      >Note : Only 1 document is needed to upload
                    </span>
                  </v-col>
                  <v-col cols="12" class="pa-0 pb-2 pt-5">
                    <span style="font-family: LexendRegular"
                      >Document Upload
                    </span>
                  </v-col>
                  <v-col cols="12" class="pa-0">
                    <span
                      style="
                        font-family: LexendRegular;
                        font-size: 14px;
                        color: #656565;
                      "
                      >Please upload the given files to verify your identity
                    </span>
                  </v-col>
                  <v-col cols="12" class="pa-0 pt-8 text-center">
                    <span style="font-family: LexendRegular; font-size: 16px">
                      <span style="color: #f17343">1.</span> ID proof
                    </span>
                  </v-col>
                  <v-col cols="12" class="pa-0 pb-2 text-center">
                    <span style="font-family: LexendRegular; font-size: 13px">
                      (<span style="color: #f17343">*</span> Driver's
                      license/Voters ID/Aadhar)
                    </span>
                  </v-col>
                  <v-col cols="12" class="pa-0 pt-8 text-center">
                    <v-card outlined>
                      <v-row justify="center" class="py-5 px-8">
                        <v-col cols="12" md="12" class="py-10 px-5">
                          <v-row
                            justify="center"
                            class=""
                            style="
                              border-style: dashed;
                              color: #f17343;
                              background-color: #fff9f9;
                              cursor: pointer;
                            "
                            @click="$refs.uploadFront.click()"
                          >
                            <v-col cols="12" class="text-center pa-0 pt-5">
                              <v-icon color="#F17343"
                                >mdi-file-upload-outline</v-icon
                              >
                            </v-col>
                            <v-col cols="12" class="text-center pa-0 px-2 pb-5">
                              <span
                                style="
                                  font-family: LexendRegular;
                                  color: #928986;
                                  font-size: 12px;
                                "
                                >+ Click to upload Front-side of the
                                Document</span
                              >
                              <input
                                v-show="false"
                                id="file"
                                ref="uploadFront"
                                multiple
                                type="file"
                                @change="uploadFront"
                              />
                            </v-col>
                          </v-row>
                          <v-row justify="center" v-if="imageFileFront">
                            <v-col cols="12">
                              <v-chip
                                class="ma-2"
                                
                                color="#DF8D6D"
                                outlined
                                @click:close="chip = false"
                              >
                                <span
                                  style="
                                    color: #929292;
                                    font-size: 12px;
                                    font-family: LexendRegular;
                                  "
                                  >{{ imageFileFront.name }}</span
                                >
                              </v-chip>
                            </v-col>
                          </v-row>
                          <v-row
                            justify="center"
                            v-if="!imageFileFront && appUser.agentId"
                          >
                            <v-col
                              cols="12"
                              v-if="appUser.agentId.agentIdProofFront"
                            >
                              <v-chip
                                class="ma-2"
                                color="#DF8D6D"
                                outlined
                                @click:close="chip = false"
                              >
                                <span
                                  style="
                                    color: #929292;
                                    font-size: 12px;
                                    font-family: LexendRegular;
                                  "
                                  >{{ appUser.agentId.agentIdProofFront }}</span
                                >
                              </v-chip>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="12" md="12" class="py-10 px-5">
                          <v-row
                            justify="center"
                            class=""
                            style="
                              border-style: dashed;
                              color: #f17343;
                              background-color: #fff9f9;
                              cursor: pointer;
                            "
                            @click="$refs.uploadBack.click()"
                          >
                            <v-col cols="12" class="text-center pa-0 pt-5">
                              <v-icon color="#F17343"
                                >mdi-file-upload-outline</v-icon
                              >
                            </v-col>
                            <v-col cols="12" class="text-center pa-0 px-2 pb-5">
                              <span
                                style="
                                  font-family: LexendRegular;
                                  color: #928986;
                                  font-size: 12px;
                                "
                                >+ Click to upload Back-side of the
                                Document</span
                              >
                              <input
                                v-show="false"
                                id="file"
                                ref="uploadBack"
                                multiple
                                type="file"
                                @change="uploadBack"
                              />
                            </v-col>
                          </v-row>
                          <v-row justify="center" v-if="imageFileBack">
                            <v-col cols="12">
                              <v-chip
                                class="ma-2"
                                
                                color="#DF8D6D"
                                outlined
                                @click:close="chip = false"
                              >
                                <span
                                  style="
                                    color: #929292;
                                    font-size: 12px;
                                    font-family: LexendRegular;
                                  "
                                  >{{ imageFileBack.name }}</span
                                >
                              </v-chip>
                            </v-col>
                          </v-row>
                          <v-row
                            justify="center"
                            v-if="!imageFileBack && appUser.agentId"
                          >
                            <v-col
                              cols="12"
                              v-if="appUser.agentId.agentIdProofBack"
                            >
                              <v-chip
                                class="ma-2"
                                color="#DF8D6D"
                                outlined
                                @click:close="chip = false"
                              >
                                <span
                                  style="
                                    color: #929292;
                                    font-size: 12px;
                                    font-family: LexendRegular;
                                  "
                                  >{{ appUser.agentId.agentIdProofBack }}</span
                                >
                              </v-chip>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                  <v-col cols="12" class="pa-0 pt-8 text-center">
                    <span style="font-family: LexendRegular; font-size: 16px">
                      <span style="color: #f17343">2.</span> Document details
                    </span>
                  </v-col>
                  <v-col cols="12" class="pa-0 pb-2 text-center">
                    <span style="font-family: LexendRegular; font-size: 13px">
                      (<span style="color: #f17343">*</span> GST
                      details/License/Govt.ID)
                    </span>
                  </v-col>
                  <v-col cols="12" class="pa-0 pt-8 text-center">
                    <v-card outlined>
                      <v-row justify="center" class="py-5 px-8">
                        <v-col cols="12" md="12" class="py-10 px-5">
                          <v-row
                            justify="center"
                            class=""
                            style="
                              border-style: dashed;
                              color: #f17343;
                              background-color: #fff9f9;
                              cursor: pointer;
                            "
                            @click="$refs.upload.click()"
                          >
                            <v-col cols="12" class="text-center pa-0 pt-5">
                              <v-icon color="#F17343"
                                >mdi-file-upload-outline</v-icon
                              >
                            </v-col>
                            <v-col cols="12" class="text-center pa-0 px-2 pb-5">
                              <span
                                style="
                                  font-family: LexendRegular;
                                  color: #928986;
                                  font-size: 12px;
                                "
                                >+ Click to upload</span
                              >
                              <input
                                v-show="false"
                                id="file"
                                ref="upload"
                                multiple
                                type="file"
                                @change="upload"
                              />
                            </v-col>
                          </v-row>
                          <v-row justify="center" v-if="imageFile">
                            <v-col cols="12">
                              <v-chip
                                class="ma-2"
                                
                                color="#DF8D6D"
                                outlined
                                @click:close="chip = false"
                              >
                                <span
                                  style="
                                    color: #929292;
                                    font-size: 12px;
                                    font-family: LexendRegular;
                                  "
                                  >{{ imageFile.name }}</span
                                >
                              </v-chip>
                            </v-col>
                          </v-row>
                          <v-row
                            justify="center"
                            v-if="!imageFile && appUser.agentId"
                          >
                            <v-col
                              cols="12"
                              v-if="appUser.agentId.agentGSTProof"
                            >
                              <v-chip
                                class="ma-2"
                                color="#DF8D6D"
                                outlined
                                @click:close="chip = false"
                              >
                                <span
                                  style="
                                    color: #929292;
                                    font-size: 12px;
                                    font-family: LexendRegular;
                                  "
                                  >{{ appUser.agentId.agentGSTProof }}</span
                                >
                              </v-chip>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
          <v-row justify="space-between" class="pt-10">
            <v-col cols="12" sm="6" md="3" class="text-left">
              <v-btn block rounded color="white" to="/StepTwo"
                ><span style="font-family: LexendRegular; text-transform: none"
                  >Previous</span
                ></v-btn
              >
            </v-col>
            <v-col cols="12" sm="6" md="3" class="text-right">
              <v-btn
                block
                rounded
                color="#F17343"
                @click="validate()"
                style="
                  background: linear-gradient(to bottom, orange);
                  color: white;
                "
                ><span style="font-family: LexendRegular; text-transform: none"
                  >Next</span
                ></v-btn
              >
            </v-col>
          </v-row>
        </v-col>
      </v-row>
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
      favorites: [],
      states: ["Travel Agent", "Tours & Travels", "Tour Guide"],
      value: "",
      phone: "",
      imageFileFront: "",
      imageFileBack: "",
      imageFile: "",
      docsFront: "",
      docsBack: "",
      docs: "",
      docs1: "",
      file: "",
      formData: new FormData(),
    };
  },
  computed: {
    appUser() {
      return this.$store.state.userData;
    },
  },
  beforeMount() {
    // this.imageFileFront=this.appUser.agentIdProofFront
  },
  methods: {
    validate() {
      if (
        !this.imageFileFront &&
        !this.appUser.agentId.agentIdProofFront &&
        !this.imageFileBack &&
        !this.appUser.agentId.agentIdProofBack &&
        !this.imageFile &&
        !this.appUser.agentId.agentGSTProof
      ) {
        this.msg = "Please Upload at least one document";
        this.snackbar = true;
      } else {
        this.setpThree();
      }
    },

    uploadFront(event) {
      this.docsFront = event.target.files[0];
      if (this.docsFront) {
        this.imageFileFront = this.docsFront;
      }
    },
    uploadBack(event) {
      this.docsBack = event.target.files[0];
      if (this.docsBack) {
        this.imageFileBack = this.docsBack;
      }
    },
    upload(event) {
      console.log(this.imageFile);
      this.docs = event.target.files[0];
      if (this.docs) {
        this.imageFile = this.docs;
      }
    },
    setpThree() {
      // if (this.$refs.form.validate()) {
      this.formData.append("agentIdProofFront", this.imageFileFront);
      this.formData.append("agentIdProofBack", this.imageFileBack);
      this.formData.append("agentGSTProof", this.imageFile);
      // if(this.imageFileFront){
      //   this.formData.append("agentIdProofFront", this.imageFileFront);
      //   }
      //   if(this.imageFileBack){
      //   this.formData.append("agentIdProofBack", this.imageFileBack);
      //   }
      //   if(this.imageFile){
      //   this.formData.append("agentGSTProof", this.imageFile);
      //   }
      if (
        this.imageFileFront == "" &&
        this.imageFileBack == "" &&
        this.imageFile == ""
      ) {
        this.$router.push("/StepFour");
      }
      // if(!this.imageFileFront && this.appUser.agentId.agentIdProofFront)
      // {
      //   this.formData.append("agentIdProofFront", this.appUser.agentId.agentIdProofFront);
      // }
      // if(!this.imageFileBack && this.appUser.agentId.agentIdProofBack)
      // {
      //   this.formData.append("agentIdProofBack", this.appUser.agentId.agentIdProofBack);
      // }
      // if(!this.imageFile && this.appUser.agentId.agentGSTProof)
      // {
      //   this.formData.append("agentGSTProof", this.appUser.agentId.agentGSTProof);
      // }
      axios({
        method: "POST",
        url: "/agent/registration/level3",
        data: this.formData,
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
          this.$router.push("/StepFour");
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