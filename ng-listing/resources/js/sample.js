var myApp = angular.module('myApp', []);
myApp.controller('PanelController', function($scope) {
	$scope.panelName = "List Contacts";
	$scope.contacts = [ {
		firstName: "Bruce",
		lastName: "Wayne"
	}, {    firstName: "Peter",
		lastName: "Parker"
	}, {
		firstName: "Bruce",
		lastName: "Banner"
	}];
});
