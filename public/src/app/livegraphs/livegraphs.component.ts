import { Component, ElementRef, NgModule, NgZone, OnInit, ViewChild, Input, ViewContainerRef, ViewEncapsulation, ChangeDetectorRef  } from '@angular/core';
import * as Chartist from 'chartist';
import { BrowserModule } from "@angular/platform-browser";
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {projectModel} from '../model/projectModel';
import {deviceModel} from '../model/deviceModel';
import { transactionModel } from '../model/TransactionModel';
import {AuthService} from '../services/auth.service';

@Component({
    selector: 'app-livegraphs',
    templateUrl: './livegraphs.component.html',
    styleUrls: ['./livegraphs.component.css']
})
export class LivegraphsComponent implements OnInit {

    public FirstParkingData: string[];

    //For Temperature Graph
    public LiveTempGraphData: string[];
    public ListOfDate: string[];
    public lineChartData: Array<any> = [
    { data: [], label: '' }]
    public lineChartLabels: Array<any> 


    //For Humidity Graph
    public LiveHumidityGraphData: string[];
    public linehumidityChartData: Array<any> = [
        { data: [], label: '' }]
    public linehumidityChartLabels: Array<any> 
    public ListOfhumidityDate: string[];


    //For Light Graph
    public LiveLightGraphData: string[];
    public linelightChartData: Array<any> = [
        { data: [], label: '' }]
    public linelightChartLabels: Array<any>
    public ListOflightDate: string[];


    //For Rain Graph
    public LiveRainGraphData: string[];
    public linerainChartData: Array<any> = [
        { data: [], label: '' }]
    public linerainChartLabels: Array<any>
    public ListOfrainDate: string[];

   

 

    constructor(private router: Router,
        private activatedRoute: ActivatedRoute,
        public toastr: ToastsManager,
        public vcr: ViewContainerRef,
        private authService: AuthService

    ) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this.getliveTempData();
        setInterval(() => {this.getliveTempData();},15000);
        this.getliveHumidityData();
        setInterval(() => { this.getliveHumidityData(); }, 15000);    
        this.getliveLightData();
        setInterval(() => { this.getliveLightData(); }, 15000);    
        this.getliveRainData();
        setInterval(() => { this.getliveRainData(); }, 15000);  

        

     
        
    }

    public getliveHumidityData() {
       
        this.ListOfhumidityDate = new Array();
        this.LiveHumidityGraphData = new Array();
        this.authService.GetLiveHumidityGraph().subscribe(livehumidityRecords => {
            for (var i = 0; i < livehumidityRecords.length; i++) {

                this.LiveHumidityGraphData.push(livehumidityRecords[i].Data);
                this.ListOfhumidityDate.push(livehumidityRecords[i].Trantime);
            }

            this.linehumidityChartData[0].data = this.LiveHumidityGraphData;
            this.linehumidityChartData[0].label = livehumidityRecords[0].TranDt;
            this.linehumidityChartLabels = this.ListOfhumidityDate;

        },
            err => {
                console.log(err);
                return false;
            });;


    };

    public getliveTempData() {        
        this.ListOfDate = new Array();
        this.LiveTempGraphData = new Array();
        this.authService.GetLiveTempGraph().subscribe(livetempRecords => {
            for (var i = 0; i < livetempRecords.length; i++) {
                
                this.LiveTempGraphData.push(livetempRecords[i].Data);
                this.ListOfDate.push(livetempRecords[i].Trantime);
            }

            this.lineChartData[0].data = this.LiveTempGraphData;
            this.lineChartData[0].label = livetempRecords[0].TranDt;
            this.lineChartLabels = this.ListOfDate;
          
        },
            err => {
                console.log(err);
                return false;
            });;


    };

    public getliveLightData() {
        
        this.ListOflightDate = new Array();
        this.LiveLightGraphData = new Array();
        this.authService.GetLiveLightGraph().subscribe(livelightRecords => {
           
            for (var i = 0; i < livelightRecords.length; i++) {

                this.LiveLightGraphData.push(livelightRecords[i].Data);
                this.ListOflightDate.push(livelightRecords[i].Trantime);
            }

            this.linelightChartData[0].data = this.LiveLightGraphData;
            this.linelightChartData[0].label = livelightRecords[0].TranDt;
            this.linelightChartLabels = this.ListOflightDate;

        },
            err => {
                console.log(err);
                return false;
            });;


    };

    public getliveRainData() {

        this.ListOfrainDate = new Array();
        this.LiveRainGraphData = new Array();
        this.authService.GetLiveRainGraph().subscribe(liverainRecords => {
            
            for (var i = 0; i < liverainRecords.length; i++) {

                this.LiveRainGraphData.push(liverainRecords[i].Data);
                this.ListOfrainDate.push(liverainRecords[i].Trantime);
            }

            this.linerainChartData[0].data = this.LiveRainGraphData;
            this.linerainChartData[0].label = liverainRecords[0].TranDt;
            this.linerainChartLabels = this.ListOfrainDate;

        },
            err => {
                console.log(err);
                return false;
            });;


    };

  

 

    public lineChartOptions: any = {
        responsive: true
    };

    public lineChartColors: Array<any> = [
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend: boolean = true;
    public lineChartType: string = 'line';

    // public lineChartLabels: Array<any>;
    public lineChartLabelsfortemp: Array<any>;
    public currentDate: Date;

    //public randomize(): void {
    //    let _lineChartData: Array<any> = new Array(this.lineChartData.length);
    //    for (let i = 0; i < this.lineChartData.length; i++) {
    //        _lineChartData[i] = { data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label };
    //        for (let j = 0; j < this.lineChartData[i].data.length; j++) {
    //            _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
    //        }
    //    }
    //    this.lineChartData = _lineChartData;
    //}

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
