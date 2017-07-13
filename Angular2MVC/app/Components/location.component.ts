import { IBook } from '../Model/book';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ModalComponent } from "ng2-bs3-modal/components/modal";
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { ObserverService } from "../Services/observer.service";
import { Global } from "../Shared/global";
import { LocationService } from "../Services/location.service";
import { StateLocation } from "../Model/State/stateLocation";
import { GenericUtilityService } from "../Services/genericUtility.service";

@Component({
    selector: 'location-component',
    templateUrl: Global.TEMPLATE_LOCATION + 'location.template.html'
})

export class LocationComponent implements OnInit, OnDestroy {

    msg: any;
    @ViewChild('modal') modal: ModalComponent;
    locations: StateLocation[];
    leadContactFrm: FormGroup;
    subscription: Subscription;
    item: number;
    stateId: number;

    constructor(private fb: FormBuilder, private _stateService: ObserverService<number>, private _locationService: GenericUtilityService<StateLocation>) {
    }

    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
    }

    LoadLocations(stateId: string): void {
        this._locationService.getArray(Global.BASE_LOCATION_ENDPOINT, stateId)
            .subscribe(locations => { this.locations = locations; },
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
                this.LoadLocations(id.toString());
            }
        });
    }
}