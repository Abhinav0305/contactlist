var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");
	
	$http({
		method : "GET",
		url    : "http://tjrapp.wpi.edu:5353/api/v1/activity-entries",
		params : {}
	}).then(function mySuccess(response){
		$scope.activityList=response.data;
	},function myError(response){
		$scope.activityList=response.statusText;
	});
}]);