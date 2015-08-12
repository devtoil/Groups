angular.module('groups')

.controller('SeriesListController', ['SeriesService', '$state', SeriesListController])
.controller('SeriesEditController', ['$scope','SeriesService', 'EventService', '$stateParams', 'OrganizationService', SeriesEditController])

.config(function($stateProvider){
	$stateProvider
	.state('series', {
		abstract: true,
		url: '/series',
		templateUrl: 'components/series/templates/main.html',
		controller: 'SeriesListController',
		controllerAs: 'seriesList'
	})
	.state('series.list', {
		url: '',
		templateUrl: 'components/series/templates/list.html'
	})
	.state('series.create', {
		url: '/create',
		templateUrl: 'components/series/templates/create.html',
		controller: 'SeriesEditController',
		controllerAs: 'seriesDetail'
	})
	.state('series.detail', {
		url: '/:id',
		templateUrl: 'components/series/templates/detail.html',
		controller: 'SeriesEditController',
		controllerAs: 'seriesDetail'
	})
})

function SeriesListController(SeriesService, $state){
	var vm = this;
		
	vm.series = {};
	
	vm.goToSeries = function(series){
		$state.go('series.detail', {id: series.id});
	};
	
	init();

	function init(){
		SeriesService.getList()
		.then(function(response){
			vm.series = response;
		});
	}
}

function SeriesCreateController(SeriesService, $state){
	var vm = this;
	var defaultSeries = {
		active: true,
		visible: true,
		requiresPassword: true,
		startDate: new Date()
	};
	
	vm.session = defaultSeries;
	
	vm.addSession = addSession;

	vm.goToUser = function(user){
		$state.go('user.detail', {id: user.id});
	};
	
	init();
	
	function addSession(){
		SeriesService.createSession(vm.session).then(function(response){
			init();
			vm.series = {};
			vm.showCreateForm = false;
		});
	}

	function init(){
		
	}
}

function SeriesEditController($scope, SeriesService, EventService, $stateParams, OrganizationService){
	var vm = this;
	var seriesId = $stateParams.id;
	
	vm.addEvent = addEvent;
	
	init();
	
	function addEvent(){
		EventService.createEvent(seriesId, vm.newEvent).then(function(){
			init();
		});
	}

	function init(){
		if(seriesId) {
			SeriesService.one(seriesId).get().then(function(response){
				vm.series = response;
				$scope.series = response;
				if(vm.series.Events && vm.series.Events.length) {
					vm.currentEvent = vm.series.Events[0]; 
				}
			});
		}	
	}
	
	OrganizationService
		.one(1)
		.get()
		.then(function(response){
			vm.resources = response.Resources;
		})
}