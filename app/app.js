angular.module('groups', ['ngMaterial','ui.router','restangular'])

.controller('AppController', [AppController])

.config(function(RestangularProvider){
	RestangularProvider.setBaseUrl('http://localhost:4000');
})

function AppController(){
	
}


