import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import axios from 'axios'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
    topImage: null,
    profileImg:null,
        searchFilters: {
            location: null,
            checkInTime: null,
            checkOutTime: null,
            checkInDate: null,
            memberCount: null,
            childrenCount: null,

        },


        searchFilters2: {
            Hcategory: null,
            Htype: null,
            Hlocation: null,
            Hroom: null,
            Hadult: null,
            Hchildren: null,
            Htriptype: null,
            HcheckInDate: null,
            HcheckOutDate: null,
        },


        isLoggedIn: !!localStorage.getItem("token"),
        userType: localStorage.getItem('userType'),
        // userType: 'Client',
        cartItems: 0,
        wishlistItems: 0,
        userRole: localStorage.getItem('userRole'),
        userName: localStorage.getItem('userName'),
        userData: {},
        userId: '',

        level: "",
        authData: localStorage.getItem('authData'),
        id1: null, // new Line
        coupen: {},
        buyNGetMDeal: 0,
        loginAlternate: false,
        fullPath: null,
        categories: [],
        stylCategories: [],
        loginType: localStorage.getItem("loginType"),

        subCategories: [],
        subCategoriesAll: [],
        guestId: null,
        link: "",
        code: "",
        cartLength: 0,
        // hasGuestId:false,
    },
    mutations: {
        setTopImage(state, payload) {
            state.topImage = payload;
          },
        setFilters(state, filters) {
            state.searchFilters = filters;
        },
        clearFilters(state) {
            state.searchFilters = {};
        },
        setFilters2(state, filters) {
            state.searchFilters2 = filters;
        },
        clearFilters2(state) {
            state.searchFilters2 = {};
        },
        level(state, payload) {
            state.level = payload
            console.log("state.level=", state.level)
            //      
        },
        loginType(state, payload) {
            state.loginType = payload
            console.log("loginType=", state.loginType)
        },
        loginUser(state, payload) {
            state.isLoggedIn = true;
            state.userData = payload
            console.log("isloggedin=", state.isLoggedIn)
            // if (state.isLoggedIn == true && state.userType == 'Vendor') {
            //   router.push("/StepOne") 
            // }
        },

        guestIdUpdation(state, item) {
            state.guestId = item
            // state.hasGuestId=true

        },

        LOGIN_ALTERNATE(state, item) {
            state.loginAlternate = item

        },

        lastPage_fullPath(state, item) {
            // console.log(state,item,"fghj")
            state.fullPath = item
        },

        logoutUser(state) {
            axios({
                method: "GET",
                url: "/logout/",
                headers: {
                    token: localStorage.getItem("token")
                }
            }).then(response => {
                if (response.data) {
                    state.userType = 'Client'
                    state.userData = {}
                    state.coupen = {}
                    localStorage.setItem("userType", 'Client');
                    state.isLoggedIn = false
                    state.cartLength = 0;
                    state.wishlistItems = 0
                    localStorage.clear();

                    localStorage.removeItem("token");
                    localStorage.removeItem("userDataId");
                    state.id1 = null
                    // axios({
                    //         method: "GET",
                    //         url: "/user/guest",
                    //     })
                    //     .then((response) => {
                    //         if (response.data.status) {
                    //             localStorage.setItem("userId", response.data.id)
                    //                 // this.$store.commit("guestIdUpdation", response.data.id);
                    //                 // console.log(response.data.id, this.$store.state.guestId,"hii");
                    //         }
                    //     })
                    //     .catch((err) => {
                    //         console.log(err);
                    //     });
                    if (window.location.pathname != '/') {
                        router.push('/')
                    }
                }
            })
        },

        changeCart(state, item) {
            state.cartLength = item
        },
        changeWishlist(state, item) {
            state.wishlistItems = item
        },
        userData(state, item) {
            state.profileImg=item.profileImage
            state.userData = item
            localStorage.setItem('userRole', item.role)
        },
        userId(state, item) {
            state.userId = item
            localStorage.setItem('userId', item)
        },
        coupen(state, item) {
            state.coupen = item
        },
        link(state, item) {
            state.link = item
        },
        code(state, item) {
            state.code = item
        },
        changePicture(state, item) {
            state.userData.image = item
        },
        changeCoverPicture(state, item) {
            state.userData.seller.coverimage = item
        },
        userType(state, item) {
            state.userType = item
            localStorage.setItem("userType", item);
        },
        changeBuyNGetMDeal(state, item) {
            state.buyNGetMDeal = item
        },
        sessionOut(state) {
            localStorage.removeItem("token");
            state.isLoggedIn = false
            router.push('/')
            state.cartLength = 0
        },
        getId(state, item) {
            state.id1 = item
        }
    },
    actions: {

    }

})