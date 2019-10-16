var members = [];
var states = [];
var statesHtml = "<option value=\"All\">All</option>";

var app = new Vue({  
  el: '#app',  
  data: {    
    membersVue: []
  }
}); 


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


function createList(members) {
  var tableHtml = "";
  var checkedBoxes = document.querySelectorAll('input[name=party]:checked');
  var checkedBoxesArray = Array.from(checkedBoxes).map(elt => elt.value);
  var dropdownValue = $("#stateDropdown").val();
  //se fija que partys estan chequeadas y filtra acorde, version mejorada
  app.membersVue = 
  members.filter(members => checkedBoxesArray.includes(members.party) && (members.state == dropdownValue || dropdownValue == "All"))
  
}

function createAll(members){  
  createDropdown();
  var table = createList(members);
  if (document.getElementById("checkboxes"||"stateDropdown").onchange){
    table = createList(members);
  }
  return table;
  }

  function getMembersJson(url, api){
    fetch(url,
    {method:"GET",
    headers: {"X-API-Key": api}
    })
    .then( resp => resp.json())
    .then( data => {members = data.results[0].members})
    .then(function(){createAll(members)})
    .catch(error =>console.log(error));
  }
