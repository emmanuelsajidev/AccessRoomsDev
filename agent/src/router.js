import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import MainPage from './components/shikara/mainpage';
import SearchPage from './components/shikara/Search.vue';
import ListPage from './components/shikara/list.vue';
import ViewPage from './components/shikara/view.vue';
import Houseboatmainpage from './components/houseboats/Houseboatmainpage.vue';
import HouseboatSearch from './components/houseboats/HouseboatSearch.vue';
import Houseboatlist from './components/houseboats/Houseboatlist.vue';
import Houseboatview from './components/houseboats/Houseboatview.vue';
import Houseboatviewmultiple from './components/houseboats/Houseboatviewmultiple.vue';








import axios from 'axios'
Vue.use(VueRouter)
let router = new VueRouter({
  mode: 'history',
  routes: [{
    path: '/',
    props: true,
    name: 'home',
    component: () =>
      import('./components/Home/home'),
    meta: {
      requiresAuth: false,
      isagent: false,

    },
  },
  {
    path: '/successPage',
    props: true,
    name: 'successPage',
    component: () =>
      import('./components/Payment/success'),
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
      import('./components/Payment/failure'),
    meta: {
      requiresAuth: true,
      isagent: true,
      isFailurePage: false,



    },
  },
  {
    path: '/login',
    props: true,
    name: 'login',
    component: () =>
      import('./components/Login/login'),
    meta: {
      requiresAuth: false,


    },
  },

  {
    path: '/forgotPassword',
    props: true,
    name: 'forgotPassword',
    component: () =>
      import('./components/Login/forgotPassword'),
    meta: {
      requiresAuth: false,


    },
  },
  {
    path: '/stepOne',
    props: true,
    name: 'stepOne',
    component: () =>
      import('./components/Registration/stepOne'),
    meta: {
      requiresAuth: true,
      isagent: false,

    },
  },
  {
    path: '/stepTwo',
    props: true,
    name: 'stepTwo',
    component: () =>
      import('./components/Registration/stepTwo'),
    meta: {
      requiresAuth: true,
      isagent: false,

    },
  },
  {
    path: '/finalPage',
    props: true,
    name: 'finalPage',
    component: () =>
      import('./components/Registration/finalPage'),
    meta: {
      requiresAuth: true,
      isagent: false,

    },
  },

  {
    path: "/dashboard",
    props: true,
    component: () => import("./layout/BaseLayout"),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '/',
        props: true,
        name: 'dashboard',
        component: () =>
          import('./components/dashboard/HomePage'),
        meta: {
          requiresAuth: true,
          isagent: true,


        },
      },

      {
        path: '/mainpage',
        props: true,
        name: 'mainpage',
        component: MainPage,
        meta: {
          isagent: true,
          requiresAuth: true,
        },

        children: [
          {
            path: 'search',
            name: 'search',
            component: SearchPage,
            meta: {
              isagent: true,
              requiresAuth: true,
            },

          },
          {
            path: 'list',
            name: 'list',
            component: ListPage,
            meta: {
              isagent: true,
              requiresAuth: true,
            },
          },
          {
            path: 'view',
            name: 'view',
            component: ViewPage,
            meta: {
              isagent: true,
              requiresAuth: true,
            },
          },
        ],
      },

      {
        path: '/Houseboatmainpage',
        props: true,
        name: 'Houseboatmainpage',
        component: Houseboatmainpage,
        meta: {
          isagent: true,
          requiresAuth: true,
        },
        children: [
          {
            path: 'Houseboatviewmultiple',
            name: 'Houseboatviewmultiple',
            component: Houseboatviewmultiple,
            meta: {
              isagent: true,
              requiresAuth: true,
            },
          },

          {
            path: 'HouseboatSearch',
            name: 'HouseboatSearch',
            component: HouseboatSearch,
            meta: {
              isagent: true,
              requiresAuth: true,
            },
          },
          {
            path: 'Houseboatlist',
            name: 'Houseboatlist',
            component: Houseboatlist,
            meta: {
              isagent: true,
              requiresAuth: true,
            },

          },



          {
            path: 'Houseboatview',
            name: 'Houseboatview',
            component: Houseboatview,
            meta: {
              isagent: true,
              requiresAuth: true,
            },
          },

        ],
      },
      {
        path: '/mybookings',
        props: true,
        name: 'mybookings',
        component: () =>
          import('./components/mybookings/MyBookings'),
        meta: {
          requiresAuth: true,
          isagent: true,


        },
      },
      {
        path: '/bookings',
        props: true,
        name: 'bookings',
        component: () =>
          import('./components/mybookings/mybookingsdata'),
        meta: {
          requiresAuth: true,
          isagent: true,


        },
      },
      {
        path: '/houseboatbookings',
        props: true,
        name: 'houseboatbookings',
        component: () =>
          import('./components/mybookings/houseboatbookings'),
        meta: {
          requiresAuth: true,
          isagent: true,


        },
      },
      {
        path: '/resheduleHouseboat',
        props: true,
        name: 'resheduleHouseboat',
        component: () =>
          import('./components/mybookings/resheduleHouseboat'),
        meta: {
          requiresAuth: true,
          isagent: true,


        },
      },
      {
        path: '/houseboatdetailedview',
        props: true,
        name: 'houseboatdetailedview',
        component: () =>
          import('./components/mybookings/houseboatdetailedview'),
        meta: {
          requiresAuth: true,
          isagent: true,


        },
      },

      {
        path: '/shikarabookings',
        props: true,
        name: 'shikarabookings',
        component: () =>
          import('./components/mybookings/shikarabookings'),
        meta: {
          requiresAuth: true,
          isagent: true,


        },
      },

      {
        path: '/bookingsdetailed',
        props: true,
        name: 'bookingsdetailed',
        component: () =>
          import('./components/mybookings/BookingsDetailedview'),
        meta: {
          requiresAuth: true,
          isagent: true,


        },
      },
      {
        path: '/booknow',
        props: true,
        name: 'booknow',
        component: () =>
          import('./components/booknow/boknow'),
        meta: {
          requiresAuth: true,
          isagent: true,


        },
      },


      {
        path: '/ViewProfile',
        props: true,
        name: 'ViewProfile',
        component: () =>
          import('./components/profile/ViewProfile'),
        meta: {
          requiresAuth: true,
          isagent: true,


        },
      },
      {
        path: '/EditProfile',
        props: true,
        name: 'EditProfile',
        component: () =>
          import('./components/profile/EditProfile'),
        meta: {
          requiresAuth: true,
          isagent: true,


        },
      },
      {
        path: '/booknowhouseboat',
        props: true,
        name: 'booknowhouseboat',
        component: () =>
          import('./components/booknow/booknowhouseboat'),
        meta: {
          requiresAuth: true,
          isagent: true,


        },
      },
      {
        path: '/BookHouseboat',
        props: true,
        name: 'BookHouseboat',
        component: () =>
          import('./components/booknow/BookHouseboat'),
        meta: {
          requiresAuth: true,
          isagent: true,


        },
      },

      {
        path: '/ImageGalleryHouseboat',
        props: true,
        name: 'ImageGalleryHouseboat',
        component: () =>
          import('./components/gallery/ImageGalleryHouseboat'),
        meta: {
          requiresAuth: true,
          isagent: true,


        },
      },

      {
        path: '/payment',
        props: true,
        name: 'payment',
        component: () =>
          import('./components/Payment/payment'),
        meta: {
          requiresAuth: true,
          isagent: true,


        },
      },

      {
        path: '/ImageGallery',
        props: true,
        name: 'ImageGallery',
        component: () =>
          import('./components/gallery/ImageGallery'),
        meta: {
          requiresAuth: true,
          isagent: true,


        },
      },
      {
        path: '/HouseboatBooknow',
        props: true,
        name: 'HouseboatBooknow',
        component: () =>
          import('./components/booknow/HouseboatBooknow'),
        meta: {
          requiresAuth: true,
          isagent: true,


        },
      },


      {
        path: '/shikaras',
        props: true,
        name: 'shikaras',
        component: () =>
          import('./components/clientbooking/shikaras'),
        meta: {
          requiresAuth: true,
          isagent: true,


        },
      },
      {
        path: '/houseboat',
        props: true,
        name: 'houseboat',
        component: () =>
          import('./components/clientbooking/houseboat'),
        meta: {
          requiresAuth: true,
          isagent: true,


        },
      },
    ],
  },

  {
    path: '/stepThree',
    props: true,
    name: 'stepThree',
    component: () =>
      import('./components/Registration/stepThree'),
    meta: {
      requiresAuth: true,
      isagent: false,


    },
  },

  {
    path: '/stepFour',
    props: true,
    name: 'stepFour',
    component: () =>
      import('./components/Registration/stepFour'),
    meta: {
      requiresAuth: true,
      isagent: false,


    },
  },
  {
    path: "/privacypolicy",
    name: "PrivacyPolicy",
    props: true,
    component: () => import("./components/Common/PrivacyPolicy"),
  },

  {
    path: "/termsandconditions",
    name: "TermsandConditions",
    props: true,
    component: () => import("./components/Common/TermsandConditions"),
  },
  {
    path: "/ourservices",
    name: "Services",
    props: true,
    component: () => import("./components/Common/services.vue"),
  },
  {
    path: '/ServerError',
    name: 'ServerError',
    props: true,
    component: () =>
      import('./components/Common/500'),
    meta: {
      requiresAuth: false,

    }
  },
  {
    path: '*',
    name: '404PageNotFound',
    props: true,
    component: () =>
      import('./components/Common/404'),
    meta: {
      requiresAuth: false,

    }
  },

  ],
  scrollBehavior() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  },
})

router.beforeEach(async (to, from, next) => {

  const leavingSpecificPages2 = ['HouseboatSearch', 'Houseboatlist', 'Houseboatview', 'Houseboatviewmultiple', 'HouseboatBooknow', 'booknowhouseboat','BookHouseboat'].includes(from.name);
  const notEnteringSpecificPages2 = !['HouseboatSearch', 'Houseboatlist', 'Houseboatview', 'Houseboatviewmultiple', 'HouseboatBooknow', 'booknowhouseboat','BookHouseboat'].includes(to.name);

  if (leavingSpecificPages2 && notEnteringSpecificPages2) {

    localStorage.removeItem('houseboatSearchFilters');


  }
  const leavingSpecificPages = ['search', 'list', 'view', 'booknow'].includes(from.name);

  const notEnteringSpecificPages = !['search', 'list', 'view', 'booknow'].includes(to.name);

  if (leavingSpecificPages && notEnteringSpecificPages) {
    localStorage.removeItem('shikaraSearchFilters');
  }


  if (
    to.matched.some((route) => route.name == "login") &&
    store.state.isLoggedIn
  ) {
    next({ name: "dashboard" });
    return;
  }

  if (store.state.isLoggedIn || to.matched.some(route => route.meta.requiresAuth == true)) {
    try {
      const response = await axios({
        method: 'GET',
        url: '/token/authenticate',
        headers: {
          token: localStorage.getItem('token')
        }
      });

      if (!response.data.status) {
        store.commit("sessionOut", true);
        return;
      }
    } catch (err) {
      console.error(err);
    }
  }

  if (
    to.matched.some((route) => route.meta.requiresAuth == true) &&
    store.state.isLoggedIn == false
  ) {
    console.log("1");
    next({ name: "login", params: { lastPage: from } });
    return;
  }
  if (to.name === "login" && store.state.isLoggedIn == true && store.state.userType == 'Agent'
    && store.state.loginType == 'UserLogin') {
    console.log("redirect to dash");
    next({ name: "dashboard" });
  }
  if (to.name == "home" && from.name == "stepOne") {
    console.log("redirect 67");
    next({ name: "stepOne" });
  }

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
  } //deded
  if (to.name === "finalPage" && store.state.isLoggedIn == true && localStorage.getItem("level") == 4 && localStorage.getItem("isverified") == "Verified") {
    console.log("redirect 4");
    next({ name: "dashboard" });
  }
  if (to.name === "home" && store.state.isLoggedIn == true && localStorage.getItem("level") == 4 && localStorage.getItem("isverified") == "Verified") {
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

  next();
});



export default router