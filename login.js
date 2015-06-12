//opening a window
var win = Titanium.UI.currentWindow;
//making a view to display the contents in
var view = Titanium.UI.createView();
//this is the image displayed on the login page
win.barColor = '#F49831';
var image = Titanium.UI.createImageView({
	//borderColor:'#F49831',
	image : 'images/timeSheet.jpg',
	top : 30,
	width : 200

});
//adding the view to the window
win.add(view);
//adding the image to the view
view.add(image);

//this is the interface for the login screen
//the username field
var username = Ti.UI.createTextField({
	color : '#F49831',
	//backgroundColor:'#DEE0E0',
	borderRadius : 1,
	borderColor : '#F49831',
	top : 310,
	left : 10,
	width : 340,
	height : 40,
	hintText : 'Username',
	//choosing a default keyboard for the user which includes numerical and alphabetical values
	keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
	//setting the instructions for the enter key when it's clicked
	returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
	borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
win.add(username);

//the password field
var password = Titanium.UI.createTextField({
	color : '#F49831',
	borderColor : '#F49831',
	//backgroundColor:'#DEE0E0',
	borderRadius : 1,
	top : 360,
	left : 10,
	width : 340,
	height : 40,
	hintText : 'Password',
	passwordMask : true,
	keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
	borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED

});
win.add(password);

//the login button
var loginBtn = Titanium.UI.createButton({
	backgroundColor : '#F49831',
	title : 'Login',
	top : 410,
	width : 200,
	height : 50,
	bottom : 200,
	borderRadius : 5,
	font : {
		fontFamily : 'Arial',
		fontWeight : 'bold',
		fontSize : 14
	}
});

win.add(loginBtn);

//creating a http client
var loginReq = Titanium.Network.createHTTPClient();

//checking the username and password
loginReq.onload = function() {
	//this is the response we get back from the PHP file
	var json = this.responseText;
	//store the response in a variable
	var response = JSON.parse(json);
	//checking if the username and password were correct
	if (response.logged == true) {
		username.blur();
		password.blur();
		//if they were then fire the open event in the app class
		Ti.App.fireEvent('open', {
			//these are the details the PHP file sends back
			name : response.name,
			email : response.email
		});
		//if they were then close the current window
		win.close();
	} else {
		//if not then display an error message
		alert(response.message);
	}
};

//error checking and authenticating username and password
loginBtn.addEventListener('click', function(e) {
	//if the username and passwored values are not empty
	if (username.value != '' && password.value != '') {
		//send the information to the post_auth file on the server
		loginReq.open("POST", "http://www.doc.gold.ac.uk/~ma101ms/post_auth.php");
		//incude these variables in the http link
		var params = {
			//username value
			username : username.value,
			//password value; encrypted to prevent hacker from stealing
			password : Ti.Utils.md5HexDigest(password.value)
		};
		//send the paramaeters
		loginReq.send(params);
	} else {
		//otherwise display an error message
		alert("Username/Password are required");
	}
});
