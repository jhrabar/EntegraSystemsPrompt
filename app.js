const cardInfo = require('./cardInfo');




//this is a tester function
//it is in a separate file to reduce clutter
//and improve readability
function main(){


	//Each line of input must be separated by a \n, so keep that in mind when adding test cases
	let testString1 = "Entegra Systems\nJohn Doe\nSenior Software Engineer\n(410)555-1234\njohn.doe@entegrasystems.com";
	let testString2 = "Acme Technologies\nAnalytic Developer\nJane Doe\n1234 Roadrunner Way\nColumbia, MD 12345\nPhone: 410-555- 1234\nFax: 410-555- 4321\nJane.doe@acmetech.com";
	let testString3 = "Bob Smith\nSoftware Engineer\nDecision &amp; Security Technologies\nABC Technologies\n123 North 11th Street\nSuite 229\nArlington, VA 22209\nTel: +1 (703) 555-1259\nFax: +1 (703) 555-1200\nbsmith@abctech.com";


	//runs the business card parser function on each test case
	//to get an object of type cardInfo
	let cardInfo1 = cardInfo.BusinessCardParser(testString1);

	//Their information is logged using the getAll function
	console.log("Test Case 1:\n");
	console.log(cardInfo1.getAll());

	let cardInfo2 = cardInfo.BusinessCardParser(testString2);

	console.log("\nTest Case 2:\n");
	console.log(cardInfo2.getAll());

	let cardInfo3 = cardInfo.BusinessCardParser(testString3);

	console.log("\nTest Case 3:\n");
	console.log(cardInfo3.getAll());


}







main();