<style>
  body.panel-open {
    overflow: hidden;
  }

  .tooltip {
    color: #FFFFFF;
    font-size: 1.2em;
    padding: 12px;
    position: fixed;
    z-index: 9999;
    width: 100%;
    top: 0;
    background: rgba(93, 116, 128, .7);
    text-align: center;
  }

  .show-on-hover {
    visibility: hidden;
  }

  .weibo-container:hover .show-on-hover {
    visibility: visible;
  }

  #main-container {
    font-size: 14px;
    line-height: 1.5em;
  }

  #weibos-and-button {
    width: 600px;
    margin: 60px auto;
  }

  #weibos {
    background: white;
    border-radius: 6px 6px 0 0;
    padding-top: 1px;
  }

  .weibo-container {
    position: relative;
    border-bottom: solid 1px #E8E8E8;
  }

  .weibo-container:first-child {
    border-radius: 6px 6px 0 0;
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

  .panel {
    position: fixed;
    top: 0;
    right: 0;
    width: 0;
    background: white;
    overflow-y: scroll;
    height: 100%;
    transition: width .3s;
  }

  .panel.show {
    display: block;
    width: 450px;
    box-shadow: 0 0 20px 0 rgba(0,0,0,.8);
  }

  #mask {
    top: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    display: none;
    transition: all .3s;
  }

  #mask.show {
    display: block;
    background: rgba(0,0,0,.6)
  }
</style>

<template>
  <div class="tooltip" v-if="!statuses.length">需要允许弹出窗口来授权 Lithe</div>
  <gallery></gallery>
  <div id="main-container">
    <div id="weibos-and-button" :class="{'comments-open': isCommentsOpen}" class="card">
      <ul id="weibos" class="unstyled font-hei">
          <li class="weibo-container" id="wb-{{status.id}}" v-for="status in statuses"><weibo-item :status="status"></weibo-item></li>
      </ul>
      <button v-if="statuses.length" id="load-more" class="unstyled font-hei" @click="loadMore" :disabled="isLoading">{{isLoading ? '载入中 ...' : '加载更多'}}</button>
    </div>
  </div>
  <div id="mask" :class="{'show': isCommentsOpen}" @click="showContainer"></div>
  <div id="left-panel" class="panel"></div>
  <div id="right-panel" class="panel" :class="{'show': isCommentsOpen}"><comments :comments="comments"></comments></div>
</template>

<script>
import Gallery from './Gallery.vue'
import WeiboItem from './WeiboItem.vue'
import Comments from './Comments.vue'

module.exports = {
  props: ['statuses', 'isLoading', 'comments'],
  computed: {
    isCommentsOpen: function () {
      return this.$data.comments.length;
    }
  },
  methods: {
    loadMore: function () {
      this.$dispatch('loadMore')
    },
    showContainer: function () {
      this.comments.splice(0, this.comments.length)
    }
  },
  components: {
    'gallery': Gallery,
    'weibo-item': WeiboItem,
    'comments': Comments
  }
}
</script>