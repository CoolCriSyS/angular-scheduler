angular.module('dayparting', ['multislider', 'grid'])

.filter('intToTime', [function(){
    
    return function(input){

        function pad(n, width) {
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
        }
    
        hours = Math.floor(input / 60);
        minutes = input % 60;
        return pad(hours, 2)+':'+pad(minutes, 2)
    }
}])

.directive('dayparting', [function(){
    return {
        templateUrl: 'templates/dayparting.html',
        restrict: 'E',
        scope: {
            slots: '=',
        }, 
        link: function(scope, element, attrs){
            scope.labels = [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday']
        }
    }
}])