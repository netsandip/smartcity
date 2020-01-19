import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user){
	  
    //if(student.Student_Name == undefined || student.username == undefined || student.Pwd == undefined || student.Student_ID == undefined || student.DOB == undefined || student.Address == undefined || student.Mobile_No == undefined || student.Univ_ID == undefined){
    //  return false;
    //} else {
    //  return true;
    //  }

    return true;
  }

//get this from vaildate email pg
  validateEmail(Email_ID){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(Email_ID);
  }
  
  validateEvent(event){
	  
    if(event.EventTitle == undefined || event.Description == undefined || event.Event_Logo == undefined || event.CategoriesMstr == "0" || event.CategoriesSubMstr == "0" || event.EventType == "0" || event.StartDt == "" || event.EndDt == "" || event.EventRegisterEndDt == "" || event.Location == ""){
      return false;
     } else {
       return true;
     }
  }
}





