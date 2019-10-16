
fetch("https://api.propublica.org/congress/v1/113/house/members.json",
{ method: "GET",
  headers: {"X-API-Key": "ndWnFTRFxhWI5gwuEK7VG6U7kZHR04vtGEDqqcMq"}
}).then( resp => resp.json())
  .then( data => {members = data.results[0].members})
  .then(function(){createAll(members)})
  .catch(error =>console.log(error));