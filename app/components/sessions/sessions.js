angular.module('groups')

.controller('SessionListController', ['Sessions', '$state', SessionListController])
.controller('SessionController', ['$scope','Sessions', 'EventsService', '$stateParams', SessionDetailController])

.config(function($stateProvider){
	$stateProvider
	.state('sessions', {
		abstract: true,
		url: '/sessions',
		templateUrl: 'components/sessions/sessions.html',
		controller: 'SessionListController',
		controllerAs: 'sessionList'
	})
	.state('sessions.list', {
		url: '',
	})
	.state('sessions.create', {
		url: '/create',
		templateUrl: 'components/sessions/templates/create.html',
		controller: SessionCreateController,
		controllerAs: 'sessionCreate'
	})
	.state('sessions.detail', {
		url: '/:id',
		templateUrl: 'components/sessions/templates/detail.html',
		controller: SessionDetailController,
		controllerAs: 'sessionDetail'
	})
})

function SessionListController(Sessions, $state){
	var vm = this;
		
	vm.activeSession = {};
	
	vm.goToSession = function(session){
		$state.go('sessions.detail', {id: session.id});
	};
	
	init();

	function init(){
		Sessions.getList()
		.then(function(response){
			vm.sessions = response;
		});
	}
}

function SessionCreateController(Sessions, $state){
	var vm = this;
	var defaultSession = {
		active: true,
		visible: true,
		requiresPassword: true,
		startDate: new Date()
	};
	
	vm.session = defaultSession;
	
	vm.addSession = addSession;

	vm.goToUser = function(user){
		$state.go('user.detail', {id: user.id});
	};
	
	init();
	
	function addSession(){
		Sessions.createSession(vm.session).then(function(response){
			init();
			vm.session = {};
			vm.showCreateForm = false;
		});
	}

	function init(){
		
	}
}

function SessionDetailController($scope, Sessions, EventsService, $stateParams){
	var vm = this;
	var sessionId = $stateParams.id;
	
	vm.addEvent = addEvent;
	
	init();
	
	$scope.$watch(function(){
		return vm.session;
	}, function(n, o){
		//if the session form hasn't been touched than we don't have to save
		if(vm.sessionForm && vm.sessionForm.$dirty && vm.sessionForm.$valid) {
			n.save();
		}
	}, true);
	
	function addEvent(){
		console.log(vm.newEvent)
		EventsService.createEvent(sessionId, vm.newEvent).then(function(){
			init();
		});
	}

	function init(){
		if(sessionId) {
			Sessions.one(sessionId).get().then(function(response){
				vm.session = response;
				$scope.session = response;
				if(vm.session.Events && vm.session.Events.length) {
					vm.currentEvent = vm.session.Events[0]; 
				}
			});
		}	
	}
}