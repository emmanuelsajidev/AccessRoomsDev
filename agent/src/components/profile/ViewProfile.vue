<template>
  <div>
    <v-snackbar v-model="showSnackBar" color="black">
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
    <vue-element-loading
      :active="appLoading"
      :is-full-screen="true"
      background-color="#FFFFFF"
      color="#FF681F"
      spinner="spinner"
    />
    <v-layout
      style="text-transform: none"
      wrap
      pb-9
      justify-space-around
      class="LexendRegular"
    >
      <v-flex xs11>
        <v-layout wrap pr-1 pt-7 justify-center>
          <v-flex x12 text-left>
            <span
              class="LexendRegular"
              style="font-size: 25px; font-weight: bolder"
            >
              DETAILS</span
            >
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs11 pt-4>
        <v-card class="pa-5">
          <v-layout wrap justify-start pt-6>
            <v-flex xs12 sm5 md4 lg4>
              <v-card>
                <v-layout wrap>
                  <v-flex xs6 pa-5 v-if="img">
                    <v-img
                      contain
                      height="100%"
                      width="100%"
                      :src="mediaUURL + img"
                    ></v-img
                  ></v-flex>
                  <v-flex xs6 pa-5 v-else>
                    <v-img  contain
                      height="100%"
                      width="100%"  src="../../assets/headerimg.png"></v-img>

                  </v-flex>
                  <v-flex align-self-center pl-1 xs4 @click="dialog = true">
                    <v-btn color="#f17343">
                      <span style="color: white"> CHANGE </span>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-card>

              <v-dialog v-model="dialog" max-width="550px">
                <v-card>
                  <v-card-title style="font-family: LexendRegular">
                    Change Profile Picture
                  </v-card-title>
                  <v-card-text>
                    <v-layout wrap justify-center>
                      <v-flex xs3>
                        <ImageComp
                          @stepper="winStepper"
                          :height="'900'"
                          :width="'800'"
                          :heading="'Upload Image'"
                          :componentType="'topImage'"
                        />
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                  <v-card-actions>
                    <v-layout wrap justify-center pb-3>
                      <v-flex xs6 lg4 class="LexendRegukar">
                        <v-btn color="#f17343" @click="editProfile()"><span style="color: white;">Upload</span></v-btn>
                      </v-flex>
                      <v-flex xs6 lg4 class="LexendRegukar">
                        <v-btn color="#f17343" @click="dialog = false">
                            <span style="color: white;">Cancel</span>
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-flex>
            <v-flex xs11 md8 lg8 pb-8 pl-lg-16 pl-md-5 pl-0>
              <v-layout wrap>
                <!-- Personal Information -->
                <v-flex xs12 sm6 lg6 pr-3 pt-3>
                  <span class="heading">Name</span>
                  {{ list.name }}
                </v-flex>

                <v-flex xs12 sm6 lg6 pr-3 pt-3>
                  <span class="heading">Building Number</span>
                  {{ list.buildingNo }}
                </v-flex>

                <v-flex xs12 sm6 lg6 pr-3 pt-3>
                  <span class="heading">Locality</span>
                  {{ list.locality }}
                </v-flex>

                <v-flex xs12 sm6 lg6 pr-3 pt-3>
                  <span class="heading">District</span>
                  {{ list.district }}
                </v-flex>

                <v-flex xs12 sm6 lg6 pr-3 pt-3>
                  <span class="heading">State</span>
                  {{ list.state }}
                </v-flex>

                <v-flex xs12 sm6 lg6 pr-3 pt-3>
                  <span class="heading">Country</span>
                  {{ list.country }}
                </v-flex>

                <v-flex xs12 sm6 lg6 pr-3 pt-3>
                  <span class="heading">Pincode</span>
                  {{ list.pincode }}
                </v-flex>
                <v-flex xs12 sm6 lg6 pr-3 pt-3>
                  <span class="heading">Phone</span>
                  {{ list.phoneNumber }}
                </v-flex>
                <v-flex xs12 sm6 lg6 pr-3 pt-3>
                  <span class="heading">Email</span>
                  {{ list.email }}
                </v-flex>
                <v-flex xs12 sm6 lg6 pr-3 pt-3>
                  <span class="heading">whatsapp Number</span>
                  {{ list.whatsappNumber }}
                </v-flex>
                <v-flex xs12 sm6 lg6 pr-3 pt-3>
                  <span class="heading">Locality</span>
                  {{ list.locality }}
                </v-flex>

                <!-- Company Information -->
                <v-flex a xs12 sm6 lg6 pr-3 pt-3>
                  <span class="heading">Company Name</span>
                  {{ list.companyName }}
                </v-flex>

                <v-flex xs12 sm6 lg6 pr-3 pt-3>
                  <span class="heading">GST Number</span>
                  {{ list.gstNo }}
                </v-flex>




                <v-flex xs12 sm6 lg6 pr-3 pt-3>
                  <span class="heading">User Type</span>
                  {{ list.userType }}
                </v-flex>
              </v-layout>
            </v-flex>

            <v-flex xs12>
              <v-layout wrap justify-start>
                <v-flex xs12>
                  <v-layout wrap pt-5>
                    <!-- AgentId Proof Front -->
                    <v-flex v-if="agentId.agentIdProofFront" xs12 sm6 lg4 pr-4>
                      <v-layout wrap class="file-upload-container">
                        <v-flex xs12 sm6 lg12>
                          <span class="heading"> Proof Front</span>

                          <v-btn
                            class="file-upload-btn"
                            color="#f17343"
                            dark
                            download
                            :href="mediaUURL + agentId.agentIdProofFront"
                            target="_blank"
                          >
                            <v-icon left>mdi-file-document-outline</v-icon>
                            View
                          </v-btn>
                        </v-flex>
                      </v-layout>
                    </v-flex>

                    <!-- AgentId Proof Back -->
                    <v-flex v-if="agentId.agentIdProofBack" xs12 sm6 lg4 pr-4>
                      <v-layout wrap class="file-upload-container">
                        <v-flex xs12 sm6 lg12>
                          <span class="heading"> Proof Back</span>

                          <v-btn
                            class="file-upload-btn"
                            color="#f17343"
                            dark
                            download
                            :href="mediaUURL + agentId.agentIdProofBack"
                            target="_blank"
                          >
                            <v-icon left>mdi-file-document-outline</v-icon>
                            View
                          </v-btn>
                        </v-flex>
                      </v-layout>
                    </v-flex>

                    <!-- Agent GST Proof -->
                    <v-flex v-if="agentId.agentGSTProof" xs12 sm6 lg4 pr-4 pl-lg-10>
                      <v-layout wrap class="file-upload-container">
                        <v-flex xs12 sm6 lg12>
                          <span class="heading"> Document Details </span>

                          <v-btn
                            class="file-upload-btn"
                            color="#f17343"
                            dark
                            download
                            :href="mediaUURL + agentId.agentGSTProof"
                            target="_blank"
                          >
                            <v-icon left>mdi-file-document-outline</v-icon>
                            View 
                          </v-btn>
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
import ImageComp from "@/components/Common/singleImage";

import axios from "axios";
export default {
  components: {
    ImageComp,
  },
  data() {
    return {
      file1: null,
      file2: null,
      file3: null,
      file4: null,
      vendorCatList: [],
      showSnackBar: false,
      deletedialog: false,
      description: "",
      id: this.$route.query.id,
      ServerError: false,
      states: ["Travel Agent", "Travels", "Tour Guide"],
      agentId: {},
      timeout: 5000,
      bankDetails: {},
      bankDetails2: {},
      formData: new FormData(),
      msg: null,
      dialog: false,
      editdialog: false,
      vendorId: {},
      appLoading: false,
      list: {},
    };
  },
  computed: {
    img(){
        return this.$store.state.profileImg
    }
  },

  mounted() {
    this.getList();
  },
  watch: {
    currentPage() {
      this.getList();
    },
  },

  methods: {
    triggerFileInput(refName) {
      if (this.$refs[refName]) {
        this.$refs[refName].$refs.input.click();
      }
    },
    handleFileChange(refName) {
      console.log(`File ${refName} selected`);
    },
    winStepper(window_data) {
      if (window_data.type == "topImage") {
        this.topImage = window_data.selectedFiles;
      } else if (window_data.type == "image") {
        this.image = window_data.selectedFiles;
      } else if (window_data.type == "image") {
        this.imageArray = window_data.imageArray;
        this.imageFiles.push(window_data.selectedFiles);
      } else if (window_data.type == "imageRemoval") {
        var values = this.formData.getAll("photos");
        values.splice(window_data.removalItem, 1);
        this.formData.set("photos", values);
        this.imageArray = window_data.imageArray;
      }
    },

    editProfile() {
     

      const formData = new FormData();
      formData.append("id", this.list._id);
      formData.append("profileImage", this.topImage);

      axios({
        method: "POST",
        url: "/agent/profile/edit",
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      })
        .then((response) => {
          if (response.data.status == true) {
            this.msg = response.data.msg;

            this.showSnackBar = true;
            location.reload();
          } else {
            this.msg = response.data.msg;
            this.showSnackBar = true;
          }
        })
        .catch((err) => {
          this.ServerError = true;
          console.error(err);
        });
      this.formData = new FormData();
    },

    getList() {
      this.appLoading = true;
      axios
        .get("/profile", {
          headers: {
            token: localStorage.getItem("token"),
          },
          params: {
            id: this.id,
          },
        })
        .then((response) => {
          this.appLoading = false;
          this.list = response.data.data;
          this.agentId = this.list.agentId;
          //   this.vendorId = this.list.vendorId;
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
        <style >
.justified-text {
  text-align: justify;
}

.cus {
  background-color: #13736f;
}

.no-uppercase {
  text-transform: none !important;
}

.cus2 {
  background: var(
    --grend,
    linear-gradient(
      252deg,
      #e4ecee 0%,
      #9bc2c2 0%,
      #6ca6a5 28%,
      #157470 88%,
      #13736f 100%
    )
  );
}
.file-upload-container {
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.file-upload-title {
  font-size: 18px;
  font-weight: 500;
  color: #333;
}

.file-upload-btn {
  width: 100%;
  margin-top: 10px;
}

.file-upload-input {
  width: 100%;
  margin-top: 10px;
}
.heading {
  font-weight: bold;
}
</style>