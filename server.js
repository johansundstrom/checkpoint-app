/*
* Första cp-start - 2014-01-15 10:00 (1389780000)
*cycle.CheckPoint (checkPointLength) = 5*60*60    		'5 timmar (18000s = 5h)
*cycle.CYCLE (cycleLength) = 35*5*60*60			'35*5 timmar (630000s = 175h)
*now


antal cp från starten (+1) första C 2014-01-15 10:00 UTC
beräkna nuvarande CP inom cycleLength
Beräkna antal passerade 


visa tid nu = unixTimeToString("tid", myDateTime())
visa cp#    = (nu - första cp) \ cpLength
visa cp start =  (nu \ cpLength) * cpLength	
visa cp end = cpStart + cpLength

septi
visa cycle# = (UtcUnixTime \ cycleLength)
visa cyclestart = (nu  \ cycleLength) * cycleLength 
visa cycleend = cycleStart + cycleLength

*/



cycle = function() {}

//objektifiera 
var cycle = new Object();
cycle.CheckPoint = 5*60*60; // 5 hours per checkpoint
cycle.CYCLE = 7*25*60*60;   // 7*25hour per cycle
cycle.start = 1389780000 * 1000; //add millisec.


var now = new Date();
var cyclenr = Math.floor((now - cycle.start) / cycle.CYCLE / 1000); 
var cycleStart = Math.floor(now / (cycle.CYCLE * 1000)) * (cycle.CYCLE * 1000);
var cycleEnd = cycleStart + cycle.CYCLE*1000;
var checkpointNr = Math.floor((now - cycle.start) * cycle.CYCLE);
var checkpointStart = Math.floor(now / (cycle.CheckPoint * 1000)) * (cycle.CheckPoint * 1000);
var checkpointEnd = checkpointStart + cycle.CheckPoint * 1000;
var formatRow = function(label,time) {
    var timeStr = unixTimeToString(time,true);
    timeStr = timeStr.replace(/:00$/,''); //FIXME: doesn't remove seconds from AM/PM formatted dates
    return timeStr;
};


function unixTimeToString(label, UNIX_timestamp){
    var a = new Date(UNIX_timestamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes(); var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds(); 
    var time = label + ': ' + date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
}

function myDateTime() {
    var d = new Date();
    var n = d.getTime();
    return n;
}



console.log(unixTimeToString("now", now));
//console.log(unixTimeToString("start", cycle.start));

console.log("current cycle: " + cyclenr);
console.log(unixTimeToString("septicycle start", cycleStart));
console.log(unixTimeToString("septicycle end", cycleEnd));
console.log(unixTimeToString("cp start", checkpointStart));
console.log(unixTimeToString("cp end", checkpointEnd));
console.log("cp:" + checkpointNr);
