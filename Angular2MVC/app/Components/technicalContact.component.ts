import { IBook } from '../Model/book';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ModalComponent } from "ng2-bs3-modal/components/modal";
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { ObserverService } from "../Services/observer.service";
import { Global } from "../Shared/global";
import { GenericUtilityService } from "../Services/genericUtility.service";
import { TechnicalContact } from "../Model/State/technicalContact";

@Component({
    selector: 'technicalContact-component',
    templateUrl: Global.TEMPLATE_LOCATION + 'technicalContact.template.html'
})

export class TechnicalContactComponent implements OnInit, OnDestroy {

    stateId: number;
    msg: any;
    @ViewChild('modal') modal: ModalComponent;
    contacts: TechnicalContact[];
    leadContactFrm: FormGroup;
    subscription: Subscription;

    constructor(private fb: FormBuilder, private _stateService: ObserverService<number>, private _technicalContactService: GenericUtilityService<TechnicalContact>) {

    }

    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
    }

    LoadTechnicalContacts(stateId: string): void {
        this._technicalContactService.getArray(Global.BASE_TECHNICALCONTACT_ENDPOINT, stateId)
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
                this.LoadTechnicalContacts(id.toString());
            }
        });
    }
}