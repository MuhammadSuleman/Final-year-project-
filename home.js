var win = Titanium.UI.currentWindow;
var view = Titanium.UI.createView();
//instructions on how to use the app
var Info = Titanium.UI.createLabel({
	bottom : 0,
	top : 140,
	text : "Instructions \n\n 1.Start off by adding clients and projects\n 2.View client details by clicking on their name.\n 3.Click on a project to start workign on it.\n 4.Click on the project name in Client details to    stop the clock ",
	color : 'grey',
	backgroundColor : 'white',
	width : Titanium.UI.FILL,
	textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
	font : {
		fontSize : 17,
		fontWeight : 'normal'
	},

});
win.add(Info);

//***************************CLOCK***********************
//a seperate view for the clock
var clockView = Titanium.UI.createView({
	backgroundColor : 'white',
	bottom : 0,
	height : 80,
	width : Ti.UI.FILL,
	//borderColor : '#F49831'

});

//Label for displayin the time
var timerlabel = Titanium.UI.createLabel({
	text : "00:00:00",
	color : '#F49831',
	bottom : 25,
	textAlign : "center",
	font : {
		fontSize : 38,
		fontWeight : 'normal'
	},
	width : 350,

});

// label to indicate hour
var hourlabel = Titanium.UI.createLabel({
	text : 'Hours',
	bottom : 10,
	left : 105,
});
//label to indicate the minutes
var minlabel = Titanium.UI.createLabel({
	text : 'Mins',
	bottom : 10,
	textAlign : "center",
});
//label to indicate secaonds
var seclabel = Titanium.UI.createLabel({
	text : 'Secs',
	bottom : 10,
	right : 110,
});

//function to start the time
var startTime = function() {
	timerlabel.value = '00:00:00';
	//using javascript date to create a clcok effect
	var startTime = new Date();
	//function to update the time
	var _updateTimer = function updateTimer() {
		//defininf hour, munites and seconds
		var UNIT_HOUR = 60 * 60 * 1000;
		var UNIT_MINUTE = 60 * 1000;
		var UNIT_SEC = 1000;
		var now = new Date();
		//working out the time difference
		var diff = now.getTime() - startTime.getTime();
		//calculating the hours
		var hour = Math.floor(diff / UNIT_HOUR);
		//calculating the minutes
		var minute = Math.floor((diff - hour * UNIT_HOUR) / UNIT_MINUTE);
		//calculating the seconds
		var sec = Math.floor((diff - hour * UNIT_HOUR - minute * UNIT_MINUTE) / UNIT_SEC);
		//foramtting the hours, minutes and seconds by adding 0 infront of i if it's less than 10
		timerlabel.text = ('0' + hour).slice(-2) + ':' + ('0' + minute).slice(-2) + ':' + ('0' + sec).slice(-2);
	};
	//adding a fixed dellay
	intervalid = setInterval(_updateTimer, 2);

};
//function to stop the time
var stopTime = function() {
	//cancel interval timer
	clearInterval(intervalid);
};

win.add(clockView);
clockView.add(timerlabel);
clockView.add(hourlabel);
clockView.add(minlabel);
clockView.add(seclabel);
//***************************Projects***********************
//view for the tableview
TView = Ti.UI.createView({
	backgroundColor : 'white ',
	top : 0,
	bottom : 250,
	color : 'white',
	borderColor : '#F49831'

});
win.add(TView);
//HTTP link
var sendit = Ti.Network.createHTTPClient();
//send a HTTP link to the file
sendit.open('GET', 'http://www.doc.gold.ac.uk/~ma101ms/readProject.php');
sendit.send();
//on return
sendit.onload = function() {
	//read the response and store it
	var json = JSON.parse(this.responseText);
	//read a certain row from the array
	var json = json.projects;
	//an array to store the response
	var dataArray = [];

	var pos;
	//for loop to read each record
	for ( pos = 0; pos < json.length; pos++) {
		//storing the records in the array
		dataArray.push({
			title : '' + json[pos].project + '',
			height : 33,
			hasChild : true,
		});
		// set the array to the tableView
		tableview.setData(dataArray);
	};

};
//tableview for to display the projects
var tableview = Ti.UI.createTableView({
	backgroundColor : 'white',
	separatorColor : 'black',
	headerTitle : 'Current Projects',
	font : {
		fontSize : 35,
		color : 'black'
	}

});
win.add(TView);
TView.add(tableview);
//view for the project details
tablePD = Ti.UI.createView({
	height : 161,
	bottom : 70,
	color : 'white',
	borderColor : '#F49831'

});

var projectLabel = Titanium.UI.createLabel({
	bottom : 230,
	height : 20,
	text : "Project Details",
	color : 'white',
	backgroundColor : 'darkgrey',
	width : Titanium.UI.FILL,
	textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
	font : {
		fontSize : 12,
		fontWeight : 'normal'
	},

});
win.add(projectLabel);
//HTTP link
var loginReq = Titanium.Network.createHTTPClient();
//listening for click even in tableview
tableview.addEventListener('click', function(e) {
	//checking which row is clicked on
	if (e.rowData.title) {
		//creating a variable to store the project name
		var project = '';
		//sending a request to the PHP file
		loginReq.open("POST", "http://www.doc.gold.ac.uk/~ma101ms/projectDetails.php");
		//with the row Title as the project naem
		var params = {
			project : e.rowData.title
		};
		loginReq.send(params);

	} else {
		alert("project does not exist");
	}
});

// DATABASE PROGRAMMING/////

 var request = Ti.Network.createHTTPClient();
tableview.addEventListener('click', function(e) {
	//starting the clock
	startTime();
	if (e.rowData.title) {
		var project = '';
		//sending a request to the PHP file
		request.open("POST", "http://www.doc.gold.ac.uk/~ma101ms/addHours.php");
		//with the project name
		var params = {
			project : e.rowData.title,
		};
		request.send(params);
	}
	win.add(tablePD);
	tablePD.add(tvProjectDetails);

});
//on retrieval from the HTTP link
loginReq.onload = function() {
	var json = JSON.parse(this.responseText);
	//read the array project
	var json = json.project;

	var dataArray = [];
	var pos;
	var clientname = '';
	//reading  the project name using a for loop
	for ( pos = 0; pos < json.length; pos++) {

		dataArray.push({
			title : json[pos].project,
			height : 31,
		});
		tvProjectDetails.setData(dataArray);
		Ti.API.info(tvProjectDetails);
		Ti.API.info(dataArray);
	};
	//reading client name using a for loop
	for ( pos = 0; pos < json.length; pos++) {

		dataArray.push({
			title : 'client:  ' + json[pos].client + '',
			height : 31,
		});
		// set the array to the tableView
		tvProjectDetails.setData(dataArray);
	};
	//readimg the users position
	for ( pos = 0; pos < json.length; pos++) {

		dataArray.push({
			title : 'Position:  ' + json[pos].position + '',
			height : 31,
		});
		// set the array to the tableView
		tvProjectDetails.setData(dataArray);
	};
	//reading the hourly rates
	for ( pos = 0; pos < json.length; pos++) {

		dataArray.push({
			title : 'Hourly Rate:  ' + json[pos].hourlyrate + '',
			height : 31,
		});

		// set the array to the tableView
		tvProjectDetails.setData(dataArray);
	};
	//finally, reading the comments
	for ( pos = 0; pos < json.length; pos++) {

		dataArray.push({
			title : 'Comments: ' + json[pos].comments + '',
			height : 31,
		});
		// set the array to the tableView
		tvProjectDetails.setData(dataArray);
	};

};
//tablew for the project details to be displayed in
var tvProjectDetails = Ti.UI.createTableView({
	backgroundColor : 'white',
	separatorColor : 'black',
	hasCheck : true,
	font : {
		fontSize : 31,
		color : 'black'
	}

});
//adding an event listener to stop the clcok and send the row data to be inserted in the database
tvProjectDetails.addEventListener('click', function(e) {
	stopTime();

	if (e.rowData.title) {
		var project = '';
		request.open("POST", "http://www.doc.gold.ac.uk/~ma101ms/addFinish.php");
		var params = {
			project : e.rowData.title,
		};
		request.send(params);
	}

});

