var win = Titanium.UI.currentWindow;
var view = Titanium.UI.createView();
//scrollview for makin the window scrollable
var scrollView = Titanium.UI.createScrollView({
	contentWidth : Ti.UI.FILL,
	contentHeight : Ti.UI.FILL,
	top : 0,
	showVerticalScrollIndicator : true,
	showHorizontalScrollIndicator : false
});
win.add(scrollView);
scrollView.add(view);
//data to insert in tabeview
var tableData = [{
	title : 'Project Name'
}, {
	title : 'Position'
}, {
	title : 'Start Time'
}, {
	title : 'Finish Time'
}, {
	title : 'Comments'
}];

//view for grouping hte textfields
var texts = Ti.UI.createView({
	backgroundColor : 'white',
	top : '10%',
	left : '30%',
	//bottom : 100,
	width : Ti.UI.FILL,
	height : '80%',
	borderColor : '#F49831'

});
//view for the table data
var tableView = Ti.UI.createView({
	backgroundColor : 'grey',
	top : '10%',
	left : 0,
	width : '30%',
	//bottom : 100,
	height : '80%',
	borderColor : '#F49831'
});
//making a tableview and setting the tableData to it
var table = Ti.UI.createTableView({
	minRowHeight : 80,
	width : Ti.UI.FILL,
	top : 5,
	left : 0,
	data : tableData
});
//adding it the view and then tableview
view.add(tableView);
tableView.add(table);

//Create a textArea for the user to type
var projectname = Ti.UI.createTextArea({
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
//Create a textArea for the user to type
var position = Ti.UI.createTextArea({
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
//Create a textArea for the user to type
var starttime = Ti.UI.createTextArea({
	width : Ti.UI.FILL,
	top : '40.4%',
	left : 0,
	height : '19.6%',
	hintText : 'dd/mm/yyyy 00:00',
	borderColor : '#F49831',
	color : '#888',
	backgroundColor : 'transparent',
	font : {
		fontSize : 14,
		fontWeight : 'bold'
	}
});
//Create a textArea for the user to type
var finishtime = Ti.UI.createTextArea({
	width : Ti.UI.FILL,
	top : '60%',
	left : 0,
	height : '19.6%',
	borderColor : '#F49831',
	color : '#888',
	hintText : 'dd/mm/yyyy 00:00',
	backgroundColor : 'transparent',
	font : {
		fontSize : 14,
		fontWeight : 'bold'
	}
});

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

var addHours = Titanium.UI.createLabel({
	left : 0,
	right : 0,
	text : "Add Hours Manually",
	color : '#F49831',
	top : '0%',
	height : '10%',
	textAlign : "center",
	borderColor : '#F49831',
	backgroundColor : 'grey'

});


var bottomBar = Ti.UI.createView({

	width : Ti.UI.FILL,
	height : '10%',
	bottom : 0,
	borderColor : '#F49831',
	backgroundColor : 'lightGrey'

});

var submitButton = Ti.UI.createButton({
	backgroundColor : '#F49831',
	title : 'Submit',
	left : 0,
	width : '49.5%',
	font : {
		fontFamily : 'Arial',
		fontWeight : 'bold',
		fontSize : 15
	}

});
//clear button

var clearBtn = Ti.UI.createButton({
	backgroundColor : '#F49831',
	title : 'Clear',
	right : 0,
	width : '49.5%',
	font : {
		fontFamily : 'Arial',
		fontWeight : 'bold',
		fontSize : 15
	}

});

//clears all the text fields
clearBtn.addEventListener('click', function(e) {
	projectname.value = '';
	position.value = '';
	starttime.value = '';
	finishtime.value = '';
	comments.value = '';
});

win.add(view);
view.add(tableView);
tableView.add(table);
view.add(table);
view.add(texts);
texts.add(projectname);
texts.add(position);
texts.add(starttime);
texts.add(finishtime);
texts.add(comments);
view.add(addHours);
view.add(bottomBar);
bottomBar.add(submitButton);
bottomBar.add(clearBtn);

// DATABASE PROGRAMMING/////
//creating HTTP client
var request = Ti.Network.createHTTPClient();
//retrieveing information from the PHP file
request.onload = function() {
	//if respons"Thank you for adding a client"
	if (this.responseText == "Thank you for adding a your hours") {
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
	}
};
//on click of saveButton
submitButton.addEventListener('click', function(e) {
	//check if all the fields have been filled out
	if (projectname.value != '' && position.value != '' && starttime.value != '' && finishtime.value != '' && comments.value != '') {
		//send a request to the PHP file using the HTTP link
		request.open("POST", "http://www.doc.gold.ac.uk/~ma101ms/addHours.php");
		//send these pramaters to the PHP file
		var params = {
			projectname : projectname.value,
			position : position.value,
			starttime : starttime.value,
			finishtime : finishtime.value,
			comments : comments.value
		};
		//clear all fields
		request.send(params);
		projectname.value = '';
		position.value = '';
		starttime.value = '';
		finishtime.value = '';
		comments.value = '';
		backgroundColor :'#F49831';
		//close the current window
		win.close();
	} 
});

