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

@Component({
    selector: 'leadContact-component',
    templateUrl: Global.TEMPLATE_LOCATION + 'leadContact.template.html'
})

export class LeadContactComponent implements OnInit, OnDestroy {
    msg: any;
    @ViewChild('modal') modal: ModalComponent;
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
        this._leadContactService.getArray(Global.BASE_CONTACT_ENDPOINT, stateId)
            .subscribe(contacts => { this.contacts = contacts; },
            error => this.msg = <any>error);
    }

    ngOnInit(): void {
        this.leadContactFrm = this.fb.group({
            Id: [''],
            FirstName: ['', Validators.required],
            LastName: ['']
        });

        this.subscription = this._stateService.sourceItem$.subscribe(id => {

            if (id) {
                this.stateId = id;
                this.LoadContacts(id.toString());
            }
        });
    }
}