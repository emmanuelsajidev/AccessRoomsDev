(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-077b040e"],{"1bad":function(e,t,a){},"45ae":function(e,t,a){"use strict";a("1bad")},caf2:function(e,t,a){"use strict";a.r(t);var r=a("8336"),s=a("0e8f"),i=a("132d"),o=a("a722"),n=a("2db4"),c=function(){var e=this,t=e._self._c;return t("div",[t("PageLoader",{attrs:{storage:e.appLoading}}),e.ServerError?t("ServerError"):e._e(),t(n["a"],{attrs:{color:"#ff6200",right:"",timeout:3e3},model:{value:e.snackbar,callback:function(t){e.snackbar=t},expression:"snackbar"}},[t(o["a"],{attrs:{wrap:""}},[t(s["a"],{staticClass:"align-self-center",attrs:{"text-left":""}},[e._v(e._s(e.msg))]),t(s["a"],{attrs:{"text-right":""}},[t(r["a"],{attrs:{small:"",ripple:!1,text:""},on:{click:function(t){e.snackbar=!1}}},[t(i["a"],{staticStyle:{color:"white"}},[e._v("mdi-close")])],1)],1)],1)],1),t(o["a"],{staticStyle:{"background-color":"#f9f9f9"},attrs:{wrap:"","justify-center":""}},[t(s["a"],{attrs:{xs11:"","pt-4":""}},[t("span",{staticStyle:{"font-family":"LexendRegular","font-size":"25px",color:"black","letter-spacing":"1px",cursor:"pointer"}},[e._v("Our Services")])]),t(s["a"],{attrs:{xs11:"","pt-6":""}},[t("span",{domProps:{innerHTML:e._s(e.list.content)}})])],1)],1)},l=[],d=a("cee4"),p={data(){return{reg:!1,userType:"",value:"",phoneNumber:"",countryCode:"",list:{},name:"",content:{},email:"",password:"",confirmPassword:"",whatsappNumber:"",appLoading:!1,ServerError:!1,snackbar:!1,timeout:5e3,msg:null,Rules:[e=>!!e||"Required"],rules:{required:e=>!!e||"Required.",min:e=>e.length>=8||"Min 8 characters",pincode:e=>6==e.length||"Please provide valid pincode",otp:e=>4==e.length||"Please provide valid otp",check:e=>e===this.password||"Passwords do not match"},emailRules:[e=>!!e||"Email is Required",e=>/.+@.+\..+/.test(e)||"E-mail must be valid"]}},mounted(){this.getView()},methods:{getView(){this.appLoading=!0,Object(d["a"])({method:"GET",url:"/policy/view",headers:{token:localStorage.getItem("token")},params:{name:"Our Services"}}).then(e=>{1==e.data.status?(this.appLoading=!1,this.list=e.data.data):(this.msg=e.data.msg,this.showSnackBar=!0)}).catch(e=>{this.ServerError=!0,console.log(e)})}}},u=p,h=(a("45ae"),a("2877")),m=Object(h["a"])(u,c,l,!1,null,null,null);t["default"]=m.exports}}]);
//# sourceMappingURL=chunk-077b040e.36749a39.js.map