import { IBook } from '../Model/book';
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
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
    }

    LoadVendors(stateId: string): void {
        this._vendorService.getArray(Global.BASE_VENDOR_ENDPOINT, stateId)
            .subscribe(vendors => {
                this.vendors = vendors;
                console.log(vendors);
                console.log(this.vendors);
            },
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
                this.LoadVendors(id.toString());
            }
        });
    }
}