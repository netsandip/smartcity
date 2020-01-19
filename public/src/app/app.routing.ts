import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
//import {LivegraphsComponent} from './livegraphs/livegraphs.Component';
import { wastageComponent} from './wastage/wastage.component';

import {parkingComponent} from './parking/parking.component';
import { IconsComponent } from './icons/icons.component';
import {CurrentComponent} from './current/current.component';
import {VoltageComponent} from './voltage/voltage.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { StreetLightComponent } from './StreetLight/StreetLight.component';
import {livetrafficComponent } from './livetraffic/livetraffic.component';
import { GPSTrackComponent } from './GPSTrack/GPSTrack.component';
import {livedemographComponent} from './livedemograph/livedemograph.component';


import { AuthGuard } from './guards/auth.guard';

import { SmartStreetLightComponent } from './SmartStreetLight/SmartStreetLight.component';

const routes: Routes = [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]  },
      { path: 'wastage', component: wastageComponent, canActivate: [AuthGuard] },
      { path: 'parking', component: parkingComponent, canActivate: [AuthGuard] },
      { path: 'livedemograph', component: livedemographComponent, canActivate: [AuthGuard] },
      { path: 'current', component: CurrentComponent, canActivate: [AuthGuard] },
      { path: 'voltage', component: VoltageComponent, canActivate: [AuthGuard] },
      { path: 'StreetLight', component: StreetLightComponent, canActivate: [AuthGuard] },
        { path: 'SmartStreetLight', component: SmartStreetLightComponent },
      { path: 'traffic', component: livetrafficComponent, canActivate: [AuthGuard] },
      { path: 'gps', component: GPSTrackComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
