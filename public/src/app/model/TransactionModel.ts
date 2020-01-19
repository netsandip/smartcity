import { Component, OnInit } from '@angular/core';
export class transactionModel
{
	_id:String;
	TranNo:Number;
	projectCode:Number;
	ProjectName:String;
	deviceCode:Number;
	deviceName:String;
	values:Object;
	Transtype:Number;
	tranDateTime:Date;
	Created_On:Date;
    Created_by:String;
}