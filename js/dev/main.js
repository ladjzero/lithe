/**
 * Created by chenzhuo on 15-6-20.
 */

init();

define(['ko', 'jquery', './sdk'], function (ko, $, sdk) {
    var weibosModel = {
        sinceId: 0,
        maxId: 0,
        statuses: ko.observableArray()
    };

    var $load = $('#load-more').click(load);

    ko.applyBindings(weibosModel, document.getElementById('weibos'));

    function onWeiboImageClick (data, e) {
        var src = this.url();

        this.url(this.isLarge() ? src.replace('large', 'thumbnail') : src.replace('thumbnail', 'large'));
    }

    function attachClickToImages (imageUrls) {
        imageUrls.forEach(function (url) {
            url.url = ko.observable(url.thumbnail_pic);
            url.isLarge = ko.computed(function () {
                return url.url().indexOf('/thumbnail/') == -1;
            });
            url.click = onWeiboImageClick;
        });
    }

    function load () {
        sdk.homeLine({
            query: {
                max_id: weibosModel.maxId
            },
            before: function () {
                $load.attr('disabled', true);
            },
            onResult: function (data, success) {
                $load.attr('disabled', false);

                console.log(data);

                data.statuses.forEach(function (status) {
                    status.pic_urls && attachClickToImages(status.pic_urls);

                    status.retweeted_status && status.retweeted_status.pic_urls && attachClickToImages(status.retweeted_status.pic_urls);
                });

                weibosModel.maxId = data.max_id;
                weibosModel.statuses.push.apply(weibosModel.statuses, data.statuses);
            }
        });
    }

    var wb = WB2;

//     $.get('http://crossorigin.me/http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US', function (data) {
//             $('body').css({
//                 background: 'url(http://bing.com' + JSON.parse(data).images[0].url + ')',
//                 'background-attachment': 'fixed'
//             });
//             console.log(data);
//         }
//     );

    var promise = Promise
        .resolve(sdk.wb.checkLogin())
        .then(function (logined) {
            return logined ? null : new Promise(sdk.wb.login);
        })
        .then(sdk.anyWhere)
        .then(function (W) {
            Promise
                .resolve()
                .then(function () {
                    return sdk.parseCMD(W, '/users/show.json', 'get');
                })
                .then(function (data, success) {
                    console.log(data);
                    ko.applyBindings(data, document.getElementById('profile'));
                });

            load();
        });
});

function init () {
    requirejs.config({
        baseUrl: 'js/dev',
        paths: {
            jssdk: 'http://tjs.sjs.sinajs.cn/open/api/js/wb.js?appkey=3942605728&debug=true',
            ko: 'lib/knockout',
            jquery: 'lib/jquery'
        }
    });
}
