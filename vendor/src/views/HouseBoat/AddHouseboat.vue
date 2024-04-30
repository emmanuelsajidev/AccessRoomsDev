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
    <v-snackbar v-model="showSnackBar" color="#ff6200" right top timeout="2000">
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
                        hide-spin-buttons
                        :rules="[rules.required]"
                        hide-details="auto"
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">Location</span>

                      <v-select
                        hide-details="auto"
                        v-model="location"
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
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">Pickup/Drop Location</span>
                      <v-select
                        hide-details="auto"
                        v-model="sublocation"
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
                      <span class="title2">Category</span>
                      <v-select
                        hide-details="auto"
                        v-model="category"
                        :items="['Luxury', 'Premium', 'Deluxe']"
                        :menu-props="{ maxHeight: '400' }"
                        outlined
                        persistent-hint
                        dense
                      ></v-select>
                    </v-flex>
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">Facilities</span>
                      <v-layout wrap>
                        <v-flex xs6 md3 pb-2>
                          <span class="title3" style="color: #505050"
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
                        <v-flex xs6 md3 pb-2>
                          <span class="title3" style="color: #505050"
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
                        <v-flex xs6 md3 pb-2>
                          <span class="title3" style="color: #505050"
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
                        <v-flex xs6 md3 pb-2>
                          <span class="title3" style="color: #505050"
                            >Restroom</span
                          >
                          <v-switch
                            class="mt-0"
                            v-model="restrooms"
                            hide-details
                            inset
                            color="#F17343"
                          ></v-switch>
                        </v-flex>
                        <v-flex xs6 md3 pb-2>
                          <span class="title3" style="color: #505050"
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
                        <v-flex xs6 md3 pb-2>
                          <span class="title3" style="color: #505050"
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
                        <v-flex xs6 md3 pb-2>
                          <span class="title3" style="color: #505050"
                            >Television</span
                          >
                          <v-switch
                            class="mt-0"
                            v-model="television"
                            hide-details
                            inset
                            color="#F17343"
                          ></v-switch>
                        </v-flex>
                        <v-flex xs6 md3 pb-2>
                          <span class="title3" style="color: #505050"
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
                        <v-flex xs6 md3 pb-2>
                          <span class="title3" style="color: #505050"
                            >Fire extinguisher</span
                          >
                          <v-switch
                            class="mt-0"
                            v-model="fireextinguisher"
                            hide-details
                            inset
                            color="#F17343"
                          ></v-switch>
                        </v-flex>
                        <v-flex xs6 md3 pb-2>
                          <span class="title3" style="color: #505050"
                            >Power backup</span
                          >
                          <v-switch
                            class="mt-0"
                            v-model="powerbackup"
                            hide-details
                            inset
                            color="#F17343"
                          ></v-switch>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <!-- <v-flex xs12 sm10 pt-4 text-left>
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
                    </v-flex> -->
                    <v-flex xs12 sm10 pt-4>
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
                          :min="nowDate"
                          scrollable
                          @change="$refs.menu2.save(expiryDate)"
                        >
                          <v-spacer></v-spacer>
                        </v-date-picker>
                      </v-menu>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-layout wrap justify-center>
                    <!-- <v-flex xs12 sm10>
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
                    </v-flex>-->
                    <v-flex xs12 sm10 text-left>
                      <span class="font3">Boat License/Insurance</span
                      ><span style="color: #f17343">*</span
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
                        ref="fileInput2"
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
                            @click="openFileInput2"
                            ><span style="color: white"
                              >Choose File</span
                            ></v-btn
                          >
                        </template>
                      </v-file-input>
                    </v-flex>
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="font3">Owner/Lease Document </span
                      ><span style="color: #f17343">*</span
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
                        ref="fileInput"
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
                            @click="openFileInput"
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
                            <ImageComp
                              :singleImage="coverImage"
                              @stepper="winStepper"
                              :width="1251"
                              :height="400"
                              :componentType="'coverImage'"
                            />
                          </v-card>
                          <span class="title3" style="color: #505050"
                            >Cover Image</span
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
                            <ImageComp
                              :singleImage="fullImage"
                              @stepper="winStepper"
                              :width="700"
                              :height="700"
                              :componentType="'fullImage'"
                            />
                          </v-card>
                          <span class="title3" style="color: #505050"
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
                            <ImageComp
                              :singleImage="upperImage"
                              @stepper="winStepper"
                              :width="700"
                              :height="700"
                              :componentType="'upperImage'"
                            />
                          </v-card>
                          <span class="title3" style="color: #505050"
                            >Upper deck / reception</span
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
                            <ImageComp
                              :singleImage="interiorImage"
                              @stepper="winStepper"
                              :width="700"
                              :height="700"
                              :componentType="'interiorImage'"
                            />
                          </v-card>
                          <span class="title3" style="color: #505050"
                            >Interior Image</span
                          >
                        </v-flex>
                      </v-layout>
                      <!-- <v-flex xs3 pb-2 text-center>
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
                               :height="'700'"
                              :width="'700'"
                              :componentType="'roomImage'"
                            />
                          </v-card>
                          <span
                            class="title3"
                            style="color: #505050"
                            >Rooms</span
                          >
                          <v-chip small v-if="roomImage">{{ roomImage.name }}</v-chip>
                        </v-flex> -->
                      <!-----------------------Room IMG--------------------------->
                      <v-layout wrap pt-2>
                        <v-flex xs12 sm3 pb-2 text-left>
                          <v-card
                            tile
                            @click="$refs.files2.click()"
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
                              ref="files2"
                              type="file"
                              @change="uploadImages2"
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
                            >Rooms</span
                          >
                        </v-flex>
                        <v-flex
                          xs12
                          sm3
                          v-for="(item, i) in imageArray2"
                          :key="i"
                        >
                          <v-img :src="item" height="80px" width="90px" contain>
                            <v-layout wrap>
                              <v-flex text-right pa-0>
                                <v-avatar color="#FF3434" size="15">
                                  <v-icon
                                    color="#FFF"
                                    small
                                    @click="removeImageArray2(i)"
                                  >
                                    mdi-close
                                  </v-icon>
                                </v-avatar>
                              </v-flex>
                            </v-layout>
                          </v-img>
                        </v-flex>
                      </v-layout>
                      <!-----------------------ADDITIONAL IMG--------------------------->
                      <v-layout wrap pt-2>
                        <v-flex xs12 sm3 pb-2 text-left>
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
                            >Additional Images</span
                          >
                        </v-flex>
                        <v-flex
                          xs12
                          sm3
                          v-for="(item, i) in imageArray"
                          :key="i"
                        >
                          <v-img :src="item" height="80px" width="90px" contain>
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
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                  <v-layout wrap justify-end>
                    <v-flex xs12 sm2>
                      <v-btn
                        @click="validation()"
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
    <v-dialog
      v-model="cropImageDialog2"
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
            <ImageCropper2
              :image="currentImage2"
              :key="currentImage2"
              :width="700"
              :height="700"
              @stepper="imageCropper2"
            />
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
  </div>
</template>
  <script>
import axios from "axios";
// import SingleImageComp from "./singleImage";
import ImageComp from "./singleImages";
import ImageCropper from "./imageCropper";
import ImageCropper2 from "./../../common/imageCropper2";
export default {
  components: {
    // SingleImageComp,
    ImageComp,
    ImageCropper,
    ImageCropper2,
  },
  data() {
    return {
      showSnackBar: false,
      timeout: 2000,
      ServerError: false,
      appLoading: false,
      data: [],
      msg: null,
      page: 1,
      limit: 20,
      nowDate: new Date().toISOString().slice(0, 10),
      houseBoatName: "",
      category: "",
      location: "",
      locationList: [],
      sublocation: "",
      sublocationList: [],
      airCondition: false,
      kettle: false,
      parking: false,
      restrooms: false,
      lifeJacket: false,
      wifi: false,
      television: false,
      fireextinguisher: false,
      powerbackup: false,
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
      coverImage: "",
      // roomImage: "",
      boatLicenseProof: "",
      attachments: null,
      leaseProof: "",
      attachments2: null,
      formData: new FormData(),
      imageArray: [],
      imageFiles: [],
      selectedFiles: null,
      currentImage: "",
      cropImageDialog: false,
      //
      imageArray2: [],
      currentImage2: "",
      cropImageDialog2: false,
      ImgselectedFiles2: "",
      roomImage: [],
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
      if (window_data.type == "fullImage") {
        this.fullImage = window_data.selectedFiles;
        console.log("fullImage is", this.fullImage);
      }
      if (window_data.type == "coverImage") {
        this.coverImage = window_data.selectedFiles;
        console.log("coverImage is", this.coverImage);
      }
      if (window_data.type == "upperImage") {
        this.upperImage = window_data.selectedFiles;
        console.log("upperImage is", this.upperImage);
      }
      if (window_data.type == "interiorImage") {
        this.interiorImage = window_data.selectedFiles;
        console.log("interiorImage is", this.interiorImage);
      }
      // if (window_data.type == "roomImage") {
      //   this.roomImage = window_data.selectedFiles;
      //   console.log("roomImage is", this.roomImage);
      // }
      // if (window_data.type == "roomImage") {
      //   this.imageArray2 = window_data.imageArray;
      //   this.imageFiles2.push(window_data.selectedFiles);
      // }
      // if (window_data.type == "image") {
      //   this.imageArray = window_data.imageArray;
      //   this.imageFiles.push(window_data.selectedFiles);
      // } else if (window_data.type == "imageRemoval") {
      //   var values = this.formData.getAll("photos");
      //   values.splice(window_data.removalItem, 1);
      //   this.formData.set("photos", values);
      //   this.imageArray = window_data.imageArray;
      // }
    },
    //rooms images
    uploadImages2(event) {
      if (this.imageArray2.length < 4) {
        this.currentImage2 = URL.createObjectURL(event.target.files[0]);
        this.cropImageDialog2 = true;
      } else {
        this.msg = "Maximum image limit exceeded!";
        this.showSnackBar = true;
        return;
      }
    },
    // removeImageArray2(i) {
    //   var values = this.formData.getAll("roomImage");
    //   values.splice(i, 1);
    //   this.formData.set("roomImage", values);
    //   this.imageArray2.splice(i, 1);
    // },
    removeImageArray2(i) {
      var values = this.formData.getAll("roomImage");
      values.splice(i, 1);

      // Remove the existing "roomImage" key from formData
      this.formData.delete("roomImage");

      // Re-append the modified array
      values.forEach((value, index) => {
        this.formData.append("roomImage", value, `roomImage${index + 1}`);
      });

      this.imageArray2.splice(i, 1);
    },
    imageCropper2(payload) {
      this.cropImageDialog2 = payload.dialog;
      if (payload.image) {
        this.collectImages2(payload.image);
      }
    },
    collectImages2(image) {
      this.ImgselectedFiles2 = image;
      // this.Images.append("image", this.ImgselectedFiles2);
      this.formData.append("roomImage", this.ImgselectedFiles2);
      var img = new Image();
      img.src = window.URL.createObjectURL(image);
      img.onload = () => {
        const urls = URL.createObjectURL(image);
        this.imageArray2.push(urls);
        if (this.imageArray2) {
          this.roomImage = this.imageArray2[0];
        }
      };
      console.log("ImgselectedFiles==", this.ImgselectedFiles2);
    },
    //additional images
    uploadImages(event) {
      if (this.imageArray.length < 4) {
        this.currentImage = URL.createObjectURL(event.target.files[0]);
        this.cropImageDialog = true;
      } else {
        this.msg = "Maximum image limit exceeded!";
        this.showSnackBar = true;
        return;
      }
    },
    removeImageArray(i) {
      var values = this.formData.getAll("propertyImages");
      values.splice(i, 1);

      // Remove the existing "propertyImages" key from formData
      this.formData.delete("propertyImages");

      // Re-append the modified array
      values.forEach((value, index) => {
        this.formData.append("propertyImages", value, `image${index + 1}`);
      });

      this.imageArray.splice(i, 1);
    },
    // removeImageArray(i) {
    //   var values = this.formData.getAll("propertyImages");
    //   values.splice(i, 1);
    //   this.formData.set("propertyImages", values);
    //   this.imageArray.splice(i, 1);
    // },
    imageCropper(payload) {
      this.cropImageDialog = payload.dialog;
      if (payload.image) {
        this.collectImages(payload.image);
      }
    },
    collectImages(image) {
      this.ImgselectedFiles = image;
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
      if (this.imageArray.length > 0) {
        for (var i = 0; i < this.imageFiles.length; i++)
          this.formData.append("propertyImages", this.imageFiles[i]);
      }
      this.formData.append("id", id);
      this.formData.append("coverImage", this.coverImage);
      this.formData.append("fullImage", this.fullImage);
      this.formData.append("upperImage", this.upperImage);
      this.formData.append("interiorImage", this.interiorImage);
      // this.formData.append("roomImage", this.roomImage);
      this.formData.append("boatLicenseProof", this.attachments);
      this.formData.append("leaseProof", this.attachments2);
      console.log("formData", this.formData);
      this.appLoading = true;
      axios({
        method: "post",
        url: "/houseboat/proofupload",
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("token"),
        },
        data: this.formData,
      }).then((response) => {
        this.appLoading = false;
        if (response.data.status == true) {
          this.formData = new FormData();
          this.fullImage = "";
          this.coverImage = "";
          this.upperImage = "";
          this.interiorImage = "";
          this.roomImage = "";
          this.attachments = "";
          this.attachments2 = "";
          this.imageFiles = [];
          this.imageArray = [];
          this.msg = response.data.msg;
          this.showSnackBar = true;
          this.$router.push("/Houseboats");
        } else {
          alert("failed to update cover image");
        }
      });
    },

    validation() {
      if (!this.category) {
        this.msg = "Please choose boat category";
        this.showSnackBar = true;
        return;
      } else if (!this.houseBoatName) {
        this.msg = "Please enter house boat name";
        this.showSnackBar = true;
        return;
      } else if (!this.totalRooms) {
        this.msg = "Please enter total rooms";
        this.showSnackBar = true;
        return;
      } else if (!this.location) {
        this.msg = "Please enter location";
        this.showSnackBar = true;
        return;
      } else if (!this.sublocation) {
        this.msg = "Please enter sub-location";
        this.showSnackBar = true;
        return;
      } else if (!this.expiryType) {
        this.msg = "Please choose expiry type";
        this.showSnackBar = true;
        return;
      } else if (!this.expiryDate) {
        this.msg = "Please enter expiry date";
        this.showSnackBar = true;
        return;
      } else if (!this.attachments) {
        this.msg = "Please upload boat licence proof";
        this.showSnackBar = true;
        return;
      } else if (!this.attachments2) {
        this.msg = "Please upload lease proof";
        this.showSnackBar = true;
        return;
      } else if (!this.coverImage) {
        this.msg = "Please upload cover image";
        this.showSnackBar = true;
        return;
      } else if (!this.fullImage) {
        this.msg = "Please upload full image";
        this.showSnackBar = true;
        return;
      } else {
        this.addBoat();
      }
    },
    addBoat() {
      this.appLoading = true;
      var facilities = {};
      facilities.airCondition = this.airCondition;
      facilities.kettle = this.kettle;
      facilities.parking = this.parking;
      facilities.restrooms = this.restrooms;
      facilities.lifeJacket = this.lifeJacket;
      facilities.wifi = this.wifi;
      facilities.television = this.television;
      facilities.fireextinguisher = this.fireextinguisher;
      facilities.powerbackup = this.powerbackup;
      facilities.swimmingPool = this.swimmingPool;

      axios({
        method: "POST",
        url: "/houseboat/add",
        data: {
          houseBoatName: this.houseBoatName,
          totalRooms: this.totalRooms,
          location: this.location,
          startingLocation: this.sublocation,
          category: this.category,
          expiryType: this.expiryType,
          expiryDate: this.expiryDate,
          facilities: facilities,
        },
        headers: {
          token: localStorage.getItem("token"),
        },
      }).then((response) => {
        this.appLoading = false;
        if (response.data.status == true) {
          this.msg = response.data.msg;
          this.showSnackBar = true;
          this.imageId = response.data.id;
          console.log("id=", this.imageId);
          if (this.imageId) {
            console.log("sdfghj");
            this.ImageUpload(this.imageId);
          } else {
            this.$router.push("/Houseboats");
          }
        } else {
          this.msg = response.data.msg;
          this.showSnackBar = true;
        }
      });
      // }
    },
    getData() {
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
          locationId: this.location,
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