(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-210ffcef"],{"2db4":function(t,e,s){"use strict";s("ca71");var a=s("8dd9"),i=s("a9ad"),n=s("7560"),o=s("f2e7"),r=s("fe6c"),c=s("58df"),l=s("80d2"),h=s("d9bd");e["a"]=Object(c["a"])(a["a"],i["a"],o["a"],Object(r["b"])(["absolute","bottom","left","right","top"])).extend({name:"v-snackbar",props:{app:Boolean,centered:Boolean,contentClass:{type:String,default:""},multiLine:Boolean,text:Boolean,timeout:{type:[Number,String],default:5e3},transition:{type:[Boolean,String],default:"v-snack-transition",validator:t=>"string"===typeof t||!1===t},vertical:Boolean},data:()=>({activeTimeout:-1}),computed:{classes(){return{"v-snack--absolute":this.absolute,"v-snack--active":this.isActive,"v-snack--bottom":this.bottom||!this.top,"v-snack--centered":this.centered,"v-snack--has-background":this.hasBackground,"v-snack--left":this.left,"v-snack--multi-line":this.multiLine&&!this.vertical,"v-snack--right":this.right,"v-snack--text":this.text,"v-snack--top":this.top,"v-snack--vertical":this.vertical}},hasBackground(){return!this.text&&!this.outlined},isDark(){return this.hasBackground?!this.light:n["a"].options.computed.isDark.call(this)},styles(){if(this.absolute||!this.app)return{};const{bar:t,bottom:e,footer:s,insetFooter:a,left:i,right:n,top:o}=this.$vuetify.application;return{paddingBottom:Object(l["g"])(e+s+a),paddingLeft:Object(l["g"])(i),paddingRight:Object(l["g"])(n),paddingTop:Object(l["g"])(t+o)}}},watch:{isActive:"setTimeout",timeout:"setTimeout"},mounted(){this.isActive&&this.setTimeout()},created(){this.$attrs.hasOwnProperty("auto-height")&&Object(h["e"])("auto-height",this),0==this.timeout&&Object(h["d"])('timeout="0"',"-1",this)},methods:{genActions(){return this.$createElement("div",{staticClass:"v-snack__action "},[Object(l["o"])(this,"action",{attrs:{class:"v-snack__btn"}})])},genContent(){return this.$createElement("div",{staticClass:"v-snack__content",class:{[this.contentClass]:!0},attrs:{role:"status","aria-live":"polite"}},[Object(l["o"])(this)])},genWrapper(){const t=this.hasBackground?this.setBackgroundColor:this.setTextColor,e=t(this.color,{staticClass:"v-snack__wrapper",class:a["a"].options.computed.classes.call(this),style:a["a"].options.computed.styles.call(this),directives:[{name:"show",value:this.isActive}],on:{pointerenter:()=>window.clearTimeout(this.activeTimeout),pointerleave:this.setTimeout}});return this.$createElement("div",e,[this.genContent(),this.genActions()])},genTransition(){return this.$createElement("transition",{props:{name:this.transition}},[this.genWrapper()])},setTimeout(){window.clearTimeout(this.activeTimeout);const t=Number(this.timeout);this.isActive&&![0,-1].includes(t)&&(this.activeTimeout=window.setTimeout(()=>{this.isActive=!1},t))}},render(t){return t("div",{staticClass:"v-snack",class:this.classes,style:this.styles},[!1!==this.transition?this.genTransition():this.genWrapper()])}})},"410b":function(t,e,s){"use strict";s("a49e")},4885:function(t,e,s){"use strict";s.r(e);var a=s("8336"),i=s("0e8f"),n=s("132d"),o=s("a722"),r=s("2db4"),c=function(){var t=this,e=t._self._c;return e("div",[e("PageLoader",{attrs:{storage:t.appLoading}}),t.ServerError?e("ServerError"):t._e(),e(r["a"],{attrs:{color:"#ff6200",right:"",timeout:3e3},model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[e(o["a"],{attrs:{wrap:""}},[e(i["a"],{staticClass:"align-self-center",attrs:{"text-left":""}},[t._v(t._s(t.msg))]),e(i["a"],{attrs:{"text-right":""}},[e(a["a"],{attrs:{small:"",ripple:!1,text:""},on:{click:function(e){t.snackbar=!1}}},[e(n["a"],{staticStyle:{color:"white"}},[t._v("mdi-close")])],1)],1)],1)],1),e(o["a"],{staticStyle:{"background-color":"#f9f9f9"},attrs:{wrap:"","justify-center":""}},[e(i["a"],{attrs:{xs11:"","pt-4":""}},[e("span",{staticStyle:{"font-family":"LexendRegular","font-size":"25px",color:"black","letter-spacing":"1px",cursor:"pointer"}},[t._v("Our Services")])]),e(i["a"],{attrs:{xs11:"","pt-6":""}},[e("span",{domProps:{innerHTML:t._s(t.list.content)}})])],1)],1)},l=[],h=s("cee4"),u={data(){return{reg:!1,userType:"",value:"",phoneNumber:"",countryCode:"",list:{},name:"",content:{},email:"",password:"",confirmPassword:"",whatsappNumber:"",appLoading:!1,ServerError:!1,snackbar:!1,timeout:5e3,msg:null,Rules:[t=>!!t||"Required"],rules:{required:t=>!!t||"Required.",min:t=>t.length>=8||"Min 8 characters",pincode:t=>6==t.length||"Please provide valid pincode",otp:t=>4==t.length||"Please provide valid otp",check:t=>t===this.password||"Passwords do not match"},emailRules:[t=>!!t||"Email is Required",t=>/.+@.+\..+/.test(t)||"E-mail must be valid"]}},mounted(){this.getView()},methods:{getView(){this.appLoading=!0,Object(h["a"])({method:"GET",url:"/policy/view",headers:{token:localStorage.getItem("token")},params:{name:"Our Services"}}).then(t=>{1==t.data.status?(this.appLoading=!1,this.list=t.data.data):(this.msg=t.data.msg,this.showSnackBar=!0)}).catch(t=>{this.ServerError=!0,console.log(t)})}}},d=u,p=(s("410b"),s("0c7c")),m=Object(p["a"])(d,c,l,!1,null,null,null);e["default"]=m.exports},a49e:function(t,e,s){},ca71:function(t,e,s){}}]);
//# sourceMappingURL=chunk-210ffcef.adcb47e0.js.map