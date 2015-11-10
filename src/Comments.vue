<style>
  .close-comments {
    float: right;
    font-size: large;
    right: 12px;
    padding: 3px 6px;
    top: 8px;
    color: #E68080;
    cursor: pointer;
  }
</style>

<template>
  <div>
    <i class="close-comments ion-ios-close" title="关闭评论" @click="close"></i>
    <ul class="unstyled clear">
      <li v-for="comment in comments"><a href="#">{{comment.user.name}}</a>: <span >{{{comment.text | linkify | atify}}}</span></li>
    </ul>
  </div>
</template>

<script>
module.exports = {
  props: ['comments'],
  methods: {
    close: function () {
      var comments = this.comments
      var len = comments.length
      comments.splice(0, len)
    }
  }
}
</script>