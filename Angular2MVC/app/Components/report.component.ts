import { IBook } from '../Model/book';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ModalComponent } from "ng2-bs3-modal/components/modal";
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { ObserverService } from "../Services/observer.service";
import { Global } from "../Shared/global";
import { GenericUtilityService } from "../Services/genericUtility.service";
import { ReportStatus } from "../Model/State/stateReportStatus";

@Component({
    selector: 'report-component',
    templateUrl: Global.TEMPLATE_LOCATION + 'report.template.html'
})

export class ReportComponent implements OnInit, OnDestroy {

    stateId: number;
    msg: any;
    @ViewChild('modal') modal: ModalComponent;
    reports: ReportStatus[];
    leadContactFrm: FormGroup;
    subscription: Subscription;
    item: number;

    constructor(private fb: FormBuilder, private _stateService: ObserverService<number>, private _technicalContactService: GenericUtilityService<ReportStatus>) {

    }

    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
    }

    LoadReports(stateId: string): void {
        this._technicalContactService.getArray(Global.BASE_REPORT_ENDPOINT, stateId)
            .subscribe(reports => { this.reports = reports;},
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
                this.LoadReports(id.toString());
            }
        });
    }
}