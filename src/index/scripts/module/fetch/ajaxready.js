/**
 * Created by pz 
 */
var CloseTip = require('../closetip.js');//header下提示模块
var alert_modal_render = require('../alert_modal/alert_modal_render.js');//弹窗渲染模块
var alert_modal = require('../alert_modal/alert_modal.js')//弹窗逻辑模块
var loading_ie9_show = require('../loading/loading_ie9_show.js');//loading显示模块
var loading_ie9_hide = require('../loading/loading_ie9_hide.js');//loading关闭模块
var circle  = require('../fetch/circle.js');//圆形动画模块
module.exports = function (){
    //AjaxReady后操作
    CloseTip()//调用提示框关闭函数
        //数字动画
        //打败百分比动画
        var num1 = $('.CollScore .allScore h6>span').get(0);
        var num2 = $('.dapeiData .allScore h6>span').get(0);
        var options = {
          useEasing : true,
          useGrouping : true,
          separator : '',
          decimal : '',
          prefix : '',
          suffix : ''
        };
        // var demo1 = new CountUp(num1, 0, score_pct , 0, 4, options);//线上
        // var demo2 = new CountUp(num2, 0, score_pct , 0, 4, options);//线上
        var demo1 = new CountUp(num1, 0, pct_pct , 0, 4, options);//测试
        var demo2 = new CountUp(num2, 0, pct_pct , 0, 4, options);//测试
        demo1.start();
        demo2.start();
        Btn_Onoff();//调用开启关闭开关模块
        
        circle()
         //覆盖率动画
        //开启关闭开关模块
    function Btn_Onoff(){
        $('.AiBtn').on('click','img',function(){
            //$('.modal').fadeIn(400);
            //渲染弹窗模板
            //console.log(userMsg['outfitting_enabled'])
            if(userMsg['outfitting_enabled']==true){
                $('body').append(alert_modal_render('关闭智能搭配','是否确定关闭智能搭配？','确定','取消'));
                alert_modal(click_then);
            }else{
                click_then()
            }
            function click_then(){
                loading_ie9_show();
            // var BtnUrl = 'http://huichuanda.ews.m.jaeapp.com/dappei/set_outfitting_enabled/';//测试URL
            var BtnUrl = '/dappei/set_outfitting_enabled/';//线上
            $.ajax(BtnUrl,{
                type:'post',
                dataType:'json',
                data:{
                    customer_id:userMsg.customer_id,//线上
                    // customer_id:customer_id,//测试
                    enabled:!userMsg.outfitting_enabled //开关取反
                },
                success:function(res){
                    //模板内容切换
                    res.enabled==true&&res.message=='ok'?userMsg.outfitting_enabled=true:userMsg.outfitting_enabled=false;
                        $('.AiBtn').html(template('btn_click',userMsg));
                        $('.AiLeft h6').replaceWith(template('btn_tip',userMsg));
                        loading_ie9_hide();
                },
                error:function(err){
                    console.log('Ajax btn error'+err);
                    loading_ie9_hide();
                }
            })
            }
        })
    }
}