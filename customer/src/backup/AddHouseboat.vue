<template>
  <div>
    <vue-element-loading
      :active="appLoading"
      :is-full-screen="true"
      background-color="#FFFFFF"
      color="#182444"
      spinner="bar-fade-scale"
    />
    <ServerError v-if="ServerError" />
    <v-snackbar v-model="snackbar" color="#182444" right timeout="2000">
      <v-layout wrap justify-center>
        <v-flex text-left class="align-self-center">
          <span style="color: white">
            {{ msg }}
          </span>
        </v-flex>

        <v-flex text-right>
          <v-btn small :ripple="false" text @click="snackbar = false">
            <v-icon style="color: #000">mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-snackbar>
    <v-layout wrap justify-center pa-4>
      <v-flex xs12>
        <v-layout wrap justify-start py-2>
          <v-flex xs12 sm3 align-self-center>
            <span
              class="title1"
              :style="{
                'font-size':
                  $vuetify.breakpoint.name == 'xs'
                    ? '20px'
                    : $vuetify.breakpoint.name == 'sm'
                    ? '20px'
                    : $vuetify.breakpoint.name == 'md'
                    ? '25px'
                    : $vuetify.breakpoint.name == 'lg'
                    ? '25px'
                    : '30px',
              }"
              >Houseboat Details</span
            >
          </v-flex>
        </v-layout>
        <v-layout wrap justify-space-around pt-2>
          <v-flex xs12>
            <v-card tile class="pa-8">
              <v-layout wrap justify-start>
                <v-flex xs12 sm6>
                  <v-layout wrap justify-center>
                    <v-flex xs12 sm10 text-left>
                      <span class="title2">Houseboat Name</span>
                      <v-text-field
                        dense
                        outlined
                        type="text"
                        v-model="houseBoatName"
                        placeholder="Houseboat Name"
                        :rules="[rules.required]"
                        hide-details="auto"
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">Total Rooms</span>
                      <v-text-field
                        dense
                        v-model="totalRooms"
                        outlined
                        type="number"
                        placeholder="Total Rooms"
                        :rules="[rules.required]"
                        hide-details="auto"
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">Category</span>
                      <v-select
                        hide-details="auto"
                        v-model="category"
                        :items="['Luxuary', 'Premium', 'Delux']"
                        :menu-props="{ maxHeight: '400' }"
                        Placeholder="Category"
                        outlined
                        persistent-hint
                        dense
                      ></v-select>
                    </v-flex>
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">Facilities</span>
                      <v-layout wrap>
                        <v-flex xs3 pb-2>
                          <span
                            class="title3"
                            style="color: rgba(80, 80, 80, 1)"
                            >Air condition</span
                          >
                          <v-switch
                            class="mt-0"
                            v-model="airCondition"
                            hide-details
                            inset
                            color="#F17343"
                          ></v-switch>
                        </v-flex>
                        <v-flex xs3 pb-2>
                          <span
                            class="title3"
                            style="color: rgba(80, 80, 80, 1)"
                            >Kettle</span
                          >
                          <v-switch
                            class="mt-0"
                            v-model="kettle"
                            hide-details
                            inset
                            color="#F17343"
                          ></v-switch>
                        </v-flex>
                        <v-flex xs3 pb-2>
                          <span
                            class="title3"
                            style="color: rgba(80, 80, 80, 1)"
                            >Parking</span
                          >
                          <v-switch
                            class="mt-0"
                            v-model="parking"
                            hide-details
                            inset
                            color="#F17343"
                          ></v-switch>
                        </v-flex>
                        <v-flex xs3 pb-2>
                          <span
                            class="title3"
                            style="color: rgba(80, 80, 80, 1)"
                            >Rest rooms</span
                          >
                          <v-switch
                            class="mt-0"
                            v-model="restrooms"
                            hide-details
                            inset
                            color="#F17343"
                          ></v-switch>
                        </v-flex>
                        <v-flex xs3 pb-2>
                          <span
                            class="title3"
                            style="color: rgba(80, 80, 80, 1)"
                            >Life Jacket</span
                          >
                          <v-switch
                            class="mt-0"
                            v-model="lifeJacket"
                            hide-details
                            inset
                            color="#F17343"
                          ></v-switch>
                        </v-flex>
                        <v-flex xs3 pb-2>
                          <span
                            class="title3"
                            style="color: rgba(80, 80, 80, 1)"
                            >Wi-Fi</span
                          >
                          <v-switch
                            class="mt-0"
                            v-model="wifi"
                            hide-details
                            inset
                            color="#F17343"
                          ></v-switch>
                        </v-flex>
                        <v-flex xs3 pb-2>
                          <span
                            class="title3"
                            style="color: rgba(80, 80, 80, 1)"
                            >TV</span
                          >
                          <v-switch
                            class="mt-0"
                            v-model="television"
                            hide-details
                            inset
                            color="#F17343"
                          ></v-switch>
                        </v-flex>
                        <v-flex xs3 pb-2>
                          <span
                            class="title3"
                            style="color: rgba(80, 80, 80, 1)"
                            >Swiming Pool</span
                          >
                          <v-switch
                            class="mt-0"
                            v-model="swimmingPool"
                            hide-details
                            inset
                            color="#F17343"
                          ></v-switch>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">Additional Rules</span>
                      <v-textarea
                        dense
                        v-model="addionalRules"
                        outlined
                        type="text"
                        placeholder="Rules"
                        :rules="[rules.required]"
                        hide-details="auto"
                      >
                      </v-textarea>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-layout wrap justify-center>
                    <v-flex xs12 sm10>
                      <v-radio-group
                        dense
                        v-model="expiryType"
                        row
                        class="mt-0 pt-0"
                        hide-details="auto"
                      >
                        <v-radio
                          label="License Expiry"
                          value="licenseExpiry"
                        ></v-radio>
                        <v-radio
                          label="Insurance Expiry"
                          value="insuranceExpiry"
                        ></v-radio>
                      </v-radio-group>
                      <v-menu
                        ref="menu2"
                        v-model="menu2"
                        :close-on-content-click="false"
                        :return-value.sync="expiryDate"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="expiryDate"
                            placeholder="Expiry Date"
                            background-color="white"
                            outlined
                            color="#182444"
                            readonly
                            hide-details
                            clearable
                            dense
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="expiryDate"
                          no-title
                          scrollable
                          @change="$refs.menu2.save(expiryDate)"
                        >
                          <v-spacer></v-spacer>
                        </v-date-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="font3">Boat License/Insurance</span
                      ><span style="color: rgba(241, 115, 67, 1)">*</span
                      ><span
                        style="
                          font-family: LexendFont;
                          font-size: 14px;
                          font-weight: 300;
                          color: grey;
                        "
                        >front & back side in single file</span
                      >
                      <v-file-input
                        label="File input"
                        outlined
                        dense
                        hide-details="auto"
                        v-model="boatLicenseProof"
                        @change="getFiles"
                      >
                        <template v-slot:append>
                          <v-btn
                            dense
                            class="hidden-xs-only btnstly"
                            small
                           
                            ><span style="color: white"
                              >Choose File</span
                            ></v-btn
                          >
                        </template>
                      </v-file-input>
                    </v-flex>
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="font3">Owner/Lease Document</span
                      ><span style="color: rgba(241, 115, 67, 1)">*</span
                      ><span
                        style="
                          font-family: LexendFont;
                          font-size: 14px;
                          font-weight: 300;
                          color: grey;
                        "
                        >(front & back side in single file)</span
                      >
                      <v-file-input
                        label="File input"
                        outlined
                        dense
                        hide-details="auto"
                        v-model="leaseProof"
                        @change="getFiles2"
                      >
                        <template v-slot:append>
                          <v-btn
                            dense
                            class="hidden-xs-only btnstly"
                            small
                           
                            ><span style="color: white"
                              >Choose File</span
                            ></v-btn
                          >
                        </template>
                      </v-file-input>
                    </v-flex>
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">Property Image Upload</span>
                      <v-layout wrap pt-4>
                        <v-flex xs3 pb-2 text-center>
                          <v-card
                            tile
                            elevation="0"
                            color="#e8e8e8"
                            class="mr-4"
                            height="80px"
                            width="90px"
                          >
                            <SingleImageComp
                              @stepper="winStepper"
                              :height="'500'"
                              :width="'750'"
                              :componentType="'fullImage'"
                            />
                          </v-card>
                          <span
                            class="title3"
                            style="color: rgba(80, 80, 80, 1)"
                            >Full view</span
                          >
                        </v-flex>
                        <v-flex xs3 pb-2 text-center>
                          <v-card
                            tile
                            elevation="0"
                            color="#e8e8e8"
                            class="mr-4"
                            height="80px"
                            width="90px"
                          >
                            <SingleImageComp
                              @stepper="winStepper"
                              :height="'500'"
                              :width="'750'"
                              :componentType="'upperImage'"
                            />
                          </v-card>
                          <span
                            class="title3"
                            style="color: rgba(80, 80, 80, 1)"
                            >Upper-deck / reception</span
                          >
                        </v-flex>
                        <v-flex xs3 pb-2 text-center>
                          <v-card
                            tile
                            elevation="0"
                            color="#e8e8e8"
                            class="mr-4"
                            height="80px"
                            width="90px"
                          >
                            <SingleImageComp
                              @stepper="winStepper"
                              :height="'500'"
                              :width="'750'"
                              :componentType="'interiorImage'"
                            />
                          </v-card>
                          <span
                            class="title3"
                            style="color: rgba(80, 80, 80, 1)"
                            >Interior</span
                          >
                        </v-flex>
                        <v-flex xs3 pb-2 text-center>
                          <v-card
                            tile
                            elevation="0"
                            color="#e8e8e8"
                            class="mr-4"
                            height="80px"
                            width="90px"
                          >
                            <SingleImageComp
                              @stepper="winStepper"
                              :height="'500'"
                              :width="'750'"
                              :componentType="'roomImage'"
                            />
                          </v-card>
                          <span
                            class="title3"
                            style="color: rgba(80, 80, 80, 1)"
                            >Rooms</span
                          >
                        </v-flex>
                        <v-flex xs12 pb-2 text-left>
                         
                            <ImageComp
                              @stepper="winStepper"
                              :height="'538'"
                              :width="'822'"
                              :heading="'Upload Images'"
                            />
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                  <v-layout wrap justify-end>
                    <v-flex xs12 sm2>
                      <v-btn
                        @click="validation()"
                        block class="btnstly"
                        style="
                          cursor: pointer;
                        "
                        ><span
                          style="font-family: LexendFont; text-transform: none"
                          >Save</span
                        ></v-btn
                      >
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>
  <script>
import axios from "axios";
import SingleImageComp from "./singleImage";
import ImageComp from "./multipleImages";
export default {
  components: {
    SingleImageComp,
    ImageComp,
  },
  data() {
    return {
      showsnackbar: false,
      timeout: 2000,
      ServerError: false,
      appLoading: false,
      data: [],
      msg: null,
      page: 1,
      limit: 20,
      houseBoatName: "",
      category: "",
      airCondition: false,
      kettle: false,
      parking: false,
      restrooms: false,
      lifeJacket: false,
      wifi: false,
      television: false,
      swimmingPool: false,
      addionalRules: "",
      totalRooms: "",
      houseBoatType: "",
      expiryType: "",
      expiryDate: "",
      //image upload
      imageId: "",
      fullImage: "",
      upperImage: "",
      interiorImage: "",
      roomImage: "",
      boatLicenseProof: "",
      attachments: null,
      leaseProof: "",
      attachments2: null,
      formData: new FormData(),
      imageArray:[],
      imageFiles:[],
      //
      menu2: false,
      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) => value.length <= 20 || "Max 20 characters",

        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
      phoneRules: [
        (v) => !!v || "phone is required",
        (v) => (v && v.length <= 10) || "invalid number",
        (v) => (v && v.length >= 10) || "invalid number",
        (v) => /^\d{10}$/.test(v) || "phone number must be a number",
      ],
      pinRules: [
        (v) => !!v || "PIN is required",
        (v) => (v && v.length === 6) || "PIN must be 6 digits",
      ],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    winStepper(window_data) {
      if (window_data.type == "fullImage") {
        this.fullImage = window_data.selectedFiles;
        console.log("fullImage is", this.fullImage);
      }
      if (window_data.type == "upperImage") {
        this.upperImage = window_data.selectedFiles;
        console.log("upperImage is", this.upperImage);
      }
      if (window_data.type == "interiorImage") {
        this.interiorImage = window_data.selectedFiles;
        console.log("interiorImage is", this.interiorImage);
      }
      if (window_data.type == "roomImage") {
        this.roomImage = window_data.selectedFiles;
        console.log("roomImage is", this.roomImage);
      }
      if (window_data.type == "image") {
        this.imageArray = window_data.imageArray;
        this.imageFiles.push(window_data.selectedFiles);
      } else if (window_data.type == "imageRemoval") {
        var values = this.formData.getAll("photos");
        values.splice(window_data.removalItem, 1);
        this.formData.set("photos", values);
        this.imageArray = window_data.imageArray;
      }
    },
    getFiles() {
      var selectedFiles = this.boatLicenseProof;
      console.log("img=", this.boatLicenseProof);
      if (this.boatLicenseProof) {
        this.msg = null;
        this.attachments = selectedFiles;
        console.log("attachments=", this.attachments);
      }
    },
    getFiles2() {
      // this.categoryImg = this.Image
      var selectedFiles2 = this.leaseProof;
      console.log("img=", this.leaseProof);
      if (this.leaseProof) {
        this.msg = null;
        this.attachments2 = selectedFiles2;
        console.log("attachments2=", this.attachments2);
      }
    },
    ImageUpload(id) {
      if (this.imageArray.length > 0) {
              for (var i = 0; i < this.imageFiles.length; i++)
                this.formData.append("propertyImages", this.imageFiles[i]);
            }
      this.formData.append("id", id);
      this.formData.append("fullImage", this.fullImage);
      this.formData.append("upperImage", this.upperImage);
      this.formData.append("interiorImage", this.interiorImage);
      this.formData.append("roomImage", this.roomImage);
      this.formData.append("boatLicenseProof", this.attachments);
      this.formData.append("leaseProof", this.attachments2);
      console.log("formData", this.formData);

      axios({
        method: "post",
        url: "/houseboat/proofupload",
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("token"),
        },
        data: this.formData,
      }).then((response) => {
        if (response.data.status) {
          this.formData = new FormData();
          this.fullImage = "";
          this.upperImage = "";
          this.interiorImage = "";
          this.roomImage = "";
          this.attachments = "";
          this.attachments2 = "";
          this.imageFiles=[];
          this.imageArray=[];
          this.msg = response.data.msg;
          this.snackbar = true;
          this.$router.push('/Houseboats')
        } else {
          alert("failed to update cover image");
        }
      });
    },

    validation() {
      if (!this.category) {
        this.msg = "Please choose boat category";
        this.snackbar = true;
        return;
      } else if (!this.houseBoatName) {
        this.msg = "Please enter house boat name";
        this.snackbar = true;
        return;
      } else if (!this.totalRooms) {
        this.msg = "Please enter total rooms";
        this.snackbar = true;
        return;
      } else if (!this.expiryType) {
        this.msg = "Please choose expiry type";
        this.snackbar = true;
        return;
      } else if (!this.expiryDate) {
        this.msg = "Please enter expiry date";
        this.snackbar = true;
        return;
      } else {
        this.addBoat();
      }
    },
    addBoat() {
      var facilities = {};
      facilities.airCondition = this.airCondition;
      facilities.kettle = this.kettle;
      facilities.parking = this.parking;
      facilities.restrooms = this.restrooms;
      facilities.lifeJacket = this.lifeJacket;
      facilities.wifi = this.wifi;
      facilities.television = this.television;
      facilities.swimmingPool = this.swimmingPool;

      axios({
        method: "POST",
        url: "/houseboat/add",
        data: {
          houseBoatName: this.houseBoatName,
          totalRooms: this.totalRooms,
          category: this.category,
          addionalRules: this.addionalRules,
          expiryType: this.expiryType,
          expiryDate: this.expiryDate,
          facilities: facilities,
        },
        headers: {
          token: localStorage.getItem("token"),
        },
      }).then((response) => {
        if (response.data.status) {
          this.msg = response.data.msg;
          this.snackbar = true;
          this.imageId = response.data.id;
          console.log("id=", this.imageId);
          if (this.imageId) {
            console.log("sdfghj");
            this.ImageUpload(this.imageId);
          }
          else{
            this.$router.push('/Houseboats')
          }
        } else {
          this.msg = response.data.msg;
          this.snackbar = true;
        }
      });
      // }
    },
    getData() {
      this.appLoading = true;
      axios({
        url: "/houseboat/getlist",
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
        },
        params: {
          page: this.page,
          limit: 50,
        },
      })
        .then((response) => {
          this.appLoading = false;
          this.data = response.data.data;
          this.Pagelength = Math.ceil(response.data.count / this.limit);
        })
        .catch((err) => {
          //   this.ServerError = true;
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
.btnstly{
  background: linear-gradient(
                                to bottom,
                                rgba(255, 133, 86, 1),
                                rgba(247, 75, 9, 1),
                                rgba(255, 70, 0, 1)
                              );
                              color: white;
}
</style>