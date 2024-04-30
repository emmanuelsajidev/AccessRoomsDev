<template>
    <div>
        <v-layout wrap fill-height py-8 justify-center px-4 px-md-0>
            <v-flex xs12 sm6 md4 text-center>
              <v-img
              :src="require('./../assets/images/bg2.png')"
              height="100%"
            ></v-img>
            </v-flex>
            <v-flex xs12 sm6 text-center px-0 px-sm-2 px-md-8>
             <v-layout wrap>
              <v-flex xs12 text-left><span style="font-family: playfair;font-weight: 500;"
                :style="{'font-size': 
                   $vuetify.breakpoint.name == 'xs'
                  ? '25px'
                  : $vuetify.breakpoint.name == 'sm'
                  ? '25px'
                  : $vuetify.breakpoint.name == 'md'
                  ? '30px'
                  : $vuetify.breakpoint.name == 'lg'
                  ? '30px'
                  : '30px', }">
                Immerse Yourself in Tranquil Houseboat Escapes in Kerala</span></v-flex>
                <v-flex xs12 text-left style="text-align: justify!important;"><span style="font-family: playfair;font-weight: 400;font-size: 18px;text-align: justify!important;">
                {{ description.content }}</span></v-flex>
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
      description:{},
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
        url: "/aboutus/view",
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status) {
            this.description = response.data.aboutus;
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