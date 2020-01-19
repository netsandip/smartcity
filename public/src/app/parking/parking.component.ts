import { Component, ElementRef, NgModule, NgZone, OnInit, ViewChild, Input, ViewContainerRef, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {deviceModel} from '../model/deviceModel';
import {projectModel} from '../model/projectModel';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Ng2SmartTableModule, LocalDataSource  } from 'ng2-smart-table';
import { BrowserModule } from "@angular/platform-browser";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';


import {AuthService} from '../services/auth.service';
declare var google: any;

@Component({
    selector: 'app-parking',
    templateUrl: './parking.component.html',
    styleUrls: ['./parking.component.scss']
})

export class parkingComponent implements OnInit {


    public bookparking: number;   
    public availableparking: number;
    public minhumdi: number;
    public maxhumdi: number;
    public lightcapacity: number;
    public minlight: number;
    public maxlight: number;
    public rainycapacity: number;
    public minrainy: number;
    public maxrainy: number;

    public title: string = 'UST Global Trivandrum';
    public lat: number = 8.537184;
    public lng: number = 76.883421;

    public lat1: number = 8.5581;
    public lng1: number = 76.8815;
    public isshowparkinggraph: boolean= false;
    public hidegooglemap: boolean = false;
  
    public totalavailableF1: number = 0;
    public totalavailableF2: number = 0;
  

    constructor(private router: Router,
        private activatedRoute: ActivatedRoute,     
        public toastr: ToastsManager,
        public vcr: ViewContainerRef,      
        private authService: AuthService

    ) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {       
        this.getParkingData(); 
       // setInterval(() => { this.getParkingData(); }, 10000); 
        setInterval(() => { this.CheckIsParkingBooked(); }, 7000);
        this.getParkingDetails();     
        //this.bookparking = 32;      
        //this.availableparking = 68;
        //this.minhumdi = 51.2;
        //this.maxhumdi = 74.8;
        //this.lightcapacity = 34.5;
        //this.minlight = 0.0;
        //this.maxlight = 14.5;
        //this.rainycapacity = 71.8;
        //this.minrainy = 66.0;
        //this.maxrainy = 71.8;
     
    }

  

   
    public ListOfDate: string[];
    public FirstParkingData: string[];
    public SecondParkingData: string[];
    public barChartLabels: string[];
    public isbooked1: string = "0";
    public isbooked2: string = "0";
    public barChartData: any[] = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Floor 1' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Floor 2' }
    ];

    public CheckIsParkingBooked() {
      
        return this.authService.GetParkingDetails().subscribe(parkingDetails => {           
            this.isbooked1 = parkingDetails[0].rowlist[0].isBooked;
            this.isbooked2 = parkingDetails[1].rowlist[0].isBooked;   
            this.totalavailableF1 = parkingDetails[0].TotalAvailableslots;
            this.totalavailableF2 = parkingDetails[1].TotalAvailableslots;        
            //for (var i = 0; i < parkingDetails[0].rowlist.length; i++) {
            //    console.log("parkingDetails1", parkingDetails[0].rowlist[i])
            //    if (parkingDetails[0].rowlist[i].isBooked == 0) {
            //        this.totalavailableF1 = this.totalavailableF1 + 1;
            //        this. totalavailableF1tmp = this.totalavailableF1;
            //    }
            //}

        })
    }
    public getParkingData() {      
        this.ListOfDate = new Array();
        this.FirstParkingData = new Array();
        this.SecondParkingData = new Array();
        return this.authService.GetParkingData().subscribe(parkingRecords => { 
            var previd = parkingRecords[0].DeviceID;
            for (var i = 0; i < parkingRecords.length; i++) {
                if (previd == parkingRecords[i].DeviceID) {
                    this.ListOfDate.push(parkingRecords[i].Tranhour);
                    this.FirstParkingData.push(parkingRecords[i].BookedCount)
                }
                else {
                    this.SecondParkingData.push(parkingRecords[i].BookedCount)
                }
              
            }

            this.barChartLabels = this.ListOfDate;
            this.barChartData[0].data = this.FirstParkingData;
            this.barChartData[1].data = this.SecondParkingData;            
        },
            err => {
                console.log(err);
                return false;
            });;


    };

    public itemsList = [];
    public itemsList1 = [];
    public getParkingDetails() {
        return this.authService.GetParkingDetails().subscribe(parkingDetails => {
           
            var previd = parkingDetails[0].parkingslot;
            for (var i = 0; i < parkingDetails.length; i++) {
                if (previd == parkingDetails[i].parkingslot) {
                    this.itemsList.push(parkingDetails[i]);
                                  
                }
                else {
                    this.itemsList1.push(parkingDetails[i]);

                }
            }
           
          
            
        },
            err => {
                console.log(err);
                return false;
            });;
    }
  
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;

    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

    public randomize(): void {
       
        let data = [
            Math.round(Math.random() * 100),
            59,
            80,
            (Math.random() * 100),
            56,
            (Math.random() * 100),
            40];
        let clone = JSON.parse(JSON.stringify(this.barChartData));
        clone[0].data = data;
        this.barChartData = clone;       
    }

    public parkingList = [
        {
            "PId": "1", "PName": "Parking A",
        },
        {
            "PId": "2", "PName": "Parking B",
        }
    ];

    public onChange(deviceValue:any):void {
        alert();
    }



    
    public showdetails() {
        this.isshowparkinggraph = !this.isshowparkinggraph;
    };
    public hidegraph() {        
        this.hidegooglemap = true;
    };
}
