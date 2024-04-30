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
        requiresAuth: false,
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
        requiresAuth: false,
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
        requiresAuth: false,
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
        requiresAuth: false,
        isvendor: false,
        isRegistration: true,

      },
    },
    {
      path: "/Login",
      name: "Login",
      meta: {
        requiresAuth: false,
        isvendor: true,
        isRegistration: false,
      },
      component: () => import("./views/LoginPage"),
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
      ],
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

  if (
    to.matched.some((route) => route.meta.isvendor == false) && from.name != "login" &&
    store.state.isLoggedIn == true && store.state.userType == 'Vendor' && store.state.loginType == 'UserLogin'
  ) {
    console.log("redirect to dash 2");
    next({ name: "dashboard" });
    return;
  }
  if (
    to.matched.some((route) => route.meta.isRegistration == false) && from.name != "login" &&
    store.state.isLoggedIn == true && store.state.userType == 'Vendor' && store.state.loginType == 'RegLogin'
  ) {
    console.log("redirect to stepOne");
    next({ name: "stepOne" });
    return;
  }

  next();
});

export default router;
