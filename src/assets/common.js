var Rxports = {

    // 取url上的值
    GetQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },

    /**
     * url 构造
     * @param ido
     * @param $params
     * @return
     */
    murl: function (ido, params) {
        var modulename = Rxports.GetQueryString('m');
        var url = "index.php?i=" + window.sysinfo.uniacid + "&c=entry";
        if (typeof(ido) != "undefined") {
            url += '&do=' + ido;
        }
        if (Object.prototype.toString.call(params) === '[object Object]') {
            url += Rxports.urlEncode(params);
        }
        url += '&m=' + modulename;
        return window.sysinfo.siteroot + 'app/' + url;
    },

    /**
     * param 将要转为URL参数字符串的对象
     * key URL参数字符串的前缀
     * encode true/false 是否进行URL编码,默认为true
     *
     * return URL参数字符串
     */
    urlEncode: function (param, key, encode) {
        if (param == null) return '';
        var paramStr = '';
        var t = typeof (param);
        if (t == 'string' || t == 'number' || t == 'boolean') {
            paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
        }
        else {
            for (var i in param) {
                var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
                paramStr += Rxports.urlEncode(param[i], k, encode);
            }
        }
        return paramStr;
    },

    /**
     * API 构造
     * @param apiname 接口名称
     * @param params
     * @return
     */
    apiurl: function (apiname) {
        var url = Rxports.murl('api', {op: apiname, isajax: 1});
        return url;
    },

    /**
     * JS 异步加载
     * @param apiname 接口名称
     * @param params
     * @return
     */
    getScript(url, callback) {
        var head = document.getElementsByTagName('head')[0],
            js = document.createElement('script');

        js.setAttribute('type', 'text/javascript');
        js.setAttribute('src', url);

        head.appendChild(js);

        //执行回调
        var callbackFn = function () {
            if (typeof callback === 'function') {
                callback();
            }
        };
        if (document.all) { //IE
            js.onreadystatechange = function () {
                if (js.readyState == 'loaded' || js.readyState == 'complete') {
                    callbackFn();
                }
            }
        }
        else {
            js.onload = function () {
                callbackFn();
            }
        }
    }
}

module.exports = Rxports
