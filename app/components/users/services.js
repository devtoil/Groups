angular.module('groups')

.factory('UsersService', ['$http', UsersService])

function UsersService($http){
	var base = 'http://localhost:4000';
		
	var userList = [];
	
	init();
	
	return {
		users: getList,
		getUser: getUser,
		getUsers: getUsers,
		saveUser: saveUser,
		getList: getList,
		addSeries: addSeries,
		removeSeries: removeSeries
	};
	
	function init() {
		getUsers();
	}
	
	function getList(){
		return userList;
	}
		
	function getUsers(){
		$http
			.get(base + '/users')
			.then(function(response){
				userList = response.data;
				return response.data;
			});
	}
	
	function getUser(id){
		return $http.get(base + '/users/' + id);
	}
	
	function saveUser(user) {
		if (user.id) {
			return $http
							.put(base + '/users/' + user.id, user);	
		} else {
			return $http
								.post(base + '/users', user)
								.then(function(response){
									userList = userList.push(response.data);
									return response.data;
								})
		}
	}
	
	function addSeries(userId, series){
		return $http
						.post(base + '/users/' + userId + '/series', series)
						.then(function(response){
							return response.data;
						});
	}
	
	function removeSeries(userId, seriesId){
		return $http
						.delete(base + '/users/' + userId + '/series/' + seriesId)
						.then(function(response){
							return response.data;
						});
	}
}