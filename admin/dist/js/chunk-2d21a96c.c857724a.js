(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21a96c"],{bbc9:function(t,a,n){"use strict";n.r(a);var e=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("v-layout",{staticClass:"mainfont",attrs:{wrap:"","justify-center":""}},[n("v-snackbar",{attrs:{color:"black"},model:{value:t.showSnackBar,callback:function(a){t.showSnackBar=a},expression:"showSnackBar"}},[n("v-layout",{attrs:{wrap:"","justify-center":""}},[n("v-flex",{staticClass:"align-self-center",attrs:{"text-left":""}},[n("span",{staticStyle:{color:"white"}},[t._v(" "+t._s(t.msg)+" ")])]),n("v-flex",{attrs:{"text-right":""}},[n("v-btn",{attrs:{small:"",ripple:!1,text:""},on:{click:function(a){t.showSnackBar=!1}}},[n("v-icon",{staticStyle:{color:"white"}},[t._v("mdi-close")])],1)],1)],1)],1),n("vue-element-loading",{attrs:{active:t.appLoading,"is-full-screen":!0,"background-color":"#FFFFFF",color:"#FF681F",spinner:"spinner"}}),n("v-flex",{attrs:{xs11:"","pt-6":""}},[n("v-card",{staticClass:"pa-6"},[n("v-layout",{attrs:{wrap:"","justify-center":""}},[n("v-flex",{attrs:{xs12:"","pt-4":""}},[n("span",{staticClass:"mainfont"},[t._v("Heading")]),n("v-text-field",{staticClass:"mainfont",attrs:{outlined:"",dense:"",type:"text"},model:{value:t.list.name,callback:function(a){t.$set(t.list,"name",a)},expression:"list.name"}}),n("v-flex",{attrs:{"pt-4":""}},[n("vue-editor",{staticClass:"mainfont",model:{value:t.list.content,callback:function(a){t.$set(t.list,"content",a)},expression:"list.content"}})],1)],1),n("v-flex",{attrs:{"text-center":"","pt-10":"","pb-6":""}},[n("v-btn",{staticClass:"custombackground",on:{click:function(a){return t.edit()}}},[n("span",{staticClass:"mainfont"},[n("span",{staticStyle:{color:"white"}},[t._v(" SUBMIT ")])])])],1)],1)],1)],1)],1)},s=[],o=(n("b0c0"),n("bc3a")),c=n.n(o),i=n("5873"),l={components:{VueEditor:i["a"]},data:function(){return{appLoading:!1,content:null,msg:null,showSnackBar:!1,name:null,list:[]}},mounted:function(){this.getView()},methods:{edit:function(){var t=this;this.appLoading=!0,c()({method:"POST",url:"/policy/update",headers:{token:localStorage.getItem("token")},data:{name:this.list.name,content:this.list.content}}).then((function(a){t.appLoading=!1,a.data.status,t.msg=a.data.msg,t.showSnackBar=!0})).catch((function(a){t.ServerError=!0,console.log(a)}))},getView:function(){var t=this;this.appLoading=!0,c()({method:"GET",url:"/policy/view",headers:{token:localStorage.getItem("token")},params:{name:"Privacy Policy"}}).then((function(a){1==a.data.status?(t.appLoading=!1,t.list=a.data.data):(t.msg=a.data.msg,t.showSnackBar=!0)})).catch((function(a){t.ServerError=!0,console.log(a)}))}}},r=l,u=n("2877"),d=n("6544"),p=n.n(d),f=n("8336"),m=n("b0af"),v=n("0e8f"),h=n("132d"),g=n("a722"),k=n("2db4"),w=n("8654"),b=Object(u["a"])(r,e,s,!1,null,null,null);a["default"]=b.exports;p()(b,{VBtn:f["a"],VCard:m["a"],VFlex:v["a"],VIcon:h["a"],VLayout:g["a"],VSnackbar:k["a"],VTextField:w["a"]})}}]);
//# sourceMappingURL=chunk-2d21a96c.c857724a.js.map