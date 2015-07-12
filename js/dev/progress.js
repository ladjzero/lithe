/**
 * Created by chenzhuo on 15-7-12.
 */

define(['ko'], function (ko) {
    var progress = document.querySelector('#progress')
        vm = {
            _width: 0,
            width: ko.observable('0%')
        };

    ko.applyBindings(vm, progress);

    return {
        start: function () {
            progress.style.transitionDuration  = '0s';
            vm._width = 0;
            vm.width('0%');

            setInterval(function () {
                var width;

                if ((width = vm._width) < 100) {
                    vm._width = width + (100 - width) * 0.08;
                    vm.width(vm._width + '%');
                    progress.style.transitionDuration = '1s';
                }
            }, 1500);
        },
        end: function () {
            vm._width = 100;
            vm.width('100%');
            progress.style.transitionDuration = '1s';
        }
    }
});