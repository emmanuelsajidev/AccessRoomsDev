<template>
  <div>
 
      <v-layout wrap justify-center>
          <v-flex xs12 align-self-center text-center>
          <span
           style="font-family:LexendFont;font-size: 30px;font-weight: 400;"
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
        <!-- <v-flex xs12>
          <v-layout wrap>
            <v-flex xs12 sm5 md4 lg3 v-if="fullImage">
                          <viewer :images="fullImage" :key="i">
                            <v-layout wrap>
                              <v-flex xs12 class="pa-1" text-center>
                                  <img :src="mediaUURL + fullImage" style="object-fit: cover;" height="200px"
                                      width="270px" />
                                   
                     
                                      </v-flex>
                                    <v-flex xs12 align-self-start text-center>  <span
            class="title1"
            :style="{
              'font-size':
                $vuetify.breakpoint.name == 'xs'
                  ? '12x'
                  : $vuetify.breakpoint.name == 'sm'
                  ? '12x'
                  : $vuetify.breakpoint.name == 'md'
                  ? '15px'
                  : $vuetify.breakpoint.name == 'lg'
                  ? '15px'
                  : '16px',}"
            >Full Image</span></v-flex>
                                      </v-layout>
                          </viewer>
                          </v-flex>
                          <v-flex xs12 sm5 md4 lg3 v-if="interiorImage">
                          <viewer :images="interiorImage" :key="i">
                            <v-layout wrap>
                              <v-flex xs12 class="pa-1" text-center>
                                  <img :src="mediaUURL + interiorImage" style="object-fit: cover;" height="200px"
                                      width="270px" />
                                   
                     
                                      </v-flex>
                                    <v-flex xs12 align-self-start text-center>  <span
            class="title1"
            :style="{
              'font-size':
                $vuetify.breakpoint.name == 'xs'
                  ? '12x'
                  : $vuetify.breakpoint.name == 'sm'
                  ? '12x'
                  : $vuetify.breakpoint.name == 'md'
                  ? '15px'
                  : $vuetify.breakpoint.name == 'lg'
                  ? '15px'
                  : '16px',}"
            >Interior Image</span></v-flex>
                                      </v-layout>
                          </viewer>
                          </v-flex>
                          <v-flex xs12 sm5 md4 lg3 v-if="upperImage">
                          <viewer :images="upperImage" :key="i">
                            <v-layout wrap>
                              <v-flex xs12 class="pa-1" text-center>
                                  <img :src="mediaUURL + upperImage" style="object-fit: cover;" height="200px"
                                      width="270px" />
                                    
                     
                                      </v-flex>
                                    <v-flex xs12 align-self-start text-center>  <span
            class="title1"
            :style="{
              'font-size':
                $vuetify.breakpoint.name == 'xs'
                  ? '12x'
                  : $vuetify.breakpoint.name == 'sm'
                  ? '12x'
                  : $vuetify.breakpoint.name == 'md'
                  ? '15px'
                  : $vuetify.breakpoint.name == 'lg'
                  ? '15px'
                  : '16px',}"
            >Upper Deck / Reception</span></v-flex>
                                      </v-layout>
                          </viewer>
                          </v-flex>
          </v-layout>
        </v-flex> -->
        <v-flex xs12 sm11 md10 lg8 v-if="roomImage" align-self-center>
          <!-- <span v-if="roomImage.length > 0"
            class="title1"
            :style="{
              'font-size':
                $vuetify.breakpoint.name == 'xs'
                  ? '15x'
                  : $vuetify.breakpoint.name == 'sm'
                  ? '15x'
                  : $vuetify.breakpoint.name == 'md'
                  ? '18px'
                  : $vuetify.breakpoint.name == 'lg'
                  ? '18px'
                  : '20px',}"
            >Room Images</span>
            <v-divider></v-divider> -->
                      <v-layout wrap justify-center v-if="roomImage.length > 0" pt-2>
                        <v-flex xs8 sm12>
                          <viewer :images="roomImage" :key="roomImage.length">
                            <v-layout wrap>
                              <v-flex xs12 sm4 md3 v-for="(item,i) in roomImage" :key="i" class="pa-1">
                                  <img :src="mediaUURL + item" style="object-fit: cover;" height="200px"
                                      width="200px" />
                                    
                                      </v-flex>
                                      </v-layout>
                          </viewer>
                          </v-flex>
                      </v-layout>
                  </v-flex>
        <v-flex xs12 sm11 md10 lg8 v-if="gallery" align-self-center pt-4>
    
                      <v-layout wrap justify-center v-if="gallery.length > 0" pt-2>
                        <v-flex xs9 sm12>
                          <viewer :images="gallery" :key="gallery.length">
                            <v-layout wrap>
                              <v-flex xs12 sm4 md3 v-for="(item,i) in gallery" :key="i" class="pa-1">
                                  <img :src="mediaUURL + item" style="object-fit: cover;" height="200px"
                                      width="200px" />
                                      
                                      </v-flex>
                                      </v-layout>
                          </viewer>
                          </v-flex>
                      </v-layout>
                  </v-flex>
      </v-layout>
  </div>
</template>
<script>
import axios from "axios";
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
import Vue from 'vue'
Vue.use(VueViewer)
export default {
  data() {
      return {
          appLoading: false,
          ServerError: false,
          showSnackBar: false,
          timeout: 5000,
          msg: null,
          gallery: [],
          roomImage: [],
          interiorImage:"",
          fullImage:"",
          upperImage:"",
          deleteId:"",
          deleteialog:false,
          deleteId2:"",
          deleteialog2:false,
          deleteId3:"",
          deleteialog3:false,
      };
  },
  beforeMount() {
      this.getData();
  },
  methods: {
      show() {
      this.$viewerApi({
        images: this.images,
      })
    },
      getData() {
          this.appLoading = true;
          axios({
              method: "POST",
              url: "/houseboat/gallery",
              headers: {
        token: localStorage.getItem("token"),
      },
              data: {
                houseboatId: this.$route.query.id,
      },
          })
              .then((response) => {
                  this.appLoading = false;
                  if (response.data.status) {
                      this.gallery = response.data.data.propertyImages;
                      this.roomImage = response.data.data.roomImage;
                      this.interiorImage = response.data.data.interiorImage;
                      this.fullImage = response.data.data.fullImage;
                      this.upperImage = response.data.data.upperImage;
                  } else {
                      this.msg = response.data.msg;
                      this.showSnackBar = true;
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
      url: "/houseboat/removeimagesingle",
      method: "POST",
      headers: {
        token: localStorage.getItem("token"),
      },
      data: {
        position: deleteId,
        houseboatId:this.$route.query.id,
      },
    })
      .then((response) => {
        this.appLoading = false;
        if (response.data.status) {
          this.msg = response.data.msg;
        this.snackbar = true;
        this.deleteId="";
        this.deleteialog=false;
        this.getData();
        }
        else {
        this.msg = response.data.msg;
        this.snackbar = true;
      }
      })
      .catch((err) => {
        //   this.ServerError = true;
        console.log(err);
      });
  },
  deleteImg2(deleteId2) {
    this.appLoading = true;
    axios({
      url: "/houseboat/remove/roomimagesingle",
      method: "POST",
      headers: {
        token: localStorage.getItem("token"),
      },
      data: {
        position: deleteId2,
        houseboatId:this.$route.query.id,
      },
    })
      .then((response) => {
        this.appLoading = false;
        if (response.data.status) {
          this.msg = response.data.msg;
        this.snackbar = true;
        this.deleteId2="";
        this.deleteialog2=false;
        this.getData();
        }
        else {
        this.msg = response.data.msg;
        this.snackbar = true;
      }
      })
      .catch((err) => {
        //   this.ServerError = true;
        console.log(err);
      });
  },
  deleteImg3(deleteId3) {
    this.appLoading = true;
    axios({
      url: "/houseboat/remove/singleimage",
      method: "POST",
      headers: {
        token: localStorage.getItem("token"),
      },
      data: {
        type: deleteId3,
        houseboatId:this.$route.query.id,
      },
    })
      .then((response) => {
        this.appLoading = false;
        if (response.data.status) {
          this.msg = response.data.msg;
        this.snackbar = true;
        this.deleteId3="";
        this.deleteialog3=false;
        this.getData();
        }
        else {
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