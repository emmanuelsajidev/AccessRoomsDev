<template>
  <div>
  
      <v-layout wrap fill-height  justify-center>
          <v-flex xs12 md10 text-center><span style="font-family: LexendMedium;font-weight: 500;"
            :style="{'font-size': 
                   $vuetify.breakpoint.name == 'xs'
                  ? '25px'
                  : $vuetify.breakpoint.name == 'sm'
                  ? '25px'
                  : $vuetify.breakpoint.name == 'md'
                  ? '30px'
                  : $vuetify.breakpoint.name == 'lg'
                  ? '30px'
                  : '30px', }" data-aos="zoom-in-up" data-aos-ease="ease"
                  data-aos-duration="1500" data-aos-delay="500">Explore Our Finest Houseboats</span></v-flex>
          <v-flex xs12 md8 text-center><span style="font-family: LexendRegular;font-weight: 200;"
            :style="{'font-size': 
                   $vuetify.breakpoint.name == 'xs'
                  ? '14px'
                  : $vuetify.breakpoint.name == 'sm'
                  ? '14px'
                  : $vuetify.breakpoint.name == 'md'
                  ? '16px'
                  : $vuetify.breakpoint.name == 'lg'
                  ? '16px'
                  : '16px', }" data-aos="zoom-in-up" data-aos-ease="ease"
                  data-aos-duration="1500" data-aos-delay="500">
            Experience the epitome of houseboat luxury and hospitality, ensuring your getaway is truly unforgettable.
          </span></v-flex>
          <v-flex xs12  pt-8>
         
              <v-img
        src="./../assets/images/bg4.png" width="100%"  
                :height="$vuetify.breakpoint.name == 'xs' 
                  ? '400px' 
                  :$vuetify.breakpoint.name == 'sm'
                  ? '400px'
                  : $vuetify.breakpoint.name == 'md'
                  ? '400px'
                  : $vuetify.breakpoint.name == 'lg'
                  ? '400px': '600px'"
      >   <v-layout wrap fill-height justify-end mx-4>
          <v-flex xs12 sm11 pl-0 pl-md-8 pt-4  class="text-center" align-self-center v-if="flag==true" data-aos="slide-left" data-aos-ease="ease"
          data-aos-duration="1500" data-aos-delay="500">
          <OwlCarousel ref="carousel" :autoplay="true" :autoplayTimeout="5000" :loop="true"
          :nav="true" :dots="true" :responsive="owlResponsive" :lazyLoad="true" :autoplayHoverPause="true"
          :smartSpeed="1000" :mouseDrag="false" :touchDrag="true" :responsiveRefreshRate="200">
                    <template v-for="(item, i) in BoatList">
                    <v-layout wrap  :key="i">
                      <v-flex style="background-color: transparent;">
                     
                    <v-card  class="mx-2 pa-4"  elevation="0" style="border-radius: 10px;">
                      <v-layout wrap>
                        <v-flex xs12>
                         <v-card elevation="0"  width="330px" style="border-radius: 10px;" v-if="item">
                          <v-img height="150px"   :src="mediaUURL +item.coverImage" v-if="item.coverImage">
                            <template v-slot:placeholder>
                  <ImageLoader />
                </template></v-img>
                <v-img
                        height="100%"
                        v-else
                        src="./../assets/images/nophoto.jpg"
                        contain
                        ><template v-slot:placeholder>
                          <ImageLoader /> </template
                      ></v-img>
                         </v-card>
                        </v-flex>
                        <v-flex xs12 text-left px-2 pt-2  v-if="item">
                        <span style="font-family: LexendRegular;font-weight: 500;font-size: 16px;" v-if="item.houseBoatName"> {{ item.houseBoatName }}</span>
                        </v-flex>
                        <v-flex xs12 text-left px-2 v-if="item">
                     <span style="font-family: LexendRegular;font-weight: 500;font-size: 15px;" v-if="item.category"> {{ item.category }} </span>
                        </v-flex>
                        <v-flex xs12 text-left px-2 v-if="item">
                       <v-icon x-small color="black">mdi-bed-outline</v-icon> <span style="font-family: LexendRegular;font-weight: 500;font-size: 15px;" v-if="item.totalRooms"> {{ item.totalRooms }} Rooms</span>
                        </v-flex>
                        <!-- <v-flex xs12  md5 text-left pl-2>
                      <span style="font-family: LexendRegular;font-weight: 600;font-size: 20px;"> ₹{{ item.customerRate }}</span>
                      <br/> <span style="font-family: LexendRegular;font-weight: 400;font-size: 12px;">Per head rate</span>
                        </v-flex>
                        <v-flex xs12  md7 text-left text-md-right>
                          <v-btn  dark small style="border-radius: 10px;" color="rgba(255, 98, 0, 1)">
                                <span
                                  style="font-weight:500;font-size: 15px;font-family: LexendRegular;text-transform: none;">Book Now</span></v-btn>
                        </v-flex> -->
                      </v-layout>
                    </v-card>
                  </v-flex>
                    </v-layout>
                    </template>
                    </OwlCarousel>
           
          </v-flex> </v-layout>
        </v-img>
           
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
    pageContent: {},
    story: {},
    flag:false,
    owlResponsive: {
      0: { items: 1, nav: false },
      600: { items: 3, nav: false },
      960: { items: 3, nav: false },
      1264: { items: 4, nav: false },
    },
    icons: [
      {
        name: require("./../assets/images/img1.png"),
        title:"Houseboat Name1",
        price:1921,
      },
      {
        name: require("./../assets/images/img2.png"),
        title:"Houseboat Name1",
        price:1921,
      },
      {
        name: require("./../assets/images/img3.png"),
        title:"Houseboat Name1",
        price:1921,
      },
      {
        name: require("./../assets/images/img1.png"),
        title:"Houseboat Name1",
        price:1921,
      },
      {
        name: require("./../assets/images/img2.png"),
        title:"Houseboat Name1",
        price:1921,
      },
      {
        name: require("./../assets/images/img3.png"),
        title:"Houseboat Name1",
        price:1921,
      },
    ],
    BoatList:[],
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
        url: "/houseboat/booking/getlist",
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status) {
            this.BoatList = response.data.data;
            if (this.BoatList.length > 0) {
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