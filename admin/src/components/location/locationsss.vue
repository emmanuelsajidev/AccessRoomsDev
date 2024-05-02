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
    <v-layout wrap justify-center class="mainfont">
      <v-flex xs12>
        <v-layout wrap justify-center pt-6>
          <v-flex xs11 text-right>
            <v-layout wrap justify-center>
              <v-flex xs7 lg10 pt-2 text-left>
                <span
                  class="mainfont"
                  style="font-size: 25px; font-weight: bolder"
                  >LOCATIONS</span
                >
              </v-flex>
              <v-flex xs4 lg2>
                <v-btn
                  class="custombackground"
                  block
                  @click="locationdialog = true"
                >
                  <span style="color: white"> ADD LOCATION </span>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-dialog
            :retain-focus="false"
            v-model="locationdialog"
            max-width="500px"
          >
            <v-card class="mainfont">
              <v-layout wrap>
                <v-flex xs12>
                  <v-layout wrap justify-center>
                    <v-flex xs11 text-left pt-4>
                      <span class="mainfont"> Add Location </span>
                    </v-flex>
                    <v-flex xs11 pt-4>
                      <span>Name</span>
                      <v-text-field
                        hide-details="true"
                        v-model="name"
                        dense
                        outlined
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex xs11 pt-3>
                      <span>Description</span>
                      <v-text-field
                        hide-details="true"
                        v-model="description"
                        dense
                        outlined
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex xs11 pt-3>
                      <span>Add Image</span>
                      <input
                        type="file"
                        ref="fileInput"
                        @change="handleFileChange"
                      />
                    </v-flex>
                    <v-flex xs3 pa-3>
                      <v-btn
                        @click="addLocation()"
                        class="custombackground"
                        block
                      >
                        <span style="color: white">ADD</span>
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card>
          </v-dialog>
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
      image: null,
      locationdialog: false,
      name: "",
      description: "",

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
    // this.appLoading = !this.keyword;
    // this.getList();
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
    handleFileChange(event) {
      // Handle file selection
      const file = event.target.files[0];

      if (file) {
        // Assuming you want to store the file in your component data
        this.image = file;
      }
    },
    addLocation() {
      this.appLoading = true;
      axios({
        method: "POST",
        url: "/location/add",
        headers: {
          token: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status == true) {
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
  },
};
</script>
    
  