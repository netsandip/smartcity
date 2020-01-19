import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

// import {TooltipModule} from "ngx-tooltip";
import { AccordionModule } from "ng2-accordion";
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ToastOptions, ToastsManager } from 'ng2-toastr';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CustomOption } from './custom-option';
import { ChartsModule } from 'ng2-charts';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StreetLightComponent } from './StreetLight/StreetLight.component';

import { SmartStreetLightComponent } from './SmartStreetLight/SmartStreetLight.component';

import { wastageComponent } from './wastage/wastage.component';
import { livetrafficComponent } from './livetraffic/livetraffic.component';
import { GPSTrackComponent } from './GPSTrack/GPSTrack.component';

//import {LivegraphsComponent} from './livegraphs/livegraphs.Component';
import { livedemographComponent } from './livedemograph/livedemograph.component';


import { CurrentComponent } from './current/current.component';
import { VoltageComponent } from './voltage/voltage.component';
import { parkingComponent } from './parking/parking.component';
import { IconsComponent } from './icons/icons.component';

import { UpgradeComponent } from './upgrade/upgrade.component';
import { AgmCoreModule } from '@agm/core';
import { GaugeModule } from 'ng2-kw-gauge';
import { NguiMapModule } from '@ngui/map';


@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        livedemographComponent,
        // LivegraphsComponent,
        VoltageComponent,
        wastageComponent,
        CurrentComponent,
        parkingComponent,
        IconsComponent,
        UpgradeComponent,
        livetrafficComponent,
        GPSTrackComponent,
        StreetLightComponent,
        SmartStreetLightComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        ComponentsModule,
        RouterModule,
        AppRoutingModule,
        MultiselectDropdownModule,
        AccordionModule,
        BrowserAnimationsModule,
        ToastModule.forRoot(),
        Ng2SmartTableModule,
        ChartsModule,
        GaugeModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCxMV_Va1RwAwBtvZMJX-ICpAXc1SVEsQU'
        }),
        NguiMapModule.forRoot({ apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyDNeoaNWOhFH0-dWbQDecPNkuTzOzgXb_Q' })
    ],
    providers: [AuthGuard, AuthService, { provide: ToastOptions, useClass: CustomOption }],
    bootstrap: [AppComponent]
})
export class AppModule { }
