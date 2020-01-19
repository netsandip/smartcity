import { Component, OnInit } from '@angular/core';
export class BlocksModel
{
	_id:String;
	tranid:Number;
	hash:String;
	previoushash:String;
	data:Object;
	blocktype:String;
	trantype:String;
	Created_On:Date;
    Created_by:String;
}