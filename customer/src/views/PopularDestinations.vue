<template>
  <div>
    <v-layout wrap fill-height py-8 justify-center>
      <v-flex xs12  text-center><span style="font-family: LexendMedium; font-weight: 500; font-size: 30px" data-aos="zoom-in-up" data-aos-ease="ease"
        data-aos-duration="1500" data-aos-delay="500">Popular 
          Destinations</span></v-flex>
      <v-flex xs12 md6 text-center><span style="font-family: LexendRegular; font-weight: 200; font-size: 16px" data-aos="zoom-in-down" data-aos-ease="ease"
        data-aos-duration="1500" data-aos-delay="500">
          Explore the enchanting beauty of Kerala with our guides to the most
          sought-after and popular destinations in 'God's Own Country'
        </span></v-flex>
      <v-flex xs12 sm11 md9 pt-4 class="text-center" v-if="flag" data-aos="slide-up" data-aos-ease="ease"
      data-aos-duration="1500" data-aos-delay="500">
        <OwlCarousel ref="carousel" v-show="allImagesLoaded" :autoplay="true" :autoplayTimeout="5000" :loop="true"
          :nav="true" :dots="true" :responsive="owlResponsive" :lazyLoad="true" :autoplayHoverPause="true"
          :smartSpeed="1000" :mouseDrag="false" :touchDrag="true" :responsiveRefreshRate="200">
          <template v-for="(item, i) in locationList">
            <v-flex :key="i" px-2 text-center>
              <v-layout wrap justify-center>
                <v-flex xs12>
                  <v-card class="image-card" height="250px" width="300px"
                    style="border-radius: 10px; position: relative; overflow: hidden;">
                    <v-img height="100%" width="100%" :src="mediaUURL + item.photo" :alt="item.name"
                      @load="checkAllImagesLoaded">
                      <template v-slot:placeholder>
                        <ImageLoader />
                      </template>
                      <div class="text-overlay">
                        <span class="title">{{ item.name }}</span><br />
                        <span class="description">{{ item.description }}</span>
                      </div>
                    </v-img>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
          </template>
        </OwlCarousel>
      </v-flex>






    </v-layout>
  </div>
</template>
<script>
  import OwlCarousel from 'vue-owl-carousel'
  import Vue from "vue";
  Vue.component('OwlCarousel', OwlCarousel)
  import axios from "axios";
  export default {
    data() {
      return {
        appLoading: false,
        ServerError: false,
        showSnackBar: false,
        timeout: 5000,
        msg: null,
        pageContent: {},
        story: {},
        flag: false,
        visible: true,
        owlResponsive: {
          0: { items: 1, nav: false },
          600: { items: 3, nav: false },
          960: { items: 3, nav: false },
          1264: { items: 3, nav: false },
        },
        locationList: [],
        allImagesLoaded: false
      };
    },
    watch: {
      locationList() {
        this.allImagesLoaded = false;
        this.$nextTick(() => {
          this.allImagesLoaded = true;
        });
      }
    },
    beforeMount() {
      this.getData();
    },
    methods: {
      checkAllImagesLoaded() {
  // Check if all images are loaded when an image is loaded
  const images = this.$refs.carousel.$el.querySelectorAll('.owl-item img');
  const loadedImages = Array.from(images).filter(img => img.complete);
  if (loadedImages.length === images.length) {
    this.allImagesLoaded = true;
  }
},
      getData() {
        this.appLoading = true;
        axios({
          method: "GET",
          url: "/gallery/list",
        })
          .then((response) => {
            this.appLoading = false;
            if (response.data.status) {
              this.locationList = response.data.data;
              if (this.locationList.length > 0) {
                this.flag = true;
              }
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
<style scoped>
  .text-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.6);
    /* Adjust the opacity as needed */
    border-radius: 0 0 10px 10px;
    color: white;
    font-family: LexendFont;
    font-weight: 400;
  }

  .title {
    font-size: 20px;
    /* Adjust the font size for title */
    display: block;
    font-family: LexendRegular;
  }

  .description {
    font-family: LexendRegular;
    font-size: 16px;
    /* Adjust the font size for description */
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    /* Limit the number of lines to show */
    -webkit-box-orient: vertical;
    line-height: 1.5;
    /* Set line height for better readability */
  }

  .image-card::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 70%;
    /* Adjust the height of the overlay */
    background-color: rgba(57, 54, 54, 0.3);
    /* Adjust the opacity and color as needed */
    z-index: 1;
    /* Ensure the overlay is above the image */
  }
</style>