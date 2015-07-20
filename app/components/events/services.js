angular.module('groups')

.factory('EventsService', ['$http', EventsService])

.directive('event', function() {
  return {
    restrict: 'EA',
    scope: {
      event: '=def'
    },
    templateUrl: 'components/events/templates/create.html'
  }
})

function EventsService($http) {
  var base = 'http://localhost:4000';
	
  return {
    getEvents: getEvents,
    createEvent: createEvent,
    getEvent: getEvent
  };
		
  function getEvents(sessionId) {
    return $http.get(base + '/sessions/' + sessionId + '/events');
  }
	
  function getEvent(id) {
    return $http.get(base + '/events/' + id);
  }
	
  function createEvent(sessionId, event) {
    return $http.post(base + '/sessions/' + sessionId + '/events', event);
  }
}