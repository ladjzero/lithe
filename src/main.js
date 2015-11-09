require('../css/base.css')
require('../css/default-theme.css')
require('nprogress/nprogress.css')

var $ = require('jquery')
var sdk = require('./sdk')
var progress = require('nprogress')
var Vue = require('vue')

require('./registerFilter')

var filters = require('./filters')
import Gallery from './Gallery.vue'
import WeiboItem from './WeiboItem.vue'

Vue.config.debug = true

window.onload = function () {
    Vue.component('weibo-item', WeiboItem)
    Vue.component('gallery', Gallery)

    


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
        App.$data.statuses = [];
        load();
    });


    function onWeiboImageClick(data, e) {
        var src = this.url();

        this.url(this.isLarge() ? src.replace('large', 'thumbnail') : src.replace('thumbnail', 'large'));
    }

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
}
