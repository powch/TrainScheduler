var nameInput = $('#nameInput');
var destinationInput = $('#destinationInput');
var firstInput = $('#firstInput');
var freqInput = $('#freqInput');
var schedule = $('#schedule');

var config = {
    apiKey: "AIzaSyAtV1FNgse7bzep7Jk7Zie2-Jz3Ovt42tM",
    authDomain: "trainscheduler-cdbf3.firebaseapp.com",
    databaseURL: "https://trainscheduler-cdbf3.firebaseio.com",
    projectId: "trainscheduler-cdbf3",
    storageBucket: "trainscheduler-cdbf3.appspot.com",
    messagingSenderId: "593445014216"
};
firebase.initializeApp(config);

var database = firebase.database();