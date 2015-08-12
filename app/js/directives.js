angular.module('groups')

.directive('windowScroll', function($timeout){
		return {
			link: function(scope, $element, attrs){
				$timeout(render);
					
				var resizeTimeout;
				$(window).on('resize', function(){
					if(resizeTimeout) {
						$timeout.cancel(resizeTimeout);
					}
					
					resizeTimeout = $timeout(render, 200);
				});
				
				function render(){
					var winHeight = $(window).outerHeight();
					var navHeight = $('.md-toolbar-tools').outerHeight();
					
					var height = winHeight - navHeight;
					
					$element.css({
						height: height,
						'overflow-y': 'auto',
						'overflow-x': 'hidden'
					});
				}
			}
		}
})

.factory('Loader', function(){
	var loading = false;
	
	return {
		start: function(){
			loading = true;
		},
		end: function(){
			loading = false;
		},
		isLoading: function(){
			return loading;
		}
	}
})

.directive('appLoading', function(Loader){
	return {
		link: function($scope, $element, attrs){
			$scope.Loader = Loader;
			// $scope.$watch(function(){
			// 	return Loader.isLoading();
			// }, function(){
			// 	// $scope.
			// })
		}
	}
})