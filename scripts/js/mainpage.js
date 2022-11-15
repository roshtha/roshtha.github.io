var personsubmit = document.getElementById("submit");
personsubmit.addEventListener("click", displayDetails);  //calling displayDetails fn

var row = 1;

function displayDetails() {
	var name = document.getElementById("name").value;
	var age = document.getElementById("yearinput").value;
	var gender = document.getElementById("sex").value;
	var phone = document.getElementById("mobile").value;
	var address = document.getElementById("district").value;
	
	//if one of the inputs(name, age, gender, phone, address) are not filled 
	if(!name || !age || !gender || !phone || !address) {
		console.log("must fillup the boxes");
		alert("Please fill all the boxes.");
		return;
	}
	
	var display_person = document.getElementById("display_person");
	
	var newRow = display.insertRow(row);
	var cell1 = newRow.insertCell(0);
	var cell2 = newRow.insertCell(1);
	var cell3 = newRow.insertCell(2);
	var cell4 = newRow.insertCell(3);
	var cell5 = newRow.insertCell(4);
	
	cell1.innerHTML = name;
	cell2.innerHTML = age;
	cell3.innerHTML = gender;
	cell4.innerHTML = phone;
	cell5.innerHTML = address;
	
	row++;
}


