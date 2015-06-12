//set the background for the main window
Titanium.UI.setBackgroundColor('white');
//create a window
var main = Titanium.UI.createWindow();
//create a tab
var mainTab = Titanium.UI.createTab();
//group the windows in a tab group
var tabGroup = Titanium.UI.createTabGroup({
	backgroundColor : 'white'
});

//creating login page
var login = Titanium.UI.createWindow({
	backgroundColor : 'white',
	title : 'Authentication',
	//this where the window will get its instructions from
	url : 'main_windows/login.js'
});

//giving the login page some properties
var loginTab = Titanium.UI.createTab({
	//sets the backgrond colour to white
	backgroundColor : 'white',
	//tsets "Login" as the title of the tab
	title : "Login",
	//connecting to the login window
	window : login
});

//this creates the register page
var account = Titanium.UI.createWindow({
	//sets the backgrond colour to white
	backgroundColor : 'white',
	title : 'New Account',
	//this where the window will get its instructions from
	url : 'main_windows/account.js'
});

//setting properties for the account tab
var accountTab = Titanium.UI.createTab({
	//setting the backgorund colour
	backgroundColor : 'white',
	//title of the tab
	title : 'Register',
	//connecting to the account window
	window : account
});
//adding the windows to the tab group
tabGroup.addTab(loginTab);
tabGroup.addTab(accountTab);
//opening the tab group
tabGroup.open();

//these tabs are displayed once the user logs in successfully

//setting the properties for each tab
var home = Titanium.UI.createWindow({
	backgroundColor : 'white',
	title : 'home',
	url : 'main_windows/home.js'
});

var homeTab = Titanium.UI.createTab({
	backgroundColor : 'white',
	title : 'Home',
	window : home
});
//hours worked
var hoursWorked = Titanium.UI.createWindow({
	backgroundColor : 'white',
	title : 'hours',
	url : 'main_windows/hoursWorked.js'
});

var hoursTab = Titanium.UI.createTab({
	backgroundColor : 'white',
	title : 'Hours Worked',
	window : hoursWorked
});
//To Do tab
var ToDo = Titanium.UI.createWindow({

	backgroundCOlor : 'white',
	title : 'To Do',
	url : 'main_windows/ToDo.js'
});

var ToDoTab = Titanium.UI.createTab({
	backgroundColor : 'white',
	title : 'TO DO',
	window : ToDo
});
//Clients Tab
var clients = Titanium.UI.createWindow({

	backgroundCOlor : 'white',
	title : 'Clients',
	url : 'main_windows/clients.js'

});

var clientsTab = Titanium.UI.createTab({
	backgroundColor : 'white',
	title : 'Clients',
	window : clients
});

//firing an event upon succesfull login to display the tabs
Ti.App.addEventListener('open', function(event) {

	//ToDo
	ToDo.tabBarHidden = false;
	ToDo.title = 'home';
	ToDo.url = 'main_windows/ToDo.js';

	//hoursWorked
	hoursWorked.tabBarHidden = false;
	hoursWorked.title = 'home';
	hoursWorked.url = 'main_windows/hoursWorked.js';

	//clients
	clients.tabBarHidden = false;
	clients.title = 'home';
	clients.url = 'main_windows/clients.js';
	//Home tab
	home.tabBarHidden = false;
	home.title = 'Welcome' + event.name;
	home.url = 'main_windows/home.js';

	homeTab.window = home;
	//Adding the tabs to the tabgroup of the inner app
	tabGroup.addTab(homeTab);
	tabGroup.addTab(clientsTab);
	tabGroup.addTab(ToDoTab);
	tabGroup.addTab(hoursTab);
	tabGroup.removeTab(loginTab);
	tabGroup.removeTab(accountTab);
});

