(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-dc6b8dce"],{"2bfd":function(t,e,s){},8489:function(t,e,s){},c6a6:function(t,e,s){"use strict";s("2bfd");var a=s("b974"),i=s("8654"),n=s("d9f7"),l=s("80d2");const r={...a["b"],offsetY:!0,offsetOverflow:!0,transition:!1};e["a"]=a["a"].extend({name:"v-autocomplete",props:{autoSelectFirst:{type:Boolean,default:!1},filter:{type:Function,default:(t,e,s)=>s.toLocaleLowerCase().indexOf(e.toLocaleLowerCase())>-1},hideNoData:Boolean,menuProps:{type:a["a"].options.props.menuProps.type,default:()=>r},noFilter:Boolean,searchInput:{type:String}},data(){return{lazySearch:this.searchInput}},computed:{classes(){return{...a["a"].options.computed.classes.call(this),"v-autocomplete":!0,"v-autocomplete--is-selecting-index":this.selectedIndex>-1}},computedItems(){return this.filteredItems},selectedValues(){return this.selectedItems.map(t=>this.getValue(t))},hasDisplayedItems(){return this.hideSelected?this.filteredItems.some(t=>!this.hasItem(t)):this.filteredItems.length>0},currentRange(){return null==this.selectedItem?0:String(this.getText(this.selectedItem)).length},filteredItems(){return!this.isSearching||this.noFilter||null==this.internalSearch?this.allItems:this.allItems.filter(t=>{const e=Object(l["n"])(t,this.itemText),s=null!=e?String(e):"";return this.filter(t,String(this.internalSearch),s)})},internalSearch:{get(){return this.lazySearch},set(t){this.lazySearch!==t&&(this.lazySearch=t,this.$emit("update:search-input",t))}},isAnyValueAllowed(){return!1},isDirty(){return this.searchIsDirty||this.selectedItems.length>0},isSearching(){return this.multiple&&this.searchIsDirty||this.searchIsDirty&&this.internalSearch!==this.getText(this.selectedItem)},menuCanShow(){return!!this.isFocused&&(this.hasDisplayedItems||!this.hideNoData)},$_menuProps(){const t=a["a"].options.computed.$_menuProps.call(this);return t.contentClass=("v-autocomplete__content "+(t.contentClass||"")).trim(),{...r,...t}},searchIsDirty(){return null!=this.internalSearch&&""!==this.internalSearch},selectedItem(){return this.multiple?null:this.selectedItems.find(t=>this.valueComparator(this.getValue(t),this.getValue(this.internalValue)))},listData(){const t=a["a"].options.computed.listData.call(this);return t.props={...t.props,items:this.virtualizedItems,noFilter:this.noFilter||!this.isSearching||!this.filteredItems.length,searchInput:this.internalSearch},t}},watch:{filteredItems:"onFilteredItemsChanged",internalValue:"setSearch",isFocused(t){t?(document.addEventListener("copy",this.onCopy),this.$refs.input&&this.$refs.input.select()):(document.removeEventListener("copy",this.onCopy),this.blur(),this.updateSelf())},isMenuActive(t){!t&&this.hasSlot&&(this.lazySearch=null)},items(t,e){e&&e.length||!this.hideNoData||!this.isFocused||this.isMenuActive||!t.length||this.activateMenu()},searchInput(t){this.lazySearch=t},internalSearch:"onInternalSearchChanged",itemText:"updateSelf"},created(){this.setSearch()},destroyed(){document.removeEventListener("copy",this.onCopy)},methods:{onFilteredItemsChanged(t,e){if(t!==e){if(!this.autoSelectFirst){const s=e[this.$refs.menu.listIndex];s?this.setMenuIndex(t.findIndex(t=>t===s)):this.setMenuIndex(-1),this.$emit("update:list-index",this.$refs.menu.listIndex)}this.$nextTick(()=>{this.internalSearch&&(1===t.length||this.autoSelectFirst)&&(this.$refs.menu.getTiles(),this.autoSelectFirst&&t.length&&(this.setMenuIndex(0),this.$emit("update:list-index",this.$refs.menu.listIndex)))})}},onInternalSearchChanged(){this.updateMenuDimensions()},updateMenuDimensions(){this.isMenuActive&&this.$refs.menu&&this.$refs.menu.updateDimensions()},changeSelectedIndex(t){this.searchIsDirty||(this.multiple&&t===l["t"].left?-1===this.selectedIndex?this.selectedIndex=this.selectedItems.length-1:this.selectedIndex--:this.multiple&&t===l["t"].right?this.selectedIndex>=this.selectedItems.length-1?this.selectedIndex=-1:this.selectedIndex++:t!==l["t"].backspace&&t!==l["t"].delete||this.deleteCurrentItem())},deleteCurrentItem(){const t=this.selectedIndex,e=this.selectedItems[t];if(!this.isInteractive||this.getDisabled(e))return;const s=this.selectedItems.length-1;if(-1===this.selectedIndex&&0!==s)return void(this.selectedIndex=s);const a=this.selectedItems.length,i=t!==a-1?t:t-1,n=this.selectedItems[i];n?this.selectItem(e):this.setValue(this.multiple?[]:null),this.selectedIndex=i},clearableCallback(){this.internalSearch=null,a["a"].options.methods.clearableCallback.call(this)},genInput(){const t=i["a"].options.methods.genInput.call(this);return t.data=Object(n["a"])(t.data,{attrs:{"aria-activedescendant":Object(l["m"])(this.$refs.menu,"activeTile.id"),autocomplete:Object(l["m"])(t.data,"attrs.autocomplete","off")},domProps:{value:this.internalSearch}}),t},genInputSlot(){const t=a["a"].options.methods.genInputSlot.call(this);return t.data.attrs.role="combobox",t},genSelections(){return this.hasSlot||this.multiple?a["a"].options.methods.genSelections.call(this):[]},onClick(t){this.isInteractive&&(this.selectedIndex>-1?this.selectedIndex=-1:this.onFocus(),this.isAppendInner(t.target)||this.activateMenu())},onInput(t){if(this.selectedIndex>-1||!t.target)return;const e=t.target,s=e.value;e.value&&this.activateMenu(),this.multiple||""!==s||this.deleteCurrentItem(),this.internalSearch=s,this.badInput=e.validity&&e.validity.badInput},onKeyDown(t){const e=t.keyCode;!t.ctrlKey&&[l["t"].home,l["t"].end].includes(e)||a["a"].options.methods.onKeyDown.call(this,t),this.changeSelectedIndex(e)},onSpaceDown(t){},onTabDown(t){a["a"].options.methods.onTabDown.call(this,t),this.updateSelf()},onUpDown(t){t.preventDefault(),this.activateMenu()},selectItem(t){a["a"].options.methods.selectItem.call(this,t),this.setSearch()},setSelectedItems(){a["a"].options.methods.setSelectedItems.call(this),this.isFocused||this.setSearch()},setSearch(){this.$nextTick(()=>{this.multiple&&this.internalSearch&&this.isMenuActive||(this.internalSearch=!this.selectedItems.length||this.multiple||this.hasSlot?null:this.getText(this.selectedItem))})},updateSelf(){(this.searchIsDirty||this.internalValue)&&(this.multiple||this.valueComparator(this.internalSearch,this.getValue(this.internalValue))||this.setSearch())},hasItem(t){return this.selectedValues.indexOf(this.getValue(t))>-1},onCopy(t){var e,s;if(-1===this.selectedIndex)return;const a=this.selectedItems[this.selectedIndex],i=this.getText(a);null===(e=t.clipboardData)||void 0===e||e.setData("text/plain",i),null===(s=t.clipboardData)||void 0===s||s.setData("text/vnd.vuetify.autocomplete.item+plain",i),t.preventDefault()}}})},d46f:function(t,e,s){"use strict";s("8489")},d8ee:function(t,e,s){"use strict";s.r(e);var a=s("c6a6"),i=s("8336"),n=s("b0af"),l=s("ce7e"),r=s("0e8f"),o=s("132d"),c=s("adda"),d=s("a722"),h=s("2db4"),p=function(){var t=this,e=t._self._c;return e("div",[e("PageLoader",{attrs:{storage:t.appLoading}}),t.ServerError?e("ServerError"):t._e(),e(h["a"],{attrs:{color:"#ff6200",right:"",timeout:3e3},model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[e(d["a"],{attrs:{wrap:""}},[e(r["a"],{staticClass:"align-self-center",attrs:{"text-left":""}},[t._v(t._s(t.msg))]),e(r["a"],{attrs:{"text-right":""}},[e(i["a"],{attrs:{small:"",ripple:!1,text:""},on:{click:function(e){t.snackbar=!1}}},[e(o["a"],{staticStyle:{color:"white"}},[t._v("mdi-close")])],1)],1)],1)],1),e(d["a"],{attrs:{wrap:"","justify-center":"","pa-0":"","pa-sm-4":""}},[e(r["a"],{attrs:{xs12:""}},[e(d["a"],{attrs:{wrap:"","justify-start":"","py-2":""}},[e(r["a"],{attrs:{xs12:"",sm6:"","align-self-center":""}},[e("span",{staticClass:"title1",style:{"font-size":"xs"==t.$vuetify.breakpoint.name||"sm"==t.$vuetify.breakpoint.name?"20px":"md"==t.$vuetify.breakpoint.name||"lg"==t.$vuetify.breakpoint.name?"25px":"30px"}},[t._v("Booking details")])])],1),e(d["a"],{staticStyle:{"background-color":"white"},attrs:{wrap:"","justify-center":""}},[e(r["a"],{attrs:{xs12:""}},[e(d["a"],{attrs:{wrap:"","justify-center":"","pb-6":""}},[e(r["a"],{attrs:{xs12:""}},[e(n["a"],{staticStyle:{"border-radius":"12px"},attrs:{elevation:"0"}},[e(d["a"],{attrs:{wrap:"","justify-center":""}},[e(r["a"],{attrs:{xs12:""}},[e(d["a"],{attrs:{wrap:"","justify-start":""}},[t.list.houseBoatId?e(r["a"],{attrs:{xs12:""}},[t.list.houseBoatId.coverImage?e(c["a"],{staticStyle:{"border-radius":"0px 0px 0px 0px"},attrs:{src:t.mediaUURL+t.list.houseBoatId.coverImage,height:"100%",width:"100%"},scopedSlots:t._u([{key:"placeholder",fn:function(){return[e("ImageLoader")]},proxy:!0}],null,!1,958508573)}):t._e()],1):t._e()],1)],1),e(r["a"],{attrs:{xs12:"","px-4":"","pt-4":""}},[e(d["a"],{attrs:{wrap:"","justify-start":"","fill-height":""}},[e(r["a"],{attrs:{xs12:"",sm6:"",md4:"",lg4:"",xl4:"","text-left":"","align-self-center":""}},[e(d["a"],{attrs:{wrap:""}},[e(r["a"],{attrs:{xs12:""}},[e("span",{staticStyle:{"font-weight":"bold","font-size":"20px","font-family":"LexendRegular"}},[t._v(" "+t._s(t.list.houseBoatName))])]),e(r["a"],{attrs:{xs12:"","pt-3":""}},[e("span",{staticClass:"subh"},[t._v(" Booking # ")]),t.list.bookingNo?e("span",{staticClass:"subh"},[t._v("   "+t._s(t.list.bookingNo)+" ")]):e("span",[t._v("-")])]),e(r["a"],{attrs:{"pt-3":""}},[e("span",{staticStyle:{"font-family":"LexendRegular","font-size":"16px","font-weight":"500"}},[t._v(" Check-in :  "),t.list.startDate?e("span",[t._v(" "+t._s(t.list.startDate.slice(0,10))+" ")]):t._e()])]),e(r["a"],{attrs:{"pt-3":""}},[e("span",{staticStyle:{"font-family":"LexendRegular","font-size":"16px","font-weight":"500"}},[t._v(" Check-out :  "),t.list.endDate?e("span",[t._v(" "+t._s(t.list.endDate.slice(0,10))+" ")]):t._e()])]),e(r["a"],{attrs:{xs12:"","pt-3":""}},[e("span",{staticClass:"subh"},[t._v(" Total Rooms: ")]),t.list.bookingNo?e("span",{staticClass:"subh"},[t._v("   "+t._s(t.list.totalRooms)+" ")]):e("span",[t._v("-")])])],1)],1),e(r["a"],{attrs:{xs12:"",sm6:"",md5:"",lg5:"",xl5:"","text-left":"","align-self-center":""}},[e(d["a"],{attrs:{wrap:""}},[t.list.userid?e(r["a"],{attrs:{xs12:""}},[e("span",{staticClass:"subh"},[t._v(" Booked for :   ")]),t.list.fullName?e("span",{staticStyle:{"font-family":"LexendRegular","font-size":"15px","font-weight":"400"}},[t._v(" "+t._s(t.list.fullName))]):t._e(),"Customer"==t.list.userid.role&&t.list.userid.phoneNumber?e("span",{staticStyle:{"font-family":"LexendRegular","font-size":"15px","font-weight":"400"}},[t._v(" , "+t._s(t.list.userid.phoneNumber)+" ")]):t._e()]):t._e(),e(r["a"],{attrs:{xs12:"","text-left":"","pt-4":""}},[e("span",{staticClass:"subh"},[t._v(" Members :  "),t.list.noOfAdults?e("span",[t._v(" "+t._s(t.list.noOfAdults)+" Adults, ")]):t._e(),t.list.noOfChildren?e("span",[t._v(" "+t._s(t.list.noOfChildren)+" Children (below 5 years) ")]):t._e()])]),e(r["a"],{attrs:{xs12:"","text-left":"","pt-3":""}},[e("span",{staticClass:"subh"},[t._v(" Balance :  "),"Pending"==t.list.balancepaymentStatus?e("span",{staticClass:"subh",staticStyle:{color:"red"}},[t._v(" ₹ "+t._s(t.list.balancePayAmount)+" Not Paid ")]):e("span",{staticClass:"subh",staticStyle:{color:"green"}},[t._v(" ₹ "+t._s(t.list.balancePayAmount)+" Paid ")])])])],1)],1),e(r["a"],{attrs:{xs12:"",sm12:"",md2:"",lg2:"",xl2:"","align-self-center":""}},[e(d["a"],{attrs:{wrap:"","justify-end":""}},[e(r["a"],{staticClass:"hidden-sm-and-down",attrs:{xs12:"","text-left":"","pr-1":""}},[e("span",{staticStyle:{"font-family":"LexendFont","font-size":"20px","font-weight":"600"}},[t._v(" ₹ "+t._s(t.list.vendorNetAmount)+" ")])]),e(r["a"],{staticClass:"hidden-md-and-up",attrs:{xs12:"","text-left":"","pr-1":""}},[e("span",{staticClass:"subh"},[t._v(" ₹ "+t._s(t.list.vendorNetAmount)+" ")])])],1)],1)],1)],1)],1)],1)],1),e(r["a"],{attrs:{xs12:"","px-4":"","pt-3":""}},[e(d["a"],{attrs:{wrap:""}},[e(r["a"],{attrs:{xs12:""}},[e("span",{staticStyle:{"font-family":"LexendFont",color:"#f17343","text-transform":"none","font-size":"20px","font-weight":"400"}},[t._v(" CUSTOMER DETAILS ")])]),e(r["a"],{attrs:{xs12:""}},[e(d["a"],{attrs:{wrap:"","justify-center":""}},[e(r["a"],{attrs:{xs12:"",sm6:"",md3:"",lg3:"",xl3:""}},[e(d["a"],{attrs:{wrap:"","justify-start":""}},[e(r["a"],{attrs:{xs12:""}},[e(d["a"],{attrs:{wrap:""}},[e(r["a"],{attrs:{xs12:"","pt-1":""}},[e("span",{staticClass:"subh"},[t._v(" Name ")])]),e(r["a"],{staticClass:"subheading",attrs:{xs12:"","pt-1":""}},[e("span",[t._v(" "+t._s(t.list.fullName)+" ")])])],1)],1)],1)],1),e(r["a"],{attrs:{xs12:"",sm6:"",md3:"",lg3:""}},[e(d["a"],{attrs:{wrap:"","justify-start":""}},[e(r["a"],{attrs:{xs12:""}},[e(d["a"],{attrs:{wrap:""}},[e(r["a"],{attrs:{xs12:"","pt-1":""}},[e("span",{staticClass:"heading"},[t._v(" Phone Number ")])]),e(r["a"],{attrs:{xs12:"","pt-1":""}},[e("span",{staticClass:"subheading"},[t._v(" "+t._s(t.list.phoneNumber)+" ")])])],1)],1)],1)],1),e(r["a"],{attrs:{xs12:"",sm6:"",md3:"",lg3:""}},[e(d["a"],{attrs:{wrap:"","justify-start":""}},[e(r["a"],{attrs:{xs12:""}},[e(d["a"],{attrs:{wrap:""}},[e(r["a"],{attrs:{xs12:"","pt-1":""}},[e("span",{staticClass:"heading"},[t._v(" Email ")])]),e(r["a"],{attrs:{xs12:"","pt-1":""}},[e("span",{staticClass:"subheading"},[t._v(" "+t._s(t.list.email)+" ")])])],1)],1)],1)],1),e(r["a"],{attrs:{xs12:"",sm6:"",md3:"",lg3:""}},[e(d["a"],{attrs:{wrap:"","justify-start":""}},[e(r["a"],{attrs:{xs12:""}},[e(d["a"],{attrs:{wrap:""}},[e(r["a"],{attrs:{xs12:"","pt-1":""}},[e("span",{staticClass:"heading"},[t._v(" Address ")])]),e(r["a"],{attrs:{xs12:"","pt-1":""}},[e("span",{staticClass:"subheading"},[t._v(" "+t._s(t.list.address)+" ")])])],1)],1)],1)],1)],1)],1)],1)],1),e(r["a"],{attrs:{xs12:"","px-4":"","pt-2":""}},[e("span",{staticStyle:{"font-family":"LexendFont",color:"#f17343","text-transform":"none","font-size":"20px","font-weight":"400"}},[t._v(" PAYMENT DETAILS ")])]),e(r["a"],{attrs:{xs12:"","px-4":"","pt-2":""}},[e(d["a"],{attrs:{wrap:"","justify-center":""}},[e(r["a"],{attrs:{xs12:""}},[e(d["a"],{attrs:{wrap:"","justify-start":""}},[e(r["a"],{attrs:{xs12:"",sm6:"",md3:"",lg1:"","pr-2":""}},[e(d["a"],{attrs:{wrap:""}},[e(r["a"],{attrs:{xs12:""}},[e("span",{staticClass:"subh"},[t._v(" Id ")])]),e(r["a"],{staticClass:"subheading",attrs:{"pt-1":"",xs12:""}},[e("span",[t._v(" "+t._s(t.list.bookingNo)+" ")])])],1)],1),e(r["a"],{attrs:{xs12:"",sm6:"",md3:"",lg2:""}},[e(d["a"],{attrs:{wrap:""}},[e(r["a"],{attrs:{xs12:""}},[e("span",{staticClass:"subh"},[t._v(" Booking On ")])]),e(r["a"],{staticClass:"subheading",attrs:{"pt-1":"",xs12:""}},[t.list.bookingDate?e("span",[t._v(" "+t._s(t.list.bookingDate.slice(0,10))+" ")]):t._e()])],1)],1),e(r["a"],{attrs:{xs12:"",sm6:"",md3:"",lg2:""}},[e(d["a"],{attrs:{wrap:""}},[e(r["a"],{attrs:{xs10:"","text-left":""}},[e("span",{staticClass:"subh"},[t._v(" Total Amount ")])]),e(r["a"],{attrs:{xs10:"","pt-1":"","text-left":""}},[e("span",{staticClass:"subheading"},[t._v(" ₹ "+t._s(t.list.totalAmount)+" ")])])],1)],1),e(r["a"],{attrs:{xs12:"",sm6:"",md3:"",lg2:""}},[e(d["a"],{attrs:{wrap:""}},[e(r["a"],{attrs:{xs10:"","text-left":""}},[e("span",{staticClass:"subh"},[t._v(" Houseboat Amount ")])]),e(r["a"],{attrs:{xs10:"","pt-1":"","text-left":""}},[e("span",{staticClass:"subheading"},[t._v(" ₹ "+t._s(t.list.vendorNetAmount)+" ")])])],1)],1),e(r["a"],{attrs:{xs12:"",sm6:"",md3:"",lg2:""}},[e(d["a"],{attrs:{wrap:""}},[e(r["a"],{attrs:{xs10:"","text-left":""}},[e("span",{staticClass:"subh"},[t._v(" Advance Paid ")])]),e(r["a"],{attrs:{xs10:"","pt-1":"","text-left":""}},[e("span",{staticClass:"subheading"},[t._v(" ₹ "+t._s(t.list.advanceAmountPaid)+" ")])])],1)],1),e(r["a"],{attrs:{xs12:"",sm6:"",md3:"",lg2:""}},[e(d["a"],{attrs:{wrap:""}},[e(r["a"],{attrs:{xs12:"","text-left":""}},[e("span",{staticClass:"subh"},[t._v(" Balance Amount ")])]),e(r["a"],{attrs:{xs12:"","pt-1":"","text-left":""}},[e("span",{staticClass:"subheading"},[t._v(" ₹ "+t._s(t.list.balancePayAmount)+" ")])])],1)],1),e(r["a"],{attrs:{xs6:"",lg3:""}},[e(d["a"],{attrs:{wrap:""}},[e(r["a"],{attrs:{xs12:"","text-left":""}},[e("span",{staticClass:"subh"},[t._v(" Status of Balance Amount ")])]),e(r["a"],{attrs:{xs12:"","pt-1":"","text-left":""}},["Pending"==t.list.balancepaymentStatus?e("span",{staticClass:"subheading"},[t._v(" Not Paid ")]):e("span",[t._v("Paid")])])],1)],1)],1)],1)],1)],1),e(r["a"],{attrs:{xs12:"","pt-3":"","px-4":""}},[e(l["a"])],1),e(r["a"],{attrs:{xs12:"","pt-3":"","px-4":""}},[e("span",{staticStyle:{"font-family":"LexendFont",color:"#f17343","text-transform":"none","font-size":"20px","font-weight":"400"}},[t._v(" BALANCE PAYMENT ")])]),e(r["a"],{attrs:{xs12:"","pt-1":"","px-4":""}},[e(d["a"],{attrs:{wrap:""}},[t.advancepaymentMode?e(r["a"],{attrs:{xs11:"",lg3:""}},[e("span",{staticClass:"subh",staticStyle:{"text-transform":"none"}},[t._v("Payee Deatils")]),e(a["a"],{staticClass:"custom-autocomplete rounded-lg",attrs:{disabled:"",outlined:"",dense:"",color:"black",items:t.categorys,"item-text":"name","item-color":"#FF1313","hide-details":"true"},model:{value:t.advancepaymentMode,callback:function(e){t.advancepaymentMode=e},expression:"advancepaymentMode"}}),e("br"),e("span",{staticClass:"pb-2",staticStyle:{"font-size":"12px","font-weight":"400","font-family":"LexendFont",color:"red"}},[t._v("* Balance Payment collect from "+t._s(t.advancepaymentMode)+".")])],1):e(r["a"],{attrs:{xs11:"",lg4:""}},[e("span",{staticClass:"subh",staticStyle:{"text-transform":"none"}},[t._v("Payee Deatils")]),e("br"),e("span",{staticClass:"subh"},[t._v(" Customer ")]),e("br"),e("span",{staticClass:"pb-2",staticStyle:{"font-size":"12px","font-weight":"400","font-family":"LexendFont",color:"red"}},[t._v("* Balance Payment collect from Customer.")])]),"Agent"===t.list.advancepaymentMode&&"Success"==t.list.balancepaymentStatus?e(r["a"],{attrs:{xs11:"",lg3:"","pt-7":"","pl-2":""}},[e(i["a"],{attrs:{color:"#F17343",block:""},on:{click:function(e){return t.submitPayment()}}},[e("span",{staticStyle:{color:"white"}},[t._v(" Verify Payment ")]),e(o["a"],{attrs:{small:"",color:"white"}},[t._v("mdi-check-circle")])],1)],1):t._e(),"Agent"===t.list.advancepaymentMode&&"Verified"==t.list.balancepaymentStatus?e(r["a"],{attrs:{xs11:"",lg3:"","pt-7":"","pl-2":""}},[e(i["a"],{attrs:{color:"success",block:""}},[e("span",{staticStyle:{color:"white"}},[t._v(" Verified Payment ")]),e(o["a"],{attrs:{color:"white"}},[t._v("mdi-check-circle")])],1)],1):t._e(),"Agent"===t.list.advancepaymentMode&&"Verified"==t.list.balancepaymentStatus?e(r["a"],{attrs:{xs11:"",lg2:"","pt-7":"","pl-2":""}},[t.list.paymentReceipt?e(i["a"],{attrs:{color:"#F17343",block:"",dark:"",download:"",href:t.mediaUURL+t.list.paymentReceipt,target:"_blank"}},[e(o["a"],{attrs:{small:""}},[t._v("mdi-file-document-outline")]),e("span",{staticStyle:{"font-family":"LexendFont","font-weight":"400","font-size":"16px","text-transform":"none"}},[t._v("View receipt")])],1):t._e()],1):t._e(),"Agent"===t.list.advancepaymentMode&&"Success"==t.list.balancepaymentStatus?e(r["a"],{attrs:{xs11:"",lg2:"","pt-7":"","pl-2":""}},[e(i["a"],{attrs:{color:"#F17343",block:"",dark:"",download:"",href:t.mediaUURL+t.list.paymentReceipt,target:"_blank"}},[e(o["a"],{attrs:{small:""}},[t._v("mdi-file-document-outline")]),e("span",{staticStyle:{"font-family":"LexendFont","font-weight":"400","font-size":"16px","text-transform":"none"}},[t._v("View receipt")])],1)],1):t._e()],1)],1)],1)],1)],1)],1)],1)],1)},u=[],m=s("cee4"),f={data(){return{carouselSpeed:2e3,appLoading:!1,ServerError:!1,snackbar:!1,timeout:5e3,list:{},balancepaymentMode:null,msg:null,favorites:[],categorys:["Agent","Guest","Driver"],mode:["UPI Id","Bank Transfer","QR code"],value:"",phone:"",imageFileFront:"",imageFileBack:"",imageFile:"",advancepaymentMode:null,id:this.$route.query.id,docsFront:"",docsBack:"",docs:"",docs1:"",file:"",formData:new FormData}},computed:{appUser(){return this.$store.state.userData}},beforeMount(){},mounted(){this.getList()},methods:{formattedDate(t){const e={day:"2-digit",month:"2-digit",year:"numeric"};return new Date(t).toLocaleDateString("en-GB",e)},copyToClipboard(t){const e=document.createElement("textarea");e.value=t,document.body.appendChild(e),e.select(),document.execCommand("copy"),document.body.removeChild(e),this.msg="UPI ID copied to clipboard",this.snackbar=!0},getList(){this.appLoading=!0,Object(m["a"])({method:"POST",url:"/vendor/my/bookings/details",headers:{token:localStorage.getItem("token")},data:{bookingId:this.id}}).then(t=>{this.list=t.data.data,this.advancepaymentMode=this.list.advancepaymentMode,this.appLoading=!1}).catch(t=>{this.ServerError=!0,console.error(t)})},validate(){this.imageFileFront||this.appUser.agentId.agentIdProofFront?this.imageFileBack||this.appUser.agentId.agentIdProofBack?this.imageFile||this.appUser.agentId.agentGSTProof?this.setpThree():(this.msg="Please Upload Document Details",this.snackbar=!0):(this.msg="Please Upload Back Side Document",this.snackbar=!0):(this.msg="Please Upload Front Side Document",this.snackbar=!0)},uploadFront(t){this.docsFront=t.target.files[0],this.docsFront&&(this.imageFileFront=this.docsFront)},uploadBack(t){this.docsBack=t.target.files[0],this.docsBack&&(this.imageFileBack=this.docsBack)},upload(t){console.log(this.imageFile),this.docs=t.target.files[0],this.docs&&(this.imageFile=this.docs)},formatTime(t){if(!t)return"";const e=new Date(t),s=e.getHours().toString().padStart(2,"0"),a=e.getMinutes().toString().padStart(2,"0"),i=e.getSeconds().toString().padStart(2,"0");return`${s}:${a}:${i}`},submitPayment(){this.appLoading=!0,Object(m["a"])({method:"POST",url:"/vendor/verify/houseboat/payment",headers:{token:localStorage.getItem("token")},data:{bookingId:this.id}}).then(t=>{this.appLoading=!1,1==t.data.status?(this.msg=t.data.msg,this.snackbar=!0,this.getList()):(this.msg=t.data.msg,this.snackbar=!0)}).catch(t=>{this.ServerError=!0,console.error(t)})}}},g=f,x=(s("d46f"),s("0c7c")),v=Object(x["a"])(g,p,u,!1,null,null,null);e["default"]=v.exports}}]);
//# sourceMappingURL=chunk-dc6b8dce.cde71eee.js.map