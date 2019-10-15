
var states = [];
var members = [];
var statesHtml = "<option value=\"All\">All</option>";
var tableID = "";

// busca senate o house para tomar el array members necesario
if (document.getElementById("house-data") != null) {
  members = houseData.results[0].members;
  tableID = "house-data";
}

else if (document.getElementById("senate-data") != null) {
  members = senateData.results[0].members;
  tableID = "senate-data";
}

//ingresa todos los estados en el array states

members.map(function (val) {
  if (!states.includes(val.state)) {
    states.push(val.state);
  }
});
states.sort();

console.log(states);

//crea el html para opciones de estados

states.forEach(function (state) { statesHtml += "<option value=\"" + state + "\"" + ">" + state + "</option>" });

document.getElementById("stateDropdown").innerHTML = statesHtml;

function createTable(chamberID) {
  var tableHtml = "";
  var filteredMembers = [];
  var checkedBoxes = document.querySelectorAll('input[name=party]:checked');
  var checkedBoxesArray = Array.from(checkedBoxes).map(elt => elt.value);
  var dropdownValue = $("#stateDropdown").val();

  //se fija que partys estan chequeadas y filtra acorde, version mejorada
  
  filteredMembers = members.filter(members => checkedBoxesArray.includes(members.party) && (members.state == dropdownValue || dropdownValue == "All"))
  /*
  for (var i=0; i<checkedboxesArray.length;i++){
    if (dropdownValue == "All") { 
      filteredMembers = filteredMembers.concat(members.filter(member => member.party == checkedboxesArray[i] ))
    } 
    else {
      filteredMembers = filteredMembers.concat(members.filter(member => member.party == checkedboxesArray[i] && member.state == dropdownValue) )
    }
  } */

  //crea el html para las tablas 
  for (var i = 0; i < filteredMembers.length; i++) {

    var middleName = filteredMembers[i].middle_name || "";
    var fullName = filteredMembers[i].first_name + " " + middleName + " " + filteredMembers[i].last_name;

    tableHtml += "<tr>" +
      "<td><a href= \"" + filteredMembers[i].url + "\">" + fullName + "</a></td>" +
      "<td>" + filteredMembers[i].party + "</td>" +
      "<td>" + filteredMembers[i].state + "</td>" +
      "<td>" + filteredMembers[i].seniority + "</td>" +
      "<td>" + filteredMembers[i].votes_with_party_pct + "</td>" +
      "</tr>"

  }

  document.getElementById(chamberID).innerHTML = tableHtml;
}

var table = createTable(tableID);

if ((document.getElementById("checkboxes").onchange) || (document.getElementById("stateDropdown").onchange)){
  table = createTable(tableID);
}
