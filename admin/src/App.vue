<template>
  <div>
    <PageLoader />
    <v-app>
      <v-layout wrap class="mainbg4">
        <v-main>
          <!-- <AppHeader /> -->
          <v-flex xs12 sm12>
            <router-view :key="$route.fullPath" v-bind:storage="sideNav" />
          </v-flex>
        </v-main>
      </v-layout>
    </v-app>
  </div>
</template>

<script>
// import axios from "axios";
import "./assets/style/font.css";
import "./assets/style/style.css";
// import AppHeader from "@/components/Common/appHeader";

export default {
  name: "App",

  components: {
    // AppHeader,
  },
  data: () => ({
    //
    sideNav: false,
  }),
  // beforeMount() {
  //   if (typeof localStorage.getItem("token") == "string") {
  //     this.$store.commit("appLoading", true);
  //     axios({
  //       method: "POST",
  //       url: "/media/admin/profile",
  //       headers: {
  //         "token": localStorage.getItem("token"),
  //       },
  //     })
  //       .then((response) => {
  //         if (response.data.status) {
  //           this.$store.commit("appLoading", false);
  //           this.$store.commit("userData", response.data.data);
  //           this.$store.commit("userType", response.data.role);
  //           // this.$store.commit("menu", response.data.menu);
  //         }
  //       })
  //       .catch((err) => {
  //         this.$store.commit("appLoading", false);
  //         console.log(err);
  //       });
  //   }
  // },
};
</script>
