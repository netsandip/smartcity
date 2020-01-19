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
    selector: 'app-current',
    templateUrl: './voltage.component.html',
    styleUrls: ['./voltage.component.scss']
})

export class VoltageComponent implements OnInit {


    public isshowwastageggraph: boolean = false;
    constructor(

        private router: Router,
        private activatedRoute: ActivatedRoute,
        public toastr: ToastsManager,
        public vcr: ViewContainerRef,
        private authService: AuthService

    ) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
     //   setInterval(() => { this.getVoltageData(); }, 3000); 
        setInterval(() => { this.getVoltageData(); }, 3000); 
     
    }



    public getVoltageData() {

        this.ListOfDate = new Array();
        this.FirstParkingData = new Array();
        this.SecondParkingData = new Array();
        // var NewChardata = this.barChartData;

        // console.log("groupedObj",NewChardata);
        return this.authService.GetVoltageData().subscribe(Cureentdata => {
            console.log("groupedObj", Cureentdata)
            var previd = Cureentdata[0].DeviceID;
            var secid;
            for (var i = 0; i < Cureentdata.length; i++) {


                if (previd == Cureentdata[i].DeviceID) {
                    this.ListOfDate.push(Cureentdata[i].TranTime);
                    this.FirstParkingData.push((Cureentdata[i].Data == null ? 0 : Cureentdata[i].Data.toString()));


                }
                else {

                    secid = Cureentdata[i].DeviceID;
                    this.SecondParkingData.push((Cureentdata[i].Data == null ? 0 : Cureentdata[i].Data.toString()));
                }


            }

            this.barChartData[0].label = "Device: " + previd;
            if (Cureentdata.length > 1) {
                // this.barChartData[1].label = "Device: " + secid;
                // this.barChartData[1].data = this.SecondParkingData;
            }

            console.log(this.ListOfDate);
            this.barChartLabels = this.ListOfDate;

            this.barChartData[0].data = this.FirstParkingData;


        },
            err => {
                console.log(err);
                return false;
            });;



    };




    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public ListOfDate: string[];
    public FirstParkingData: string[];
    public SecondParkingData: string[];
    public barChartLabels: string[];//= ['16 oct', '17 oct', '18 oct', '19 oct', '20 oct', '21 oct', '22 oct'];
    public barChartType: string = 'line';
    public barChartLegend: boolean = true;

    public barChartData: any[] = [
        { data: [-19, -15, 33, 10, -20, 25, -8], Device: 'label:905' },
       // { data: [-9, -4, 33, 15, 20, -15, 8], Device: 'label:907' },

    ];


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

    // Update Device profile
    public item = {};
    public itemsList = [
        {
            "city": "Delhi", "Area": "CP", "Block": "1", "rowlist": [{ "Row": "0", "isBooked": "1", "full":"5" },
                { "Row": "1", "isBooked": "0", "full": "20" },
                { "Row": "2", "isBooked": "0", "full": "40" }
            ]
        },
        {
            "city": "Delhi", "Area": "CP", "Block": "2", "rowlist": [{ "Row": "0", "isBooked": "1", "full": "10" },
                { "Row": "1", "isBooked": "0", "full": "40" },
                { "Row": "2", "isBooked": "0", "full": "80"}
            ]
        }
     
    ];
    public item1 = {};
    public itemsList1 = [
        {
            "city": "Delhi", "Area": "CP", "Block": "1", "rowlist": [{ "Row": "0", "isBooked": "1", "full": "20" },
                { "Row": "1", "isBooked": "1", "full": "40" },
                { "Row": "2", "isBooked": "0", "full": "80"}
            ]
        },
        {
            "city": "Delhi", "Area": "CP", "Block": "2", "rowlist": [{ "Row": "0", "isBooked": "1", "full": "10"},
                { "Row": "1", "isBooked": "1", "full": "20" },
                { "Row": "2", "isBooked": "0", "full": "50" }
            ]
        }
    
    ];
    public showdetails() {
       // this.isshowwastageggraph = !this.isshowwastageggraph;
    }
}
