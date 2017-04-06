module.exports = function(){
//评分动画

        $('.ScoreIcon').radialIndicator({
            barColor: {
                0: '#EB6D6D',
                50: '#EB6D6D',
                51:'#F6C947',
                79:'#F6C947',
                80: '#8ACF54',
                100: '#8ACF54'
            },
            frameNum:100,//设置动画最大值
            frameTime:40//设置动画执行时间
        });
        //dapeiIcon
         $('.beforedapeiIcon').radialIndicator({
            barColor: {
                0: '#EB6D6D',
                50: '#EB6D6D',
                51:'#F6C947',
                79:'#F6C947',
                80: '#8ACF54',
                100: '#8ACF54'
            },
            frameNum:100,//设置动画最大值
            frameTime:30,//设置动画执行时间
            percentage: true,
             barWidth: 2,
        });
           $('.nowIcon').radialIndicator({
            barColor: {
                0: '#EB6D6D',
                50: '#EB6D6D',
                51:'#F6C947',
                79:'#F6C947',
                80: '#8ACF54',
                100: '#8ACF54'
            },
            frameNum:100,//设置动画最大值
            frameTime:40,//设置动画执行时间
            percentage: true,
            barWidth: 2
        });


        var radialObj = $('.ScoreIcon').data('radialIndicator');//获取动画对象
        var radialObj1 = $('.beforedapeiIcon').data('radialIndicator');//获取动画对象
        var radialObj2 = $('.nowIcon').data('radialIndicator');//获取动画对象
        radialObj.animate(userMsg.score_pct);//设置动画数值 //线上
         radialObj1.animate(userMsg.before_score_percent);//线上
          radialObj2.animate(userMsg.current_score_percent);//线上
         // radialObj.animate(pct);//测试
         // radialObj1.animate(pct);//测试
         //  radialObj2.animate(pct);//测试

}