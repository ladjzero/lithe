/**
 * Created by chenzhuo on 15-6-20.
 */

init();

define(['gallery', 'ko', 'jquery', './sdk', 'progress'], function (galleryVM, ko, $, sdk, progress) {
    var Lithe = ko._lithe = {
        sinceId: 0,
        maxId: 0,
        statuses: ko.observableArray(),
        reset: function () {
            this.statuses.removeAll();
            this.sinceId = 0;
            this.maxId = 0;
            return this;
        },
        onComment: function (data) {
            if (data.comments().length) {
                data.comments.removeAll();
            } else {
                sdk.comments({
                    id: data.id,
                    before: progress.start,
                    onResult: function (res) {
                        progress.end();
                        data.comments.push.apply(data.comments, res.comments);
                    }
                });
            }
        }
    };

    var nav = document.querySelector('nav'),
        $nav = $(nav);

    document.addEventListener('scroll', function (e) {
        document._scorllTop = document._scorllTop || 0;

        if (document._scrollTop > (document._scrollTop = document.body.scrollTop)) {
            $nav.removeClass('nav-hide');
        } else {
            $nav.addClass('nav-hide');
        }
    });

    var $load = $('#load-more').click(load),
        $home = $('#home').click(function () {
            Lithe.reset();
            load();
        });

    ko.applyBindings(Lithe, document.getElementById('weibos'));

    function onWeiboImageClick(data, e) {
        var src = this.url();

        this.url(this.isLarge() ? src.replace('large', 'thumbnail') : src.replace('thumbnail', 'large'));
    }

    function attachClickToImages(imageUrls) {
        imageUrls.forEach(function (url) {
            url.url = ko.observable(url.thumbnail_pic);
            url.isLarge = ko.computed(function () {
                return url.url().indexOf('/thumbnail/') == -1;
            });
            url.click = onWeiboImageClick;
        });
    }

    function load() {
        sdk.homeLine({
            query: {
                max_id: Lithe.maxId
            },
            before: function () {
                progress.start();
                $load.attr('disabled', true);
            },
            onResult: function (data, success) {
                progress.end();
                $load.attr('disabled', false);

                console.log(data);

                data.statuses.forEach(function (status) {
                    status.comments = ko.observableArray();

                    status.retweeted_status && (status.retweeted_status.comments = ko.observableArray());
                });

                Lithe.maxId = data.max_id;
                Lithe.statuses.push.apply(Lithe.statuses, data.statuses);
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
                    //ko.applyBindings(data, document.getElementById('profile'));
                });

            load();
        });
});

function init() {
    requirejs.config({
        baseUrl: 'js/dev',
        paths: {
            jssdk: 'http://tjs.sjs.sinajs.cn/open/api/js/wb.js?appkey=3942605728&debug=true',
            ko: 'lib/knockout',
            jquery: 'lib/jquery',
            text: 'lib/text'
        },
        shim: {
            'lib/blueimp-gallery-indicator': {
                deps: ['lib/blueimp-gallery']
            },
            'lib/blueimp-gallery': {
                deps: ['lib/blueimp-helper']
            }
        }
    });
}
