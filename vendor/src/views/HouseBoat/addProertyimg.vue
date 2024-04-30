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
      <v-flex xs12> </v-flex>
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
import SingleImageComp from "./singleImage";
// import ImageComp from "./multipleImages";
import ImageCropper from "./imageCropper";
export default {
  components: {
    SingleImageComp,
    // ImageComp,
    ImageCropper,
  },
  data() {
    return {
      showSnackBar: false,
      timeout: 2000,
      ServerError: false,
      appLoading: false,
      msg: null,
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
      imageArray: [],
      imageFiles: [],
      selectedFiles: null,
      currentImage: "",
      cropImageDialog: false,
    };
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