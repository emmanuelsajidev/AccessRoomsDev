<template>
  <div>
    <vue-element-loading
      :active="appLoading"
      :is-full-screen="true"
      background-color="#FFFFFF"
      color="#002635"
      spinner="bar-fade-scale"
    />
    <v-layout
      style="
        font-weight: 400;
        font-size: 16px;
        font-family: LexendFont;
        text-transform: none;
      "
      pt-lg-8
      pb-lg-8
      wrap
      justify-center
    >
      <v-flex xs11 sm6 md5 lg4>
        <v-card class="pa-5">
          <v-layout wrap>
            <v-flex xs12>
              <v-layout wrap>
                <v-flex xs6 lg8 (size)(1-12)
                style="font-size: 21px;"
                > Personal Information </v-flex>
                <v-flex
                  style="cursor: pointer"
                 xs6
                  lg4
                  text-right
                  @click="editDialog = true"
                >
                <v-btn block color="#f17343">
                    <span style="color: white"> 
                    
                    Edit Profile </span>
                </v-btn>
                 
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 pt-3 pb-4>
              <v-divider></v-divider>
            </v-flex>
            <v-flex xs12>
              <v-layout wrap>
                <v-flex xs12>
                  <span> Name </span>
                  <v-text-field
                    dense
                    color="#ff6200"
                    v-model="profile.name"
                    outlined
                    readonly
                  ></v-text-field>
                </v-flex>

                <v-flex xs12>
                  <span> Phone Number </span>
                  <v-text-field
                    dense
                    color="#ff6200"
                    v-model="profile.phoneNumber"
                    outlined
                    readonly
                  ></v-text-field>
                </v-flex>

                <v-flex xs12>
                  <span> E-mail </span>
                  <v-text-field
                    dense
                    v-model="profile.email"
                    outlined
                    readonly
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>

      <v-dialog v-model="editDialog" max-width="560px">
        <v-card
          style="
            font-weight: 400;
            font-size: 16px;
            font-family: LexendFont;
            text-transform: none;
          "
        >
          <v-layout wrap justify-center>
            <v-flex xs11 pt-3 pb-3
            style="font-size: 21px;"
            >Edit Profile</v-flex>
            <v-flex xs11>
              <v-layout wrap>
                <v-flex xs12>
                  <span> Name </span>
                  <v-text-field
                    dense
                    color="#ff6200"
                    v-model="profile.name"
                    outlined
                  ></v-text-field>
                </v-flex>

                <v-flex xs12>
                  <span>E-mail</span>
                  <v-text-field
                    dense
                    color="#ff6200"
                    v-model="profile.email"
                    outlined
                    :rules="[
                      (v) => !!v || 'E-mail is required',
                      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                    ]"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 pb-4>
                  <v-layout wrap justify-center>
                    <v-flex xs6 lg2>
                      <v-btn text @click="editDialog = false">
                        <span style="color: red"> Cancel </span>
                      </v-btn>
                    </v-flex>
                    <v-flex xs6 lg2>
                      <v-btn @click="editProfile()" text>
                        <span style="color: #f17343"> Edit </span>
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>


<script>
import axios from "axios";
// import store from "../../store";

export default {
  data() {
    return {
      appLoading: false,
      ServerError: false,
      snackbar: false,

      timeout: 5000,
      profile: {},
      balancepaymentMode: null,
      msg: null,
      editDialog: false,
      docsBack: "",
      docs: "",
      docs1: "",
      file: "",
      formData: new FormData(),
    };
  },
  computed: {
    appUser() {
      return this.$store.state.userData;
    },
  },
  beforeMount() {
    // this.imageFileFront=this.appUser.agentIdProofFront
  },
  mounted() {
    this.getList();
  },
  methods: {
    editProfile() {
      var userData = {};
      userData["name"] = this.profile.name;
      userData["email"] = this.profile.email;
      userData["id"] = this.profile._id;
      this.appLoading = true;
      axios({
        method: "POST",
        url: "/customer/edit",
        data: userData,
        headers: {
          token: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status) {
            this.msg = response.data.msg;
            // Set the name in localStorage
            localStorage.setItem("name", this.profile.name);
            this.showSnackbar = true;
            this.editDialog = false;
            this.getList();
            location.reload();
          } else {
            this.msg = response.data.msg;
            this.showSnackbar = true;
          }
        })
        .catch((error) => {
          // Handle error
          console.error("Error editing profile:", error);
          this.appLoading = false;
          this.showSnackbar = true;
        });
    },

    getList() {
      this.appLoading = true;
      axios({
        method: "GET",
        url: "customer/profile",

        headers: {
          token: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          this.profile = response.data.data;
          this.appLoading = false;
        })
        .catch((err) => {
          this.ServerError = true;
          console.error(err);
        });
    },
  },
};
</script>