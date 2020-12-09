"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var aliment_service_1 = require("./aliment.service");
describe('AlimentService', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = testing_1.TestBed.get(aliment_service_1.AlimentService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=aliment.service.spec.js.map