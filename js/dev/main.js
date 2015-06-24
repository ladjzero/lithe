/**
 * Created by chenzhuo on 15-6-20.
 */

init();

define(['ko', 'jquery', 'sdk'], function (ko, $) {

    var wb = WB2;

    $.get('http://crossorigin.me/http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US', function (data) {
            $('body').css({
                background: 'url(http://bing.com' + JSON.parse(data).images[0].url + ')',
                'background-attachment': 'fixed'
            });
            console.log(data);
        }
    );

    var p = {
        anyWhere: function () {
            return new Promise(wb.anyWhere);
        },
        parseCMD: function (W, url, method) {
            return new Promise(function (resolve) {
                W.parseCMD(url, resolve, {uid: wb.oauthData.uid}, {method: method});
            });
        }
    }

    var promise = Promise
        .resolve(wb.checkLogin())
        .then(function (logined) {
            return logined ? null : new Promise(wb.login);
        })
        .then(p.anyWhere)
        .then(function (W) {
            Promise
                .resolve()
                .then(function () {
                    return p.parseCMD(W, '/users/show.json', 'get');
                })
                .then(function (data, success) {
                    console.log(data);
                    ko.applyBindings(data, document.getElementById('profile'));
                });

            Promise
                .resolve()
                .then(function () {
                    return p.parseCMD(W, '/statuses/home_timeline.json', 'get');
                })
                .then(function (data, success)  {
                    console.log(data);
                    ko.applyBindings(data, document.getElementById('weibos'));
                });
        });
});

function init () {
    requirejs.config({
        baseUrl: 'js/dev',
        paths: {
            sdk: 'http://tjs.sjs.sinajs.cn/open/api/js/wb.js?appkey=3942605728&debug=true',
            ko: 'lib/knockout',
            jquery: 'lib/jquery'
        }
    });
}
