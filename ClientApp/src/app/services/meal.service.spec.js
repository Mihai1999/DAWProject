"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var meal_service_1 = require("./meal.service");
describe('MealService', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = testing_1.TestBed.get(meal_service_1.MealService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=meal.service.spec.js.map