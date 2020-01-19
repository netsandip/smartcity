import { Component, ElementRef, NgModule, NgZone, OnInit, ViewChild, Input, ViewContainerRef, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { BrowserModule } from "@angular/platform-browser";
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs/Rx';

declare var google: any;

@Component({
    selector: 'app-wastage',
    templateUrl: './GPSTrack.component.html',
    styleUrls: ['./GPSTrack.component.scss']
})

export class GPSTrackComponent implements OnInit {


    public lat: number = 5.4163;
    public lng: number = 101.9758;
    public icon: string = "fa-car"
    public mark: {};
   // public markers: any[] = [];
    public markers: any[] = [{ "lat": 8.5710, "lng": 76.8844 }, { "lat": 8.5581, "lng": 76.8815}];

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
             
       // setInterval(() => { this.GetDeviceLocation(); }, 500);
      // this.GetDeviceLocation();
       
      

    }
    public GetDeviceLocation() {

        return this.authService.GetDeviceMovement().subscribe(loctionlist => {
            console.log("loctionlist", loctionlist);
            for (var i = 0; i < loctionlist.length; i++) {
                this.mark = { "lat": loctionlist[i].Lat, "lng": loctionlist[i].Long, "speed": loctionlist[i].Speed }
                this.markers.push(this.mark);
            }


        })
    }
    
  

 

  
}
