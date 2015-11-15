<style>
  .comment {
    padding: 0 24px;
    margin: 24px 0;
  }
</style>

<template>
  <div>
    <ul class="unstyled clear">
      <li class="comment" v-for="comment in comments"><a href="#">{{comment.user.name}}</a>: <span >{{{comment.text | linkify | atify}}}</span></li>
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