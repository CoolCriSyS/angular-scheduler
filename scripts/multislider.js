angular.module('schedulerMultislider', ['schedulerSlot'])
.filter('byDay', [function(){
    return function(input, day){
        var ret = [];
        angular.forEach(input, function(el){
            if(el.day === day){
                ret.push(el);
            }
        });
        return ret;
    };
}])
.directive('schedulerMultiSlider', [function() {
    return {
        scope: {
            slots: '=',
            max: '=',
            min: '=',
            tick: '=',
            defaultValue: '=',
            day: '=',
            gridTick: '='
        },
        restrict: 'E',
        templateUrl: 'templates/multi-slider.html',
        link: function (scope, element) {

            // used for calculating relative click-events
            var elOffX = element[0].getBoundingClientRect().left;

            var valToPixel = function(val){
                var percent = val / (scope.max - scope.min);
                return Math.floor(percent * element[0].clientWidth + 0.5);
            };

            var pixelToVal = function(pixel){
                var percent = pixel / element[0].clientWidth;
                return Math.floor(percent * (scope.max - scope.min) + 0.5);
            };

            var round = function(n){
                return scope.tick * Math.round(n / scope.tick);
            };

            var addSlot = function (start, stop) {
                start = start + scope.min;
                stop = stop + scope.min;
                var tStart = start >= scope.min ? start : scope.min;
                var tStop = stop <= scope.max ? stop : scope.max;
                scope.slots.push({start: tStart, stop: tStop, day: scope.day});
                scope.$apply();
            };


            var hoverElement = angular.element(element.find('div')[0]);
            var hoverElementWidth = valToPixel(scope.defaultValue);

            hoverElement.css({
                width: hoverElementWidth+'px'
            });

            element.on('mousemove', function(e){
                hoverElement.css({
                    left: e.pageX - elOffX - hoverElementWidth/2 + 'px'
                });
            });

            hoverElement.on('click', function(event){
                if(!element.attr('no-add')){
                    var pixelOnClick = event.pageX - elOffX;
                    var valOnClick = pixelToVal(pixelOnClick);

                    var start = round(valOnClick - scope.defaultValue/2);
                    var stop = start + scope.defaultValue;

                    addSlot(start, stop);
                }
            });
        }
    };
}]);