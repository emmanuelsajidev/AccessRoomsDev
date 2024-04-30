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
    <v-snackbar v-model="snackbar" color="#ff6200" right top timeout="2000">
      <v-layout wrap justify-center>
        <v-flex text-left class="align-self-center">
          <span style="color: white">
            {{ msg }}
          </span>
        </v-flex>

        <v-flex text-right>
          <v-btn small :ripple="false" text @click="snackbar = false">
            <v-icon style="color: white">mdi-close</v-icon>
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
              >Shikara Details</span
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
                      <span class="title2">Shikara Name</span>
                      <v-text-field
                        dense
                        outlined
                        type="text"
                        v-model="shikaraData.shikaraName"
                        hide-details="auto"
                      >
                      </v-text-field>
                    </v-flex>
                    <!-- <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">Total Seats</span>
                      <v-text-field
                        dense
                        v-model="shikaraData.totalSeats"
                        outlined
                        type="number"
                        hide-details="auto"
                      >
                      </v-text-field>
                    </v-flex> -->
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">Facilities</span>
                      <v-layout wrap>
                        <v-flex xs6 sm6 md3 pb-2>
                          <span class="title3" style="color: #505050"
                            >Air condition</span
                          >
                          <v-switch
                            class="mt-0"
                            v-model="FacilitiesData.airCondition"
                            hide-details
                            inset
                            color="#F17343"
                          ></v-switch>
                        </v-flex>
                        <v-flex xs6 sm6 md3 pb-2>
                          <span class="title3" style="color: #505050"
                            >Towels</span
                          >
                          <v-switch
                            class="mt-0"
                            v-model="FacilitiesData.towels"
                            hide-details
                            inset
                            color="#F17343"
                          ></v-switch>
                        </v-flex>
                        <v-flex xs6 sm6 md3 pb-2>
                          <span class="title3" style="color: #505050"
                            >Parking</span
                          >
                          <v-switch
                            class="mt-0"
                            v-model="FacilitiesData.parking"
                            hide-details
                            inset
                            color="#F17343"
                          ></v-switch>
                        </v-flex>
                        <v-flex xs6 sm6 md3 pb-2>
                          <span class="title3" style="color: #505050"
                            >Rest rooms</span
                          >
                          <v-switch
                            class="mt-0"
                            v-model="FacilitiesData.restrooms"
                            hide-details
                            inset
                            color="#F17343"
                          ></v-switch>
                        </v-flex>
                        <v-flex xs6 sm6 md3 pb-2>
                          <span class="title3" style="color: #505050"
                            >Life Jacket</span
                          >
                          <v-switch
                            class="mt-0"
                            v-model="FacilitiesData.lifeJacket"
                            hide-details
                            inset
                            color="#F17343"
                          ></v-switch>
                        </v-flex>
                        <v-flex xs6 sm6 md3 pb-2>
                          <span class="title3" style="color: #505050"
                            >Wi-Fi</span
                          >
                          <v-switch
                            class="mt-0"
                            v-model="FacilitiesData.wifi"
                            hide-details
                            inset
                            color="#F17343"
                          ></v-switch>
                        </v-flex>
                        <v-flex xs6 sm6 md3 pb-2>
                          <span class="title3" style="color: #505050"
                            >Television</span
                          >
                          <v-switch
                            class="mt-0"
                            v-model="FacilitiesData.television"
                            hide-details
                            inset
                            color="#F17343"
                          ></v-switch>
                        </v-flex>
                        <v-flex xs6 sm6 md3 pb-2>
                          <span class="title3" style="color: #505050"
                            >Toilet</span
                          >
                          <v-switch
                            class="mt-0"
                            v-model="FacilitiesData.toilet"
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
                        v-model="shikaraData.addionalRules"
                        outlined
                        type="text"
                        placeholder="Rules"
                        hide-details="auto"
                      >
                      </v-textarea>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-layout wrap justify-center>
                    <v-flex xs12 sm10 text-left>
                      <span class="title2">Total Seats</span>
                      <v-text-field
                        dense
                        v-model="shikaraData.totalSeats"
                        outlined
                        type="number"
                        hide-spin-buttons
                        hide-details="auto"
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex pt-4 xs12 sm10 text-left>
                      <span class="title2">Location</span>
                      <v-select
                        hide-details="auto"
                        v-model="shikaraData.location"
                        :items="locationList"
                        :menu-props="{ maxHeight: '400' }"
                        outlined
                        @input="getsubLocation()"
                        item-text="name"
                        item-value="_id"
                        persistent-hint
                        dense
                      ></v-select>
                    </v-flex>
                    <v-flex pt-4 xs12 sm10 text-left>
                      <span class="title2">Pickup/Drop Location</span>
                      <v-select
                        hide-details="auto"
                        v-model="shikaraData.startingLocation"
                        :items="sublocationList"
                        :menu-props="{ maxHeight: '400' }"
                        outlined
                        item-text="name"
                        item-value="_id"
                        persistent-hint
                        dense
                      ></v-select>
                    </v-flex>
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">Property Image Upload</span>
                      <v-layout wrap pt-4>
                        <v-flex xs12 md3 pb-2 text-left text-md-center>
                          <v-card
                            tile
                            elevation="0"
                            color="#e8e8e8"
                            class="mr-4"
                            height="80px"
                            width="90px"
                          >
                            <ImageComp
                              :singleImage="shikaraData.coverImage"
                              @stepper="winStepper"
                              :width="1251"
                              :height="300"
                              :componentType="'coverImage'"
                            />
                            <!-- <SingleImageComp
                              @stepper="winStepper"
                              :height="'300'"
                              :width="'1251'"
                              :componentType="'fullImage'"
                            /> -->
                          </v-card>
                          <span class="title3" style="color: #505050"
                            >Cover Image</span
                          >
                        </v-flex>
                        <v-flex
                          xs6
                          sm3
                          v-for="(item, i) in shikaraData.propertyImages"
                          :key="i"
                          pa-1
                        >
                          <v-card
                            tile
                            elevation="0"
                            class="mr-4"
                            height="80px"
                            width="90px"
                          >
                            <v-img
                              :src="mediaUURL + item"
                              height="80px"
                              width="90px"
                            >
                              <v-layout wrap>
                                <v-flex text-right pa-0>
                                  <v-avatar color="#FF3434" size="15">
                                    <v-icon
                                      color="#FFF"
                                      small
                                      @click="deleteImg(i, shikaraData._id)"
                                    >
                                      mdi-close
                                    </v-icon>
                                  </v-avatar>
                                </v-flex>
                              </v-layout>
                            </v-img>
                          </v-card>
                        </v-flex>
                        <v-flex xs12 pb-2 text-left>
                          <v-card
                            tile
                            @click="$refs.files.click()"
                            elevation="0"
                            color="#ED7243"
                            class="mr-4"
                            height="80px"
                            width="90px"
                          >
                            <input
                              v-show="false"
                              accept="image/*"
                              id="file"
                              ref="files"
                              type="file"
                              @change="uploadImages"
                            />
                            <v-layout wrap fill-height>
                              <v-flex xs12 align-self-center text-center>
                                <v-icon color="white"
                                  >mdi-plus-circle-outline</v-icon
                                >
                              </v-flex>
                            </v-layout>
                          </v-card>
                          <span class="title3" style="color: #505050"
                            >Add more images</span
                          >
                        </v-flex>
                        <v-flex
                          xs12
                          sm2
                          v-for="(item, i) in imageArray"
                          :key="i"
                          pa-1
                        >
                          <v-card
                            tile
                            elevation="0"
                            class="mr-4"
                            height="80px"
                            width="90px"
                          >
                            <v-img :src="item" height="50px">
                              <v-layout wrap>
                                <v-flex text-right pa-0>
                                  <v-avatar color="#FF3434" size="15">
                                    <v-icon
                                      color="#FFF"
                                      small
                                      @click="removeImageArray(i)"
                                    >
                                      mdi-close
                                    </v-icon>
                                  </v-avatar>
                                </v-flex>
                              </v-layout>
                            </v-img>
                          </v-card>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                  <v-layout wrap justify-end>
                    <v-flex xs12 sm2>
                      <v-btn
                        @click="editBoat()"
                        block
                        class="btnstly"
                        style="cursor: pointer"
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
    <v-dialog
      v-model="cropImageDialog"
      persistent
      :width="
        $vuetify.breakpoint.name == 'xs' || $vuetify.breakpoint.name == 'sm'
          ? '100vw'
          : $vuetify.breakpoint.name == 'md'
          ? '80vw'
          : $vuetify.breakpoint.name == 'lg'
          ? '50vw'
          : '40vw'
      "
    >
      <v-card>
        <v-layout wrap justify-center pa-2>
          <v-flex xs12>
            <ImageCropper
              :image="currentImage"
              :key="currentImage"
              :width="700"
              :height="700"
              @stepper="imageCropper"
            />
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
  </div>
</template>
  <script>
import axios from "axios";
import ImageCropper from "./imageCropper";
import ImageComp from "./singleImages";
// import SingleImageComp from "./singleImage";
export default {
  components: {
    ImageCropper,
    ImageComp,
    // SingleImageComp,
  },
  data() {
    return {
      cropImageDialog: false,
      showsnackbar: false,
      timeout: 2000,
      ServerError: false,
      appLoading: false,
      shikaraData: [],
      FacilitiesData: [],
      msg: null,
      page: 1,
      limit: 20,
      shikaraName: "",
      category: "",
      airCondition: false,
      towels: false,
      parking: false,
      restrooms: false,
      lifeJacket: false,
      wifi: false,
      television: false,
      toilet: false,
      addionalRules: "",
      totalSeats: "",
      locationList: [],
      sublocationList: [],
      houseBoatType: "",
      expiryType: "",
      expiryDate: "",
      //image upload
      imageId: "",
      upperImage: "",
      interiorImage: "",
      roomImage: "",
      boatLicenseProof: "",
      attachments: null,
      leaseProof: "",
      attachments2: null,
      formData: new FormData(),
      imageArray: [],
      imageFiles: [],
      snackbar: false,
      selectedFiles: null,
      fullImage: "",
      currentImage: "",
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
      pinRules: [
        (v) => !!v || "PIN is required",
        (v) => (v && v.length === 6) || "PIN must be 6 digits",
      ],
    };
  },
  mounted() {
    this.getData();
    this.getList();
    this.getsubLocation();
  },
  methods: {
    openFileInput() {
      // Trigger a click event on the file input element
      this.$refs.fileInput.$el.querySelector("input").click();
    },
    openFileInput2() {
      // Trigger a click event on the file input element
      this.$refs.fileInput2.$el.querySelector("input").click();
    },
    winStepper(window_data) {
      if (window_data.type == "coverImage") {
        this.shikaraData.coverImage = window_data.selectedFiles;
        console.log("coverImage is", this.shikaraData.coverImage);
      }
    },
    uploadImages(event) {
      if (this.imageArray.length < 10) {
        this.currentImage = URL.createObjectURL(event.target.files[0]);
        this.cropImageDialog = true;
      } else {
        this.msg = "Maximum image limit exceeded!";
        this.snackbar = true;
        return;
      }
    },
    removeImageArray(i) {
      var values = this.formData.getAll("photos");
      values.splice(i, 1);
      this.formData.set("photos", values);
      this.imageArray.splice(i, 1);
    },
    imageCropper(payload) {
      this.cropImageDialog = payload.dialog;
      if (payload.image) {
        this.collectImages(payload.image);
      }
    },
    collectImages(image) {
      this.ImgselectedFiles = image;
      // this.Images.append("image", this.ImgselectedFiles);
      this.formData.append("propertyImages", this.ImgselectedFiles);
      var img = new Image();
      img.src = window.URL.createObjectURL(image);
      img.onload = () => {
        const urls = URL.createObjectURL(image);
        this.imageArray.push(urls);
        if (this.imageArray) {
          this.image = this.imageArray[0];
        }
      };
      console.log("ImgselectedFiles==", this.ImgselectedFiles);
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
      this.appLoading = true;
      if (this.imageArray.length > 0) {
        for (var i = 0; i < this.imageFiles.length; i++)
          this.formData.append("propertyImages", this.imageFiles[i]);
      }
      this.formData.append("id", id);
      this.formData.append("coverImage", this.shikaraData.coverImage);
      // this.formData.append("upperImage", this.upperImage);
      // this.formData.append("interiorImage", this.interiorImage);
      // this.formData.append("roomImage", this.roomImage);
      this.formData.append("boatLicenseProof", this.attachments);
      this.formData.append("leaseProof", this.attachments2);
      console.log("formData", this.formData);

      axios({
        method: "post",
        url: "/shikara/propertyimage/upload",
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("token"),
        },
        data: this.formData,
      }).then((response) => {
        this.appLoading = false;
        if (response.data.status==true) {
          this.formData = new FormData();
          // this.fullImage = "";
          // this.upperImage = "";
          // this.interiorImage = "";
          // this.roomImage = "";
          this.attachments = "";
          this.attachments2 = "";
          this.imageFiles = [];
          this.imageArray = [];
          this.msg = response.data.msg;
          this.snackbar = true;
          this.$router.push("/ViewShikara?id=" + this.shikaraData._id);
        } else {
          this.msg = response.data.msg;
          this.snackbar = true;
        }
      });
    },

    validation() {
      if (!this.shikaraName) {
        this.msg = "Please enter shikara boat name";
        this.snackbar = true;
        return;
      } else if (!this.totalSeats) {
        this.msg = "Please enter total seats";
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
    getsubLocation() {
      this.appLoading = true;
      axios({
        url: "/location/sub/list",
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
        },
        params: {
          page: this.page,
          limit: 50,
          locationId: this.shikaraData.location,
        },
      })
        .then((response) => {
          this.appLoading = false;
          this.sublocationList = response.data.data;
          this.Pagelength = Math.ceil(response.data.count / this.limit);
        })
        .catch((err) => {
          //   this.ServerError = true;
          console.log(err);
        });
    },
    editBoat() {
      this.appLoading = true;
      var facilities = {};
      facilities.airCondition = this.FacilitiesData.airCondition;
      facilities.towels = this.FacilitiesData.towels;
      facilities.parking = this.FacilitiesData.parking;
      facilities.restrooms = this.FacilitiesData.restrooms;
      facilities.lifeJacket = this.FacilitiesData.lifeJacket;
      facilities.wifi = this.FacilitiesData.wifi;
      facilities.television = this.FacilitiesData.television;
      facilities.toilet = this.FacilitiesData.toilet;

      axios({
        method: "POST",
        url: "/shikara/edit",
        data: {
          shikaraName: this.shikaraData.shikaraName,
          totalSeats: this.shikaraData.totalSeats,
          addionalRules: this.shikaraData.addionalRules,
          expiryType: this.shikaraData.expiryType,
          expiryDate: this.shikaraData.expiryDate,
          location: this.shikaraData.location,
          startingLocation: this.shikaraData.startingLocation,
          facilities: facilities,
          id: this.$route.query.id,
        },
        headers: {
          token: localStorage.getItem("token"),
        },
      }).then((response) => {
        this.appLoading = false;
        if (response.data.status==true) {
          this.msg = response.data.msg;
          this.snackbar = true;
          this.imageId = response.data.data._id;
          console.log("id=", this.imageId);
          if (this.imageId) {
            console.log("sdfghj");
            this.ImageUpload(this.imageId);
          } else {
            console.log("No Image Id");
            // this.$router.push('/Shikara')
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
        url: "/shikara/get",
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
        },
        params: {
          id: this.$route.query.id,
        },
      })
        .then((response) => {
          this.appLoading = false;
          this.shikaraData = response.data.data;
          this.FacilitiesData = this.shikaraData.facilities;
          this.Pagelength = Math.ceil(response.data.count / this.limit);
        })
        .catch((err) => {
          //   this.ServerError = true;
          console.log(err);
        });
    },
    getList() {
      this.appLoading = true;
      axios({
        url: "/location/list",
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
          this.locationList = response.data.data;
          this.Pagelength = Math.ceil(response.data.count / this.limit);
        })
        .catch((err) => {
          //   this.ServerError = true;
          console.log(err);
        });
    },
    deleteImg(id, shikaraId) {
      this.appLoading = true;
      axios({
        url: "/shikara/removeimagesingle",
        method: "POST",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          position: id,
          shikaraId: shikaraId,
        },
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status==true) {
            this.msg = response.data.msg;
            this.snackbar = true;
            this.getData();
          } else {
            this.msg = response.data.msg;
            this.snackbar = true;
          }
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
.btnstly {
  background: linear-gradient(
    to bottom,
    rgba(255, 133, 86, 1),
    rgba(247, 75, 9, 1),
    rgba(255, 70, 0, 1)
  );
  color: white;
}
</style>