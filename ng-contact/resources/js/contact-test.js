describe("Test PanelController", function() {
	var scope, panelController, listingController, formController;
	var compile;

	beforeEach(module("myContact"));

	describe("Initial listing page", function() {
		beforeEach(inject(function($rootScope, $controller) {
			scope = $rootScope.$new();
			panelController = $controller("PanelController", { $scope: scope });
			listingController = $controller("ListingController", { $scope: scope });
		}));

		it("should display init page", function() {
			expect(scope.panelName).toEqual("List Contacts");
		});
	});

	describe("Initial form page", function() {
		beforeEach(inject(function($rootScope, $controller) {
			scope = $rootScope.$new();
			panelController = $controller("PanelController", { $scope: scope });
			formController = $controller("FormController", { $scope: scope });
		}));

		it("should display init page", function() {
			expect(scope.panelName).toEqual("Contact Entry");
			expect(scope.contacts.length).toEqual(0);
			expect(scope.contact.firstName).toEqual("");
			expect(scope.contact.lastName).toEqual("");
		});
	});

	describe("Add entry", function() {
		beforeEach(inject(function($rootScope, $controller, $compile) {
			scope = $rootScope.$new();
			compile = $compile;
			panelController = $controller("PanelController", { $scope: scope });
			formController = $controller("FormController", { $scope: scope });
		}));

		it("should add an entry", function() {
			
			var element = angular.element("<form name='entryForm'></form>");
			element = compile(element)(scope);
			entryForm = scope.entryForm;
			spyOn(entryForm, '$setPristine');	

			scope.contact.firstName = "george";
			scope.contact.lastName = "roper";
			scope.save();
			expect(scope.contacts.length).toEqual(1);
			expect(scope.contacts[0].firstName).toEqual("george");
			expect(scope.contacts[0].lastName).toEqual("roper");
			expect(scope.contact.firstName).toEqual("");
			expect(scope.contact.lastName).toEqual("");
			expect(scope.entryForm.$setPristine).toHaveBeenCalled();

			scope.contact.firstName = "norman";
			scope.contact.lastName = "eshely";
			scope.save();
			expect(scope.contacts.length).toEqual(2);
			expect(scope.contacts[0].firstName).toEqual("george");
			expect(scope.contacts[0].lastName).toEqual("roper");
			expect(scope.contacts[1].firstName).toEqual("norman");
			expect(scope.contacts[1].lastName).toEqual("eshely");
			expect(scope.contact.firstName).toEqual("");
			expect(scope.contact.lastName).toEqual("");
			expect(scope.entryForm.$setPristine).toHaveBeenCalled();

			scope.contact.firstName = "mildred";
			scope.contact.lastName = "roper";
			scope.cancel();
			expect(entryForm.$setPristine).toHaveBeenCalled();
			expect(scope.contacts.length).toEqual(2);
			expect(scope.contacts[0].firstName).toEqual("george");
			expect(scope.contacts[0].lastName).toEqual("roper");
			expect(scope.contacts[1].firstName).toEqual("norman");
			expect(scope.contacts[1].lastName).toEqual("eshely");
			expect(scope.contact.firstName).toEqual("");
			expect(scope.contact.lastName).toEqual("");
			expect(scope.entryForm.$setPristine).toHaveBeenCalled();

			expect(scope.entryForm.$setPristine.calls.count()).toEqual(3);
		});
	});
});
