(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d20f5a6"],{b2ee:function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-layout",{staticClass:"mainfont",attrs:{wrap:"","justify-center":""}},[e("v-snackbar",{attrs:{color:"black"},model:{value:t.showSnackBar,callback:function(a){t.showSnackBar=a},expression:"showSnackBar"}},[e("v-layout",{attrs:{wrap:"","justify-center":""}},[e("v-flex",{staticClass:"align-self-center",attrs:{"text-left":""}},[e("span",{staticStyle:{color:"white"}},[t._v(" "+t._s(t.msg)+" ")])]),e("v-flex",{attrs:{"text-right":""}},[e("v-btn",{attrs:{small:"",ripple:!1,text:""},on:{click:function(a){t.showSnackBar=!1}}},[e("v-icon",{staticStyle:{color:"white"}},[t._v("mdi-close")])],1)],1)],1)],1),e("vue-element-loading",{attrs:{active:t.appLoading,"is-full-screen":!0,"background-color":"#FFFFFF",color:"#FF681F",spinner:"spinner"}}),e("v-flex",{attrs:{xs11:"","pt-4":""}},[e("v-card",{staticClass:"pa-6"},[e("v-layout",{attrs:{wrap:"","justify-center":""}},[e("v-flex",{attrs:{xs12:"","pt-4":""}},[e("span",{staticClass:"mainfont"},[t._v("Heading")]),e("v-text-field",{staticClass:"mainfont",attrs:{outlined:"",dense:"",type:"text"},model:{value:t.list.name,callback:function(a){t.$set(t.list,"name",a)},expression:"list.name"}}),e("v-flex",{attrs:{"pt-4":""}},[e("vue-editor",{staticClass:"mainfont",model:{value:t.list.content,callback:function(a){t.$set(t.list,"content",a)},expression:"list.content"}})],1)],1),e("v-flex",{attrs:{"text-center":"","pt-10":"","pb-6":""}},[e("v-btn",{staticClass:"custombackground",on:{click:function(a){return t.edit()}}},[e("span",{staticClass:"mainfont"},[e("span",{staticStyle:{color:"white"}},[t._v(" SUBMIT ")])])])],1)],1)],1)],1)],1)},s=[],o=(e("b0c0"),e("bc3a")),c=e.n(o),i=e("5873"),l={components:{VueEditor:i["a"]},data:function(){return{appLoading:!1,content:null,msg:null,showSnackBar:!1,name:null,list:[]}},mounted:function(){this.getView()},methods:{edit:function(){var t=this;this.appLoading=!0,c()({method:"POST",url:"/policy/update",headers:{token:localStorage.getItem("token")},data:{name:this.list.name,content:this.list.content}}).then((function(a){t.appLoading=!1,a.data.status,t.msg=a.data.msg,t.showSnackBar=!0})).catch((function(a){t.ServerError=!0,console.log(a)}))},getView:function(){var t=this;this.appLoading=!0,c()({method:"GET",url:"/policy/view",headers:{token:localStorage.getItem("token")},params:{name:"Our Services"}}).then((function(a){1==a.data.status?(t.appLoading=!1,t.list=a.data.data):(t.msg=a.data.msg,t.showSnackBar=!0)})).catch((function(a){t.ServerError=!0,console.log(a)}))}}},r=l,u=e("2877"),d=e("6544"),p=e.n(d),f=e("8336"),m=e("b0af"),v=e("0e8f"),h=e("132d"),g=e("a722"),k=e("2db4"),w=e("8654"),x=Object(u["a"])(r,n,s,!1,null,null,null);a["default"]=x.exports;p()(x,{VBtn:f["a"],VCard:m["a"],VFlex:v["a"],VIcon:h["a"],VLayout:g["a"],VSnackbar:k["a"],VTextField:w["a"]})}}]);
//# sourceMappingURL=chunk-2d20f5a6.bfcef72d.js.map