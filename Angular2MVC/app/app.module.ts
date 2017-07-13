import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { UserService } from './Services/user.service'
import { StateComponent } from "./Components/state.component";
import { ObserverService } from "./Services/observer.service";
import { CharacteristicComponent } from "./Components/characteristics.component";
import { LeadContactComponent } from "./Components/leadContact.component";
import { LocationComponent } from "./Components/location.component";
import { ReportComponent } from "./Components/report.component";
import { TechnicalContactComponent } from "./Components/technicalContact.component";
import { VendorComponent } from "./Components/vendor.component";
import { DashboardComponent } from "./Components/dashboard.component";
import { StateService } from "./Services/state.service";
import { LeadContactService } from "./Services/leadContact.service";
import { LocationService } from "./Services/location.service";

@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, HttpModule, routing, Ng2Bs3ModalModule],
    declarations: [AppComponent, StateComponent, CharacteristicComponent, LeadContactComponent, 
        LocationComponent, ReportComponent, TechnicalContactComponent, VendorComponent, DashboardComponent],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }, UserService, ObserverService, StateService, LeadContactService, LocationService],
    bootstrap: [AppComponent]
})
export class AppModule { }
