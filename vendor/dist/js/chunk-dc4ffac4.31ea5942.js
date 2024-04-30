(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-dc4ffac4"],{"084f":function(t,a,e){},"83c6":function(t,a,e){"use strict";e.r(a);var s=e("8336"),i=e("b0af"),r=e("0e8f"),n=e("132d"),o=e("a722"),u=e("2db4"),c=e("8654"),l=function(){var t=this,a=t._self._c;return a("div",[a("vue-element-loading",{attrs:{active:t.appLoading,"is-full-screen":!0,"background-color":"#FFFFFF",color:"#182444",spinner:"bar-fade-scale"}}),t.ServerError?a("ServerError"):t._e(),a(u["a"],{attrs:{color:"#ff6200",right:"",top:"",timeout:"2000"},model:{value:t.snackbar,callback:function(a){t.snackbar=a},expression:"snackbar"}},[a(o["a"],{attrs:{wrap:"","justify-center":""}},[a(r["a"],{staticClass:"align-self-center",attrs:{"text-left":""}},[a("span",{staticStyle:{color:"white"}},[t._v(" "+t._s(t.msg)+" ")])]),a(r["a"],{attrs:{"text-right":""}},[a(s["a"],{attrs:{small:"",ripple:!1,text:""},on:{click:function(a){t.snackbar=!1}}},[a(n["a"],{staticStyle:{color:"white"}},[t._v("mdi-close")])],1)],1)],1)],1),a(o["a"],{attrs:{wrap:"","justify-center":"","pa-4":""}},[a(r["a"],{attrs:{xs12:""}},[a(o["a"],{attrs:{wrap:"","justify-start":"","py-2":""}},[a(r["a"],{attrs:{xs12:"",sm6:"","align-self-center":""}},[a("span",{staticClass:"title1",style:{"font-size":"xs"==t.$vuetify.breakpoint.name||"sm"==t.$vuetify.breakpoint.name?"20px":"md"==t.$vuetify.breakpoint.name||"lg"==t.$vuetify.breakpoint.name?"25px":"30px"}},[t._v(t._s(t.$route.query.name))])])],1),a(o["a"],{attrs:{wrap:"","justify-space-around":"","pt-2":""}},[a(r["a"],{attrs:{xs12:""}},[a(i["a"],{staticClass:"pa-8",attrs:{tile:"",elevation:"0"}},[a(o["a"],{attrs:{wrap:"","justify-start":""}},[a(r["a"],{attrs:{xs12:"",sm6:""}},[a(o["a"],{attrs:{wrap:"","justify-center":""}},[a(r["a"],{attrs:{xs12:"",sm10:"","pt-4":"","text-left":""}},[a("span",{staticClass:"title2"},[t._v("Maximum Capacity")]),a(c["a"],{attrs:{dense:"",outlined:"",type:"number","hide-spin-buttons":"",rules:[t.rules.required],"hide-details":"auto"},model:{value:t.maxCapacityOfBoat,callback:function(a){t.maxCapacityOfBoat=a},expression:"maxCapacityOfBoat"}})],1),a(r["a"],{attrs:{xs12:"",sm10:"","pt-4":"","text-left":""}},[a("span",{staticClass:"title2"},[t._v("Minimum Hours")]),a(c["a"],{attrs:{dense:"",outlined:"",type:"number","hide-spin-buttons":"",rules:[t.rules.required],"hide-details":"auto"},model:{value:t.minimumHour,callback:function(a){t.minimumHour=a},expression:"minimumHour"}})],1)],1)],1),a(r["a"],{attrs:{xs12:"",sm6:""}},[a(o["a"],{attrs:{wrap:"","justify-center":""}},[a(r["a"],{attrs:{xs12:"",sm10:"","pt-4":"","text-left":""}},[a("span",{staticClass:"title2"},[t._v("Minimum Capacity")]),a(c["a"],{attrs:{dense:"",outlined:"",type:"number","hide-spin-buttons":"",rules:[t.rules.required],"hide-details":"auto"},model:{value:t.minCapacityOfBoat,callback:function(a){t.minCapacityOfBoat=a},expression:"minCapacityOfBoat"}})],1)],1),a(o["a"],{attrs:{wrap:"","justify-center":"","pt-16":""}},[a(r["a"],{attrs:{xs12:"",sm10:"","align-self-end":"","text-right":"","pt-0":"","pt-sm-10":""}},[a(s["a"],{staticClass:"btnstly",staticStyle:{cursor:"pointer"},attrs:{width:"150px"},on:{click:function(a){return t.validation()}}},[a("span",{staticStyle:{"font-family":"LexendFont","text-transform":"none"}},[t._v("Next")])])],1)],1)],1)],1)],1)],1)],1)],1)],1)],1)},m=[],p=(e("14d9"),e("cee4")),d={data(){return{snackbar:!1,timeout:2e3,ServerError:!1,appLoading:!1,data:[],msg:null,page:1,limit:20,houseBoatId:"",tripType:"",minCapacityOfBoat:"",maxCapacityOfBoat:"",pickUpLocation:"",dropLocation:"",minimumHour:"",welcomeDrink:!1,lunch:!1,teaOrsnacks:!1,dinner:!1,breakfast:!1,menu2:!1,menu3:!1,menu4:!1,menu5:!1,menu6:!1,menu7:!1,menu8:!1,rules:{required:t=>!!t||"Required.",counter:t=>t.length<=20||"Max 20 characters",email:t=>{const a=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return a.test(t)||"Invalid e-mail."}},pinRules:[t=>!!t||"PIN is required",t=>t&&6===t.length||"PIN must be 6 digits"]}},methods:{validation(){return this.maxCapacityOfBoat?this.minCapacityOfBoat?this.minimumHour?void this.add():(this.msg="Please enter min hours",void(this.snackbar=!0)):(this.msg="Please add min capacity",void(this.snackbar=!0)):(this.msg="Please add max capacity",void(this.snackbar=!0))},add(){this.appLoading=!0,Object(p["a"])({method:"POST",url:"/shikara/trip/add",data:{maxCapacityOfBoat:this.maxCapacityOfBoat,minCapacityOfBoat:this.minCapacityOfBoat,minimumHour:this.minimumHour,shikaraId:this.$route.query.id},headers:{token:localStorage.getItem("token")}}).then(t=>{if(this.appLoading=!1,1==t.data.status){this.msg=t.data.msg,this.snackbar=!0;var a=t.data.data._id;console.log("tripId=",a),this.$router.push("/AddShikaraSeasonalRate?name="+this.$route.query.name+"&&id="+a)}else this.msg=t.data.msg,this.snackbar=!0})}}},f=d,h=(e("d4e4"),e("0c7c")),y=Object(h["a"])(f,l,m,!1,null,"2eb5e082",null);a["default"]=y.exports},d4e4:function(t,a,e){"use strict";e("084f")}}]);
//# sourceMappingURL=chunk-dc4ffac4.31ea5942.js.map