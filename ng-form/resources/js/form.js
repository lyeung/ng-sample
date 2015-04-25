var myApp = angular.module("myApp", []);
myApp.controller("FormController", function($scope) {
	$scope.contactRows = [];
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
		$scope.contactRows.push($scope.contact);
		console.log($scope.contactRows.length);
	}

	$scope.cancel = function() {
		$scope.contact = newContact();
		$scope.entryForm.$setPristine();
	}
});
