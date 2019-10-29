   var statistics =
 {
   numberOfDemocrats: 0,
   numberOfRepublicans: 0,
   numberOfIndependents: 0,
   voted_with_Prty_D: 0,
   voted_with_Prty_R: 0,
   voted_with_Prty_I: 0,
   missed_Votes_D: 0,
   missed_Votes_R: 0,
   missed_Votes_I: 0,
   percentage_Missed_D: 0,
   percentage_Missed_R: 0,
   percentage_Missed_I: 0,

 }
 var members= senateData.results[0].members;
 var republicans=[];
 var independents=[];
 var democrats=[];

 for (var i=0;i<members.length;i++){
   if ((members[i].party)=="R"){
     republicans.push(members[i]);
   }
   else if ((members[i].party)=="D"){
     democrats.push(members[i])
   }
   else if ((members[i].party)=="I"){
     independents.push(members[i]);
   }
 }
 statistics.numberOfDemocrats = democrats.length;
 statistics.numberOfRepublicans = republicans.length;
 statistics.numberOfIndependents = independents.length;

 console.log(JSON.stringify(statistics.numberOfIndependents));
 console.log(JSON.stringify(statistics.numberOfRepublicans));
 console.log(JSON.stringify(statistics.numberOfDemocrats));

 function percentage(array,key){
  var total= array.reduce(function(sum,n){return sum+n[key]},0);
  return total/(array.length);
 }

 statistics.voted_with_Prty_I = percentage(independents,"votes_with_party_pct");
 console.log(JSON.stringify(statistics.voted_with_Prty_I));
 statistics.voted_with_Prty_R = percentage(republicans,"votes_with_party_pct");
 console.log(JSON.stringify(statistics.voted_with_Prty_R));
 statistics.voted_with_Prty_D = percentage(democrats,"votes_with_party_pct");
 console.log(JSON.stringify(statistics.voted_with_Prty_D));