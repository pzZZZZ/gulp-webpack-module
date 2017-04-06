/**
 * Created by pz 
 */
module.exports = function (overTimeDate) {
    var nowTime = new Date().getTime();
    var overTime = new Date(overTimeDate).getTime();
    var res = (overTime - nowTime) / 1000 / 60 / 60 / 24;
    return parseInt(res);
}