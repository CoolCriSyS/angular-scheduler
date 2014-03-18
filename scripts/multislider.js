angular.module('multislider', ['slot'])

.filter('byDay', [function(){
    return function(input, day){
        ret = []
        angular.forEach(input, function(el){
            if(el.day==day){
                ret.push(el)
            }
        })
        return ret
    }
}])

.directive('multiSlider', ['$document', function($document) {
    return {
        scope: {
            slots: '=',
            max: '=',
            min: '=',
            tick: '=',
            defaultValue: '=',
            day: '='
        },
        restrict: 'E',
        templateUrl: 'templates/multi-slider.html',
        link: function(scope, element, attr){

            // used for calculating relative click-events
            var elOffX = element[0].getBoundingClientRect().left;


            var valToPixel = function(val){
                percent = val / (scope.max - scope.min)
                return Math.floor(percent * element[0].clientWidth + 0.5)
            }
            var pixelToVal = function(pixel){
                percent = pixel / element[0].clientWidth;
                return Math.floor(percent * (scope.max - scope.min) + 0.5)
            }
            var round = function(n){
                return scope.tick * Math.round(n / scope.tick)
            }


            var addSlot = function(start, stop){
                start = start >= scope.min ? start : scope.min
                stop = stop <= scope.max ? stop : scope.max
                scope.slots.push({start: start, stop: stop, day: scope.day})
                scope.$apply()
            }


            var hoverElement = angular.element(element.find('div')[0])
            var hoverElementWidth = valToPixel(scope.defaultValue)

            hoverElement.css({
                width: hoverElementWidth+'px'
            })

            element.on('mousemove', function(e){
                hoverElement.css({
                    left: e.pageX - elOffX - hoverElementWidth/2 + 'px'
                })
            })

            hoverElement.on('click', function(event){
                if(!element.attr('no-add')){
                    pixelOnClick = event.pageX - elOffX
                    valOnClick = pixelToVal(pixelOnClick);
                    
                    start = round(valOnClick - scope.defaultValue/2);
                    stop = start + scope.defaultValue;
                    
                    addSlot(start, stop)
                }
            })
        }
    }
}])