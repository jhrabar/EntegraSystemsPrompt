let fs = require('fs');




//This class holds the business card's info.
//When you create an instance of this class, you can get all of the required info by using
//the Object.getAll() function,
//or individual pieces by using Object.name,
//Object.phone, or Object.email

class cardInfo {
	constructor(name, phone, email){
		this.name = name;
		this.phone = phone;
		this.email = email;
	}

	getAll(){
		return `Name: ${this.name}\nPhone: ${this.phone}\nEmail: ${this.email}`;
	}
}



//This function parses the business card.
function BusinessCardParser(doc) {
	let name = "";
	let phone = "";
	let email = "";

	//I stored a list of the 5000 or so most popular first names in the US
	//in a text file called firstNames.txt, and a list of the 1000 most popular last names
	//in a text file called lastNames.txt
	//These names were gathered by the US census in 2000
	//Although it will not work for every name at this point, more names can be added if needed
	let firstNames = fs.readFileSync('firstNames.txt', 'utf8');
	let lastNames = fs.readFileSync('lastNames.txt', 'utf8');
	let docArray = doc.split("\n");

	//the input is split by line
	for(let i = 0; i < docArray.length; i++){

		//if a name has been found, do not try to find another one
		//do the same for the phone number and email
		if(name == ""){
			name = checkForName(docArray[i], firstNames, lastNames);
		}
		if(phone == ""){
			phone = checkForPhone(docArray[i]);
		}
		if(email == ""){
			email = checkForEmail(docArray[i]);
		}
	}

	//If no name, phone, or email can be found, this inputs a placeholder for that field
	if(name == ""){
		name = "No Name Found";
	}
	if(phone == ""){
		phone = "No Phone Number Found";
	}
	if(email == ""){
		email = "No Email Address Found";
	}

	//returns an object of the cardInfo class with the necessary information
	return new cardInfo(name, phone, email);


}

//This function checks a line of input for a name
function checkForName(text, first, last){

	//converts the string to lower case and converts hyphens into spaces
	//this is so a person with multiple last names can be recognized
	let lowerText = text.toLowerCase();
	lowerText = lowerText.replace(/-/g, ' ');

	//split the text into an array of words
	let textArray = lowerText.split(" ");
	for(let i = 0; i < textArray.length; i++){

		//check both text files for each word. Exit if the word is not found in either file
		if(!((first.indexOf(textArray[i]) > -1) || (last.indexOf(textArray[i]) > -1))){
			return "";
		}
	}
	return text;
}


//This function checks a line of input for a phone number
function checkForPhone(text){
	text = text.toLowerCase();

	//A fax number will look the same as a phone number, but we do not want them
	if(text.indexOf("fax") > -1){
		return "";
	}
	for(let i = 0; i < text.length; i++){

		//remove everything from the string except for numbers
		if(!(text[i] <= '9' && text[i] >= '0')){
			text = text.slice(0,i) + text.slice(i + 1);
			i--;
		}

	}

	//if the string is at least 10 numbers long, it is very likely a phone number
	//this also accounts for country codes, as some are up to 4 digits long
	if(text.length >= 10){
		return text;
	}
	return "";
}

//this function checks a line of input for an email address
function checkForEmail(text){

	//email addresses are in this format,
	//so a regular expression is used to verify them
	let regExp = /[a-z0-9!#$%&'*+-/=?^_`{|}~]+@[a-z]+.[a-z]+/;
	if(regExp.test(text) == true){
		return text;
	}
	return "";

}

module.exports = {
	cardInfo,
	checkForEmail,
	checkForPhone,
	checkForName,
	BusinessCardParser
};

