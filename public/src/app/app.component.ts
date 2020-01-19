import { Component, OnInit } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {Router, ActivatedRoute} from '@angular/router';


declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Environment', icon: 'dashboard', class: '' },
    //{ path: 'livedemograph', title: 'livegraph', icon: 'dashboard', class: '' },
    { path: 'iotproject', title: 'Parking', icon: 'person', class: '' },
    { path: 'iotdevice', title: 'Wastage', icon: 'library_books', class: '' },
    { path: 'iotgraph', title: 'Graphs', icon: 'person', class: '' },



];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  menuItems: any[];
   
private login: boolean;
private isUserlogin:boolean;
  constructor(public location: Location,  private router: Router, private currentActivatedRoute:ActivatedRoute) {}

  ngOnInit() {
      $.material.options.autofill = true;
      $.material.init();
 var titlee = this.location.prepareExternalUrl(this.location.path());
	  titlee = titlee.slice( 1 );
if(titlee =='SmartStreetLight')
{
this.login=false;

}
else
{
this.login=true;
}
console.log(titlee);
  }
  
  isvalidurl()
  {
	  
	  var titlee = this.location.prepareExternalUrl(this.location.path());
	  titlee = titlee.slice( 1 );
	  this.menuItems = ROUTES.filter(menuItem => menuItem);
	  for (var path in this.menuItems) {
		  if(this.menuItems[path].path ==titlee)
		  {
			  return true;
		  }
			///console.log(data.Result[key]);
		}
		return false;
	  // if(this.menuItems.path.includes(titlee))
	  // {
		  // return true;
	  // }
	  // else
	  // {
		  // return false;
	  // }
  }

 
}
