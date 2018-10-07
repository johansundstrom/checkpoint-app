var cp = new Object();  

cp.checkPoint = 5*60*60; // 5 hours per checkpoint
cp.septiCycle = 7*25*60*60   // 7*25hour per cycle
cp.begin = 1389780000 * 1000; //add millisec.

cp.now = new Date().getTime();

cp.septiCycleNr = Math.floor((cp.now - cp.begin) / cp.septiCycle / 1000); 
cp.septiCycleStart = Math.floor(cp.now / (cp.septiCycle * 1000)) * (cp.septiCycle * 1000);
cp.septiCycleEnd = cp.septiCycleStart + cp.septiCycle * 1000;

cp.checkpointNr = Math.floor((cp.now - cp.septiCycleStart) / cp.checkPoint / 1000);
cp.checkpointStart = cp.septiCycleStart + (cp.checkpointNr * cp.checkPoint * 1000);
cp.checkpointEnd = cp.septiCycleStart + (cp.checkpointNr * cp.checkPoint * 1000) + cp.checkPoint * 1000;

cp.JSON = JSON.stringify({
    now: cp.now,
    septiCycleNr: cp.septiCycleNr,
    septiCycleStart: cp.septiCycleStart,
    septiCycleEnd: cp.septiCycleEnd,
    checkpointNr: cp.checkpointNr,
    checkpointStart: cp.checkpointStart,
    checkpointEnd: cp.checkpointEnd
})

console.log(unixTimeToString("Time is", cp.now));
console.log("- SeptiCycle: " + cp.septiCycleNr);
console.log(unixTimeToString("- SeptiCycle start", cp.septiCycleStart));
console.log(unixTimeToString("- SeptiCycle end", cp.septiCycleEnd));
console.log("| Checkpoint nr: " + cp.checkpointNr + " of 35");
console.log(unixTimeToString("| Checkpoint start", cp.checkpointStart));
console.log(unixTimeToString("| Checkpoint end", cp.checkpointEnd));

var test = JSON.parse(cp.JSON);

console.log(test);

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