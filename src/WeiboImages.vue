<style>
  .weibo-images > img {
    max-width: 120px;
    max-height: 120px;
    margin: 12px;
    cursor: zoom-in;
  }
</style>

<template>
  <div class="weibo-images">
    <img :src="url" v-for="url in urls" v-on:click="clickImage" track-by="$index"/>
  </div>
</template>

<script>
module.exports = {
  props: ['urls'],
  beforeCompile: function () {
    console.log(this)
  },
  methods: {
    clickImage: function (e) {
      this.$dispatch('_imageClick', e.target.src, this.urls)
    }
  }}
</script>
