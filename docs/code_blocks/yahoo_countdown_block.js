
var timeLeft = 354063;
var timeSinceLast = 0;
var isFirstPaint = true;
var xmlhttp = createXMLHttp();

var timeSt = document.getElementById("time");

setInterval("timePaint()",1000);

function createXMLHttp()
{
  try {
    return new ActiveXObject ("Msxml2.XMLHTTP");
  } catch(e) {

    try {
      return new ActiveXObject ("Microsoft.XMLHTTP");
    } catch(e) {

      try {
        return new XMLHttpRequest();
      } catch(e) {
        return null;
      }
    }
  }
  return null;
}

function setPageData(xmlhttp)
{
  try {
    //readyState complete(4) is OK
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
    {
      timeLeft = xmlhttp.responseText;
    }
  } catch(e) {

  }
}

function checkObject()
{
  if (xmlhttp) {
    try {
      xmlhttp.abort();
      var nowTime = new Date().getTime();
      xmlhttp.onreadystatechange = function() { setPageData(xmlhttp) };
      xmlhttp.open('GET', "https://page.auctions.yahoo.co.jp/now?aID=g389045696&nowtime=" + nowTime ,true);
      xmlhttp.send(null);

    } catch(e) {
      if (!isFirstPaint) {
        window.location.reload(true);
      }
    }

  } else {
    if (!isFirstPaint) {
      window.location.reload(true);
    }
  }
}

function timePaint()
{
  if( isFirstPaint === true || timeLeft == -1 || (timeLeft < 300 && timeSinceLast >= 60 )) {
    checkObject();
    isFirstPaint = false;
    timeSinceLast = 0;
  }

  var outputString = "";

  if (timeLeft <= 0) {
    outputString += "オークション - 終了：";

  } else {

    var day = Math.floor(timeLeft / 86400);
    var hour = Math.floor((timeLeft - day * 86400) / 3600);
    var min = Math.floor((timeLeft - (day * 86400) - (hour * 3600)) / 60);
    var sec = timeLeft - (day * 86400) - (hour * 3600) - (min * 60);


    if (day > 0) {
      outputString += day + "日＋";
    }

    outputString += ((hour > 0)?hour + ":":"") + ((min<10)?"0" + min:min) + ":" + ((sec<10)?"0"+sec:sec);

    timeLeft -= 1;
    timeSinceLast += 1;
  }

  timeSt.innerHTML = outputString;
}

// ------------- MY CODE -------------------

function extractedLeftTimeInfo(timeLeft){
    var day = Math.floor(timeLeft / 86400);
    var hour = Math.floor((timeLeft - day * 86400) / 3600);
    var min = Math.floor((timeLeft - (day * 86400) - (hour * 3600)) / 60);
    var sec = timeLeft - (day * 86400) - (hour * 3600) - (min * 60);
    return {
      day, hour, min, sec
    }
}

function ajaxGetLeftTime(){
  return new Promise((resolve, reject) => {
    $.get('https://page.auctions.yahoo.co.jp/now?aID=g389045696&nowtime=' + new Date().getTime(), timeLeft => {
      resolve(timeLeft)
    })
  })
}