

function validateForm() {

    // Get values from the form fields and remove extra spaces
    const  type = document.getElementById("reliefType").value.trim();
    const  district = document.getElementById("district").value.trim();
    const  ds = document.getElementById("dsDivision").value.trim();
    const  gn = document.getElementById("gnDivision").value.trim();
    const  name = document.getElementById("contactName").value.trim();
    const  phone = document.getElementById("contactNumber").value.trim();
    const  address = document.getElementById("address").value.trim();
    const  members = document.getElementById("familyMembers").value.trim();
    const  description = document.getElementById("description").value.trim();

    // Get the selected radio button for severity
    const  severity = document.querySelector('input[name="severity_level"]:checked');

    // Check if any required field is empty or no severity is selected
    if(!type || !district || !ds || !gn || !name || !phone || !address || !members || !description || !severity){
         // If all fields are filled
        alert("Please fill all required fields.");
        return false;
    }



    alert("Form validated successfully!");
    return true; // allow submission
}