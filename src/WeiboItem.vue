<template>
  <div class="weibo-header">
    <div class="user">
      <a class="weibo-user-name" href="weibo.com{{status.user.url}}">
        <img class="weibo-avatar img-rounded" src="{{status.user.avatar_hd}}"/>
        <span>{{status.user.screen_name}}</span>
      </a>
    </div>
  </div>
  <p class="weibo-text" v-html="status.text | linkify | atify"></p>

  <weibo-images urls="{{status.pic_urls || []}}"></weibo-images>

  <div class="weibo-operations">
    <a class="btn btn-default" href="#" v-on="click: save">收藏</a>
    <a class="btn btn-default" href="#" v-on="click: showReposts">转发<span v-if="status.reposts_count">({{status.reposts_count}})</span></a>
    <a class="btn btn-default" href="#" v-on="click: showComments">评论<span v-if="status.comments_count">({{status.comments_count}})</span></a>
    <a class="btn btn-default" href="#" v-on="click: like">赞<span v-if="status.attitudes_count">({{status.attitudes_count}})</span></a>
  </div>
  <div class="comments" v-if="status.comments && status.comments.length">
    <ul class="unstyled">
      <li v-repeat="status.comments"><a href="#">{{user.name}}</a>: <span>{{text}}</span></li>
    </ul>
  </div>
  <div class="nested-weibo" v-if="status.retweeted_status">
    <weibo-item status="{{status.retweeted_status}}">
  </div>
</template>

<script>
import progress from 'nprogress'
import WeiboImages from './WeiboImages.vue'
import sdk from './sdk'

module.exports = {
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
  },
  components: {'weibo-images': WeiboImages}
}
</script>
