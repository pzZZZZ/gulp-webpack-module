/**
 * Created by pz 
 */
//弹窗逻辑模块
module.exports = function (result){
    $('.alert-modal').fadeIn(400);
    //关闭icon 点击 弹窗消失
    $('.close-alert').on('click',function(){
        $('.alert-modal').fadeOut(200).remove();
            $('body').css({'overflow':'auto'});//滚动条处理
        return
    })
    //空白区域点击 弹窗消失
    $('.alert-modal').on('click',function(){
        $('.alert-modal').fadeOut(200).remove();
            $('body').css({'overflow':'auto'});//滚动条处理
        return
    })
    $('body').css({'overflow':'hidden'});//滚动条处理
    //两个button点击后处理
    $('.alert-footer').on('click','button',function(){
        var btnClassName = $(this).attr('class');
            if(btnClassName=='btn-sure'){
                sure();
            }else if(btnClassName=='btn-cancel'){
                  cancel();
                  　
            }
        $('body').css({'overflow':'auto'});//滚动条处理
    })
    function sure(){
        $('.alert-modal').fadeOut(200).remove();
        //success点击确认按钮后执行
        result();
    }
    function cancel(){
        //console.log('cancel')
        $('.alert-modal').fadeOut(200).remove();
    }
}