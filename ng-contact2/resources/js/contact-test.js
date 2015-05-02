describe("Test PanelController", function() {
	var scope, rootScope, panelController, listingController, formController, contactResource;;
	var compile;

	beforeEach(module("myContact"));

	describe("Initial listing page", function() {
		beforeEach(inject(function($rootScope, $controller, ContactResource) {
			scope = $rootScope.$new();
			rootScope = $rootScope;
			// ...
			contactResource = ContactResource;
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
			panelController = $controller("ListingController", { $scope: scope });
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
		var httpBackend;
		beforeEach(inject(function($rootScope, $controller, $compile, $httpBackend, ContactResource) {
			scope = $rootScope.$new();
			compile = $compile;
			rootScope = $rootScope;
			// ...
			contactResource = ContactResource;
			httpBackend = $httpBackend;
			panelController = $controller("PanelController", { $scope: scope });
			formController = $controller("FormController", { $scope: scope, ContactResource: contactResource  });
		}));

		afterEach(function() {
		     httpBackend.verifyNoOutstandingExpectation();
		     httpBackend.verifyNoOutstandingRequest();
		});

		it("should add an entry and broadcast event", function() {
			var mockData = {
				firstName: "george",
				lastName: "roper"
			};
			var url = "http://localhost:8080/contacts";
			httpBackend.expectPOST(url).respond(mockData);
			spyOn(rootScope, '$broadcast').and.callThrough();

			var element = angular.element("<form name='entryForm'></form>");
			element = compile(element)(scope);
			entryForm = scope.entryForm;
			spyOn(entryForm, '$setPristine');	

			scope.contact.firstName = "george";
			scope.contact.lastName = "roper";
			scope.save();
			httpBackend.flush();
			expect(rootScope.$broadcast).toHaveBeenCalledWith("refresh");

			expect(scope.contact.firstName).toEqual("");
			expect(scope.contact.lastName).toEqual("");
			expect(scope.entryForm.$setPristine.calls.count()).toEqual(1);
		});
	});

	describe("Refresh listing", function() {
		var httpBackend;
		beforeEach(inject(function($rootScope, $controller, $compile, $httpBackend, ContactResource) {
			scope = $rootScope.$new();
			compile = $compile;
			rootScope = $rootScope;
			// ...
			contactResource = ContactResource;
			httpBackend = $httpBackend;
			panelController = $controller("PanelController", { $scope: scope });
			listingController = $controller("ListingController", { $scope: scope, ContactResource: contactResource  });
		}));

		afterEach(function() {
		     httpBackend.verifyNoOutstandingExpectation();
		     httpBackend.verifyNoOutstandingRequest();
		});

		it("should get contacts list", function() {
			var mockData = {
				firstName: "george",
				lastName: "roper"
			};
			var url = "http://localhost:8080/contacts";
			httpBackend.expectGET(url).respond([mockData]);

			expect(scope.contacts.length).toEqual(0);

			httpBackend.flush();
			expect(scope.contacts.length).toEqual(1);
		});

		it("should get contacts list when refresh", function() {
			var mockData1 = {
				firstName: "george",
				lastName: "roper"
			};
			var url = "http://localhost:8080/contacts";
			httpBackend.expectGET(url).respond([mockData1]);
			expect(scope.contacts.length).toEqual(0);
			httpBackend.flush();
			expect(scope.contacts.length).toEqual(1);

			var mockData2 = {
				firstName: "norman",
				lastName: "eshley"
			};
			httpBackend.expectGET(url).respond([mockData1, mockData2]);
			spyOn(rootScope, "$broadcast").and.callThrough();

			expect(scope.contacts.length).toEqual(1);
			expect(scope.contacts[0].firstName).toEqual("george");
			expect(scope.contacts[0].lastName).toEqual("roper");

			rootScope.$broadcast("refresh");
			httpBackend.flush();
			expect(rootScope.$broadcast).toHaveBeenCalledWith("refresh");
			
			expect(scope.contacts.length).toEqual(2);
			expect(scope.contacts[0].firstName).toEqual("george");
			expect(scope.contacts[0].firstName).toEqual("george");
			expect(scope.contacts[1].firstName).toEqual("norman");
			expect(scope.contacts[1].lastName).toEqual("eshley");
		});
	});
});
