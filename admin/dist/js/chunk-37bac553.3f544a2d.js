(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-37bac553"],{2909:function(t,e,a){"use strict";a.d(e,"a",(function(){return l}));var s=a("6b75");function n(t){if(Array.isArray(t))return Object(s["a"])(t)}a("a4d3"),a("e01a"),a("d3b7"),a("d28b"),a("3ca3"),a("ddb0"),a("a630");function o(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}var r=a("06c5");function i(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function l(t){return n(t)||o(t)||Object(r["a"])(t)||i()}},"2db4":function(t,e,a){"use strict";var s=a("ade3"),n=(a("a9e3"),a("caad"),a("ca71"),a("8dd9")),o=a("a9ad"),r=a("7560"),i=a("f2e7"),l=a("fe6c"),c=a("58df"),u=a("80d2"),v=a("d9bd");e["a"]=Object(c["a"])(n["a"],o["a"],i["a"],Object(l["b"])(["absolute","bottom","left","right","top"])).extend({name:"v-snackbar",props:{app:Boolean,centered:Boolean,contentClass:{type:String,default:""},multiLine:Boolean,text:Boolean,timeout:{type:[Number,String],default:5e3},transition:{type:[Boolean,String],default:"v-snack-transition",validator:function(t){return"string"===typeof t||!1===t}},vertical:Boolean},data:function(){return{activeTimeout:-1}},computed:{classes:function(){return{"v-snack--absolute":this.absolute,"v-snack--active":this.isActive,"v-snack--bottom":this.bottom||!this.top,"v-snack--centered":this.centered,"v-snack--has-background":this.hasBackground,"v-snack--left":this.left,"v-snack--multi-line":this.multiLine&&!this.vertical,"v-snack--right":this.right,"v-snack--text":this.text,"v-snack--top":this.top,"v-snack--vertical":this.vertical}},hasBackground:function(){return!this.text&&!this.outlined},isDark:function(){return this.hasBackground?!this.light:r["a"].options.computed.isDark.call(this)},styles:function(){if(this.absolute)return{};var t=this.$vuetify.application,e=t.bar,a=t.bottom,s=t.footer,n=t.insetFooter,o=t.left,r=t.right,i=t.top;return{paddingBottom:Object(u["f"])(a+s+n),paddingLeft:this.app?Object(u["f"])(o):void 0,paddingRight:this.app?Object(u["f"])(r):void 0,paddingTop:Object(u["f"])(e+i)}}},watch:{isActive:"setTimeout",timeout:"setTimeout"},mounted:function(){this.isActive&&this.setTimeout()},created:function(){this.$attrs.hasOwnProperty("auto-height")&&Object(v["e"])("auto-height",this),0==this.timeout&&Object(v["d"])('timeout="0"',"-1",this)},methods:{genActions:function(){return this.$createElement("div",{staticClass:"v-snack__action "},[Object(u["o"])(this,"action",{attrs:{class:"v-snack__btn"}})])},genContent:function(){return this.$createElement("div",{staticClass:"v-snack__content",class:Object(s["a"])({},this.contentClass,!0),attrs:{role:"status","aria-live":"polite"}},[Object(u["o"])(this)])},genWrapper:function(){var t=this,e=this.hasBackground?this.setBackgroundColor:this.setTextColor,a=e(this.color,{staticClass:"v-snack__wrapper",class:n["a"].options.computed.classes.call(this),style:n["a"].options.computed.styles.call(this),directives:[{name:"show",value:this.isActive}],on:{pointerenter:function(){return window.clearTimeout(t.activeTimeout)},pointerleave:this.setTimeout}});return this.$createElement("div",a,[this.genContent(),this.genActions()])},genTransition:function(){return this.$createElement("transition",{props:{name:this.transition}},[this.genWrapper()])},setTimeout:function(){var t=this;window.clearTimeout(this.activeTimeout);var e=Number(this.timeout);this.isActive&&![0,-1].includes(e)&&(this.activeTimeout=window.setTimeout((function(){t.isActive=!1}),e))}},render:function(t){return t("div",{staticClass:"v-snack",class:this.classes,style:this.styles},[!1!==this.transition?this.genTransition():this.genWrapper()])}})},"2fa4":function(t,e,a){"use strict";a("20f6");var s=a("80d2");e["a"]=Object(s["h"])("spacer","div","v-spacer")},5958:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-layout",{attrs:{wrap:""}},[a("v-snackbar",{attrs:{color:"black"},model:{value:t.showSnackBar,callback:function(e){t.showSnackBar=e},expression:"showSnackBar"}},[a("v-layout",{attrs:{wrap:"","justify-center":""}},[a("v-flex",{staticClass:"align-self-center",attrs:{"text-left":""}},[a("span",{staticStyle:{color:"white"}},[t._v(" "+t._s(t.msg)+" ")])]),a("v-flex",{attrs:{"text-right":""}},[a("v-btn",{attrs:{small:"",ripple:!1,text:""},on:{click:function(e){t.showSnackBar=!1}}},[a("v-icon",{staticStyle:{color:"white"}},[t._v("mdi-close")])],1)],1)],1)],1),a("vue-element-loading",{attrs:{active:t.appLoading,"is-full-screen":!0,"background-color":"#FFFFFF",color:"#FF681F",spinner:"spinner"}}),a("v-flex",{attrs:{xs12:""}},[a("v-layout",{staticClass:"mainfont",attrs:{"justify-center":""}},[a("v-flex",{attrs:{xs11:"","pt-10":"",pb:""}},[a("v-card",{staticStyle:{"border-radius":"0%"},attrs:{elevation:"0"}},[a("v-layout",{attrs:{wrap:"","justify-start":"","pa-4":""}},[a("v-flex",{attrs:{xs11:"",sm4:"",lg3:"","pt-5":""}},[a("strong",[t._v("Name")]),t._v(": "+t._s(t.list.name)+" ")]),a("v-flex",{attrs:{xs11:"",sm4:"",lg3:"","pt-5":""}},[a("strong",[t._v("Phone Number")]),t._v(": "+t._s(t.list.phoneNumber)+" ")]),a("v-flex",{attrs:{xs11:"",sm4:"",lg3:"","pt-5":""}},[a("strong",[t._v("Email")]),t._v(": "+t._s(t.list.email)+" ")]),a("v-flex",{attrs:{xs11:"",sm4:"",lg3:"","pt-5":""}},[a("strong",[t._v("Whatsapp Number")]),t._v(": "+t._s(t.list.whatsappNumber)+" ")]),a("v-flex",{attrs:{xs11:"",sm4:"",lg3:"","pt-5":""}},[a("strong",[t._v("User Type")]),t._v(": "+t._s(t.list.userType)+" ")]),a("v-flex",{attrs:{xs11:"",sm4:"",lg3:"","pt-5":""}},[a("strong",[t._v("Locality")]),t._v(": "+t._s(t.list.locality)+" ")]),a("v-flex",{attrs:{xs11:"",sm4:"",lg3:"","pt-5":""}},[a("strong",[t._v("Pincode")]),t._v(": "+t._s(t.list.pincode)+" ")]),a("v-flex",{attrs:{xs11:"",sm4:"",lg3:"","pt-5":""}},[a("strong",[t._v("District")]),t._v(": "+t._s(t.list.district)+" ")]),a("v-flex",{attrs:{xs11:"",sm4:"",lg3:"","pt-5":""}},[a("strong",[t._v("State")]),t._v(": "+t._s(t.list.state)+" ")]),a("v-flex",{attrs:{xs11:"",sm4:"",lg3:"","pt-5":""}},[a("strong",[t._v("Country")]),t._v(": "+t._s(t.list.country)+" ")]),a("v-flex",{attrs:{xs11:"",sm4:"",lg3:"","pt-5":""}},[a("strong",[t._v("Building No")]),t._v(": "+t._s(t.list.buildingNo)+" ")]),a("v-flex",{attrs:{xs11:"",sm4:"",lg3:"","pt-5":""}},[a("strong",[t._v("Company Name")]),t._v(": "+t._s(t.list.companyName)+" ")]),a("v-flex",{attrs:{xs11:"",sm4:"",lg3:"","pt-5":""}},[a("strong",[t._v("Gst No")]),t._v(": "+t._s(t.list.gstNo)+" ")]),a("v-flex",{attrs:{xs11:"",sm4:"",lg3:"","pt-5":""}},[a("strong",[t._v("Level")]),t._v(": "+t._s(t.list.level)+" ")]),a("v-flex",{attrs:{xs11:"",sm4:"",lg3:"","pt-5":""}},[a("strong",[t._v("Role")]),t._v(": "+t._s(t.list.role)+" ")]),a("v-flex",{attrs:{xs11:"",lg3:"","pt-5":""}},[a("strong",[t._v("Verification Status")]),t._v(": "+t._s(t.list.verificationStatus)+" ")])],1)],1)],1)],1)],1),a("v-flex",{attrs:{xs12:"","pb-16":""}},[a("v-layout",{staticClass:"mainfont",attrs:{"justify-center":""}},[a("v-flex",{attrs:{xs11:"","pt-10":""}},[t.list?a("v-card",{staticStyle:{"border-radius":"0%"},attrs:{elevation:"0"}},[t.list.agentId?a("v-layout",{attrs:{wrap:"","justify-start":"","pa-4":""}},[t.list.agentId.agentGSTProof?a("v-flex",{attrs:{xs12:"",sm4:"",lg4:""}},[a("v-layout",{attrs:{wrap:""}},[a("v-flex",{attrs:{xs12:"",lg8:"","text-center":""}},[t._v(" ID PROOF ")]),a("v-flex",{attrs:{xs12:"",lg8:"","pt-4":""}},[a("v-btn",{attrs:{color:"rgba(255, 98, 0, 1)",small:"",block:"",dark:"",download:"",href:t.mediaURLnewx+t.list.agentId.agentGSTProof,target:"_blank"}},[a("v-icon",[t._v("mdi-file-document-outline")]),a("span",{staticStyle:{"font-family":"mainfont","font-weight":"400","font-size":"16px","text-transform":"none"}},[t._v("View")])],1)],1)],1)],1):t._e(),t.list.agentId.agentIdProofBack?a("v-flex",{attrs:{xs12:"",sm4:"",lg4:""}},[a("v-layout",{attrs:{wrap:""}},[a("v-flex",{attrs:{xs12:"",lg8:"","text-center":""}},[t._v(" ID PROOF BACK ")]),a("v-flex",{attrs:{xs12:"",lg8:"","pt-4":""}},[a("v-btn",{attrs:{color:"rgba(255, 98, 0, 1)",small:"",block:"",dark:"",download:"",href:t.mediaURLnewx+t.list.agentId.agentIdProofBack,target:"_blank"}},[a("v-icon",[t._v("mdi-file-document-outline")]),a("span",{staticStyle:{"font-family":"mainfont","font-weight":"400","font-size":"16px","text-transform":"none"}},[t._v("View")])],1)],1)],1)],1):t._e(),t.list.agentId.agentIdProofFront?a("v-flex",{attrs:{xs12:"",sm4:"",lg4:""}},[a("v-layout",{attrs:{wrap:"","justify-center":""}},[a("v-flex",{attrs:{xs12:"",lg8:"","text-center":""}},[t._v(" ID PROOF FRONT ")]),a("v-flex",{attrs:{xs12:"",lg8:"","pt-4":""}},[a("v-btn",{attrs:{color:"rgba(255, 98, 0, 1)",small:"",block:"",dark:"",download:"",href:t.mediaURLnewx+t.list.agentId.agentIdProofFront,target:"_blank"}},[a("v-icon",[t._v("mdi-file-document-outline")]),a("span",{staticStyle:{"font-family":"mainfont","font-weight":"400","font-size":"16px","text-transform":"none"}},[t._v("View")])],1)],1)],1)],1):t._e()],1):t._e()],1):t._e()],1)],1)],1),"Verified"!==t.list.verificationStatus&&"Blocked"!==t.list.verificationStatus?a("v-flex",{attrs:{xs12:""}},[4===t.list.level?a("v-layout",{staticClass:"mainfont",attrs:{"justify-center":""}},[a("v-flex",{attrs:{xs11:"","pt-10":""}},[a("v-card",{staticStyle:{"border-radius":"0%"},attrs:{elevation:"0"}},[a("v-layout",{attrs:{wrap:"","justify-start":"","pa-4":""}},[a("v-flex",{attrs:{xs6:"",sm3:"",lg2:""}},[a("v-btn",{attrs:{color:"green"},on:{click:function(e){t.approve=!0}}},[a("span",{staticStyle:{color:"aliceblue"}},[t._v(" Approve ")])])],1),a("v-flex",{attrs:{xs6:"",sm3:"",lg2:""}},[a("v-btn",{attrs:{color:"red"},on:{click:function(e){t.reject=!0}}},[a("span",{staticStyle:{color:"aliceblue"}},[t._v(" Reject ")])])],1)],1)],1)],1),a("v-dialog",{attrs:{"retain-focus":!0,persistent:"","max-width":"600px"},model:{value:t.approve,callback:function(e){t.approve=e},expression:"approve"}},[a("v-card",[a("v-layout",{attrs:{wrap:""}},[a("v-flex",{attrs:{xs12:""}},[a("v-card-title",{staticClass:"mainfont",staticStyle:{color:"black","font-size":"18px","font-weight":"lighter"}},[t._v(" Are you sure you want to Approve? ")])],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{staticClass:"mainfont",attrs:{color:"black",text:""},on:{click:function(e){t.approve=!1}}},[t._v("Cancel")]),a("v-btn",{staticClass:"mainfont",attrs:{color:"red",text:""},on:{click:function(e){return t.userAction("Active")}}},[t._v("OK")]),a("v-spacer")],1)],1)],1),a("v-dialog",{attrs:{"retain-focus":!0,persistent:"","max-width":"600px"},model:{value:t.reject,callback:function(e){t.reject=e},expression:"reject"}},[a("v-card",[a("v-layout",{attrs:{wrap:""}},[a("v-flex",{attrs:{xs12:""}},[a("v-card-title",{staticClass:"mainfont",staticStyle:{color:"black","font-size":"18px","font-weight":"lighter"}},[t._v(" Are you sure you want to Reject? ")])],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{staticClass:"mainfont",attrs:{color:"black",text:""},on:{click:function(e){t.reject=!1}}},[t._v("Cancel")]),a("v-btn",{staticClass:"mainfont",attrs:{color:"red",text:""},on:{click:function(e){return t.userAction2("Active")}}},[t._v("OK")]),a("v-spacer")],1)],1)],1)],1):t._e()],1):t._e()],1)],1)},n=[],o=a("bc3a"),r=a.n(o),i={data:function(){return{name:null,barlist:[],deleteit:!1,userProfileTabs:null,subtab:null,appLoading:!1,unblock:!1,id:this.$route.query.id,block:!1,deletetit:!1,preview:null,tab:null,list:[],approve:!1,reject:!1,auctionbased:[],msg:null,showSnackBar:!1}},mounted:function(){this.getList()},methods:{userAction:function(){var t=this;r()({method:"POST",url:"/agent/approve",headers:{token:localStorage.getItem("token")},data:{userid:this.id}}).then((function(e){!0===e.data.status?(t.msg=e.data.msg,t.showSnackBar=!0,t.$router.push("/approvedagent")):(t.msg=e.data.msg,t.showSnackBar=!0,t.approve=!1)})).catch((function(e){t.ServerError=!0,console.error(e)}))},unblockAgent:function(){var t=this;r()({method:"POST",url:"/agent/unblock",headers:{token:localStorage.getItem("token")},data:{userid:this.id}}).then((function(e){1==e.data.status&&(t.msg=e.data.msg,t.showSnackBar=!0,location.reload())})).catch((function(e){t.ServerError=!0,console.log(e)}))},blockAgent:function(){var t=this;r()({method:"POST",url:"/agent/block",headers:{token:localStorage.getItem("token")},data:{userid:this.id}}).then((function(e){1==e.data.status&&(t.msg=e.data.msg,t.showSnackBar=!0,location.reload())})).catch((function(e){t.ServerError=!0,console.log(e)}))},deleteAgent:function(){var t=this;r()({method:"POST",url:"/agent/approve",headers:{token:localStorage.getItem("token")},data:{userid:this.id}}).then((function(e){1==e.data.status&&(t.msg=e.data.msg,t.showSnackBar=!0,t.$router.push("/agent"))})).catch((function(e){t.ServerError=!0,console.log(e)}))},userAction2:function(){var t=this;r()({method:"POST",url:"/agent/reject",headers:{token:localStorage.getItem("token")},data:{userid:this.id}}).then((function(e){1==e.data.status&&(t.msg=e.data.msg,t.showSnackBar=!0,t.$router.push("/agent"))})).catch((function(e){t.ServerError=!0,console.log(e)}))},getList:function(){var t=this;this.appLoading=!0,r()({method:"GET",url:"/agent/info",headers:{token:localStorage.getItem("token")},params:{id:this.id}}).then((function(e){t.list=e.data.data,t.appLoading=!1})).catch((function(e){t.ServerError=!0,console.log(e)}))}}},l=i,c=a("2877"),u=a("6544"),v=a.n(u),d=a("8336"),f=a("b0af"),p=a("99d9"),g=a("169a"),h=a("0e8f"),m=a("132d"),x=a("a722"),b=a("2db4"),k=a("2fa4"),_=Object(c["a"])(l,s,n,!1,null,null,null);e["default"]=_.exports;v()(_,{VBtn:d["a"],VCard:f["a"],VCardActions:p["a"],VCardTitle:p["c"],VDialog:g["a"],VFlex:h["a"],VIcon:m["a"],VLayout:x["a"],VSnackbar:b["a"],VSpacer:k["a"]})},ca71:function(t,e,a){},dd89:function(t,e,a){"use strict";function s(t){if("function"!==typeof t.getRootNode){while(t.parentNode)t=t.parentNode;return t!==document?null:document}var e=t.getRootNode();return e!==document&&e.getRootNode({composed:!0})!==document?null:e}a.d(e,"a",(function(){return s}))}}]);
//# sourceMappingURL=chunk-37bac553.3f544a2d.js.map