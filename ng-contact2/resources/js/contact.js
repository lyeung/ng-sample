var myApp = angular.module("myContact", ["ngResource"]);
myApp.factory("ContactResource", function($resource) {
	return $resource("http://localhost:8080/contacts/:lastName");
});

myApp.controller("PanelController", function($scope) {
});


myApp.controller("ListingController", function($scope, $rootScope, ContactResource) {
	$scope.panelName = "List Contacts";
	$scope.contacts = ContactResource.query();
	$rootScope.$on("refresh", function() {
		$scope.contacts = ContactResource.query();
	});
});


myApp.controller("FormController", function($scope, $rootScope, ContactResource){
	var newContact = function() {
		return {
			firstName: "",
			lastName: ""
		}
	};

	$scope.panelName = "Contact Entry";
	$scope.contact = newContact();
	
	$scope.save  = function() {
		ContactResource.save($scope.contact).$promise.then(function() {
			$rootScope.$broadcast("refresh");
		});
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
