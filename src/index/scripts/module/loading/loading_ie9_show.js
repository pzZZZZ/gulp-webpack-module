/**
 * Created by pz 
 */
module.exports = function () {
    if (window.navigator.userAgent.indexOf('MSIE 9.0') > -1) {
        $('.IEmodal').fadeIn(400);
    } else {
        $('.modal').fadeIn(400);
    }
}