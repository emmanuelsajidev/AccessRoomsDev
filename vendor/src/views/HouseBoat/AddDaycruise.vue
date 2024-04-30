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
    <v-snackbar v-model="showSnackbar" color="#ff6200" right top timeout="2000">
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
    <v-layout wrap justify-center pa-4>
      <v-flex xs12>
        <v-layout wrap justify-start py-2>
          <v-flex xs12 sm9 md10 align-self-center>
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
            <!-- </v-flex>
            <v-flex xs12 sm2 align-self-center> -->
            <span
              class="pa-1 ml-2"
              style="
                border-radius: 5px;
                background-color: white;
                color: black;
                font-family: LexendFont;
                font-weight: 500;
                font-size: 15px;
                text-transform: uppercase;
              "
              >DAY CRUISE</span
            ></v-flex
          >
          <v-flex xs12 sm3 md2 align-self-center>
            <v-layout wrap>
              <v-flex xs12 text-left
                ><span class="title2">Category: </span
                ><span class="title2a">{{
                  HouseboatData.category
                }}</span></v-flex
              >
              <v-flex xs12 text-left
                ><span class="title2">Rooms: </span
                ><span class="title2a">{{
                  HouseboatData.totalRooms
                }}</span></v-flex
              >
            </v-layout>
          </v-flex>
        </v-layout>
        <v-layout wrap justify-space-around pt-2>
          <v-flex xs12>
            <v-card tile class="pa-1 pa-sm-1 pa-md-8" elevation="0">
              <v-layout wrap justify-start>
                <v-flex xs12 sm6>
                  <v-layout wrap justify-center>
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">Houseboat type</span>
                      <v-select
                        hide-details="auto"
                        v-model="houseBoatType"
                        :items="['Private', 'Sharing']"
                        :menu-props="{ maxHeight: '400' }"
                        outlined
                        multiple
                        persistent-hint
                        dense
                      ></v-select>
                    </v-flex>
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">Check in time</span>
                      <v-dialog
                        ref="menu4"
                        v-model="menu4"
                        :return-value.sync="checkInTime"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="checkInTime"
                            hide-details="auto"
                            v-bind="attrs"
                            v-on="on"
                            outlined
                            dense
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="menu4"
                          v-model="checkInTime"
                          full-width
                          color="#f17343"
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="#f17343" @click="menu4 = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="#f17343"
                            @click="$refs.menu4.save(checkInTime)"
                          >
                            OK
                          </v-btn>
                        </v-time-picker>
                      </v-dialog>
                    </v-flex>
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">Check out time</span>
                      <v-dialog
                        ref="menu3"
                        v-model="menu3"
                        :return-value.sync="checkOutTime"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="checkOutTime"
                            hide-details="auto"
                            v-bind="attrs"
                            v-on="on"
                            outlined
                            dense
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="menu3"
                          v-model="checkOutTime"
                          full-width
                          color="#f17343"
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="#f17343" @click="menu3 = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="#f17343"
                            @click="$refs.menu3.save(checkOutTime)"
                          >
                            OK
                          </v-btn>
                        </v-time-picker>
                      </v-dialog>
                    </v-flex>
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">Maximum person in a trip</span>
                      <v-text-field
                        dense
                        outlined
                        type="text"
                        v-model="maxPersonTrip"
                        :rules="[rules.required]"
                        hide-details="auto"
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">Minimum person in a trip</span>
                      <v-text-field
                        dense
                        outlined
                        type="text"
                        v-model="minPersonTrip"
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
                      <span class="title2">Maximum capacity of boat</span>
                      <v-text-field
                        dense
                        outlined
                        type="text"
                        v-model="maxCapacityOfBoat"
                        :rules="[rules.required]"
                        hide-details="auto"
                      >
                      </v-text-field>
                    </v-flex> -->
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">Additional rules</span>
                      <v-textarea
                        dense
                        v-model="addionalRules"
                        outlined
                        type="text"
                        placeholder="Rules"
                        :rules="[rules.required]"
                        hide-details="auto"
                      >
                      </v-textarea>
                    </v-flex>
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">Meal plan</span>
                      <v-layout wrap>
                        <v-flex xs6 md3 pb-2>
                          <span class="title3" style="color: #505050"
                            >Welcome drink</span
                          >
                          <v-switch
                            class="mt-0"
                            v-model="welcomeDrink"
                            hide-details
                            inset
                            color="#F17343"
                          ></v-switch>
                        </v-flex>
                        <v-flex xs6 md3 pb-2>
                          <span class="title3" style="color: #505050"
                            >Lunch</span
                          >
                          <v-switch
                            class="mt-0"
                            v-model="lunch"
                            hide-details
                            inset
                            color="#F17343"
                          ></v-switch>
                        </v-flex>
                        <v-flex xs6 md3 pb-2>
                          <span class="title3" style="color: #505050"
                            >Dinner</span
                          >
                          <v-switch
                            class="mt-0"
                            v-model="dinner"
                            hide-details
                            inset
                            color="#F17343"
                          ></v-switch>
                        </v-flex>
                        <v-flex xs6 md3 pb-2>
                          <span class="title3" style="color: #505050"
                            >Breakfast</span
                          >
                          <v-switch
                            class="mt-0"
                            v-model="breakfast"
                            hide-details
                            inset
                            color="#F17343"
                          ></v-switch>
                        </v-flex>
                        <v-flex xs6 md3 pb-2>
                          <span class="title3" style="color: #505050"
                            >Tea/Coffee,Snacks</span
                          >
                          <v-switch
                            class="mt-0"
                            v-model="teaOrsnacks"
                            hide-details
                            inset
                            color="#F17343"
                          ></v-switch>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                  <v-layout wrap justify-center pt-5>
                    <v-flex xs12 sm10 align-self-end text-right pt-10>
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
      showSnackbar: false,
      timeout: 2000,
      ServerError: false,
      appLoading: false,
      data: [],
      msg: null,
      page: 1,
      limit: 20,
      houseBoatId: "",
      tripType: "",
      checkInTime: "",
      checkOutTime: "",
      maxCapacityOfBoat: "",
      maxPersonTrip: "",
      minPersonTrip: "",
      houseBoatType: [],
      welcomeDrink: false,
      lunch: false,
      teaOrsnacks: false,
      dinner: false,
      breakfast: false,
      addionalRules: "",
      HouseboatData: [],
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
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.appLoading = true;
      axios({
        url: "/houseboat/data",
        method: "POST",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          houseBoatId: this.$route.query.id,
        },
      })
        .then((response) => {
          this.appLoading = false;
          this.HouseboatData = response.data.data;
        })
        .catch((err) => {
          //   this.ServerError = true;
          console.log(err);
        });
    },
    validation() {
      if (!this.checkInTime) {
        this.msg = "Please add check-in time";
        this.showSnackbar = true;
        return;
      } else if (!this.checkOutTime) {
        this.msg = "Please add check-out time";
        this.showSnackbar = true;
        return;
      }
      //  else if (!this.maxCapacityOfBoat) {
      //   this.msg = "Please enter max capacity";
      //   this.showSnackbar = true;
      //   return;
      // }
      else if (!this.maxPersonTrip) {
        this.msg = "Please enter max person per trip";
        this.showSnackbar = true;
        return;
      } else if (!this.minPersonTrip) {
        this.msg = "Please enter min person per trip";
        this.showSnackbar = true;
        return;
      } else if (!this.houseBoatType.length > 0) {
        this.msg = "Please choose houseboat type";
        this.showSnackbar = true;
        return;
      } else {
        this.add();
      }
    },
    add() {
      this.appLoading = true;
      var mealPlan = {};
      mealPlan.welcomeDrink = this.welcomeDrink;
      mealPlan.lunch = this.lunch;
      mealPlan.teaOrsnacks = this.teaOrsnacks;
      mealPlan.dinner = this.dinner;
      mealPlan.breakfast = this.breakfast;

      axios({
        method: "POST",
        url: "/houseboat/trip/add",
        data: {
          checkInTime: this.checkInTime,
          addionalRules: this.addionalRules,
          checkOutTime: this.checkOutTime,
          // maxCapacityOfBoat: this.maxCapacityOfBoat,
          // (since max person per trip is equal to boat capacity)
          maxCapacityOfBoat: this.maxPersonTrip,
          maxPersonTrip: this.maxPersonTrip,
          minPersonTrip: this.minPersonTrip,
          houseBoatType: this.houseBoatType,
          mealPlan: mealPlan,
          houseBoatId: this.$route.query.id,
          tripType: "DayCruise",
        },
        headers: {
          token: localStorage.getItem("token"),
        },
      }).then((response) => {
        this.appLoading = false;
        if (response.data.status == true) {
          this.msg = response.data.msg;
          this.showSnackbar = true;
          var tripId = response.data.data._id;
          console.log("tripId=", tripId);
          this.$router.push(
            "/AddDaycruiseSeasonalRate?name=" +
              this.$route.query.name +
              "&&id=" +
              tripId
          );
        } else {
          this.msg = response.data.msg;
          this.showSnackbar = true;
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