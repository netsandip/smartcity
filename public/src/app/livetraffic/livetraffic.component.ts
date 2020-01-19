import { Component, ElementRef, NgModule, NgZone, OnInit, ViewChild, Input, ViewContainerRef, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { BrowserModule } from "@angular/platform-browser";
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs/Rx';

declare var google: any;

@Component({
    selector: 'app-wastage',
    templateUrl: './livetraffic.component.html',
    styleUrls: ['./livetraffic.component.scss']
})

export class livetrafficComponent implements OnInit {


    public lat: number = 8.537184;
    public lng: number = 76.883421;
    public markers: any[] = [{ "lat": 8.537184, "lng": 76.883421, "icon": "default-icon.png" }, { "lat": 8.537184, "lng": 76.883421, "icon": "default-icon.png" }];

    onMapReady(map) {
        console.log('map', map);
        console.log('markers', map.markers);  // to get all markers as an array 
    }
    onIdle(event) {
        console.log('map', event.target);
    }
    onMarkerInit(marker) {
        console.log('marker', marker);
    }
    onMapClick(event) {
       // this.positions.push(event.latLng);
        event.target.panTo(event.latLng);
    }

    public availableDustbin: string;
    public fulldustbin: string;
    constructor(
        private authService: AuthService,
        private router: Router,
        private activatedRoute: ActivatedRoute,     
        public vcr: ViewContainerRef

    ) {
      
    }


    ngOnInit() {   
            
      

    }
  
 

  
}
