<template>
  <div>
    <PageLoader v-bind:storage="appLoading" />
    <ServerError v-if="ServerError" />
    <v-snackbar v-model="showSnackBar" color="#FF1313" left :timeout="timeout">
      <v-layout wrap justify-center>
        <v-flex text-left class="align-self-center">{{ msg }}</v-flex>
        <v-flex text-right>
          <v-btn small :ripple="false" text @click="showSnackBar = false">
            <v-icon style="color: white">mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-snackbar>
    <v-layout wrap px-4 justify-end style="background-color: white">
      <v-flex xs2 sm2 md1 lg1 pl-lg-3 text-right>
        <v-btn small :ripple="false" text @click="closeSearch">
          <v-icon style="color: #red">mdi-close</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs12 text-left align-self-center>
        <v-layout wrap justify-center>
            <v-flex xs12 text-center>
                <span  style="font-family: LexendMedium;font-size:22px;color: rgba(255, 98, 0, 1);text-transform: uppercase;"> Refine Your Search {{queryPopUpDialog}}</span>
            </v-flex>
          <v-flex xs12 pt-4>
            <v-card color="transparent" elevation="0">
              <v-tabs
                v-model="myTab"
                background-color="transparent"
                color="rgba(255, 98, 0, 1)"
                left
              >
                <v-tab
                  :style="
                    myTab == 0
                      ? 'background-color:rgba(255, 98, 0, 1)'
                      : 'background-color:white'
                  "
                  style="border-top-left-radius: 10px"
                >
                  <v-icon
                    class="pr-1"
                    :style="myTab == 0 ? 'color:white' : 'color:black'"
                    >mdi-ferry</v-icon
                  >
                  <span
                    :style="myTab == 0 ? 'color:white' : 'color:black'"
                    style="
                      font-family: RobotoBold;
                      font-weight: 500;
                      font-size: 14px;
                    "
                    >Houseboat</span
                  ></v-tab
                >
                <v-tab
                  :style="
                    myTab == 1
                      ? 'background-color:rgba(255, 98, 0, 1)'
                      : 'background-color:white'
                  "
                  style="border-top-right-radius: 10px"
                >
                  <v-icon
                    class="pr-1"
                    :style="myTab == 1 ? 'color:white' : 'color:black'"
                    >mdi-sail-boat</v-icon
                  >
                  <span
                    :style="myTab == 1 ? 'color:white' : 'color:black'"
                    style="
                      font-family: RobotoBold;
                      font-weight: 500;
                      font-size: 14px;
                    "
                    >shikara</span
                  ></v-tab
                >

                <v-tab-item>
                  <SearchHouseBoat @stepper="winStepper2"  />
                </v-tab-item>
                <v-tab-item>
                  <SearchShikara @stepper="winStepper2" />
                </v-tab-item>
              </v-tabs>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import SearchHouseBoat from "./searchHouseBoat";
import SearchShikara from "./searchShikara";
import axios from "axios";
export default {
  components: {
    SearchHouseBoat,
    SearchShikara,
  },
  data() {
    return {
      appLoading: false,
      ServerError: false,
      showSnackBar: false,
      msg: null,
      timeout: 5000,
      name: null,
      email: null,
      phone: null,
      user: [],
      myTab: null,
      search: null,
    };
  },
  mounted() {
    this.getData();
  },
  watch: {
    myTab() {
      console.log("myTab in page=", this.myTab);
      // this.$store.commit("myTab",this.myTab);
      localStorage.setItem("myTab", this.myTab);
    },
  },
  methods: {
      winStepper2(windowData) {
      this.queryPopUpDialog = windowData.queryPopUpDialog;
        this.$emit("stepper", {
        dialog: false,
      });
    },
    getData() {
      this.appLoading = true;
      axios({
        method: "GET",
        url: "/location/list",
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status) {
            localStorage.removeItem("children");
            localStorage.removeItem("Hchildren");
            localStorage.removeItem("checkInDate");
            localStorage.removeItem("HcheckOutDate");
            localStorage.removeItem("Hroom");
            localStorage.removeItem("Htype");
            localStorage.removeItem("Hlocation");
            localStorage.removeItem("checkOutTime");
            localStorage.removeItem("Hadult");
            localStorage.removeItem("Hcategory");
            localStorage.removeItem("adult");
            localStorage.removeItem("HcheckInDate");
            localStorage.removeItem("Htriptype");
            localStorage.removeItem("location");
            localStorage.removeItem("checkInTime");
            this.locationList = response.data.data;
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
    closeSearch() {
      var d = new Date();
      let exp = 1 * 24 * 60 * 60 * 1000;
      d.setTime(d.getTime() + exp);
      var expDate = d.toUTCString();
      document.cookie =
        "search=" + "false" + ";expires=" + expDate + ";path=/";
      this.queryPopUpDialog = false;
      this.$emit("stepper", {
        dialog: false,
        msg: this.msg,
      });
    },
  },
};
</script>
<style>
.popuptitle {
  color: #000000;
  font-family: poppinsbold;
}
.popuptop {
  color: #000000;
  font-family: poppinsmedium;
}
.popupbottom {
  color: #000000;
  font-family: poppinsmedium;
}
.subscribeinput .v-input__append-inner {
  margin-top: 0px !important;
}
.subscribeinput .v-input__slot {
  padding-right: 0px !important;
}

.subscribeinput.v-text-field--outlined,
.v-text-field--solo {
  border-radius: 0px !important;
}
.subscribeinput.v-text-field--outlined {
  border-radius: 0px !important;
}
</style>
