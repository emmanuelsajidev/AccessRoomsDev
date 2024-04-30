<template>
  <div>
    <v-snackbar v-model="showSnackBar" color="#FDAC53" right :timeout="timeout">
      <v-layout wrap justify-center>
        <v-flex text-left class="align-self-center">
          <span style="color: #ffffff">
            {{ msg }}
          </span>
        </v-flex>
        <v-flex text-right>
          <v-btn small :ripple="false" text @click="showSnackBar = false">
            <v-icon style="color: #ffffff">mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-snackbar>
    <v-layout>
      <v-flex xs12 md3 align-self-center>
        <v-card  tile
                            elevation="0"
                            color="#ED7243"
                            class="mr-4"
                            height="80px"
                            width="90px"  @click="$refs.files.click()">
          <v-layout wrap fill-height>
                              <v-flex xs12 align-self-center text-center>
                                <v-icon color="white"
                                  >mdi-plus-circle-outline</v-icon
                                >
                              </v-flex>
                            </v-layout>
          <v-dialog
            v-model="isCropper"
            persistent
            :width="
              $vuetify.breakpoint.name == 'xs' ||
              $vuetify.breakpoint.name == 'sm'
                ? '100vw'
                : $vuetify.breakpoint.name == 'md'
                ? '80vw'
                : $vuetify.breakpoint.name == 'lg'
                ? '50vw'
                : '40vw'
            "
          >
            <v-card class="pb-3">
              <v-card-title class="headline">
                <v-layout wrap>
                  <v-flex md3 xs3>
                    <span> Crop Image</span>
                  </v-flex>
                  <v-flex text-right>
                    <v-btn
                      small
                      :ripple="false"
                      text
                      @click="isCropper = false"
                    >
                      <v-icon style="color: #red">mdi-close</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-card-title>
              <Cropper
                ref="cropper"
                :stencil-props="{
                  aspectRatio: width / height,
                }"
                class="example-cropper"
                :src="image"
              />
              <v-card-actions>
                <v-layout wrap justify-center pt-3>
                  <v-flex xs3 md2>
                    <v-btn
                      small
                      :ripple="false"
                      color="#FDAC53"
                      class="py-2 px-5"
                      @click="cropImage"
                    >
                      <span style="color: #ffffff; font-family: poppinsregular"
                        >Crop</span
                      ></v-btn
                    >
                  </v-flex>
                  <v-flex md3 xs3>
                    <v-btn
                      small
                      :ripple="false"
                      color="#FDAC53"
                      class="py-2 px-3"
                      @click="$refs.files.click()"
                    >
                      <span style="color: #ffffff; font-family: poppinsregular"
                        >Change Image</span
                      ></v-btn
                    >
                  </v-flex>
                </v-layout>
              </v-card-actions>
            </v-card>
          </v-dialog>
         
        </v-card>
        <span
                            class="title3"
                            style="color: rgba(80, 80, 80, 1)"
                            >Add more images</span
                          >
        <input
          v-show="false"
          accept="image/*"
          id="file"
          ref="files"
          type="file"
          @change="browseImages"
          multiple="multiple"
        />
      </v-flex>
    <!-- </v-layout> 
    <v-layout wrap pa-2> -->
            <template v-if="imageArray.length > 0">
              <v-flex xs3 v-for="(item, index) in imageArray" :key="index">
                <v-badge
                  icon="mdi-check-circle-outline"
                  overlap
                  background-color="green"
                >
                  <template slot="badge">
                    <v-icon
                      @click="removeImageArray2(index)"
                      small
                      pa-0
                      py-0
                      px-0
                      color="#FFFFFF"
                      style="font-size: 15px; text-align: right"
                      >mdi-close-circle-outline</v-icon
                    >
                  </template>
                  <div v-viewer style="display: flex">
                    <img
                      :src="item"
                      style="cursor: pointer"
                      width="90px"
                      height="80px"
                    />
                  </div>
                </v-badge>
              </v-flex>
            </template>
            <!-- <template v-if="photos">
              <v-flex xs2 v-for="(item, index) in photos" :key="index">
                <v-badge icon="mdi-check-circle-outline" overlap id="myIcon">
                  <template slot="badge">
                    <v-dialog v-model="item.delete" max-width="600px">
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          small
                          pa-0
                          py-0
                          px-0
                          v-on="on"
                          v-bind="attrs"
                          color="#FFFFFF"
                          style="font-size: 15px"
                          >mdi-trash-can-outline</v-icon
                        >
                      </template>
                      <v-card>
                        <v-card-title
                          >Are you sure you want to delete this
                          Photo?</v-card-title
                        >
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="item.delete = false"
                            >Cancel</v-btn
                          >
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="removeImageArray(pageId, index)"
                            >OK</v-btn
                          >
                          <v-spacer></v-spacer>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </template>
                  <div v-viewer style="display: flex">
                    <img
                      :src="mediaURL + item.image"
                      style="cursor: pointer"
                      width="50px"
                      height="50px"
                    />
                  </div>
                </v-badge>
              </v-flex>
            </template> -->
          </v-layout>
  </div>
</template>
<script>
import axios from "axios";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
export default {
  props: ["photos", "pageId", "height", "width", "heading"],
  components: {
    Cropper,
  },
  data() {
    return {
      image: null,
      imageArray: [],
      showSnackBar: false,
      msg: null,
      timeout: 5000,
      isCropper: false,
    };
  },

  methods: {
    cropImage() {
      var imageData = this.dataURLtoFile(
        this.$refs.cropper.getResult().canvas.toDataURL("image/jpeg", 0.3),
        "myimage.jpg"
      );
      var myresult = URL.createObjectURL(imageData);
      this.imageArray.push(myresult);
      this.isCropper = false;

      this.$emit("stepper", {
        type: "image",
        selectedFiles: imageData,
        imageArray: this.imageArray,
      });
    },
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    browseImages(event) {
      var img;
      img = new Image();
      img.src = window.URL.createObjectURL(event.target.files[0]);
      var ty = event.target.files[0];
      if (ty.size > 33145728) {
        this.msg = "File size Should be less than 31MB";
        this.showSnackBar = true;
        return;
      } else {
        img.onload = () => {
          this.isCropper = true;
          this.image = URL.createObjectURL(event.target.files[0]);
        };
      }
    },
    removeImageArray(value, index) {
      if (value != null) {
        var data = {};
        data["programme"] = value;
        data["position"] = index + 1;
        axios({
          method: "post",
          url: "/programme/removephoto",
          data: data,
          headers: {
            token: localStorage.getItem("token"),
          },
        }).then((response) => {
          if (response.data.status) {
            this.$emit("stepper", {
              type: "imageDeletion",
              response: response.data,
            });
          }
        });
      } else {
        this.imageArray.splice(index, 1);
        this.$emit("stepper", {
          type: "imageRemoval",
          imageArray: this.imageArray,
          removalItem: index,
        });
      }
    },
    removeImageArray2(index) {
    // Check if imageArray is null or undefined
    if (!this.imageArray || !Array.isArray(this.imageArray)) {
      return;
    }

    // Check if the index is valid
    if (index >= 0 && index < this.imageArray.length) {
      // Remove the image at the given index from the imageArray
      this.imageArray.splice(index, 1);

      // Create an array to store the updated selected files
      const updatedSelectedFiles = this.imageArray.map(imageUrl => {
        return this.dataURLtoFile(imageUrl, "myimage.jpg");
      });

      // Emit the updated imageArray and selectedFiles
      this.$emit("stepper", {
        type: "image",
        selectedFiles: updatedSelectedFiles,
        imageArray: this.imageArray,
      });
    }
  },
  },
};
</script>