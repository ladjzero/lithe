<style>
  a {
    text-decoration: none;
  }

  span.at {
    font-weight: bold;
  }

  .weibo-header {
    display: flex;
    margin: 24px 24px 0;
    justify-content: space-between;
  }

  .icon *, .icon::before, .icon::after {
    vertical-align: middle;
  }

  .weibo-text {
    margin: 24px;
  }

  .weibo-text a {
    margin: 2px;
  }

  a.linkify:hover {
    text-decoration: underline;
  }

  @media (min-width: 1024px) {
    .comments {
      position: absolute;
      top: 0;
      left: 612px;
      width: 360px;
      background: white;
    }

    .comments ul {
      padding: 0;
    }

    .comments li {
      padding: 6px 12px;
    }
  }

  .comments {
    font-size: small;
  }

  .weibo-operations a {
    color: gray;
  }

  .weibo-operations a span {
    padding: 0 2px;
  }

  .nested-weibo {
    border-left: solid rgb(206, 209, 210);
    margin-left: 20px;
}

</style>

<template>
  <div class="weibo-header">
    <div class="user">
      <a class="weibo-user-name" href="{{status.user.url}}">
        <img class="weibo-avatar img-rounded" :src="status.user.avatar_hd"/>
        <span>{{status.user.screen_name}}</span>
      </a>
    </div>
    <div class="weibo-operations">
      <a href="#" v-on:click.prevent="showReposts">转发<span>{{status.reposts_count || ''}}</span></a>  
      <a href="#" v-on:click.prevent="like">赞<span>{{status.attitudes_count || ''}}</span></a>
      <a href="#" v-on:click.prevent="showComments">评论<span>{{status.comments_count || ''}}</span></a>
    </div>
  </div>
  <p class="weibo-text" v-html="status.text | linkify 'linkify'| atify 'atify'"></p>

  <weibo-images v-if="status.pic_urls.length" :urls="status.pic_urls | pluck 'thumbnail_pic'"></weibo-images>
  
  </div>
  <div class="nested-weibo" v-if="status.retweeted_status" id="wb-{{status.retweeted_status.id}}">
    <weibo-item :status="status.retweeted_status"></weibo-item>
  </div>
</template>

<script>
import progress from 'nprogress'
import WeiboImages from './WeiboImages.vue'
import Comments from './Comments.vue'
import sdk from './sdk'

module.exports = {
  name: 'weibo-item',
  props: ['status'],
  created: function () {
    this.$on('_imageClick', function (url, urls) {
      this.$root.$broadcast('imageClick', this.status.id, url, urls)
    })
  },
  methods: {
    save: function () {
    },
    showReposts: function () {
    },
    showComments: function () {
      this.$dispatch('showComments', this.$data.status.id)
    },
    like: function () {
    }
  },
  components: {
    'weibo-images': WeiboImages,
    'comments': Comments
  }
}
</script>
