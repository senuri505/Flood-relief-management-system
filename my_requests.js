// Show request details inside modal popup
function viewRequest(type,district,ds,gn,name,phone,address,members,severity,description){
    
    // Open the modal
    document.getElementById("viewModal").style.display="block";

    // Insert dynamic data into modal content
    document.getElementById("viewContent").innerHTML=`
        <p><b>Relief Type:</b> ${type}</p>
        <p><b>District:</b> ${district}</p>
        <p><b>DS Division:</b> ${ds}</p>
        <p><b>GN Division:</b> ${gn}</p>
        <p><b>Contact Name:</b> ${name}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Address:</b> ${address}</p>
        <p><b>Family Members:</b> ${members}</p>
        <p><b>Severity:</b> ${severity}</p>
        <p><b>Description:</b> ${description}</p>
    `;
}


//  CLOSE VIEW MODAL 
// Hide the view modal popup
function closeViewModal(){
    document.getElementById("viewModal").style.display="none";
}


//  OPEN UPDATE MODAL 
// Open update form and fill existing data
function openUpdateModal(id,type,district,ds,gn,name,phone,address,members,severity,description){
    
    // Show update modal
    document.getElementById("updateModal").style.display="block";

    // Create and insert update form with pre-filled values
    document.querySelector("#updateModal .modal-content").innerHTML=`
        
        <!-- Close button -->
        <span class="close" onclick="closeUpdateModal()">&times;</span>

        <h2>Update Relief Request</h2>

        <!-- Form to send updated data -->
        <form action="update_request.php" method="POST">

            <!-- Hidden ID field -->
            <input type="hidden" name="id" value="${id}">

            <!-- Relief Type Dropdown -->
            <label>Relief Type</label>
            <select name="relief_type" required>
                <option ${type=="Food"?"selected":""}>Food</option>
                <option ${type=="Water"?"selected":""}>Water</option>
                <option ${type=="Medicine"?"selected":""}>Medicine</option>
                <option ${type=="Shelter"?"selected":""}>Shelter</option>
            </select>

            <!-- District -->
            <label>District</label>
            <input type="text" name="district" value="${district}" required>

            <!-- DS Division -->
            <label>DS Division</label>
            <input type="text" name="ds_division" value="${ds}" required>

            <!-- GN Division -->
            <label>GN Division</label>
            <input type="text" name="gn_division" value="${gn}" required>

            <!-- Contact Name -->
            <label>Contact Name</label>
            <input type="text" name="contact_name" value="${name}" required>

            <!-- Phone Number -->
            <label>Contact Number</label>
            <input type="tel" name="contact_number" value="${phone}" required>

            <!-- Address -->
            <label>Address</label>
            <textarea name="address" rows="3" required>${address}</textarea>

            <!-- Family Members -->
            <label>Number of Family Members</label>
            <input type="number" name="family_members" min="1" value="${members}" required>

            <!-- Severity Level -->
            <label>Severity</label>
            <select name="severity" required>
                <option ${severity=="Low"?"selected":""}>Low</option>
                <option ${severity=="Medium"?"selected":""}>Medium</option>
                <option ${severity=="High"?"selected":""}>High</option>
            </select>

            <!-- Description -->
            <label>Description / Special Needs</label>
            <textarea name="description" rows="4" required>${description}</textarea>

            <!-- Submit button -->
            <button type="submit">Update Request</button>
        </form>
    `;
}


//  CLOSE UPDATE MODAL 
// Hide update modal
function closeUpdateModal(){
    document.getElementById("updateModal").style.display="none";
}


//  DELETE REQUEST 
// Ask confirmation and delete request
function deleteRequest(id){
    
    // Confirm before deleting
    if(confirm("Are you sure you want to delete this request?")){
        
        // Redirect to delete PHP file with ID
        window.location="delete_request.php?id="+id;
    }
}