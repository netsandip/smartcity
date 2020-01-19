
 var moment = require('moment');
require('moment-range');
require('moment-timezone');
 var momentformat="YYYY-MM-dd";
  
function cleandate(date){
	var today = new Date(date);
		var dd = today.getDate();
		var mm = today.getMonth()+1; 
		//var yyyy = today.getFullYear();
		if(dd<10) {
			dd='0'+dd
		} 
		if(mm<10) {
			mm='0'+mm
		} 
		//today = mm+'/'+dd+'/'+yyyy;
		return date.getFullYear()+"-"+mm+"-"+dd+"T00:00:00.000Z";
}

function cleandate1(date){
	var today = new Date(date);
		var dd = today.getDate();
		var mm = today.getMonth()+1; 
		//var yyyy = today.getFullYear();
		if(dd<10) {
			dd='0'+dd
		} 
		if(mm<10) {
			mm='0'+mm
		} 
		//today = mm+'/'+dd+'/'+yyyy;
		return date.getFullYear()+"-"+mm+"-"+dd;
}

function cleandatehr(date){
	var today = new Date(date);
		var dd = today.getDate();
		var mm = today.getMonth()+1; 
		var hh = today.getHours();
		//var yyyy = today.getFullYear();
		if(dd<10) {
			dd='0'+dd
		} 
		if(mm<10) {
			mm='0'+mm
		} 
		if(hh<10) {
			hh='0'+hh
		} 
		
		return date.getFullYear()+"-"+mm+"-"+dd+"T"+hh+":00:00.000Z";
}
function cleantimestamp(date){
	var today = new Date(date);
		var dd = today.getDate();
		var mm = today.getMonth()+1; 
		var hh = today.getHours();
		var min = today.getMinutes();
		var ss = today.getSeconds();
		var mss = today.getMilliseconds();
		//var yyyy = today.getFullYear();
		if(dd<10) {
			dd='0'+dd
		} 
		if(mm<10) {
			mm='0'+mm
		} 
		if(hh<10) {
			hh='0'+hh
		} 
		if(min<10) {
			min='0'+min
		} 
		if(ss<10) {
			ss='0'+ss
		} 
		if(mss<10) {
			mss='00'+mss
		} else if (mss<100) {
			mss='0'+mss
		}
								
		return date.getFullYear()+"-"+mm+"-"+dd+"T"+hh+":"+min+":"+ss+"."+mss+"Z";
}

module.exports = {
    cleandatetz:function(date) {
		return cleandate(date);
        
    },
	cleandatehrz:function(date) {
		return cleandatehr(date);
        
    },
	
	getgraphdates:function(addhrs)
	{
		var fromdate="";todate="";
		var graphdates=[];
		var d = new Date();
		//d.setDate(d.getDate() - 2);		
		fromdate=cleandate(d);
		fromdate=moment(new Date(fromdate),"YYYY-MM-dd");
		fromdate=new Date(fromdate);
		//fromdate=cleandate(fromdate);
		
		todate=moment(new Date(fromdate),"YYYY-MM-dd").add('hours',addhrs);
		todate=new Date(todate);
		//todate=cleandate(todate);
		
		graphdates.push(fromdate);
		graphdates.push(todate);
		return graphdates
		
	},
		addgraphhours:function(addhrs)
	{
		var fromdate="";todate="";
		var graphdates=[];
		var d = new Date();
		//d.setDate(d.getDate() - 2);		
		fromdate=cleandate(d);
		fromdate=moment(new Date(fromdate),"YYYY-MM-dd");
		fromdate=new Date(fromdate);
		//fromdate=cleandate(fromdate);
		
		todate=moment(new Date(fromdate),"YYYY-MM-dd").add('hours',addhrs);
		todate=new Date(todate);
		return todate
		
	},
	addgraphsecs:function(dateval,addsecs)
	{
		var todate="";
		todate=moment(dateval).add('seconds',addsecs);
		todate=new Date(todate);
		return todate
	},
	getmystime:function(dateval)
	{
		var time=moment(dateval);
		return time.tz('Asia/Kuala_Lumpur').locale('en').format('DD MMM YYYY hh:mm:ss a').toUpperCase();
	},
	addgraphdays:function(adddays)
	{
		var fromdate="";todate="";
		var graphdates=[];
		var d = new Date();
		d.setDate(d.getDate() +1);	
		fromdate=cleandate(d);
		fromdate=moment(new Date(fromdate),"YYYY-MM-dd");
		fromdate=new Date(fromdate);
		//fromdate=cleandate(fromdate);
		todate=moment(new Date(fromdate),"YYYY-MM-dd").add('days',adddays);
		todate=new Date(todate);
		//todate=cleandate(todate);
		
		graphdates.push(fromdate);
		graphdates.push(todate);
		return graphdates
		
	},
	adddays:function(dateval,adddays)
	{
		var fromdate="";todate="";
		var graphdates=[];
		var d = new Date(dateval);
		fromdate=cleandate(d);
		fromdate=moment(new Date(fromdate),"YYYY-MM-dd");
		fromdate=new Date(fromdate);
		todate=moment(new Date(fromdate),"YYYY-MM-dd").add('days',adddays);
		todate=new Date(todate);
		return todate
	},
	
    isWithinRange(text, min, max) {
        // check if text is between min and max length
    },
	converttimetosec:function(time){
		var timehours = 0;
		 var timemins = 0;
		 var timeval = time;
		 var minsval = time;
		 var AMPM = time;
		 AMPM = AMPM.substring(AMPM.length - 2, AMPM.length );
		 
		  minsval = minsval.substring(minsval.length - 5, minsval.length - 3);
		 if (minsval.length > 0) {
				timemins = parseInt(minsval, 10);
				timemins = timemins * 60 * 1000;
		 } else {
				timemins = 0;
		 }
		 timeval = timeval.substring(0, timeval.length - 6);
		 if (timeval.length > 0) {
				timehours = parseInt(timeval, 10);
			  
				if (AMPM == "PM" && timehours < 12) timehours = timehours + 12;
				if (AMPM == "AM" && timehours == 12) timehours = timehours - 12;
				timehours = timehours * 60 * 60 * 1000;
		 } else {
				timehours = 0;
		 }
		 timehours = timehours + timemins;
		 return timehours;
	},
	gethours:function(time){
		 var AMPM = time;
		 
		 if (AMPM.length===7)
		 {
			AMPM = AMPM.substring(0, 1);
		 }
		 if (AMPM.length===8)
		 {
			AMPM = AMPM.substring(0, 2); 
		 }
		 console.log("Hello A");
		console.log(AMPM);
		 return AMPM;
	},
	formatdate:function(dateval){
		return moment(dateval).format('MM/DD/YYYY');
		
	},
    formatdatehhmmss: function (dateval) {
    return moment(dateval).format('hh:mm:ss.ms');

    },formatdateddmmyyyyhhmmss: function (dateval) {
    return moment(dateval).format('DD/MM/YYYY hh:mm:ss.ms');

    },
    formatdatepre: function (dateval, formatval) {
        return moment(new Date(dateval)).format(formatval);

    }
}

