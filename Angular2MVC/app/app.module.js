"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var app_component_1 = require("./app.component");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var http_1 = require("@angular/http");
var app_routing_1 = require("./app.routing");
var user_service_1 = require("./Services/user.service");
var state_component_1 = require("./Components/state.component");
var observer_service_1 = require("./Services/observer.service");
var characteristics_component_1 = require("./Components/characteristics.component");
var leadContact_component_1 = require("./Components/leadContact.component");
var location_component_1 = require("./Components/location.component");
var report_component_1 = require("./Components/report.component");
var technicalContact_component_1 = require("./Components/technicalContact.component");
var vendor_component_1 = require("./Components/vendor.component");
var dashboard_component_1 = require("./Components/dashboard.component");
var state_service_1 = require("./Services/state.service");
var leadContact_service_1 = require("./Services/leadContact.service");
var location_service_1 = require("./Services/location.service");
var genericUtility_service_1 = require("./Services/genericUtility.service");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.ReactiveFormsModule, http_1.HttpModule, app_routing_1.routing, ng2_bs3_modal_1.Ng2Bs3ModalModule],
        declarations: [app_component_1.AppComponent, state_component_1.StateComponent, characteristics_component_1.CharacteristicComponent, leadContact_component_1.LeadContactComponent,
            location_component_1.LocationComponent, report_component_1.ReportComponent, technicalContact_component_1.TechnicalContactComponent, vendor_component_1.VendorComponent, dashboard_component_1.DashboardComponent],
        providers: [{ provide: common_1.APP_BASE_HREF, useValue: '/' }, user_service_1.UserService, observer_service_1.ObserverService, state_service_1.StateService, leadContact_service_1.LeadContactService, location_service_1.LocationService, genericUtility_service_1.GenericUtilityService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map