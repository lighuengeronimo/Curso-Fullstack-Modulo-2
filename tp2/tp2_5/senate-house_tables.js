

/*var membersParty= members.map(function(){members.party(push)});

function checkParty(){
  membersParty.map(function(){membersParty=checkedBoxesArray};  
}*/
function createTable(){

var checkedboxes = document.querySelectorAll('input[name=party]:checked');
var checkedboxesArray=Array.from(checkedboxes).map(elt => elt.value);
var html="";
var elementID="";

if (document.getElementById("house-data")!= null){
members = houseData.results[0].members;
elementID="house-data";

}

else if(document.getElementById("senate-data")!= null){
members = senateData.results[0].members;
elementID = "senate-data";
}
  
  var filteredMembers=[];

  for (var i=0; i<checkedboxesArray.length;i++){
    filteredMembers = filteredMembers.concat(members.filter(  val=> val.party == checkedboxesArray[i])) ;
  }

  for (var i=0;i<filteredMembers.length;i++){
	  var party="";
    var middleName= filteredMembers[i].middle_name || ""; 
    var fullName =  filteredMembers[i].first_name + " " +middleName + " " + filteredMembers[i].last_name;
    
    html+= "<tr>"+
                  "<td><a href= \""+filteredMembers[i].url+ "\">"+fullName+"</a></td>"+
                  "<td class=\""+party+"\">"+filteredMembers[i].party+"</td>"+
                  "<td>"+filteredMembers[i].state+"</td>"+
                  "<td>"+filteredMembers[i].seniority+"</td>"+
                  "<td>"+filteredMembers[i].votes_with_party_pct+"</td>"+
                  "</tr>"
  }

  document.getElementById(elementID).innerHTML = html;
}


var table= createTable();
document.getElementById("checkboxes").onchange = createTable();