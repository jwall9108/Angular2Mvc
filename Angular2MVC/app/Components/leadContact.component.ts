import { IBook } from '../Model/book';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ModalComponent } from "ng2-bs3-modal/components/modal";
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { ObserverService } from "../Services/observer.service";
import { Global } from "../Shared/global";
import { LeadContact } from "../Model/State/leadContact";
import { LeadContactService } from "../Services/leadContact.service";
import { GenericUtilityService } from "../Services/genericUtility.service";
import { DBOperation } from "../Shared/enum";

@Component({
    selector: 'leadContact-component',
    templateUrl: Global.TEMPLATE_LOCATION + 'leadContact.template.html'
})

export class LeadContactComponent implements OnInit, OnDestroy {

    dbops: DBOperation;
    contact: LeadContact;
    modalBtnTitle: string;
    modalTitle: string;
    msg: any;
    @ViewChild('leadContactModal') modal: ModalComponent;
    contacts: LeadContact[];
    leadContactFrm: FormGroup;
    subscription: Subscription;
    stateId: number;

    constructor(private fb: FormBuilder, private _stateService: ObserverService<number>, private _leadContactService: GenericUtilityService<LeadContact>) {

    }

    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
    }

    LoadContacts(stateId: string): void {
        this._leadContactService.getArray(Global.BASE_CONTACT_ENDPOINT + 'GetContacts/', stateId)
            .subscribe(contacts => { this.contacts = contacts; },
            error => this.msg = <any>error);
    }

    editContact(id: number) {
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit User";
        this.modalBtnTitle = "Update";
        this.contact = this.contacts.filter(x => x.Id == id)[0];
        this.leadContactFrm.setValue(this.contact);
        this.modal.open();
    }

    deleteContact(id: number) {
        this.dbops = DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.contact = this.contacts.filter(x => x.Id == id)[0];
        this.leadContactFrm.setValue(this.contact);
        this.modal.open();
    }

    addContact() {
        this.dbops = DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New User";
        this.modalBtnTitle = "Add";
        this.leadContactFrm.reset();
        this.modal.open();
    }

    ngOnInit(): void {
        this.leadContactFrm = this.fb.group({
            Id: [''],
            Name: ['', Validators.required],
            Role: [''],
            Phone: [''],
            Email: ['', Validators.required],
            Fax: [''],
            AdditionalInfo: []
        });

        this.subscription = this._stateService.sourceItem$.subscribe(id => {
            if (id) {
                this.stateId = id;
                this.LoadContacts(id.toString());
                this.msg = null;
            }
        });
    }

    onSubmit(formData: any) {
        this.msg = "";

        switch (this.dbops) {
            case DBOperation.create:
                this._leadContactService.post(Global.BASE_CONTACT_ENDPOINT + 'AddContact/' + this.stateId.toString(), formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully added.";
                            this.LoadContacts(this.stateId.toString());
                        }
                        else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.update:
                this._leadContactService.put(Global.BASE_CONTACT_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully updated.";
                            this.LoadContacts(this.stateId.toString());
                        }
                        else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.delete:
                this._leadContactService.delete(Global.BASE_CONTACT_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully deleted.";
                            this.LoadContacts(this.stateId.toString());
                        }
                        else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
        }
    }

    SetControlsState(isEnable: boolean) {
        isEnable ? this.leadContactFrm.enable() : this.leadContactFrm.disable();
    }
}