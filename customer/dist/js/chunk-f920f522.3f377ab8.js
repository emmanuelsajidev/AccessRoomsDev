(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f920f522"],{1973:function(t,e,a){"use strict";a.r(e);var r=a("8336"),s=a("0e8f"),o=a("132d"),n=a("a722"),i=a("2db4"),c=function(){var t=this,e=t._self._c;return e("div",[e("PageLoader",{attrs:{storage:t.appLoading}}),t.ServerError?e("ServerError"):t._e(),e(i["a"],{attrs:{color:"#ff6200",right:"",timeout:3e3},model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[e(n["a"],{attrs:{wrap:""}},[e(s["a"],{staticClass:"align-self-center",attrs:{"text-left":""}},[t._v(t._s(t.msg))]),e(s["a"],{attrs:{"text-right":""}},[e(r["a"],{attrs:{small:"",ripple:!1,text:""},on:{click:function(e){t.snackbar=!1}}},[e(o["a"],{staticStyle:{color:"white"}},[t._v("mdi-close")])],1)],1)],1)],1),e(n["a"],{staticStyle:{"background-color":"#f9f9f9"},attrs:{wrap:"","justify-center":""}},[e(s["a"],{attrs:{xs11:"","pt-4":""}},[e("span",{staticStyle:{"font-family":"LexendRegular","font-size":"25px",color:"black","letter-spacing":"1px",cursor:"pointer"}},[t._v("Terms and Conditions")])]),e(s["a"],{attrs:{xs11:"","pt-6":""}},[e("span",{domProps:{innerHTML:t._s(t.list.content)}})])],1)],1)},l=[],d=a("cee4"),u={data(){return{reg:!1,userType:"",content:{},list:{},value:"",phoneNumber:"",countryCode:"",name:"",email:"",password:"",confirmPassword:"",whatsappNumber:"",appLoading:!1,ServerError:!1,snackbar:!1,timeout:5e3,msg:null,Rules:[t=>!!t||"Required"],rules:{required:t=>!!t||"Required.",min:t=>t.length>=8||"Min 8 characters",pincode:t=>6==t.length||"Please provide valid pincode",otp:t=>4==t.length||"Please provide valid otp",check:t=>t===this.password||"Passwords do not match"},emailRules:[t=>!!t||"Email is Required",t=>/.+@.+\..+/.test(t)||"E-mail must be valid"]}},mounted(){this.getView()},computed:{appUser(){return this.$store.state.userData},authUser(){return this.$store.state.authData}},methods:{getView(){this.appLoading=!0,Object(d["a"])({method:"GET",url:"/policy/view",headers:{token:localStorage.getItem("token")},params:{name:"Terms and Conditions"}}).then(t=>{1==t.data.status?(this.appLoading=!1,this.list=t.data.data):(this.msg=t.data.msg,this.showSnackBar=!0)}).catch(t=>{this.ServerError=!0,console.log(t)})}}},p=u,h=(a("294c"),a("0c7c")),m=Object(h["a"])(p,c,l,!1,null,null,null);e["default"]=m.exports},"294c":function(t,e,a){"use strict";a("7708")},7708:function(t,e,a){}}]);
//# sourceMappingURL=chunk-f920f522.3f377ab8.js.map