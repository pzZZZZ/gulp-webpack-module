/**
 * Created by pz 
 */
var browser_detect = require('./module/browser_detect.js');
// 浏览器版本判断模块
browser_detect();
var loadingObj = require('./module/loading.js');
//loading模块
var getDiagnosisResult  =require('./module/guide/getDiagnosisResult.js');
//guide模块
var fetchData = require('./module/fetch/fetchdata.js');
jQuery.support.cors = true;
var pct = 0; //测试数据
var timer = null;//数字颜色定时器
var customer_id = null;
var userMsg = null;
var pct_pct = 0; //测试百分比
loadingObj();//实例化loading
if (guideEnable) {
    $(document.body).addClass('guiding');
    //获取店铺诊断结果
    getDiagnosisResult();
}else{
    fetchData();//到达主页面
}
