<template>
  <div>
    <vue-element-loading
      :active="appLoading"
      :is-full-screen="true"
      background-color="#FFFFFF"
      color="#002635"
      spinner="bar-fade-scale"
    />
    <ServerError v-if="ServerError" />
    <v-snackbar v-model="showSnackbar" color="#f54c0c" right :timeout="timeout">
      <v-layout wrap justify-center>
        <v-flex text-left class="align-self-center">
          <span style="color: white">
            {{ msg }}
          </span>
        </v-flex>

        <v-flex text-right>
          <v-btn small :ripple="false" text @click="showSnackbar = false">
            <v-icon style="color: white">mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-snackbar>
    <v-layout wrap justify-center justify-sm-start>
      <v-flex xs12 align-self-center>
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
          >Gallery</span
        >
      </v-flex>
      <!-- <v-flex xs12 v-if="gallery" align-self-center>
                        <v-layout wrap justify-start v-if="gallery.length > 0">
                            <v-flex xs12 sm3 py-2 text-center v-for="(item,i) in gallery" :key="i">
                                
                            <div class="images" v-viewer >
                                <v-card elevation="0"  height="250px"
                                        width="250px" class="ma-1">
                                    <img :src="mediaUURL + item" style="object-fit: cover;" height="250px"
                                        width="250px" />
                                </v-card>
                            </div>
                            <v-btn  @click="(deleteialog=true),(deleteId=i)" class="mr-3"  small width="248px" color="#ff6200"><span
                          style="font-family: LexendFont;color: white;text-transform: none"
                          ><v-icon class="pb-1" small color="white">mdi-trash-can-outline</v-icon>Delete Image</span
                        ></v-btn>
                            </v-flex>
                            
                        </v-layout>
                    </v-flex> -->
      <v-flex xs9 sm10 v-if="gallery" align-self-center>
        <v-layout wrap justify-center v-if="gallery.length > 0">
          <v-flex xs12>
            <viewer :images="gallery" :key="gallery.length">
              <v-layout wrap>
                <v-flex
                  xs12
                  sm4
                  md3
                  v-for="(item, i) in gallery"
                  :key="i"
                  class="pa-1"
                >
                  <img
                    :src="mediaUURL + item"
                    style="object-fit: cover"
                    height="200px"
                    width="200px"
                  />
                  <v-btn
                    @click="(deleteialog = true), (deleteId = i)"
                    class="mr-3"
                    small
                    width="200px"
                    color="#ff6200"
                    ><span
                      style="
                        font-family: LexendFont;
                        color: white;
                        text-transform: none;
                      "
                      ><v-icon class="pb-1" small color="white"
                        >mdi-trash-can-outline</v-icon
                      >Delete Image</span
                    ></v-btn
                  >
                </v-flex>
              </v-layout>
            </viewer>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-dialog width="400px" v-model="deleteialog">
      <v-card width="400px" class="pa-2">
        <v-layout wrap justify-center>
          <v-flex xs11 text-center
            ><span style="color: #002635" class="dialogHead"
              >Delete</span
            ></v-flex
          >
          <v-flex xs1 text-right>
            <v-icon @click="deleteialog = false" color="#002635"
              >mdi-close-box</v-icon
            ></v-flex
          >
          <v-flex xs8 text-center py-4>
            <v-divider></v-divider>
          </v-flex>
        </v-layout>
        <v-card-text class="px-4 pb-0 dialogText text-center"
          >Are you sure you want to delete this image?
        </v-card-text>
        <v-card-actions class="pt-3">
          <v-spacer></v-spacer>
          <v-btn
            color="#002635"
            class="dialogText"
            dark
            @click="deleteImg(deleteId)"
            >OK</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import axios from "axios";
import "viewerjs/dist/viewer.css";
import VueViewer from "v-viewer";
import Vue from "vue";
Vue.use(VueViewer);
export default {
  data() {
    return {
      appLoading: false,
      ServerError: false,
      showSnackbar: false,
      timeout: 5000,
      msg: null,
      gallery: [],
      deleteId: "",
      deleteialog: false,
    };
  },
  beforeMount() {
    this.getData();
  },
  methods: {
    show() {
      this.$viewerApi({
        images: this.images,
      });
    },
    getData() {
      this.appLoading = true;
      axios({
        method: "POST",
        url: "/shikara/gallery",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          shikaraId: this.$route.query.id,
        },
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status == true) {
            this.gallery = response.data.data.propertyImages;
          } else {
            this.msg = response.data.msg;
            this.showSnackbar = true;
          }
        })
        .catch((err) => {
          this.appLoading = false;
          console.log(err);
          this.ServerError = true;
        });
    },
    deleteImg(deleteId) {
      this.appLoading = true;
      axios({
        url: "/shikara/removeimagesingle",
        method: "POST",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          position: deleteId,
          shikaraId: this.$route.query.id,
        },
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status == true) {
            this.msg = response.data.msg;
            this.snackbar = true;
            this.deleteId = "";
            this.deleteialog = false;
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
.delete-button {
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
}
</style>