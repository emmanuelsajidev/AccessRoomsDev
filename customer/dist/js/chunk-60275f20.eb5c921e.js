(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-60275f20"],{"091f":function(t,e,a){},"19a8":function(t,e,a){"use strict";a.r(e);var s=a("0e8f"),i=a("a722"),o=function(){var t=this,e=t._self._c;return e("div",[e(i["a"],{attrs:{wrap:"","justify-center":""}},[e(s["a"],{attrs:{xs12:"","align-self-center":"","text-center":""}},[e("span",{staticStyle:{"font-family":"LexendFont","font-size":"30px","font-weight":"400"},style:{"font-size":"xs"==t.$vuetify.breakpoint.name||"sm"==t.$vuetify.breakpoint.name?"20px":"md"==t.$vuetify.breakpoint.name||"lg"==t.$vuetify.breakpoint.name?"25px":"30px"}},[t._v("Gallery")])]),t.roomImage?e(s["a"],{attrs:{xs12:"",sm11:"",md10:"",lg8:"","align-self-center":""}},[t.roomImage.length>0?e(i["a"],{attrs:{wrap:"","justify-center":"","pt-2":""}},[e(s["a"],{attrs:{xs8:"",sm12:""}},[e("viewer",{key:t.roomImage.length,attrs:{images:t.roomImage}},[e(i["a"],{attrs:{wrap:""}},t._l(t.roomImage,(function(a,i){return e(s["a"],{key:i,staticClass:"pa-1",attrs:{xs12:"",sm4:"",md3:""}},[e("img",{staticStyle:{"object-fit":"cover"},attrs:{src:t.mediaUURL+a,height:"200px",width:"200px"}})])})),1)],1)],1)],1):t._e()],1):t._e(),t.gallery?e(s["a"],{attrs:{xs12:"",sm11:"",md10:"",lg8:"","align-self-center":"","pt-4":""}},[t.gallery.length>0?e(i["a"],{attrs:{wrap:"","justify-center":"","pt-2":""}},[e(s["a"],{attrs:{xs9:"",sm12:""}},[e("viewer",{key:t.gallery.length,attrs:{images:t.gallery}},[e(i["a"],{attrs:{wrap:""}},t._l(t.gallery,(function(a,i){return e(s["a"],{key:i,staticClass:"pa-1",attrs:{xs12:"",sm4:"",md3:""}},[e("img",{staticStyle:{"object-fit":"cover"},attrs:{src:t.mediaUURL+a,height:"200px",width:"200px"}})])})),1)],1)],1)],1):t._e()],1):t._e()],1)],1)},r=[],g=a("cee4"),l=(a("0808"),a("c71c")),n=a("2b0e");n["default"].use(l["a"]);var d={data(){return{appLoading:!1,ServerError:!1,showSnackBar:!1,timeout:5e3,msg:null,gallery:[],roomImage:[],interiorImage:"",fullImage:"",upperImage:"",deleteId:"",deleteialog:!1,deleteId2:"",deleteialog2:!1,deleteId3:"",deleteialog3:!1}},beforeMount(){this.getData()},methods:{show(){this.$viewerApi({images:this.images})},getData(){this.appLoading=!0,Object(g["a"])({method:"POST",url:"/houseboat/gallery",headers:{token:localStorage.getItem("token")},data:{houseboatId:this.$route.query.id}}).then(t=>{this.appLoading=!1,t.data.status?(this.gallery=t.data.data.propertyImages,this.roomImage=t.data.data.roomImage,this.interiorImage=t.data.data.interiorImage,this.fullImage=t.data.data.fullImage,this.upperImage=t.data.data.upperImage):(this.msg=t.data.msg,this.showSnackBar=!0)}).catch(t=>{this.appLoading=!1,console.log(t),this.ServerError=!0})},deleteImg(t){this.appLoading=!0,Object(g["a"])({url:"/houseboat/removeimagesingle",method:"POST",headers:{token:localStorage.getItem("token")},data:{position:t,houseboatId:this.$route.query.id}}).then(t=>{this.appLoading=!1,t.data.status?(this.msg=t.data.msg,this.snackbar=!0,this.deleteId="",this.deleteialog=!1,this.getData()):(this.msg=t.data.msg,this.snackbar=!0)}).catch(t=>{console.log(t)})},deleteImg2(t){this.appLoading=!0,Object(g["a"])({url:"/houseboat/remove/roomimagesingle",method:"POST",headers:{token:localStorage.getItem("token")},data:{position:t,houseboatId:this.$route.query.id}}).then(t=>{this.appLoading=!1,t.data.status?(this.msg=t.data.msg,this.snackbar=!0,this.deleteId2="",this.deleteialog2=!1,this.getData()):(this.msg=t.data.msg,this.snackbar=!0)}).catch(t=>{console.log(t)})},deleteImg3(t){this.appLoading=!0,Object(g["a"])({url:"/houseboat/remove/singleimage",method:"POST",headers:{token:localStorage.getItem("token")},data:{type:t,houseboatId:this.$route.query.id}}).then(t=>{this.appLoading=!1,t.data.status?(this.msg=t.data.msg,this.snackbar=!0,this.deleteId3="",this.deleteialog3=!1,this.getData()):(this.msg=t.data.msg,this.snackbar=!0)}).catch(t=>{console.log(t)})}}},h=d,m=(a("da74"),a("0c7c")),c=Object(m["a"])(h,o,r,!1,null,"3bee09d4",null);e["default"]=c.exports},da74:function(t,e,a){"use strict";a("091f")}}]);
//# sourceMappingURL=chunk-60275f20.eb5c921e.js.map