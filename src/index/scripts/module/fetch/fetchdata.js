/**
 * Created by pz 
 */
var AjaxReady = require('./ajaxready.js');
var loading_ie9_show = require('../loading/loading_ie9_show.js');
var loading_ie9_hide = require('../loading/loading_ie9_hide.js');
var getDays = require('../getdays.js');
module.exports = function (){
    //数据loading
    loading_ie9_show();//数据加载完毕前
    //var ajaxUrl = 'http://huichuanda.ews.m.jaeapp.com/dappei/get_customer_dashboard_stats/?customer_id=1';//测试
    //var ajaxUrl ='/mock/UserMsg.json';//ie9本地测试使用
    //线上
    var ajaxUrl = '/dappei/get_customer_dashboard_stats/';//线上
    //线上
    $.ajax(ajaxUrl,{
    type:'get',
    dataType:'json',
    success:function(data){
                userMsg = data;
            userMsg['outfitting_enabled'] = true;//模拟返回开关的状态
            var date = new Date();//更新时间处理
            userMsg['updata_time_year'] =  date.getFullYear();//年
            if(date.getMonth()<9){
                var Mon = '0'+(date.getMonth()+1);
            }else{
                var Mon = date.getMonth()+1;
            }
            userMsg['updata_time_mon'] = Mon;//月
            userMsg['updata_time_day'] = Timeformat(date.getDay());//日
            userMsg['updata_time_h'] = Timeformat(date.getHours());//时
            userMsg['updata_time_min'] = Timeformat(date.getMinutes());//分
            function Timeformat(time){
                //格式化时间  日 小时 分
                if(time<10){
                return   '0'+time;
                }else{
                    return time;
                }
            }
            //调用时间计算函数 计算剩余天数
        //  userMsg['ToOverDays']=getDays(userMsg.expiration_date.slice(0,10));
             //线上
        //var expiration_date = new Date(userMsg.expiration_date);
          //  userMsg['to_over_days']=getDays(expiration_date);
            //userMsg['expiration_date'] = formatDate(new Date(userMsg.expiration_date));
            //线上
            //测试
            //调用时间计算函数 计算剩余天数
            userMsg['ToOverDays']=getDays(userMsg.expiration_date.slice(0,10));
           //测试
            ////render Header
            var html = template('header_msg',userMsg);
            $('.msgAndTime').html(html);
            //render indexTip
            $('.indexTip .box').html(template('indexTip',userMsg));
            //render 数字
            $('.CollScore .shopNum ul').html(template('Score_list',userMsg));
            //render 立即续订列表
            $('.msgBox ul').html(template('mgBoxList',userMsg));
            $('.btn_goon').click(function(){
                window.open(userMsg.reorder_link,'');
            })
            //render 搭配开关按键以及下面的文字
            $('.AiBtn').html(template('btn_click',userMsg));
            //render 搭配开关旁边的文字
            $('.AiLeft').append(template('btn_tip',userMsg));
            //渲染搭配数据列表
            $('.dapeiDatalist').append(template('dapeilist',userMsg))
            pct = userMsg.score_pct;
            // customer_id=userMsg.customer_id;
            pct_pct=userMsg.score_pct;
            //测试过期时间
            //console.log(userMsg.expiration_date)
            loading_ie9_hide();//数据加载完毕后
            AjaxReady();
            //console.log(data)
    },
    error:function(errmsg){
            console.log('Ajax fethch数据出现错误');
            for(var a in errmsg){
                console.log(a);
            }

    }
}).always(function(){
    //deffered对象解决异步问题
})
}