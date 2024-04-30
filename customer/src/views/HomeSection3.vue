<template>
  <div>
    <v-layout wrap fill-height py-2 justify-center px-4 px-md-0>
      <!-- <v-flex xs12 sm6 md4 text-center>
              <v-img
              :src="require('./../assets/images/bg2.png')"
              height="100%"
            ></v-img>
            </v-flex> -->
      <v-flex xs12 text-center px-0 px-sm-2 px-md-8 data-aos="fade-left" data-aos-delay="100">
        <v-layout wrap justify-center>
          <v-flex xs12 text-center pb-4
            ><span
              style="font-family: LexendMedium; font-weight: 500"
              :style="{
                'font-size':
                  $vuetify.breakpoint.name == 'xs'
                    ? '25px'
                    : $vuetify.breakpoint.name == 'sm'
                    ? '25px'
                    : $vuetify.breakpoint.name == 'md'
                    ? '30px'
                    : $vuetify.breakpoint.name == 'lg'
                    ? '30px'
                    : '30px',
              }"
            >
              Immerse Yourself in Tranquil Houseboat Escapes in Kerala</span
            ></v-flex
          >
          <!-- <v-flex xs12 text-left style="text-align: justify !important"> -->
            <v-flex xs12 sm9 xl6 style="z-index: 1" text-center>
               <!-- <center>
                <div> -->
                  <iframe
                    :height="
                      $vuetify.breakpoint.name == 'xs'
                        ? '290px'
                        : $vuetify.breakpoint.name == 'sm'
                        ? '400px'
                        : $vuetify.breakpoint.name == 'md'
                        ? '300px'
                        : $vuetify.breakpoint.name == 'xl'
                        ? '500px'
                        : $vuetify.breakpoint.name == 'lg'
                        ? '440px'
                        : '440px'
                    "
                    :width="
                      $vuetify.breakpoint.name == 'xs'
                        ? '290px'
                        : $vuetify.breakpoint.name == 'sm'
                        ? '590px'
                        : $vuetify.breakpoint.name == 'md'
                        ? '450px'
                        : $vuetify.breakpoint.name == 'xl'
                        ? '1000px'
                        : $vuetify.breakpoint.name == 'lg'
                        ? '680px'
                        : '680px'
                    "
                     :src="
                     'https://www.youtube.com/embed/' + videoLink + '?rel=0'
                    "
                    frameborder="1"
                    allowfullscreen
                    ng-show="showvideo"
                  ></iframe>
                <!-- </div>
              </center> -->
              </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      appLoading: false,
      ServerError: false,
      showSnackBar: false,
      timeout: 5000,
      msg: null,
      // description: {},
      videoLink:"",
    };
  },
  beforeMount() {
    this.getData();
  },
  methods: {
    getData() {
      this.appLoading = true;
      axios({
        method: "GET",
        // url: "/aboutus/view",
        url: "/homepage/videolink/list",
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status) {
            // this.description = response.data.aboutus;
            this.videoLink = response.data.data.link;
          } else {
            this.msg = response.data.msg;
            this.showsnackbar = true;
          }
        })
        .catch((err) => {
          this.appLoading = false;
          console.log(err);
          this.ServerError = true;
        });
    },
  },
};
</script>
<style>
</style>