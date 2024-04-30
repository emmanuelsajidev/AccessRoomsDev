<template>
  <div>
  
      <v-layout wrap fill-height  justify-center pt-8 px-2 px-md-0>
          <v-flex xs12 text-center><span style="font-family: LexendMedium;font-weight: 500;"
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
                  data-aos-duration="1500" data-aos-delay="500">Hear What Our Guests Love About Their Houseboat Escapes</span></v-flex>
          <v-flex xs12 sm10 md6 text-center><span style="font-family: LexendRegular;font-weight: 200;"
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
            Genuine insights from fellow travelers as they share their firsthand experiences, ensuring you make informed decisions for your perfect houseboat getaway.</span></v-flex>
          <v-flex xs12>
         
              <v-img
        src="./../assets/images/bg1.png" width="100%"  :height="$vuetify.breakpoint.name == 'xs' 
                  ? '1000px' 
                  :$vuetify.breakpoint.name == 'sm'
                  ? '400px'
                  : $vuetify.breakpoint.name == 'md'
                  ? '360px'
                  : $vuetify.breakpoint.name == 'lg'
                  ? '400px': '600px'"
      >  
       <v-layout wrap fill-height justify-center mx-4>
          <v-flex xs12 lg9 pt-2  class="text-center" align-self-start data-aos="zoom-in-up" data-aos-ease="ease"
          data-aos-duration="1500" data-aos-delay="500">
            <v-layout wrap>
              <v-flex xs12 sm4 md4 px-2 py-2 v-for="(item,i) in allreviews" :key="i">
                <v-card elevation="1" style="border-radius: 20px;" class="pa-6 tstc">
                  <v-layout wrap>
                    <v-flex xs12 pt-2 text-left > <v-rating
      v-model="item.rating"
      background-color="rgba(241, 115, 67, 1)"
      color="rgba(241, 115, 67, 1)"
      small
    ></v-rating></v-flex>
              <v-flex xs12 pt-2 px-2 text-left >
                <span style="font-family: LexendFont;font-weight: 500;font-size: 16px;"> {{ truncateText(item.comment, 35) }}</span>
              </v-flex>
              </v-layout>
              <v-layout wrap pt-6 justify-center>
                <v-flex xs2 pt-1>
                  <!-- <v-img contain :src="item.photo">
                            <template v-slot:placeholder>
                  <ImageLoader />
                </template></v-img> -->
                <v-img contain src="./../assets/images/user.jpg">
                            <template v-slot:placeholder>
                  <ImageLoader />
                </template></v-img>
                </v-flex>
                <v-flex xs9 px-2 text-left align-self-center style="line-height: 15px;">
                  <span style="font-family: LexendFont;font-weight: 700;font-size: 14px;">{{ item.user.name }}</span><br/>
                  <!-- <span style="font-family: LexendFont;font-weight: 400;font-size: 14px;">{{ item.place }}</span> -->
                </v-flex>
              </v-layout>
                </v-card>
              </v-flex>
            </v-layout>
       
          </v-flex> 
          <!-- <v-flex xs12 sm11 md9 pt-4 class="text-center">
              <OwlCarousel
                :autoplay="true"
                :loop="true"
                autoplaySpeed="1000"
                :nav="true"
                :dots="true"
                :responsive="owlResponsive"
              >
              
                <template v-for="(item, i) in reviews">
                  <v-flex px-2 :key="i" text-center>
                    <v-layout wrap justify-center>
                      <v-flex xs12>
                        <v-card elevation="1" style="border-radius: 20px;" class="pa-6 tstc">
                  <v-layout wrap>
                    <v-flex xs12 pt-2 text-left > <v-rating
      v-model="item.rating"
      background-color="rgba(241, 115, 67, 1)"
      color="rgba(241, 115, 67, 1)"
      small
    ></v-rating></v-flex>
              <v-flex xs12 pt-2 px-2 text-left >
                <span style="font-family: LexendFont;font-weight: 500;font-size: 16px;">{{ item.desc }}</span>
              </v-flex>
              </v-layout>
              <v-layout wrap pt-6 justify-center>
                <v-flex xs2 pt-1>
                  <v-img contain :src="item.photo">
                            <template v-slot:placeholder>
                  <ImageLoader />
                </template></v-img>
                </v-flex>
                <v-flex xs9 px-2 text-left align-self-center style="line-height: 15px;">
                  <span style="font-family: LexendFont;font-weight: 700;font-size: 14px;">{{ item.name }}</span><br/>
                  <span style="font-family: LexendFont;font-weight: 400;font-size: 14px;">{{ item.place }}</span>
                </v-flex>
              </v-layout>
                </v-card>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </template>
              </OwlCarousel>
             
            </v-flex> -->
        </v-layout>
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
    owlResponsive: {
        0: { items: 1, nav: false },
        600: { items: 3, nav: false },
        960: { items: 3, nav: false },
        1264: { items: 3, nav: false },
      },
      allreviews:[],
    reviews: [
      {
        place:"test place",
        photo: require("./../assets/images/user.png"),
        name:"User New",
        rating:5,
        desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna"
      },
      {
        place:"test place",
        photo: require("./../assets/images/user.png"),
        name:"User New",
        rating:5,
        desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna"
      },
      {
        place:"test place",
        photo: require("./../assets/images/user.png"),
        name:"User New",
        rating:5,
        desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna"
      }
    ],
  };
},
computed: {
    appLogin() {
      return this.$store.state.isLoggedIn;
    },
  },
mounted() {
  this.getData();
  },
methods: {
  truncateText(text, limit) {
      const words = text.split(' ');
      if (words.length > limit) {
        return words.slice(0, limit).join(' ') + '...';
      } else {
        return text;
      }
    },
  getData() {
    this.appLoading = true;
    var headers1 = {};
        if (this.appLogin) {
          headers1 = {
            token: localStorage.getItem("token"),
          };
        }
         else
          headers1 = {
            guestid: localStorage.getItem("guestId"),
          };
    axios({
      headers: headers1,
      method: "GET",
      url: "/review/all",
    })
      .then((response) => {
        this.appLoading = false;
        if (response.data.status) {
          this.allreviews = response.data.data;
        
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