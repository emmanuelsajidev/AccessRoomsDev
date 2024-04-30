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
    <v-snackbar v-model="showSnackBar" color="#ff6200" right top timeout="2000">
      <v-layout wrap justify-center>
        <v-flex text-left class="align-self-center">
          <span style="color: white">
            {{ msg }}
          </span>
        </v-flex>

        <v-flex text-right>
          <v-btn small :ripple="false" text @click="showSnackBar = false">
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
              >Over Night Stay</span
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
                      <span class="title2">Check-In time</span>
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
                      <span class="title2">Check-Out time</span>
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
                    </v-flex>
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">Minimum capacity of boat</span>
                      <v-text-field
                        dense
                        outlined
                        type="text"
                        v-model="minCapacityOfBoat"
                        :rules="[rules.required]"
                        hide-details="auto"
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">Maximum persons per room</span>
                      <v-text-field
                        dense
                        outlined
                        type="text"
                        v-model="maxPersonPerRoom"
                        :rules="[rules.required]"
                        hide-details="auto"
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">Meal plan</span>
                      <v-layout wrap px-2 px-sm-0>
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
                </v-flex>
                <v-flex xs12 sm6>
                  <v-layout wrap justify-center>
                    <v-flex xs12 sm10 md5 pt-4 pr-0 pr-md-4 text-left>
                      <span class="title2">1 Day trip start time</span>
                      <v-dialog
                        ref="menu5"
                        v-model="menu5"
                        :return-value.sync="firstDayStartTime"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="firstDayStartTime"
                            hide-details="auto"
                            v-bind="attrs"
                            v-on="on"
                            outlined
                            dense
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="menu5"
                          v-model="firstDayStartTime"
                          full-width
                          color="#f17343"
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="#f17343" @click="menu5 = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="#f17343"
                            @click="$refs.menu5.save(firstDayStartTime)"
                          >
                            OK
                          </v-btn>
                        </v-time-picker>
                      </v-dialog>
                    </v-flex>
                    <v-flex xs12 sm10 md5 pt-4 text-left>
                      <span class="title2">End time</span>
                      <v-dialog
                        ref="menu6"
                        v-model="menu6"
                        :return-value.sync="firstDayEndTime"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="firstDayEndTime"
                            hide-details="auto"
                            v-bind="attrs"
                            v-on="on"
                            outlined
                            dense
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="menu6"
                          v-model="firstDayEndTime"
                          full-width
                          color="#f17343"
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="#f17343" @click="menu6 = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="#f17343"
                            @click="$refs.menu6.save(firstDayEndTime)"
                          >
                            OK
                          </v-btn>
                        </v-time-picker>
                      </v-dialog>
                    </v-flex>
                    <v-flex xs12 sm10 md5 pt-4 pr-0 pr-md-4 text-left>
                      <span class="title2">2 Day trip start time</span>
                      <v-dialog
                        ref="menu7"
                        v-model="menu7"
                        :return-value.sync="secondDayStartTime"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="secondDayStartTime"
                            hide-details="auto"
                            v-bind="attrs"
                            v-on="on"
                            outlined
                            dense
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="menu7"
                          v-model="secondDayStartTime"
                          full-width
                          color="#f17343"
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="#f17343" @click="menu7 = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="#f17343"
                            @click="$refs.menu7.save(secondDayStartTime)"
                          >
                            OK
                          </v-btn>
                        </v-time-picker>
                      </v-dialog>
                    </v-flex>
                    <v-flex xs12 sm10 md5 pt-4 text-left>
                      <span class="title2">End time</span>
                      <v-dialog
                        ref="menu8"
                        v-model="menu8"
                        :return-value.sync="secondDayEndTime"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="secondDayEndTime"
                            hide-details="auto"
                            v-bind="attrs"
                            v-on="on"
                            outlined
                            dense
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="menu8"
                          v-model="secondDayEndTime"
                          full-width
                          color="#f17343"
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="#f17343" @click="menu8 = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="#f17343"
                            @click="$refs.menu8.save(secondDayEndTime)"
                          >
                            OK
                          </v-btn>
                        </v-time-picker>
                      </v-dialog>
                      <!-- <v-menu
                        ref="menu8"
                        v-model="menu8"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="secondDayEndTime"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="secondDayEndTime"
                            readonly
                            outlined
                            dense
                            hide-details="auto"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="menu8"
                          v-model="secondDayEndTime"
                          full-width
                          @click:minute="$refs.menu8.save(secondDayEndTime)"
                        ></v-time-picker>
                      </v-menu> -->
                    </v-flex>
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">Extra persons per room</span>
                      <v-text-field
                        dense
                        outlined
                        type="text"
                        v-model="extraPersonPerRoom"
                        hide-details="auto"
                      >
                      </v-text-field>
                    </v-flex>
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
                  </v-layout>
                  <v-layout wrap justify-center>
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
      showSnackBar: false,
      timeout: 2000,
      ServerError: false,
      appLoading: false,
      data: [],
      msg: null,
      page: 1,
      limit: 20,
      houseBoatId: "",
      HouseboatData: [],
      tripType: "",
      checkInTime: "",
      checkOutTime: "",
      maxCapacityOfBoat: "",
      addionalRules: "",
      extraPersonPerRoom: "",
      minCapacityOfBoat: "",
      maxPersonPerRoom: "",
      houseBoatType: [],
      firstDayStartTime: "",
      firstDayEndTime: "",
      secondDayStartTime: "",
      secondDayEndTime: "",
      welcomeDrink: false,
      lunch: false,
      teaOrsnacks: false,
      dinner: false,
      breakfast: false,
      menu2: false,
      menu4: false,
      menu3: false,
      // menu4: false,
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
    validation() {
      if (!this.checkInTime) {
        this.msg = "Please add check-in time";
        this.showSnackBar = true;
        return;
      } else if (!this.checkOutTime) {
        this.msg = "Please add check-out time";
        this.showSnackBar = true;
        return;
      } else if (!this.maxCapacityOfBoat) {
        this.msg = "Please enter max capacity";
        this.showSnackBar = true;
        return;
      } else if (!this.minCapacityOfBoat) {
        this.msg = "Please enter min capacity";
        this.showSnackBar = true;
        return;
      } else if (!this.maxPersonPerRoom) {
        this.msg = "Please max person per room";
        this.showSnackBar = true;
        return;
      } else if (!this.houseBoatType.length > 0) {
        this.msg = "Please choose houseboat type";
        this.showSnackBar = true;
        return;
      } else if (!this.firstDayStartTime) {
        this.msg = "Please enter first day start time";
        this.showSnackBar = true;
        return;
      } else if (!this.firstDayEndTime) {
        this.msg = "Please enter first day end time";
        this.showSnackBar = true;
        return;
      } else if (!this.secondDayStartTime) {
        this.msg = "Please enter second day start time";
        this.showSnackBar = true;
        return;
      } else if (!this.secondDayEndTime) {
        this.msg = "Please enter second day end time";
        this.showSnackBar = true;
        return;
      } else {
        this.add();
      }
    },
    add() {
      var mealPlan = {};
      mealPlan.welcomeDrink = this.welcomeDrink;
      mealPlan.lunch = this.lunch;
      mealPlan.teaOrsnacks = this.teaOrsnacks;
      mealPlan.dinner = this.dinner;
      mealPlan.breakfast = this.breakfast;

      this.appLoading = true;
      axios({
        method: "POST",
        url: "/houseboat/trip/add",
        data: {
          checkInTime: this.checkInTime,
          checkOutTime: this.checkOutTime,
          maxCapacityOfBoat: this.maxCapacityOfBoat,
          extraPersonPerRoom: this.extraPersonPerRoom,
          minCapacityOfBoat: this.minCapacityOfBoat,
          maxPersonPerRoom: this.maxPersonPerRoom,
          houseBoatType: this.houseBoatType,
          firstDayStartTime: this.firstDayStartTime,
          firstDayEndTime: this.firstDayEndTime,
          secondDayStartTime: this.secondDayStartTime,
          secondDayEndTime: this.secondDayEndTime,
          addionalRules: this.addionalRules,
          mealPlan: mealPlan,
          houseBoatId: this.$route.query.id,
          tripType: "OverNight",
        },
        headers: {
          token: localStorage.getItem("token"),
        },
      }).then((response) => {
        this.appLoading = false;
        if (response.data.status == true) {
          this.msg = response.data.msg;
          this.showSnackBar = true;
          var tripId = response.data.data._id;
          console.log("tripId=", tripId);
          this.$router.push(
            "/AddOvernightSeasonalRate?name=" +
              this.$route.query.name +
              "&&id=" +
              tripId
          );
        } else {
          this.msg = response.data.msg;
          this.showSnackBar = true;
        }
      });
      // }
    },
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