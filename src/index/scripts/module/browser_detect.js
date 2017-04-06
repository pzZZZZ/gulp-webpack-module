/**
 * Created by wenwu on 2017/1/6.
 */
 module.exports = function(){

 var ua = window.navigator.userAgent;

/**
XP-ie6     Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.2; SV1; .NET CLR 1.1.4322; .NET CLR 2.0.50727; .NET CLR 3.0.04506.648; .NET CLR 3.5.21022)
XP-ie7     Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.2; .NET CLR 1.1.4322; .NET CLR 2.0.50727; .NET CLR 3.0.04506.648; .NET CLR 3.5.21022)
XP-ie8     Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.2; Trident/4.0; .NET CLR 1.1.4322; .NET CLR 2.0.50727; .NET CLR 3.0.04506.648; .NET CLR 3.5.21022)
win7-ie8   Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET4.0C; .NET4.0E)
win7-ie9   Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET4.0C; .NET4.0E)
**/

var legacyBrowsers = [{
    name: 'ie6',
    uaKeyword: 'MSIE 6.0'
}, {
    name: 'ie7',
    uaKeyword: 'MSIE 7.0'
}, {
    name: 'ie8',
    uaKeyword: 'MSIE 8.0'
}, {
    name: 'ie9',
    uaKeyword: 'MSIE 9.0'
}];

for (var i = 0; i < legacyBrowsers.length; i++) {
    if(i<=3){
        if (ua.indexOf(legacyBrowsers[i].uaKeyword) > -1) {
        // matched!
        location.href = 'pages/not_support.html';//测试
       //location.href = '/dappei/dashboard/not_support/';//线上
         
    }
    }
    
}
 }
