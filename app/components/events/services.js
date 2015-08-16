angular.module('groups')

.directive('eventForm', function() {
  return {
    restrict: 'EA',
    scope: {
      event: '=def',
      addEvent: '=onClickAdd',
      resources: '=',
      selectedResources: '=',
      onResourceChange: '='
    },
    controller: function($scope){
       
    },
    templateUrl: 'components/events/templates/create.html',
    link: function(){
      
    }
  }
})