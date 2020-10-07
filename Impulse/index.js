function realtimeClock(){ 
    var rtClock = new Date();
    var hours = rtClock.getHours();
    var minutes = rtClock.getMinutes();
    var seconds = rtClock.getSeconds();

    //am or pm
    var amPm = (hours < 12) ? "AM" : "PM";

    //convert into 12-hour format;
    hours = (hours > 12) ? hours-12 : hours;

    //leading zeros
    hours = ("0" + hours).slice(-2);
    minutes = ("0" + minutes).slice(-2);
    seconds = ("0" + seconds).slice(-2);

    //implement
    document.getElementById('clock').innerHTML = hours + " : " + minutes + " : " + seconds + " " + amPm;
    var t = setTimeout(realtimeClock, 500);
}

function CurrentDate() {
    var today = new Date();
    var date = today.getDate()+' / '+(today.getMonth()+1)+' / '+today.getFullYear();

    document.getElementById('date').innerHTML =  date;
}

function weatherReport() {
    
    var weather = "It is currently sunny outside";
    document.getElementById('report').innerHTML = weather;
}


function newsReport() {
    var news = "";
    
}