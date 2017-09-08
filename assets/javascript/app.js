var config = {
    apiKey: "AIzaSyCG_tJYx0prvIF8juqH03Imu9xNVxIdTFM",
    authDomain: "my-first-firebase-test-cb84c.firebaseapp.com",
    databaseURL: "https://my-first-firebase-test-cb84c.firebaseio.com",
    projectId: "my-first-firebase-test-cb84c",
    storageBucket: "my-first-firebase-test-cb84c.appspot.com",
    messagingSenderId: "749367150277"
  };


firebase.initializeApp(config);


var database = firebase.database();

var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = 0;


$("#add-train-btn").on("click", function() {

  trainName = $('#train-name-input').val().trim();
  destination = $('#destination-input').val().trim();
  firstTrainTime = $('#first-train-start-input').val().trim();
  frequency = $('#frequency-input').val().trim();

  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency
  });

    return false;
});



database.ref().on("child_added", function(snapshot) {
  console.log(snapshot.val());

  
  trainName = snapshot.val().trainName;
  destination = snapshot.val().destination;
  firstTrainTime = snapshot.val().firstTrainTime;
  frequency = snapshot.val().frequency;


  
  var firstTrainMoment = moment(firstTrainTime, 'HH:mm');
  var nowMoment = moment(); 

  var minutesSinceFirstArrival = nowMoment.diff(firstTrainMoment, 'minutes');
  var minutesSinceLastArrival = minutesSinceFirstArrival % frequency;
  var minutesAway = frequency - minutesSinceLastArrival;

  var nextArrival = nowMoment.add(minutesAway, 'minutes');
  var formatNextArrival = nextArrival.format("HH:mm");


  
  var tr = $('<tr>');
  var a = $('<td>');
  var b = $('<td>');
  var c = $('<td>');
  var d = $('<td>');
  var e = $('<td>');
  a.append(trainName);
  b.append(destination);
  c.append(frequency);
  d.append(formatNextArrival);
  e.append(minutesAway);
  tr.append(a).append(b).append(c).append(d).append(e);
  $('#newTrains').append(tr);


  }, function (errorObject) {

 
    console.log("The read failed: " + errorObject.code);

});













