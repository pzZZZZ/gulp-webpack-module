/**
 * Created by pz 
 */
module.exports = function () {
    $('.loading').shCircleLoader({
        keyframes: "0%   {background:black}\
                    40%  {background:transparent}\
                    60%  {background:transparent}\
                    100% {background:black}"
    });
}