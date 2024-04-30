import Vue from "vue";
import Router from "vue-router";
import axios from "axios";
import store from "./store";

Vue.use(Router);
let router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      meta: {
        requiresAuth: false,
        isvendor: false,
        isRegistration: false,
      },
      component: () => import("./views/HomePage"),
    },
    {
      path: '/stepOne',
      props: true,
      name: 'stepOne',
      component: () =>
        import('./views/Registration/stepOne'),
      meta: {
        requiresAuth: true,
        isvendor: false,
        isRegistration: true,

      },
    },
    {
      path: '/stepTwo',
      props: true,
      name: 'stepTwo',
      component: () =>
        import('./views/Registration/stepTwo'),
      meta: {
        requiresAuth: true,
        isvendor: false,
        isRegistration: true,

      },
    },
    {
      path: '/stepThree',
      props: true,
      name: 'stepThree',
      component: () =>
        import('./views/Registration/stepThree'),
      meta: {
        requiresAuth: true,
        isvendor: false,
        isRegistration: true,

      },
    },
    {
      path: '/stepFour',
      props: true,
      name: 'stepFour',
      component: () =>
        import('./views/Registration/stepFour'),
      meta: {
        requiresAuth: true,
        isvendor: false,
        isRegistration: true,

      },
    },
    {
      path: "/Login",
      name: "Login",
      meta: {
        requiresAuth: false,
        isvendor: false,
        isRegistration: false,
      },
      component: () => import("./views/LoginPage"),
    },
    {
      path: "/forgotPassword",
      name: "forgotPassword",
      meta: {
        requiresAuth: false,
        isvendor: false,
        isRegistration: false,
      },
      component: () => import("./common/forgotPassword"),
    },
    {
      path: "/Approval",
      name: "finalPage",
      meta: {
        requiresAuth: false,
        isvendor: false,
        isRegistration: true,
      },
      component: () => import("./views/finalPage"),
    },
    {
      path: "/dashboard",
      props: true,
      component: () => import("./layout/BaseLayout"),
      meta: {
        requiresAuth: true,
        isvendor: true,
        isRegistration: false,

      },
      children: [
        {
          path: "/",
          name: "dashboard",
          meta: {
            requiresAuth: true,
            isvendor: true,
            isRegistration: false,
          },
          component: () => import("./views/HouseBoat/DashboardPage"),
        },
        {
          path: "/profile",
          name: "profile",
          meta: {
            requiresAuth: true,
            isvendor: true,
            isRegistration: false,
          },
          component: () => import("./views/profile"),
        },
        // HOUSE BOAT PAGES
        {
          path: "/Houseboats",
          name: "Houseboats",
          meta: {
            requiresAuth: true,
            isvendor: true,
            isRegistration: false,
          },
          component: () => import("./views/HouseBoat/HouseboatHome"),
        },
        {
          path: "/ViewHouseboat",
          name: "ViewHouseboat",
          meta: {
            requiresAuth: true,
        isvendor: true,
        isRegistration: false,
          },
          component: () => import("./views/HouseBoat/ViewHouseboat"),
        },
        {
          path: "/EditHouseboat",
          name: "EditHouseboat",
          meta: {
            requiresAuth: true,
        isvendor: true,
        isRegistration: false,
          },
          component: () => import("./views/HouseBoat/EditHouseboat"),
        },
        {
          path: "/dayCruiseList",
          name: "dayCruiseList",
          meta: {
            requiresAuth: true,
        isvendor: true,
        isRegistration: false,
          },
          component: () => import("./views/HouseBoat/dayCruiseList"),
        },
        {
          path: "/overNightList",
          name: "overNightList",
          meta: {
            requiresAuth: true,
        isvendor: true,
        isRegistration: false,
          },
          component: () => import("./views/HouseBoat/overNightList"),
        },
        {
          path: "/nightStayList",
          name: "nightStayList",
          meta: {
            requiresAuth: true,
        isvendor: true,
        isRegistration: false,
          },
          component: () => import("./views/HouseBoat/nightStayList"),
        },
        {
          path: "/AddHouseboat",
          name: "AddHouseboat",
          meta: {
            requiresAuth: true,
        isvendor: true,
        isRegistration: false,
          },
          component: () => import("./views/HouseBoat/AddHouseboat"),
        },
        {
          path: "/sellerAdd",
          name: "sellerAdd",
          meta: {
            requiresAuth: true,
        isvendor: true,
        isRegistration: false,
          },
          component: () => import("./views/HouseBoat/sellerAdd"),
        },
        {
          path: "/ImageGallery",
          name: "ImageGallery",
          meta: {
            requiresAuth: true,
        isvendor: true,
        isRegistration: false,
          },
          component: () => import("./views/HouseBoat/ImageGallery"),
        },
        {
          path: "/AddOvernight",
          name: "AddOvernight",
          meta: {
            requiresAuth: true,
        isvendor: true,
        isRegistration: false,
          },
          component: () => import("./views/HouseBoat/AddOvernight"),
        },
        {
          path: "/AddOvernightSeasonalRate",
          name: "AddOvernightSeasonalRate",
          meta: {
            requiresAuth: true,
        isvendor: true,
        isRegistration: false,
          },
          component: () => import("./views/HouseBoat/AddOvernightPage2"),
        },
        {
          path: "/AddNightstay",
          name: "AddNightstay",
          meta: {
            requiresAuth: true,
        isvendor: true,
        isRegistration: false,
          },
          component: () => import("./views/HouseBoat/AddNightstay"),
        },
        {
          path: "/NightstaySeasonalRate",
          name: "NightstaySeasonalRate",
          meta: {
            requiresAuth: true,
        isvendor: true,
        isRegistration: false,
          },
          component: () => import("./views/HouseBoat/AddNightstayPage2"),
        },
        {
          path: "/AddDaycruise",
          name: "AddDaycruise",
          meta: {
            requiresAuth: true,
        isvendor: true,
        isRegistration: false,
          },
          component: () => import("./views/HouseBoat/AddDaycruise"),
        },
        {
          path: "/AddDaycruiseSeasonalRate",
          name: "AddDaycruiseSeasonalRate",
          meta: {
            requiresAuth: true,
        isvendor: true,
        isRegistration: false,
          },
          component: () => import("./views/HouseBoat/AddDaycruisePage2"),
        },
        {
          path: "/DaycruiseSpecialRate",
          name: "DaycruiseSpecialRate",
          meta: {
            requiresAuth: true,
        isvendor: true,
        isRegistration: false,
          },
          component: () => import("./views/HouseBoat/DaycruiseSpecialRate"),
        },
        {
          path: "/OvernightSpecialRate",
          name: "OvernightSpecialRate",
          meta: {
            requiresAuth: true,
        isvendor: true,
        isRegistration: false,
          },
          component: () => import("./views/HouseBoat/OvernightSpecialRate"),
        },
        {
          path: "/NightstaySpecialRate",
          name: "NightstaySpecialRate",
          meta: {
            requiresAuth: true,
        isvendor: true,
        isRegistration: false,
          },
          component: () => import("./views/HouseBoat/NightstaySpecialRate"),
        },
        {
          path: "/houseboatReservation",
          name: "houseboatReservation",
          meta: {
            requiresAuth: true,
        isvendor: true,
        isRegistration: false,
          },
          component: () => import("./views/HouseBoat/houseboatReservation"),
        },
        {
          path: "/houseboatReservationsList",
          name: "houseboatReservationsList",
          meta: {
            requiresAuth: true,
        isvendor: true,
        isRegistration: false,
          },
          component: () => import("./views/HouseBoat/houseboatReservationsList"),
        },
        {
          path: "/houseboatReservationEdit",
          name: "houseboatReservationEdit",
          meta: {
            requiresAuth: true,
        isvendor: true,
        isRegistration: false,
          },
          component: () => import("./views/HouseBoat/houseboatReservationEdit"),
        },
        {
          path: "/houseboatbookings",
          name: "houseboatbookings",
          meta: {
            requiresAuth: true,
        isvendor: true,
        isRegistration: false,
          },
          component: () => import("./views/HouseBoat/houseboatbookings"),
        },
        {
          path: "/houseboatdetailedview",
          name: "houseboatdetailedview",
          meta: {
            requiresAuth: true,
        isvendor: true,
        isRegistration: false,
          },
          component: () => import("./views/HouseBoat/houseboatdetailedview"),
        },
        {
          path: "/HouseboatReport",
          name: "HouseboatReport",
          meta: {
            requiresAuth: true,
        isvendor: true,
        isRegistration: false,
          },
          component: () => import("./views/HouseBoat/HouseboatReport"),
        },
        {
          path: "/Settlement",
          name: "Settlement",
          meta: {
            requiresAuth: true,
        isvendor: true,
        isRegistration: false,
          },
          component: () => import("./views/HouseBoat/Settlement"),
        },
        //SHIKARA PAGES
      
        {
          path: "/Shikara",
          name: "Shikara",
          meta: {
            requiresAuth: true,
        isvendor: true,
        isRegistration: false,
          },
          component: () => import("./views/Shikara/ShikaraHome"),
        },
        {
          path: "/AddShikara",
          name: "AddShikara",
          meta: {
            requiresAuth: true,
        isvendor: true,
        isRegistration: false,
          },
          component: () => import("./views/Shikara/AddShikara"),
        },
        {
          path: "/EditShikara",
          name: "EditShikara",
          meta: {
            requiresAuth: true,
        isvendor: true,
        isRegistration: false,
          },
          component: () => import("./views/Shikara/EditShikara"),
        },
        {
          path: "/tripEditShikara",
          name: "tripEditShikara",
          meta: {
            requiresAuth: true,
        isvendor: true,
        isRegistration: false,
          },
          component: () => import("./views/Shikara/tripEditShikara"),
        },
        {
          path: "/AddDetail",
          name: "AddShikaraDetails",
          meta: {
            requiresAuth: true,
        isvendor: true,
        isRegistration: false,
          },
          component: () => import("./views/Shikara/AddShikaraDetails"),
        },
        {
          path: "/AddShikaraSeasonalRate",
          name: "AddShikaraSeasonalRate",
          meta: {
            requiresAuth: true,
        isvendor: true,
        isRegistration: false,
          },
          component: () => import("./views/Shikara/AddShikaraPage2"),
        },
        {
          path: "/ViewShikara",
          name: "ViewShikara",
          meta: {
            requiresAuth: true,
        isvendor: true,
        isRegistration: false,
          },
          component: () => import("./views/Shikara/ViewShikara"),
        },
        {
          path: "/shikaraGallery",
          name: "shikaraGallery",
          meta: {
            requiresAuth: true,
        isvendor: true,
        isRegistration: false,
          },
          component: () => import("./views/Shikara/shikaraGallery"),
        },
        {
          path: "/ShikaraSpecialRate",
          name: "ShikaraSpecialRate",
          meta: {
            requiresAuth: true,
        isvendor: true,
        isRegistration: false,
          },
          component: () => import("./views/Shikara/ShikaraSpecialRate"),
        },
        {
          path: "/shikarabookings",
          name: "shikarabookings",
          meta: {
            requiresAuth: true,
        isvendor: true,
        isRegistration: false,
          },
          component: () => import("./views/Shikara/shikarabookings"),
        },
        {
          path: "/shikaradetailedview",
          name: "shikaradetailedview",
          meta: {
            requiresAuth: true,
        isvendor: true,
        isRegistration: false,
          },
          component: () => import("./views/Shikara/shikaradetailedview"),
        },
        {
          path: "/ShikaraReservation",
          name: "ShikaraReservation",
          meta: {
            requiresAuth: true,
        isvendor: true,
        isRegistration: false,
          },
          component: () => import("./views/Shikara/reservation/ShikaraReservation"),
        },
        {
          path: "/ShikaraReservationsList",
          name: "ShikaraReservationsList",
          meta: {
            requiresAuth: true,
        isvendor: true,
        isRegistration: false,
          },
          component: () => import("./views/Shikara/reservation/ShikaraReservationsList"),
        },
        {
          path: "/ShikaraReservationEdit",
          name: "ShikaraReservationEdit",
          meta: {
            requiresAuth: true,
        isvendor: true,
        isRegistration: false,
          },
          component: () => import("./views/Shikara/reservation/ShikaraReservationEdit"),
        },
        {
          path: "/ShikaraReport",
          name: "ShikaraReport",
          meta: {
            requiresAuth: true,
        isvendor: true,
        isRegistration: false,
          },
          component: () => import("./views/Shikara/ShikaraReport"),
        },
      ],
    },
    {
      path: "/testdate",
      name: "testdate",
      props: true,
      component: () => import("./views/testdate"),
      meta: {
        requiresAuth: false,
        isvendor: false,
        isRegistration: false,
      },
    },
    {
      path: "/PrivacyPolicy",
      name: "PrivacyPolicy",
      props: true,
      component: () => import("./common/PrivacyPolicy"),
      meta: {
        requiresAuth: false,
        isvendor: false,
        isRegistration: false,
      },
    },
    {
      path: "/services",
      name: "services",
      props: true,
      component: () => import("./common/services"),
      meta: {
        requiresAuth: false,
        isvendor: false,
        isRegistration: false,
      },
    },
    {
      path: "/TermsandConditions",
      name: "TermsandConditions",
      props: true,
      component: () => import("./common/TermsandConditions"),
      meta: {
        requiresAuth: false,
        isvendor: false,
        isRegistration: false,
      },
    },
    {
      path: "/servererror",
      name: "500",
      props: true,
      component: () => import("./common/500Page.vue"),
       meta: {
        requiresAuth: false,
      },
    },
    {
      path: "*",
      name: "404pagenotfound",
      props: true,
      component: () => import("./common/404"),
      meta: {
        requiresAuth: false,
      },
    },
  ],
  scrollBehavior() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
  },
});
router.beforeEach((to, from, next) => {
  localStorage.setItem("PRE", from.path);
  if (store.state.isLoggedIn == true || to.matched.some(route => route.meta.requiresAuth == true)) {
    axios({
      method: 'POST',
      url: '/validate/token',
      headers: {
        token: localStorage.getItem('token')
      }
    }).then(response => {

      if (!response.data.status) {
        console.log("re1")
        store.commit("logoutUser")
        return
      }
    })
      .catch(err => {
        var msg = err;
        console.log(msg)
      });
  }
  // end  of newely added lines
  if (
    to.matched.some((route) => route.meta.requiresAuth == true) &&
    store.state.isLoggedIn == false
  ) {
    console.log("1");
    next({ name: "login", params: { lastPage: from } });
    return;
  }
  if (to.name === "login" && store.state.isLoggedIn == true && store.state.userType == 'Vendor'
  && store.state.loginType == 'UserLogin') {
    console.log("redirect to dash");
    next({ name: "dashboard" });
  }

  // if (
  //   to.matched.some((route) => route.meta.isvendor == false) && from.name != "login" &&
  //   store.state.isLoggedIn == true && store.state.userType == 'Vendor' 
  // ) {
  //   console.log("redirect to dash 2");
  //   next({ name: "dashboard" });
  //   return;
  // }
  // if (
  //   to.matched.some((route) => route.meta.isRegistration == false) && from.name != "login" &&
  //   store.state.isLoggedIn == true && store.state.userType == 'Vendor' && store.state.loginType == 'RegLogin'
  // ) {
  //   console.log("redirect to stepOne");
  //   next({ name: "stepOne" });
  //   return;
  // }
   if (to.name === "stepOne" && store.state.isLoggedIn == true && localStorage.getItem("level") == 4 && localStorage.getItem("isverified") == "Verified") {
    console.log("redirect 1");
    next({ name: "dashboard" });
  }
  if (to.name === "stepTwo" && store.state.isLoggedIn == true && localStorage.getItem("level") == 4 && localStorage.getItem("isverified") == "Verified") {
    console.log("redirect 2");
    next({ name: "dashboard" });
  }
  if (to.name === "stepThree" && store.state.isLoggedIn == true && localStorage.getItem("level") == 4 && localStorage.getItem("isverified") == "Verified") {
    console.log("redirect 3");
    next({ name: "dashboard" });
  }
  if (to.name === "stepFour" && store.state.isLoggedIn == true && localStorage.getItem("level") == 4 && localStorage.getItem("isverified") == "Verified") {
    console.log("redirect 4");
    next({ name: "dashboard" });
  }
  if (to.name === "Home" && store.state.isLoggedIn == true && localStorage.getItem("level") == 4 && localStorage.getItem("isverified") == "Verified") {
    console.log("redirect 5");
    // ***very important dont delete,used to redirect to dashboard afer approval
    next({ name: "dashboard" });
  }
  if (to.name === "Login" && store.state.isLoggedIn == true && localStorage.getItem("level") == 4 && localStorage.getItem("isverified") == "Verified") {
    console.log("redirect 6");
    // ***very important dont delete,used to redirect to dashboard afer approval
    next({ name: "dashboard" });
  }
  if (to.name === "stepOne" && from.name == "stepTwo" && store.state.isLoggedIn == true) {
    console.log("redirect to stepTwo");
    next({ name: "stepTwo" });
  }
  // if (from.name === "finalPage" && store.state.isLoggedIn == true && localStorage.getItem("level") == 4 && localStorage.getItem("isverified") == "Verified") {
  //   console.log("redirect to dash without login");
  //   next({ name: "dashboard" });
  // }
  next();
});

export default router;
