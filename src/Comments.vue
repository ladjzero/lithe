<template>
  <ul class="unstyled">
    <li v-for="comment in comments"><a href="#">{{comment.user.name}}</a>: <span >{{{comment.text | linkify | atify}}}</span></li>
  </ul>
</template>

<script>
module.exports = {
  props: ['comments']
}
</script>