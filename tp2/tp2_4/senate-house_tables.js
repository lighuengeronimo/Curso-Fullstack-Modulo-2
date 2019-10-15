
function createTable(){
    var members=[];
    var html="";
    var element="";

  if (document.getElementById("house-data")!= null){
    members = houseData.results[0].members;
    element="house-data";
  }

  else if(document.getElementById("senate-data")!= null){
    members = senateData.results[0].members;
    element="senate-data";
  }


  for (i=0;i<members.length;i++){
	
    var middleName= members[i].middle_name || ""; 
    var fullName =  members[i].first_name + " " +middleName + " " + members[i].last_name;
    
     html+= "<tr>"+
                    "<td><a href= \""+members[i].url+ "\">"+fullName+"</a></td>"+
                    "<td>"+members[i].party+"</td>"+
                    "<td>"+members[i].state+"</td>"+
                    "<td>"+members[i].seniority+"</td>"+
                    "<td>"+members[i].votes_with_party_pct+"</td>"+
                    "</tr>"
  }


 document.getElementById(element).innerHTML = html;

}

createTable();