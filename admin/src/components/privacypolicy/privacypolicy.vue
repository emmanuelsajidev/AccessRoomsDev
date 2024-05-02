<template>
  <v-layout wrap justify-center class="mainfont">
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
    <v-flex xs11 pt-6>
      <v-card class="pa-6">
        <v-layout wrap justify-center>
          <v-flex xs12 pt-4>
            <span class="mainfont">Heading</span>
            <v-text-field
              class="mainfont"
              outlined
              dense
              v-model="list.name"
              type="text"
            ></v-text-field>
            <v-flex pt-4>
              <vue-editor
              class="mainfont"
              
              v-model="list.content"></vue-editor
            ></v-flex>
          </v-flex>
          <v-flex text-center pt-10 pb-6>
            <v-btn class="custombackground" @click="edit()"
              ><span class="mainfont">
                <span style="color: white"> SUBMIT </span>
              </span></v-btn
            ></v-flex
          >
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>
  
  <script>
import axios from "axios";
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      appLoading: false,
      content: null,
      msg: null,
      showSnackBar: false,
      name: null,
      list: [],
    };
  },
  mounted() {
    this.getView();
  },

  methods: {
    edit() {
      this.appLoading = true;
      axios({
        method: "POST",
        url: "/policy/update",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          name: this.list.name,
          content: this.list.content,
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
    getView() {
      this.appLoading = true;
      axios({
        method: "GET",
        url: "/policy/view",
        headers: {
          token: localStorage.getItem("token"),
        },
        params: {
          name: "Privacy Policy",
        },
      })
        .then((response) => {
          if (response.data.status == true) {
            this.appLoading = false;
            this.list = response.data.data;
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
  