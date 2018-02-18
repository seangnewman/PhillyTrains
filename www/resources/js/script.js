var xmlhttp;

window.onload = function(){

  document.addEventListener('deviceready', init, false);
  init();
}

function init(){
  document.getElementById('btnGetSched').addEventListener('click',getSchedule, false);
  //create station drop Down
  for(var i=0; i < stations.length; i++){
    document.getElementById('stations').innerHTML += "<option value='" + stations[i].stationNum + "'>" + stations[i].stationName + "</optoin>";
  }
}

function getSchedule(){
  var stationNumber = document.getElementById('stations').value;
   alert("http://www3.septa.org/hackathon/Arrivals/" + stationNumber + "/10/");
    $.ajax({url:"http://www3.septa.org/hackathon/Arrivals/" + stationNumber + "/10/",
            datatype: 'jsonp',
            type: 'GET',
            success:function(result){

              parseJSON(result);
            },
            error: function(result){

              alert('error received');
              alert("An error occured: " + result.status + " " + result.statusText);

            }
            });
  $("#schedule").html("");
}

function parseJSON(result){
  var arr = result[Object.keys(result)];

  var out = "<h3>Northbound</h3>";

  out += "<table class='sced'>";
  out += "<tr class='odd'>"  +
              "<th>Train #</th>" +
              "<th>Time</th>" +
              "<th>Destination</th>" +
              "<th>Service</th>" +
              "<th>Status</th>" +
          "</tr>";

  var Northbound = arr[0].Northbound;

  for(var x=0; x < Northbound.length; x++){

    if(x%2 === 0){
      out += "<tr class='even'>";
    }else{
      out += "<tr class='odd'>";
    }

    var trainID = Northbound[x].train_id;
    var destination = Northbound[x].destination;
    var service = Northbound[x].service_type;
    var status = Northbound[x].status;
    var time = Northbound[x].depart_time;

    out += "<td>" + trainID + "</td><td>" + time + "</td><td>" + destination + "</td>" + "</td><td>" + service + "</td><td>" + status + "</td>";
    out += "</tr>";
  }

  out += "</table>";
  document.getElementById('schedule').innerHTML += out;




  var Southbound = arr[1].Southbound;
  var out = "<h3>Southbound</h3>";
  out += "<table class='sced'>";
  out += "<tr class='odd'><th>Train #</th><th>Time</th><th>Destination</th><th>Service</th><th>Status</th></tr>";
  for(var x=0; x < Southbound.length; x++){
    if(x%2 === 0){
      out += "<tr class='even'>";
    }else{
      out += "<tr class='odd'>";
    }

    var trainID = Southbound[x].train_id;
    var destination = Southbound[x].destination;
    var service = Southbound[x].service_type;
    var status = Southbound[x].status;
    var time = Southbound[x].depart_time;

    out += "<td>" + trainID + "</td><td>" + time + "</td><td>" + destination + "</td>" + "</td><td>" + service + "</td><td>" + status + "</td>";
    out += "</tr>";

  }
  out += "</table>";
  document.getElementById('schedule').innerHTML += out;

  //document.getElementById('schedule').innerHTML = '<p>Testing</p>';

}
