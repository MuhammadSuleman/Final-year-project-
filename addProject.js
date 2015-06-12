var win = Titanium.UI.currentWindow;
var view = Titanium.UI.createView();
//scrollview to make the window scrollable
var scrollView = Titanium.UI.createScrollView({
	contentWidth : Ti.UI.FILL,
	contentHeight : Ti.UI.FILL,
	top : 0,
	showVerticalScrollIndicator : true,
	showHorizontalScrollIndicator : false
});
win.add(scrollView);
scrollView.add(view);
//preset data for the tableview
var tableData = [{
	title : 'Project'
}, {
	title : 'Client'
}, {
	title : 'Position'
}, {
	title : 'Project Manager'
}, {
	title : 'Comments'
}];
//creating a view for the text fields
var texts = Ti.UI.createView({
	backgroundColor : 'white',
	top : '10%',
	left : '30%',
	//bottom : 100,
	width : Ti.UI.FILL,
	height : '80%',
	borderColor : '#F49831'

});
//view for the tableview
var tableView = Ti.UI.createView({
	backgroundColor : 'grey',
	top : '10%',
	left : 0,
	width : '30%',
	//bottom : 100,
	height : '80%',
	borderColor : '#F49831'
});
//tableview for the tabledata
var table = Ti.UI.createTableView({
	minRowHeight : 83,
	width : Ti.UI.FILL,
	top : 0,
	left : 0,
	data : tableData
});
view.add(tableView);
tableView.add(table);

//Create a textArea for the user to type
var project = Ti.UI.createTextArea({
	width : Ti.UI.FILL,
	top : 0,
	left : 0,
	height : '21%',
	borderColor : '#F49831',
	color : '#888',
	backgroundColor : 'transparent',
	font : {
		fontSize : 14,
		fontWeight : 'bold'
	}
});
//client textfield
var client = Ti.UI.createTextArea({
	width : Ti.UI.FILL,
	top : '21%',
	left : 0,
	height : '19.5%',
	borderColor : '#F49831',
	color : '#888',
	//value : notesMenu.value,
	backgroundColor : 'transparent',
	font : {
		fontSize : 14,
		fontWeight : 'bold'
	}
});
//hourlyRate textfield
var position = Ti.UI.createTextArea({
	width : Ti.UI.FILL,
	top : '40%',
	left : 0,
	height : '20%',
	borderColor : '#F49831',
	color : '#888',
	backgroundColor : 'transparent',
	font : {
		fontSize : 14,
		fontWeight : 'bold'
	}
});
//posiions textfield
var projectManager = Ti.UI.createTextArea({
	width : Ti.UI.FILL,
	top : '60.4%',
	left : 0,
	height : '19.5%',
	borderColor : '#F49831',
	color : '#888',
	backgroundColor : 'transparent',
	font : {
		fontSize : 14,
		fontWeight : 'bold'
	}
});
//comments textfield
var comments = Ti.UI.createTextArea({
	width : Ti.UI.FILL,
	top : '79.5%',
	left : 0,
	height : '21%',
	borderColor : '#F49831',
	color : '#888',
	backgroundColor : 'transparent',
	font : {
		fontSize : 14,
		fontWeight : 'bold'
	}

});
//label for adding a new project
var projectLabel = Titanium.UI.createLabel({
	left : 0,
	right : 0,
	text : "Add A New Project",
	color : '#F49831',
	top : '0%',
	height : '10%',
	textAlign : "center",
	borderColor : '#F49831',
	backgroundColor : 'grey'

});

//bottom bar for the buttons
var bottomBar = Ti.UI.createView({

	width : Ti.UI.FILL,
	height : '10%',
	bottom : 0,
	borderColor : '#F49831',
	backgroundColor : 'lightGrey'

});
//submit button
var submitButton = Ti.UI.createButton({
	backgroundColor : '#F49831',
	title : 'Submit',
	left : 0,
	width : '49.5%',
	font : {
		fontFamily : 'Arial',
		fontWeight : 'bold',
		fontSize : 10
	}

});

//clear fields button
var clearButton = Ti.UI.createButton({
	backgroundColor : '#F49831',
	title : 'Clear',
	right : 0,
	width : '49.5%',
	font : {
		fontFamily : 'Arial',
		fontWeight : 'bold',
		fontSize : 10
	}

});

//event listener for the clearing the fields when button clicked
clearButton.addEventListener('click', function(e) {
	project.value = '';
	client.value = '';
	projectManager.value = '';
	position.value = '';
	comments.value = '';
});

//adding the views,buttons,textfields etc to the window
win.add(view);
view.add(tableView);
tableView.add(table);
view.add(table);
view.add(texts);
texts.add(project);
texts.add(client);
texts.add(projectManager);
texts.add(position);
texts.add(comments);
view.add(projectLabel);
view.add(bottomBar);
bottomBar.add(submitButton);
bottomBar.add(clearButton);

// DATABASE PROGRAMMING/////
//creating HTTP client
var request = Ti.Network.createHTTPClient();
request.onload = function() {
	//if respons"Thank you for adding a project"
	if (this.responseText == "Thank you for adding a project") {
		//enable the save button
		submitButton.enabled = true;
		submitButton.opacity = 1;
		// alert response to user
		alert(this.responseText);
	} else {
		//otherwise let alert user to inform insert failed
		var alertDialog = Ti.UI.createAlertDialog({
			title : 'Alert',
			message : this.responseText,
			buttonNames : ['OK']
		});
		alertDialog.show();
		alertDialog.addEventListener('click', function(e) {
			win.tabGroup.setActiveTab(2);
		});
	}
};
//on click of saveButton
submitButton.addEventListener('click', function(e) {
	//check if all the fields have been filled out
	if (project.value != '' && client.value != '' && position.value != '' && projectManager.value != '' && comments.value != '') {
		//send a request to the PHP file using the HTTP link
		request.open("POST", "http://www.doc.gold.ac.uk/~ma101ms/addProject.php");
		//send these pramaters to the PHP file
		var params = {
			project : project.value,
			client : client.value,
			position : position.value,
			projectManager : projectManager.value,
			comments : comments.value
		};
		request.send(params);
		//clear all fields
		project.value = '';
		client.value = '';
		projectManager.value = '';
		position.value = '';
		comments.value = '';
		backgroundColor :'#F49831';
		//close the current window
		win.close();
	};
});

