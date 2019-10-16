var members = [];
var app = new Vue({  
  el: '#app',  
  data: {    
    statisticsVue: {}
  }
});


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
  return finalArray;  
}
  


function createStatistics(memb) {
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

  var members =memb;
  var republicans = [];
  var independents = [];
  var democrats = [];
  
    
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
  statistics.voted_with_Prty_Avg_I = getKeyAvg(independents, "votes_with_party_pct").toFixed(2);
  statistics.voted_with_Prty_Avg_R = getKeyAvg(republicans, "votes_with_party_pct").toFixed(2);
  statistics.voted_with_Prty_Avg_D = getKeyAvg(democrats, "votes_with_party_pct").toFixed(2);
  statistics.voted_with_Prty_Avg_All = getKeyAvg(members, "votes_with_party_pct").toFixed(2);
  statistics.least_Loyal = getListPercentageByKey(members, "votes_with_party_pct", 10, "Asc");
  statistics.most_Loyal = getListPercentageByKey(members, "votes_with_party_pct", 10, "Des");
  statistics.most_Engaged = getListPercentageByKey(members, "missed_votes", 10, "Asc");
  statistics.least_Engaged = getListPercentageByKey(members, "missed_votes", 10, "Des");

  statistics.most_Loyal.map(
    member => member.votes_w_party = Math.trunc(getPercentage(member.votes_with_party_pct, member.total_votes))
  )

  statistics.least_Loyal.map(
    member => member.votes_w_party = Math.trunc(getPercentage(member.votes_with_party_pct, member.total_votes))
  )

  //cambia el NaN a 0 en caso de no haber independientes en la tabla glance
  if (statistics.numberOfIndependents == 0) {
    statistics.voted_with_Prty_Avg_I = 0;
  }
  
  app.statisticsVue= statistics;
}


function getMembersJson(url, api){
  fetch(url,
  {method:"GET",
  headers: {"X-API-Key": api}
  })
  .then( resp => resp.json())
  .then( data => {members = data.results[0].members})
  .then(function(){createStatistics(members)})
  .catch(error =>console.log(error));
}