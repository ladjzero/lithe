<style>
  #weibos {
    width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .weibo-container {
    position: relative;
  }

  @media (min-width: 1024px) {
    #weibos.comments-open {
      position: relative;
      left: 50%;
      margin-left: -486px;
    }
  }
</style>

<template>
  <gallery></gallery>
  <div id="main-container">
    <ul id="weibos" class="unstyled" :class="{'comments-open': isCommentsOpen}">
        <li class="weibo-container" id="wb-{{status.id}}" v-for="status in statuses"><weibo-item :status="status"></weibo-item></li>
    </ul>
  <button id="load-more" class="unstyled">加载更多</button>
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