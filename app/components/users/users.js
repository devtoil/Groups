angular.module('groups')

.controller('UserListController', ['UsersService', '$state', UserListController])
.controller('UserController', ['UsersService', 'EventsService', '$stateParams', UserDetailController])

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
		templateUrl: 'components/users/create.html',
		controller: UserCreateController,
		controller: 'userCreate',
	})
	.state('users.detail', {
		url: '/:id',
		templateUrl: 'components/users/templates/detail.html',
		controller: UserDetailController,
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
function UserListController(UsersService, $state){
	var vm = this;
	
	init();

	vm.goToUser = function(user){
		$state.go('user.detail', {id: user.id});
	};

	function init(){
		UsersService.getUsers()
		.then(function(response){
			vm.users = response.data;
		});
	}
}

function UserCreateController(UsersService, $state){
	var vm = this;
	
	init();

	vm.addUser = addUser;

	vm.goToUser = function(user){
		$state.go('user.detail', {id: user.id});
	};
	
	function addUser(){
		UsersService.createUser(vm.user).then(function(response){
			init();
			vm.user = {};
		});
	}

	function init(){
		
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