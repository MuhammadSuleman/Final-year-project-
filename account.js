var win = Titanium.UI.currentWindow;
/*
* Interface
*/
//allows the window to be scrollable
var scrollView = Titanium.UI.createScrollView({
	contentWidth : 'auto',
	contentHeight : 'auto',
	top : 0,
	showVerticalScrollIndicator : true,
	showHorizontalScrollIndicator : false
});
win.add(scrollView);

//Text field for the user to enter information
var username = Titanium.UI.createTextField({
	color : '#336699',
	top : 10,
	left : 10,
	width : 340,
	height : 40,
	hintText : 'Username',
	borderColor : '#F49831',
	//choosing a keyboard type
	keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
	//defining what the enter key does when clicked
	returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
	//defining the boarder styke
	borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
//add this to the scrollview
scrollView.add(username);
//password Text field for the user to enter information
var password1 = Titanium.UI.createTextField({
	color : '#336699',
	top : 60,
	left : 10,
	width : 340,
	height : 40,
	hintText : 'Password',
	borderColor : '#F49831',
	//this hides the letters
	passwordMask : true,
	//choosing a keyboard type
	keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
	//defining what the enter key does when clicked
	returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
	//defining the boarder styke
	borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
//adding to scrollview
scrollView.add(password1);
//password2 Text field for the user to enter information
var password2 = Titanium.UI.createTextField({
	color : '#336699',
	top : 110,
	left : 10,
	width : 340,
	height : 40,
	hintText : 'Password Again',
	borderColor : '#F49831',
	//this hides the letters
	passwordMask : true,
	//choosing a keyboard type
	keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
	//defining what the enter key does when clicked
	returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
	//defining the boarder styke
	borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
//adding it to the scrollview
scrollView.add(password2);
//name Text field for the user to enter information
var names = Titanium.UI.createTextField({
	color : '#336699',
	top : 160,
	left : 10,
	width : 340,
	height : 40,
	hintText : 'Name',
	borderColor : '#F49831',
	//choosing a keyboard type
	keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
	//defining what the enter key does when clicked
	returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
	//defining the boarder styke
	borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
//adding it to the scrollview
scrollView.add(names);
//Email textfield
var email = Titanium.UI.createTextField({
	color : '#336699',
	top : 210,
	left : 10,
	width : 340,
	height : 40,
	hintText : 'email',
	borderColor : '#F49831',
	//choosing a keyboard type
	keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
	//defining what the enter key does when clicked
	returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
	//defining the boarder styke
	borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
//add ot the scrollview
scrollView.add(email);

//register button
var registerBtn = Titanium.UI.createButton({
	title : 'Register',
	top : 260,
	width : 130,
	height : 35,
	borderRadius : 1,
	font : {
		fontFamily : 'Arial',
		fontWeight : 'bold',
		fontSize : 14
	}
});
//adding it to the scrollview
scrollView.add(registerBtn);
//creating a variable
var testresults;
//function to check if the email is the correct format
function checkemail(emailAddress) {
	//cretaing a veriable for email
	var str = emailAddress;
	//checking if the email meets this format: suleman@email.co.uk
	var filter = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	//if it does then set test result to true
	if (filter.test(str)) {
		testresults = true;
		//else, set it to false
	} else {
		testresults = false;
	}
	//returen testresult
	return (testresults);
};

//creating a HTTP link
var createReq = Titanium.Network.createHTTPClient();
// listening for the register button for a click event
registerBtn.addEventListener('click', function(e) {
	//checking if all fields are filled in
	if (username.value != '' && password1.value != '' && password2.value != '' && names.value != '' && email.value != '') {
		//checking if the 2 fields match and displaying messages accordingly
		if (password1.value != password2.value) {
			alert("Your passwords do not match");
		} else {
			//checking if the email meets the right format
			if (!checkemail(email.value)) {
				alert("Please enter a valid email");
			} else {
				registerBtn.enabled = false;
				registerBtn.opacity = 0.3;
				//if all the above, then connect to the php file using the http link
				createReq.open("POST", "http://www.doc.gold.ac.uk/~ma101ms/post_register.php");
				//send these paramaters in the link
				var params = {
					username : username.value,
					//encrypt the password field for security purposes
					password : Ti.Utils.md5HexDigest(password1.value),
					names : names.value,
					email : email.value
				};
				//sending the parameters
				createReq.send(params);
			}
		}
	} else {
		//error message if any of the above conditions not met
		alert("All fields are required");
	}
});

//retrieving informaion from the PHP file
createReq.onload = function() {
	//checking with the database if the user already exists
	if (this.responseText == "Insert failed" || this.responseText == "The username or email already exists") {
		registerBtn.enabled = true;
		registerBtn.opacity = 1;
		alert(this.responseText);
	} else {
		//if the user does not exist then add the user
		var alertDialog = Titanium.UI.createAlertDialog({
			title : 'Alert',
			message : this.responseText,
			buttonNames : ['OK']
		});
		alertDialog.show();
		//set the tab to login page
		alertDialog.addEventListener('click', function(e) {
			win.tabGroup.setActiveTab(0);
		});
	}
};

