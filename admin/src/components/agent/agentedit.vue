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
    <v-layout wrap pb-9 justify-space-around class="mainfont">
      <v-flex xs11>
        <v-layout wrap pr-1 pt-7 justify-center>
          <v-flex x12 text-left>
            <span class="mainfont" style="font-size: 25px; font-weight: bolder"
              >EDIT DETAILS</span
            >
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs11 pt-4>
        <v-card class="pa-5">
          <v-layout wrap justify-start pt-6>
            <v-flex xs12 pb-8>
              <v-layout wrap>
                <v-flex xs12 pb-4 style="font-weight: bold">
                  Basic Details
                </v-flex>
                <v-flex xs12 sm6 lg4 pr-3>
                  <span>Name</span>
                  <v-text-field
                    color="#FF681F"
                    style="border-radius: opx"
                    dense
                    outlined
                    v-model="list.name"
                  >
                  </v-text-field>
                </v-flex>

                <v-flex xs12 sm6 lg4 pr-3>
                  <span>Locality</span>

                  <v-text-field
                    color="#FF681F"
                    style="border-radius: opx"
                    dense
                    outlined
                    v-model="list.locality"
                  >
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm6 lg4 pr-3>
                  <span>District</span>

                  <v-text-field
                    color="#FF681F"
                    style="border-radius: opx"
                    dense
                    outlined
                    v-model="list.district"
                  >
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm6 lg4 pr-3>
                  <span>State</span>

                  <v-text-field
                    color="#FF681F"
                    style="border-radius: opx"
                    dense
                    outlined
                    v-model="list.state"
                  >
                  </v-text-field>
                </v-flex>

                <v-flex xs12 sm6 lg4 pr-3>
                  <span>Country</span>

                  <v-text-field
                    color="#FF681F"
                    style="border-radius: opx"
                    dense
                    outlined
                    v-model="list.country"
                  >
                  </v-text-field> </v-flex
                ><v-flex xs12 sm6 lg4 pr-3>
                  <span>Pincode</span>

                  <v-text-field
                    color="#FF681F"
                    style="border-radius: opx"
                    dense
                    outlined
                    v-model="list.pincode"
                  >
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm6 lg4 pr-3>
                  <span>Select Usertype </span>
                  <v-select
                    v-model="list.userType"
                    :items="states"
                    dense
                    color="#FF681F"
                    outlined
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 pb-8>
              <v-layout wrap justify-center>
                <v-flex pb-4 pt-10 style="font-weight: bold">
                  Company details
                </v-flex>
              </v-layout>
              <v-layout wrap justify-start>
                <v-flex xs12 sm6 lg4 pr-3>
                  <span>Company Name</span>

                  <v-text-field
                    color="#FF681F"
                    style="border-radius: opx"
                    dense
                    outlined
                    v-model="list.companyName"
                  >
                  </v-text-field> </v-flex
                ><v-flex xs12 sm6 lg4 pr-3>
                  <span>GST Number</span>

                  <v-text-field
                    color="#FF681F"
                    style="border-radius: opx"
                    dense
                    outlined
                    v-model="list.gstNo"
                  >
                  </v-text-field>
                </v-flex>

                <v-flex xs12>
                  <v-layout wrap>
                    <v-flex xs12 sm6 lg4 pr-4>
                      <v-layout wrap>
                        <v-flex xs12 sm6 lg6>
                          <span> AgentId Proof Front</span>

                          <v-btn
                            color="#3E69B4"
                            block
                            dark
                            download
                            :href="mediaURLnewx + agentId.agentIdProofFront"
                            target="_blank"
                          >
                            <v-icon>mdi-file-document-outline</v-icon
                            ><span
                              style="
                                font-family: mainfont;
                                font-weight: 400;
                                font-size: 16px;
                                text-transform: none;
                              "
                              >View</span
                            ></v-btn
                          >
                        </v-flex>
                        <v-flex xs12 sm6 lg6>
                          <v-file-input
                            class="mainfont"
                            v-model="file2"
                            label="Add  file"
                            @change="handleFileChange('file2')"
                          ></v-file-input>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex xs12 sm6 lg4 pr-4>
                      <v-layout wrap>
                        <v-flex xs12 sm6 lg6>
                          <span>Agent GST Proof</span>

                          <v-btn
                            color="#3E69B4"
                            block
                            dark
                            download
                            :href="mediaURLnewx + agentId.agentGSTProof"
                            target="_blank"
                          >
                            <v-icon>mdi-file-document-outline</v-icon
                            ><span
                              style="
                                font-family: mainfont;
                                font-weight: 400;
                                font-size: 16px;
                                text-transform: none;
                              "
                              >View</span
                            ></v-btn
                          >
                        </v-flex>
                        <v-flex xs12 sm6 lg6>
                          <v-file-input
                            v-model="file3"
                            label="Add file "
                            @change="handleFileChange('file3')"
                          ></v-file-input>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex xs12 sm6 lg4 pr-4>
                      <v-layout wrap>
                        <v-flex xs12 sm6 lg6>
                          <span>AgentId Proof Back</span>

                          <v-btn
                            color="#3E69B4"
                            block
                            dark
                            download
                            :href="mediaURLnewx + agentId.agentIdProofBack"
                            target="_blank"
                          >
                            <v-icon>mdi-file-document-outline</v-icon
                            ><span
                              style="
                                font-family: mainfont;
                                font-weight: 400;
                                font-size: 16px;
                                text-transform: none;
                              "
                              >View</span
                            ></v-btn
                          >
                        </v-flex>
                        <v-flex xs12 sm6 lg6>
                          <v-file-input
                            v-model="file4"
                            label="Add file "
                            @change="handleFileChange('file4')"
                          ></v-file-input>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12> </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs12 pt-lg-10 pt-0>
              <v-layout wrap justify-end>
                <v-flex xs12 lg2>
                  <v-btn @click="editAgent()" color="#FF681F" block>
                    <span style="color: white; text-transform: none">
                      Edit
                    </span>
                    <v-icon size="100%" color="white">mdi-pencil</v-icon>
                  </v-btn>
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
  components: {},
  data() {
    return {
      file1: null,
      file2: null,
      file3: null,
      file4: null,
      vendorCatList: [],
      showSnackBar: false,
      deletedialog: false,
      description: "",
      id: this.$route.query.id,
      ServerError: false,
      states: ["Travel Agent", "Travels", "Tour Guide"],
      agentId: {},
      timeout: 5000,
      bankDetails: {},
      bankDetails2: {},
      formData: new FormData(),
      msg: null,
      dialog: false,
      editdialog: false,
      vendorId: {},
      appLoading: false,
      list: {},
    };
  },
  computed: {},

  mounted() {
    this.getList();
  },
  watch: {
    currentPage() {
      this.getList();
    },
  },

  methods: {
    triggerFileInput(refName) {
      if (this.$refs[refName]) {
        this.$refs[refName].$refs.input.click();
      }
    },
    handleFileChange(refName) {
      console.log(`File ${refName} selected`);
    },

    editAgent() {
      const formData = new FormData();
      formData.append("id", this.$route.query.id);
      formData.append("agentGSTProof", this.file3);
      formData.append("agentIdProofBack", this.file4);
      formData.append("name", this.list.name);
      formData.append("district", this.list.district);
      formData.append("locality", this.list.locality);
      formData.append("state", this.list.state);
      formData.append("country", this.list.country);
      formData.append("pincode", this.list.pincode);
      formData.append("companyName", this.list.companyName);
      formData.append("gstNo", this.list.gstNo);
      formData.append("agentIdProofFront", this.file2);
      formData.append("userType",this.list.userType);




      axios({
        method: "POST",
        url: "/agent/edit",
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      })
        .then((response) => {
          if (response.data.status == true) {
            this.msg = response.data.msg;
         
            this.showSnackBar = true;
            location.reload();
          } else {
            this.msg = response.data.msg;
            this.showSnackBar = true;
          }
        })
        .catch((err) => {
          this.ServerError = true;
          console.error(err);
        });
      this.formData = new FormData();
    },

    getList() {
      this.appLoading = true;
      axios
        .get("/agent/info", {
          headers: {
            token: localStorage.getItem("token"),
          },
          params: {
            id: this.id,
          },
        })
        .then((response) => {
          this.appLoading = false;
          this.list = response.data.data;
          this.agentId = this.list.agentId;
          //   this.vendorId = this.list.vendorId;
        })
        .catch((err) => {
          this.appLoading = false;
          this.ServerError = true;
          console.log(err);
        });
    },
  },
};
</script>
  <style >
.justified-text {
  text-align: justify;
}

.cus {
  background-color: #13736f;
}

.no-uppercase {
  text-transform: none !important;
}

.cus2 {
  background: var(
    --grend,
    linear-gradient(
      252deg,
      #e4ecee 0%,
      #9bc2c2 0%,
      #6ca6a5 28%,
      #157470 88%,
      #13736f 100%
    )
  );
}
</style>