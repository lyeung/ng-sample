describe("Test FormController", function() {
	var scope, controller;

	beforeEach(module("myApp"));

	describe("Test save form", function() {
		beforeEach(inject(function($rootScope, $controller) {
			scope = $rootScope.$new();
			controller = $controller("FormController", { $scope:scope });
		}));
		
		it("initial form", function() {
			expect(scope.contactRows.length).toEqual(0);
			expect(scope.contact.firstName).toEqual("");
			expect(scope.contact.lastName).toEqual("");

		});
	
		it("save form", function() {
			expect(scope.contactRows.length).toEqual(0);
			scope.contact.firstName = "homer";
			scope.contact.lastName = "simpson";
			scope.save();
			
			expect(scope.contactRows.length).toEqual(1);
			expect(scope.contactRows[0].firstName).toEqual("homer");
			expect(scope.contactRows[0].lastName).toEqual("simpson");
		});
			
	});
});
