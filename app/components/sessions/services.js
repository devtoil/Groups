angular.module('groups')

.factory('Sessions', ['Restangular', SessionService])

.directive('dateFormatter', function(){
	return {
		require: '^ngModel',
		restrict: 'A',
		link: function(scope, elem, attrs, ctrl){
			ctrl.$modelValue = new Date(ctrl.$viewValue);
		}
	}
})

function SessionService(Restangular){
	return Restangular.service('sessions');
}




