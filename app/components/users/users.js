angular.module('groups')

.controller('UserListController', ['UsersService', '$state', '$scope', UserListController])
.controller('UserEditController', ['UsersService', '$state', '$scope', '$timeout', 'Loader', 'SeriesService', UserEditController])

.config(function($stateProvider){
	$stateProvider
	.state('users', {
		abstract: true,
		url: '/users',
		templateUrl: 'components/users/templates/main.html',
	})
	.state('users.list', {
		url: '',
		templateUrl: 'components/users/templates/list.html',
		controller: 'UserListController',
		controllerAs: 'userList'
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
function UserListController(UsersService, $state, $scope, SeriesService){
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

function UserEditController(UsersService, $state, $scope, $timeout, Loader, SeriesService){
	var vm = this;
	
	init();

	vm.addUser = addUser;

	vm.goToUser = function(user){
		$state.go('user.detail', {id: user.id});
	};
	
	vm.toggleSeries = function(series){
		if(!vm.series) {
			return;
		}
		
		var arr = _.where(vm.user.Series, {id: series.id});
		if(arr.length) {
			UsersService
				.removeSeries(vm.user.id, series.id)
				.then(init);
		} else {
			UsersService
				.addSeries(vm.user.id, series)
				.then(init);	
		}
	}
	
	function updateSeries(){
		angular.forEach(vm.series, function(val){
			val.checked = false;
		});
		
		if(!vm.user || !vm.user.Series) {
			return; 
		}
		
		angular.forEach(vm.user.Series, function(val){
			var arr = _.where(vm.series, {id: val.id});
			if(arr.length) {
				arr[0].checked = true;
			}
		});
	}
	
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
					updateSeries()
				});
				
			$scope.$watch(function(){
				return vm.user;
			}, updateUser, true);
			
			SeriesService.getService().getList()
			.then(function(response){
				vm.series = response;
				
				updateSeries();
			});
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