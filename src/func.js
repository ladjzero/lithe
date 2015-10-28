/**
 * Created by chenzhuo on 15-7-8.
 */

define(function () {
   return {
       pluck: function (arr, key) {
           return arr.map(function (e) {
               return e[key];
           });
       }
   };
});