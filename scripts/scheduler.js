angular.module('scheduler', ['schedulerMultislider', 'schedulerGrid'])
.filter('intToTime', [function(){

    return function(input, isMilitary){

        function pad(n, width) {
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
        }

        var hours = Math.floor(input / 60);
        var minutes = input % 60;
        return isMilitary ? pad(hours, 2)+':'+pad(minutes, 2) : (input >= 780 ? hours - 12 : hours) + ':' + pad(minutes, 2) + (input >= 720 ? ' PM' : ' AM');
    };
}])
.directive('scheduler', [function(){
    return {
        templateUrl: 'templates/scheduler.html',
        restrict: 'E',
        scope: {
            slots: '='
        },
        link: function(scope){
            scope.labels = [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday'
            ];
        }
    };
}]);