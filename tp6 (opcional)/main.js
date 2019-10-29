var members = [];
var states = [];
var statesHtml = "<option value=\"All\">All</option>";


var app = new Vue({  
  el: '#app',
  data: {
    membersVue: [],
    states:[]
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
app.states= states;
states.forEach(function (state) { statesHtml += "<option value=\"" + state + "\"" + ">" + state + "</option>" });
//document.getElementById("stateDropdown").innerHTML = statesHtml;

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
    .then(function(){
      $(document).ready(function(){
        $(".iframe").colorbox({iframe:true, width:"80%", height:"80%"});
        $("#table").dataTable({
          "bPaginate": false,
          "bScrollCollapse": true
        })
      })})
    .catch(error =>console.log(error));
  }
