import Vue from "vue";
import Router from "vue-router";
import store from "./store";
import axios from "axios";

Vue.use(Router);
let router = new Router({
  mode: "history",
  routes: [
    {
      path: "/appSidebar",
      props: true,
      component: () => import("./components/Common/appSidebar"),
      meta: {
        requireAuth: true,
      },
      children: [
        {
          path: "/DashboardPage",
          name: "DashboardPage",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/Dashboard/DashboardPage.vue"),
        },
        {
          path: "/agentdetailedview",
          name: "agentdetailedview",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/agent/agentdetailedview.vue"),
        },

        {
          path: "/customer",
          name: "customer",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/customer/CustomerPage.vue"),
        },
        {
          path: "/agentBlocked",
          name: "agentBlocked",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/agent/agentBlocked.vue"),
        },
        {
          path: "/vendordetailedview",
          name: "vendordetailedview",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/vendor/vendordetailedview.vue"),
        },
        {
          path: "/vendorBlocked",
          name: "vendorBlocked",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/vendor/vendorBlocked.vue"),
        },
        {
          path: "/vendoredit",
          name: "vendoredit",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/vendor/vendoredit.vue"),
        },
       
        {
          path: "/location",
          name: "location",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/location/location.vue"),
        },
        {
          path: "/locationdetailedview",
          name: "locationdetailedview",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/location/locationdetailedview.vue"),
        },
       
        {
          path: "/agentedit",
          name: "agentedit",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/agent/agentedit.vue"),
        },

        {
          path: "/appDashboard",
          name: "appDashboard",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/Common/appDashboard"),
        },

        {
          path: "/agent",
          name: "agent",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/agent/agent.vue"),
        },
        {
          path: "/vendor",
          name: "vendor",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/vendor/vendor.vue"),
        },
        {
          path: "/approvedvendor",
          name: "approvedvendor",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/vendor/approvedvendor.vue"),
        },
        {
          path: "/approvedagent",
          name: "approvedagent",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/agent/approvedagent.vue"),
        },
        {
          path: "/shikarabookings",
          name: "shikarabookings",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/bookings/shikarabookings.vue"),
        },

        {
          path: "/shikaradetailedviewbooking",
          name: "shikaradetailedviewbooking",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/bookings/shikaradetailedviewbooking.vue"),
        },
        {
          path: "/houseboatdetailedviewbookings",
          name: "houseboatdetailedviewbookings",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/bookings/houseboatdetailedviewbookings.vue"),
        },


        {
          path: "/houseboatbookings",
          name: "houseboatbookings",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/bookings/houseboatbookings.vue"),
        },
        {
          path: '/resheduleHouseboat',
          props: true,
          name: 'resheduleHouseboat',
          component: () =>
            import('./components/bookings/resheduleHouseboat'),
          meta: {
            requiresAuth: true,
  
          },
        },
        {
          path: "/resheduleShikara",
          name: "resheduleShikara",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/bookings/resheduleShikara.vue"),
        },
        {
          path: "/AboutUs",
          name: "AboutUs",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/aboutus/AboutUs.vue"),
        },
        {
          path: "/houseboats",
          name: "houseboats",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/houseboats/houseboats.vue"),
        },
        {
          path: "/GalleryPage",
          name: "GalleryPage",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/gallery/GalleryPage.vue"),
        },
        {
          path: "/GalleryDetailedview",
          name: "GalleryDetailedview",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/gallery/GalleryDetailedview.vue"),
        },
        {
          path: "/HouseboatGallery",
          name: "HouseboatGallery",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/houseboats/HouseboatGallery.vue"),
        },
        {
          path: "/houseboatReservation",
          name: "houseboatReservation",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/reservations/houseboatReservation.vue"),
        },
        {
          path: "/shikaraReservation",
          name: "shikaraReservation",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/reservations/shikaraReservation.vue"),
        },

        {
          path: "/SettlementsHouseboat",
          name: "SettlementsHouseboat",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/settlements/SettlementsHouseboat.vue"),
        },
        {
          path: "/YoutubeLink",
          name: "YoutubeLink",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/youtubelinks/YoutubeLink.vue"),
        },

        {
          path: "/SettlementsShikara",
          name: "SettlementsShikara",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/settlements/SettlementsShikara.vue"),
        },

        {
          path: "/shikara",
          name: "shikara",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/shikara/ShikaraPage.vue"),
        },
        {
          path: "/EditShikara",
          name: "EditShikara",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/shikara/EditShikara.vue"),
        },
        {
          path: "/ShikaraBlocked",
          name: "ShikaraBlocked",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/shikara/ShikaraBlocked.vue"),
        },
        {
          path: "/shikaradata",
          name: "shikaradata",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/shikara/shikaradata.vue"),
        },
        {
          path: "/shikarapending",
          name: "shikarapending",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/shikara/shikarapending.vue"),
        },
        {
          path: "/shikaraapproved",
          name: "shikaraapproved",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/shikara/shikaraapproved.vue"),
        },
        {
          path: "/ShikaraGallery",
          name: "ShikaraGallery",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/shikara/ShikaraGallery.vue"),
        },

        {
          path: "/ShikaraDetailedview",
          name: "ShikaraDetailedview",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/shikara/ShikaraDetailedview.vue"),
        },
        {
          path: "/houseboatapproved",
          name: "houseboatapproved",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/houseboats/houseboatapproved.vue"),
        },
        {
          path: "/houseboatpending",
          name: "houseboatpending",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/houseboats/houseboatpending.vue"),
        },
       
        {
          path: "/houseboatBlocked",
          name: "houseboatBlocked",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/houseboats/houseboatBlocked.vue"),
        },

        {
          path: "/houseboatdata",
          name: "houseboatdata",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/houseboats/houseboatdata.vue"),
        },
        {
          path: "/houseboatapproveddetailed",
          name: "houseboatapproveddetailed",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/houseboats/houseboatapproveddetailed.vue"),
        },
        {
          path: "/approveddetailed",
          name: "approveddetailed",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/shikara/approveddetailed.vue"),
        },
        {
          path: "/houseboatdetailedview",
          name: "houseboatdetailedview",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/houseboats/houseboatdetailedview.vue"),
        },
        {
          path: "/houseboatedit",
          name: "houseboatedit",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/houseboats/houseboatedit.vue"),
        },
        {
          path: "/termsandconditions",
          name: "termsandconditions",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/termsandconditions/termsandcondition.vue"),
        },
        {
          path: "/privacypolicy",
          name: "privacypolicy",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/privacypolicy/privacypolicy.vue"),
        },
        {
          path: "/ourservices",
          name: "ourservices",
          meta: {
            requireAuth: true,
          },
          component: () => import("./components/ourservices/ourservices.vue"),
        },
        {
          path: "/page1",
          component: () => import("./components/TestPage"),
        },

      ],
    },
    {
      path: "/",
      name: "LoginPage",
      meta: {
        requireAuth: false,
      },
      component: () => import("./components/Login/LoginPage"),
    },
    {
      path: '/OtpPage',
      name: 'OtpPage',
      meta: {
        requireAuth: false,
      },
      component: function () {
        return import(/* webpackChunkName: "about" */ './components/Login/OtpPage.vue')
      }
    },
    {
      path: "/ServerError",
      name: "ServerError",
      props: true,
      component: () => import("./components/Common/500"),
    },
    {
      path: "*",
      name: "404PageNotFound",
      props: true,
      meta: {
        requiresAuth: false,
      },
      component: () => import("./components/Common/404"),
    },
  ],
});
router.beforeEach((to, from, next) => {
  if (
    to.matched.some((route) => route.meta.requireAuth == true) &&
    store.state.isLoggedIn == false
  ) {
    console.log(from);
    next({ name: "LoginPage", params: { lastPage: from } });
    return;
  }

  if (store.state.isLoggedIn == true) {
    axios({
      method: "GET",
      url: "/token/authenticate",
      headers: {
        "token": localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (!response.data.status) {
          store.commit("sessionOut", true);
          return;
        }
      })
      .catch((err) => {
        var msg = err;
        console.log(msg);
      });
  }

  if (to.name == "LoginPage" && store.state.isLoggedIn == true) {
    const userType = getUserType();
    if (userType === "admin") {
      next({ name: "DashboardPage" });
    } else {
      next({ name: "DashboardPage" });
    }
    return;
  }

  next();
});

function getUserType() {
  const utype = localStorage.getItem("utype");
  if (utype === "777") {
    return "admin";
  } else {
    return "division";
  }
}

export default router