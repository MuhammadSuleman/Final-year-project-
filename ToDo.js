
// Open the database and create schema (if needed)
var db = Ti.Database.open('projects.sqlite');
//creating a table with properties
db.execute('CREATE TABLE IF NOT EXISTS project_List (ID INTEGER PRIMARY KEY AUTOINCREMENT, taskName TEXT, FINISHED INTEGER)');
//adding a scrollview ot the window
var win = Titanium.UI.currentWindow;
var view = Titanium.UI.createView();
var scrollView = Titanium.UI.createScrollView({
	contentWidth : Ti.UI.FILL,
	contentHeight : Ti.UI.FILL,
	top : 0,
	showVerticalScrollIndicator : true,
	showHorizontalScrollIndicator : false
});
win.add(scrollView);
scrollView.add(view);

//textfield for entering a task to do
var taskToDo = Ti.UI.createTextField({
	top : 8,
	left : 10,
	width : '75%',
	hintText : 'Create A New Project',
	//backgroundColor : 'white',
	borderColor : '#F49831',
	color : '#F49831',
	layout : 'horizontal',
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});
//add button to store the task
var buttonAdd = Titanium.UI.createButton({
	top : 4,
	title : 'Add',
	right : 9,
	width : '70',
	height : '47'

});
//calling the addtask method on button click
buttonAdd.addEventListener('click', function(e) {
	addTask(taskToDo.value);
});

//firing an event to click buttonAdd on clicking the return key on the keyboard
taskToDo.addEventListener('return', function() {
	buttonAdd.fireEvent('click');
});
//tableview for storing and displaying all the tasks
var list = Ti.UI.createTableView({
	//width : '90%',
	left : 10,
	right : 10,
	top : 62,
	bottom : 70,
	borderColor : '#F49831',
	backgroundColor : 'white',
	separatorColor : 'black',
	headerTitle : 'Projects'
});

//listening for a click event to put a check mark remove check mark
list.addEventListener('click', function(e) {
	var todoItem = e.rowData;
	var isComplete = (todoItem.hasCheck ? 0 : 1);
	//updating the database for that row
	db.execute('UPDATE project_List SET FINISHED = ? WHERE ID = ?', isComplete, todoItem.id);
	//refreshing tasks
	refreshTaskList();
});
//switch button
var basicSwitch;
//if not android
if (!Ti.Android) {
	//create a toggle swithc
	basicSwitch = Ti.UI.iOS.createTabbedBar({
		labels : ['All', 'Active'],
		left : 8,
		bottom : 10,
		height : 50,
		backgroundColor : '#e9e9e9',
		style : Titanium.UI.iPhone.SystemButtonStyle.BAR,
		index : 0,
	});

	basicSwitch.addEventListener('click', function(e) {
		toggleAllTasks(e.index === 0);
	});
} else {
	//if android then create the toggle switch using these properties
	basicSwitch = Ti.UI.createSwitch({
		value : true,
		bottom : 10,
		left : 8,
		height : 50,
		titleOn : 'All',
		titleOff : 'Active'
	});
	//adding an event listener to the switch button
	basicSwitch.addEventListener('change', function(e) {
		//displaying tasks with a check mark next to them only
		toggleAllTasks(e.value === true);
	});
}
//button for clearing tasks
var buttonCLear = Ti.UI.createButton({
	title : 'Clear Complete',
	right : 8,
	bottom : 10,
	height : 50,
	color : 'red'
});
//event listener on button clear
buttonCLear.addEventListener('click', function(e) {
	//checking the database for tasks that are complete and deleting them
	db.execute('DELETE FROM project_List WHERE FINISHED = 1;');
	refreshTaskList();
});

// Make sure the dababase is closed when the app exits
win.addEventListener('close', function() {
	db.close();
});
//function for adding the tasks to databses
function addTask(taskname) {
	//executing a query to insert the tasks in the database
	db.execute('INSERT INTO project_List (taskName, FINISHED) VALUES (?, 0)', taskname);
	//reseting the values
	taskToDo.value = '';
	taskToDo.blur();
	refreshTaskList();
}

//refresh tasks
function refreshTaskList() {
	//reading all the data from project_lists
	var rows = db.execute('SELECT * FROM project_List');
	var data = [];
	//going through the data using while loop and displaying it
	while (rows.isValidRow()) {
		var isComplete = rows.fieldByName('FINISHED');

		data.push({
			title : '' + rows.fieldByName('taskName') + '',
			hasCheck : (isComplete === 1) ? true : false,
			id : rows.fieldByName('ID'),
			color : '#153450',
			height : 25,
			className : 'task'
		});
		//reading each row
		rows.next();
	};
	//setting it to the tableview
	list.setData(data);
}

//this function works in conjuction with the basic switch to give view between tasks that are complete
//and tasks that are not
function toggleAllTasks(showAll) {
	//display all tasks
	if (showAll) {
		refreshTaskList();
	} else {
		//only show the ones that are complete
		var section = list.data[0];

		if (section) {
			for (var i = 0; i < section.rowCount; i++) {
				var row = section.rows[i];
				//delete items with a check mark
				if (row.hasCheck) {
					list.deleteRow(i);
				}
			}
		}
	}
}

win.add(view);
win.add(taskToDo);
win.add(buttonAdd);
win.add(list);
win.add(buttonCLear);
win.add(basicSwitch);
refreshTaskList();

