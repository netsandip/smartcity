import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Environment', icon: '', class: 'fa fa-tachometer' },
    { path: 'parking', title: 'Parking', icon: '', class: 'fa fa-car' },
    { path: 'wastage', title: 'Wastage', icon: '', class: 'fa fa-trash-o' },
    { path: 'traffic', title: 'Traffic', icon: '', class: 'fa fa-signal' },
    { path: 'gps', title: 'Fleet Management', icon: '', class: 'fa fa-road' },
    { path: 'StreetLight', title: 'StreetLight', icon: '', class: 'fa fa-lightbulb-o' }
    //{ path: 'livegraphs', title: 'Live Graphs', icon: '', class: 'fa fa-trash-o' },
    //    { path: 'current', title: 'Current', icon: '', class: 'fa fa-trash-o' },
    //{ path: 'voltage', title: 'Voltage', icon: '', class: 'fa fa-trash-o' }
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menuItems: any[];

    constructor() { }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }


    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };
}
