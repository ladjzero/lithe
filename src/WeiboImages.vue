<template>
  <div>
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
