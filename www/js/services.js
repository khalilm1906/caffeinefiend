var app = angular.module('caffeinefiend.services', []);

app.service("YelpService", function ($q, $http, $cordovaGeolocation, $ionicPopup) {
	var self = {
		'page': 1,
		'isLoading': false,
		'hasMore': true,
		'results': [],
		'lat': 32.785676,
		'lon': -96.798054,
		'refresh': function () {
			self.page = 1;
			self.isLoading = false;
			self.hasMore = true;
			self.results = [];
			return self.load();
		},
		'next': function () {
			self.page += 1;
			return self.load();
		},
		'load': function () {
			self.isLoading = true;
			var deferred = $q.defer();

      ionic.Platform.ready(function () {
        $cordovaGeolocation
          .getCurrentPosition({timeout:10000, enableHighAccuracy:false})
          .then(function (position){
            self.lat = position.coords.latitude;
            self.lon = position.coords.longitude;

            var params = {
              page: self.page,
              lat: self.lat,
              lon: self.lon
            };

            $http.get('https://codecraftpro.com/api/samples/v1/coffee/', {params: params})
              .success(function (data) {
                self.isLoading = false;
                console.log(data);

                if (data.businesses.length == 0) {
                  self.hasMore = false;
                } else {
                  angular.forEach(data.businesses, function (business) {
                    self.results.push(business);
                  });
                }

                deferred.resolve();
              })
              .error(function (data, status, headers, config) {
                self.isLoading = false;
                deferred.reject(data);
              });
          }, function (err) {
              console.log("An error occurred while getting geolocation");
              $ionicPopup.alert({
                'title':'Please switch on geolocation',
                "template":"It seems like you've switched off geolocation for caffeinefiend"
              });
          })
      })


			return deferred.promise;
		}
	};

	self.load();

	return self;
});
