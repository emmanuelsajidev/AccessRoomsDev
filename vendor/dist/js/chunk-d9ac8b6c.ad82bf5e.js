(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d9ac8b6c"],{1611:function(t,e,a){"use strict";a.r(e);var i=a("8336"),s=a("b0af"),r=a("99d9"),n=a("169a"),o=a("ce7e"),l=a("0e8f"),c=a("132d"),h=a("adda"),d=a("a722"),u=a("8860"),p=a("da13"),g=a("5d23"),f=a("e449"),m=a("891e"),v=a("2db4"),b=a("2fa4"),x=a("8654"),k=(a("14d9"),function(){var t=this,e=t._self._c;return e("div",[e("vue-element-loading",{attrs:{active:t.appLoading,"is-full-screen":!0,"background-color":"#FFFFFF",color:"#002635",spinner:"bar-fade-scale"}}),t.ServerError?e("ServerError"):t._e(),e(v["a"],{attrs:{color:"#f54c0c",right:"",timeout:t.timeout},model:{value:t.showsnackbar,callback:function(e){t.showsnackbar=e},expression:"showsnackbar"}},[e(d["a"],{attrs:{wrap:"","justify-center":""}},[e(l["a"],{staticClass:"align-self-center",attrs:{"text-left":""}},[e("span",{staticStyle:{color:"white"}},[t._v(" "+t._s(t.msg)+" ")])]),e(l["a"],{attrs:{"text-right":""}},[e(i["a"],{attrs:{small:"",ripple:!1,text:""},on:{click:function(e){t.showsnackbar=!1}}},[e(c["a"],{staticStyle:{color:"white"}},[t._v("mdi-close")])],1)],1)],1)],1),e(d["a"],{attrs:{wrap:"","justify-center":"","pa-0":"","pa-sm-4":""}},[e(l["a"],{attrs:{xs12:""}},[e(d["a"],{attrs:{wrap:"","justify-center":"","py-2":""}},[e(l["a"],{attrs:{xs12:"",sm3:"","align-self-center":""}},[e("span",{staticClass:"title1",style:{"font-size":"xs"==t.$vuetify.breakpoint.name||"sm"==t.$vuetify.breakpoint.name?"20px":"md"==t.$vuetify.breakpoint.name||"lg"==t.$vuetify.breakpoint.name?"25px":"30px"}},[t._v("Shikara")])]),e(b["a"]),e(l["a"],{attrs:{xs12:"",sm3:"",lg2:"",xl1:"","align-self-center":"","px-1":""}},[e(x["a"],{staticClass:"rounded-0",attrs:{dense:"",placeholder:"Search",outlined:"","hide-details":"",clearable:""},model:{value:t.keyword1,callback:function(e){t.keyword1=e},expression:"keyword1"}})],1),e(l["a"],{attrs:{xs12:"",sm3:"",lg2:"",xl1:"","align-self-center":"","pt-2":"","pt-sm-0":""}},[e(i["a"],{staticClass:"gr1",attrs:{dense:"",block:""},on:{click:function(e){return t.$router.push("/AddShikara")}}},[e("span",{staticStyle:{color:"white"}},[t._v("Add New Shikara")])])],1)],1),e(d["a"],{attrs:{wrap:"","justify-space-around":"","pt-0":"","pt-sm-2":""}},[t.data?e(l["a"],{attrs:{xs12:""}},[t.data.length>0?e(s["a"],{staticClass:"pa-4 pa-sm-6",attrs:{tile:""}},[e(d["a"],{attrs:{wrap:"","py-0":"","py-sm-4":"","justify-start":""}},t._l(t.data,(function(a,r){return e(l["a"],{key:r,attrs:{xs12:"",sm6:"",md4:"",xl3:""}},[e(s["a"],{staticClass:"ma-1 ma-md-4 pa-4",staticStyle:{"border-radius":"10px"},attrs:{elevation:"0",color:"rgba(245, 245, 245, 1)"}},[e(d["a"],{attrs:{wrap:""}},[a.coverImage?e(l["a"],{staticStyle:{cursor:"pointer"},attrs:{xs4:""},on:{click:function(e){return t.$router.push("/ViewShikara?id="+a._id)}}},[a.coverImage?e(h["a"],{attrs:{height:"90px",src:t.mediaUURL+a.coverImage},scopedSlots:t._u([{key:"placeholder",fn:function(){return[e("ImageLoader")]},proxy:!0}],null,!0)}):e(h["a"],{staticStyle:{"border-radius":"10px"},attrs:{src:"https://demofree.sirv.com/nope-not-here.jpg",alt:"No image"}})],1):t._e(),e(l["a"],{staticStyle:{cursor:"pointer"},attrs:{xs7:"","pl-2":""},on:{click:function(e){return t.$router.push("/ViewShikara?id="+a._id)}}},[e(d["a"],{attrs:{wrap:""}},[e(l["a"],{attrs:{xs12:""}},[e("span",{staticStyle:{"font-family":"LexendFont","font-weight":"500","font-size":"18px"}},[t._v(t._s(a.shikaraName))])]),e(l["a"],{attrs:{xs12:"","pt-2":""}},[e("span",{staticStyle:{"font-weight":"400","font-size":"15px","font-family":"LexendFont"}},[t._v("No of Seats : "+t._s(a.totalSeats))])]),a.shikaraStatus?e(l["a"],{attrs:{xs12:"","pt-2":""}},["Blocked"==a.shikaraStatus?e("span",{staticStyle:{"font-weight":"600","font-size":"15px",color:"red","font-family":"LexendFont"}},[t._v("Blocked")]):t._e()]):t._e()],1)],1),"Blocked"!=a.shikaraStatus?e(l["a"],{attrs:{xs1:""}},[e(f["a"],{attrs:{bottom:"",left:""},scopedSlots:t._u([{key:"activator",fn:function({on:a,attrs:s}){return[e(i["a"],t._g(t._b({attrs:{icon:""}},"v-btn",s,!1),a),[e(c["a"],{attrs:{color:"black"}},[t._v("mdi-dots-vertical")])],1)]}}],null,!0)},[e(u["a"],[e(p["a"],[e(g["b"],{staticStyle:{cursor:"pointer"},on:{click:function(e){t.deleteialog=!0,t.deleteId=a._id}}},[e(c["a"],{staticClass:"pb-1",attrs:{color:"red"}},[t._v("mdi-trash-can-outline")]),t._v("Delete")],1)],1),e(p["a"],{on:{click:function(e){return t.$router.push("/ViewShikara?id="+a._id)}}},[e(g["b"],[e(c["a"],{staticClass:"pb-1",attrs:{color:"green"}},[t._v("mdi-view-dashboard-outline")]),t._v("View")],1)],1)],1)],1)],1):t._e()],1),e(d["a"],{attrs:{wrap:"","pt-4":"","pb-2":""}},[e(l["a"],{attrs:{xs12:"","pt-8":"","text-center":""}},[0==a.isComplete?e(i["a"],{staticStyle:{"border-radius":"10px"},attrs:{dense:"",block:"",disabled:"Blocked"===a.shikaraStatus,color:"#f17343"},on:{click:function(e){return t.$router.push("/AddDetail?name="+a.shikaraName+"&&id="+a._id)}}},[e("span",{staticStyle:{color:"white","font-weight":"500","font-size":"14px","font-family":"LexendFont"}},[t._v("Add details")])]):t._e(),1==a.isComplete?e(i["a"],{staticStyle:{"border-radius":"10px"},attrs:{dense:"",block:"",disabled:"Blocked"===a.shikaraStatus,color:"#f17343"},on:{click:function(e){return t.$router.push("/tripEditShikara?id="+a._id)}}},[e("span",{staticStyle:{color:"white","font-weight":"500","font-size":"14px","font-family":"LexendFont"}},[t._v("View details")])]):t._e()],1),e(l["a"],{attrs:{xs12:"","pt-2":"","text-center":""}},[e(i["a"],{staticStyle:{"border-radius":"10px"},attrs:{dense:"",block:"",disabled:"Blocked"===a.shikaraStatus||0==a.hasPackage,color:"#f17343"},on:{click:function(e){return t.$router.push("/ShikaraReservation?name="+a.shikaraName+"&&id="+a._id)}}},[e("span",{staticStyle:{color:"white","font-weight":"500","font-size":"14px","font-family":"LexendFont"}},[t._v("Add reservation")])])],1)],1)],1)],1)})),1)],1):e(s["a"],{staticClass:"pa-4 pa-sm-6",attrs:{tile:""}},[e(d["a"],{attrs:{wrap:"","py-0":"","py-sm-4":"","justify-start":""}},[e(l["a"],{attrs:{xs12:"","pa-4":""}},[e("span",{staticStyle:{"font-family":"LexendFont","font-weight":"500","font-size":"18px"}},[t._v("No data found")])])],1)],1)],1):t._e()],1)],1)],1),t.data?e(d["a"],{attrs:{wrap:""}},[t.data.length>0?e(l["a"],{attrs:{xs12:"","pt-4":""}},[e(m["a"],{attrs:{small:"",color:"#ff6200",length:t.Pagelength,"total-visible":7},model:{value:t.page,callback:function(e){t.page=e},expression:"page"}})],1):t._e()],1):t._e(),e(n["a"],{attrs:{width:"400px"},model:{value:t.deleteialog,callback:function(e){t.deleteialog=e},expression:"deleteialog"}},[e(s["a"],{staticClass:"pa-2",attrs:{width:"400px"}},[e(d["a"],{attrs:{wrap:"","justify-center":""}},[e(l["a"],{attrs:{xs11:"","text-center":""}},[e("span",{staticClass:"dialogHead",staticStyle:{color:"#002635"}},[t._v("Delete")])]),e(l["a"],{attrs:{xs1:"","text-right":""}},[e(c["a"],{attrs:{color:"#002635"},on:{click:function(e){t.deleteialog=!1}}},[t._v("mdi-close-box")])],1),e(l["a"],{attrs:{xs8:"","text-center":"","py-4":""}},[e(o["a"])],1)],1),e(r["b"],{staticClass:"px-4 pb-0 dialogText text-center"},[t._v("Are you sure you want to delete this shikara? ")]),e(r["a"],{staticClass:"pt-3"},[e(b["a"]),e(i["a"],{staticClass:"dialogText",attrs:{color:"#002635",dark:""},on:{click:function(e){return t.deleteBoat(t.deleteId)}}},[t._v("OK")])],1)],1)],1)],1)}),y=[],w=a("cee4"),_={data(){return{showsnackbar:!1,timeout:2e3,ServerError:!1,appLoading:!1,data:[],msg:null,page:1,limit:20,deleteialog:!1,deleteId:"",editialog:!1,editItem:{},keyword1:""}},mounted(){this.getData()},watch:{page(){this.getData()},keyword1(){this.getData()}},methods:{getData(){this.appLoading=!0,Object(w["a"])({url:"/shikara/getlist",method:"GET",headers:{token:localStorage.getItem("token")},params:{page:this.page,count:this.limit,keyword:this.keyword1}}).then(t=>{this.appLoading=!1,this.data=t.data.data,this.Pagelength=Math.ceil(t.data.count/this.limit)}).catch(t=>{console.log(t)})},deleteBoat(t){Object(w["a"])({url:"/shikara/delete",method:"get",headers:{token:localStorage.getItem("token")},params:{id:t}}).then(t=>{1==t.data.status?(this.msg=t.data.msg,this.showsnackbar=!0,this.deleteialog=!1,this.deleteId="",this.appLoading=!1,this.getData()):(this.msg=t.data.msg,this.showsnackbar=!0)}).catch(t=>{console.log(t)})}}},S=_,$=(a("9a29"),a("0c7c")),L=Object($["a"])(S,k,y,!1,null,"e8cf6f36",null);e["default"]=L.exports},"17b3":function(t,e,a){},"891e":function(t,e,a){"use strict";a("14d9"),a("17b3");var i=a("9d26"),s=a("dc22"),r=a("a9ad"),n=a("de2c"),o=a("7560"),l=a("58df");e["a"]=Object(l["a"])(r["a"],Object(n["a"])({onVisible:["init"]}),o["a"]).extend({name:"v-pagination",directives:{Resize:s["a"]},props:{circle:Boolean,disabled:Boolean,navigationColor:String,navigationTextColor:String,length:{type:Number,default:0,validator:t=>t%1===0},nextIcon:{type:String,default:"$next"},prevIcon:{type:String,default:"$prev"},totalVisible:[Number,String],value:{type:Number,default:0},pageAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.page"},currentPageAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.currentPage"},previousAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.previous"},nextAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.next"},wrapperAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.wrapper"}},data(){return{maxButtons:0,selected:null}},computed:{classes(){return{"v-pagination":!0,"v-pagination--circle":this.circle,"v-pagination--disabled":this.disabled,...this.themeClasses}},items(){const t=parseInt(this.totalVisible,10);if(0===t||isNaN(this.length)||this.length>Number.MAX_SAFE_INTEGER)return[];const e=Math.min(Math.max(0,t)||this.length,Math.max(0,this.maxButtons)||this.length,this.length);if(this.length<=e)return this.range(1,this.length);const a=e%2===0?1:0,i=Math.floor(e/2),s=this.length-i+1+a;if(this.value>i&&this.value<s){const t=1,e=this.length,s=this.value-i+2,r=this.value+i-2-a,n=s-1===t+1?2:"...",o=r+1===e-1?r+1:"...";return[1,n,...this.range(s,r),o,this.length]}if(this.value===i){const t=this.value+i-1-a;return[...this.range(1,t),"...",this.length]}if(this.value===s){const t=this.value-i+1;return[1,"...",...this.range(t,this.length)]}return[...this.range(1,i),"...",...this.range(s,this.length)]}},watch:{value(){this.init()}},beforeMount(){this.init()},methods:{init(){this.selected=null,this.onResize(),this.$nextTick(this.onResize),setTimeout(()=>this.selected=this.value,100)},onResize(){const t=this.$el&&this.$el.parentElement?this.$el.parentElement.clientWidth:window.innerWidth;this.maxButtons=Math.floor((t-96)/42)},next(t){t.preventDefault(),this.$emit("input",this.value+1),this.$emit("next")},previous(t){t.preventDefault(),this.$emit("input",this.value-1),this.$emit("previous")},range(t,e){const a=[];t=t>0?t:1;for(let i=t;i<=e;i++)a.push(i);return a},genIcon(t,e,a,s,r){return t("li",[t("button",this.setBackgroundColor(this.navigationColor,{staticClass:"v-pagination__navigation",class:{"v-pagination__navigation--disabled":a},attrs:{disabled:a,type:"button","aria-label":r},on:a?{}:{click:s}}),[t(i["a"],{props:{color:this.navigationTextColor}},[e])])])},genItem(t,e){const a=e===this.value&&(this.color||"primary"),i=e===this.value,s=i?this.currentPageAriaLabel:this.pageAriaLabel;return t("button",this.setBackgroundColor(a,{staticClass:"v-pagination__item",class:{"v-pagination__item--active":e===this.value},attrs:{type:"button","aria-current":i,"aria-label":this.$vuetify.lang.t(s,e)},on:{click:()=>this.$emit("input",e)}}),[e.toString()])},genItems(t){return this.items.map((e,a)=>t("li",{key:a},[isNaN(Number(e))?t("span",{class:"v-pagination__more"},[e.toString()]):this.genItem(t,e)]))},genList(t,e){return t("ul",{directives:[{modifiers:{quiet:!0},name:"resize",value:this.onResize}],class:this.classes},e)}},render(t){const e=[this.genIcon(t,this.$vuetify.rtl?this.nextIcon:this.prevIcon,this.value<=1,this.previous,this.$vuetify.lang.t(this.previousAriaLabel)),this.genItems(t),this.genIcon(t,this.$vuetify.rtl?this.prevIcon:this.nextIcon,this.value>=this.length,this.next,this.$vuetify.lang.t(this.nextAriaLabel))];return t("nav",{attrs:{role:"navigation","aria-label":this.$vuetify.lang.t(this.wrapperAriaLabel)}},[this.genList(t,e)])}})},"9a29":function(t,e,a){"use strict";a("d242")},d242:function(t,e,a){}}]);
//# sourceMappingURL=chunk-d9ac8b6c.ad82bf5e.js.map