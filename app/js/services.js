angular.module('groups')

.factory('ResourceService', function(Restangular){
	return Restangular.service('resources');
})
.factory('OrganizationService', function(Restangular){
	return Restangular.service('organizations');
})
.factory('EventService', function(Restangular){
	return Restangular.service('events');
})
.factory('SeriesService', function(Restangular){
	return Restangular.service('series');
})