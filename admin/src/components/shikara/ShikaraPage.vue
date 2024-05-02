<template>
    <div>
        <v-snackbar v-model="showSnackBar" color="black">
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
            <vue-element-loading :active="appLoading" :is-full-screen="true" background-color="#FFFFFF" color="#FF681F"
                spinner="spinner" />
                <v-layout wrap justify-center>
        <v-flex xs12>
          <v-layout wrap justify-center pt-6>
            <v-flex xs11  text-right>
              <v-layout wrap justify-center>
                <v-flex xs7 lg9 pt-2 text-left>
                  <span class="mainfont" style="font-size: 25px;font-weight: bolder;">SHIKARA</span>
                </v-flex>
                <v-flex xs4 lg3>
                  <v-text-field
                    v-model="keyword"
                    solo
                    dense
                    hide-details
                    clearable
                    color="black"
                    label="Search User"
                    class="custom-text-field rounded-lg"
                  >
                    <template v-slot:label>
                      <span class="custom-label-text mainfont" style="color: black; font-size: 14px">Search </span>
                    </template>
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
        <v-layout wrap>
            <v-flex xs12 v-if="list.length>0">
                <v-layout wrap pl-4 pr-4 justify-center>
          
            <v-flex class="mainfont" xs12 sm5 md4 lg4 xl3 v-for="(item, i) in list" :key="i" pt-8>
                <v-layout wrap justify-center>
                    <v-flex xs12 lg10>
                        <v-card>
                            <v-layout wrap justify-center pt-3 >
                                <v-flex xs11 >
                                    <v-layout wrap justify-start>
                                        <v-flex xs12 v-if="item.fullImage">
                                                <v-layout wrap justify-center>
                                                    <v-flex xs12>
                                                        <v-img  height="150px"  width="100%"  :src="mediaURLnewx + item.fullImage"></v-img>

                                                    </v-flex>
                                                </v-layout>


                                        </v-flex>
                                        <v-flex xs12 v-else>
                                            <v-img  height="150px"  width="100%" src="../../assets/Images/noimg.png"></v-img>


                                        </v-flex>

                                    </v-layout>

                                </v-flex>
                                <v-flex xs12 sm8 lg12>
                                    <v-layout wrap justify-center fill-height>
                                        <v-flex xs11 lg11 pt-3 align-self-center>
                                            <strong>Shikara   Name:</strong> {{ item.shikaraName }}


                                        </v-flex>
                                        <v-flex xs11 lg11 pt-3 align-self-center>
                                            <strong>Total Seats:</strong> {{ item.totalSeats }}


                                        </v-flex>
                                   
                                        
                                        
                                        <v-flex xs10 md12 lg11  pb-6 pt-5
                                        align-self-center
                                            @click="$router.push('/ShikaraDetailedview?id=' + item._id)">
                                            <v-btn block color="#FF681F">
                                                <span style="color: white;">
                                                    View more
                                                    <v-icon color="white">mdi-arrow-right-thin</v-icon>

                                                </span>
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-layout wrap>
            <v-flex xs12 pt-10>
                <v-pagination prev-icon="mdi-menu-left" next-icon="mdi-menu-right" :length="pages" :total-visible="7"
                    v-model="currentPage" color="#FF681F"></v-pagination>
            </v-flex>
        </v-layout>
            </v-flex>
            <v-flex xs12 v-else>
                <v-layout pt-16 wrap>
            <v-flex xs12 text-center style="font-size: larger;" class="mainfont">
                No data found!
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
            appLoading: false,
            page: 1,
            pages: 0,
            tab: null,
            categoryarray: [],
            list: [],
            currentpage: 1,
        keyword: null,
            msg: null,
            currentPage: 1,
        searching: false,

            showSnackBar: false,
            dialog2: false,
        };
    },
    mounted() {
    this.appLoading = !this.keyword; 
    this.getList();
},
    watch: {
      keyword() {
        this.searching = true; 
        this.getList();
      },
      currentPage() {
        this.getList();
      },
    },

    methods: {
        getList() {
        this.appLoading = !this.searching;
        
        axios({
            method: "GET",
            url: "/shikara/all",
            headers: {
                token: localStorage.getItem("token"),
            },
            params: {
                keyword: this.keyword,
                status: this.status,
                categoryId: this.categoryId,
                page: this.currentPage,
                fromDate: this.fromDate,
                toDate: this.toDate,
                limit: 12,
            },
        })
            .then((response) => {
                this.list = response.data.data;
                this.totalData = response.data.totalLength;
                this.pages = Math.ceil(this.totalData / response.data.limit);
            })
            .catch((err) => {
                this.ServerError = true;
                console.log(err);
            })
            .finally(() => {
                this.appLoading = false;
                this.searching = false; 
            });
    },

    },
};
</script>
    
  