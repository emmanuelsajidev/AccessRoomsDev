(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0d91839d"],{a091:function(t,a,e){},ba42:function(t,a,e){"use strict";e.r(a);var s=e("8336"),i=e("b0af"),o=e("0e8f"),n=e("132d"),r=e("adda"),l=e("a722"),c=e("1d4d"),p=e("1f4f"),f=e("2db4"),x=(e("14d9"),function(){var t=this,a=t._self._c;return a("div",[a("vue-element-loading",{attrs:{active:t.appLoading,"is-full-screen":!0,"background-color":"#FFFFFF",color:"#002635",spinner:"bar-fade-scale"}}),t.ServerError?a("ServerError"):t._e(),a(f["a"],{attrs:{color:"#f54c0c",right:"",timeout:t.timeout},model:{value:t.showSnackbar,callback:function(a){t.showSnackbar=a},expression:"showSnackbar"}},[a(l["a"],{attrs:{wrap:"","justify-center":""}},[a(o["a"],{staticClass:"align-self-center",attrs:{"text-left":""}},[a("span",{staticStyle:{color:"white"}},[t._v(" "+t._s(t.msg)+" ")])]),a(o["a"],{attrs:{"text-right":""}},[a(s["a"],{attrs:{small:"",ripple:!1,text:""},on:{click:function(a){t.showSnackbar=!1}}},[a(n["a"],{staticStyle:{color:"white"}},[t._v("mdi-close")])],1)],1)],1)],1),a(l["a"],{attrs:{wrap:"","justify-center":""}},[a(o["a"],{attrs:{xs12:"","align-self-center":""}},[a(i["a"],{staticClass:"pa-0 pa-md-4",attrs:{tile:""}},[a(l["a"],{attrs:{wrap:""}},[t.HouseboatData?a(o["a"],{staticClass:"hidden-sm-and-down",attrs:{xs12:""}},[t.HouseboatData.coverImage?a(r["a"],{attrs:{cover:"",src:t.mediaUURL+t.HouseboatData.coverImage,contain:""},scopedSlots:t._u([{key:"placeholder",fn:function(){return[a("ImageLoader")]},proxy:!0}],null,!1,958508573)},[a(l["a"],{attrs:{"justify-start":"","fill-height":""}},[a(o["a"],{attrs:{xs3:"",md2:"","align-self-end":"","mb-4":"","ml-8":""}},[t.HouseboatData.propertyImages?a(i["a"],{staticClass:"pa-1",attrs:{height:"110px",width:"150px"}},[t.HouseboatData.propertyImages.length>0?a(r["a"],{attrs:{height:"100%",width:"100%",src:t.mediaUURL+t.HouseboatData.propertyImages[0],contain:""},scopedSlots:t._u([{key:"placeholder",fn:function(){return[a("ImageLoader")]},proxy:!0}],null,!1,958508573)}):a(r["a"],{attrs:{height:"100%",src:e("9027"),contain:""},scopedSlots:t._u([{key:"placeholder",fn:function(){return[a("ImageLoader")]},proxy:!0}],null,!1,958508573)})],1):t._e()],1),a(o["a"],{attrs:{xs8:"","align-self-end":"","mb-4":""}},[t.HouseboatData.shikaraName?a("span",{staticStyle:{"font-family":"LexendFont","font-weight":"500","font-size":"22px",color:"white"}},[t._v(t._s(t.HouseboatData.shikaraName))]):t._e(),"Blocked"==t.HouseboatData.shikaraStatus?a("span",{staticClass:"pl-2",staticStyle:{"font-weight":"600","font-size":"18px",color:"red","font-family":"LexendFont"}},[t._v("Status : Blocked")]):t._e()]),a(o["a"],{attrs:{xs2:"","align-self-end":"","text-right":"","mb-4":"","pr-8":""}},["Blocked"!=t.HouseboatData.shikaraStatus?a(s["a"],{staticStyle:{"border-radius":"2px"},attrs:{color:"grey"},on:{click:function(a){return t.$router.push("/EditShikara?id="+t.$route.query.id)}}},[a("span",{staticStyle:{"font-family":"LexendFont","font-weight":"600","font-size":"15px",color:"white"}},[t._v("Edit")])]):t._e()],1)],1)],1):a(r["a"],{attrs:{width:"1251px",height:"xs"==t.$vuetify.breakpoint.name||"sm"==t.$vuetify.breakpoint.name||"md"==t.$vuetify.breakpoint.name?"600px":(t.$vuetify.breakpoint.name,"300px"),src:e("3b8b")}},[a(l["a"],{attrs:{"justify-start":"","fill-height":""}},[a(o["a"],{attrs:{xs12:"",sm2:"","align-self-end":"","mb-4":"","ml-4":""}},[t.HouseboatData.propertyImages?a(i["a"],{staticClass:"pa-1",attrs:{height:"110px",width:"110px"}},[t.HouseboatData.propertyImages.length>0?a(r["a"],{attrs:{height:"110px",cover:"",src:t.mediaUURL+t.HouseboatData.propertyImages[0],contain:""},scopedSlots:t._u([{key:"placeholder",fn:function(){return[a("ImageLoader")]},proxy:!0}],null,!1,958508573)}):a(r["a"],{attrs:{height:"100%",src:e("9027"),contain:""},scopedSlots:t._u([{key:"placeholder",fn:function(){return[a("ImageLoader")]},proxy:!0}],null,!1,958508573)})],1):t._e()],1),a(o["a"],{attrs:{xs8:"","align-self-end":"","mb-4":""}},[t.HouseboatData.shikaraName?a("span",{staticStyle:{"font-family":"LexendFont","font-weight":"500","font-size":"22px",color:"white"}},[t._v(t._s(t.HouseboatData.shikaraName))]):t._e()]),a(o["a"],{attrs:{xs2:"","align-self-end":"","text-right":"","mb-4":"","pr-8":""}},["Blocked"!=t.HouseboatData.shikaraStatus?a(s["a"],{staticStyle:{"border-radius":"2px"},attrs:{color:"grey"},on:{click:function(a){return t.$router.push("/EditShikara?id="+t.$route.query.id)}}},[a("span",{staticStyle:{"font-family":"LexendFont","font-weight":"600","font-size":"15px",color:"white"}},[t._v("Edit")])]):t._e()],1)],1)],1)],1):t._e(),t.HouseboatData?a(o["a"],{staticClass:"hidden-md-and-up",attrs:{xs12:""}},[t.HouseboatData.coverImage?a(r["a"],{attrs:{cover:"",height:"200px",src:t.mediaUURL+t.HouseboatData.coverImage},scopedSlots:t._u([{key:"placeholder",fn:function(){return[a("ImageLoader")]},proxy:!0}],null,!1,958508573)},[a(l["a"],{attrs:{"justify-start":"","fill-height":""}},[t.HouseboatData.propertyImages?a(o["a"],{attrs:{xs3:"",sm2:"","align-self-end":"","ma-1":""}},[a(i["a"],{staticClass:"pa-0",attrs:{height:"50px",contain:""}},[t.HouseboatData.propertyImages.length>0?a(r["a"],{attrs:{height:"100%",width:"100%",src:t.mediaUURL+t.HouseboatData.propertyImages[0],contain:""},scopedSlots:t._u([{key:"placeholder",fn:function(){return[a("ImageLoader")]},proxy:!0}],null,!1,958508573)}):a(r["a"],{attrs:{height:"100%",src:e("9027"),contain:""},scopedSlots:t._u([{key:"placeholder",fn:function(){return[a("ImageLoader")]},proxy:!0}],null,!1,958508573)})],1)],1):t._e(),a(o["a"],{attrs:{xs9:"","align-self-end":"","mb-4":""}},[t.HouseboatData.shikaraName?a("span",{staticStyle:{"font-family":"LexendFont","font-weight":"500","font-size":"16px",color:"white"}},[t._v(t._s(t.HouseboatData.shikaraName))]):t._e()]),a(o["a"],{attrs:{xs2:"","align-self-end":"","text-right":"","mb-4":"","pr-8":""}},["Blocked"!=t.HouseboatData.shikaraStatus?a(s["a"],{staticStyle:{"border-radius":"2px"},attrs:{text:""},on:{click:function(a){return t.$router.push("/EditShikara?id="+t.$route.query.id)}}},[a("span",{staticStyle:{"font-family":"LexendFont","font-weight":"600","font-size":"15px",color:"white"}},[a(n["a"],[t._v("mdi-pencil")])],1)]):t._e()],1)],1)],1):a(r["a"],{attrs:{height:"200px",width:"1251px",src:e("3b8b")}},[a(l["a"],{attrs:{"justify-start":"","fill-height":""}},[t.HouseboatData.propertyImages?a(o["a"],{attrs:{xs3:"",sm2:"","align-self-end":"","ma-1":""}},[a(i["a"],{staticClass:"pa-0",attrs:{height:"50px",contain:""}},[t.HouseboatData.propertyImages.length>0?a(r["a"],{attrs:{height:"100%",width:"100%",src:t.mediaUURL+t.HouseboatData.propertyImages[0],contain:""}}):a(r["a"],{attrs:{height:"100%",src:e("9027"),contain:""},scopedSlots:t._u([{key:"placeholder",fn:function(){return[a("ImageLoader")]},proxy:!0}],null,!1,958508573)})],1)],1):t._e(),a(o["a"],{attrs:{xs9:"","align-self-end":"","mb-4":""}},[t.HouseboatData.shikaraName?a("span",{staticStyle:{"font-family":"LexendFont","font-weight":"500","font-size":"16px",color:"white"}},[t._v(t._s(t.HouseboatData.shikaraName))]):t._e()]),a(o["a"],{attrs:{xs2:"","align-self-end":"","text-right":"","mb-4":"","pr-8":""}},[a(s["a"],{staticStyle:{"border-radius":"2px"},attrs:{text:""},on:{click:function(a){return t.$router.push("/EditShikara?id="+t.$route.query.id)}}},[a("span",{staticStyle:{"font-family":"LexendFont","font-weight":"600","font-size":"15px",color:"white"}},[a(n["a"],[t._v("mdi-pencil")])],1)])],1)],1)],1)],1):t._e()],1),a(l["a"],{staticStyle:{"background-color":"rgba(245, 242, 240, 1)"},attrs:{"justify-space-between":"","justify-sm-start":"",wrap:"","pa-0":"","pa-sm-4":"","my-4":""}},[a(o["a"],{attrs:{xs12:"",sm2:"",md4:"","align-self-center":""}},[a(l["a"],{attrs:{wrap:"","pa-2":"","pa-md-0":""}},[a(o["a"],{attrs:{xs6:"",sm12:"",md4:"","align-self-center":"","text-center":""}},[a("span",{staticStyle:{"font-family":"LexendFont","font-weight":"600","font-size":"10px",color:"rgba(144, 144, 144, 1)","text-transform":"uppercase"}},[t._v("Total Seats")]),a("br"),t.HouseboatData.totalSeats?a("span",{staticStyle:{"font-family":"LexendFont","font-weight":"600","font-size":"15px",color:"rgba(64, 64, 64, 1)"}},[t._v(" "+t._s(t.HouseboatData.totalSeats))]):t._e()]),a(o["a"],{attrs:{xs6:"",sm12:"",md4:"","align-self-center":"","text-center":""}},["licenseExpiry"==t.HouseboatData.expiryType?a("span",{staticStyle:{"font-family":"LexendFont","font-weight":"600","font-size":"10px",color:"rgba(144, 144, 144, 1)","text-transform":"uppercase"}},[t._v("License expiry")]):t._e(),"insuranceExpiry"==t.HouseboatData.expiryType?a("span",{staticStyle:{"font-family":"LexendFont","font-weight":"600","font-size":"10px",color:"rgba(144, 144, 144, 1)","text-transform":"uppercase"}},[t._v("Insurance expiry")]):t._e(),a("br"),t.HouseboatData.expiryDate?a("span",{staticStyle:{"font-family":"LexendFont","font-weight":"600","font-size":"15px",color:"rgba(64, 64, 64, 1)"}},[t._v(" "+t._s(t.formatDate(t.HouseboatData.expiryDate)))]):t._e()]),a(o["a"],{attrs:{xs6:"",sm12:"",md4:"","align-self-center":"","text-center":""}},[t.HouseboatData.location?a("span",{staticStyle:{"font-family":"LexendFont","font-weight":"600","font-size":"10px",color:"rgba(144, 144, 144, 1)","text-transform":"uppercase"}},[t._v("Location")]):t._e(),a("br"),t.HouseboatData.location?a("span",{staticStyle:{"font-family":"LexendFont","font-weight":"600","font-size":"15px",color:"rgba(64, 64, 64, 1)"}},[t._v(" "+t._s(t.HouseboatData.location.name))]):t._e()])],1)],1),a(o["a"],{attrs:{"align-self-center":""}},[a(c["a"],{attrs:{length:5,size:18,"active-color":"#ff6200",color:"#ff6200","background-color":"#ff6200"},model:{value:t.HouseboatData.rating,callback:function(a){t.$set(t.HouseboatData,"rating",a)},expression:"HouseboatData.rating"}})],1),t.OtherImgs?a(o["a"],{staticClass:"mr-2",attrs:{xs12:"",sm8:"",md6:"",lg6:"","align-self-center":"","text-center":""}},[t.OtherImgs.length>0?a(l["a"],{attrs:{"justify-center":"","justify-sm-end":"",wrap:""}},t._l(t.OtherImgs,(function(e,s){return a(o["a"],{key:s,staticClass:"ma-sm-2",attrs:{xs4:"",sm2:""}},[a(i["a"],{attrs:{height:"90px",width:"100px"}},[e?a(r["a"],{attrs:{height:"90px",width:"100px",src:t.mediaUURL+e},scopedSlots:t._u([{key:"placeholder",fn:function(){return[a("ImageLoader")]},proxy:!0}],null,!0)}):t._e()],1)],1)})),1):t._e()],1):t._e(),1==t.moreimg?a(o["a"],{attrs:{xs12:"",sm1:"","align-self-center":"","text-center":""},on:{click:function(a){return t.$router.push("/shikaraGallery?id="+t.$route.query.id)}}},[a("span",{staticStyle:{"font-family":"LexendFont","font-weight":"600","font-size":"10px",color:"#f17343",cursor:"pointer"}},[t._v("View All "),a(n["a"],{attrs:{small:""}},[t._v("mdi-arrow-right")])],1)]):t._e()],1),a(l["a"],{attrs:{wrap:""}},[a(o["a"],{attrs:{xs12:"",lg10:""}},[t.FacilitiesData?a(l["a"],{attrs:{wrap:"","mt-4":"","pl-4":""}},[a(o["a"],{staticStyle:{"font-family":"LexendFont","font-weight":"400","font-size":"22px"},attrs:{xs12:"","px-2":""}},[t._v("Facilities")]),0==t.Isfacility?a(o["a"],{attrs:{xs12:"","px-2":""}},[a("span",{staticStyle:{"font-family":"LexendFont","font-weight":"400","font-size":"16px"}},[t._v("No facilities added")])]):t._e(),1==t.FacilitiesData.airCondition?a(o["a"],{attrs:{xs12:"",sm3:"","pt-2":"","px-2":""}},[a(l["a"],{attrs:{wrap:""}},[a(o["a"],{attrs:{xs2:""}},[a(r["a"],{attrs:{height:"20px",contain:"",src:e("6205")}})],1),a(o["a"],{attrs:{xs10:""}},[a("span",{staticStyle:{"font-family":"LexendFont","font-weight":"400","font-size":"16px"}},[t._v("Air conditioning")])])],1)],1):t._e(),1==t.FacilitiesData.wifi?a(o["a"],{attrs:{xs12:"",sm3:"","pt-2":"","px-2":""}},[a(l["a"],{attrs:{wrap:""}},[a(o["a"],{attrs:{xs2:""}},[a(r["a"],{attrs:{height:"20px",contain:"",src:e("9dee")}})],1),a(o["a"],{attrs:{xs10:""}},[a("span",{staticStyle:{"font-family":"LexendFont","font-weight":"400","font-size":"16px"}},[t._v("Wifi")])])],1)],1):t._e(),1==t.FacilitiesData.television?a(o["a"],{attrs:{xs12:"",sm3:"","pt-2":"","px-2":""}},[a(l["a"],{attrs:{wrap:""}},[a(o["a"],{attrs:{xs2:""}},[a(r["a"],{attrs:{height:"20px",contain:"",src:e("f1c5")}})],1),a(o["a"],{attrs:{xs10:""}},[a("span",{staticStyle:{"font-family":"LexendFont","font-weight":"400","font-size":"16px"}},[t._v("Television")])])],1)],1):t._e(),1==t.FacilitiesData.lifeJacket?a(o["a"],{attrs:{xs12:"",sm3:"","pt-2":"","px-2":""}},[a(l["a"],{attrs:{wrap:""}},[a(o["a"],{attrs:{xs2:""}},[a(r["a"],{attrs:{height:"20px",contain:"",src:e("6e34")}})],1),a(o["a"],{attrs:{xs10:""}},[a("span",{staticStyle:{"font-family":"LexendFont","font-weight":"400","font-size":"16px"}},[t._v("Life jacket")])])],1)],1):t._e(),1==t.FacilitiesData.swimmingPool?a(o["a"],{attrs:{xs12:"",sm3:"","pt-2":"","px-2":""}},[a(l["a"],{attrs:{wrap:""}},[a(o["a"],{attrs:{xs2:""}},[a(r["a"],{attrs:{height:"20px",contain:"",src:e("2eac")}})],1),a(o["a"],{attrs:{xs10:""}},[a("span",{staticStyle:{"font-family":"LexendFont","font-weight":"400","font-size":"16px"}},[t._v("Swimming pool")])])],1)],1):t._e(),1==t.FacilitiesData.kettle?a(o["a"],{attrs:{xs12:"",sm3:"","pt-2":"","px-2":""}},[a(l["a"],{attrs:{wrap:""}},[a(o["a"],{attrs:{xs2:""}},[a(r["a"],{attrs:{height:"20px",contain:"",src:e("cb42")}})],1),a(o["a"],{attrs:{xs10:""}},[a("span",{staticStyle:{"font-family":"LexendFont","font-weight":"400","font-size":"16px"}},[t._v("Kettle")])])],1)],1):t._e(),1==t.FacilitiesData.parking?a(o["a"],{attrs:{xs12:"",sm3:"","pt-2":"","px-2":""}},[a(l["a"],{attrs:{wrap:""}},[a(o["a"],{attrs:{xs2:""}},[a(r["a"],{attrs:{height:"20px",contain:"",src:e("4425")}})],1),a(o["a"],{attrs:{xs10:""}},[a("span",{staticStyle:{"font-family":"LexendFont","font-weight":"400","font-size":"16px"}},[t._v("Parking")])])],1)],1):t._e(),1==t.FacilitiesData.restrooms?a(o["a"],{attrs:{xs12:"",sm3:"","pt-2":"","px-2":""}},[a(l["a"],{attrs:{wrap:""}},[a(o["a"],{attrs:{xs2:""}},[a(r["a"],{attrs:{height:"20px",contain:"",src:e("852f")}})],1),a(o["a"],{attrs:{xs10:""}},[a("span",{staticStyle:{"font-family":"LexendFont","font-weight":"400","font-size":"16px"}},[t._v("Restroom")])])],1)],1):t._e(),1==t.FacilitiesData.towels?a(o["a"],{attrs:{xs12:"",sm3:"","pt-2":"","px-2":""}},[a(l["a"],{attrs:{wrap:""}},[a(o["a"],{attrs:{xs2:""}},[a(r["a"],{attrs:{height:"20px",contain:"",src:e("c23e")}})],1),a(o["a"],{attrs:{xs10:""}},[a("span",{staticStyle:{"font-family":"LexendFont","font-weight":"400","font-size":"16px"}},[t._v("Towels")])])],1)],1):t._e(),1==t.FacilitiesData.toilet?a(o["a"],{attrs:{xs12:"",sm3:"","pt-2":"","px-2":""}},[a(l["a"],{attrs:{wrap:""}},[a(o["a"],{attrs:{xs2:""}},[a(r["a"],{attrs:{height:"20px",contain:"",src:e("852f")}})],1),a(o["a"],{attrs:{xs10:""}},[a("span",{staticStyle:{"font-family":"LexendFont","font-weight":"400","font-size":"16px"}},[t._v("Toilet")])])],1)],1):t._e()],1):t._e()],1),a(o["a"],{attrs:{xs12:"",lg2:"","align-self-start":""}},[a(l["a"],{attrs:{wrap:"","justify-start":"","justify-lg-center":"","pl-4":"","pl-md-0":""}},[t.HouseboatData.boatLicenseProof?a(o["a"],{attrs:{xs12:"",sm3:"",lg12:"","px-2":"","text-center":""}},[a(s["a"],{attrs:{color:"#ff6200",small:"",block:"",dark:"",download:"",href:t.mediaUURL+t.HouseboatData.boatLicenseProof,target:"_blank"}},[a(n["a"],{attrs:{small:""}},[t._v("mdi-file-document-outline")]),a("span",{staticStyle:{"font-family":"LexendFont","font-weight":"400","font-size":"16px","text-transform":"none"}},[t._v("Boat License")])],1)],1):t._e(),t.HouseboatData.leaseProof?a(o["a"],{attrs:{xs12:"","pa-2":"",sm3:"",lg12:"","text-center":""}},[a(s["a"],{attrs:{color:"#ff6200",small:"",block:"",dark:"",download:"",href:t.mediaUURL+t.HouseboatData.leaseProof,target:"_blank"}},[a(n["a"],{attrs:{small:""}},[t._v("mdi-file-document-outline")]),a("span",{staticStyle:{"font-family":"LexendFont","font-weight":"400","font-size":"16px","text-transform":"none"}},[t._v("Lease Proof")])],1)],1):t._e()],1)],1)],1),a(l["a"],{attrs:{"justify-start":"",wrap:"","px-4":""}},[a(o["a"],{attrs:{xs12:"",sm8:""}},[a(l["a"],{attrs:{wrap:"","justify-start":"","pt-2":""}},[t.HouseboatData.addionalRules?a(o["a"],{staticStyle:{"font-family":"LexendFont","font-weight":"400","font-size":"18px"},attrs:{xs12:"","px-2":""}},[t._v("Additional Rules")]):t._e(),t.HouseboatData.addionalRules?a(o["a"],{attrs:{xs12:"","px-2":"","text-left":""}},[a("span",{staticStyle:{"font-family":"LexendFont","font-weight":"300","font-size":"16px",color:"black"}},[t._v(" "+t._s(t.HouseboatData.addionalRules)+" ")])]):t._e()],1)],1)],1),1==t.isTrip?a(l["a"],{attrs:{"justify-start":"",wrap:"","px-4":""}},[a(o["a"],{attrs:{xs12:""}},[a(l["a"],{attrs:{wrap:"","justify-start":""}},[a(o["a"],{attrs:{xs12:"",sm12:"","text-left":""}},[t.tripDetails?a(l["a"],{attrs:{wrap:""}},[a(o["a"],{attrs:{xs12:"",sm2:"",md3:"","align-self-center":"","text-left":"","px-2":""}},[a("span",{staticStyle:{"font-family":"LexendFont","font-weight":"400","font-size":"18px"}},[t._v("Pickup/Drop Location :")]),a("br"),t.HouseboatData.startingLocation?a("span",{staticStyle:{"font-family":"LexendFont","font-weight":"300","font-size":"16px",color:"black"}},[t._v(" "+t._s(t.HouseboatData.startingLocation.name))]):a("span",[t._v("-")])]),a(o["a"],{attrs:{xs12:"",sm3:"",md2:"","align-self-center":"","text-left":"","px-2":""}},[a("span",{staticStyle:{"font-family":"LexendFont","font-weight":"400","font-size":"18px"}},[t._v("Max.capacity : ")]),a("br"),t.tripDetails.maxCapacityOfBoat?a("span",{staticStyle:{color:"black","font-family":"LexendFont","font-weight":"300","font-size":"16px"}},[t._v(" "+t._s(t.tripDetails.maxCapacityOfBoat))]):a("span",[t._v("-")])]),a(o["a"],{attrs:{xs12:"",sm3:"",md2:"","align-self-center":"","text-left":"","px-2":""}},[a("span",{staticStyle:{"font-family":"LexendFont","font-weight":"400","font-size":"18px"}},[t._v("Min.capacity : ")]),a("br"),t.tripDetails.minCapacityOfBoat?a("span",{staticStyle:{color:"black","font-family":"LexendFont","font-weight":"300","font-size":"16px"}},[t._v(" "+t._s(t.tripDetails.minCapacityOfBoat))]):a("span",[t._v("-")])]),a(o["a"],{attrs:{xs12:"",sm2:"","align-self-center":"","text-left":"","px-2":""}},[a("span",{staticStyle:{"font-family":"LexendFont","font-weight":"400","font-size":"18px"}},[t._v("Min hours :")]),a("br"),t.tripDetails.minimumHour?a("span",{staticStyle:{color:"black","font-family":"LexendFont","font-weight":"300","font-size":"16px"}},[t._v(" "+t._s(t.tripDetails.minimumHour))]):a("span",[t._v("-")])])],1):t._e()],1),a(o["a"],{staticStyle:{"font-family":"LexendFont","font-weight":"400","font-size":"18px"},attrs:{xs12:"",sm10:"","px-2":"","align-self-center":""}},[t._v("Packages")]),a(o["a"],{attrs:{xs12:"",sm2:"","py-2":"","pr-0":"","pr-md-2":"","align-self-end":""}},[a(s["a"],{attrs:{color:"#ff6200",small:"",block:"",dark:"",disabled:"Blocked"===t.HouseboatData.shikaraStatus},on:{click:function(a){return t.$router.push("/ShikaraSpecialRate?boatId="+t.$route.query.id+"&&id="+t.tripDetails._id)}}},[a("span",{staticStyle:{color:"white","font-weight":"500","font-size":"14px","font-family":"LexendFont"}},[t._v("Add special rate")])])],1),t.tripDetails.package?a(o["a"],{attrs:{xs12:"","px-2":""}},[t.tripDetails.package.length>0?a(i["a"],{attrs:{elevation:"0","pa-1":"",outlined:""}},[a(p["a"],{staticStyle:{"font-family":"LexendFont","font-weight":"300","font-size":"16px"},scopedSlots:t._u([{key:"default",fn:function(){return[a("thead",[a("tr",[a("th",{staticClass:"text-left tablefont"},[a("b",[t._v("S.No.")])]),a("th",{staticClass:"text-left tablefont"},[a("b",[t._v("Type")])]),a("th",{staticClass:"text-left tablefont"},[a("b",[t._v("Start date")])]),a("th",{staticClass:"text-left tablefont"},[a("b",[t._v("End date")])]),a("th",{staticClass:"text-left tablefont"},[a("b",[t._v("Customer rate (₹)")])]),a("th",{staticClass:"text-left tablefont"},[a("b",[t._v("Agent rate (₹)")])])])]),a("tbody",t._l(t.tripDetails.package,(function(e,s){return a("tr",{key:s,staticClass:"table"},[a("td",[1==t.page?a("span",[t._v(" "+t._s(s+1)+" ")]):a("span",[t._v(" "+t._s(s+1+20*(t.page-1))+" ")])]),a("td",[e.packageType?a("span",[t._v(t._s(e.packageType))]):a("span",[t._v("-")])]),a("td",[e.startDate?a("span",[t._v(t._s(t.formatDate(e.startDate)))]):a("span",[t._v("-")])]),a("td",[e.endDate?a("span",[t._v(t._s(t.formatDate(e.endDate)))]):a("span",[t._v("-")])]),a("td",[e.customerRate?a("span",[t._v(t._s(e.customerRate)+" ("+t._s(e.customerRateCommission)+")")]):a("span",[t._v("-")])]),a("td",[e.agentRate?a("span",[t._v(t._s(e.agentRate)+" ("+t._s(e.agentRateCommission)+")")]):a("span",[t._v("-")])])])})),0)]},proxy:!0}],null,!1,3061138365)})],1):t._e()],1):a(o["a"],{attrs:{xs12:"","px-2":""}},[a("span",{staticStyle:{"font-family":"LexendFont","font-weight":"400","font-size":"16px"}},[t._v("No available packages")])])],1)],1)],1):t._e(),0==t.isTrip?a(l["a"],{attrs:{"justify-start":"",wrap:"","pl-5":"","pt-1":""}},[a(o["a"],{attrs:{xs12:""}},[a("span",{staticStyle:{"font-family":"LexendFont","font-weight":"400","font-size":"16px"}},[t._v("No trip added")])])],1):t._e(),a(l["a"],{attrs:{wrap:"","pl-5":"","justify-center":"","justify-md-start":""}},[a(o["a"],{staticStyle:{"font-family":"LexendFont","font-weight":"400","font-size":"22px"},attrs:{xs12:""}},[t._v("Photos")]),t.OtherImgs?a(o["a"],{attrs:{xs12:"",sm10:""}},[t.OtherImgs.length>0?a(l["a"],{attrs:{wrap:""}},[t._l(t.OtherImgs,(function(e,s){return a(o["a"],{key:s,staticClass:"pa-1",attrs:{xs12:"",sm4:"",md3:""}},[a("img",{staticStyle:{"object-fit":"cover"},attrs:{src:t.mediaUURL+e,height:"200px",width:"200px"}})])})),a(o["a"],{staticClass:"mr-2",attrs:{xs12:"",sm1:"","align-self-center":"","text-center":""},on:{click:function(a){return t.$router.push("/shikaraGallery?id="+t.$route.query.id)}}},[a("span",{staticStyle:{"font-family":"LexendFont","font-weight":"600","font-size":"10px",color:"#f17343",cursor:"pointer"}},[t._v("View All "),a(n["a"],{attrs:{small:""}},[t._v("mdi-arrow-right")])],1)])],2):a(l["a"],{attrs:{wrap:""}},[a(o["a"],{attrs:{xs12:""}},[a("span",{staticStyle:{"font-family":"LexendFont","font-weight":"400","font-size":"16px"}},[t._v("No images found")])])],1)],1):t._e(),a(o["a"],{attrs:{xs12:""}},[a(l["a"],{attrs:{wrap:""}},[a(o["a"],{attrs:{xs12:"","pl-lg-2":"","pb-lg-4":""}},[a("span",{staticStyle:{"font-weight":"400","font-size":"18px","font-family":"LexendFont"}},[t._v("Reviews")])]),t._l(t.review,(function(e,s){return a(o["a"],{key:s,attrs:{xs12:"",lg4:""}},[a(l["a"],{attrs:{wrap:"","justify-center":""}},[a(o["a"],{attrs:{xs11:""}},[a(i["a"],{staticStyle:{"border-radius":"15px","background-color":"#fafafa"},attrs:{height:"260px"}},[a(l["a"],{attrs:{wrap:"","justify-center":""}},[a(o["a"],{staticStyle:{"font-weight":"400","font-size":"18px","font-family":"LexendFont"},attrs:{xs9:"","pt-3":""}},[t._v(" "+t._s(e.user.name)+" ")]),a(o["a"],{attrs:{xs10:"","pl-lg-1":"","pt-3":""}},[a(c["a"],{attrs:{length:5,size:18,"active-color":"#ff6200",color:"#ff6200","background-color":"#ff6200"},model:{value:e.rating,callback:function(a){t.$set(e,"rating",a)},expression:"item.rating"}})],1),a(o["a"],{staticStyle:{"text-align":"justify"},attrs:{xs9:"","pt-3":""}},[a("span",{staticStyle:{"font-weight":"400","font-size":"15px","font-family":"LexendFont"}},[t._v(" "+t._s(e.comment)+" ")])])],1)],1)],1)],1)],1)})),0===t.review.length?a(o["a"],{attrs:{xs12:"","pt-lg-3":"","text-center":""}},[a("span",{staticStyle:{"font-weight":"400","font-size":"18px","font-family":"LexendFont"}},[t._v("No reviews found!")])]):t._e()],2)],1)],1)],1)],1)],1)],1)}),d=[],m=e("cee4"),h={data(){return{showSnackbar:!1,timeout:2e3,ServerError:!1,appLoading:!1,HouseboatData:[],tripDetails:[],tab:null,msg:null,page:1,limit:20,deleteialog:!1,deleteId:"",editialog:!1,editItem:{},Item2:[],Item3:[],IsMealplan:!0,IsMealplan2:!0,Isfacility:!0,FacilitiesData:{},review:[],OtherImgs:[],moreimg:!1,isTrip:!0}},mounted(){this.getData()},watch:{page(){this.getData()}},methods:{getData(){this.appLoading=!0,Object(m["a"])({url:"/shikara/get",method:"GET",headers:{token:localStorage.getItem("token")},params:{id:this.$route.query.id}}).then(t=>{if(this.appLoading=!1,this.review=t.data.reviews,this.HouseboatData=t.data.data,this.tripDetails=t.data.trip,this.tripDetails.mealPlan){var a=Object.keys(this.tripDetails.mealPlan).every((function(t){return!this.tripDetails.mealPlan[t]}),this);this.IsMealplan=!a,console.log("IsMealplan=",this.IsMealplan)}if(0===Object.keys(this.tripDetails).length&&(console.log("empty trip"),this.isTrip=!1),this.Item3=this.tripDetails.package,this.OtherImgs=this.HouseboatData.propertyImages,this.OtherImgs&&this.OtherImgs.length>4&&(this.OtherImgs=this.OtherImgs.slice(0,4),this.moreimg=!0),this.FacilitiesData=this.HouseboatData.facilities,console.log("FacilitiesData=",this.FacilitiesData),this.FacilitiesData){var e=Object.values(this.FacilitiesData).every((function(t){return!t}));this.Isfacility=!e,console.log("Isfacility=",this.Isfacility)}else console.log("Facilities data is undefined.")}).catch(t=>{console.log(t)})},deleteBoat(t){Object(m["a"])({url:"/shikara/delete",method:"get",headers:{token:localStorage.getItem("token")},params:{id:t}}).then(t=>{1==t.data.status?(this.msg=t.data.msg,this.showSnackbar=!0,this.deleteialog=!1,this.deleteId="",this.appLoading=!1,this.getData()):(this.msg=t.data.msg,this.showSnackbar=!0)}).catch(t=>{console.log(t)})},formatDate(t){var a=new Date(t),e=a.getDate(),s=a.getFullYear();a=a.toString();var i=e+" "+a.slice(4,7)+" "+s;return i}}},g=h,u=(e("e24e"),e("0c7c")),y=Object(u["a"])(g,x,d,!1,null,"610f12fa",null);a["default"]=y.exports},c23e:function(t,a,e){t.exports=e.p+"img/towel.a5ba2afc.png"},e24e:function(t,a,e){"use strict";e("a091")}}]);
//# sourceMappingURL=chunk-0d91839d.7b8f131a.js.map