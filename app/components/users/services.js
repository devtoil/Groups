angular.module('groups')

.factory('UsersService', ['$http', UsersService])

function UsersService($http){
	var base = 'http://localhost:4000';
	
	return {
		getUser: getUser,
		getUsers: getUsers,
		createUser: createUser
	};
		
	function getUsers(){
		return $http.get(base + '/users');
	}
	
	function getUser(id){
		return $http.get(base + '/users/' + id);
	}
	
	function createUser(session){
		return $http.post(base + '/users', session);
	}
}