<template>
  <div>
    <vue-element-loading
      :active="appLoading"
      :is-full-screen="true"
      background-color="#FFFFFF"
      color="#002635"
      spinner="bar-fade-scale"
    />
    <ServerError v-if="ServerError" />
    <v-snackbar v-model="showsnackbar" color="#f54c0c" right :timeout="timeout">
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
    </v-snackbar>
    <v-layout wrap justify-center pa-0 pa-sm-4>
      <v-flex xs12>
        <v-layout wrap justify-center py-2>
          <v-flex xs12 sm3 md3 align-self-center>
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
              >Houseboats</span
            >
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs6 sm3 md3 lg2 xl1 align-self-center px-1>
            <v-text-field
              v-model="keyword1"
              dense
              placeholder="Search"
              class="rounded-0"
              outlined
              hide-details
              clearable
            ></v-text-field>
          </v-flex>
          <v-flex xs6 sm3 md3 lg2 xl1 align-self-center>
            <v-btn
              dense
              block
              class="gr1"
              @click="$router.push('/AddHouseboat')"
              ><span style="color: white">Add New Boat</span></v-btn
            >
          </v-flex>
        </v-layout>
        <v-layout wrap justify-space-around pt-0 pt-sm-2>
          <v-flex xs12 v-if="data">
            <v-card tile class="pa-4 pa-sm-6" v-if="data.length > 0">
              <v-layout wrap py-0 py-sm-4 justify-start>
                <v-flex xs12 sm6 md4 xl3 v-for="(item, i) in data" :key="i">
                  <v-card
                    elevation="0"
                    class="ma-1 ma-lg-4 pa-4"
                    color="rgba(245, 245, 245, 1)"
                    style="border-radius: 10px"
                  >
                    <v-layout wrap>
                      <v-flex
                        xs4
                        style="cursor: pointer"
                        @click="$router.push('/ViewHouseboat?id=' + item._id)"
                      >
                        <v-img
                          v-if="item.coverImage"
                          height="90px"
                          :src="mediaUURL + item.coverImage"
                          ><template v-slot:placeholder>
                            <ImageLoader /> </template
                        ></v-img>
                        <v-img
                          v-else
                          style="border-radius: 10px"
                          src="https://demofree.sirv.com/nope-not-here.jpg"
                          alt="No image"
                        ></v-img>
                      </v-flex>
                      <v-flex
                        xs7
                        style="cursor: pointer"
                        pl-2
                        @click="$router.push('/ViewHouseboat?id=' + item._id)"
                      >
                        <v-layout wrap>
                          <v-flex xs12>
                            <span
                              style="
                                font-family: LexendFont;
                                font-weight: 500;
                                font-size: 18px;
                              "
                              >{{ item.houseBoatName }}</span
                            >
                          </v-flex>
                          <v-flex xs12 pt-2>
                            <span
                              style="
                                font-weight: 400;
                                font-size: 15px;
                                font-family: LexendFont;
                              "
                              >No of Rooms : {{ item.totalRooms }}</span
                            >
                          </v-flex>
                          <v-flex xs12 pt-2 v-if="item.houseBoatStatus">
                            <span
                              v-if="item.houseBoatStatus == 'Blocked'"
                              style="
                                font-weight: 600;
                                font-size: 15px;
                                color: red;
                                font-family: LexendFont;
                              "
                              >Blocked</span
                            >
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs1 v-if="item.houseBoatStatus != 'Blocked'">
                        <v-menu bottom left>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn icon v-bind="attrs" v-on="on">
                              <v-icon color="black">mdi-dots-vertical</v-icon>
                            </v-btn>
                          </template>

                          <v-list>
                            <!-- <v-list-item>
                              <v-list-item-title
                                style="cursor: pointer"
                                @click="
                                  (editialog = true)((editItem = item._id))
                                "
                                ><v-icon class="pb-1" color="blue"
                                  >mdi-square-edit-outline</v-icon
                                >Edit</v-list-item-title
                              >
                            </v-list-item> -->
                            <v-list-item class="px-1">
                              <v-list-item-title
                                style="cursor: pointer"
                                @click="
                                  (deleteialog = true)((deleteId = item._id))
                                "
                                ><v-icon class="pb-1" color="red"
                                  >mdi-trash-can-outline</v-icon
                                >Delete</v-list-item-title
                              >
                            </v-list-item>
                            <v-list-item
                              class="px-1"
                              @click="
                                $router.push('/ViewHouseboat?id=' + item._id)
                              "
                            >
                              <v-list-item-title
                                ><v-icon class="pb-1" color="green"
                                  >mdi-view-dashboard-outline</v-icon
                                >View</v-list-item-title
                              >
                            </v-list-item>
                            <!-- <v-list-item>
                              <v-list-item-title
                                ><v-icon class="pb-1" color="black"
                                  >mdi-close-circle-outline</v-icon
                                >Block</v-list-item-title
                              >
                            </v-list-item> -->
                          </v-list>
                        </v-menu>
                      </v-flex>
                    </v-layout>
                    <v-layout wrap py-2>
                      <v-flex xs12 pt-2 sm6 text-center text-sm-left>
                        <v-btn
                          outlined
                          dense
                          :disabled="
                            item.houseBoatStatus === 'Blocked' ? true : false"
                          class="px-4 px-sm-2"
                          v-if="item.isOverNight == false"
                          color="#f17343"
                          style="border-radius: 10px; background-color: #ffffff"
                          @click="
                            $router.push(
                              '/AddOvernight?name=' +
                                item.houseBoatName +
                                '&&id=' +
                                item._id
                            )
                          "
                          ><span
                            style="
                              color: #737373;
                              font-weight: 500;
                              font-size: 14px;
                              font-family: LexendFont;
                            "
                            >+ Over Night</span
                          ></v-btn
                        >
                        <v-btn
                          v-else
                          dense  :disabled="
                            item.houseBoatStatus === 'Blocked' ? true : false"
                          @click="$router.push('/overNightList?id=' + item._id)"
                          color="#f17343"
                          style="border-radius: 10px"
                          ><span
                            style="
                              color: white;
                              font-weight: 500;
                              font-size: 14px;
                              font-family: LexendFont;
                            "
                            >Over Night</span
                          ></v-btn
                        >
                      </v-flex>
                      <v-flex xs12 pt-2 sm6 text-center text-sm-right>
                        <v-btn
                          class="px-4 px-sm-2"
                          outlined
                          dense  :disabled="
                            item.houseBoatStatus === 'Blocked' ? true : false"
                          v-if="item.isNightStay == false"
                          color="#f17343"
                          style="border-radius: 10px; background-color: #ffffff"
                          @click="
                            $router.push(
                              '/AddNightstay?name=' +
                                item.houseBoatName +
                                '&&id=' +
                                item._id
                            )
                          "
                          ><span
                            style="
                              color: #737373;
                              font-weight: 500;
                              font-size: 14px;
                              font-family: LexendFont;
                            "
                            >+ Night Stay</span
                          ></v-btn
                        >
                        <v-btn
                          v-else
                          dense  :disabled="
                            item.houseBoatStatus === 'Blocked' ? true : false"
                          @click="$router.push('/nightStayList?id=' + item._id)"
                          color="#f17343"
                          style="border-radius: 10px"
                          ><span
                            style="
                              color: white;
                              font-weight: 500;
                              font-size: 14px;
                              font-family: LexendFont;
                            "
                            >Night Stay</span
                          ></v-btn
                        >
                      </v-flex>
                      <v-flex xs12 pt-2 sm6 text-center text-sm-left>
                        <v-btn
                          outlined
                          dense  :disabled="
                            item.houseBoatStatus === 'Blocked' ? true : false"
                          v-if="item.isDayCriuse == false"
                          color="#f17343"
                          style="border-radius: 10px; background-color: #ffffff"
                          @click="
                            $router.push(
                              '/AddDaycruise?name=' +
                                item.houseBoatName +
                                '&&id=' +
                                item._id
                            )
                          "
                        >
                          <span
                            style="
                              color: #737373;
                              font-weight: 500;
                              font-size: 14px;
                              font-family: LexendFont;
                            "
                            >+ Day Cruise</span
                          ></v-btn
                        >
                        <v-btn
                          v-else
                          dense  :disabled="
                            item.houseBoatStatus === 'Blocked' ? true : false"
                          @click="$router.push('/dayCruiseList?id=' + item._id)"
                          color="#f17343"
                          style="border-radius: 10px"
                        >
                          <span
                            style="
                              color: white;
                              font-weight: 500;
                              font-size: 14px;
                              font-family: LexendFont;
                            "
                          >
                            Day Cruise</span
                          ></v-btn
                        >
                      </v-flex>
                      <v-flex xs12 pt-2 text-center>
                        <v-btn
                          dense
                          :disabled="item.houseBoatStatus === 'Blocked' || item.hasPackage == false ? true : false"
                          block
                          @click="
                            $router.push(
                              '/houseboatReservation?name=' +
                                item.houseBoatName +
                                '&&id=' +
                                item._id +
                                '&&type=' +
                                item.category
                            )
                          "
                          color="#f17343"
                          style="border-radius: 10px"
                          ><span
                            style="
                              color: white;
                              font-weight: 500;
                              font-size: 14px;
                              font-family: LexendFont;
                            "
                            >Add reservation</span
                          ></v-btn
                        >
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-card>
            <v-card tile class="pa-4 pa-sm-6" v-else>
              <v-layout wrap py-0 py-sm-4 justify-start>
                <v-flex xs12>
                  <span
                    style="
                      font-family: LexendFont;
                      font-weight: 400;
                      font-size: 20px;
                    "
                    >No data found</span
                  >
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex xs12 v-else>
            <span
              style="font-family: LexendFont; font-weight: 500; font-size: 18px"
              >No data found</span
            >
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout wrap v-if="data">
      <v-flex xs12 pt-4 v-if="data.length > 0">
        <v-pagination
          small
          color="#ff6200"
          v-model="page"
          :length="Pagelength"
          :total-visible="7"
        >
        </v-pagination>
      </v-flex>
    </v-layout>
    <v-dialog width="400px" v-model="deleteialog">
      <v-card width="400px" class="pa-2">
        <v-layout wrap justify-center>
          <v-flex xs11 text-center
            ><span style="color: #002635" class="dialogHead"
              >Delete</span
            ></v-flex
          >
          <v-flex xs1 text-right>
            <v-icon @click="deleteialog = false" color="#002635"
              >mdi-close-box</v-icon
            ></v-flex
          >
          <v-flex xs8 text-center py-4>
            <v-divider></v-divider>
          </v-flex>
        </v-layout>
        <v-card-text class="px-4 pb-0 dialogText text-center"
          >Are you sure you want to delete this houseboat?
        </v-card-text>
        <v-card-actions class="pt-3">
          <v-spacer></v-spacer>
          <v-btn
            color="#002635"
            class="dialogText"
            dark
            @click="deleteBoat(deleteId)"
            >OK</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      showsnackbar: false,
      timeout: 2000,
      ServerError: false,
      appLoading: false,
      data: [],
      msg: null,
      page: 1,
      limit: 20,
      deleteialog: false,
      deleteId: "",
      editialog: false,
      editItem: {},
      keyword1: "",
    };
  },
  mounted() {
    this.getData();
  },
  watch: {
    page() {
      this.getData();
    },
    keyword1() {
      this.getData();
    },
  },
  methods: {
    getData() {
      this.appLoading = true;
      axios({
        url: "/houseboat/getlist",
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
        },
        params: {
          page: this.page,
          count: this.limit,
          keyword: this.keyword1,
        },
      })
        .then((response) => {
          this.appLoading = false;
          this.data = response.data.data;
          this.Pagelength = Math.ceil(response.data.count / this.limit);
        })
        .catch((err) => {
          //   this.ServerError = true;
          console.log(err);
        });
    },
    deleteBoat(id) {
      axios({
        url: "/houseboat/delete",
        method: "get",
        headers: {
          token: localStorage.getItem("token"),
        },
        params: {
          id: id,
        },
      })
        .then((response) => {
          if (response.data.status == true) {
            this.msg = response.data.msg;
            this.showsnackbar = true;
            this.deleteialog = false;
            this.deleteId = "";
            this.appLoading = false;
            this.getData();
          } else {
            this.msg = response.data.msg;
            this.showsnackbar = true;
          }
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
.gr1 {
  background: linear-gradient(to bottom, rgba(255, 125, 20, 1), #f17343);
}
</style>