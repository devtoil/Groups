angular.module('groups')

.config(function($stateProvider){
	$stateProvider
	.state('home', {
		abstract: true,
		url: '/home',
		templateUrl: 'components/home/home.html',
		controller: 'HomeController',
		controllerAs: 'home'
	})
	.state('home.list', {
		url: '',
	})
})

.controller('HomeController', function(Restangular){
	var vm = this;
	
	Restangular
		.one('organizations', 1)
		.get()
		.then(function(org){
			console.log(org)
			vm.org = org;
		})
})