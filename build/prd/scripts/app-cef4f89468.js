!function(e){function t(i){if(n[i])return n[i].exports;var a=n[i]={exports:{},id:i,loaded:!1};return e[i].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var n={};t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(2)},,function(e,t,n){n(3)();var i=n(4),a=n(5),o=n(7);jQuery.support.cors=!0;i(),guideEnable?($(document.body).addClass("guiding"),a()):o()},function(e,t){e.exports=function(){for(var e=window.navigator.userAgent,t=[{name:"ie6",uaKeyword:"MSIE 6.0"},{name:"ie7",uaKeyword:"MSIE 7.0"},{name:"ie8",uaKeyword:"MSIE 8.0"},{name:"ie9",uaKeyword:"MSIE 9.0"}],n=0;n<t.length;n++)n<=3&&e.indexOf(t[n].uaKeyword)>-1&&(location.href="pages/not_support.html")}},function(e,t){e.exports=function(){$(".loading").shCircleLoader({keyframes:"0%   {background:black}\t                    40%  {background:transparent}\t                    60%  {background:transparent}\t                    100% {background:black}"})}},function(e,t,n){var i=n(6),a=n(7);e.exports=function(){$.fn.extend({animateCss:function(e){this.addClass("animated "+e+" in").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){$(this).removeClass("animated "+e)})}});var e={$titleEl:$(".guide .title"),slideQueue:[{stepContainerCls:"scan-shop",subAnimateUnit:[{cls:"scan-img",delay:0},{cls:"scan-tips",delay:100}]},{stepContainerCls:"diagnosis",subAnimateUnit:[{cls:"diagnosis-img",delay:0},{cls:"diagnosis-result",delay:100}]},{stepContainerCls:"ip1",time:3e3,subAnimateUnit:[{cls:"import-img",delay:0},{cls:"txt",delay:100},{cls:"nav-bullet",keep:!0,delay:200}],onSlideIn:function(){$(".nav-bullet").addClass("pin")}},{stepContainerCls:"ip2",time:3e3,subAnimateUnit:[{cls:"import-img",delay:0},{cls:"txt",delay:100}],onSlideIn:function(){$(".nav-bullet li").removeClass("active"),$(".nav-bullet li").eq(1).addClass("active")}},{stepContainerCls:"ip3",time:3e3,subAnimateUnit:[{cls:"import-img",delay:0},{cls:"txt",delay:100}],onSlideIn:function(){$(".nav-bullet li").removeClass("active"),$(".nav-bullet li").eq(2).addClass("active"),$(".guide .title").html("智能搭配已开启")},onSlideOut:function(){$(document.body).removeClass("guiding"),a()}}]},t=new i(e);t.next("店铺初始化扫描"),$(".next-start").eq(0).on("click",function(){t.next("智能搭配开启中...")});var n;n=setInterval(function(){$.ajax("/mock/diagnosis.json",{type:"get",dataType:"json",success:function(e){clearInterval(n),setTimeout(function(){t.next("店铺状态诊断书");var n=template("diagnosis-detail",e);$(".diagnosis-detail-box").html(n)},3e3)},error:function(e){console.log("Ajax btn error"+e)}})},1e3)}},function(e,t){e.exports=function(e){this.slideQueue_=e.slideQueue,this.$titleEl_=e.$titleEl,this.step_=-1,this.next=function(e){if(++this.step_>0){for(var t=this.slideQueue_[this.step_-1],n=$("."+t.stepContainerCls),i=0;i<t.subAnimateUnit.length;i++)t.subAnimateUnit[i].keep||function(e){var i=t.subAnimateUnit[e];setTimeout(function(){n.find("."+i.cls).animateCss("slideOutLeft")},i.delay)}(i);setTimeout(function(){n.addClass("slide-disappear")},500)}var a=this.slideQueue_[this.step_],o=$("."+a.stepContainerCls);o.addClass("slide-appear");for(var i=0;i<a.subAnimateUnit.length;i++)!function(e){var t=a.subAnimateUnit[e];setTimeout(function(){o.find("."+t.cls).animateCss("slideInRight")},t.delay)}(i);if(void 0!==a.time&&function(e){setTimeout(function(){"function"==typeof a.onSlideOut&&a.onSlideOut(),e.step_+1<e.slideQueue_.length&&e.next()},a.time)}(this),"function"==typeof a.onSlideIn){for(var s=0,i=0;i<a.subAnimateUnit.length;i++)a.subAnimateUnit[i].delay>s&&(s=a.subAnimateUnit[i].delay);setTimeout(function(){a.onSlideIn()},s)}void 0!==e&&this.$titleEl_.html(e)}}},function(e,t,n){var i=n(8),a=n(12),o=n(13),s=n(14);e.exports=function(){a();$.ajax("/mock/UserMsg.json",{type:"get",dataType:"json",success:function(e){function t(e){return e<10?"0"+e:e}userMsg=e,userMsg.outfitting_enabled=!0;var n=new Date;if(userMsg.updata_time_year=n.getFullYear(),n.getMonth()<9)var a="0"+(n.getMonth()+1);else var a=n.getMonth()+1;userMsg.updata_time_mon=a,userMsg.updata_time_day=t(n.getDay()),userMsg.updata_time_h=t(n.getHours()),userMsg.updata_time_min=t(n.getMinutes()),userMsg.ToOverDays=s(userMsg.expiration_date.slice(0,10));var l=template("header_msg",userMsg);$(".msgAndTime").html(l),$(".indexTip .box").html(template("indexTip",userMsg)),$(".CollScore .shopNum ul").html(template("Score_list",userMsg)),$(".msgBox ul").html(template("mgBoxList",userMsg)),$(".btn_goon").click(function(){window.open(userMsg.reorder_link,"")}),$(".AiBtn").html(template("btn_click",userMsg)),$(".AiLeft").append(template("btn_tip",userMsg)),pct=userMsg.score_pct,customer_id=userMsg.customer_id,pct_pct=userMsg.score_pct,o(),i()},error:function(e){console.log("Ajax fethch数据出现错误");for(var t in e)console.log(t)}}).always(function(){})}},function(e,t,n){var i=n(9),a=n(10),o=n(11),s=n(12),l=n(13);e.exports=function(){i();var e=$(".CollScore .allScore h6>span").get(0),t=$(".dapeiData .allScore h6>span").get(0),n={useEasing:!0,useGrouping:!0,separator:"",decimal:"",prefix:"",suffix:""},r=new CountUp(e,0,pct_pct,0,4,n),u=new CountUp(t,0,pct_pct,0,4,n);r.start(),u.start(),function(){$(".AiBtn").on("click","img",function(){function e(){s(),$.ajax("http://huichuanda.ews.m.jaeapp.com/dappei/set_outfitting_enabled/",{type:"post",dataType:"json",data:{customer_id:customer_id,enabled:!userMsg.outfitting_enabled},success:function(e){1==e.enabled&&"ok"==e.message?userMsg.outfitting_enabled=!0:userMsg.outfitting_enabled=!1,$(".AiBtn").html(template("btn_click",userMsg)),$(".AiLeft h6").replaceWith(template("btn_tip",userMsg)),l()},error:function(e){console.log("Ajax btn error"+e),l()}})}1==userMsg.outfitting_enabled?($("body").append(a("关闭智能搭配","是否确定关闭智能搭配？","确定","取消")),o(e)):e()})}(),$(".ScoreIcon").radialIndicator({barColor:{0:"#EB6D6D",50:"#EB6D6D",51:"#F6C947",79:"#F6C947",80:"#8ACF54",100:"#8ACF54"},frameNum:100,frameTime:40,percentage:!0}),$(".ScoreIcon").data("radialIndicator").animate(pct)}},function(e,t){e.exports=function(){$(".close_icon").eq(0).on("click",function(){$(".indexTip").fadeOut(200)})}},function(e,t){e.exports=function(e,t,n,i){var a={title:e,content:t,leftBtn:n,rightBtn:i};return template("alert-modal",a)}},function(e,t){e.exports=function(e){function t(){$(".alert-modal").fadeOut(200).remove(),e()}function n(){$(".alert-modal").fadeOut(200).remove()}$(".alert-modal").fadeIn(400),$(".close-alert").on("click",function(){$(".alert-modal").fadeOut(200).remove(),$("body").css({overflow:"auto"})}),$(".alert-modal").on("click",function(){$(".alert-modal").fadeOut(200).remove(),$("body").css({overflow:"auto"})}),$("body").css({overflow:"hidden"}),$(".alert-footer").on("click","button",function(){var e=$(this).attr("class");"btn-sure"==e?t():"btn-cancel"==e&&n(),$("body").css({overflow:"auto"})})}},function(e,t){e.exports=function(){window.navigator.userAgent.indexOf("MSIE 9.0")>-1?$(".IEmodal").fadeIn(400):$(".modal").fadeIn(400)}},function(e,t){e.exports=function(){window.navigator.userAgent.indexOf("MSIE 9.0")>-1?$(".IEmodal").fadeOut(400):$(".modal").fadeOut(400)}},function(e,t){e.exports=function(e){var t=(new Date).getTime(),n=new Date(e).getTime(),i=(n-t)/1e3/60/60/24;return parseInt(i)}}]);