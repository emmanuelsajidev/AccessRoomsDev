(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-30831603"],{"0cab":function(t,a,e){t.exports=e.p+"img/homeIcon1.79c343b1.png"},1765:function(t,a,e){t.exports=e.p+"img/homeIcon3.64442d97.png"},a9a8:function(t,a,e){"use strict";e.r(a);var s=e("8336"),o=e("b0af"),n=e("5e66"),i=e("3e35"),r=e("0e8f"),l=e("132d"),c=e("adda"),p=e("a722"),f=e("2db4"),d=function(){var t=this,a=t._self._c;return a("div",[a("PageLoader",{attrs:{storage:t.appLoading}}),t.ServerError?a("ServerError"):t._e(),a(f["a"],{attrs:{color:"#ff6200",right:"",timeout:3e3},model:{value:t.snackbar,callback:function(a){t.snackbar=a},expression:"snackbar"}},[a(p["a"],{attrs:{wrap:""}},[a(r["a"],{staticClass:"align-self-center",attrs:{"text-left":""}},[t._v(t._s(t.msg))]),a(r["a"],{attrs:{"text-right":""}},[a(s["a"],{attrs:{small:"",ripple:!1,text:""},on:{click:function(a){t.snackbar=!1}}},[a(l["a"],{staticStyle:{color:"white"}},[t._v("mdi-close")])],1)],1)],1)],1),a(p["a"],{attrs:{wrap:"","justify-center":"","pt-lg-3":"","pt-11":""}},[a(r["a"],{attrs:{xs12:""}},[a(p["a"],{attrs:{wrap:"","justify-center":""}},[a(r["a"],{attrs:{xs12:"","pt-3":"","pb-3":""}},[a("span",{staticStyle:{"font-size":"30px","font-weight":"400","font-family":"LexendRegular"}},[t._v("Overview")])]),t._l(t.cards,(function(e,s){return a(r["a"],{key:s,attrs:{xs12:"",sm6:"",md4:""}},[a(o["a"],{staticClass:"pa-2 mr-4 mb-4 mb-md-0",attrs:{elevation:"0"}},[a(p["a"],{attrs:{wrap:"","fill-height":""}},[a(r["a"],{attrs:{xs4:"","pa-2":"","align-self-center":""}},[a(c["a"],{attrs:{height:"75px",contain:"",src:e.src}})],1),a(r["a"],{attrs:{xs8:"","align-self-center":"","pl-6":""}},[a(p["a"],{attrs:{wrap:"","justify-center":""}},[a(r["a"],{attrs:{xs12:""}},[a("span",{staticStyle:{"font-weight":"700","font-size":"30px","font-family":"LexendRegular"}},[t._v(t._s(e.count))])]),a(r["a"],{attrs:{xs12:""}},[a("span",{staticStyle:{"font-weight":"400","font-size":"18px",color:"#7c7474","font-family":"LexendRegular"}},[t._v(t._s(e.name))])])],1)],1)],1)],1)],1)})),a(r["a"],{attrs:{xs12:"","pt-8":"","pr-3":""}},[a(o["a"],{attrs:{elevation:"0"}},[a(p["a"],{attrs:{wrap:""}},[a(r["a"],{attrs:{"pt-6":""}},[a(p["a"],{attrs:{wrap:"","justify-center":""}},[a(r["a"],{staticStyle:{"font-weight":"400","font-size":"20px","font-family":"LexendRegular"},attrs:{xs8:"","text-left":""}},[t._v("Recent Shikara Bookings")]),a(r["a"],{attrs:{xs3:"","text-right":""},on:{click:function(a){return t.gotoShikara()}}},[a(s["a"],{attrs:{text:"",plain:""}},[a("span",{staticStyle:{"font-weight":"500","font-size":"16px","font-family":"LexendRegular",color:"#806aad"}},[t._v(" See all ")])])],1)],1)],1)],1),a(p["a"],{attrs:{wrap:""}},[a(r["a"],{attrs:{xs12:""}},[a(p["a"],{attrs:{wrap:"","justify-center":""}},[a(r["a"],{attrs:{xs12:""}},[a(p["a"],{attrs:{wrap:"","justify-center":""}},[a(r["a"],{attrs:{xs12:""}},[a(o["a"],{attrs:{elevation:"0"}},[a(p["a"],{attrs:{wrap:"","justify-center":"","pb-6":""}},t._l(t.list,(function(e,n){return a(r["a"],{key:n,attrs:{xs11:"","pt-5":""}},[a(o["a"],{staticStyle:{"border-radius":"12px"},attrs:{elevation:"0",color:"#EDEDED"}},[a(p["a"],{attrs:{wrap:"","justify-center":""}},[a(r["a"],{attrs:{lg3:"",xs12:""}},[e?a(p["a"],{attrs:{wrap:"","justify-start":""}},[e.shikaraid?a(r["a"],{attrs:{xs12:""}},[e.shikaraid.coverImage?a(r["a"],{staticClass:"hidden-sm-and-down"},[a(c["a"],{staticClass:"customcard",attrs:{height:"170px",width:"100%",src:t.mediaUURL+e.shikaraid.coverImage}})],1):t._e(),e.shikaraid.coverImage?a(r["a"],{staticClass:"hidden-md-and-up"},[a(c["a"],{staticClass:"customcard2",attrs:{height:"170px",width:"100%",src:t.mediaUURL+e.shikaraid.coverImage}})],1):t._e()],1):t._e()],1):t._e()],1),a(r["a"],{attrs:{xs12:"",lg9:"","pl-6":""}},[a(p["a"],{attrs:{wrap:"","justify-start":"","fill-height":""}},[a(r["a"],{attrs:{xs12:"",sm4:"",lg4:"","text-left":"","align-self-center":""}},[a(p["a"],{attrs:{wrap:""}},[a(r["a"],{attrs:{xs12:"","pt-4":"","pt-lg-0":""}},[a("span",{staticStyle:{"font-weight":"bold","font-size":"20px","font-family":"LexendRegular"}},[t._v(" "+t._s(e.shikaraid.shikaraName)+" ")])]),a(r["a"],{attrs:{xs12:"","pt-3":""}},[a("span",{staticStyle:{"font-family":"LexendRegular","font-size":"14px","font-weight":"500"}},[t._v(" Booking # : ")]),a("span",{staticStyle:{color:"#f17343","font-size":"15px"}},[t._v("   "+t._s(e.bookingNo)+" ")])]),a(r["a"],{attrs:{"pt-3":""}},[a("span",{staticStyle:{"font-family":"LexendRegular","font-size":"15px","font-weight":"500"}},[t._v(" Check In :  "),a("span",{staticStyle:{color:"#f17343"}},[t._v(" "+t._s(t.formattedDate(e.selectedDate))),a("br"),t._v(" "+t._s(t.formatTimeNew(e.startTime))+" - "+t._s(t.formatTimeNew(e.endTime))+" ")])])])],1)],1),e?a(r["a"],{attrs:{xs12:"",sm4:"",lg4:"","text-left":"","align-self-center":""}},[e.customerDetails?a(p["a"],{attrs:{wrap:""}},[a(r["a"],{attrs:{xs12:"","pt-4":""}},[a("span",{staticStyle:{"font-weight":"400","font-size":"14px","font-family":"LexendRegular"}},[t._v(" Booked for :   ")]),e.customerDetails?a("span",{staticStyle:{color:"#f17343","font-family":"LexendRegular","font-size":"15px"}},[t._v(" "+t._s(e.customerDetails.name)+", "+t._s(e.customerDetails.phoneNumber)+" ")]):t._e()]),a(r["a"],{attrs:{xs12:"","text-left":"","pt-4":""}},[a("span",{staticStyle:{"font-family":"LexendRegular","font-size":"14px","font-weight":"500"}},[t._v(" Advance :  "),a("span",{staticStyle:{color:"#f17343"}},[t._v(" ₹ "+t._s(e.advance)+" ")])])]),a(r["a"],{attrs:{xs12:"","text-left":"","pt-3":""}},[a("span",{staticStyle:{"font-family":"LexendRegular","font-size":"14px","font-weight":"500"}},[t._v(" Balance :  "),"Pending"==e.balancepaymentStatus&&"Agent"==e.advancepaymentMode?a("span",{staticStyle:{color:"red"}},[t._v(" ₹ "+t._s(e.postBookingamount)+" Not Paid ")]):"Success"==e.balancepaymentStatus&&"Agent"==e.advancepaymentMode?a("span",{staticStyle:{color:"green"}},[t._v(" ₹ "+t._s(e.postBookingamount)+" Paid ")]):a("span",{staticStyle:{color:"green"}},[t._v(" ₹ "+t._s(e.postBookingamount)+" ")])])])],1):t._e()],1):t._e(),a(r["a"],{attrs:{xs12:"",sm4:"",lg4:"","align-self-center":""}},[a(p["a"],{attrs:{wrap:"","justify-end":""}},[a(r["a"],{staticClass:"hidden-sm-and-down",attrs:{xs12:"","text-center":"","pl-3":"","pr-1":"","pb-2":""}},[a("span",{staticStyle:{"font-family":"LexendRegular",color:"black","font-size":"20px","font-weight":"600"}},[t._v(" ₹ "+t._s(e.bookingTotal)+" ")])]),a(r["a"],{staticClass:"hidden-md-and-up",attrs:{xs12:"","text-left":"","pt-1":"","pb-1":""}},[a("span",{staticStyle:{"font-family":"LexendRegular",color:"black","font-size":"20px","font-weight":"600"}},[t._v(" ₹ "+t._s(e.bookingTotal)+" ")])]),a(r["a"],{staticClass:"hidden-sm-and-down",attrs:{xs12:"","text-center":"","pl-3":"","pr-10":"","pl-10":"","pb-3":""}},[a(s["a"],{attrs:{block:"",color:"#F17343"},on:{click:function(a){return t.gotoView(e._id)}}},[a("span",{staticStyle:{"font-family":"LexendRegular",color:"white","font-size":"14px","font-weight":"400","text-transform":"none"}},[t._v(" View Details ")])])],1),a(r["a"],{staticClass:"hidden-md-and-up",attrs:{xs12:"","text-center":"","pr-3":"","pb-4":""}},[a(s["a"],{attrs:{block:"",color:"#F17343"},on:{click:function(a){return t.gotoView(e._id)}}},[a("span",{staticStyle:{"font-family":"LexendRegular",color:"white","font-size":"14px","font-weight":"400","text-transform":"none"}},[t._v(" View Details ")])])],1)],1)],1)],1)],1)],1)],1)],1)})),1)],1)],1)],1)],1)],1)],1)],1)],1)],1),a(r["a"],{attrs:{xs12:"","pt-8":"","pr-3":""}},[a(o["a"],{attrs:{elevation:"0"}},[a(p["a"],{attrs:{wrap:""}},[a(r["a"],{attrs:{"pt-6":""}},[a(p["a"],{attrs:{wrap:"","justify-center":""}},[a(r["a"],{staticStyle:{"font-weight":"400","font-size":"20px","font-family":"LexendRegular"},attrs:{xs8:"","text-left":""}},[t._v("Recent Houseboat Bookings")]),a(r["a"],{attrs:{xs3:"","text-right":""},on:{click:function(a){return t.gotoHouseboat()}}},[a(s["a"],{attrs:{text:"",plain:""}},[a("span",{staticStyle:{"font-weight":"500","font-size":"16px","font-family":"LexendRegular",color:"#806aad"}},[t._v(" See all ")])])],1)],1)],1)],1),a(p["a"],{attrs:{wrap:""}},[a(r["a"],{attrs:{xs12:""}},[a(p["a"],{attrs:{wrap:"","justify-center":""}},[a(r["a"],{attrs:{xs12:""}},[a(p["a"],{attrs:{wrap:"","justify-center":""}},[a(r["a"],{attrs:{xs12:""}},[a(o["a"],{attrs:{elevation:"0"}},[a(p["a"],{attrs:{wrap:"","justify-center":"","pb-6":""}},t._l(t.houseboat,(function(e,l){return a(r["a"],{key:l,attrs:{xs11:"","pt-5":""}},[a(o["a"],{staticStyle:{"border-radius":"12px"},attrs:{elevation:"0",color:"#EDEDED"}},[a(p["a"],{attrs:{wrap:"","justify-center":""}},[a(r["a"],{attrs:{xs12:"",lg3:""}},[a(p["a"],{attrs:{wrap:"","justify-start":""}},[e.houseBoatId?a(r["a"],{attrs:{xs12:""}},[a(n["a"],{attrs:{"show-arrows":!1,progress:!1,continuous:!1,"hide-controls-on-hover":"true",height:"100%",width:"100%","hide-delimiters":"",cycle:!0}},[a(i["a"],[a(c["a"],{staticClass:"customcard hidden-sm-and-down",attrs:{src:t.mediaUURL+e.houseBoatId.coverImage,height:"200px",width:"100%"}}),a(c["a"],{staticClass:"customcard2 hidden-md-and-up",attrs:{src:t.mediaUURL+e.houseBoatId.coverImage,height:"200px",width:"100%"}})],1)],1)],1):t._e()],1)],1),a(r["a"],{attrs:{xs12:"",lg9:"","pl-6":""}},[a(p["a"],{attrs:{wrap:"","justify-start":"","fill-height":""}},[a(r["a"],{attrs:{xs12:"",sm4:"",lg4:"","text-left":"","align-self-center":""}},[a(p["a"],{attrs:{wrap:""}},[e.houseBoatId?a(r["a"],{attrs:{"pt-4":"","pt-lg-2":"",xs12:""}},[a("span",{staticStyle:{"font-weight":"bold","font-size":"20px","font-family":"LexendRegular"}},[t._v(" "+t._s(e.houseBoatName)+" ")])]):t._e(),a(r["a"],{attrs:{xs12:"","pt-3":""}},[a("span",{staticStyle:{"font-family":"LexendRegular","font-size":"14px","font-weight":"500"}},[t._v(" Booking # : ")]),a("span",{staticStyle:{color:"#f17343","font-family":"LexendRegular","font-size":"15px"}},[t._v("   "+t._s(e.bookingNo)+" ")])]),a(r["a"],{attrs:{xs12:"","pt-3":""}},[a("span",{staticStyle:{"font-family":"LexendRegular","font-size":"14px","font-weight":"500"}},[t._v(" Trip Type :  "),a("span",{staticStyle:{color:"#f17343","font-size":"14px","font-weight":"500"}},[t._v(" "+t._s(e.tripType)+" ")])])]),a(r["a"],{attrs:{xs12:"","text-left":"","pt-3":""}},[a("span",{staticStyle:{"font-family":"LexendRegular","font-size":"14px","font-weight":"500"}},[t._v(" Balance :  "),"Pending"==e.balancepaymentStatus&&"Agent"==e.advancepaymentMode?a("span",{staticStyle:{color:"red"}},[t._v(" ₹ "+t._s(e.balancePayAmount)+" Not Paid ")]):"Success"==e.balancepaymentStatus&&"Agent"==e.advancepaymentMode?a("span",{staticStyle:{color:"green"}},[t._v(" ₹ "+t._s(e.balancePayAmount)+" Paid ")]):a("span",{staticStyle:{color:"green"}},[t._v(" ₹ "+t._s(e.balancePayAmount)+" ")])])])],1)],1),a(r["a"],{attrs:{xs12:"",sm4:"",lg4:"","text-left":"","align-self-center":""}},[a(p["a"],{attrs:{wrap:""}},[a(r["a"],{attrs:{xs12:"","pt-3":""}},[a("span",{staticStyle:{"font-weight":"400","font-size":"14px","font-family":"LexendRegular"}},[t._v(" Booked for :   ")]),a("span",{staticStyle:{color:"#f17343","font-family":"LexendRegular","font-size":"15px"}},[t._v(" "+t._s(e.fullName)+", "+t._s(e.phoneNumber)+" ")])]),a(r["a"],{attrs:{xs12:"","text-left":"","pt-3":""}},[a("span",{staticStyle:{"font-family":"LexendRegular","font-size":"14px","font-weight":"500"}},[t._v(" Check In :  "),a("span",{staticStyle:{color:"#f17343"}},[t._v(" "+t._s(t.formattedDate(e.startDate))+" ")])])]),a(r["a"],{attrs:{xs12:"","text-left":"","pt-3":""}},[a("span",{staticStyle:{"font-family":"LexendRegular","font-size":"14px","font-weight":"500"}},[t._v(" Check Out :  "),a("span",{staticStyle:{color:"#f17343"}},[t._v(" "+t._s(t.formattedDate(e.startDate))+" ")])])]),e.houseBoatId.startingLocation?a(r["a"],{attrs:{xs12:"","text-left":"","pt-3":""}},[a("span",{staticStyle:{"font-family":"LexendRegular","font-size":"14px","font-weight":"500"}},[t._v(" Pickup/ Drop :  "),e.houseBoatId.startingLocation.length>0?a("span",{staticStyle:{color:"#f17343"}},[t._v(" "+t._s(e.houseBoatId.startingLocation[0].name)+" ")]):a("span",[t._v("-")])])]):t._e()],1)],1),a(r["a"],{attrs:{xs12:"",sm4:"",lg4:"","align-self-center":""}},[a(p["a"],{attrs:{wrap:"","justify-end":""}},[a(r["a"],{staticClass:"hidden-sm-and-down",attrs:{xs12:"","text-center":"","pl-3":"","pr-1":"","pb-2":""}},[a("span",{staticStyle:{"font-family":"LexendRegular",color:"black","font-size":"20px","font-weight":"600"}},[t._v(" ₹ "+t._s(e.totalAmount)+" ")])]),a(r["a"],{staticClass:"hidden-md-and-up",attrs:{xs12:"","text-left":"","pt-2":"","pb-2":""}},[a("span",{staticStyle:{"font-family":"LexendRegular",color:"black","font-size":"20px","font-weight":"600"}},[t._v(" ₹ "+t._s(e.totalAmount)+" ")])]),a(r["a"],{staticClass:"hidden-sm-and-down",attrs:{xs12:"","text-center":"","pl-3":"","pr-10":"","pl-10":"","pb-3":""}},[a(s["a"],{attrs:{block:"",color:"#F17343"},on:{click:function(a){return t.gotohouseboatView(e._id)}}},[a("span",{staticStyle:{"font-family":"LexendRegular",color:"white","font-size":"14px","font-weight":"400","text-transform":"none"}},[t._v(" View Details ")])])],1),a(r["a"],{staticClass:"hidden-md-and-up",attrs:{xs12:"","text-center":"","pt-2":"","pr-3":"","pb-3":""}},[a(s["a"],{attrs:{block:"",color:"#F17343"},on:{click:function(a){return t.gotohouseboatView(e._id)}}},[a("span",{staticStyle:{"font-family":"LexendRegular",color:"white","font-size":"14px","font-weight":"400","text-transform":"none"}},[t._v(" View Details ")])])],1)],1)],1)],1)],1)],1)],1)],1)})),1)],1)],1)],1)],1)],1)],1)],1)],1)],1)],2)],1)],1)],1)},g=[],u=(e("14d9"),e("cee4")),h={data(){return{appLoading:!1,ServerError:!1,snackbar:!1,timeout:5e3,houseboat:[],pages:0,list:[],msg:null,cards:[],value:"",phone:""}},mounted(){this.getCount(),this.getShikara(),this.getHouseboat()},methods:{formattedDate(t){const a={day:"2-digit",month:"2-digit",year:"numeric"};return new Date(t).toLocaleDateString("en-GB",a)},gotoShikara(){this.$router.push({name:"shikarabookings"})},gotoHouseboat(){this.$router.push({name:"houseboatbookings"})},getCount(){this.appLoading=!0,Object(u["a"])({method:"POST",url:"/counts/",headers:{token:localStorage.getItem("token")}}).then(t=>{const a=t.data;this.cards=[{title:"bookingCount",name:"Total Bookings",src:e("0cab"),count:a.totalBookings||0},{title:"houseBoatCount",name:"Houseboat Bookings",src:e("1765"),count:a.totalHouseboats||0},{title:"shikaraCount",name:"Shikara Bookings",src:e("e2f3"),count:a.totalShikaras||0}],this.appLoading=!1}).catch(t=>{this.ServerError=!0,console.error(t)})},formatTimeNew(t){var a=new Date(t),e=a.getHours(),s=a.getMinutes();a=a.toString();var o=e>=12?"pm":"am";e%=12,e=e||12,s=s<10?"0"+s:s;var n=e+":"+s+" "+o;return n},getHouseboat(){this.appLoading=!0,Object(u["a"])({method:"POST",url:"/agent/my/bookings",headers:{token:localStorage.getItem("token")},data:{page:this.currentPage,limit:10}}).then(t=>{t.data.status?(this.houseboat=t.data.data,this.totalData=t.data.totalLength,this.pages=Math.ceil(this.totalData/t.data.limit),this.houseboat=this.houseboat.slice(0,2),this.appLoading=!1):(this.appLoading=!1,this.msg=t.data.msg,this.snackbar=!0)})},gotoView(t){this.$router.push({name:"bookingsdetailed",query:{id:t}})},gotohouseboatView(t){this.$router.push({name:"houseboatdetailedview",query:{id:t}})},getShikara(){this.appLoading=!0,Object(u["a"])({method:"POST",url:"/my/allBookings",headers:{token:localStorage.getItem("token")},data:{page:this.currentPage,type:"shikara",location:this.location,memberCount:this.memberCount,childrenCount:this.childrenCount}}).then(t=>{t.data.status?(this.list=t.data.data,this.totalData=t.data.totalLength,this.list=this.list.slice(0,2),this.appLoading=!1):(this.appLoading=!1,this.msg=t.data.msg,this.snackbar=!0)})}}},x=h,m=e("2877"),y=Object(m["a"])(x,d,g,!1,null,null,null);a["default"]=y.exports},e2f3:function(t,a,e){t.exports=e.p+"img/homeIcon4.eb5a13ae.png"}}]);
//# sourceMappingURL=chunk-30831603.a46eb964.js.map