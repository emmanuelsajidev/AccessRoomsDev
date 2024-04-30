<template>
  <div>
    <vue-element-loading
      :active="appLoading"
      :is-full-screen="true"
      background-color="#FFFFFF"
      color="#182444"
      spinner="bar-fade-scale"
    />
    <ServerError v-if="ServerError" />
    <v-snackbar v-model="snackbar" color="#ff6200" right top timeout="2000">
      <v-layout wrap justify-center>
        <v-flex text-left class="align-self-center">
          <span style="color: white">
            {{ msg }}
          </span>
        </v-flex>

        <v-flex text-right>
          <v-btn small :ripple="false" text @click="snackbar = false">
            <v-icon style="color: white">mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-snackbar>
    <v-layout wrap justify-center pa-4>
      <v-flex xs12>
        <v-layout wrap justify-start py-2>
          <v-flex xs12 sm6 align-self-center>
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
            ></v-flex
          >
        </v-layout>
        <v-layout wrap justify-space-around pt-2>
          <v-flex xs12>
            <v-card tile class="pa-8" elevation="0">
              <v-layout wrap justify-start>
                <v-flex xs12 sm6>
                  <v-layout wrap justify-center>
                    <!-- <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">Pick up Location</span>
                      <v-text-field
                        dense
                        outlined
                        type="text"
                        v-model="pickUpLocation"
                        :rules="[rules.required]"
                        hide-details="auto"
                      >
                      </v-text-field>
                    </v-flex> -->
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">Maximum Capacity</span>
                      <v-text-field
                        dense
                        outlined
                        type="number"
                        hide-spin-buttons
                        v-model="maxCapacityOfBoat"
                        :rules="[rules.required]"
                        hide-details="auto"
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">Minimum Hours</span>
                      <v-text-field
                        dense
                        outlined
                        type="number"
                        hide-spin-buttons
                        v-model="minimumHour"
                        :rules="[rules.required]"
                        hide-details="auto"
                      >
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-layout wrap justify-center>
                    <!-- <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">Drop Location</span>
                      <v-text-field
                        dense
                        outlined
                        type="text"
                        v-model="dropLocation"
                        :rules="[rules.required]"
                        hide-details="auto"
                      >
                      </v-text-field>
                    </v-flex> -->
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">Minimum Capacity</span>
                      <v-text-field
                        dense
                        outlined
                        type="number"
                        hide-spin-buttons
                        v-model="minCapacityOfBoat"
                        :rules="[rules.required]"
                        hide-details="auto"
                      >
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout wrap justify-center pt-16>
                    <v-flex xs12 sm10 align-self-end text-right pt-0 pt-sm-10>
                      <v-btn
                        @click="validation()"
                        width="150px"
                        class="btnstly"
                        style="cursor: pointer"
                        ><span
                          style="font-family: LexendFont; text-transform: none"
                          >Next</span
                        ></v-btn
                      >
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card>
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
      snackbar: false,
      timeout: 2000,
      ServerError: false,
      appLoading: false,
      data: [],
      msg: null,
      page: 1,
      limit: 20,
      houseBoatId: "",
      tripType: "",
      minCapacityOfBoat: "",
      maxCapacityOfBoat: "",
      pickUpLocation: "",
      dropLocation: "",
      minimumHour: "",
      welcomeDrink: false,
      lunch: false,
      teaOrsnacks: false,
      dinner: false,
      breakfast: false,
      menu2: false,
      menu3: false,
      menu4: false,
      menu5: false,
      menu6: false,
      menu7: false,
      menu8: false,
      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) => value.length <= 20 || "Max 20 characters",

        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
      pinRules: [
        (v) => !!v || "PIN is required",
        (v) => (v && v.length === 6) || "PIN must be 6 digits",
      ],
    };
  },
  // mounted() {
  //   this.getData();
  // },
  methods: {
    validation() {
      if (!this.maxCapacityOfBoat) {
        this.msg = "Please add max capacity";
        this.snackbar = true;
        return;
      } else if (!this.minCapacityOfBoat) {
        this.msg = "Please add min capacity";
        this.snackbar = true;
        return;
      } else if (!this.minimumHour) {
        this.msg = "Please enter min hours";
        this.snackbar = true;
        return;
      } else {
        this.add();
      }
    },
    add() {
      this.appLoading = true;
      axios({
        method: "POST",
        url: "/shikara/trip/add",
        data: {
          maxCapacityOfBoat: this.maxCapacityOfBoat,
          minCapacityOfBoat: this.minCapacityOfBoat,
          // pickUpLocation: this.pickUpLocation,
          // dropLocation: this.dropLocation,
          minimumHour: this.minimumHour,
          shikaraId: this.$route.query.id,
        },
        headers: {
          token: localStorage.getItem("token"),
        },
      }).then((response) => {
        this.appLoading = false;
        if (response.data.status == true) {
          this.msg = response.data.msg;
          this.snackbar = true;
          var tripId = response.data.data._id;
          console.log("tripId=", tripId);
          this.$router.push(
            "/AddShikaraSeasonalRate?name=" +
              this.$route.query.name +
              "&&id=" +
              tripId
          );
        } else {
          this.msg = response.data.msg;
          this.snackbar = true;
        }
      });
      // }
    },
  },
};
</script>
    <style scoped>
.btnstly {
  background: linear-gradient(
    to bottom,
    rgba(255, 133, 86, 1),
    rgba(247, 75, 9, 1),
    rgba(255, 70, 0, 1)
  );
  color: white;
}
</style>