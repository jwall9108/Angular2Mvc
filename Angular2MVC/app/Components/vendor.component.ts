﻿import { IBook } from '../Model/book';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ModalComponent } from "ng2-bs3-modal/components/modal";
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { ObserverService } from "../Services/observer.service";
import { Global } from "../Shared/global";
import { GenericUtilityService } from "../Services/genericUtility.service";
import { Vendor } from "../Model/State/Vendor";

@Component({
    selector: 'vendor-component',
    templateUrl: Global.TEMPLATE_LOCATION + 'vendor.template.html'
})

export class VendorComponent implements OnInit, OnDestroy {

    stateId: number;
    msg: any;
    @ViewChild('modal') modal: ModalComponent;
    vendors: Vendor[];
    leadContactFrm: FormGroup;
    subscription: Subscription;
    item: number;

    constructor(private fb: FormBuilder, private _stateService: ObserverService<number>, private _vendorService: GenericUtilityService<Vendor>) {

    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onError(error: any) {
        this.msg = <any>error;
    }

    LoadVendors(stateId: any): void {
        if (stateId) {
            this._vendorService.getArray(Global.BASE_VENDOR_ENDPOINT, stateId.toString())
                .subscribe(vendors => { this.vendors = vendors; }, this.onError);
        }
    }

    ngOnInit(): void {
        this.leadContactFrm = this.fb.group({
            Id: [''],
            FirstName: ['', Validators.required],
            LastName: ['']
        });

        this.subscription = this._stateService.sourceItem$.subscribe(id => { this.LoadVendors(id); }, this.onError);
    }
}