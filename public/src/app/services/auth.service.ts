import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/timeout'
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {
    authToken: any;
    user: any;
    userID: String;
    tagID: String;
    actionResult: string;
    serverURL: any;

    constructor(private http: Http) {
      // this.serverURL = "http://localhost:3778";
        this.serverURL = "http://ec2-13-251-188-218.ap-southeast-1.compute.amazonaws.com:3778";
    }


    //---get current Data....

    public GetCurrentData(): Observable<any> {


        return this.http.get(this.serverURL + '/ustSmartCurrent/getSmartCurrentGraphData').map(res => res.json());

    }

    //-----  Post StreetLight Data------

    public PostStreetData(Data): Observable<any> {
     
         let headers = new Headers({ 'Content-Type': 'application/json' });
         let options = new RequestOptions({ headers: headers });
         
         // return this.http.post('http://www.chip2cloud.net:3777/USTActuatorListener', Data, options).map((res: Response) => res.json());
      
         return this.http.post("http://www.chip2cloud.net:3777/USTActuatorListener?deviceCode=" + Data[0].deviceCode + "&Trans=" + Data[0].Trans + "&Data=" + Data[0].Data, null, options).map(res => res.json());
        // return this.http.post("http://www.chip2cloud.net:3777/USTActuatorListener?deviceCode=" + Data[0].deviceid + "&Action=" + Data[0].action + "&Data=" + Data[0].Data,null, options).map(res => res.json());

    }


    public GetVoltageData(): Observable<any> {

    return this.http.get(this.serverURL + '/ustSmartVoltage/getSmartVoltageGraphData').map(res => res.json());

    }
    //-----------Get Dashboard Record-----------

    public GetLocationList(): Observable<any> {
     
        return this.http.get('http://www.chip2cloud.net:3777/ustIoTDevice/getAllDevice').map(res => res.json());

    }
    public GetDeviceMovement(): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
        headers.append('Access-Control-Allow-Credentials', 'true');
        
        return this.http.get('http://ec2-13-228-220-157.ap-southeast-1.compute.amazonaws.com:3000/40945', { headers: headers }).map(res => res.json());

    }
    //-----------Get Dashboard Record-----------

    public GetDashboardData(): Observable<any> {

        return this.http.get(this.serverURL + '/ustIoTGraph/getSmartCityWeather').map(res => res.json());

    }
    //-----------Get NewAlert Record-----------

    public GetNewAlertData(): Observable<any> {
        let headers = new Headers();
        headers.append('devicecode', '911');
        headers.append('projectcode', '9999999');
        headers.append('devicetype', 'surv');

        return this.http.get('http://www.chip2cloud.net:3777/ustIoTTransaction/getDeviceWiseTransactions', { headers: headers }).map(res => res.json());

    }

    //...............GetParking Data.............


    public GetParkingData() {

        return this.http.get(this.serverURL + '/ustSmartParking/getSmartParkingGraphData').map(res => res.json());

    }


    public GetParkingDetails(){
        return this.http.get(this.serverURL + '/ustSmartParking/getSmartParkingViewData').map(res => res.json());

    }

    //...........GetDustbin Data.....................
    public SingleDustbinData() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get(this.serverURL + '/ustIoTGraph/getSmartdustbinlatestdata', { headers: headers })
            .map(res => res.json());
    }
    public dustbinlist() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get(this.serverURL + '/ustIoTGraph/getSmartdustbinlist', { headers: headers })
            .map(res => res.json());
    }
    public dustbinGraph() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get(this.serverURL + '/ustSmartBin/getSmartBinGraphData', { headers: headers })
            .map(res => res.json());
    }

    //........ Get Temperature Data....................

    public GetLiveTempGraph() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get(this.serverURL + '/ustIoTGraph/getliveTempGraphData', { headers: headers })
            .map(res => res.json());
    }

    public GetLiveTempGraphmaxmin() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get(this.serverURL + '/ustIoTGraph/getliveTempGraphDatamaxmin', { headers: headers })
            .map(res => res.json());
    }

    //........ Get Humidity Data....................

    public GetLiveHumidityGraph() {
    

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get(this.serverURL + '/ustIoTGraph/getliveHumidityGraphData', { headers: headers })
            .map(res => res.json());
    }

    public GetLiveHumidityGraphmaxmin() {
     
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get(this.serverURL + '/ustIoTGraph/getliveHumidityGraphDatamaxmin', { headers: headers })
            .map(res => res.json());
    }


    //........ Get Light Data....................

    public GetLiveLightGraph() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get(this.serverURL + '/ustIoTGraph/getliveLightGraphData', { headers: headers })
            .map(res => res.json());
    }

    public GetLiveLightGraphmaxmin() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get(this.serverURL + '/ustIoTGraph/getliveLightGraphDatamaxmin', { headers: headers })
            .map(res => res.json());
    }


    //........ Get Rain Data....................

    public GetLiveRainGraph() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get(this.serverURL + '/ustIoTGraph/getliveRainGraphData', { headers: headers })
            .map(res => res.json());
    }

    public GetLiveRainGraphmaxmin() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get(this.serverURL + '/ustIoTGraph/getliveRainGraphDatamaxmin', { headers: headers })
            .map(res => res.json());
    }

    //........ Get Voltage Data....................

    public GetLiveVoltageGraph() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get(this.serverURL + '/ustIoTGraph/getliveVoltageGraphData', { headers: headers })
            .map(res => res.json());
    }

    public GetLiveVoltageGraphmaxmin() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get(this.serverURL + '/ustIoTGraph/getliveVoltageGraphDatamaxmin', { headers: headers })
            .map(res => res.json());
    }


    //........ Get Current Data....................

    public GetLiveCurrentGraph() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get(this.serverURL + '/ustIoTGraph/getliveCurrentGraphData', { headers: headers })
            .map(res => res.json());
    }

    public GetLiveCurrentGraphmaxmin() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get(this.serverURL + '/ustIoTGraph/getliveCurrentGraphDatamaxmin', { headers: headers })
            .map(res => res.json());
    }
    //connect to backend

    //registerStudent(student, TransMapping) {
    //    let headers = new Headers();
    //    headers.append('Content-Type', 'application/json');

    //    // Commeting this for time being
    //    //student.Pwd = this.generatePassword();
    //    student.Pwd = "admin12345";
    //    student.ConfirmPwd = student.Pwd;
    //    if (TransMapping.length > 0)
    //        student.TransApprovalMapping = (TransMapping.sort(x => x.Priority))[TransMapping.length - 1];
    //    //students/register is temporary domain
    //    return this.http.post('http://localhost:3777/students/register', student, { headers: headers })
    //        .map(res => res.json());
    //}


    ////<------------------------------------------------- Start Projects ------------------------------------------------->
    ////Add Project Service
    //addProject(project) {
    //    let headers = new Headers();
    //    headers.append('Content-Type', 'application/json');
    //    return this.http.post(this.serverURL + '/ustIoTProject/SaveProject', project, { headers: headers })
    //        .map(res => res.json());
    //}

  



}
