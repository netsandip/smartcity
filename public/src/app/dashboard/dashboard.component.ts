import { Component, ElementRef, NgModule, NgZone, OnInit, ViewChild, Input, ViewContainerRef, ViewEncapsulation, ChangeDetectorRef  } from '@angular/core';
import * as Chartist from 'chartist';
import { BrowserModule } from "@angular/platform-browser";
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {projectModel} from '../model/projectModel';
import {deviceModel} from '../model/deviceModel';
import { transactionModel } from '../model/TransactionModel';
import {AuthService} from '../services/auth.service';
import { GaugeSegment, GaugeLabel } from 'ng2-kw-gauge';
//import {tooltip} from 'chartist-plugin-tooltip';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

    public tempcapacity: number = 0;
    public mintemp: number;
    public maxtemp: number;
    public humdicapacity: number = 0;
    public windcapacity: number = 0;
    public Windcapacitylabel: string;
    public WindcapacitySerieslabel: string;
    public lightcapacity: number;
    public waterlevelcapacity: string;
    public waterlevelCap: number;
    public rainycapacity: string;
    public rainycapacityval: number;
    public minrainy: number;
    public maxrainy: number;
    public title: string = 'Google Maps Addeed Successfully';
    public lat: number = 8.537184;
    public lng: number = 76.883421;
    public icon: string = "fa-car"
    public mark: {};
    public markers: any[] = [];
    public NewsList: any[] = [];
    colors = {
        indigo: '#14143e',
        pink: '#fd1c49',
        orange: '#ff6e00',
        yellow: '#f0c800',
        mint: '#00efab',
        cyan: '#05d1ff',
        purple: '#841386',
        white: '#fff'
    };

    progressGraph = {
        bgRadius: 50,
        bgColor: this.colors.indigo,
        rounded: false,
        reverse: false,
        animationSecs: 1,
        labels: [
            new GaugeLabel({
                color: this.colors.white,
                text: 'Temprature',
                x: 0,
                y: 20,
                fontSize: '1em'
            }),
            new GaugeLabel({
                color: this.colors.white,
                text: "" + this.tempcapacity,
                x: 0,
                y: 0,
                fontSize: '2em'
            })
        ],
        segments: [
            new GaugeSegment({
                value: this.tempcapacity,
                color: this.colors.pink,
                borderWidth: 40
            })
        ]
    };
    humidityGraph = {
        bgRadius: 50,
        bgColor: this.colors.orange,
        rounded: false,
        reverse: false,
        animationSecs: 1,
        labels: [
            new GaugeLabel({
                color: this.colors.cyan,
                text: 'Humidity',
                x: 0,
                y: 20,
                fontSize: '1em'
            }),
            new GaugeLabel({
                color: this.colors.cyan,
                text: "" + this.humdicapacity,
                x: 0,
                y: 0,
                fontSize: '2em'
            })
        ],
        segments: [
            new GaugeSegment({
                value: this.humdicapacity,
                color: this.colors.purple,
                borderWidth: 40
            })
        ]
    };

    WindGraph = {
        bgRadius: 50,
        bgColor: this.colors.orange,
        rounded: false,
        reverse: false,
        animationSecs: 1,
        labels: [
            new GaugeLabel({
                color: this.colors.cyan,
                text: 'Wind',
                x: 0,
                y: 20,
                fontSize: '1em'
            }),
            new GaugeLabel({
                color: this.colors.cyan,
                text: "" + this.windcapacity,
                x: 0,
                y: 0,
                fontSize: '2em'
            })
        ],
        segments: [
            new GaugeSegment({
                value: this.windcapacity,
                color: this.colors.purple,
                borderWidth: 40
            })
        ]
    };
    WaterLevelGraph = {
        bgRadius: 50,
        bgColor: this.colors.indigo,
        rounded: false,
        reverse: false,
        animationSecs: 1,
        labels: [
            new GaugeLabel({
                color: this.colors.white,
                text: 'Water',
                x: 0,
                y: 20,
                fontSize: '1em'
            }),
            new GaugeLabel({
                color: this.colors.white,
                text: "" + this.waterlevelcapacity,
                x: 0,
                y: 0,
                fontSize: '2em'
            })
        ],
        segments: [
            new GaugeSegment({
                value: this.waterlevelCap,
                color: this.colors.purple,
                borderWidth: 40
            })
        ]
    };


    constructor(
        private authService: AuthService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        public toastr: ToastsManager, public vcr: ViewContainerRef)
    { }

    //TO Project screen
    GotoProjects(Projectcode) {
        localStorage.setItem('ActiveProjectCode', Projectcode);
        window.location.href = "../iotproject";
    }


    public showdetails() {
        window.location.href = "../livedemograph";
    }


    ngOnInit() {
        /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */
        this.GetDashboardRecord();
        this.GetDeviceLocation();
        this.GetNewsAlert();
        setInterval(() => { this.GetNewsAlert(); }, 15000);
        setInterval(() => { this.GetDashboardRecord(); }, 15000);

    }

    public GetDeviceLocation() {

        return this.authService.GetLocationList().subscribe(loctionlist => {

            for (var i = 0; i < loctionlist.length; i++) {
                this.mark = { "lat": loctionlist[i].Latitude, "lng": loctionlist[i].Longitude, "DId": loctionlist[i].DeviceID }
                this.markers.push(this.mark);
            }


        })
    }

    public GetNewsAlert() {

        return this.authService.GetNewAlertData().subscribe(NewsAlertDetails => {
            this.NewsList = new Array();
            for (var i = 0; i < NewsAlertDetails.length; i++) {
                var outputresult = NewsAlertDetails[i].outputdata[0];
                var newmid = "";
                for (var j = 0; j < outputresult.labelAnnotations.length; j++) {
                    //if (newmid != outputresult.labelAnnotations[0].mid || newmid =="") {
                    //    newmid = outputresult.labelAnnotations[0].mid;
                    //}
                    if (outputresult.labelAnnotations[j].description == "traffic collision" || outputresult.labelAnnotations[j].description == "fire" || outputresult.labelAnnotations[j].description == "heat" || outputresult.labelAnnotations[j].description == "smoke" || outputresult.labelAnnotations[j].description == "accident" || outputresult.labelAnnotations[j].description == "crash") {
                            //console.log("123", outputresult.labelAnnotations[j]);
                            
                            let dateUTC = new Date(NewsAlertDetails[i].tranDateTime);
                            let Time = dateUTC.toLocaleTimeString();
                            var news = { "id": NewsAlertDetails[i].deviceCode, "EDate": NewsAlertDetails[i].tranDateTime, "Time": Time, "image": NewsAlertDetails[i].url, "Description": outputresult.labelAnnotations[j].description, "score": outputresult.labelAnnotations[j].score }
                            this.NewsList.push(news);                            
                        }
                
                }
            }
        });
    }
    ///----------

     public GetDashboardRecord() {

        return this.authService.GetDashboardData().subscribe(dashboardDetails => {
            // console.log("dashboardDetails", dashboardDetails);   
if (dashboardDetails.Temperature == undefined) {
 this.tempcapacity = 0;

}    
else
{
            this.tempcapacity = dashboardDetails.Temperature;
}
            this.humdicapacity = dashboardDetails.Humidity;
            this.lightcapacity = dashboardDetails.Light;
            this.windcapacity = dashboardDetails.WindSpeed * 20;
            //if (dashboardDetails.WindSpeed != undefined || dashboardDetails.WindSpeed != null  ) {
            //    
            //}
            //else {
            //    this.windcapacity = 0;
            //}
            
            if (this.windcapacity == 0) {
                this.Windcapacitylabel = "Condition: Calm wind  Speed: < 1 km/h" 
                this.windcapacity = 0;
            }
            else if (this.windcapacity == 20) {
                this.Windcapacitylabel = "Condition: Gentle Breeze  Speed: 12-19 km/h"
                this.windcapacity = 17;
            }
  	   else if (this.windcapacity == 40) {
                this.Windcapacitylabel = "Condition: Storm wind  Speed: 39-49 km/h"
                this.windcapacity = 45;
            }
            else if (this.windcapacity == 60) {
                this.Windcapacitylabel = "Condition: Strong Gale  Speed: 75-88 km/h"
                this.windcapacity = 82;
            }
            else if (this.windcapacity == 80) {
                this.Windcapacitylabel = "Condition: Whole Gale  Speed: 89-102 km/h"
                this.windcapacity = 90;
            }
            else if (this.windcapacity == 100) {
                this.Windcapacitylabel = "Condition: Hurricane force  Speed: >= 118 km/h"
                this.windcapacity = 120;
            }
            if (dashboardDetails.WaterLevel != undefined) {
                this.waterlevelcapacity = dashboardDetails.WaterLevel;
                this.waterlevelCap = dashboardDetails.WaterLevel;
                if (this.waterlevelCap == 2) {
                    this.waterlevelcapacity = "25%"
                    this.waterlevelCap=25;
                }
                else if (this.waterlevelCap == 3) {
                    this.waterlevelcapacity = "50%"
  			this.waterlevelCap=50;
                }
                else if (this.waterlevelCap == 4) {
                    this.waterlevelcapacity = "75%"
  this.waterlevelCap=75;
                }
                else if (this.waterlevelCap == 5) {
                    this.waterlevelcapacity = "100%"
  this.waterlevelCap=100;
                }
  else if (this.waterlevelCap == 10) {
                    this.waterlevelcapacity = "100%"
  this.waterlevelCap=100;
                }
                else {
                    this.waterlevelcapacity = "0%";
  this.waterlevelCap=0;
                }
            }
            else { this.waterlevelcapacity = "0%";
 this.waterlevelCap=0;
 }
            
        
            if (dashboardDetails.Rain == 1) {
                this.rainycapacity = "Light Rain";
                this.rainycapacityval = 50;
            }
            else if (dashboardDetails.Rain == 2)
            {
                this.rainycapacity = "Heavy Rain";
                this.rainycapacityval = 100;
            }
            else {
                this.rainycapacityval = 0;
                this.rainycapacity = "No Rain";
            }

            //this.rainycapacity = dashboardDetails.Rain;
            this.progressGraph.segments = [
                new GaugeSegment({
                    value: this.tempcapacity,
                    color: this.colors.pink,
                    borderWidth: 40
                })
            ]
            this.progressGraph.labels = [
                new GaugeLabel({
                    color: this.colors.white,
                    text: 'Temprature',
                    x: 0,
                    y: 20,
                    fontSize: '1em'
                }),
                new GaugeLabel({
                    color: this.colors.white,
                    text: "" + this.tempcapacity,
                    x: 0,
                    y: 0,
                    fontSize: '2em'
                })
            ]

            this.humidityGraph.segments = [
                new GaugeSegment({
                    value: this.humdicapacity,
                    color: this.colors.pink,
                    borderWidth: 40
                })
            ]
            this.humidityGraph.labels = [
                new GaugeLabel({
                    color: this.colors.white,
                    text: 'Humidity',
                    x: 0,
                    y: 20,
                    fontSize: '1em'
                }),
                new GaugeLabel({
                    color: this.colors.white,
                    text: "" + this.humdicapacity,
                    x: 0,
                    y: 0,
                    fontSize: '2em'
                })
            ]

            this.WindGraph.labels = [
                new GaugeLabel({
                    color: this.colors.cyan,
                    text: 'Wind',
                    x: 0,
                    y: 20,
                    fontSize: '1em'
                }),
                new GaugeLabel({
                    color: this.colors.cyan,
                    text: "" + this.windcapacity,
                    x: 0,
                    y: 0,
                    fontSize: '2em'
                })
            ],
                this.WindGraph.segments = [
                new GaugeSegment({
                   
                        value: this.windcapacity,
                        color: this.colors.pink,
                        borderWidth: 40
                    })
                ],
                this.WaterLevelGraph.labels = [
                    new GaugeLabel({
                        color: this.colors.white,
                        text: 'Water',
                        x: 0,
                        y: 20,
                        fontSize: '1em'
                    }),
                    new GaugeLabel({
                        color: this.colors.white,
                        text: "" + this.waterlevelcapacity,
                        x: 0,
                        y: 0,
                        fontSize: '2em'
                    })
                ],
                this.WaterLevelGraph.segments = [
                    new GaugeSegment({
                        value: this.waterlevelCap,
                        color: this.colors.purple,
                        borderWidth: 40
                    })
                ]

        })
    }

    public lineChartData: Array<any> = [
        { data: [22, 30, 20, 25, 56, 55, 40], label: 'Min' },
        { data: [28, 48, 40, 91, 86, 27, 90], label: 'Max' }
    ];
    public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
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

    public randomize(): void {
        let _lineChartData: Array<any> = new Array(this.lineChartData.length);
        for (let i = 0; i < this.lineChartData.length; i++) {
            _lineChartData[i] = { data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label };
            for (let j = 0; j < this.lineChartData[i].data.length; j++) {
                _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
            }
        }
        this.lineChartData = _lineChartData;
    }

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }


    //-------------------------------------------Tempreature--------------------------------------------------------- 
    getDateWiseInfomation() {
        var dYear: string;
        var dMonth: string;
        var dMonth1: string;
        var dDate: string;
        var dDate1: string;
        var localDate: string;
        //this.lineChartDataFortemp = new Array();
        this.lineChartLabelsfortemp = new Array();
        this.currentDate = new Date();
        var d, y, date;

        var dd = "", mm = "";
        var flag = 1;
        if (flag == 1) {
            for (var ii = 0; ii < 24; ii++) {
                this.lineChartLabelsfortemp.push(ii);
                ii = ii + 1;
            }
        }

        //this.authService.gettempDetails().subscribe(templist => {
        //    this.lineChartDataFortemp = [
        //        {
        //            data: templist.maxdata, label: 'Min'
        //        },
        //        {
        //            data: templist.mindata, label: 'Max'
        //        }

        //    ];
        //},
        //    err => {
        //        console.log(err);
        //        return false;
        //    });






    }
}
