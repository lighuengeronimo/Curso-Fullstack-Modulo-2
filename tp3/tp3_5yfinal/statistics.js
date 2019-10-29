
function sortByKey(array, key, order) {
  if (order == "Asc") {
    return array.sort(function (a, b) {
      if (a[key] < b[key]) {
        return -1;
      }
      if (a[key] > b[key]) {
        return 1;
      }
      return 0;
    });
  }

  else if (order == "Des") {
    return array.sort(function (a, b) {
      if (a[key] < b[key]) {
        return 1;
      }
      if (a[key] > b[key]) {
        return -1;
      }
      return 0;
    });
  }
  else {
    return console.log("error, orden incorrecto");
  }
}

function getKeySum(array, key) {
  return array.reduce(function (sum, n) { return sum + n[key] }, 0);
}
function getKeyAvg(array, key) {
  var total = getKeySum(array, key);
  return total / (array.length);
}
function getPercentage(n, percentage) {
  return (percentage * n) / 100;
}

function percentageList(array, percentage) {
  var n = getPercentage(array.length, percentage);
  var arrayPercentage = [];
  while (arrayPercentage.length < n - 1) {
    arrayPercentage.push(array[arrayPercentage.length]);
  }
  return arrayPercentage;
}

function getListPercentageByKey(array, key, percentage, order) {
  var sortedArray = sortByKey(array, key, order);
  var tenPercentArray = percentageList(sortedArray, percentage)
  var finalArray= tenPercentArray;

  //for que suma los ultimos items que repitan el ultimo valor de la key, pasado el 10%
  for (var i=0;i<sortedArray.length;i++){
    if (((sortedArray[i][key])==(tenPercentArray[(tenPercentArray.length-1)][key])) && (!tenPercentArray.includes(sortedArray[i]))) {
      finalArray.push(sortedArray[i]);
    }
  }
  /* intento de usar for each para lo mismo de arriba
  sortedArray.forEach(function(){
    if (((sortedArray[key])==(tenPercentArray[(tenPercentArray.length-1)][key])) && (!tenPercentArray.includes(sortedArray))) {
      finalArray.push(sortedArray);
    }
  })*/
  return finalArray;  
}
  


function createTables() {
  var statistics =
  {
    "numberOfDemocrats": 0,
    "numberOfRepublicans": 0,
    "numberOfIndependents": 0,
    "total": 0,
    "voted_with_Prty_Avg_D": 0,
    "voted_with_Prty_Avg_R": 0,
    "voted_with_Prty_Avg_I": 0,
    "voted_with_Prty_Avg_All": 0,
    "least_Engaged": 0,
    "most_Engaged": 0,
    "most_Loyal": 0,
    "least_Loyal": 0,
    "percentage_Missed": 0,
  }

  var members = data.results[0].members;
  var republicans = [];
  var independents = [];
  var democrats = [];
  var glance = "";
  var mostEngaged = "";
  var leastEngaged = "";
  var mostLoyal = "";
  var leastLoyal = "";
  var indep_vts_w_party = 0;

  //funciones para crear las tablas mas rapido
  function getMemberName(array) {
    var middleName = array.middle_name || "";
    var fullName = array.first_name + " " + middleName + " " + array.last_name;
    return fullName;
  }

  function createTableAttendance(array) {
    var attendanceString = "";
    for (var i = 0; i < array.length; i++) {
      attendanceString += "<tr class =\"row\"><td class =\"col\">" + getMemberName(array[i]) +
        "</td><td class =\"col\">" + array[i].missed_votes +
        "</td><td class =\"col\">" + array[i].missed_votes_pct +
        "</td></tr>";
    }
    return attendanceString;
  }

  function createTableLoyalty(array) {
    var loyaltyString = "";
    for (var i = 0; i < array.length; i++) {
      var votes_w_party = getPercentage(array[i].votes_with_party_pct, array[i].total_votes);

      loyaltyString += "<tr class =\"row\"><td class =\"col\">" + getMemberName(array[i]) +
        "</td><td class =\"col\">" + Math.trunc(votes_w_party) +
        "</td><td class =\"col\">" + array[i].votes_with_party_pct
 +
        "</td></tr>";
    }
    return loyaltyString;
  }

  for (var i = 0; i < members.length; i++) {
    if ((members[i].party) == "R") {
      republicans.push(members[i]);
    }
    else if ((members[i].party) == "D") {
      democrats.push(members[i])
    }
    else if ((members[i].party) == "I") {
      independents.push(members[i]);
    }
  }

  //llenando el json
  statistics.numberOfDemocrats = democrats.length;
  statistics.numberOfRepublicans = republicans.length;
  statistics.numberOfIndependents = independents.length;
  statistics.total = members.length;
  statistics.voted_with_Prty_Avg_I = getKeyAvg(independents, "votes_with_party_pct");
  statistics.voted_with_Prty_Avg_R = getKeyAvg(republicans, "votes_with_party_pct");
  statistics.voted_with_Prty_Avg_D = getKeyAvg(democrats, "votes_with_party_pct");
  statistics.voted_with_Prty_Avg_All = getKeyAvg(members, "votes_with_party_pct");
  statistics.least_Loyal = getListPercentageByKey(members, "votes_with_party_pct", 10, "Asc");
  statistics.most_Loyal = getListPercentageByKey(members, "votes_with_party_pct", 10, "Des");
  statistics.most_Engaged = getListPercentageByKey(members, "missed_votes", 10, "Asc");
  statistics.least_Engaged = getListPercentageByKey(members, "missed_votes", 10, "Des");


  //creando los strings y metiendolos en cada elemento
  if (statistics.numberOfIndependents > 0) {
    indep_vts_w_party = statistics.voted_with_Prty_Avg_I;
  }

  glance += "<tr class =\"row\">" +
    "<td class =\"col\">Democrats</td><td class =\"col\">" + statistics.numberOfDemocrats +
    "</td><td class =\"col\">" + statistics.voted_with_Prty_Avg_D +
    "</td></tr><tr class =\"row\"><td class =\"col\">Republicans</td><td class =\"col\">" + statistics.numberOfRepublicans +
    "</td><td class =\"col\">" + statistics.voted_with_Prty_Avg_R +
    "</td></tr><tr class =\"row\"><td class =\"col\">Independents</td><td class =\"col\">" + statistics.numberOfIndependents +
    "</td><td class =\"col\">" + indep_vts_w_party +
    "</td></tr><tr class =\"row\"><td class =\"col\">Total</td><td class =\"col\">" + statistics.total +
    "</td><td class =\"col\">" + statistics.voted_with_Prty_Avg_All + "</td></tr>";


  mostEngaged = createTableAttendance(statistics.most_Engaged)
  leastEngaged = createTableAttendance(statistics.least_Engaged)
  mostLoyal = createTableLoyalty(statistics.most_Loyal);
  leastLoyal = createTableLoyalty(statistics.least_Loyal);

  document.getElementById("glance").innerHTML = glance;

  if (document.getElementById("most-engaged")) {
    document.getElementById("most-engaged").innerHTML = mostEngaged;
    document.getElementById("least-engaged").innerHTML = leastEngaged;
  }
  else {
    document.getElementById("most-loyal").innerHTML = mostLoyal;
    document.getElementById("least-loyal").innerHTML = leastLoyal;
  }
}

createTables();
