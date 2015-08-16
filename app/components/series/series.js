angular.module('groups')

.controller('SeriesListController', ['SeriesService', '$state', SeriesListController])
.controller('SeriesEditController', ['$scope','SeriesService', 'EventService', '$stateParams', 'OrganizationService', '$q', '$filter', SeriesEditController])

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
		templateUrl: 'components/series/templates/form.html',
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
		SeriesService.getService().getList()
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

function SeriesEditController($scope, SeriesService, EventService, $stateParams, OrganizationService, $q, $filter){
	var vm = this;
	var seriesId = $stateParams.id;

	init();
	
	vm.addEvent = function(){
		EventService.createEvent(seriesId, vm.newEvent).then(function(){
			init();
		});
	}
	
	vm.toggleResource = function(resource){
		var arr = _.where(vm.currentEvent.Resources, {id: resource.id});
		if(arr.length) {
			EventService
				.removeResource(vm.currentEvent.id, resource.id)
				.then(init);
		} else {
			EventService
				.addResource(vm.currentEvent.id, resource)
				.then(init);	
		}
	}
	
	vm.saveSeries = function(){
		vm.series.save();
	}
		
	function updateResources(){
		angular.forEach(vm.resources, function(val){
			val.checked = false;
		});
		
		if(!vm.currentEvent || !vm.currentEvent.Resources) {
			return; 
		}
		
		angular.forEach(vm.currentEvent.Resources, function(val){
			var arr = _.where(vm.resources, val);
			if(arr.length) {
				arr[0].checked = true;
			}
		});
	}

	function init(){
		var promise, promise2;
		
		$scope.$watch(function(){
			return vm.currentEvent;
		}, function(){
			updateResources();
		});
			
		if(seriesId) {
			promise = SeriesService.getService().one(seriesId).get().then(function(response){
											response.startDate = new Date(response.startDate);
											response.endDate = new Date(response.endDate);
											vm.series = response;
											$scope.series = response;
											if(vm.series.Events && vm.series.Events.length) {
												vm.currentEvent = vm.series.Events[0]; 
												
												
											}
											
											return response;
										});
		}	
		
		promise2 = OrganizationService
										.one(1)
										.get()
										.then(function(response){
											vm.resources = response.Resources;
										});
					
		$q.all([promise, promise2]).then(function(){
			updateResources();
		})
	}
}