(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-145a85a8"],{"0990":function(t,e,a){"use strict";a.r(e);var s=a("8336"),i=a("b0af"),o=a("ce7e"),r=a("0e8f"),n=a("4bd4"),l=a("132d"),u=a("adda"),c=a("a722"),d=(a("2c64"),a("ba87")),p=a("9d26"),h=a("c37a"),m=a("7e2b"),g=a("a9ad"),f=a("4e82"),v=a("5311"),y=a("7560"),b=a("fe09"),x=a("80d2"),A=a("58df"),w=a("d9f7");const k=Object(A["a"])(m["a"],g["a"],v["a"],Object(f["a"])("radioGroup"),y["a"]);var S=k.extend().extend({name:"v-radio",inheritAttrs:!1,props:{disabled:{type:Boolean,default:null},id:String,label:String,name:String,offIcon:{type:String,default:"$radioOff"},onIcon:{type:String,default:"$radioOn"},readonly:{type:Boolean,default:null},value:{default:null}},data:()=>({isFocused:!1}),computed:{classes(){return{"v-radio--is-disabled":this.isDisabled,"v-radio--is-focused":this.isFocused,...this.themeClasses,...this.groupClasses}},computedColor(){if(!this.isDisabled)return b["a"].options.computed.computedColor.call(this)},computedIcon(){return this.isActive?this.onIcon:this.offIcon},computedId(){return h["a"].options.computed.computedId.call(this)},hasLabel:h["a"].options.computed.hasLabel,hasState(){return(this.radioGroup||{}).hasState},isDisabled(){var t;return null!==(t=this.disabled)&&void 0!==t?t:!!this.radioGroup&&this.radioGroup.isDisabled},isReadonly(){var t;return null!==(t=this.readonly)&&void 0!==t?t:!!this.radioGroup&&this.radioGroup.isReadonly},computedName(){return this.name||!this.radioGroup?this.name:this.radioGroup.name||"radio-"+this.radioGroup._uid},rippleState(){return b["a"].options.computed.rippleState.call(this)},validationState(){return(this.radioGroup||{}).validationState||this.computedColor}},methods:{genInput(t){return b["a"].options.methods.genInput.call(this,"radio",t)},genLabel(){return this.hasLabel?this.$createElement(d["a"],{on:{click:b["b"]},attrs:{for:this.computedId},props:{color:this.validationState,focused:this.hasState}},Object(x["o"])(this,"label")||this.label):null},genRadio(){const{title:t,...e}=this.attrs$;return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.$createElement(p["a"],this.setTextColor(this.validationState,{props:{dense:this.radioGroup&&this.radioGroup.dense}}),this.computedIcon),this.genInput({name:this.computedName,value:this.value,...e}),this.genRipple(this.setTextColor(this.rippleState))])},onFocus(t){this.isFocused=!0,this.$emit("focus",t)},onBlur(t){this.isFocused=!1,this.$emit("blur",t)},onChange(){this.isDisabled||this.isReadonly||this.isActive||this.toggle()},onKeydown:()=>{}},render(t){const e={staticClass:"v-radio",class:this.classes,on:Object(w["b"])({click:this.onChange},this.listeners$),attrs:{title:this.attrs$.title}};return t("div",e,[this.genRadio(),this.genLabel()])}}),C=(a("ec29"),a("3d86"),a("604c"));const R=Object(A["a"])(C["a"],h["a"]);var N=R.extend({name:"v-radio-group",provide(){return{radioGroup:this}},props:{column:{type:Boolean,default:!0},height:{type:[Number,String],default:"auto"},name:String,row:Boolean,value:null},computed:{classes(){return{...h["a"].options.computed.classes.call(this),"v-input--selection-controls v-input--radio-group":!0,"v-input--radio-group--column":this.column&&!this.row,"v-input--radio-group--row":this.row}}},methods:{genDefaultSlot(){return this.$createElement("div",{staticClass:"v-input--radio-group__input",attrs:{id:this.id,role:"radiogroup","aria-labelledby":this.computedId}},h["a"].options.methods.genDefaultSlot.call(this))},genInputSlot(){const t=h["a"].options.methods.genInputSlot.call(this);return delete t.data.on.click,t},genLabel(){const t=h["a"].options.methods.genLabel.call(this);return t?(t.data.attrs.id=this.computedId,delete t.data.attrs.for,t.tag="legend",t):null},onClick:C["a"].options.methods.onClick},render(t){const e=h["a"].options.render.call(this,t);return this._b(e.data,"div",this.attrs$),e}}),O=a("2db4"),G=a("8654"),B=function(){var t=this,e=t._self._c;return e("div",[e("PageLoader",{attrs:{storage:t.appLoading}}),t.ServerError?e("ServerError"):t._e(),e(O["a"],{attrs:{color:"#ff6200",right:"",top:"",timeout:3e3},model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[e(c["a"],{attrs:{wrap:""}},[e(r["a"],{staticClass:"align-self-center",attrs:{"text-center":""}},[t._v(t._s(t.msg))]),e(r["a"],{attrs:{"text-right":""}},[e(s["a"],{attrs:{small:"",ripple:!1,text:""},on:{click:function(e){t.snackbar=!1}}},[e(l["a"],{staticStyle:{color:"white"}},[t._v("mdi-close")])],1)],1)],1)],1),e("div",[e(u["a"],{attrs:{src:a("7753")}},[e(c["a"],{attrs:{wrap:"","justify-center":"","pt-10":""}},[e(r["a"],{attrs:{xs12:"",sm6:"",md4:"","text-center":"","pt-xs-0":"","pt-sm-10":"","pt-lg-15":"","pt-md-10":"","pt-xl-15":""}},[e(c["a"],{attrs:{wrap:"","justify-center":""}},[e(r["a"],{attrs:{xs12:""}},[e("span",{staticStyle:{"font-family":"LexendRegular"}},[t._v("Agent Registration Process")])]),e(r["a"],{attrs:{xs12:""}},[e("span",{staticStyle:{"font-family":"RobotoLight","font-size":"14px"}},[t._v("Complete all required fields with accurate information to ensure a smooth and personalized experience")])])],1)],1)],1)],1)],1),e("div",[e(c["a"],{staticClass:"bg",attrs:{wrap:"","justify-center":"","pb-10":""}},[e(r["a"],{staticClass:"changeStyle",attrs:{xs11:"",sm8:"",md5:""}},[e(n["a"],{ref:"profileForm",attrs:{"lazy-validation":""},model:{value:t.reg,callback:function(e){t.reg=e},expression:"reg"}},[e(i["a"],{attrs:{rounded:"xl"}},[e(c["a"],{attrs:{wrap:"","justify-center":"","px-10":"","py-10":""}},[e(r["a"],{attrs:{xs11:"",sm10:""}},[e(c["a"],{attrs:{wrap:"","justify-center":""}},[e(r["a"],{attrs:{xs12:"","pb-8":""}},[e(u["a"],{attrs:{contain:"",src:a("31f7")}})],1),e(r["a"],{attrs:{xs12:""}},[e(o["a"])],1),e(r["a"],{attrs:{xs12:"","pb-2":"","pt-5":""}},[e("span",{staticStyle:{"font-family":"LexendRegular"}},[t._v("Address ")])]),e(r["a"],{staticStyle:{"font-family":"LexendRegular","font-size":"13px"},attrs:{xs12:""}},[e("span",[t._v("Do you have a Company ? ")]),e(N,{attrs:{column:"","hide-details":!0},model:{value:t.iscompany,callback:function(e){t.iscompany=e},expression:"iscompany"}},[e(c["a"],{attrs:{justify:"center"}},[e(r["a"],{attrs:{xs12:"",sm6:"",cols:"12",sm:"6"}},[e(S,{attrs:{color:"#F17343",label:"Yes",value:"Yes"}})],1),e(r["a"],{attrs:{xs12:"",sm6:"",cols:"12",sm:"6"}},[e(S,{attrs:{color:"#F17343",label:"No",value:"No"}})],1)],1)],1)],1),e(r["a"],{staticStyle:{"font-family":"LexendRegular","font-size":"13px"},attrs:{xs12:"","pt-3":""}},[e("span",[t._v("Company name ")]),e(G["a"],{attrs:{dense:"",outlined:"",color:"orange",rules:t.Rules},model:{value:t.companyName,callback:function(e){t.companyName=e},expression:"companyName"}})],1),e(r["a"],{staticStyle:{"font-family":"LexendRegular","font-size":"13px"},attrs:{xs12:""}},[e("span",[t._v("Do you have a GST Number ? ")]),e(N,{attrs:{column:"","hide-details":!0},model:{value:t.isGst,callback:function(e){t.isGst=e},expression:"isGst"}},[e(c["a"],{attrs:{justify:"center"}},[e(r["a"],{attrs:{xs12:"",sm6:""}},[e(S,{attrs:{color:"#F17343",label:"Yes",value:"Yes"}})],1),e(r["a"],{attrs:{xs12:"",sm6:""}},[e(S,{attrs:{color:"#F17343",label:"No",value:"No"}})],1)],1)],1)],1),"Yes"===t.isGst?e(r["a"],{staticStyle:{"font-family":"LexendRegular","font-size":"13px"},attrs:{xs12:"","pt-3":""}},[e("span",[t._v("GST Number ")]),e(G["a"],{attrs:{color:"orange","hide-details":"auto",dense:"",outlined:""},model:{value:t.gstNo,callback:function(e){t.gstNo=e},expression:"gstNo"}})],1):t._e(),e(r["a"],{staticStyle:{"font-family":"LexendRegular","font-size":"13px"},attrs:{"pb-4":"","pt-4":"",xs12:""}},[e("span",[t._v("Building No ")]),e(G["a"],{attrs:{dense:"","hide-details":"auto",outlined:"",rules:t.Rules,color:"orange"},model:{value:t.buildingNo,callback:function(e){t.buildingNo=e},expression:"buildingNo"}})],1),e(r["a"],{staticStyle:{"font-family":"LexendRegular","font-size":"13px"},attrs:{xs12:""}},[e("span",[t._v("Locality ")]),e(G["a"],{attrs:{dense:"",outlined:"",color:"orange",rules:t.Rules},model:{value:t.locality,callback:function(e){t.locality=e},expression:"locality"}})],1),e(r["a"],{staticStyle:{"font-family":"LexendRegular","font-size":"13px"},attrs:{xs12:""}},[e("span",[t._v("District ")]),e(G["a"],{attrs:{dense:"",color:"orange",outlined:"",rules:t.Rules},model:{value:t.district,callback:function(e){t.district=e},expression:"district"}})],1),e(r["a"],{staticStyle:{"font-family":"LexendRegular","font-size":"13px"},attrs:{xs12:""}},[e("span",[t._v("State ")]),e(G["a"],{attrs:{color:"orange",dense:"",outlined:"",rules:t.Rules},model:{value:t.state,callback:function(e){t.state=e},expression:"state"}})],1),e(r["a"],{staticStyle:{"font-family":"LexendRegular","font-size":"13px"},attrs:{xs12:""}},[e("span",[t._v("Country ")]),e(G["a"],{attrs:{color:"orange",dense:"",outlined:"",rules:t.Rules},model:{value:t.country,callback:function(e){t.country=e},expression:"country"}})],1),e(r["a"],{staticStyle:{"font-family":"LexendRegular","font-size":"13px"},attrs:{xs12:""}},[e("span",[t._v("Pin code ")]),e(G["a"],{attrs:{color:"orange",type:"number",dense:"",outlined:"",rules:t.Rules},model:{value:t.pincode,callback:function(e){t.pincode=e},expression:"pincode"}})],1)],1)],1)],1)],1),e(c["a"],{attrs:{wrap:"","justify-end":"","pt-10":""}},[e(r["a"],{attrs:{xs12:"",sm6:"",md3:"","text-right":""}},[e(s["a"],{staticStyle:{background:"linear-gradient(",color:"white"},attrs:{block:"",disabled:!t.reg,rounded:"",color:"#F17343"},on:{click:function(e){return t.setpTwo()}}},[e("span",{staticStyle:{"font-family":"LexendRegular","text-transform":"none"}},[t._v("Next")])])],1)],1)],1)],1)],1)],1)],1)},D=[],j=(a("14d9"),a("cee4")),z=a("c0d6"),E={data(){return{appLoading:!1,ServerError:!1,snackbar:!1,timeout:5e3,msg:null,reg:!1,favorites:[],states:["Travel Agent","Tours & Travels","Tour Guide"],value:"",phone:"",markers:[],places:[],currentPlace:null,cordinates:null,lat:"",lon:"",currentLocation:{lat:0,lng:0},agent:{lat:10.535387441362912,lon:76.21544288981148},isGst:null,iscompany:"",companyName:"",gstNo:"",buildingNo:"",locality:"",district:"",state:"",country:"",pincode:"",Rules:[t=>!!t||"Required"]}},computed:{appUser(){return this.$store.state.userData}},created(){navigator.geolocation&&navigator.geolocation.getCurrentPosition(this.handlePosition),this.markers=[{position:{lat:0,lng:0}},{position:{lat:0,lng:0}}]},beforeMount(){this.pincode=this.appUser.pincode,this.locality=this.appUser.locality,this.companyName=this.appUser.companyName,this.gstNo=this.appUser.gstNo,this.buildingNo=this.appUser.buildingNo,this.district=this.appUser.district,this.state=this.appUser.state,this.country=this.appUser.country,this.isGst=this.appUser.isGst,this.iscompany=this.appUser.iscompany},methods:{handlePosition(t){const e=t.coords.latitude,a=t.coords.longitude;this.currentLocation={lat:e,lng:a},this.markers.push({position:{lat:e,lng:a}})},setpTwo(){Object(j["a"])({method:"POST",url:"/agent/registration/level2",data:{isGst:this.isGst,iscompany:this.iscompany,companyName:this.companyName,gstNo:this.gstNo,buildingNo:this.buildingNo,locality:this.locality,district:this.district,state:this.state,country:this.country,pincode:this.pincode,long:this.currentLocation.lng,lat:this.currentLocation.lat},headers:{token:localStorage.getItem("token")}}).then(t=>{t.data.status?(this.msg="Successfully Registered",this.snackbar=!0,z["a"].commit("userData",t.data.data),z["a"].commit("level",t.data.data.level),this.$router.push("/StepThree")):(this.msg=t.data.msg,this.snackbar=!0)})}}},L=E,F=(a("6f1f"),a("2877")),I=Object(F["a"])(L,B,D,!1,null,null,null);e["default"]=I.exports},"2c64":function(t,e,a){},"31f7":function(t,e){t.exports="data:image/png;base64,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"},"3d86":function(t,e,a){},"4bd4":function(t,e,a){"use strict";a("14d9");var s=a("58df"),i=a("7e2b"),o=a("3206");e["a"]=Object(s["a"])(i["a"],Object(o["b"])("form")).extend({name:"v-form",provide(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:()=>({inputs:[],watchers:[],errorBag:{}}),watch:{errorBag:{handler(t){const e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput(t){const e=t=>t.$watch("hasError",e=>{this.$set(this.errorBag,t._uid,e)},{immediate:!0}),a={_uid:t._uid,valid:()=>{},shouldValidate:()=>{}};return this.lazyValidation?a.shouldValidate=t.$watch("shouldValidate",s=>{s&&(this.errorBag.hasOwnProperty(t._uid)||(a.valid=e(t)))}):a.valid=e(t),a},validate(){return 0===this.inputs.filter(t=>!t.validate(!0)).length},reset(){this.inputs.forEach(t=>t.reset()),this.resetErrorBag()},resetErrorBag(){this.lazyValidation&&setTimeout(()=>{this.errorBag={}},0)},resetValidation(){this.inputs.forEach(t=>t.resetValidation()),this.resetErrorBag()},register(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister(t){const e=this.inputs.find(e=>e._uid===t._uid);if(!e)return;const a=this.watchers.find(t=>t._uid===e._uid);a&&(a.valid(),a.shouldValidate()),this.watchers=this.watchers.filter(t=>t._uid!==e._uid),this.inputs=this.inputs.filter(t=>t._uid!==e._uid),this.$delete(this.errorBag,e._uid)}},render(t){return t("form",{staticClass:"v-form",attrs:{novalidate:!0,...this.attrs$},on:{submit:t=>this.$emit("submit",t)}},this.$slots.default)}})},"6f1f":function(t,e,a){"use strict";a("bc36")},7753:function(t,e,a){t.exports=a.p+"img/reg1.03eb6b79.png"},bc36:function(t,e,a){},ec29:function(t,e,a){},fe09:function(t,e,a){"use strict";a.d(e,"b",(function(){return n}));a("14d9");var s=a("c37a"),i=a("5311"),o=a("8547"),r=a("58df");function n(t){t.preventDefault()}e["a"]=Object(r["a"])(s["a"],i["a"],o["a"]).extend({name:"selectable",model:{prop:"inputValue",event:"change"},props:{id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data(){return{hasColor:this.inputValue,lazyValue:this.inputValue}},computed:{computedColor(){if(this.isActive)return this.color?this.color:this.isDark&&!this.appIsDark?"white":"primary"},isMultiple(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive(){const t=this.value,e=this.internalValue;return this.isMultiple?!!Array.isArray(e)&&e.some(e=>this.valueComparator(e,t)):void 0===this.trueValue||void 0===this.falseValue?t?this.valueComparator(t,e):Boolean(e):this.valueComparator(e,this.trueValue)},isDirty(){return this.isActive},rippleState(){return this.isDisabled||this.validationState?this.validationState:void 0}},watch:{inputValue(t){this.lazyValue=t,this.hasColor=t}},methods:{genLabel(){const t=s["a"].options.methods.genLabel.call(this);return t?(t.data.on={click:n},t):t},genInput(t,e){return this.$createElement("input",{attrs:Object.assign({"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.computedId,role:t,type:t},e),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown,click:n},ref:"input"})},onClick(t){this.onChange(),this.$emit("click",t)},onChange(){if(!this.isInteractive)return;const t=this.value;let e=this.internalValue;if(this.isMultiple){Array.isArray(e)||(e=[]);const a=e.length;e=e.filter(e=>!this.valueComparator(e,t)),e.length===a&&e.push(t)}else e=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(e,this.trueValue)?this.falseValue:this.trueValue:t?this.valueComparator(e,t)?null:t:!e;this.validate(!0,e),this.internalValue=e,this.hasColor=e},onFocus(t){this.isFocused=!0,this.$emit("focus",t)},onBlur(t){this.isFocused=!1,this.$emit("blur",t)},onKeydown(t){}}})}}]);
//# sourceMappingURL=chunk-145a85a8.c754288e.js.map