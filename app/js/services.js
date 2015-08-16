angular.module('groups')

.factory('ResourceService', function(Restangular){
	return Restangular.service('resources');
})
.factory('OrganizationService', function(Restangular){
	return Restangular.service('organizations');
})
.factory('EventService', function(Restangular){
	var service = Restangular.service('events');
	return {
		getService: function() {
			return service;
		},
		addResource: function(eventId, resource){
			return service
							.one(eventId)
							.all('resources')
							.post(resource);
		},
		removeResource: function(eventId, resourceId){
			return service
							.one(eventId)
							.one('resources', resourceId)
							.remove();
		}
	} 
})
.factory('SeriesService', function(Restangular){
	var service = Restangular.service('series');
	return {
		getService: function() {
			return service;
		}
	} 
})