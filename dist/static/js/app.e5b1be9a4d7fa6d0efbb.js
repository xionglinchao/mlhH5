webpackJsonp([8],{"/kga":function(t,e,n){"use strict";function i(t){n("7zGH")}var o=n("JkZY"),a=(o.a,Boolean,String,String,Number,String,String,Boolean,Object,Boolean,{mixins:[o.a],name:"x-dialog",model:{prop:"show",event:"change"},props:{show:{type:Boolean,default:!1},maskTransition:{type:String,default:"vux-mask"},maskZIndex:[String,Number],dialogTransition:{type:String,default:"vux-dialog"},dialogClass:{type:String,default:"weui-dialog"},hideOnBlur:Boolean,dialogStyle:Object,scroll:{type:Boolean,default:!0,validator:function(t){return!0}}},computed:{maskStyle:function(){if(void 0!==this.maskZIndex)return{zIndex:this.maskZIndex}}},mounted:function(){"undefined"!=typeof window&&window.VUX_CONFIG&&"VIEW_BOX"===window.VUX_CONFIG.$layout&&(this.layout="VIEW_BOX")},watch:{show:function(t){this.$emit("update:show",t),this.$emit(t?"on-show":"on-hide"),t?this.addModalClassName():this.removeModalClassName()}},methods:{shouldPreventScroll:function(){var t=/iPad|iPhone|iPod/i.test(window.navigator.userAgent),e=this.$el.querySelector("input")||this.$el.querySelector("textarea");if(t&&e)return!0},hide:function(){this.hideOnBlur&&(this.$emit("update:show",!1),this.$emit("change",!1),this.$emit("on-click-mask"))}},data:function(){return{layout:""}}}),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-x-dialog",class:{"vux-x-dialog-absolute":"VIEW_BOX"===t.layout}},[n("transition",{attrs:{name:t.maskTransition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"weui-mask",style:t.maskStyle,on:{click:t.hide}})]),t._v(" "),n("transition",{attrs:{name:t.dialogTransition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],class:t.dialogClass,style:t.dialogStyle},[t._t("default")],2)])],1)},s=[],l={render:r,staticRenderFns:s},u=l,c=n("VU/8"),d=i,h=c(a,u,!1,d,null,null);e.a=h.exports},"2hMI":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={baseURL:"https://meilihua.06baobao.com/",clientId:"pmb7c24bce90ca7b",clientSecret:"bff3842653d7a7cc1597577ba051cfbe",verison:"1.0.0",grantType:"authorization_code",forceGrantType:{NewsArticle:"temporary_auth"},allowChannel:["wechat","qq"],withCredentials:!0,shareConfig:{wechat:{debug:!1,beta:!0,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage","hideAllNonBaseMenuItem","showMenuItems"]},weibo:{},qq:{}}}},"2lnh":function(t,e){},"3iZP":function(t,e){},"3k2l":function(t,e){},"4npp":function(t,e,n){"use strict";function i(t){return void 0===t?document.body:"string"==typeof t&&0===t.indexOf("?")?document.body:("string"==typeof t&&t.indexOf("?")>0&&(t=t.split("?")[0]),"body"===t||!0===t?document.body:t instanceof window.Node?t:document.querySelector(t))}function o(t){if(!t)return!1;if("string"==typeof t&&t.indexOf("?")>0)try{return JSON.parse(t.split("?")[1]).autoUpdate||!1}catch(t){return!1}return!1}function a(t){n("BokZ")}function r(t){n("lFAX")}Object.defineProperty(e,"__esModule",{value:!0});var s=n("7+uW"),l=n("NYxO"),u=n("BEQ0"),c={inserted:function(t,e,n){var o=e.value;t.className=t.className?t.className+" v-transfer-dom":"v-transfer-dom";var a=t.parentNode,r=document.createComment(""),s=!1;!1!==o&&(a.replaceChild(r,t),i(o).appendChild(t),s=!0),t.__transferDomData||(t.__transferDomData={parentNode:a,home:r,target:i(o),hasMovedOut:s})},componentUpdated:function(t,e){var n=e.value;if(o(n)){var a=t.__transferDomData,r=a.parentNode,s=a.home,l=a.hasMovedOut;!l&&n?(r.replaceChild(s,t),i(n).appendChild(t),t.__transferDomData=u({},t.__transferDomData,{hasMovedOut:!0,target:i(n)})):l&&!1===n?(r.replaceChild(t,s),t.__transferDomData=u({},t.__transferDomData,{hasMovedOut:!1,target:i(n)})):n&&i(n).appendChild(t)}},unbind:function(t,e){t.className=t.className.replace("v-transfer-dom",""),t.__transferDomData&&!0===t.__transferDomData.hasMovedOut&&t.__transferDomData.parentNode&&t.__transferDomData.parentNode.appendChild(t),t.__transferDomData=null}},d=c,h={bind:function(t){var e=t.getAttribute("class");t.setAttribute("class",[e,"mx-drop-container"].join(" "))}},p={bind:function(t){var e=t.getAttribute("class");t.setAttribute("class",[e,"mx-drop-node"].join(" ")),t.ontouchstart=function(e){for(var n=e.touches[0],i=t.getAttribute("style"),o=n.pageX-t.offsetLeft,a=n.pageY-t.offsetTop,r=document.getElementsByClassName("mx-drop-container"),s=[],l=0;l<r.length;l++){var u=r[l],c=getComputedStyle(u),d=u.getBoundingClientRect();s.push({el:u,height:d.height,width:d.width,x:d.left,y:d.top,angle:0,zIndex:"auto"===c.zIndex?0:parseInt(c.zIndex)})}document.oncontextmenu=function(){return t.ontouchend(),!1},t.ontouchmove=function(e){e.preventDefault();var n=e.touches[0];t.style.left=n.pageX-o+"px",t.style.top=n.pageY-a+"px",t._x=n.pageX,t._y=n.pageY},t.ontouchcancel=t.ontouchend=function(){for(var e={},n=0;n<s.length;n++){var o=s[n],a={x:o.x+o.width/2,y:o.y+o.height/2},r=-o.angle*Math.PI/180,l=(t._x-a.x)*Math.cos(r)-(t._y-a.y)*Math.sin(r)+a.x,u=(t._x-a.x)*Math.sin(r)+(t._y-a.y)*Math.cos(r)+a.y;l>=o.x&&l<=o.x+o.width&&u>=o.y&&u<=o.y+o.height&&(!e.zIndex||e.zIndex<o.zIndex)&&(e=o)}if(e.el){var c=document.createEvent("Event");c.initEvent("drop",!0,!0),e.el.dispatchEvent(c)}i?t.setAttribute("style",i):t.removeAttribute("style"),t._x=null,t._y=null,t.ontouchmove=null,t.ontouchend=null,document.oncontextmenu=null}}}},f=(String,{name:"x-img",props:{src:{type:String,required:!0}},methods:{$_onClick:function(t){this.$emit("click",t)}}}),m=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mx-image",on:{click:function(e){t.$_onClick(e)}}},[n("img",{attrs:{src:t.src}})])},g=[],w={render:m,staticRenderFns:g},v=w,_=n("VU/8"),y=a,x=_(f,v,!1,y,"data-v-7dd536bb",null),S=x.exports,b={name:"x-page",props:{},methods:{}},k=function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"mx-page"},[t._t("default")],2)},C=[],T={render:k,staticRenderFns:C},I=T,$=n("VU/8"),M=r,O=$(b,I,!1,M,"data-v-af0cc892",null),V=O.exports;s.a.component(S.name,S),s.a.component(V.name,V),s.a.component("remote-script",{render:function(t){var e=this;return t("script",{attrs:{type:"text/javascript",src:this.src},on:{load:function(t){e.$emit("load",t)},error:function(t){e.$emit("error",t)},readystatechange:function(t){"complete"===this.readyState&&e.$emit("load",t)}}})},props:{src:{type:String,required:!0}}}),s.a.directive("transfer-dom",d),s.a.directive("drop-container",h),s.a.directive("drop-node",p),s.a.use(l.a),n("Y+Ki"),n("hKoQ").polyfill(),s.a.config.productionTip=!1},"55wj":function(t,e){},"5j+u":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("7+uW");i.a.showAlert=i.a.prototype.showAlert=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"提示",n=arguments[2];if(!t)return!1;i.a.$vux.alert.show({title:e||"提示",content:t,onHide:function(){"function"==typeof n&&n()}})},i.a.prototype.toPage=function(t,e){console.log("query",e),this.$router.push({name:t,query:e||""})}},"62KO":function(t,e,n){"use strict";function i(t){n("nnSp")}var o=n("/kga"),a=(o.a,Boolean,Boolean,String,String,Boolean,String,String,String,String,Number,String,String,String,Boolean,Object,Boolean,String,Boolean,Boolean,{name:"confirm",components:{XDialog:o.a},props:{value:{type:Boolean,default:!1},showInput:{type:Boolean,default:!1},placeholder:{type:String,default:""},theme:{type:String,default:"ios"},hideOnBlur:{type:Boolean,default:!1},title:String,confirmText:String,cancelText:String,maskTransition:{type:String,default:"vux-fade"},maskZIndex:[Number,String],dialogTransition:{type:String,default:"vux-dialog"},content:String,closeOnConfirm:{type:Boolean,default:!0},inputAttrs:Object,showContent:{type:Boolean,default:!0},confirmType:{type:String,default:"primary"},showCancelButton:{type:Boolean,default:!0},showConfirmButton:{type:Boolean,default:!0}},created:function(){this.showValue=this.show,this.value&&(this.showValue=this.value)},watch:{value:function(t){this.showValue=t},showValue:function(t){var e=this;this.$emit("input",t),t&&(this.showInput&&(this.msg="",setTimeout(function(){e.$refs.input&&e.setInputFocus()},300)),this.$emit("on-show"))}},data:function(){return{msg:"",showValue:!1}},methods:{getInputAttrs:function(){return this.inputAttrs||{type:"text"}},setInputValue:function(t){this.msg=t},setInputFocus:function(t){t&&t.preventDefault(),this.$refs.input.focus()},_onConfirm:function(){this.showValue&&(this.closeOnConfirm&&(this.showValue=!1),this.$emit("on-confirm",this.msg))},_onCancel:function(){this.showValue&&(this.showValue=!1,this.$emit("on-cancel"))}}}),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-confirm"},[n("x-dialog",{attrs:{"dialog-class":"android"===t.theme?"weui-dialog weui-skin_android":"weui-dialog","mask-transition":t.maskTransition,"dialog-transition":"android"===t.theme?"vux-fade":t.dialogTransition,"hide-on-blur":t.hideOnBlur,"mask-z-index":t.maskZIndex},on:{"on-hide":function(e){t.$emit("on-hide")}},model:{value:t.showValue,callback:function(e){t.showValue=e},expression:"showValue"}},[t.title?n("div",{staticClass:"weui-dialog__hd",class:{"with-no-content":!t.showContent}},[n("strong",{staticClass:"weui-dialog__title"},[t._v(t._s(t.title))])]):t._e(),t._v(" "),t.showContent?[t.showInput?n("div",{staticClass:"vux-prompt"},["checkbox"===t.getInputAttrs().type?n("input",t._b({directives:[{name:"model",rawName:"v-model",value:t.msg,expression:"msg"}],ref:"input",staticClass:"vux-prompt-msgbox",attrs:{placeholder:t.placeholder,type:"checkbox"},domProps:{checked:Array.isArray(t.msg)?t._i(t.msg,null)>-1:t.msg},on:{touchend:t.setInputFocus,change:function(e){var n=t.msg,i=e.target,o=!!i.checked;if(Array.isArray(n)){var a=t._i(n,null);i.checked?a<0&&(t.msg=n.concat([null])):a>-1&&(t.msg=n.slice(0,a).concat(n.slice(a+1)))}else t.msg=o}}},"input",t.getInputAttrs(),!1)):"radio"===t.getInputAttrs().type?n("input",t._b({directives:[{name:"model",rawName:"v-model",value:t.msg,expression:"msg"}],ref:"input",staticClass:"vux-prompt-msgbox",attrs:{placeholder:t.placeholder,type:"radio"},domProps:{checked:t._q(t.msg,null)},on:{touchend:t.setInputFocus,change:function(e){t.msg=null}}},"input",t.getInputAttrs(),!1)):n("input",t._b({directives:[{name:"model",rawName:"v-model",value:t.msg,expression:"msg"}],ref:"input",staticClass:"vux-prompt-msgbox",attrs:{placeholder:t.placeholder,type:t.getInputAttrs().type},domProps:{value:t.msg},on:{touchend:t.setInputFocus,input:function(e){e.target.composing||(t.msg=e.target.value)}}},"input",t.getInputAttrs(),!1))]):n("div",{staticClass:"weui-dialog__bd"},[t._t("default",[n("div",{domProps:{innerHTML:t._s(t.content)}})])],2)]:t._e(),t._v(" "),n("div",{staticClass:"weui-dialog__ft"},[t.showCancelButton?n("a",{staticClass:"weui-dialog__btn weui-dialog__btn_default",attrs:{href:"javascript:;"},on:{click:t._onCancel}},[t._v(t._s(t.cancelText||"取消"))]):t._e(),t._v(" "),t.showConfirmButton?n("a",{staticClass:"weui-dialog__btn",class:"weui-dialog__btn_"+t.confirmType,attrs:{href:"javascript:;"},on:{click:t._onConfirm}},[t._v(t._s(t.confirmText||"确定"))]):t._e()])],2)],1)},s=[],l={render:r,staticRenderFns:s},u=l,c=n("VU/8"),d=i,h=c(a,u,!1,d,null,null);e.a=h.exports},"7zGH":function(t,e){},Bfwr:function(t,e,n){"use strict";function i(t){n("3iZP")}var o=(Boolean,String,String,String,{name:"loading",model:{prop:"show",event:"change"},props:{show:Boolean,text:String,position:String,transition:{type:String,default:"vux-mask"}},watch:{show:function(t){this.$emit("update:show",t)}}}),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:t.transition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"weui-loading_toast vux-loading",class:t.text?"":"vux-loading-no-text"},[n("div",{staticClass:"weui-mask_transparent"}),t._v(" "),n("div",{staticClass:"weui-toast",style:{position:t.position}},[n("i",{staticClass:"weui-loading weui-icon_toast"}),t._v(" "),t.text?n("p",{staticClass:"weui-toast__content"},[t._v(t._s(t.text||"加载中")),t._t("default")],2):t._e()])])])},r=[],s={render:a,staticRenderFns:r},l=s,u=n("VU/8"),c=i,d=u(o,l,!1,c,null,null);e.a=d.exports},BokZ:function(t,e){},D8vU:function(t,e){},Ew4p:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={default:{title:"默认分享标题",desc:"默认分享描述",imgUrl:"https://placekitten.com/200/200",link:window.location.href,success:function(){console.log("分享成功的回调信息")}},scene1:{title:"自定义标题1"}}},H0vN:function(t,e){},NHnr:function(t,e,n){"use strict";function i(t){var e=[],n=[window.location.search.split("?")[1]||"",window.location.hash.split("?")[1]||""].join("&");return n.split("&").forEach(function(t,n){if(""!==t){var i=t.split("=");e[i[0]]=decodeURIComponent(i[1])}}),n=null,t?e[t]||null:e}function o(t){n("D8vU")}function a(t){n("myGc"),n("XkY/")}Object.defineProperty(e,"__esModule",{value:!0});var r=n("7+uW"),s=n("v5o6"),l=n.n(s),u=n("Dd8w"),c=n.n(u),d=n("bOdI"),h=n.n(d),p=n("NYxO"),f={name:"x-loading",props:{},methods:{}},m=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("x-page",{staticClass:"mx-loading"},[n("div",{staticClass:"base"},[n("div",{staticClass:"cube"}),t._v(" "),n("div",{staticClass:"cube"}),t._v(" "),n("div",{staticClass:"cube"}),t._v(" "),n("div",{staticClass:"cube"}),t._v(" "),n("div",{staticClass:"cube"}),t._v(" "),n("div",{staticClass:"cube"}),t._v(" "),n("div",{staticClass:"cube"}),t._v(" "),n("div",{staticClass:"cube"}),t._v(" "),n("div",{staticClass:"cube"})])])},g=[],w={render:m,staticRenderFns:g},v=w,_=n("VU/8"),y=o,x=_(f,v,!1,y,"data-v-176cd6b2",null),S=x.exports,b=(h()({},S.name,S),c()({},Object(p.b)({user:function(t){return t.user},app:function(t){return t.app}})),{name:"app",components:h()({},S.name,S),computed:c()({},Object(p.b)({user:function(t){return t.user},app:function(t){return t.app}})),watch:{"user.profile":function(){var t=this;setTimeout(function(){t.$store.commit("set_page_ready",!0)},100)}},data:function(){return{windowHeight:window.innerHeight+"px",token:""}},mounted:function(){function t(){window.removeEventListener("hashchange",t,!1),e.app.pageReady||(console.log("fixedWxCallbackForAndroid"),window.location.reload())}var e=this;this.$store.commit("set_page_ready",!0),window.addEventListener("hashchange",t,!1)},beforeCreate:function(){var t=this;if(i("debug")){var e=n("Lw6n");t.vConsole=new e}},methods:{onLogin:function(){var t=this,e=window.location.href.split("#/")[1],n=e.split("?")[1],i=e.split("?")[0];n=n?i?"?"+n+"&router="+i+"&loadurl="+window.location.href.split("?")[0]:"?"+n+"&loadurl="+window.location.href.split("?")[0]:i?"?router="+i+"&loadurl="+window.location.href.split("?")[0]:"?loadurl="+window.location.href.split("?")[0];var o={redirect_uri:"https://meilihua.06baobao.com/public/authorize.html"+n};this.axios({headers:{"Content-Type":"application/x-www-form-urlencoded"},url:"interface/Login/auth",method:"POST",data:o}).then(function(e){1===e.code?window.location.replace(e.data):t.showAlert(e.msg)})}}}),k=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{style:{overflow:"auto",height:"100%"},attrs:{id:"app"}},[t.app.pageReady?[n("router-view"),t._v(" "),n("div",{directives:[{name:"transfer-dom",rawName:"v-transfer-dom"}]},[t.app.browser.wechat?n("remote-script",{attrs:{src:"https://res.wx.qq.com/open/js/jweixin-1.2.0.js"}}):t._e()],1)]:n("x-loading")],2)},C=[],T={render:k,staticRenderFns:C},I=T,$=n("VU/8"),M=a,O=$(b,I,!1,M,null,null),V=O.exports,A=n("/ocq");r.a.use(A.a);var B=new A.a({mode:"hash",routes:n("OFFm").default});B.afterEach(function(t,e){});var N=B,j=n("//Fk"),D=n.n(j),F=n("mvHQ"),L=n.n(F),R=n("mtWM"),E=n.n(R),P=n("2hMI").default,U=JSON.parse(localStorage.getItem("ticket_"+P.clientId))||{};for(var H in P.forceGrantType){if(!!navigator.userAgent.match(new RegExp(H,"i"))){P.grantType=P.forceGrantType[H];break}}(U.expires_at&&U.expires_at<parseInt((new Date).getTime()/1e3)||U.grant_type!==P.grantType)&&(localStorage.removeItem("ticket_"+P.clientId),U={});var Y={state:{ticket:U,profile:{}},mutations:{set_ticket:function(t,e){localStorage.setItem("ticket_"+P.clientId,L()(e)),t.ticket=e},set_user_profile:function(t,e){t.profile=e}},actions:{get_access_token:function(t){var e=t.commit,o=(t.state,{client_id:P.clientId,client_secret:P.clientSecret,grant_type:P.grantType});if("authorization_code"===P.grantType){var a=i("code");if(!a)throw new Error("没有检测到code参数");o.code=a}else"temporary_auth"===P.grantType&&(o.uuid=localStorage.getItem("uuid")||n("DtRx")(),localStorage.setItem("uuid",o.uuid));return E()({url:"oauth/access_token",method:"POST",data:o}).then(function(t){if("SUCCESS"!==t.error_code)throw new Error(t.reason);return e("set_ticket",{grant_type:P.grantType,access_token:t.result.access_token,expires_at:parseInt((new Date).getTime()/1e3)+t.result.expires_in,openid:t.result.openid}),t})},get_user_profile:function(t){var e=t.commit;t.state;return E()({url:"user/info",method:"POST"}).then(function(t){if("SUCCESS"!==t.error_code)throw new Error(t.reason);return e("set_user_profile",t.result),t})},redirect_authorize:function(t){var e=this,n=(t.commit,t.state,window.location.href.split("#/")[1]),i=n.split("?")[1],o=n.split("?")[0];i=i?o?"?"+i+"&router="+o+"&loadurl="+window.location.href.split("?")[0]:"?"+i+"&loadurl="+window.location.href.split("?")[0]:o?"?router="+o+"&loadurl="+window.location.href.split("?")[0]:"?loadurl="+window.location.href.split("?")[0];var a={redirect_uri:"https://meilihua.06baobao.com/public/authorize.html"+i};E()({headers:{"Content-Type":"application/x-www-form-urlencoded"},url:"interface/Login/auth",method:"POST",data:a}).then(function(t){1===t.code?window.location.replace(t.data):e.showAlert(t.msg)})},check_authorize:function(t){var e=t.dispatch,n=t.state;return new D.a(function(t,i){return void 0!==n.ticket.access_token?n.profile.openid?t(!0):e("get_user_profile").then(function(e){return t(!0)}):e("get_access_token").then(function(n){return e("get_user_profile").then(function(e){return t(!0)})}).catch(function(t){return i(new Error("登录失效"))})})},logout:function(t){t.dispatch,t.state;localStorage.removeItem("ticket_"+P.clientId)}},getters:{}},z=n("woOf"),q=n.n(z),W=n("2hMI").default,X=n("Ew4p").default,Z=W.shareConfig.wechat,G={state:{isLoaded:!1},mutations:{set_jssdk_state:function(t,e){t.isLoaded=e},set_jssdk_scene:function(t,e){if(!X.hasOwnProperty(e))throw new Error("分享场景不存在");if(void 0===window.wx)throw new Error("微信jssdk未加载");var n=q()(X.default,X[e]);console.log("切换分享场景为"+e,n);var i=window.wx;Z.jsApiList.indexOf("onMenuShareTimeline")>-1&&i.onMenuShareTimeline(n),Z.jsApiList.indexOf("onMenuShareAppMessage")>-1&&i.onMenuShareAppMessage(n)},set_jssdk_custom:function(t,e){if(void 0===window.wx)throw new Error("微信jssdk未加载");console.log("设置自定义分享信息");var n=window.wx;Z.jsApiList.indexOf("onMenuShareTimeline")>-1&&n.onMenuShareTimeline(e),Z.jsApiList.indexOf("onMenuShareAppMessage")>-1&&n.onMenuShareAppMessage(e)}},actions:{get_jssdk_config:function(t){t.commit,t.state;return E()({url:"wechat/jssdk",method:"POST",data:{apis:Z.jsApiList||[],debug:Z.debug?1:0,beta:Z.beta?1:0,url:window.location.href.split("#")[0]}}).then(function(t){if("SUCCESS"!==t.error_code)throw new Error(t.reason);return t})}},getters:{}},Q=navigator.userAgent,J={state:{token:localStorage.getItem("token"),bind:localStorage.getItem("bind"),pageReady:!1,browser:{ios:!!Q.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),android:Q.indexOf("Android")>-1||Q.indexOf("Linux")>-1,iPhone:Q.indexOf("iPhone")>-1,iPad:Q.indexOf("iPad")>-1,wechat:!!Q.match(/MicroMessenger/i),weibo:!!Q.match(/WeiBo/i),qq:!!Q.match(/QQ/i)},language:(navigator.browserLanguage||navigator.language).toLowerCase()},mutations:{set_page_ready:function(t,e){t.pageReady=e}},actions:{},getters:{}};r.a.use(p.a);var K=new p.a.Store({modules:{user:Y,jssdk:G,app:J}}),tt=n("oVYx"),et=n("Peep"),nt=n("Y+qm"),it=n("3BeM"),ot=n("NXWw");n("H0vN");r.a.use(tt.a),r.a.use(et.a),r.a.use(nt.a),r.a.use(it.a),r.a.use(ot.a),n("4npp"),l.a.attach(document.body),r.a.config.productionTip=!1,r.a.prototype.getQueryString=function(t){var e=[],n=[window.location.search.split("?")[1]||"",window.location.hash.split("?")[1]||""].join("&");return n.split("&").forEach(function(t,n){if(""!==t){var i=t.split("=");e[i[0]]=decodeURIComponent(i[1])}}),n=null,t?e[t]||null:e},r.a.prototype.setUrl=function(t){return"https://meilihua.oss-cn-hangzhou.aliyuncs.com/"+t},r.a.prototype.showAlert=function(t){this.$vux.alert.show({title:"提示",content:t,onShow:function(){},onHide:function(){}})},r.a.prototype.onLogin=function(){var t=window.location.href.split("#/")[1],e=t.split("?")[1],n=t.split("?")[0];e=e?n?"?"+e+"&router="+n+"&loadurl="+window.location.href.split("?")[0]:"?"+e+"&loadurl="+window.location.href.split("?")[0]:n?"?router="+n+"&loadurl="+window.location.href.split("?")[0]:"?loadurl="+window.location.href.split("?")[0];var i={redirect_uri:"https://meilihua.06baobao.com/public/authorize.html"+e};E()({headers:{"Content-Type":"application/x-www-form-urlencoded"},url:"interface/Login/auth",method:"POST",data:i}).then(function(t){1===t.code?(console.log(t.data,"response.data"),window.location.replace(t.data)):r.a.prototype.showAlert(t.msg)})},r.a.prototype.hideLoading=function(){this.$vux.loading.hide()},r.a.prototype.setWechat=function(){var t=window.wx,e="http://h5.06baobao.com/#/";t.ready(function(){console.log("分享设置成功！"),K.state.hasSetWechat=!0,t.onMenuShareAppMessage({title:"美丽花亲子时光",desc:"",link:e,imgUrl:"https://meilihua.oss-cn-hangzhou.aliyuncs.com/program/images/home.png",type:"link",dataUrl:"",success:function(t){console.log(e,"分享成功！")},cancel:function(){}}),t.onMenuShareTimeline({title:"美丽花亲子时光",link:e,imgUrl:"https://meilihua.oss-cn-hangzhou.aliyuncs.com/program/images/home.png",success:function(t){console.log("分享到朋友圈成功")},cancel:function(){}})})},r.a.prototype.initWechatShare=function(){var t=this;E()({url:"interface/Login/getJssdk",method:"POST",data:{apis:["onMenuShareTimeline","onMenuShareAppMessage","hideMenuItems"],debug:!1,beta:1,url:window.location.href.split("#")[0]}}).then(function(e){1===e.code||"1"===e.code?(e.data.jsApiList=e.data.jsApiList.split(","),console.log("设置分享",e),"false"===e.data.debug&&(e.data.debug=!1),window.wx.config(e.data),sessionStorage.setItem("hasSetShare",1),t.setWechat()):console.log("code錯誤",e)})},N.beforeEach(function(t,e,n){if(localStorage.getItem("token"))sessionStorage.getItem("hasSetShare")||(r.a.prototype.initWechatShare(),console.log(111111111,"share111")),"0"===localStorage.getItem("bind")&&"/login"!==t.path?n({path:"/login"}):n();else if(r.a.prototype.getQueryString().code){var i=r.a.prototype.getQueryString().code,o={code:i};E()({headers:{"Content-Type":"application/x-www-form-urlencoded"},url:"interface/Login/userInfo",method:"POST",data:o}).then(function(t){console.log("获取用户信息",t),1===t.code?(localStorage.setItem("bind",t.data.bind),K.state.bind=localStorage.getItem("bind"),localStorage.setItem("token",t.data.token),K.state.token=localStorage.getItem("token"),console.log(localStorage.getItem("bind"),"111111",K.state.bind,"store.state.token",K.state.token,"apppppppppppp"),r.a.prototype.initWechatShare(),console.log(2222222222,"share222"),0===t.data.bind?n({path:"/login"}):n()):r.a.prototype.onLogin()})}else r.a.prototype.onLogin()}),n("5j+u"),new r.a({router:N,store:K,render:function(t){return t(V)}}).$mount("#app-box")},OFFm:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=[];i.push({path:"/",name:"index",meta:{authorize:!0},component:function(){return n.e(0).then(n.bind(null,"2NXm"))}}),i.push({path:"/drop",name:"drop",meta:{authorize:!1},component:function(){return n.e(6).then(n.bind(null,"wC07"))}}),i.push({path:"*",name:"404",component:function(){return n.e(5).then(n.bind(null,"c5Mg"))}}),i.push({path:"/courseDetail",name:"courseDetail",component:function(){return n.e(4).then(n.bind(null,"NCTG"))}}),i.push({path:"/pay",name:"pay",component:function(){return n.e(1).then(n.bind(null,"84dg"))}}),i.push({path:"/login",name:"login",component:function(){return n.e(2).then(n.bind(null,"Luci"))}}),i.push({path:"/couponList",name:"couponList",component:function(){return n.e(3).then(n.bind(null,"iQ43"))}}),e.default=i},UNGY:function(t,e,n){"use strict";function i(t){n("2lnh")}function o(t){n("qHQD")}function a(t){n("3k2l")}function r(t){n("jYbJ")}var s=n("fZjL"),l=n.n(s),u=(String,Boolean,{name:"icon",props:{type:String,isMsg:Boolean},computed:{className:function(){return"weui-icon weui_icon_"+this.type+" weui-icon-"+this.type.replace(/_/g,"-")}}}),c=function(){var t=this,e=t.$createElement;return(t._self._c||e)("i",{class:[t.className,t.isMsg?"weui-icon_msg":""]})},d=[],h={render:c,staticRenderFns:d},p=h,f=n("VU/8"),m=i,g=f(u,p,!1,m,null,null),w=g.exports,v=n("zV4+"),_=n("wmxo"),y=(_.a,String,String,String,String,String,String,Number,String,String,{name:"group",methods:{cleanStyle:_.a},props:{title:String,titleColor:String,labelWidth:String,labelAlign:String,labelMarginRight:String,gutter:[String,Number],footerTitle:String,footerTitleColor:String}}),x=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.title?n("div",{staticClass:"weui-cells__title",style:t.cleanStyle({color:t.titleColor}),domProps:{innerHTML:t._s(t.title)}}):t._e(),t._v(" "),t._t("title"),t._v(" "),n("div",{staticClass:"weui-cells",class:{"vux-no-group-title":!t.title},style:t.cleanStyle({marginTop:"number"==typeof t.gutter?t.gutter+"px":t.gutter})},[t._t("after-title"),t._v(" "),t._t("default")],2),t._v(" "),t.footerTitle?n("div",{staticClass:"weui-cells__title vux-group-footer-title",style:t.cleanStyle({color:t.footerTitleColor}),domProps:{innerHTML:t._s(t.footerTitle)}}):t._e()],2)},S=[],b={render:x,staticRenderFns:S},k=b,C=n("VU/8"),T=o,I=C(y,k,!1,T,null,null),$=I.exports,M={name:"inline-desc"},O=function(){var t=this,e=t.$createElement;return(t._self._c||e)("span",{staticClass:"vux-label-desc"},[t._t("default")],2)},V=[],A={render:O,staticRenderFns:V},B=A,N=n("VU/8"),j=a,D=N(M,B,!1,j,null,null),F=D.exports,L=n("KRg4"),R=n("ODCk"),E=(L.a,String,String,String,String,String,Number,Number,String,String,String,String,String,String,String,String,Boolean,Number,Number,String,String,String,Function,Boolean,Array,Array,Boolean,String,Function,Function,Object,{name:"datetime",mixins:[L.a],components:{Group:$,InlineDesc:F,Icon:w},props:{format:{type:String,default:"YYYY-MM-DD",validator:function(t){return!0}},title:String,value:{type:String,default:""},inlineDesc:String,placeholder:String,minYear:Number,maxYear:Number,confirmText:String,cancelText:String,clearText:String,yearRow:{type:String,default:"{value}"},monthRow:{type:String,default:"{value}"},dayRow:{type:String,default:"{value}"},hourRow:{type:String,default:"{value}"},minuteRow:{type:String,default:"{value}"},required:{type:Boolean,default:!1},minHour:{type:Number,default:0},maxHour:{type:Number,default:23},startDate:{type:String,validator:function(t){return!t||10===t.length}},endDate:{type:String,validator:function(t){return!t||10===t.length}},valueTextAlign:String,displayFormat:Function,readonly:Boolean,hourList:Array,minuteList:Array,show:Boolean,defaultSelectedValue:String,computeHoursFunction:Function,computeDaysFunction:Function,orderMap:Object},created:function(){this.isFirstSetValue=!1,this.currentValue=this.value},data:function(){return{currentShow:!1,currentValue:null,valid:!0,errors:{}}},mounted:function(){var t=this,e=this.uuid;this.$el.setAttribute("id","vux-datetime-"+e),this.readonly||this.$nextTick(function(){t.render(),t.show&&t.$nextTick(function(){t.picker&&t.picker.show(t.currentValue)})})},computed:{styles:function(){return this.$parent?{width:this.$parent.labelWidth,textAlign:this.$parent.labelAlign,marginRight:this.$parent.labelMarginRight}:{}},pickerOptions:function(){var t=this,e={trigger:"#vux-datetime-"+this.uuid,format:this.format,value:this.currentValue,output:".vux-datetime-value",confirmText:t.getButtonText("confirm"),cancelText:t.getButtonText("cancel"),clearText:t.clearText,yearRow:this.yearRow,monthRow:this.monthRow,dayRow:this.dayRow,hourRow:this.hourRow,minuteRow:this.minuteRow,minHour:this.minHour,maxHour:this.maxHour,startDate:this.startDate,endDate:this.endDate,hourList:this.hourList,minuteList:this.minuteList,defaultSelectedValue:this.defaultSelectedValue,computeHoursFunction:this.computeHoursFunction,computeDaysFunction:this.computeDaysFunction,orderMap:this.orderMap||{},onSelect:function(e,n,i){t.picker&&t.picker.config.renderInline&&(t.$emit("input",i),t.$emit("on-change",i))},onConfirm:function(e){t.currentValue=e},onClear:function(e){t.$emit("on-clear",e)},onHide:function(e){t.currentShow=!1,t.$emit("update:show",!1),t.validate(),t.$emit("on-hide",e),"cancel"===e&&t.$emit("on-cancel"),"confirm"===e&&setTimeout(function(){t.$nextTick(function(){t.$emit("on-confirm",t.value)})})},onShow:function(){t.currentShow=!0,t.$emit("update:show",!0),t.$emit("on-show")}};return this.minYear&&(e.minYear=this.minYear),this.maxYear&&(e.maxYear=this.maxYear),e},firstError:function(){var t=l()(this.errors)[0];return this.errors[t]},labelClass:function(){return this.$parent?{"vux-cell-justify":"justify"===this.$parent.labelAlign||"justify"===this.$parent.$parent.labelAlign}:{}}},methods:{getButtonText:function(t){return"cancel"===t&&this.cancelText?this.cancelText:"confirm"===t&&this.confirmText?this.confirmText:this.$el.getAttribute("data-"+t+"-text")},render:function(){var t=this;this.$nextTick(function(){t.picker&&t.picker.destroy(),t.picker=new v.a(t.pickerOptions)})},validate:function(){if(!this.currentValue&&this.required)return this.valid=!1,void(this.errors.required="必填");this.valid=!0,this.errors={}}},watch:{readonly:function(t){t?this.picker&&this.picker.destroy():this.render()},show:function(t){t!==this.currentShow&&(t?this.picker&&this.picker.show(this.currentValue):this.picker&&this.picker.hide(this.currentValue))},currentValue:function(t,e){this.$emit("input",t),this.isFirstSetValue?this.$emit("on-change",t):(this.isFirstSetValue=!0,e&&this.$emit("on-change",t)),this.validate()},startDate:function(){this.render()},endDate:function(){this.render()},format:function(t){this.currentValue&&(this.currentValue=Object(R.a)(this.currentValue,t)),this.render()},value:function(t){if(this.readonly||this.picker&&this.picker.config.renderInline)return void(this.currentValue=t);this.currentValue!==t&&(this.currentValue=t,this.render())}},beforeDestroy:function(){this.picker&&this.picker.destroy()}}),P=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("a",{staticClass:"vux-datetime weui-cell",class:{"weui-cell_access":!t.readonly},attrs:{"data-cancel-text":"取消","data-confirm-text":"确定",href:"javascript:"}},[t._t("default",[n("div",[t._t("title",[n("p",{class:t.labelClass,style:t.styles,domProps:{innerHTML:t._s(t.title)}})]),t._v(" "),t.inlineDesc?n("inline-desc",[t._v(t._s(t.inlineDesc))]):t._e()],2),t._v(" "),n("div",{staticClass:"weui-cell__ft vux-cell-primary vux-datetime-value",style:{textAlign:t.valueTextAlign}},[!t.currentValue&&t.placeholder?n("span",{staticClass:"vux-cell-placeholder"},[t._v(t._s(t.placeholder))]):t._e(),t._v(" "),t.currentValue?n("span",{staticClass:"vux-cell-value"},[t._v(t._s(t.displayFormat?t.displayFormat(t.currentValue):t.currentValue))]):t._e(),t._v(" "),n("icon",{directives:[{name:"show",rawName:"v-show",value:!t.valid,expression:"!valid"}],staticClass:"vux-input-icon",attrs:{type:"warn",title:t.firstError}})],1)])],2)},U=[],H={render:P,staticRenderFns:U},Y=H,z=n("VU/8"),q=r,W=z(E,Y,!1,q,null,null);e.a=W.exports},"XkY/":function(t,e){},"Y+Ki":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("//Fk"),o=n.n(i),a=n("7+uW"),r=n("mtWM"),s=n.n(r),l=n("Rf8U"),u=n.n(l),c=n("2hMI").default,d=n("M4fF"),h=n("SkeF");s.a.defaults.baseURL=c.baseURL,s.a.defaults.withCredentials=c.withCredentials,s.a.interceptors.request.use(function(t){if(t.headers={"Content-Type":"application/x-www-form-urlencoded"},t.data=h.stringify(t.data),c.clientId.length>0&&localStorage.hasOwnProperty("ticket_"+c.clientId)){var e=JSON.parse(localStorage.getItem("ticket_"+c.clientId))||{};e.expires_at<parseInt(d.now()/1e3)?localStorage.removeItem("ticket_"+c.clientId):t.headers["X-Token"]=e.access_token}return t},function(t){return o.a.reject(t)}),s.a.interceptors.response.use(function(t){return t.data},function(t){if(401===t.response.status)localStorage.setItem("token","");else if(400===t.response.status)return o.a.reject(t.response.data.reason||"未知错误");return o.a.reject(t)}),a.a.use(u.a,s.a)},jYbJ:function(t,e){},kllH:function(t,e){},lFAX:function(t,e){},myGc:function(t,e){},mzja:function(t,e,n){"use strict";function i(t){n("55wj")}var o=n("/kga"),a=(o.a,Boolean,String,String,String,Boolean,String,String,Number,String,{name:"alert",components:{XDialog:o.a},created:function(){void 0!==this.value&&(this.showValue=this.value)},props:{value:Boolean,title:String,content:String,buttonText:String,hideOnBlur:{type:Boolean,default:!1},maskTransition:{type:String,default:"vux-mask"},dialogTransition:{type:String,default:"vux-dialog"},maskZIndex:[Number,String]},data:function(){return{showValue:!1}},methods:{_onHide:function(){this.showValue=!1}},watch:{value:function(t){this.showValue=t},showValue:function(t){this.$emit("input",t)}}}),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-alert"},[n("x-dialog",{attrs:{"mask-transition":t.maskTransition,"dialog-transition":t.dialogTransition,"hide-on-blur":t.hideOnBlur,"mask-z-index":t.maskZIndex},on:{"on-hide":function(e){t.$emit("on-hide")},"on-show":function(e){t.$emit("on-show")}},model:{value:t.showValue,callback:function(e){t.showValue=e},expression:"showValue"}},[n("div",{staticClass:"weui-dialog__hd"},[n("strong",{staticClass:"weui-dialog__title"},[t._v(t._s(t.title))])]),t._v(" "),n("div",{staticClass:"weui-dialog__bd"},[t._t("default",[n("div",{domProps:{innerHTML:t._s(t.content)}})])],2),t._v(" "),n("div",{staticClass:"weui-dialog__ft"},[n("a",{staticClass:"weui-dialog__btn weui-dialog__btn_primary",attrs:{href:"javascript:;"},on:{click:t._onHide}},[t._v(t._s(t.buttonText||"确定"))])])])],1)},s=[],l={render:r,staticRenderFns:s},u=l,c=n("VU/8"),d=i,h=c(a,u,!1,d,null,null);e.a=h.exports},nnSp:function(t,e){},qHQD:function(t,e){},rLAy:function(t,e,n){"use strict";function i(t){n("kllH")}var o=n("xNvf"),a=(o.a,Boolean,Number,String,String,String,Boolean,String,String,{name:"toast",mixins:[o.a],props:{value:Boolean,time:{type:Number,default:2e3},type:{type:String,default:"success"},transition:String,width:{type:String,default:"7.6em"},isShowMask:{type:Boolean,default:!1},text:String,position:String},data:function(){return{show:!1}},created:function(){this.value&&(this.show=!0)},computed:{currentTransition:function(){return this.transition?this.transition:"top"===this.position?"vux-slide-from-top":"bottom"===this.position?"vux-slide-from-bottom":"vux-fade"},toastClass:function(){return{"weui-toast_forbidden":"warn"===this.type,"weui-toast_cancel":"cancel"===this.type,"weui-toast_success":"success"===this.type,"weui-toast_text":"text"===this.type,"vux-toast-top":"top"===this.position,"vux-toast-bottom":"bottom"===this.position,"vux-toast-middle":"middle"===this.position}},style:function(){if("text"===this.type&&"auto"===this.width)return{padding:"10px"}}},watch:{show:function(t){var e=this;t&&(this.$emit("input",!0),this.$emit("on-show"),this.fixSafariOverflowScrolling("auto"),clearTimeout(this.timeout),this.timeout=setTimeout(function(){e.show=!1,e.$emit("input",!1),e.$emit("on-hide"),e.fixSafariOverflowScrolling("touch")},this.time))},value:function(t){this.show=t}}}),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"vux-toast"},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowMask&&t.show,expression:"isShowMask && show"}],staticClass:"weui-mask_transparent"}),t._v(" "),n("transition",{attrs:{name:t.currentTransition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"weui-toast",class:t.toastClass,style:{width:t.width}},[n("i",{directives:[{name:"show",rawName:"v-show",value:"text"!==t.type,expression:"type !== 'text'"}],staticClass:"weui-icon-success-no-circle weui-icon_toast"}),t._v(" "),t.text?n("p",{staticClass:"weui-toast__content",style:t.style,domProps:{innerHTML:t._s(t.text)}}):n("p",{staticClass:"weui-toast__content",style:t.style},[t._t("default")],2)])])],1)},s=[],l={render:r,staticRenderFns:s},u=l,c=n("VU/8"),d=i,h=c(a,u,!1,d,null,null);e.a=h.exports}},["NHnr"]);
//# sourceMappingURL=app.e5b1be9a4d7fa6d0efbb.js.map