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
      <vue-element-loading
        :active="appLoading"
        :is-full-screen="true"
        background-color="#FFFFFF"
        color="#FF681F"
        spinner="spinner"
      />
      <v-layout class="mainfont" wrap justify-center pb-10 pt-10>
        <v-flex xs11>
          <v-card>
            <v-layout wrap justify-center pr-4>
              <v-flex xs11 lg5 pt-6>
                <v-layout wrap justify-center>
                  <v-flex xs12 v-if="list.photo">
                    <v-layout wrap justify-center>
                      <v-flex xs12 pb-6>
                        <v-img
                          height="100%"
                          width="100%"
                          :src="mediaURLnewx + list.photo"
                        ></v-img>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 v-else>
                    <v-img
                      height="100%"
                      width="100%"
                      src="../../assets/Images/noimg.png"
                    ></v-img>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs11 lg6 pt-5 pl-4 class="mainfont">
                  <v-layout wrap pt-3 pr-3 pl-3 pb-6>
                    <v-flex xs12>
                      <strong> Name</strong>
                      {{ list.name }}
                    </v-flex>
  
                    <v-flex xs12 pt-6>
                      <strong>Description</strong>
                      {{ list.description }}
                    </v-flex>
  
                    <v-flex xs12 pt-6>
                      <strong>Added Date</strong>
                      {{ formatDate(list.create_date) }}
                    </v-flex>
                  </v-layout>
              </v-flex>
            </v-layout>
           
          </v-card>
        </v-flex>
      </v-layout>
  
    
    </div>
  </template>
  <script>
  import axios from "axios";
  export default {
    data() {
      return {
        name: null,
        sublocation: [],
        userProfileTabs: null,
        subtab: null,
        appLoading: false,
        id: this.$route.query.id,
        preview: null,
        tab: null,
        list: [],
        curid: [],
        approve: false,
        deleteDialog: false,
        reject: false,
        editdialog: false,
        msg: null,
        showSnackBar: false,
      };
    },
  
    mounted() {
      this.getList();
    },
    methods: {
      formatDate(dateString) {
        const options = { year: "numeric", month: "long", day: "numeric" };
        const formattedDate = new Date(dateString).toLocaleDateString(
          undefined,
          options
        );
        return formattedDate;
      },
      editSublocation() {
        axios({
          method: "POST",
          url: "/location/sub/edit",
          headers: {
            token: localStorage.getItem("token"),
          },
          data: {
            name: this.curid.name,
            id: this.curid._id,
            description: this.curid.description,
          },
        })
          .then((response) => {
            if (response.data.status == true) {
              this.editdialog = false;
              this.msg = response.data.msg;
              this.showSnackBar = true;
            } else {
              this.msg = response.data.msg;
              this.showSnackBar = true;
            }
          })
          .catch((err) => {
            this.ServerError = true;
            console.log(err);
          });
      },
      deleteItem() {
        axios({
          method: "GET",
          url: "/location/sub/delete",
          headers: {
            token: localStorage.getItem("token"),
          },
          params: {
            id: this.deleteid,
          },
        })
          .then((response) => {
            if (response.data.status == true) {
              this.deleteDialog = false;
              this.msg = response.data.msg;
              this.showSnackBar = true;
            } else {
              this.msg = response.data.msg;
              this.showSnackBar = true;
            }
          })
          .catch((err) => {
            this.ServerError = true;
            console.log(err);
          });
      },
      getList() {
        this.appLoading = true;
        axios({
          method: "GET",
          url: "/gallery/details",
          headers: {
            token: localStorage.getItem("token"),
          },
          params: {
            galleryId: this.id,
          },
        })
          .then((response) => {
            this.list = response.data.data;
            this.sublocation = response.data.sublocation;
            this.appLoading = false;
          })
          .catch((err) => {
            this.ServerError = true;
            console.log(err);
          });
      },
    },
  };
  </script>