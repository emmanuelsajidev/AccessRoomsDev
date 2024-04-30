<template>
  <div>
    <v-snackbar v-model="showSnackBar" color="#68D389" right :timeout="timeout">
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
    <v-layout wrap>
      <v-flex xs12 align-self-center>
        <v-card
         
          tile
          elevation="0"
          color="#ED7243"
          class="mr-4"
          height="80px"
          width="90px"
          @click="$refs.files.click()"
        >
        <v-layout wrap fill-height  v-if="!singleImage && !resultImage">
                              <v-flex xs12 align-self-center text-center>
                                <v-icon color="white"
                                  >mdi-plus-circle-outline</v-icon
                                >
                              </v-flex>
                            </v-layout>
                            <v-img
                v-if="singleImage && !resultImage"
                :src="mediaUURL + singleImage"
                
                height="80px"
          width="90px"
              ></v-img>
              <v-img v-else :src="resultImage"  height="80px"
          width="90px"> </v-img>
          <v-dialog
            v-model="isCropper"
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
            <v-card class="pb-3">
              <v-card-title class="headline">
                <v-layout wrap>
                  <v-flex md12>
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
                  <v-flex xs4  md3>
                    <v-btn
                      small
                      :ripple="false"
                      color="#68D389"
                      class="py-2 px-5"
                      @click="cropImage"
                    >
                      <span style="color: #ffffff; font-family: poppinsregular"
                        >Crop</span
                      ></v-btn
                    >
                  </v-flex>
                  <v-flex  xs8 md3>
                    <v-btn
                      small
                      :ripple="false"
                      color="#68D389"
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
          <!-- <v-layout wrap justify-space-between pa-4>
            <v-flex xs12 md9 pa-1>
              <v-img
                v-if="singleImage && !resultImage"
                :src="mediaUURL + singleImage"
                contain
                height="50px"
              ></v-img>
              <v-img v-else :src="resultImage" contain height="50px"> </v-img>
            </v-flex>
            <v-flex
              v-if="singleImage || resultImage"
              xs12
              md3
              align-self-center
            >
              <v-layout wrap justify-center>
                <v-flex xs12 pa-2>
                  <v-btn
                    block
                    depressed
                    :ripple="false"
                    @click="$refs.files.click()"
                  >
                    <span
                      style="
                        font-size: 12px;
                        text-align: end;
                        letter-spacing: 0px;
                        color: #000000;
                        opacity: 1;
                      "
                    >
                      UPLOAD NEW
                    </span>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout> -->
        </v-card>
        <input
          v-show="false"
          accept="image/*"
          id="file1"
          ref="files"
          type="file"
          @change="browseImage"
        />
      </v-flex>
    </v-layout>
  </div>
</template>
  <script>
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
export default {
  props: [
    "singleImage",
    "pageId",
    "height",
    "width",
    "heading",
    "componentType",
  ],
  components: {
    Cropper,
  },
  data() {
    return {
      image: null,
      resultImage: null,
      imageArray: [],
      showSnackBar: false,
      msg: null,
      timeout: 5000,
      isCropper: false,
      photos: [],
    };
  },

  methods: {
    cropImage() {
      var imageData = this.dataURLtoFile(
        this.$refs.cropper.getResult().canvas.toDataURL("image/jpeg", 0.8),
        "myimage.jpg"
      );
      console.log("imageData", imageData);
      this.resultImage = URL.createObjectURL(imageData);
      console.log("componentType==",this.componentType)
      this.isCropper = false;
      this.$emit("stepper", {
        type: this.componentType,
        selectedFiles: imageData,
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
    browseImage(event) {
      var img;
      img = new Image();
      img.src = window.URL.createObjectURL(event.target.files[0]);
      var ty = event.target.files[0];
      if (ty.size > 3145728) {
        this.msg = "File size Should be less than 3MB";
        this.showSnackBar = true;
        return;
      } else {
        img.onload = () => {
          this.isCropper = true;
          this.image = URL.createObjectURL(event.target.files[0]);
        };
      }
    },
  },
};
</script>
                