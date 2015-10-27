/**
 * Created by chenzhuo on 15-6-20.
 */

// init();
var $ = require('jquery')
var sdk = require('./sdk')
var progress = require('nprogress')
var Vue = require('vue')
var PhotoSwipe = require('photoswipe')
var PhotoSwipeUI = require('photoswipe/src/js/ui/photoswipe-ui-default')
var filters = require('./filters')

Vue.config.debug = true

$(function () {

var WeiboBody = Vue.extend({
    template: '#weibo-body-template',
    props: ['status'],
    methods: {
        save: function () {

        },
        showReposts: function () {

        },
        showComments: function () {
            var status = this.$data.status
            var len = status.comments.length

            if (len) {
                status.comments.splice(0, len)
            } else {
                sdk.comments({
                    id: status.id,
                    before: progress.start,
                    onResult: function (res) {
                        progress.done();
                        status.comments.push.apply(status.comments, res.comments);
                    }
                })
            }
        },
        like: function () {

        }
    }
});

var Gallery = Vue.extend({
    template: '#gallery-template',
    props: ['urls'],
    created: function () {
        var that = this;

        this.$on('imageClick', function (src, srcs) {
            var replace = function (str) {
                return str.replace('thumbnail', 'large')
            }

            src = replace(src)
            srcs = srcs.map(replace)
            
            var gallery = this.gallery = new PhotoSwipe(this.$el, PhotoSwipeUI, srcs.map(function (src) {
                return {
                    src: src,
                    w: 10,
                    h: 10
                }
            }, {index: srcs.indexOf(src)}))

            gallery.listen('imageLoadComplete', function (index, item) {
                var img = gallery.currItem.container.lastChild
                item.w = img.naturalWidth
                item.h = img.naturalHeight
                gallery.updateSize()
            })

            gallery.init()
        })
    }
})

var Images = Vue.extend({
    template: '#images-template',
    props: ['urls'],
    methods: {
        clickImage: function (e) {
            this.$dispatch('imageClick', e.target.src, this.urls.map(function (url) {
                return url.thumbnail_pic
            }))
        }
    }
})

Vue.component('weibo-body', WeiboBody)
Vue.component('gallery', Gallery)
Vue.component('images', Images)

Vue.filter('pluck', function (value, key) {
    return value.map(function (v) {
        return v[key];
    })
})

Vue.filter('linkify', filters.linkify)
Vue.filter('atify', filters.atify)


var App = new Vue({
    el: '#app',
    data: {statuses: []},
    ready: function () {
        this.$on('imageClick', function (src, srcs) {
            this.$broadcast('imageClick', src, srcs)
        });
    }
})

var maxId = 0;
    // var Lithe = ko._lithe = {
    //     sinceId: 0,
    //     maxId: 0,
    //     statuses: ko.observableArray(),
    //     reset: function () {
    //         this.statuses.removeAll();
    //         this.sinceId = 0;
    //         this.maxId = 0;
    //         return this;
    //     },
    //     onComment: function (data) {
    //         if (data.comments().length) {
    //             data.comments.removeAll();
    //         } else {
    //             sdk.comments({
    //                 id: data.id,
    //                 before: progress.start,
    //                 onResult: function (res) {
    //                     progress.done();
    //                     data.comments.push.apply(data.comments, res.comments);
    //                 }
    //             });
    //         }
    //     }
    // };

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
            // Lithe.reset();
            App.$data.statuses = [];
            load();
        });

    // ko.applyBindings(Lithe, document.getElementById('weibos'));

    function onWeiboImageClick(data, e) {
        var src = this.url();

        this.url(this.isLarge() ? src.replace('large', 'thumbnail') : src.replace('thumbnail', 'large'));
    }

    // function attachClickToImages(imageUrls) {
    //     imageUrls.forEach(function (url) {
    //         url.url = ko.observable(url.thumbnail_pic);
    //         url.isLarge = ko.computed(function () {
    //             return url.url().indexOf('/thumbnail/') == -1;
    //         });
    //         url.click = onWeiboImageClick;
    //     });
    // }

    function load() {
        sdk.homeLine({
            query: {
                max_id: maxId
            },
            before: function () {
                progress.start();
                $load.attr('disabled', true);
            },
            onResult: function (data, success) {
                progress.done();
                $load.attr('disabled', false);

                console.log(data);

                data.statuses.forEach(function (status) {
                    status.comments = [];

                    status.retweeted_status && (status.retweeted_status.comments = []);
                });

                maxId = data.max_id;
                App.$data.statuses.push.apply(App.$data.statuses, data.statuses);
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
        })