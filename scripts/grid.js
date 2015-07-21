angular.module('schedulerGrid', [])
.directive('schedulerGrid', [function() {
    return {
        scope: {
            min: '=',
            max: '=',
            tick: '='
        },
        restrict: 'E',
        templateUrl: 'templates/grid.html',
        link: function(scope) {
            scope.range = function(n) {
                return new Array(Math.round(n));
            };
            scope.tickcount = (scope.max - scope.min) / scope.tick;
            scope.ticksize = 100 / scope.tickcount;
            scope.skipped = scope.min / scope.tick;
            scope.offset = scope.ticksize * scope.skipped;
        }
    };
}]);