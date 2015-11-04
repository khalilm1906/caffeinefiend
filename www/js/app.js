var app = angular.module('caffeinefiend', [
	'ionic',
  'ngCordova',
	'caffeinefiend.controllers',
	'caffeinefiend.services',
	'caffeinefiend.filters'
]);

app.run(function ($ionicPlatform) {
	$ionicPlatform.ready(function () {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);

		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
});

app.config(function ($httpProvider) {
	$httpProvider.defaults.headers.common['Authorization'] = 'Token 988e04442d9449f22a534084f1e66e32c1657a86';
});
