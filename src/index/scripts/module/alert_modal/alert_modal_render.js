/**
 * Created by pz 
 */
 //提示框渲染模块
 //标题,内容,左按钮，右按钮
module.exports = function (title,content,leftBtn,rightBtn){
    var data = {
    title: title,
    content:content,
    leftBtn:leftBtn,
    rightBtn:rightBtn
};
var html = template('alert-modal', data);
    return html;
}