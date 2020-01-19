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
    templateUrl: './current.component.html',
    styleUrls: ['./current.component.scss']
})

export class CurrentComponent implements OnInit {


    
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
         
        setInterval(() => { this.getCurrentData(); }, 3000); 
       //this.getCurrentData();
    }



   
    public getCurrentData() {
        this.barChartData[0].data = null;
        this.ListOfDate = new Array();
        this.FirstParkingData = new Array();
        this.SecondParkingData = new Array();
       // var NewChardata = this.barChartData;

       // console.log("groupedObj",NewChardata);
        return this.authService.GetCurrentData().subscribe(Cureentdata => {
         

            var previd = Cureentdata[0].DeviceID;
            this.barChartData[0].label = "Device: " + previd;
            var secid;
            debugger;
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

           
            if (Cureentdata.length > 1) {
               // this.barChartData[1].label = "Device: " + secid;
               // this.barChartData[1].data = this.SecondParkingData;
            }


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
        //debugger;
        //let data = [
        //    Math.round(Math.random() * 100),
        //    59,
        //    80,
        //    (Math.random() * 100),
        //    56,
        //    (Math.random() * 100),
        //    40];
        
        //console.log(JSON.stringify(this.barChartData));
        //let clone = JSON.parse(JSON.stringify(this.barChartData));
        //clone[0].data = data;
       // this.barChartData = clone;
    }

  
    public showdetails() {
        this.isshowwastageggraph = !this.isshowwastageggraph;
    }
}
