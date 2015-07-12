/**
 * Created by chenzhuo on 15-7-7.
 */

define(['ko', 'text!gallery.html', 'lib/blueimp-gallery', 'lib/blueimp-gallery-indicator'], function(ko, template, Gallery) {
    ko.bindingHandlers.gallery = {
        init: function (element, valueAccessor) {
            var urls = valueAccessor();

            if (urls && urls.length) {
                $(element).append(template);

                Gallery(urls.map(function (url) {
                    return {
                        href: toLarge(url.thumbnail_pic),
                        thumbnail: url.thumbnail_pic
                    };
                }), {
                    container: element,
                    slidesContainer: element.querySelector('.slides'),
                    carousel: true,
                    startSlideshow: false,
                    indicatorContainer: element.querySelector('ol'),
                    activeIndicatorClass: 'active',
                    thumbnailProperty: 'thumbnail',
                    thumbnailIndicators: true,
                    onslidecomplete: function (i, el) {
                        var img = el.querySelector('img'),
                            radio = img.naturalHeight / img.naturalWidth,
                            parent = el.parentNode;

                        if (!parent._radio || parent._radio < radio) {
                            parent._radio = radio;

                            if (img.naturalWidth > el.clientWidth) {
                                parent.style.height = parent._radio * el.clientWidth + 'px';
                            } else {
                                parent.style.height = img.naturalHeight + 'px';
                            }
                        }
                    }
                });
            }
        }
    };

    function toLarge (url) {
        return url.replace('thumbnail', 'large');
    }
});