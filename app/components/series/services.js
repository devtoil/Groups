angular.module('groups')

.directive('dateFormatter', function(){
	return {
		require: '^ngModel',
		restrict: 'A',
		link: function(scope, elem, attrs, ctrl){
			ctrl.$modelValue = new Date(ctrl.$viewValue);
		}
	}
})



