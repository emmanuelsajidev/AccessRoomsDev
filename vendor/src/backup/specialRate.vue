<template>
  <div>
    <!-- <vue-element-loading
      :active="appLoading"
      :is-full-screen="true"
      background-color="#FFFFFF"
      color="#002635"
      spinner="bar-fade-scale"
    />
    <ServerError v-if="ServerError" />
    <v-snackbar
        v-model="showsnackbar"
      color="#f54c0c"
      right
      :timeout="timeout"
    >
      <v-layout wrap justify-center>
        <v-flex text-left class="align-self-center">
          <span style="color: white">
            {{ msg }}
          </span>
        </v-flex>

        <v-flex text-right>
          <v-btn small :ripple="false" text @click="showsnackbar = false">
            <v-icon style="color: white">mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-snackbar> -->
    <v-layout wrap justify-start>
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
          >{{ $route.query.name }}</span
        >
      </v-flex>
    </v-layout>
    <v-layout wrap justify-space-around pt-0 pt-sm-2>
      <v-flex xs12>
        <v-card tile class="pa-4 pa-sm-6"
          >Special rate-{{ this.choosedDay2.dateFormat }}
          <vue-horizontal-calendar
            style="width: 410px; height: 90px; margin: 0 auto"
            swipeSpace="7"
            choosedDate="2019/12/01"
            v-on:change="dateChange2"
            lang="en"
          ></vue-horizontal-calendar>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import VueHorizontalCalendar from "vue-horizontal-calendar";
// import VueInlineCalendar from 'vue2-inline-calendar'
import axios from "axios";
export default {
  components: {
    VueHorizontalCalendar,
  },
  data() {
    return {
      appLoading: false,
      ServerError: false,
      showSnackBar: false,
      timeout: 5000,
      msg: null,
      selectedDate: null,
      choosedDay2: {
        dateFormat: "",
        year: "",
        month: "",
        date: "",
        day: "",
        timestamp: "",
      },
    };
  },
  // beforeMount() {
  //     this.getData();
  // },
  methods: {
    dateChange2(day) {
      this.choosedDay2 = day;
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
          if (response.data.status == true) {
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