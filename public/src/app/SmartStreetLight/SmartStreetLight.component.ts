import { Component, ElementRef, NgModule, NgZone, OnInit, ViewChild, Input, ViewContainerRef, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {deviceModel} from '../model/deviceModel';
import {projectModel} from '../model/projectModel';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Ng2SmartTableModule, LocalDataSource  } from 'ng2-smart-table';
import { BrowserModule } from "@angular/platform-browser";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AuthService} from '../services/auth.service';
import * as Chartist from 'chartist';

@Component({
    selector: 'app-SmartStreetLight',
    templateUrl: './SmartStreetLight.component.html',
    styleUrls: ['./SmartStreetLight.component.css']
})

export class SmartStreetLightComponent implements OnInit {
    public edited = true;
    public edited1 = true;

    //For Voltage Graph
    public LiveVoltageGraphData: string[];
    public linevoltageChartData: Array<any> = [
        { data: [], label: '' }]
    public linevoltageChartLabels: Array<any>
    public ListOfvoltageDate: string[];

    //For Current Graph
    public LiveCurrentGraphData: string[];
    public linecurrentChartData: Array<any> = [
        { data: [], label: '' }]
    public linecurrentChartLabels: Array<any>
    public ListOfcurrentDate: string[];

    constructor(

        private router: Router,
        private activatedRoute: ActivatedRoute,
        public toastr: ToastsManager,
        public vcr: ViewContainerRef,
        private authService: AuthService

    ) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    //TO Project screen





    ngOnInit() {
        /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */
        this.GetStreetLightRecord();
        setInterval(() => { this.GetStreetLightRecord(); }, 60000);

        this.getliveVoltageData();
        setInterval(() => { this.getliveVoltageData(); }, 15000);
        // this.GetDashboardRecord()
        this.getliveCurrentData();
        setInterval(() => { this.getliveCurrentData(); }, 15000);

        this.edited1 = false;
        // this.showdetails('946');
    }



    public getliveVoltageData() {

        this.ListOfvoltageDate = new Array();
        this.LiveVoltageGraphData = new Array();
        this.authService.GetLiveVoltageGraph().subscribe(livevoltageRecords => {

            for (var i = 0; i < livevoltageRecords.length; i++) {

                this.LiveVoltageGraphData.push(livevoltageRecords[i].Data);
                this.ListOfvoltageDate.push(livevoltageRecords[i].Trantime);
            }

            this.linevoltageChartData[0].data = this.LiveVoltageGraphData;
            this.linevoltageChartData[0].label = livevoltageRecords[0].TranDt;
            this.linevoltageChartLabels = this.ListOfvoltageDate;

        },
            err => {
                console.log(err);
                return false;
            });;


    };

    public getliveCurrentData() {

        this.ListOfcurrentDate = new Array();
        this.LiveCurrentGraphData = new Array();
        this.authService.GetLiveCurrentGraph().subscribe(livecurrentRecords => {

            for (var i = 0; i < livecurrentRecords.length; i++) {

                this.LiveCurrentGraphData.push(livecurrentRecords[i].Data);
                this.ListOfcurrentDate.push(livecurrentRecords[i].Trantime);
            }

            this.linecurrentChartData[0].data = this.LiveCurrentGraphData;
            this.linecurrentChartData[0].label = livecurrentRecords[0].TranDt;
            this.linecurrentChartLabels = this.ListOfcurrentDate;

        },
            err => {
                console.log(err);
                return false;
            });;


    };
    //public showdetails(id) {
    //    this.edited1 = !this.edited1;
    //    var Action = this.edited1 == true ? (Action = "ON") : (Action = "OFF");
    //    var Data = Action;
    //    var PostData = [{ deviceCode: id, Trans: Action, Data: Data }];

    //    return this.authService.PostStreetData(PostData).subscribe(StreetData => {
    //        console.log("DATA", StreetData);
    //        if (StreetData.length > 0) {

    //            this.edited1 = StreetData[0].Data;

    //        }

    //    },
    //        err => {
    //            console.log(err);
    //            return false;
    //        });;
    //    // do something with the id...
    //}

    //public waitSeconds(iMilliSeconds) {
    //    var counter = 0
    //        , start = new Date().getTime()
    //        , end = 0;
    //    while (counter < iMilliSeconds) {
    //        end = new Date().getTime();
    //        counter = end - start;
    //    }
    //}

    public showlightload() {

        console.log(this.edited1);

        if (this.edited1 == false) {
            this.edited1 = true;
        }
        else {
            this.edited1 = false;
        }

    }


    public showdetails(id) {

        this.edited1 = !this.edited1;
        var Action = this.edited1 == true ? (Action = "ON") : (Action = "OFF");
        var Data = Action;
        var PostData = [{ deviceCode: id, Trans: Action, Data: Data }];

        setTimeout(() => this.showlightload(), 1000);
        setTimeout(() => this.showlightload(), 2000);
        setTimeout(() => this.showlightload(), 3000);
        setTimeout(() => this.showlightload(), 4000);
        setTimeout(() => this.showlightload(), 5000);

        this.authService.PostStreetData(PostData).subscribe(StreetData => {
            console.log("DATA", StreetData);
            // this.edited1 = StreetData[0].Data;

        },
            err => {
                console.log(err);
                //return false;
            });;
        // do something with the id...
    }

    public GetStreetLightRecord() {

        var count = 2;
        if (count = 1) {
            this.edited = false;
        }
    }



    public lineChartLegend: boolean = true;
    public lineChartType: string = 'line';

    // public lineChartLabels: Array<any>;
    public lineChartLabelsfortemp: Array<any>;
    public currentDate: Date;

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

    public GetliveTempGraph() {


    }


}
