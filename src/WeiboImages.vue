<style>
  .weibo-images > img {
    max-width: 120px;
    max-height: 120px;
    margin: 12px;
  }
</style>

<template>
  <div class="weibo-images">
    <img src="{{url.thumbnail_pic}}" v-repeat="url in urls" v-on="click: clickImage" />
  </div>
</template>

<script>
module.exports = {
  props: ['urls'],
  methods: {
    clickImage: function (e) {
      this.$dispatch('imageClick', e.target.src, this.urls.map(url => url.thumbnail_pic))
    }
  }}
</script>
