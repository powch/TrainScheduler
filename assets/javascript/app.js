'use strict';

// Globals
var submitBtn = $('#submitBtn');

var config = {
    apiKey: 'AIzaSyAtV1FNgse7bzep7Jk7Zie2-Jz3Ovt42tM',
    authDomain: 'trainscheduler-cdbf3.firebaseapp.com',
    databaseURL: 'https://trainscheduler-cdbf3.firebaseio.com',
    projectId: 'trainscheduler-cdbf3',
    storageBucket: 'trainscheduler-cdbf3.appspot.com',
    messagingSenderId: '593445014216'
};

firebase.initializeApp(config);

var dataRef = firebase.database().ref();


// Pushes data to firebase on form submission
submitBtn.click(function () {
    event.preventDefault();

    var nameInput = $('#nameInput').val().trim();
    var destinationInput = $('#destinationInput').val().trim();
    var firstInput = $('#firstInput').val().trim();
    var freqInput = $('#freqInput').val().trim();

    dataRef.push({
        name: nameInput,
        destination: destinationInput,
        firstTime: firstInput,
        frequency: freqInput
    });

    $('#nameInput').val('');
    $('#destinationInput').val('');
    $('#firstInput').val('');
    $('#freqInput').val('');
});


// on data submission, append new table row for every child in firebase 
dataRef.on('child_added', function (snap) {
    var schedule = $('#schedule');
    var val = snap.val();
    var startTime = moment(val.firstTime, 'HH:mm').subtract(1, 'years');
    var minuteDiff = moment().diff(moment(startTime), 'minutes');
    var timeRemainder = minuteDiff % val.frequency;
    var minTillTrain = val.frequency - timeRemainder;
    var nextTrain = moment().add(minTillTrain, 'minutes').format('HH:mm');

    var newRow = $('<tr>').append(
        $('<td>').text(val.name),
        $('<td>').text(val.destination),
        $('<td>').text(val.frequency),
        $('<td>').text(nextTrain),
        $('<td>').text(minTillTrain)
    );

    schedule.append(newRow);
}, function(e) {
    console.log(`Errors handled: ${e.code}`);
});