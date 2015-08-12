angular.module('groups')

.controller('UserListController', ['UsersService', '$state', '$scope', UserListController])
.controller('UserEditController', ['UsersService', '$state', '$scope', '$timeout', 'Loader', UserEditController])

.config(function($stateProvider){
	$stateProvider
	.state('users', {
		abstract: true,
		url: '/users',
		templateUrl: 'components/users/templates/main.html',
		controller: 'UserListController',
		controllerAs: 'userList'
	})
	.state('users.list', {
		url: '',
	})
	.state('users.create', {
		url: '/create',
		templateUrl: 'components/users/templates/form.html',
		controller: 'UserEditController',
		controllerAs: 'userDetail',
	})
	.state('users.detail', {
		url: '/:id',
		templateUrl: 'components/users/templates/form.html',
		controller: 'UserEditController',
		controllerAs: 'userDetail'
	})
})


//TODO: put this in create controller/view
/*
	var defaultSession = {
		active: true,
		visible: true,
		requiresPassword: true,
		startDate: new Date()
	};
	
	vm.newSession = defaultSession;
	
*/
function UserListController(UsersService, $state, $scope){
	var vm = this;
	
	init();

	vm.goToUser = function(user){
		$state.go('users.detail', {id: user.id});
	};

	function init(){
		$scope.$watchCollection(function(){
		 return	UsersService.users();
		}, function(response){
			vm.users = response;
		});
	}
}

function UserEditController(UsersService, $state, $scope, $timeout, Loader){
	var vm = this;
	
	init();

	vm.addUser = addUser;

	vm.goToUser = function(user){
		$state.go('user.detail', {id: user.id});
	};
	
	function addUser(){
		UsersService.saveUser(vm.user).then(function(response){
			vm.user = {};
			init();
		});
	}

	function init(){
		if($state.params.id) {
			UsersService
				.getUser($state.params.id)
				.then(function(response){
					vm.user = response.data;
				});
				
			$scope.$watch(function(){
				return vm.user;
			}, updateUser, true);
		}
	}
	
	var saveTimeout, first = true;
	function updateUser(user, oldUser) {
		if (!user || !user.id) { 
			return;
		}
		
		if (user == oldUser) {
			return;
		}
		
		if (first) {
			first = false;
			return;
		}
		
		if (saveTimeout) {
			$timeout.cancel(saveTimeout);
		}

		saveTimeout = $timeout(function(){
			Loader.start();
			UsersService
				.saveUser(user)
				.then(function(){
					Loader.end();
				});
		}, 300);
	}
}

function UserDetailController(UsersService, EventsService, $stateParams){
	var vm = this;
	var userId = $stateParams.id;
	
	vm.addEvent = addEvent;
	
	init();
	
	function init(){
		if(userId) {
			UsersService.getUser(userId).then(function(response){
				vm.user = response.data;
				if(vm.user.Events && vm.user.Events.length) {
					vm.currentEvent = vm.user.Events[0]; 
				}
			});
		}	
	}
	
	function addEvent(){
		EventsService.createEvent(userId, vm.newEvent).then(function(){
			init();
		});
	}
}