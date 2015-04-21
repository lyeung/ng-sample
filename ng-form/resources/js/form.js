var myApp = angular.module("myApp", []);
myApp.controller("FormController", function($scope) {
	var newContact = function() {
		return {
			firstName: "",
			lastName: ""
		}
	};

	$scope.panelName = "Contact Entry";
	$scope.contact = newContact();
	
	$scope.save  = function() {
		console.log("saving contact: firstName=" + $scope.contact.firstName + ", lastName=" + $scope.contact.lastName);
	}

	$scope.cancel = function() {
		$scope.contact = newContact();
		$scope.entryForm.$setPristine();
	}
});
