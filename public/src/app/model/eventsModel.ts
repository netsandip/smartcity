import { Component, OnInit } from '@angular/core';
export class EventModel
{
EventID:Number  ;
EventTitle:{type: String};
Description:{type: String};
CategoriesMstr:{type: String};
StartDt:{type: Date	};
EndDt:{	type: Date};
EventRegisterEndDt:{type: Date};
EventType:{type: String}
POCRequired:{type: String};
POCDeadLine:{type: String};
Location:{ type: String };
Status:{type: String};
Rules:{type: String }; 
Event_Logo:{type: String};
Published_Tag:{type: String};
Prizes:{type: Number};
Created_On:{type: Date };
Created_by:{type: String};
Modified_On:{type: Date};
Modified_by:{type: String};
}