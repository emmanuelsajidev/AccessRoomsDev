<template>
  <div>
    <ServerError v-if="ServerError" />
    <vue-element-loading
      :active="appLoading"
      spinner="bar-fade-scale"
      color="black"
      size="128"
      is-full-screen
    />
    <v-snackbar v-model="showsnackbar" color="black" right>
      <v-layout wrap justify-center>
        <v-flex text-left class="align-self-center">{{ msg }}</v-flex>
        <v-flex text-right>
          <v-btn small :ripple="false" text @click="showsnackbar = false">
            <v-icon style="color: white">mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-snackbar>
    <v-dialog
      v-model="cropImageDialog"
      persistent
      :width="
        $vuetify.breakpoint.name == 'xs' || $vuetify.breakpoint.name == 'sm'
          ? '100vw'
          : $vuetify.breakpoint.name == 'md'
          ? '80vw'
          : $vuetify.breakpoint.name == 'lg'
          ? '50vw'
          : '40vw'
      "
    >
      <v-card>
        <v-layout wrap justify-center pa-2>
          <v-flex xs12>
            <ImageCropper
              :image="currentImage"
              :key="currentImage"
              :width="1728"
              :height="781"
              @stepper="imageCropper"
            />
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
    <v-layout wrap pa-5>
      <v-flex xs12>
        <v-layout wrap>
          <v-flex xs12 text-left>
            <span style="color: #000; font-family: poppinsbold; font-size: 25px"
              >Add Seller</span
            >
          </v-flex>
        </v-layout>
      </v-flex>
      <v-layout wrap>
        <v-flex xs12 pa-2 style="font-family: poppinsmedium">
          <v-text-field
            outlined
            dense
            v-model="seller.shopName"
            label="Shop Name"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs12 pa-2>
          <span style="font-family: poppinsmedium">Description</span>
        </v-flex>
        <v-flex xs12 pa-2>
          <div id="app">
            <vue-editor v-model="seller.description"></vue-editor>
          </div>
        </v-flex>
        <v-flex xs12 sm12 pt-5 pa-2
          ><span style="font-family: poppinssemibold">Address</span></v-flex
        >
        <v-flex xs12 sm6 pt-5 pa-2 style="font-family: poppinsmedium">
          <v-text-field
            outlined
            dense
            v-model="seller.address.name"
            label="Name"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 pt-5 pa-2 style="font-family: poppinsmedium">
          <v-text-field
            outlined
            dense
            v-model="seller.address.place"
            label="Place"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 pa-2 style="font-family: poppinsmedium">
          <v-text-field
            outlined
            dense
            v-model="seller.address.district"
            label="District"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 pa-2 style="font-family: poppinsmedium">
          <v-text-field
            outlined
            dense
            v-model="seller.contactPerson"
            label="Contact Person"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 pa-2 style="font-family: poppinsmedium">
          <v-text-field
            outlined
            dense
            v-model="seller.email"
            label="Email"
            required
            :rules="emailRules"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 pa-2 style="font-family: poppinsmedium">
          <v-text-field
            outlined
            dense
            v-model="seller.contactNumber"
            label="Contact Number"
            required
            :rules="rules"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm12 pa-2 style="font-family: poppinssemibold"
          ><span>Social media links</span></v-flex
        >
        <v-flex xs12 sm6 pa-2 style="font-family: poppinsmedium">
          <v-text-field
            outlined
            dense
            v-model="seller.socialmedialinks.whatsapp"
            label="Whatsapp"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 pa-2 style="font-family: poppinsmedium">
          <v-text-field
            outlined
            dense
            v-model="seller.socialmedialinks.facebook"
            label="Facebook"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 pa-2 style="font-family: poppinsmedium">
          <v-text-field
            outlined
            dense
            v-model="seller.socialmedialinks.instagram"
            label="Instagram"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm12 pa-2 style="font-family: poppinssemibold"
          ><span>Bank Details</span></v-flex
        >
        <v-flex xs12 sm6 pa-2 style="font-family: poppinsmedium">
          <v-text-field
            outlined
            dense
            v-model="seller.bankDetails.bank"
            label="Bank Name"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 pa-2 style="font-family: poppinsmedium">
          <v-text-field
            outlined
            dense
            v-model="seller.bankDetails.accountHolder"
            label="Account Holder"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 pa-2 style="font-family: poppinsmedium">
          <v-text-field
            outlined
            dense
            v-model="seller.bankDetails.accountNo"
            label="Account Number"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 pa-2 style="font-family: poppinsmedium">
          <v-text-field
            outlined
            dense
            v-model="seller.bankDetails.ifsc"
            label="IFSC"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 pa-2 style="font-family: poppinsmedium">
          <v-text-field
            outlined
            dense
            v-model="seller.bankDetails.branch"
            label="Branch"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs12 pa-2 style="font-family: poppinsmedium">
          <ImageComp
            :singleImage="profileImage"
            @stepper="winStepper"
            :width="494"
            :height="324"
            :heading="'Upload Profile Image (494 * 324)'"
            :componentType="'profileImage'"
          />
        </v-flex>
        <v-flex xs12 pa-2>
          <span style="font-family: poppinsmedium"
            >Upload Banner Images (1728 * 781)
          </span>
          <v-card class="mx-auto" outlined>
            <v-layout wrap pa-3>
              <v-flex xs12 md12 lg12>
                <v-layout wrap>
                  <v-flex lg1> </v-flex>
                  <v-flex
                    xs12
                    sm3
                    v-for="(item, i) in imageArray"
                    :key="i"
                    pa-1
                  >
                    <v-img :src="item" height="50px" contain>
                      <v-layout wrap>
                        <v-flex text-right pa-0>
                          <v-avatar color="#FF3434" size="15">
                            <v-icon
                              color="#FFF"
                              small
                              @click="removeImageArray(i)"
                            >
                              mdi-close
                            </v-icon>
                          </v-avatar>
                        </v-flex>
                      </v-layout>
                    </v-img>
                  </v-flex>
                </v-layout>

                <div class="dottedline"></div>
                <v-layout wrap pt-1 align-center>
                  <v-flex xs10 md6 lg12 align-self-center text-center pb-2>
                    <v-icon
                      size="25px"
                      id="pro_pic"
                      @click="$refs.files.click()"
                      >mdi-plus</v-icon
                    >
                    <span style="color: #828282; font-size: 14px"
                      >Upload your banner Image</span
                    >
                    <input
                      v-show="false"
                      accept="image/*"
                      id="file"
                      ref="files"
                      type="file"
                      @change="uploadImages"
                    />
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout wrap justify-end py-10>
        <v-flex xs12 sm6 md4 text-right>
          <v-btn color="green" dark block depressed @click="add()"
            ><span>Save</span></v-btn
          >
        </v-flex>
      </v-layout>
    </v-layout>
  </div>
</template>
  <script>
import axios from "axios";
// import { VueEditor } from "vue2-editor";
// import ImageComp from "@/components/Common/singleImages";
import ImageCropper from "./imageCropper";
export default {
  components: {
    // VueEditor,
    // ImageComp,
    ImageCropper,
  },
  data() {
    return {
      showsnackbar: false,
      ServerError: false,
      msg: null,
      appLoading: false,
      dialog: false,
      itemid: "",
      profileImage: "",
      imageArray: [],
      Images: new FormData(),
      formData: new FormData(),
      selectedFiles: null,
      currentImage: "",
      cropImageDialog: false,
      story: {},
      itemediting: [],
      editdialog: false,
      editingitem: {},
      seller: {
        shopName: "",
        description: "",
        address: {
          name: "",
          place: "",
          district: "",
        },
        contactPerson: "",
        email: "",
        contactNumber: "",
        socialmedialinks: {
          whatsapp: "",
          facebook: "",
          instagram: "",
        },
        bankDetails: {
          bank: "",
          accountHolder: "",
          accountNo: "",
          ifsc: "",
          branch: "",
        },
      },
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        minPhone: (value) => value.length == 10 || "Invalid Phone",
      },
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "E-mail must be valid",
      ],
    };
  },
  methods: {
    imageCropper(payload) {
      this.cropImageDialog = payload.dialog;
      if (payload.image) {
        this.collectImages(payload.image);
      }
    },
    winStepper(window_data) {
      if (window_data.type == "profileImage") {
        this.profileImage = window_data.selectedFiles;
      }
    },
    add() {
      axios({
        url: "/seller/add",
        method: "POST",
        data: this.seller,
        headers: {
          token: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status == true) {
            var id = response.data.data._id;
            if (this.profileImage) {
              this.uploadImage(id);
            }
            if (this.imageArray.length > 0) {
              this.uploadAllImages(id);
            }
            if (!this.profileImage && !this.imageArray.length > 0) {
              this.$router.push("/sellerList");
            }
            this.msg = "Edited Sucessfully";
            this.showsnackbar = true;
            this.dialog = false;
          } else {
            this.msg = response.data.msg;
            this.showsnackbar = true;
          }
        })
        .catch((err) => {
          this.appLoading = false;
          this.ServerError = true;
          console.log(err);
        });
    },
    uploadImage(id) {
      let formData = new FormData();
      formData.append("id", id);
      formData.append("image", this.profileImage);
      axios({
        method: "POST",
        url: "/seller/upload/profileImage",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status == true) {
            this.showsnackbar = true;
            this.msg = "Uploaded Successfully";
            this.dialog = false;
          } else {
            this.msg = "Can't Update";
            this.showsnackbar = true;
          }
        })
        .catch((err) => {
          this.appLoading = false;
          this.ServerError = true;
          console.log(err);
        });
    },
    removeImageArray(i) {
      var values = this.formData.getAll("photos");
      values.splice(i, 1);
      this.formData.set("photos", values);
      this.imageArray.splice(i, 1);
    },
    uploadImages(event) {
      if (this.imageArray.length < 4) {
        this.currentImage = URL.createObjectURL(event.target.files[0]);
        this.cropImageDialog = true;
      } else {
        this.msg = "Maximum image limit exceeded!";
        this.showSnackBar = true;
        return;
      }
    },
    collectImages(image) {
      this.selectedFiles = image;
      this.Images.append("image", this.selectedFiles);
      this.formData.append("images", this.selectedFiles);
      var img = new Image();
      img.src = window.URL.createObjectURL(image);
      img.onload = () => {
        const urls = URL.createObjectURL(image);
        this.imageArray.push(urls);
        if (this.imageArray) {
          this.image = this.imageArray[0];
        }
      };
    },
    uploadAllImages(id) {
      this.appLoading = true;
      this.formData.append("id", id);
      axios({
        method: "POST",
        url: "/seller/upload/bannerImage",
        data: this.formData,
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status == true) {
            this.msg = "Updated Sucessfully";
            this.showsnackbar = true;
            this.$router.push("/sellerList");
          } else {
            this.msg = "Can't Upload Images";
            this.showsnackbar = true;
          }
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
  <style scoped>
.item_title {
  font-weight: bold;
  font-family: poppinssemibold;
}
</style>
    