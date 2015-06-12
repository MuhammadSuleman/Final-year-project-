var win = Titanium.UI.currentWindow;
var view = Titanium.UI.createView();

//Lst of Clients
var clients = Titanium.UI.createLabel({
	top : '0%',
	height : '4%',
	text : "List Of Clients",
	color : 'white',
	backgroundColor : 'darkgrey',
	borderColor : '#F49831',
	width : Titanium.UI.FILL,
	textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
	font : {
		fontSize : 12,
		fontWeight : 'normal'
	},

});
win.add(clients);
//veiw for the tableview
TView = Ti.UI.createView({
	top : '4%',
	height : '50%',
	color : 'black',
	borderColor : '#F49831'

});
win.add(TView);
//client view details
viewClientDetails = Ti.UI.createView({
	height : '35%',
	bottom : '10%',
	color : 'black',
	borderColor : '#F49831'

});
win.add(viewClientDetails);
var view = Titanium.UI.createView();
//reding clients from the databse using a HTTP link
var sendit = Ti.Network.createHTTPClient();
sendit.open('GET', 'http://www.doc.gold.ac.uk/~ma101ms/readClient.php');
sendit.send();

//function to read the data from the databse via PHP
sendit.onload = function() {
	var json = JSON.parse(this.responseText);
	//readin the array clients from the PHP file
	var json = json.clients;

	var dataArray = [];
	var pos;
	// for loop to read the clientname
	for ( pos = 0; pos < json.length; pos++) {

		dataArray.push({
			title : '' + json[pos].clientname + '',
			height : 40,
			hasChild : true,
		});
		// set the array to the tableView
		tableview.setData(dataArray);
	};

};

//tableview for clients
var tableview = Ti.UI.createTableView({
	separatorColor : 'black',
	font : {
		fontSize : 30,
		color : 'black'
	}

});
TView.add(tableview);

//Client Details
var loginReq = Titanium.Network.createHTTPClient();
//event listener on tableview
tableview.addEventListener('click', function(e) {
	//reading the tablerow title
	if (e.rowData.title) {

		var clientname = '';
		loginReq.open("POST", "http://www.doc.gold.ac.uk/~ma101ms/clientDetails.php");
		var params = {
			//setting the row title to clientname
			clientname : e.rowData.title
		};
		//and sending it to the PHP file
		loginReq.send(params);

	} else {
		alert("Username/Password are required");
	}
});
//function to read the client details
loginReq.onload = function() {
	var json = JSON.parse(this.responseText);
	var json = json.clients;

	var dataArray = [];
	var pos;
	var clientname = '';
	//for loop for reading the clientname
	for ( pos = 0; pos < json.length; pos++) {

		dataArray.push({
			title : 'Client Name: ' + json[pos].clientname + '',
			height : 32,
		});
		tvClientDetails.setData(dataArray);
	};
	//for loop for reading the address
	for ( pos = 0; pos < json.length; pos++) {

		dataArray.push({
			title : 'Address: ' + json[pos].address + '',
			height : 32,
		});
		// set the array to the tableView
		tvClientDetails.setData(dataArray);
	};
	//for loop for readng the mobile number
	for ( pos = 0; pos < json.length; pos++) {

		dataArray.push({
			title : 'Mobile Number: ' + json[pos].mobile + '',
			height : 32,
		});
		// set the array to the tableView
		tvClientDetails.setData(dataArray);
	};
	//for loop for reading workmobile
	for ( pos = 0; pos < json.length; pos++) {

		dataArray.push({
			title : 'Work Mobile: ' + json[pos].workmobile + '',
			height : 32,
		});
		// set the array to the tableView
		tvClientDetails.setData(dataArray);
	};
	////for loop for readin the comments
	for ( pos = 0; pos < json.length; pos++) {

		dataArray.push({
			title : 'Comments: ' + json[pos].comments + '',
			height : 32,
		});
		// set the array to the tableView
		tvClientDetails.setData(dataArray);
	};
};

//label for clientdetails
var clientDetails = Titanium.UI.createLabel({
	bottom : '45%',
	height : '4%',
	text : "Client Details",
	color : 'white',
	backgroundColor : 'darkgrey',
	width : Titanium.UI.FILL,
	textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
	font : {
		fontSize : 12,
		fontWeight : 'normal'
	},

});
win.add(clientDetails);
//table view for clientdetails
var tvClientDetails = Ti.UI.createTableView({
	backgroundColor : 'white',
	separatorColor : 'black',
	font : {
		fontSize : 30,
		color : 'black'
	}

});
viewClientDetails.add(tvClientDetails);

//Navigation bar at the bottom of the screen
var bottomBar = Ti.UI.createView({

	width : Ti.UI.FILL,
	height : '10%',
	bottom : 0,
	borderColor : '#F49831',
	backgroundColor : 'lightGrey'

});

//button to add a client
var addClient = Ti.UI.createButton({
	backgroundColor : '#F49831',
	title : 'Add Client',
	left : 0,
	width : '33%',
	font : {
		fontFamily : 'Arial',
		fontWeight : 'bold',
		fontSize : 15
	}

});
//connecting the button to the addClient class
addClient.addEventListener('click', function(e) {
	var win = Ti.UI.createWindow({
		url : '../main_windows/addClient.js'
	});

	Ti.UI.currentTab.open(win);

});
//add a project button
var addProject = Ti.UI.createButton({
	backgroundColor : '#F49831',
	title : 'Add Proejct',
	right : 0,
	width : '33%',
	font : {
		fontFamily : 'Arial',
		fontWeight : 'bold',
		fontSize : 15
	}

});
//connectung the project button to the
addProject.addEventListener('click', function(e) {
	var win = Ti.UI.createWindow({
		url : '../main_windows/addProject.js'
	});
	//open a new window in the current tab
	Ti.UI.currentTab.open(win);

});
//options for adding hours manually
var addHours = Ti.UI.createButton({
	backgroundColor : '#F49831',
	title : 'Add Hours',
	left : '33.5%',
	width : '33%',
	font : {
		fontFamily : 'Arial',
		fontWeight : 'bold',
		fontSize : 15
	}

});

//event listener for the button to direct the window to the addHours page
addHours.addEventListener('click', function(e) {
	var win = Ti.UI.createWindow({
		url : '../main_windows/timer.js'
	});
	//open a new window in the current tab
	Ti.UI.currentTab.open(win);

});

win.add(bottomBar);
bottomBar.add(addClient);
bottomBar.add(addProject);
bottomBar.add(addHours);
