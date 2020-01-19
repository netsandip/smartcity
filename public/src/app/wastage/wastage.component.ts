import { Component, ElementRef, NgModule, NgZone, OnInit, ViewChild, Input, ViewContainerRef, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {deviceModel} from '../model/deviceModel';
import {projectModel} from '../model/projectModel';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Ng2SmartTableModule, LocalDataSource  } from 'ng2-smart-table';
import { BrowserModule } from "@angular/platform-browser";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs/Rx';

declare var google: any;

@Component({
    selector: 'app-wastage',
    templateUrl: './wastage.component.html',
    styleUrls: ['./wastage.component.scss']
})

export class wastageComponent implements OnInit {


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
    public isshowwastageggraph: boolean = false;
    private itemsList1: Array<any> = [];
    private dustbinlist: Array<any> = [];
    public fullstatus: string = "0";
    public hidegooglemap: boolean = false;
    public title: string = 'Google Maps Addeed Successfully';
   // public lat: number = 8.537305;
    //public lng: number = 76.883502;
 public lat: number = 8.537184;
    public lng: number = 76.883421;
    public availableDustbin: string;
    public fulldustbin: string;
    constructor(
        private authService: AuthService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        public toastr: ToastsManager,
        public vcr: ViewContainerRef

    ) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {      
        this.DustbinGraphData();
        this.SingleDustbinData();
        setInterval(() => { this.SingleDustbinData(); }, 7000);   
        setInterval(() => { this.DustbinGraphData(); }, 35000);       
        
        this.DustbinList();
       // this.bookparking = 32;
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
    public ListOfTime: string[];
    public FullRecord: string[];
    public InUseRecord: string[];
    public barChartLabels: string[];
    public DustbinGraphData() {
        this.ListOfTime = new Array();
        this.FullRecord = new Array();
        this.InUseRecord = new Array();
        return this.authService.dustbinGraph().subscribe(dustbindata => {
            var previd = dustbindata.graphdata[0].DeviceID;
            this.availableDustbin = dustbindata.AvaiableBins;
            this.fulldustbin = dustbindata.FullBins;
            for (var i = 0; i < dustbindata.graphdata.length; i++) {
                if (previd == dustbindata.graphdata[i].DeviceID) {
                   // console.log("123", dustbindata.graphdata)
                    this.ListOfTime.push(dustbindata.graphdata[i].Tranhour);
                    this.FullRecord.push(dustbindata.graphdata[i].FullBins)
                    this.InUseRecord.push(dustbindata.graphdata[i].AvaiableBins)
                }              

            }

            this.barChartLabels = this.ListOfTime;
            this.barChartData[0].data = this.FullRecord;
            this.barChartData[1].data = this.InUseRecord;
        });
    }
    
    public DustbinList() {      
        return this.authService.dustbinlist().subscribe(test => {
            this.dustbinlist = test;
        }
        );
    }

    public SingleDustbinData() {        
        return this.authService.SingleDustbinData().subscribe(test => {
            debugger
            this.itemsList1.push(test);
            if (test.rowlist[0].full == "999") {
                this.fullstatus = "100";
            }
            else if (test.rowlist[0].full == "100") {
                this.fullstatus = "0";
            }
            else if (test.rowlist[0].full == "0") {
                this.fullstatus = "100";
            }
            else {
                this.fullstatus = (100 - parseInt(test.rowlist[0].full)).toString();
            }
            //this.fullstatus = test.rowlist[0].full;
        }
        );
    }



    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        scaleBeginAtZero: false,
        barBeginAtOrigin: true,
        responsive: true,
        scaleStartValue: 0,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };
 
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;



    public barChartData: any[] = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Full' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'In Use' }
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


    public showdetails() {
        this.isshowwastageggraph = !this.isshowwastageggraph;
    }
    public hidegraph() {
        this.hidegooglemap = true;
    };
}
