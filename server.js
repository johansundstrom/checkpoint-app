/*
* Första cp-start - 2014-01-15 10:00 (1389780000)
*cycle.CheckPoint (checkPointLength) = 5*60*60    		'5 timmar (18000s = 5h)
*cycle.CYCLE (cycleLength) = 35*5*60*60			'35*5 timmar (630000s = 175h)
*now


antal cp från starten (+1) första C 2014-01-15 10:00 UTC
beräkna nuvarande CP inom cycleLength
Beräkna antal passerade 


visa tid nu = unixTimeToString("tid", myDateTime())

septi
visa septi# = (UtcUnixTime \ cycleLength)
visa septistart = (nu \ cycleLength) * cycleLength 
visa septiend = cycleStart + cycleLength

checkpoint
visa cp# = cpLenth \ (nu - cyclestart) * cpLength
visa cp start =  (nu \ cpLength) * cpLength	
visa cp start = (nu - septistart) * cpLenght
visa cp end = cpStart + cpLength
*/



//cp = function() {}

//objektifiera 
var cp = new Object();
cp.CheckPoint = 5*60*60; // 5 hours per checkpoint
cp.CYCLE = 7*25*60*60   // 7*25hour per cycle
cp.begin = 1389780000 * 1000; //add millisec.

var now = new Date().getTime();

var cyclenr = Math.floor((now - cp.begin) / cp.CYCLE / 1000); 
var cycleStart = Math.floor(now / (cp.CYCLE * 1000)) * (cp.CYCLE * 1000);
var cycleEnd = cycleStart + cp.CYCLE * 1000;

var checkpointNr = Math.floor((now-cycleStart) / cp.CheckPoint /1000);
var checkpointStart = cycleStart + (checkpointNr * cp.CheckPoint * 1000);
var checkpointEnd = cycleStart + (checkpointNr * cp.CheckPoint * 1000) + cp.CheckPoint * 1000;

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



console.log(unixTimeToString("Time is", now));
//console.log(unixTimeToString("start", cycle.start));

console.log("- SeptiCycle: " + cyclenr);
console.log(unixTimeToString("- SeptiCycle start", cycleStart));
console.log(unixTimeToString("- SeptiCycle end", cycleEnd));

console.log("| Checkpoint nr: " + checkpointNr + " of 35");
console.log(unixTimeToString("| Checkpoint start", checkpointStart));
console.log(unixTimeToString("| Checkpoint end", checkpointEnd));



