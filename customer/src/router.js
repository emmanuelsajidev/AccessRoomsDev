import Vue from "vue";
import Router from "vue-router";
// import axios from "axios";
// import store from "./store";

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
      path: "/Review",
      name: "Review",
      meta: {
        requiresAuth: false,
        isvendor: false,
        isRegistration: false,
      },
      component: () => import("./views/ReviewPage"),
    },
    
    { path: '/index.html', redirect: '/' },
    {
      path: "/SearchBoats",
      name:"boats",
      props: true,
      component: () => import("./layout/BaseLayout"),
      meta: {
        requiresAuth: true,
        isvendor: true,
        isRegistration: false,

      },
    },
      // children: [
        // {
        //   path: "/",
        //   name: "ViewHouseboat",
        //   meta: {
        //     requiresAuth: true,
        //     isvendor: true,
        //     isRegistration: false,
        //   },
        //   component: () => import("./views/Home/ViewHouseboat"),
        // },
        // {
        //   path: "/ViewShikara",
        //   name: "ViewShikara",
        //   meta: {
        //     requiresAuth: true,
        //     isvendor: true,
        //     isRegistration: false,
        //   },
        //   component: () => import("./views/Home/ViewShikara"),
        // },
        {
          path: "/HouseBoat",
          name: "HouseboatDetail",
          meta: {
            requiresAuth: true,
            isvendor: true,
            isRegistration: false,
          },
          component: () => import("./views/Home/HouseboatDetail"),
        },
        {
          path: "/HouseboatDetailMultiple",
          name: "HouseboatDetailMultiple",
          meta: {
            requiresAuth: true,
            isvendor: true,
            isRegistration: false,
          },
          component: () => import("./views/Home/HouseboatDetailMultiple"),
        },
        {
          path: "/ShikaraBoat",
          name: "ShikaraDetail",
          meta: {
            requiresAuth: true,
            isvendor: true,
            isRegistration: false,
          },
          component: () => import("./views/Home/ShikaraDetail"),
        },
        {
          path: "/ImageGallery",
          name: "ImageGallery",
          meta: {
            requiresAuth: true,
            isvendor: true,
            isRegistration: false,
          },
          component: () => import("./views/Home/ImageGallery"),
        },
        {
          path: "/ImageGalleryHouseboat",
          name: "ImageGalleryHouseboat",
          meta: {
            requiresAuth: true,
            isvendor: true,
            isRegistration: false,
          },
          component: () => import("./views/Home/ImageGalleryHouseboat"),
        },
        {
          path: "/myBookings",
          name: "myBookings",
          meta: {
            requiresAuth: true,
            isvendor: true,
            isRegistration: false,
          },
          component: () => import("./views/Home/myBookings"),
        },

        {
          path: "/profile",
          name: "profile",
          meta: {
            requiresAuth: true,
            isvendor: true,
            isRegistration: false,
          },
          component: () => import("./views/Home/ProfilePage"),
        },
        {
          path: "/bookingDetail",
          name: "bookingDetail",
          meta: {
            requiresAuth: true,
            isvendor: true,
            isRegistration: false,
          },
          component: () => import("./views/Home/bookingDetail"),
        },
        {
          path: "/resheduleHouseboat",
          name: "resheduleHouseboat",
          meta: {
            requiresAuth: true,
            isvendor: true,
            isRegistration: false,
          },
          component: () => import("./views/Home/resheduleHouseboat"),
        },
        {
          path: "/bookingDetail2",
          name: "bookingDetail2",
          meta: {
            requiresAuth: true,
            isvendor: true,
            isRegistration: false,
          },
          component: () => import("./views/Home/bookingDetail2"),
        },
        // {
        //   path: "/reservation",
        //   name: "reservation",
        //   meta: {
        //     requiresAuth: true,
        //     isvendor: true,
        //     isRegistration: false,
        //   },
        //   component: () => import("./views/Home/reservation"),
        // },
      // ],
    // },
    {
      path: "/BookHouseboat",
      name: "BookHouseboat",
      props: true,
      component: () => import("./views/Home/BookHouseboat"),
      meta: {
        requiresAuth: false,
        isvendor: false,
        isRegistration: false,
      },
    },
    {
      path: "/BookShikara",
      name: "BookShikara",
      props: true,
      component: () => import("./views/Home/BookShikara"),
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
    {
      path: '/successPage',
      props: true,
      name: 'successPage',
      component: () =>
        import('./views/Payment/success'),
      meta: {
        requiresAuth: true,
        isagent: true,
  
  
      },
    },
    {
      path: '/failurePage',
      props: true,
      name: 'failurePage',
      component: () =>
        import('./views/Payment/failure'),
      meta: {
        requiresAuth: true,
        isagent: true,
        isFailurePage: false,
  
  
  
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
  if (to.name !== "login" && to.name !== "home") {
    localStorage.setItem("routeKey", to.fullPath)
        // var key = localStorage.getItem("routeKey", to.fullPath)
        // console.log("routeKey", key)
}
// if (to.name === 'Home') {
//   // Clear specific values from localStorage
//   localStorage.removeItem("Hcategory");
//   localStorage.removeItem("Htype");
//   localStorage.removeItem("Hlocation");
//   localStorage.removeItem("Hroom");
//   localStorage.removeItem("Htriptype");
//   localStorage.removeItem("HcheckInDate");
//   localStorage.removeItem("HcheckOutDate");
//   localStorage.removeItem("Hchildren");
//   localStorage.removeItem("Hadult");
//   localStorage.removeItem("checkInDate");
//   localStorage.removeItem("checkInTime");
//   localStorage.removeItem("checkOutTime");
//   localStorage.removeItem("location");
//   localStorage.removeItem("children");
//   localStorage.removeItem("adult");
// }
//   if (store.state.isLoggedIn == true || to.matched.some(route => route.meta.requiresAuth == true)) {
//     axios({
//       method: 'POST',
//       url: '/validate/token',
//       headers: {
//         token: localStorage.getItem('token')
//       }
//     }).then(response => {

//       if (!response.data.status) {
//         console.log("re1")
//         store.commit("logoutUser")
//         return
//       }
//     })
//       .catch(err => {
//         var msg = err;
//         console.log(msg)
//       });
//   }
 
  next();
});

export default router;
