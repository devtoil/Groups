angular.module('groups', ['ngMaterial', 'ui.router', 'restangular', 'ngSanitize'])

.controller('AppController', ['$scope', 'Loader', AppController])

.config(function(RestangularProvider, $mdThemingProvider) {
  RestangularProvider.setBaseUrl('http://localhost:4000');
	
	$mdThemingProvider.theme('default')
    .primaryPalette('grey')
		.accentPalette('blue');
})

function AppController($scope, Loader) {
	$scope.Loader = Loader;
	
	$scope.$watch(function(){
		return Loader.isLoading();	
	}, function(isLoading){
		$scope.isLoading = isLoading;
	})
}


