"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var forms_1 = require("@angular/forms");
var modal_1 = require("ng2-bs3-modal/components/modal");
var core_1 = require("@angular/core");
var observer_service_1 = require("../Services/observer.service");
var global_1 = require("../Shared/global");
var genericUtility_service_1 = require("../Services/genericUtility.service");
var ReportComponent = (function () {
    function ReportComponent(fb, _stateService, _technicalContactService) {
        this.fb = fb;
        this._stateService = _stateService;
        this._technicalContactService = _technicalContactService;
    }
    ReportComponent.prototype.ngOnDestroy = function () {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
    };
    ReportComponent.prototype.LoadReports = function (stateId) {
        var _this = this;
        this._technicalContactService.getArray(global_1.Global.BASE_REPORT_ENDPOINT, stateId)
            .subscribe(function (reports) { _this.reports = reports; }, function (error) { return _this.msg = error; });
    };
    ReportComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.leadContactFrm = this.fb.group({
            Id: [''],
            FirstName: ['', forms_1.Validators.required],
            LastName: ['']
        });
        this.subscription = this._stateService.sourceItem$.subscribe(function (id) {
            if (id) {
                _this.stateId = id;
                _this.LoadReports(id.toString());
            }
        });
    };
    return ReportComponent;
}());
__decorate([
    core_1.ViewChild('modal'),
    __metadata("design:type", modal_1.ModalComponent)
], ReportComponent.prototype, "modal", void 0);
ReportComponent = __decorate([
    core_1.Component({
        selector: 'report-component',
        templateUrl: global_1.Global.TEMPLATE_LOCATION + 'report.template.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, observer_service_1.ObserverService, genericUtility_service_1.GenericUtilityService])
], ReportComponent);
exports.ReportComponent = ReportComponent;
//# sourceMappingURL=report.component.js.map