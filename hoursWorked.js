var win = Titanium.UI.currentWindow;

//***************************clientName******************************
//label for hours worked
var clients = Titanium.UI.createLabel({
	top : '0%',
	height : '10%',
	text : "Hours Worked",
	color : 'white',
	backgroundColor : 'darkgrey',
	borderColor : '#F49831',
	width : Titanium.UI.FILL,
	font : {
		fontSize : 16,
		fontWeight : 'normal'
	},

});
win.add(clients);
//HTTP client for reading the hours
var sendit = Ti.Network.createHTTPClient();
sendit.open('POST', 'http://www.doc.gold.ac.uk/~ma101ms/readHours.php');
sendit.send();
//function to read and display the details
sendit.onload = function() {
	//the response fromt the PHP file
	var json = JSON.parse(this.responseText);
	Ti.API.info(this.responseText);
	////reading the hourworked array
	var json = json.hoursworked;
	//creating an array to store each row fromt the database
	var dataArray = [];
	var dataArray1 = [];
	var dataArray2 = [];

	var pos;
	//while lopp to read the project name and display it in the clientname tableview
	for ( pos = 0; pos < json.length; pos++) {

		dataArray.push({
			title : '' + json[pos].projectname + '',
			height : 37,
			hasChild : false,
		});
		// set the array to the clientName
		clientName.setData(dataArray);
	};
	//reading startime using while loop and storing it in the starttime tablview
	for ( pos = 0; pos < json.length; pos++) {

		dataArray1.push({
			title : '' + json[pos].starttime + '',
			height : 37,
			hasChild : false,
		});
		// set the array to the clientName
		startTime.setData(dataArray1);
	};
	//reading finish time using while loop and storing it in the finishtime tablview
	for ( pos = 0; pos < json.length; pos++) {

		dataArray2.push({
			title : '' + json[pos].finishtime + '',
			height : 37,
			hasChild : false,
		});
		// set the array to the clientName
		finishTime.setData(dataArray2);
	};
};
//creating view for each tableset
clientView = Ti.UI.createView({
	backgroundColor : 'white ',
	left : 0,
	top : '10%',
	bottom : 0,
	width : '30%',
	color : 'white',
	borderColor : '#F49831'

});
win.add(clientView);

var clientName = Ti.UI.createTableView({
	backgroundColor : 'white',
	separatorColor : 'black',
	headerTitle : 'Client Name',
	font : {
		fontSize : 20,
		color : 'black'
	}

});
clientView.add(clientName);

//************starttime*********//
startView = Ti.UI.createView({
	backgroundColor : 'white ',
	left : '30%',
	top : '10%',
	bottom : 0,
	width : '35%',
	color : 'white',
	borderColor : '#F49831'

});
win.add(startView);
var startTime = Ti.UI.createTableView({
	backgroundColor : 'white',
	separatorColor : 'black',
	headerTitle : 'Start Time',
	font : {
		fontSize : 20,
		color : 'black'
	}

});
startView.add(startTime);

/////*******FinsihTime**********

finishView = Ti.UI.createView({
	backgroundColor : 'white ',
	left : '65%',
	top : '10%',
	bottom : 0,
	width : '35%',
	color : 'white',
	borderColor : '#F49831'

});
win.add(finishView);
var finishTime = Ti.UI.createTableView({
	backgroundColor : 'white',
	separatorColor : 'black',
	headerTitle : 'Client Name',
	font : {
		fontSize : 20,
		color : 'black'
	}

});
finishView.add(finishTime);
