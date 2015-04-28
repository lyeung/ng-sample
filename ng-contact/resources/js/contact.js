var myApp = angular.module("myContact", []);
myApp.controller("PanelController", function($scope) {
	$scope.contacts = [];
});


myApp.controller("ListingController", function($scope) {
	$scope.panelName = "List Contacts";
});


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
		//console.log("saving contact: firstName=" + $scope.contact.firstName + ", lastName=" + $scope.contact.lastName);
		$scope.contacts.push($scope.contact);
		//console.log($scope.contacts.length);
		clearForm();
	}

	$scope.cancel = function() {
		clearForm();
	}

	var clearForm = function() {
		$scope.contact = newContact();
		$scope.entryForm.$setPristine();
	}
});
