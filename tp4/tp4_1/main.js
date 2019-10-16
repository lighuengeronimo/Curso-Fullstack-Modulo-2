var members = [];
var states = [];
var statesHtml = "<option value=\"All\">All</option>";

function createDropdown(){
  //ingresa todos los estados en el array states

  members.map(function (val) {
    if (!states.includes(val.state)) {
      states.push(val.state);
    }
  });
states.sort();
//crea el html para opciones de estados

states.forEach(function (state) { statesHtml += "<option value=\"" + state + "\"" + ">" + state + "</option>" });
document.getElementById("stateDropdown").innerHTML = statesHtml;

}


function createTable(members) {
  var tableHtml = "";
  var filteredMembers = [];
  var checkedBoxes = document.querySelectorAll('input[name=party]:checked');
  var checkedBoxesArray = Array.from(checkedBoxes).map(elt => elt.value);
  var dropdownValue = $("#stateDropdown").val();

  //se fija que partys estan chequeadas y filtra acorde, version mejorada
  
  filteredMembers = members.filter(members => checkedBoxesArray.includes(members.party) && (members.state == dropdownValue || dropdownValue == "All"))
  

  //crea el html para las tablas 
  for (var i = 0; i < filteredMembers.length; i++) {

    var middleName = filteredMembers[i].middle_name || "";
    var fullName = filteredMembers[i].first_name + " " + middleName + " " + filteredMembers[i].last_name;

    tableHtml += "<tr class =\"row\">" +
      "<td class =\"col\"><a href= \"" + filteredMembers[i].url + "\">" + fullName + "</a></td>" +
      "<td class =\"col-2\">" + filteredMembers[i].party + "</td>" +
      "<td class =\"col-2\">" + filteredMembers[i].state + "</td>" +
      "<td class =\"col\">" + filteredMembers[i].seniority + "</td>" +
      "<td class =\"col\">" + filteredMembers[i].votes_with_party_pct + "</td>" +
      "</tr>"

  }

  document.getElementById("data").innerHTML = tableHtml;
}

function createAll(members){
createDropdown();
var table = createTable(members);
  if (document.getElementById("checkboxes"||"stateDropdown").onchange){
    table = createTable(members);
  }
createLATables();
}