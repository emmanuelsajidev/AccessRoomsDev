(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-47dd47e3"],{"357f":function(t,e,s){"use strict";s("8a0e")},"8a0e":function(t,e,s){},"92f3":function(t,e,s){"use strict";s.r(e);var i=s("8336"),n=s("b0af"),a=s("2e4b"),o=s("0e8f"),r=s("132d"),l=s("a722"),c=s("e449"),h=s("2db4"),d=s("2fa4"),u=s("8654"),f=function(){var t=this,e=t._self._c;return e("div",[e("vue-element-loading",{attrs:{active:t.appLoading,"is-full-screen":!0,"background-color":"#FFFFFF",color:"#182444",spinner:"bar-fade-scale"}}),t.ServerError?e("ServerError"):t._e(),e(h["a"],{attrs:{color:"#ff6200",right:"",top:"",timeout:"2000"},model:{value:t.showSnackbar,callback:function(e){t.showSnackbar=e},expression:"showSnackbar"}},[e(l["a"],{attrs:{wrap:"","justify-center":""}},[e(o["a"],{staticClass:"align-self-center",attrs:{"text-left":""}},[e("span",{staticStyle:{color:"white"}},[t._v(" "+t._s(t.msg)+" ")])]),e(o["a"],{attrs:{"text-right":""}},[e(i["a"],{attrs:{small:"",ripple:!1,text:""},on:{click:function(e){t.showSnackbar=!1}}},[e(r["a"],{staticStyle:{color:"white"}},[t._v("mdi-close")])],1)],1)],1)],1),e(l["a"],{attrs:{wrap:"","justify-center":"","pa-4":""}},[e(o["a"],{attrs:{xs12:""}},[e(l["a"],{attrs:{wrap:"","justify-start":"","py-2":""}},[e(o["a"],{attrs:{xs12:"",sm6:"","align-self-center":""}},[e("span",{staticClass:"title1",style:{"font-size":"xs"==t.$vuetify.breakpoint.name||"sm"==t.$vuetify.breakpoint.name?"20px":"md"==t.$vuetify.breakpoint.name||"lg"==t.$vuetify.breakpoint.name?"25px":"30px"}},[t._v(t._s(t.$route.query.name))]),e("span",{staticClass:"pa-1 ml-2",staticStyle:{"border-radius":"5px","background-color":"white",color:"black","font-family":"LexendFont","font-weight":"500","font-size":"15px","text-transform":"uppercase"}},[t._v("DAY CRUISE")])])],1),e(l["a"],{attrs:{wrap:"","justify-space-around":"","pt-2":""}},[e(o["a"],{attrs:{xs12:""}},[e(n["a"],{staticClass:"pa-2 pa-sm-2 pa-md-8",attrs:{tile:"",elevation:"0"}},[e(l["a"],{attrs:{wrap:"","justify-start":""}},[e(o["a"],{attrs:{xs12:"",sm6:""}},[e(l["a"],{attrs:{wrap:"","justify-center":""}},[e(o["a"],{attrs:{xs10:"","text-left":"","pb-2":""}},[e("span",{staticStyle:{"font-family":"LexendFont","font-weight":"600","font-size":"20px"}},[t._v("OFF-SEASONAL RATE")])]),e(o["a"],{attrs:{xs12:"",sm10:"","text-left":""}},[e("span",{staticClass:"title2"},[t._v("Start date")]),e(c["a"],{ref:"menu",attrs:{"close-on-content-click":!1,"return-value":t.offseason.startDate,transition:"scale-transition","offset-y":"","min-width":"auto"},on:{"update:returnValue":function(e){return t.$set(t.offseason,"startDate",e)},"update:return-value":function(e){return t.$set(t.offseason,"startDate",e)}},scopedSlots:t._u([{key:"activator",fn:function({on:s,attrs:i}){return[e(u["a"],t._g(t._b({staticClass:"rounded-0",attrs:{outlined:"",readonly:"",dense:"","hide-details":"auto",clearable:""},model:{value:t.offseason.startDate,callback:function(e){t.$set(t.offseason,"startDate",e)},expression:"offseason.startDate"}},"v-text-field",i,!1),s))]}}]),model:{value:t.menu,callback:function(e){t.menu=e},expression:"menu"}},[e(a["a"],{attrs:{"no-title":"",min:t.nowDate,scrollable:""},on:{change:function(e){return t.$refs.menu.save(t.offseason.startDate)}},model:{value:t.offseason.startDate,callback:function(e){t.$set(t.offseason,"startDate",e)},expression:"offseason.startDate"}},[e(d["a"])],1)],1)],1),e(o["a"],{attrs:{xs12:"",sm10:"","pt-4":"","text-left":""}},[e("span",{staticClass:"title2"},[t._v("End date")]),e(c["a"],{ref:"menu2",attrs:{"close-on-content-click":!1,"return-value":t.offseason.endDate,transition:"scale-transition","offset-y":"","min-width":"auto"},on:{"update:returnValue":function(e){return t.$set(t.offseason,"endDate",e)},"update:return-value":function(e){return t.$set(t.offseason,"endDate",e)}},scopedSlots:t._u([{key:"activator",fn:function({on:s,attrs:i}){return[e(u["a"],t._g(t._b({staticClass:"rounded-0",attrs:{outlined:"",readonly:"",dense:"","hide-details":"auto",clearable:""},model:{value:t.offseason.endDate,callback:function(e){t.$set(t.offseason,"endDate",e)},expression:"offseason.endDate"}},"v-text-field",i,!1),s))]}}]),model:{value:t.menu2,callback:function(e){t.menu2=e},expression:"menu2"}},[e(a["a"],{attrs:{"no-title":"",min:t.nowDate,scrollable:""},on:{change:function(e){return t.$refs.menu2.save(t.offseason.endDate)}},model:{value:t.offseason.endDate,callback:function(e){t.$set(t.offseason,"endDate",e)},expression:"offseason.endDate"}},[e(d["a"])],1)],1)],1),e(o["a"],{attrs:{xs12:"",sm10:"","pt-4":"","text-left":""}},[e("span",{staticClass:"title2 pr-2"},[t._v("Customer rate (₹)")]),e("span",{staticStyle:{"font-family":"LexendFont","font-size":"15px","font-weight":"300"}},[t._v(" (Per head)")]),e(u["a"],{attrs:{dense:"",outlined:"",type:"number","hide-spin-buttons":"",rules:[t.rules.required],"hide-details":"auto"},model:{value:t.offseason.customerRate,callback:function(e){t.$set(t.offseason,"customerRate",e)},expression:"offseason.customerRate"}}),t.offseason.customerRate?e("span",{staticStyle:{"font-family":"LexendFont","font-size":"12px","font-weight":"500"}},[t._v("Net rate: ₹"+t._s(t.tenpercent1))]):t._e()],1),e(o["a"],{attrs:{xs12:"",sm10:"","pt-4":"","text-left":""}},[e("span",{staticClass:"title2 pr-2"},[t._v("Agent rate (₹)")]),e("span",{staticStyle:{"font-family":"LexendFont","font-size":"15px","font-weight":"300"}},[t._v(" (Per Head)")]),e(u["a"],{attrs:{dense:"",outlined:"",type:"number","hide-spin-buttons":"",rules:[t.rules.required],"hide-details":"auto"},model:{value:t.offseason.agentRate,callback:function(e){t.$set(t.offseason,"agentRate",e)},expression:"offseason.agentRate"}}),t.offseason.agentRate?e("span",{staticStyle:{"font-family":"LexendFont","font-size":"12px","font-weight":"500"}},[t._v("Net rate: ₹"+t._s(t.tenpercent3))]):t._e()],1)],1)],1),e(o["a"],{attrs:{xs12:"",sm6:""}},[e(l["a"],{attrs:{wrap:"","justify-center":""}},[e(o["a"],{attrs:{xs10:"","text-left":"","pb-2":""}},[e("span",{staticStyle:{"font-family":"LexendFont","font-weight":"600","font-size":"20px"}},[t._v("SEASONAL RATE")])]),e(o["a"],{attrs:{xs12:"",sm10:"","text-left":""}},[e("span",{staticClass:"title2"},[t._v("Start date")]),e(c["a"],{ref:"menu3",attrs:{"close-on-content-click":!1,"return-value":t.season.startDate,transition:"scale-transition","offset-y":"","min-width":"auto"},on:{"update:returnValue":function(e){return t.$set(t.season,"startDate",e)},"update:return-value":function(e){return t.$set(t.season,"startDate",e)}},scopedSlots:t._u([{key:"activator",fn:function({on:s,attrs:i}){return[e(u["a"],t._g(t._b({staticClass:"rounded-0",attrs:{outlined:"",readonly:"",dense:"","hide-details":"auto",clearable:""},model:{value:t.season.startDate,callback:function(e){t.$set(t.season,"startDate",e)},expression:"season.startDate"}},"v-text-field",i,!1),s))]}}]),model:{value:t.menu3,callback:function(e){t.menu3=e},expression:"menu3"}},[e(a["a"],{attrs:{"no-title":"",min:t.nowDate,scrollable:""},on:{change:function(e){return t.$refs.menu3.save(t.season.startDate)}},model:{value:t.season.startDate,callback:function(e){t.$set(t.season,"startDate",e)},expression:"season.startDate"}},[e(d["a"])],1)],1)],1),e(o["a"],{attrs:{xs12:"",sm10:"","pt-4":"","text-left":""}},[e("span",{staticClass:"title2"},[t._v("End date")]),e(c["a"],{ref:"menu4",attrs:{"close-on-content-click":!1,"return-value":t.season.endDate,transition:"scale-transition","offset-y":"","min-width":"auto"},on:{"update:returnValue":function(e){return t.$set(t.season,"endDate",e)},"update:return-value":function(e){return t.$set(t.season,"endDate",e)}},scopedSlots:t._u([{key:"activator",fn:function({on:s,attrs:i}){return[e(u["a"],t._g(t._b({staticClass:"rounded-0",attrs:{outlined:"",readonly:"",dense:"","hide-details":"auto",clearable:""},model:{value:t.season.endDate,callback:function(e){t.$set(t.season,"endDate",e)},expression:"season.endDate"}},"v-text-field",i,!1),s))]}}]),model:{value:t.menu4,callback:function(e){t.menu4=e},expression:"menu4"}},[e(a["a"],{attrs:{"no-title":"",scrollable:"",min:t.nowDate},on:{change:function(e){return t.$refs.menu4.save(t.season.endDate)}},model:{value:t.season.endDate,callback:function(e){t.$set(t.season,"endDate",e)},expression:"season.endDate"}},[e(d["a"])],1)],1)],1),e(o["a"],{attrs:{xs12:"",sm10:"","pt-4":"","text-left":""}},[e("span",{staticClass:"title2 pr-2"},[t._v("Customer Rate (₹)")]),e("span",{staticStyle:{"font-family":"LexendFont","font-size":"15px","font-weight":"300"}},[t._v(" (Per Head)")]),e(u["a"],{attrs:{dense:"",outlined:"",type:"number","hide-spin-buttons":"",rules:[t.rules.required],"hide-details":"auto"},model:{value:t.season.customerRate,callback:function(e){t.$set(t.season,"customerRate",e)},expression:"season.customerRate"}}),t.season.customerRate?e("span",{staticStyle:{"font-family":"LexendFont","font-size":"12px","font-weight":"500"}},[t._v("Net rate: ₹"+t._s(t.tenpercent11))]):t._e()],1),e(o["a"],{attrs:{xs12:"",sm10:"","pt-4":"","text-left":""}},[e("span",{staticClass:"title2 pr-2"},[t._v("Agent rate (₹)")]),e("span",{staticStyle:{"font-family":"LexendFont","font-size":"15px","font-weight":"300"}},[t._v(" (Per Head)")]),e(u["a"],{attrs:{dense:"",outlined:"",type:"number","hide-spin-buttons":"",rules:[t.rules.required],"hide-details":"auto"},model:{value:t.season.agentRate,callback:function(e){t.$set(t.season,"agentRate",e)},expression:"season.agentRate"}}),t.season.agentRate?e("span",{staticStyle:{"font-family":"LexendFont","font-size":"12px","font-weight":"500"}},[t._v("Net rate: ₹"+t._s(t.tenpercent33))]):t._e()],1)],1),e(l["a"],{attrs:{wrap:"","justify-center":"","pt-4":""}},[e(o["a"],{attrs:{xs12:"",sm7:"",xl7:"","align-self-center":"","text-left":""}},[e("span",{staticStyle:{"font-family":"LexendFont","font-weight":"600"},style:{"font-size":"xs"==t.$vuetify.breakpoint.name||"sm"==t.$vuetify.breakpoint.name||"md"==t.$vuetify.breakpoint.name||"lg"==t.$vuetify.breakpoint.name?"14px":"15px"}},[t._v("Mentioned rate Access Rooms * 10% commission included ")])]),e(o["a"],{attrs:{xs12:"",sm3:"",xl3:"","align-self-center":"","text-right":""}},[e(i["a"],{staticClass:"btnstly",staticStyle:{cursor:"pointer"},attrs:{block:""},on:{click:function(e){return t.add()}}},[e("span",{staticStyle:{"font-family":"LexendFont","text-transform":"none"}},[t._v("Next")])])],1)],1)],1)],1)],1)],1)],1)],1)],1)],1)},p=[],m=(s("14d9"),s("cee4")),v={data(){return{showSnackbar:!1,timeout:2e3,ServerError:!1,appLoading:!1,data:[],msg:null,page:1,limit:20,nowDate:(new Date).toISOString().slice(0,10),season:{packageType:"Seasonal",startDate:"",endDate:"",customerRate:"",agentRate:""},offseason:{packageType:"OffSeasonal",startDate:"",endDate:"",customerRate:"",agentRate:""},tenpercent1:0,tenpercent3:0,tenpercent11:0,tenpercent33:0,menu2:!1,menu3:!1,menu4:!1,menu:!1,rules:{required:t=>!!t||"Required.",counter:t=>t.length<=20||"Max 20 characters",email:t=>{const e=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return e.test(t)||"Invalid e-mail."}},pinRules:[t=>!!t||"PIN is required",t=>t&&6===t.length||"PIN must be 6 digits"]}},watch:{"offseason.customerRate":function(t){this.tenpercent1=(t*(100/110)).toFixed(2)},"offseason.agentRate":function(t){console.log("asdfghj"),this.tenpercent3=(t*(100/110)).toFixed(2),console.log("tenpercent3=",this.tenpercent3)},"season.customerRate":function(t){this.tenpercent11=(t*(100/110)).toFixed(2)},"season.agentRate":function(t){console.log("asdfghj"),this.tenpercent33=(t*(100/110)).toFixed(2),console.log("tenpercent3=",this.tenpercent3)}},methods:{validation(){return this.category?this.houseBoatName?this.totalRooms?this.expiryType?this.expiryDate?void this.addBoat():(this.msg="Please enter expiry date",void(this.showSnackbar=!0)):(this.msg="Please choose expiry type",void(this.showSnackbar=!0)):(this.msg="Please enter total rooms",void(this.showSnackbar=!0)):(this.msg="Please enter house boat name",void(this.showSnackbar=!0)):(this.msg="Please choose boat category",void(this.showSnackbar=!0))},add(){this.offseason.customerRateCommission=this.tenpercent1,this.offseason.agentRateCommission=this.tenpercent3,this.season.customerRateCommission=this.tenpercent11,this.season.agentRateCommission=this.tenpercent33,this.appLoading=!0,console.log("season=",this.season),console.log("offseason=",this.offseason);var t=[this.season,this.offseason];Object(m["a"])({method:"POST",url:"/houseboat/trip/package/add",data:{tripTypeId:this.$route.query.id,packageDetails:t},headers:{token:localStorage.getItem("token")}}).then(t=>{this.appLoading=!1,1==t.data.status?(this.msg=t.data.msg,this.showSnackbar=!0,this.$router.push("/Houseboats")):(this.msg=t.data.msg,this.showSnackbar=!0)})}}},g=v,x=(s("357f"),s("0c7c")),b=Object(x["a"])(g,f,p,!1,null,"445197a5",null);e["default"]=b.exports},e449:function(t,e,s){"use strict";s("14d9"),s("ee6f");var i=s("480e"),n=s("4ad4"),a=s("16b7"),o=s("b848"),r=s("21be"),l=s("fe6c"),c=s("75eb"),h=s("58df"),d=s("80d2");const u=Object(h["a"])(r["a"],Object(l["b"])(["top","right","bottom","left","absolute"]),n["a"],c["a"]);var f=u.extend().extend({name:"menuable",props:{allowOverflow:Boolean,light:Boolean,dark:Boolean,maxWidth:{type:[Number,String],default:"auto"},minWidth:[Number,String],nudgeBottom:{type:[Number,String],default:0},nudgeLeft:{type:[Number,String],default:0},nudgeRight:{type:[Number,String],default:0},nudgeTop:{type:[Number,String],default:0},nudgeWidth:{type:[Number,String],default:0},offsetOverflow:Boolean,positionX:{type:Number,default:null},positionY:{type:Number,default:null},zIndex:{type:[Number,String],default:null}},data:()=>({activatorNode:[],absoluteX:0,absoluteY:0,activatedBy:null,activatorFixed:!1,dimensions:{activator:{top:0,left:0,bottom:0,right:0,width:0,height:0,offsetTop:0,scrollHeight:0,offsetLeft:0},content:{top:0,left:0,bottom:0,right:0,width:0,height:0,offsetTop:0,scrollHeight:0}},relativeYOffset:0,hasJustFocused:!1,hasWindow:!1,inputActivator:!1,isContentActive:!1,pageWidth:0,pageYOffset:0,stackClass:"v-menu__content--active",stackMinZIndex:6}),computed:{computedLeft(){const t=this.dimensions.activator,e=this.dimensions.content,s=(!1!==this.attach?t.offsetLeft:t.left)||0,i=Math.max(t.width,e.width);let n=0;if(n+=s,(this.left||this.$vuetify.rtl&&!this.right)&&(n-=i-t.width),this.offsetX){const e=isNaN(Number(this.maxWidth))?t.width:Math.min(t.width,Number(this.maxWidth));n+=this.left?-e:t.width}return this.nudgeLeft&&(n-=parseInt(this.nudgeLeft)),this.nudgeRight&&(n+=parseInt(this.nudgeRight)),n},computedTop(){const t=this.dimensions.activator,e=this.dimensions.content;let s=0;return this.top&&(s+=t.height-e.height),!1!==this.attach?s+=t.offsetTop:s+=t.top+this.pageYOffset,this.offsetY&&(s+=this.top?-t.height:t.height),this.nudgeTop&&(s-=parseInt(this.nudgeTop)),this.nudgeBottom&&(s+=parseInt(this.nudgeBottom)),s},hasActivator(){return!!this.$slots.activator||!!this.$scopedSlots.activator||!!this.activator||!!this.inputActivator},absoluteYOffset(){return this.pageYOffset-this.relativeYOffset}},watch:{disabled(t){t&&this.callDeactivate()},isActive(t){this.disabled||(t?this.callActivate():this.callDeactivate())},positionX:"updateDimensions",positionY:"updateDimensions"},beforeMount(){this.hasWindow="undefined"!==typeof window,this.hasWindow&&window.addEventListener("resize",this.updateDimensions,!1)},beforeDestroy(){this.hasWindow&&window.removeEventListener("resize",this.updateDimensions,!1)},methods:{absolutePosition(){return{offsetTop:this.positionY||this.absoluteY,offsetLeft:this.positionX||this.absoluteX,scrollHeight:0,top:this.positionY||this.absoluteY,bottom:this.positionY||this.absoluteY,left:this.positionX||this.absoluteX,right:this.positionX||this.absoluteX,height:0,width:0}},activate(){},calcLeft(t){return Object(d["g"])(!1!==this.attach?this.computedLeft:this.calcXOverflow(this.computedLeft,t))},calcTop(){return Object(d["g"])(!1!==this.attach?this.computedTop:this.calcYOverflow(this.computedTop))},calcXOverflow(t,e){const s=t+e-this.pageWidth+12;return t=(!this.left||this.right)&&s>0?Math.max(t-s,0):Math.max(t,12),t+this.getOffsetLeft()},calcYOverflow(t){const e=this.getInnerHeight(),s=this.absoluteYOffset+e,i=this.dimensions.activator,n=this.dimensions.content.height,a=t+n,o=s<a;return o&&this.offsetOverflow&&i.top>n?t=this.pageYOffset+(i.top-n):o&&!this.allowOverflow?t=s-n-12:t<this.absoluteYOffset&&!this.allowOverflow&&(t=this.absoluteYOffset+12),t<12?12:t},callActivate(){this.hasWindow&&this.activate()},callDeactivate(){this.isContentActive=!1,this.deactivate()},checkForPageYOffset(){this.hasWindow&&(this.pageYOffset=this.activatorFixed?0:this.getOffsetTop())},checkActivatorFixed(){if(!1!==this.attach)return void(this.activatorFixed=!1);let t=this.getActivator();while(t){if("fixed"===window.getComputedStyle(t).position)return void(this.activatorFixed=!0);t=t.offsetParent}this.activatorFixed=!1},deactivate(){},genActivatorListeners(){const t=n["a"].options.methods.genActivatorListeners.call(this),e=t.click;return e&&(t.click=t=>{this.openOnClick&&e&&e(t),this.absoluteX=t.clientX,this.absoluteY=t.clientY}),t},getInnerHeight(){return this.hasWindow?window.innerHeight||document.documentElement.clientHeight:0},getOffsetLeft(){return this.hasWindow?window.pageXOffset||document.documentElement.scrollLeft:0},getOffsetTop(){return this.hasWindow?window.pageYOffset||document.documentElement.scrollTop:0},getRoundedBoundedClientRect(t){const e=t.getBoundingClientRect();return{top:Math.round(e.top),left:Math.round(e.left),bottom:Math.round(e.bottom),right:Math.round(e.right),width:Math.round(e.width),height:Math.round(e.height)}},measure(t){if(!t||!this.hasWindow)return null;const e=this.getRoundedBoundedClientRect(t);if(!1!==this.attach){const s=window.getComputedStyle(t);e.left=parseInt(s.marginLeft),e.top=parseInt(s.marginTop)}return e},sneakPeek(t){requestAnimationFrame(()=>{const e=this.$refs.content;e&&"none"===e.style.display?(e.style.display="inline-block",t(),e.style.display="none"):t()})},startTransition(){return new Promise(t=>requestAnimationFrame(()=>{this.isContentActive=this.hasJustFocused=this.isActive,t()}))},updateDimensions(){this.hasWindow="undefined"!==typeof window,this.checkActivatorFixed(),this.checkForPageYOffset(),this.pageWidth=document.documentElement.clientWidth;const t={activator:{...this.dimensions.activator},content:{...this.dimensions.content}};if(!this.hasActivator||this.absolute)t.activator=this.absolutePosition();else{const e=this.getActivator();if(!e)return;t.activator=this.measure(e),t.activator.offsetLeft=e.offsetLeft,!1!==this.attach?t.activator.offsetTop=e.offsetTop:t.activator.offsetTop=0}this.sneakPeek(()=>{if(this.$refs.content){if(this.$refs.content.offsetParent){const e=this.getRoundedBoundedClientRect(this.$refs.content.offsetParent);this.relativeYOffset=window.pageYOffset+e.top,t.activator.top-=this.relativeYOffset,t.activator.left-=window.pageXOffset+e.left}t.content=this.measure(this.$refs.content)}this.dimensions=t})}}}),p=s("e4d3"),m=s("a236"),v=s("7560"),g=s("a293"),x=s("dc22"),b=s("d9bd"),y=s("7d8f");const w=Object(h["a"])(o["a"],a["a"],p["a"],m["a"],v["a"],f);e["a"]=w.extend({name:"v-menu",directives:{ClickOutside:g["a"],Resize:x["a"]},provide(){return{isInMenu:!0,theme:this.theme}},props:{auto:Boolean,closeOnClick:{type:Boolean,default:!0},closeOnContentClick:{type:Boolean,default:!0},disabled:Boolean,disableKeys:Boolean,maxHeight:{type:[Number,String],default:"auto"},offsetX:Boolean,offsetY:Boolean,openOnHover:Boolean,origin:{type:String,default:"top left"},transition:{type:[Boolean,String],default:"v-menu-transition"},contentProps:{type:Object,default:()=>({})}},data(){return{calculatedTopAuto:0,defaultOffset:8,hasJustFocused:!1,listIndex:-1,resizeTimeout:0,selectedIndex:null,tiles:[]}},computed:{activeTile(){return this.tiles[this.listIndex]},calculatedLeft(){const t=Math.max(this.dimensions.content.width,parseFloat(this.calculatedMinWidth));return this.auto?Object(d["g"])(this.calcXOverflow(this.calcLeftAuto(),t))||"0":this.calcLeft(t)||"0"},calculatedMaxHeight(){const t=this.auto?"200px":Object(d["g"])(this.maxHeight);return t||"0"},calculatedMaxWidth(){return Object(d["g"])(this.maxWidth)||"0"},calculatedMinWidth(){if(this.minWidth)return Object(d["g"])(this.minWidth)||"0";const t=Math.min(this.dimensions.activator.width+Number(this.nudgeWidth)+(this.auto?16:0),Math.max(this.pageWidth-24,0)),e=isNaN(parseInt(this.calculatedMaxWidth))?t:parseInt(this.calculatedMaxWidth);return Object(d["g"])(Math.min(e,t))||"0"},calculatedTop(){const t=this.auto?Object(d["g"])(this.calcYOverflow(this.calculatedTopAuto)):this.calcTop();return t||"0"},hasClickableTiles(){return Boolean(this.tiles.find(t=>t.tabIndex>-1))},styles(){return{maxHeight:this.calculatedMaxHeight,minWidth:this.calculatedMinWidth,maxWidth:this.calculatedMaxWidth,top:this.calculatedTop,left:this.calculatedLeft,transformOrigin:this.origin,zIndex:this.zIndex||this.activeZIndex}}},watch:{isActive(t){t||(this.listIndex=-1)},isContentActive(t){this.hasJustFocused=t},listIndex(t,e){if(t in this.tiles){const e=this.tiles[t];e.classList.add("v-list-item--highlighted");const s=this.$refs.content.scrollTop,i=this.$refs.content.clientHeight;s>e.offsetTop-8?Object(y["b"])(e.offsetTop-e.clientHeight,{appOffset:!1,duration:300,container:this.$refs.content}):s+i<e.offsetTop+e.clientHeight+8&&Object(y["b"])(e.offsetTop-i+2*e.clientHeight,{appOffset:!1,duration:300,container:this.$refs.content})}e in this.tiles&&this.tiles[e].classList.remove("v-list-item--highlighted")}},created(){this.$attrs.hasOwnProperty("full-width")&&Object(b["e"])("full-width",this)},mounted(){this.isActive&&this.callActivate()},methods:{activate(){this.updateDimensions(),requestAnimationFrame(()=>{this.startTransition().then(()=>{this.$refs.content&&(this.calculatedTopAuto=this.calcTopAuto(),this.auto&&(this.$refs.content.scrollTop=this.calcScrollPosition()))})})},calcScrollPosition(){const t=this.$refs.content,e=t.querySelector(".v-list-item--active"),s=t.scrollHeight-t.offsetHeight;return e?Math.min(s,Math.max(0,e.offsetTop-t.offsetHeight/2+e.offsetHeight/2)):t.scrollTop},calcLeftAuto(){return parseInt(this.dimensions.activator.left-2*this.defaultOffset)},calcTopAuto(){const t=this.$refs.content,e=t.querySelector(".v-list-item--active");if(e||(this.selectedIndex=null),this.offsetY||!e)return this.computedTop;this.selectedIndex=Array.from(this.tiles).indexOf(e);const s=e.offsetTop-this.calcScrollPosition(),i=t.querySelector(".v-list-item").offsetTop;return this.computedTop-s-i-1},changeListIndex(t){if(this.getTiles(),this.isActive&&this.hasClickableTiles)if(t.keyCode!==d["t"].tab){if(t.keyCode===d["t"].down)this.nextTile();else if(t.keyCode===d["t"].up)this.prevTile();else if(t.keyCode===d["t"].end)this.lastTile();else if(t.keyCode===d["t"].home)this.firstTile();else{if(t.keyCode!==d["t"].enter||-1===this.listIndex)return;this.tiles[this.listIndex].click()}t.preventDefault()}else this.isActive=!1},closeConditional(t){const e=t.target;return this.isActive&&!this._isDestroyed&&this.closeOnClick&&!this.$refs.content.contains(e)},genActivatorAttributes(){const t=n["a"].options.methods.genActivatorAttributes.call(this);return this.activeTile&&this.activeTile.id?{...t,"aria-activedescendant":this.activeTile.id}:t},genActivatorListeners(){const t=f.options.methods.genActivatorListeners.call(this);return this.disableKeys||(t.keydown=this.onKeyDown),t},genTransition(){const t=this.genContent();return this.transition?this.$createElement("transition",{props:{name:this.transition}},[t]):t},genDirectives(){const t=[{name:"show",value:this.isContentActive}];return!this.openOnHover&&this.closeOnClick&&t.push({name:"click-outside",value:{handler:()=>{this.isActive=!1},closeConditional:this.closeConditional,include:()=>[this.$el,...this.getOpenDependentElements()]}}),t},genContent(){const t={attrs:{...this.getScopeIdAttrs(),...this.contentProps,role:"role"in this.$attrs?this.$attrs.role:"menu"},staticClass:"v-menu__content",class:{...this.rootThemeClasses,...this.roundedClasses,"v-menu__content--auto":this.auto,"v-menu__content--fixed":this.activatorFixed,menuable__content__active:this.isActive,[this.contentClass.trim()]:!0},style:this.styles,directives:this.genDirectives(),ref:"content",on:{click:t=>{const e=t.target;e.getAttribute("disabled")||this.closeOnContentClick&&(this.isActive=!1)},keydown:this.onKeyDown}};return this.$listeners.scroll&&(t.on=t.on||{},t.on.scroll=this.$listeners.scroll),!this.disabled&&this.openOnHover&&(t.on=t.on||{},t.on.mouseenter=this.mouseEnterHandler),this.openOnHover&&(t.on=t.on||{},t.on.mouseleave=this.mouseLeaveHandler),this.$createElement("div",t,this.getContentSlot())},getTiles(){this.$refs.content&&(this.tiles=Array.from(this.$refs.content.querySelectorAll(".v-list-item, .v-divider, .v-subheader")))},mouseEnterHandler(){this.runDelay("open",()=>{this.hasJustFocused||(this.hasJustFocused=!0)})},mouseLeaveHandler(t){this.runDelay("close",()=>{var e;(null===(e=this.$refs.content)||void 0===e?void 0:e.contains(t.relatedTarget))||requestAnimationFrame(()=>{this.isActive=!1,this.callDeactivate()})})},nextTile(){const t=this.tiles[this.listIndex+1];if(!t){if(!this.tiles.length)return;return this.listIndex=-1,void this.nextTile()}this.listIndex++,-1===t.tabIndex&&this.nextTile()},prevTile(){const t=this.tiles[this.listIndex-1];if(!t){if(!this.tiles.length)return;return this.listIndex=this.tiles.length,void this.prevTile()}this.listIndex--,-1===t.tabIndex&&this.prevTile()},lastTile(){const t=this.tiles[this.tiles.length-1];t&&(this.listIndex=this.tiles.length-1,-1===t.tabIndex&&this.prevTile())},firstTile(){const t=this.tiles[0];t&&(this.listIndex=0,-1===t.tabIndex&&this.nextTile())},onKeyDown(t){if(!this.disableKeys){if(t.keyCode===d["t"].esc){setTimeout(()=>{this.isActive=!1});const t=this.getActivator();this.$nextTick(()=>t&&t.focus())}else!this.isActive&&[d["t"].up,d["t"].down].includes(t.keyCode)&&(this.isActive=!0);this.$nextTick(()=>this.changeListIndex(t))}},onResize(){this.isActive&&(this.$refs.content.offsetWidth,this.updateDimensions(),clearTimeout(this.resizeTimeout),this.resizeTimeout=window.setTimeout(this.updateDimensions,100))}},render(t){const e={staticClass:"v-menu",class:{"v-menu--attached":""===this.attach||!0===this.attach||"attach"===this.attach},directives:[{arg:"500",name:"resize",value:this.onResize}]};return t("div",e,[!this.activator&&this.genActivator(),this.showLazyContent(()=>[this.$createElement(i["a"],{props:{root:!0,light:this.light,dark:this.dark}},[this.genTransition()])])])}})},ee6f:function(t,e,s){}}]);
//# sourceMappingURL=chunk-47dd47e3.7e228cbc.js.map