import {Component} from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Http, Headers, Response  } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map'; 


@Injectable()
export class CurrentService {
    private jsonFileURL: string = "./Current.json";
    constructor(private http: Http) {
    }

    //    
    getCurrent() {
        // Return the observable here
        return this.http.get("./Current.json")
            .map(res => res.json());
    }
    //    
    private handleError(errorResponse: Response) {
        console.log(errorResponse.statusText);
        return Observable.throw(errorResponse.json().error || "Server error");
    }
}  