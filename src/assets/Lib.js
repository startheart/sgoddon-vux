import M from 'assets/common';
import wxShare from '../libs/wechat-share';
import FastClick from 'fastclick';
FastClick.attach(document.body);

var Rxports = {
    M,
    wxShare
};

module.exports = Rxports;

try {
    console.log("欢迎使用 www.admin9.com 开发的云直播模块！");
    console.log("欢迎联系开发者购买使用 QQ：3336253")
    window.qiyue = eval;
} catch (e) {}
