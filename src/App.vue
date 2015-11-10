<style>
  #weibos-and-button {
    width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .weibo-container {
    position: relative;
    margin: 2px 0;
  }

  @media (min-width: 1024px) {
    #weibos-and-button.comments-open {
      position: relative;
      left: 50%;
      margin-left: -486px;
    }
  }
</style>

<template>
  <gallery></gallery>
  <div id="main-container">
    <div id="weibos-and-button" :class="{'comments-open': isCommentsOpen}">
      <ul id="weibos" class="unstyled font-hei">
          <li class="weibo-container" id="wb-{{status.id}}" v-for="status in statuses"><weibo-item :status="status"></weibo-item></li>
      </ul>
      <button id="load-more" class="unstyled font-hei">加载更多</button>
    </div>
  </div>
</template>

<script>
import Gallery from './Gallery.vue'
import WeiboItem from './WeiboItem.vue'

module.exports = {
  props: ['statuses'],
  computed: {
    isCommentsOpen: function () {
      return this.statuses.some(function (s) {
        var rt = s.retweeted_status
        return (s.comments && s.comments.length) || (rt && rt.comments && rt.comments.length);
      })
    }
  },
  components: {
    'gallery': Gallery,
    'weibo-item': WeiboItem
  }
}
</script>