(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-119dcb10"],{"0c43":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("v-snackbar",{attrs:{color:"black"},model:{value:t.showSnackBar,callback:function(e){t.showSnackBar=e},expression:"showSnackBar"}},[i("v-layout",{attrs:{wrap:"","justify-center":""}},[i("v-flex",{staticClass:"align-self-center",attrs:{"text-left":""}},[i("span",{staticStyle:{color:"white"}},[t._v(" "+t._s(t.msg)+" ")])]),i("v-flex",{attrs:{"text-right":""}},[i("v-btn",{attrs:{small:"",ripple:!1,text:""},on:{click:function(e){t.showSnackBar=!1}}},[i("v-icon",{staticStyle:{color:"white"}},[t._v("mdi-close")])],1)],1)],1)],1),i("vue-element-loading",{attrs:{active:t.appLoading,"is-full-screen":!0,"background-color":"#FFFFFF",color:"#FF681F",spinner:"spinner"}}),i("v-layout",{attrs:{wrap:""}},[i("v-flex",{attrs:{xs12:""}},[i("v-layout",{staticClass:"mainfont",attrs:{"pa-4":"",wrap:"","justify-center":""}},[i("v-flex",{style:{"font-size":"xs"==t.$vuetify.breakpoint.name||"sm"==t.$vuetify.breakpoint.name?"20px":"md"==t.$vuetify.breakpoint.name||"lg"==t.$vuetify.breakpoint.name?"25px":"30px"},attrs:{xs10:"",sm8:"",lg10:"","pt-6":"","text-left":""}},[t._v(" Pending Agent ("+t._s(t.totalData)+") ")]),i("v-flex",{attrs:{xs12:"",sm4:"",lg2:"","pt-6":""}},[i("v-text-field",{staticClass:"custom-text-field",staticStyle:{"border-radius":"0%"},attrs:{outlined:"",dense:"","hide-details":"",clearable:"",color:"orange",label:"Search "},scopedSlots:t._u([{key:"label",fn:function(){return[i("span",{staticClass:"custom-label-text mainfont",staticStyle:{color:"black","font-size":"14px"}},[t._v("Search ")])]},proxy:!0}]),model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}})],1)],1)],1),t.list.length>0?i("v-flex",{attrs:{xs12:""}},[i("v-layout",{attrs:{wrap:""}},t._l(t.list,(function(e,n){return i("v-flex",{key:n,staticClass:"mainfont",attrs:{xs12:"",sm4:"",lg3:"","pt-8":""}},[i("v-layout",{attrs:{wrap:"","justify-center":""}},[i("v-flex",{attrs:{xs11:""}},[i("v-card",[i("v-layout",{attrs:{wrap:"","justify-center":"","pb-3":""}},[i("v-flex",{attrs:{xs11:""}},[i("v-layout",{attrs:{wrap:"","justify-center":""}},[i("v-flex",{attrs:{xs12:"","pt-2":""}},[i("v-img",{attrs:{height:"190px",src:a("fbf4")}})],1)],1)],1),i("v-flex",{attrs:{xs11:""}},[i("v-layout",{attrs:{wrap:"","justify-center":""}},[i("v-flex",{attrs:{xs11:"","pt-3":""}},[i("strong",[t._v("Name:")]),t._v(" "+t._s(e.name)+" ")]),i("v-flex",{attrs:{xs11:"","pt-3":""}},[i("strong",[t._v("Phone Number:")]),t._v(" "+t._s(e.phoneNumber)+" ")]),i("v-flex",{attrs:{xs11:"","pt-3":""}},[i("strong",[t._v("User Type:")]),t._v(" "+t._s(e.userType)+" ")]),i("v-flex",{attrs:{xs11:"","pt-3":""}},[i("strong",[t._v("Locality:")]),t._v(" "+t._s(e.locality)+" ")]),i("v-flex",{attrs:{xs11:"","pt-3":""},on:{click:function(a){return t.$router.push("/agentdetailedview?id="+e._id)}}},[i("v-btn",{attrs:{block:"",color:"#FF681F"}},[i("span",{staticStyle:{color:"white","text-transform":"none"}},[t._v(" View more "),i("v-icon",{attrs:{color:"white"}},[t._v("mdi-arrow-right-thin")])],1)])],1),i("v-flex",{attrs:{xs11:"","pt-3":""},on:{click:function(a){t.deleteit=!0,t.userId=e._id}}},[i("v-btn",{attrs:{block:"",color:"red"}},[i("span",{staticStyle:{color:"white","text-transform":"none"}},[t._v(" Delete "),i("v-icon",{attrs:{color:"white",size:"110%"}},[t._v("mdi-delete")])],1)])],1)],1)],1)],1)],1)],1)],1)],1)})),1),i("v-layout",{attrs:{wrap:""}},[i("v-flex",{staticClass:"mainfont",attrs:{xs12:"","pt-10":""}},[i("v-pagination",{attrs:{"prev-icon":"mdi-menu-left","next-icon":"mdi-menu-right",length:t.pages,"total-visible":7,color:"#FF681F"},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1)],1)],1):i("v-layout",{attrs:{"pt-16":"",wrap:""}},[i("v-flex",{staticClass:"mainfont",staticStyle:{"font-size":"larger"},attrs:{xs12:"","text-center":""}},[t._v(" No data found! ")])],1)],1),i("v-dialog",{attrs:{"retain-focus":!0,persistent:"","max-width":"600px"},model:{value:t.deleteit,callback:function(e){t.deleteit=e},expression:"deleteit"}},[i("v-card",[i("v-layout",{attrs:{wrap:""}},[i("v-flex",{attrs:{xs12:""}},[i("v-card-title",{staticClass:"mainfont",staticStyle:{color:"black","font-size":"18px","font-weight":"lighter"}},[t._v(" Are you sure you want to delete this agent? ")])],1)],1),i("v-card-actions",[i("v-spacer"),i("v-btn",{staticClass:"mainfont",attrs:{color:"black",text:""},on:{click:function(e){t.deleteit=!1}}},[t._v("Cancel")]),i("v-btn",{staticClass:"mainfont",attrs:{color:"red",text:""},on:{click:function(e){return t.deleteAgent(t.userId)}}},[t._v("OK")]),i("v-spacer")],1)],1)],1)],1)},n=[],s=a("bc3a"),r=a.n(s),l={data:function(){return{name:null,agentid:"",barlist:[],userProfileTabs:null,subtab:null,appLoading:!1,page:1,totalData:"",pages:0,deleteit:!1,preview:null,tab:null,keyword:"",barlist1:[],dialog3:!1,deletedialog:!1,minAmount:null,password:null,categoryarray:[],list:[],flag:!1,flag2:!1,auctionbased:[],currentpage:1,menu1:!1,menu2:!1,menu3:!1,menu4:!1,fromDate:null,toDate:null,fromDate2:null,toDate2:null,msg:null,currentPage:parseInt(this.getLocalStoragePage(),10)||1,showSnackBar:!1,curid:[],dialog2:!1}},mounted:function(){this.getList()},watch:{currentPage:function(t){this.setLocalStoragePage(t),this.getList()},keyword:function(){this.searching=!0,this.currentPage=1,this.getList()}},methods:{deleteAgent:function(t){var e=this;r()({method:"POST",url:"/agent/delete",headers:{token:localStorage.getItem("token")},data:{userId:t}}).then((function(t){1==t.data.status&&(e.msg=t.data.msg,e.showSnackBar=!0,location.reload())})).catch((function(t){e.ServerError=!0,console.log(t)}))},getLocalStoragePage:function(){return localStorage.getItem("paginationPage5")},setLocalStoragePage:function(t){localStorage.setItem("paginationPage5",t)},getList:function(){var t=this;this.appLoading=!0,r()({method:"GET",url:"/agent/pendingall",headers:{token:localStorage.getItem("token")},params:{keyword:this.keyword,status:this.status,categoryId:this.categoryId,page:this.currentPage,fromDate:this.fromDate,toDate:this.toDate,limit:12}}).then((function(e){t.list=e.data.data,t.totalData=e.data.totalLength,t.pages=Math.ceil(t.totalData/e.data.limit),t.appLoading=!1})).catch((function(e){t.ServerError=!0,console.log(e)}))}}},o=l,c=a("2877"),u=a("6544"),h=a.n(u),v=a("8336"),g=a("b0af"),f=a("99d9"),p=a("169a"),d=a("0e8f"),m=a("132d"),b=a("adda"),x=a("a722"),y=a("891e"),w=a("2db4"),k=a("2fa4"),_=a("8654"),S=Object(c["a"])(o,i,n,!1,null,null,null);e["default"]=S.exports;h()(S,{VBtn:v["a"],VCard:g["a"],VCardActions:f["a"],VCardTitle:f["c"],VDialog:p["a"],VFlex:d["a"],VIcon:m["a"],VImg:b["a"],VLayout:x["a"],VPagination:y["a"],VSnackbar:w["a"],VSpacer:k["a"],VTextField:_["a"]})},"17b3":function(t,e,a){},"2fa4":function(t,e,a){"use strict";a("20f6");var i=a("80d2");e["a"]=Object(i["h"])("spacer","div","v-spacer")},"891e":function(t,e,a){"use strict";var i=a("2909"),n=a("5530"),s=(a("a9e3"),a("99af"),a("d3b7"),a("25f0"),a("d81d"),a("17b3"),a("9d26")),r=a("dc22"),l=a("a9ad"),o=a("de2c"),c=a("7560"),u=a("58df");e["a"]=Object(u["a"])(l["a"],Object(o["a"])({onVisible:["init"]}),c["a"]).extend({name:"v-pagination",directives:{Resize:r["a"]},props:{circle:Boolean,disabled:Boolean,length:{type:Number,default:0,validator:function(t){return t%1===0}},nextIcon:{type:String,default:"$next"},prevIcon:{type:String,default:"$prev"},totalVisible:[Number,String],value:{type:Number,default:0},pageAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.page"},currentPageAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.currentPage"},previousAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.previous"},nextAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.next"},wrapperAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.wrapper"}},data:function(){return{maxButtons:0,selected:null}},computed:{classes:function(){return Object(n["a"])({"v-pagination":!0,"v-pagination--circle":this.circle,"v-pagination--disabled":this.disabled},this.themeClasses)},items:function(){var t=parseInt(this.totalVisible,10);if(0===t)return[];var e=Math.min(Math.max(0,t)||this.length,Math.max(0,this.maxButtons)||this.length,this.length);if(this.length<=e)return this.range(1,this.length);var a=e%2===0?1:0,n=Math.floor(e/2),s=this.length-n+1+a;if(this.value>n&&this.value<s){var r=1,l=this.length,o=this.value-n+2,c=this.value+n-2-a,u=o-1===r+1?2:"...",h=c+1===l-1?c+1:"...";return[1,u].concat(Object(i["a"])(this.range(o,c)),[h,this.length])}if(this.value===n){var v=this.value+n-1-a;return[].concat(Object(i["a"])(this.range(1,v)),["...",this.length])}if(this.value===s){var g=this.value-n+1;return[1,"..."].concat(Object(i["a"])(this.range(g,this.length)))}return[].concat(Object(i["a"])(this.range(1,n)),["..."],Object(i["a"])(this.range(s,this.length)))}},watch:{value:function(){this.init()}},mounted:function(){this.init()},methods:{init:function(){var t=this;this.selected=null,this.$nextTick(this.onResize),setTimeout((function(){return t.selected=t.value}),100)},onResize:function(){var t=this.$el&&this.$el.parentElement?this.$el.parentElement.clientWidth:window.innerWidth;this.maxButtons=Math.floor((t-96)/42)},next:function(t){t.preventDefault(),this.$emit("input",this.value+1),this.$emit("next")},previous:function(t){t.preventDefault(),this.$emit("input",this.value-1),this.$emit("previous")},range:function(t,e){var a=[];t=t>0?t:1;for(var i=t;i<=e;i++)a.push(i);return a},genIcon:function(t,e,a,i,n){return t("li",[t("button",{staticClass:"v-pagination__navigation",class:{"v-pagination__navigation--disabled":a},attrs:{disabled:a,type:"button","aria-label":n},on:a?{}:{click:i}},[t(s["a"],[e])])])},genItem:function(t,e){var a=this,i=e===this.value&&(this.color||"primary"),n=e===this.value,s=n?this.currentPageAriaLabel:this.pageAriaLabel;return t("button",this.setBackgroundColor(i,{staticClass:"v-pagination__item",class:{"v-pagination__item--active":e===this.value},attrs:{type:"button","aria-current":n,"aria-label":this.$vuetify.lang.t(s,e)},on:{click:function(){return a.$emit("input",e)}}}),[e.toString()])},genItems:function(t){var e=this;return this.items.map((function(a,i){return t("li",{key:i},[isNaN(Number(a))?t("span",{class:"v-pagination__more"},[a.toString()]):e.genItem(t,a)])}))},genList:function(t,e){return t("ul",{directives:[{modifiers:{quiet:!0},name:"resize",value:this.onResize}],class:this.classes},e)}},render:function(t){var e=[this.genIcon(t,this.$vuetify.rtl?this.nextIcon:this.prevIcon,this.value<=1,this.previous,this.$vuetify.lang.t(this.previousAriaLabel)),this.genItems(t),this.genIcon(t,this.$vuetify.rtl?this.prevIcon:this.nextIcon,this.value>=this.length,this.next,this.$vuetify.lang.t(this.nextAriaLabel))];return t("nav",{attrs:{role:"navigation","aria-label":this.$vuetify.lang.t(this.wrapperAriaLabel)}},[this.genList(t,e)])}})},fbf4:function(t,e,a){t.exports=a.p+"img/profile11.30b380d4.jpg"}}]);
//# sourceMappingURL=chunk-119dcb10.97373cf0.js.map