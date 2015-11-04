var app = angular.module('caffeinefiend.controllers', []);

app.controller("YelpController", function ($scope, YelpService) {
	$scope.yelp = YelpService;

	$scope.doRefresh = function() {
		if (!$scope.yelp.isLoading) {
			$scope.yelp.refresh().then(function success (data) {
				$scope.$broadcast('scroll.refreshComplete');
				console.log(data);
			}, function error(data) {
				 console.log(data);
			})
		}
	};

	$scope.loadMore = function () {
		console.log("loadMore");
		if (!$scope.yelp.isLoading && $scope.yelp.hasMore) {
			$scope.yelp.next().then(function (data) {
				 console.log(data);
				 $scope.$broadcast('scroll.infiniteScrollComplete');
			}, function error (data) {
				console.log(data);
			})
		}
	}

  $scope.getDirections = function (cafe) {
    console.log("Getting directions for " + cafe.name);
  }

  $scope.openMap = function (cafe) {
    console.log("Opening Map");
  }

});
