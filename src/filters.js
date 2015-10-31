var URI_RE = /(http:\/\/|https:\/\/)[\w-\._~:\/\?#\[\]@\!$&'\(\)\*\+,;=]+/g
var AT_RE = /@[^\s:：]+/g

var extend = function (obj1, obj2) {
  if (!(obj2 instanceof Object)) return obj1
  Object.keys(obj2).forEach(key2 => obj1[key2] = obj2[key2])
  return obj1
}

var map = function (obj, func) {
  if (Array.isArray(obj)) return obj.map(func)
  if (obj instanceof Object) return Object.keys(obj).map(key => func(key, obj[key]))
}

var attribute = function (attrs) {
  return map(attrs, (key, val) => key + '="' + val + '"').join(' ')
}

var linkify = function (text, attrs) {
  attrs = extend({target: '_blank'}, attrs)
  return text.replace(URI_RE, function (uri) {
    return '<a href="' + uri + '" ' + attribute(attrs) + '>' + uri + '</a>'
  })
}

var atify = function (text, attrs) {
  attrs = extend({href: '#'}, attrs)
  return text.replace(AT_RE, function (at) {
    return '<a ' + attribute(attrs) + '><span class="at">@</span>' + at.substr(1) + '</a>'
  })
}

exports.linkify = linkify
exports.atify = atify