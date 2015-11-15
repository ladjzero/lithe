require('../css/base.css')
require('../css/default-theme.css')
require('nprogress/nprogress.css')
require('fonts.css/fonts.css')
require('ionicons-pre/css/ionicons.css')

var Vue = require('vue')
var App = require('./App.vue')
var sdk = require('./sdk')
var progress = require('nprogress')

require('./registerFilters')

var data = {
  maxId: 0,
  statuses: [],
  comments: [],
  isLoading: false
}

Promise
.resolve(sdk.wb.checkLogin())
.then(function (logined) {
  return logined ? null : new Promise(sdk.wb.login)
})
.then(sdk.anyWhere)
.then(function (W) {
  Promise
  .resolve()
  .then(function () {
    return sdk.parseCMD(W, '/users/show.json', 'get')
  })
  .then(function (data, success) {
    load()
  });
})

function load() {
  sdk.homeLine({
    query: {
      max_id: data.maxId
    },
    before: function () {
      data.isLoading = true;
    },
    onResult: function (res, success) {
      data.isLoading = false;

      console.log(res);

      res.statuses.forEach(function (status) {
        status.comments = [];

        status.retweeted_status && (status.retweeted_status.comments = []);
      });

      data.maxId = res.max_id;
      data.statuses.push.apply(data.statuses, res.statuses);
    }
  });
}

function showComments(statusId) {
  sdk.comments({
    id: statusId,
    before: () => {data.isLoading = true},
    onResult: function (res) {
      data.isLoading = false
      data.comments.length = 0
      // Do not use Array.prototype.push
      data.comments.push.apply(data.comments, res.comments)
    }
  })
}

new Vue({
  el: 'body',
  data: data,
  created: function () {
    this.$on('loadMore', load);
    this.$on('showComments', showComments)
    this.$watch('isLoading', function (newVal, oldVal) {
      progress[newVal ? 'start' : 'done']()
    })
    this.$watch('comments', function (newVal) {
      document.body.className = newVal.length ? 'panel-open' : ''
    })
  },
  components: {
    app: App
  }
})