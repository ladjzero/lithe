<template>
  <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="pswp__bg"></div>
    <div class="pswp__scroll-wrap">
      <div class="pswp__container">
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
      </div>
      <div class="pswp__ui pswp__ui--hidden">
        <div class="pswp__top-bar">
          <div class="pswp__counter"></div>
          <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
          <button class="pswp__button pswp__button--share" title="Share"></button>
          <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
          <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
          <div class="pswp__preloader">
            <div class="pswp__preloader__icn">
              <div class="pswp__preloader__cut">
                <div class="pswp__preloader__donut"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
          <div class="pswp__share-tooltip"></div> 
        </div>
        <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
        </button>
        <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
        </button>
        <div class="pswp__caption">
          <div class="pswp__caption__center"></div>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
require('photoswipe/dist/photoswipe.css')
require('photoswipe/dist/default-skin/default-skin.css')

import PhotoSwipe from 'photoswipe'
import PhotoSwipeUI from 'photoswipe/src/js/ui/photoswipe-ui-default'

module.exports = {
  props: ['urls'],
  created: function () {
    var that = this;
    this.$on('imageClick', function (src, srcs) {
      var replace = function (str) {
        return str.replace('thumbnail', 'large')
      }
      src = replace(src)
      srcs = srcs.map(replace)
      
      var gallery = this.gallery = new PhotoSwipe(this.$el, PhotoSwipeUI, srcs.map(src => ({src: src, w: 100, h: 100})), {index: srcs.indexOf(src)})
      gallery.listen('imageLoadComplete', function (index, item) {
        var img = gallery.currItem.container.lastChild
        item.w = img.naturalWidth
        item.h = img.naturalHeight
        gallery.updateSize()
      })
      gallery.init()
    })
  }
}
</script>