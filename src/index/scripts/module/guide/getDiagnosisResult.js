/**
 * Created by mm 
 */
var Slider = require('./slider.js');
var fetchData = require('../fetch/fetchdata.js');
module.exports = function () {
    $.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName + ' in').one(animationEnd, function () {
            $(this).removeClass('animated ' + animationName);
        });
    }
});
var options = {
    $titleEl: $('.guide .title'),
    slideQueue: [{
        stepContainerCls: 'scan-shop',
        subAnimateUnit: [{
            cls: 'scan-img',
            delay: 0
        }, {
            cls: 'scan-tips',
            delay: 100
        }]
    }, {
        stepContainerCls: 'diagnosis',
        subAnimateUnit: [{
            cls: 'diagnosis-img',
            delay: 0
        }, {
            cls: 'diagnosis-result',
            delay: 100
        }]
    }, {
        stepContainerCls: 'ip1',
        time: 3000,
        subAnimateUnit: [{
            cls: 'import-img',
            delay: 0
        }, {
            cls: 'txt',
            delay: 100
        }, {
            cls: 'nav-bullet',
            keep: true,
            delay: 200
        }],
        onSlideIn: function () {
            $('.nav-bullet').addClass('pin');
        }
    }, {
        stepContainerCls: 'ip2',
        time: 3000,
        subAnimateUnit: [{
            cls: 'import-img',
            delay: 0
        }, {
            cls: 'txt',
            delay: 100
        }],
        onSlideIn: function () {
            $('.nav-bullet li').removeClass('active');
            $('.nav-bullet li').eq(1).addClass('active');
        }
    }, {
        stepContainerCls: 'ip3',
        time: 3000,
        subAnimateUnit: [{
            cls: 'import-img',
            delay: 0
        }, {
            cls: 'txt',
            delay: 100
        }],
        onSlideIn: function () {
            $('.nav-bullet li').removeClass('active');
            $('.nav-bullet li').eq(2).addClass('active');
            $('.guide .title').html('智能搭配已开启');
        },
        onSlideOut: function () {
            $(document.body).removeClass('guiding');
            fetchData();

        }
    }]
};
    var slider = new Slider(options);
    slider.next('店铺初始化扫描');
     $('.next-start').eq(0).on('click',function(){
       slider.next('智能搭配开启中...');
    })
    // var ajaxUrl = '/mock/diagnosis.json';
        var ajaxUrl = '/dappei/get_customer_pre_dapei_stats/';
        var scanTime;
        scanTime=setInterval(function(){
            $.ajax(ajaxUrl, {
                    type: 'get',
                    dataType: 'json',
                    success: function (res) {
                            clearInterval(scanTime);
                            setTimeout(function () {
                                    slider.next('店铺状态诊断书');
                                    var html = template('diagnosis-detail', res);
                                    $('.diagnosis-detail-box').html(html);
                            }, 3000);
                        },
                    error: function (err) {
                            console.log('Ajax btn error' + err);
                    }
            })
        },1000)
}