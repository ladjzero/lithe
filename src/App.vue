<style>
  #weibos-and-button {
    width: 600px;
    margin: 60px auto;
  }

  #weibos {
    background: white;
    border-radius: 6px 6px 0 0;
  }

  .weibo-container {
    position: relative;
    border-bottom: solid 1px #E8E8E8;
  }

  .weibo-container:first-child {
    border-radius: 6px 6px 0 0;
  }

  @media (min-width: 1024px) {
    #weibos-and-button.comments-open {
      position: relative;
      left: 50%;
      margin-left: -486px;
    }
  }

  #load-more {
    width: 100%;
    background: rgb(84, 110, 122);
    color: white;
    padding: 24px;
    text-align: center;
    border-radius: 0 0 6px 6px;
    cursor: pointer;
  }

  #load-more[disabled] {
    background: rgb(136, 150, 157);
    cursor: not-allowed;
  }
</style>

<template>
  <gallery></gallery>
  <div id="main-container">
    <div id="weibos-and-button" :class="{'comments-open': isCommentsOpen}" class="card">
      <ul id="weibos" class="unstyled font-hei">
          <li class="weibo-container" id="wb-{{status.id}}" v-for="status in statuses"><weibo-item :status="status"></weibo-item></li>
      </ul>
      <button id="load-more" class="unstyled font-hei" @click="loadMore" :disabled="isLoading">{{isLoading ? '载入中 ...' : '加载更多'}}</button>
    </div>
  </div>
</template>

<script>
import Gallery from './Gallery.vue'
import WeiboItem from './WeiboItem.vue'

module.exports = {
  props: ['statuses', 'isLoading'],
  computed: {
    isCommentsOpen: function () {
      return this.statuses.some(function (s) {
        var rt = s.retweeted_status
        return (s.comments && s.comments.length) || (rt && rt.comments && rt.comments.length);
      })
    }
  },
  methods: {
    loadMore: function () {
      this.$dispatch('loadMore');
    }
  },
  components: {
    'gallery': Gallery,
    'weibo-item': WeiboItem
  }
}
</script>