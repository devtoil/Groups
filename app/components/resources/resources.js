angular.module('groups')

.config(function($stateProvider){
	$stateProvider
	.state('resources', {
		abstract: true,
		url: '/resources',
		template: '<ui-view></ui-view>'
	})
	.state('resources.list', {
		url: '',
		templateUrl: 'components/resources/templates/main.html',
		controller: 'ResourceListController',
		controllerAs: 'resourceList'
	})
	.state('resources.create', {
		url: '/create',
		templateUrl: 'components/resources/templates/form.html',
		controller: 'ResourceEditController',
		controllerAs: 'resourceDetail',
	})
	.state('resources.detail', {
		url: '/:id',
		templateUrl: 'components/resources/templates/form.html',
		controller: 'ResourceEditController',
		controllerAs: 'resourceDetail'
	})
})

.controller('ResourceListController', function(OrganizationService, $state){
	var vm = this;
	
	OrganizationService
		.one(1)
		.get()
		.then(function(org){
			console.log(org)
			vm.resources = org.Resources;
		});
		
	vm.goToResource = function(resource){
		$state.go('resources.detail',{id: resource.id});
	}
	
})

.controller('ResourceEditController', function(OrganizationService, ResourceService, $state){
	var vm = this;
	
	if($state.params.id) {
		ResourceService.one($state.params.id).get().then(function(response){
			vm.resource = response;
		});
	}
	
	vm.updateResource = function(){
		vm.resource.save();
	}
	
	vm.onClickAdd = function(){
		OrganizationService
			.one(1)
			.all('resources')
			.post(vm.resource)
			.then(function(){
				console.log('resource created');
			})
			
	}
})