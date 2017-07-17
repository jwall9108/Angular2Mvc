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
var enum_1 = require("../Shared/enum");
var LeadContactComponent = (function () {
    function LeadContactComponent(fb, _stateService, _leadContactService) {
        this.fb = fb;
        this._stateService = _stateService;
        this._leadContactService = _leadContactService;
    }
    LeadContactComponent.prototype.ngOnDestroy = function () {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
    };
    LeadContactComponent.prototype.LoadContacts = function (stateId) {
        var _this = this;
        this._leadContactService.getArray(global_1.Global.BASE_CONTACT_ENDPOINT + 'GetContacts/', stateId)
            .subscribe(function (contacts) { _this.contacts = contacts; }, function (error) { return _this.msg = error; });
    };
    LeadContactComponent.prototype.editContact = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit User";
        this.modalBtnTitle = "Update";
        this.contact = this.contacts.filter(function (x) { return x.Id == id; })[0];
        this.leadContactFrm.setValue(this.contact);
        this.modal.open();
    };
    LeadContactComponent.prototype.deleteContact = function (id) {
        this.dbops = enum_1.DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.contact = this.contacts.filter(function (x) { return x.Id == id; })[0];
        this.leadContactFrm.setValue(this.contact);
        this.modal.open();
    };
    LeadContactComponent.prototype.addContact = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New User";
        this.modalBtnTitle = "Add";
        this.leadContactFrm.reset();
        this.modal.open();
    };
    LeadContactComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.leadContactFrm = this.fb.group({
            Id: [''],
            Name: ['', forms_1.Validators.required],
            Role: [''],
            Phone: [''],
            Email: ['', forms_1.Validators.required],
            Fax: [''],
            AdditionalInfo: []
        });
        this.subscription = this._stateService.sourceItem$.subscribe(function (id) {
            if (id) {
                _this.stateId = id;
                _this.LoadContacts(id.toString());
                _this.msg = null;
            }
        });
    };
    LeadContactComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._leadContactService.post(global_1.Global.BASE_CONTACT_ENDPOINT + 'AddContact/' + this.stateId.toString(), formData._value).subscribe(function (data) {
                    if (data == 1) {
                        _this.msg = "Data successfully added.";
                        _this.LoadContacts(_this.stateId.toString());
                    }
                    else {
                        _this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.update:
                this._leadContactService.put(global_1.Global.BASE_CONTACT_ENDPOINT, formData._value.Id, formData._value).subscribe(function (data) {
                    if (data == 1) {
                        _this.msg = "Data successfully updated.";
                        _this.LoadContacts(_this.stateId.toString());
                    }
                    else {
                        _this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.delete:
                this._leadContactService.delete(global_1.Global.BASE_CONTACT_ENDPOINT, formData._value.Id).subscribe(function (data) {
                    if (data == 1) {
                        _this.msg = "Data successfully deleted.";
                        _this.LoadContacts(_this.stateId.toString());
                    }
                    else {
                        _this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
        }
    };
    LeadContactComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.leadContactFrm.enable() : this.leadContactFrm.disable();
    };
    return LeadContactComponent;
}());
__decorate([
    core_1.ViewChild('leadContactModal'),
    __metadata("design:type", modal_1.ModalComponent)
], LeadContactComponent.prototype, "modal", void 0);
LeadContactComponent = __decorate([
    core_1.Component({
        selector: 'leadContact-component',
        templateUrl: global_1.Global.TEMPLATE_LOCATION + 'leadContact.template.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, observer_service_1.ObserverService, genericUtility_service_1.GenericUtilityService])
], LeadContactComponent);
exports.LeadContactComponent = LeadContactComponent;
//# sourceMappingURL=leadContact.component.js.map