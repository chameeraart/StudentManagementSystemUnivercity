$(document).ready(function () {
    $.noConflict();
    loadStudentTable();
    getNextStudentIndex();
});

function validateStudentForm() {
    var fullName = $('#fname').val();
    var nameWithInitials = $('#nameini').val();
    var dob = $('#Dob').val();
    var gender = $('#gender').val();
    var studentEmail = $('#sEmail').val();
    var address = $('#address').val();
    var guardianName = $('#guardian').val();
    var guardianEmail = $('#Email').val();
    var telephone = $('#Telephone').val();
    var comment = $('#comments').val();

    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(studentEmail)) {
        $('#sEmail').addClass('is-invalid');  // Add Bootstrap's invalid class
        // Show SweetAlert for invalid email
        swal("Validation Error", "Please enter a valid email address", "error");
        return;
    } else {
        $('#sEmail').removeClass('is-invalid');  // Remove invalid class if valid
        // Perform further actions (form submission, etc.)
        swal("Success", "Form submitted successfully!", "success");
    }

    if (!emailPattern.test(guardianEmail)) {
        $('#Email').addClass('is-invalid');  // Add Bootstrap's invalid class
        // Show SweetAlert for invalid email
        swal("Validation Error", "Please enter a valid email address", "error");
        return;
    } else {
        $('#Email').removeClass('is-invalid');  // Remove invalid class if valid
        // Perform further actions (form submission, etc.)
        swal("Success", "Form submitted successfully!", "success");
    }

    if (!fullName) {
        swal("Validation Error", "Full Name is required!", "error");
        return false;
    }
    if (!nameWithInitials) {
        swal("Validation Error", "Name with Initials is required!", "error");
        return false;
    }
    if (!dob) {
        swal("Validation Error", "Date of Birth is required!", "error");
        return false;
    }
    if (!gender) {
        swal("Validation Error", "Gender is required!", "error");
        return false;
    }
    if (!studentEmail) {
        swal("Validation Error", "Student Email is required!", "error");
        return false;
    }
    if (!address) {
        swal("Validation Error", "Address is required!", "error");
        return false;
    }
    if (!guardianName) {
        swal("Validation Error", "Guardian Name is required!", "error");
        return false;
    }
    if (!guardianEmail) {
        swal("Validation Error", "Guardian Email is required!", "error");
        return false;
    }
    if (!telephone) {
        swal("Validation Error", "Telephone is required!", "error");
        return false;
    }
    if (!comment) {
        swal("Validation Error", "Comment is required!", "error");
        return false;
    }

    return true;
}

function saveStudent() {
    if (!validateStudentForm()) {
        return; // Stop execution if validation fails
    }

    var url = "";
    var photo = "";
    var id = $('#studentId').val();
    var index = $('#index').val(); // Assuming ID is the Index Number
    var fullName = $('#fname').val();
    var nameWithInitials = $('#nameini').val();
    var dob = $('#Dob').val();
    var gender = $('#gender').val();
    var studentEmail = $('#sEmail').val();
    var address = $('#address').val();
    var guardianName = $('#guardian').val();
    var guardianEmail = $('#Email').val();
    var telephone = $('#Telephone').val();
    var isActive = $('#active').is(':checked');
    var comment = $('#comments').val();

    if (id === "0" || id === undefined) {
        
        photo = $('#file')[0].files[0];
    }
    else {
        photo = $('#imageSrc').attr('src');
    }
    var formData = new FormData();
    formData.append('id', id);
    formData.append('Index', index);
    formData.append('FullName', fullName);
    formData.append('NameWithInitials', nameWithInitials);
    formData.append('DateOfBirth', dob);
    formData.append('Gender', gender);
    formData.append('StudentEmail', studentEmail);
    formData.append('Address', address);
    formData.append('GuardianName', guardianName);
    formData.append('GuardianEmail', guardianEmail);
    formData.append('Telephone', telephone);
    formData.append('Comments', comment);
    formData.append('IsActive', isActive);
    formData.append('Photo', photo);
    

    if (id === undefined || id === null) {
        url = '/student/create'; // Insert URL
    } else if (id === "0") {
        url = '/student/create'; // Create URL for id 0
    } else {
        url = '/student/update'; // Update URL
    }


    
    $.ajax({
        url: url,
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            swal("Success", "Student details saved successfully!", "success");
            clearStudentForm();
            loadStudentTable(); // Refresh the table after saving
            getNextStudentIndex();
            location.reload();
        },
        error: function (err) {
            console.error('Error saving student:', err);
        }
    });
}

function loadStudentTable() {
    const studentid = sessionStorage.getItem("studentId");
    $.ajax({
        url: '/student/getallForuser/' + studentid,
        type: 'GET',
        success: function (response) {
            var tbody = $('#tbodyStudent');
            tbody.empty(); // Clear the table body
            response.forEach(function (student) {
                var row = `<tr>
                        <td hidden>${student.id}</td>
                        <td>${student.index}</td>
                        <td>${student.fullName}</td>
                        <td>${formatDate(student.dateOfBirth)}</td>
                        <td>${student.gender}</td>
                        <td>${student.studentEmail}</td>
                        <td>${student.telephone}</td>
                        <td>${student.isActive ? 'No' : 'Yes'}</td>
                        <td><button class="btn btn-warning" onclick="getStudent('${student.id}')">Edit</button></td>
                        <td><button class="btn btn-danger" onclick="deleteStudent('${student.id}')">Delete</button></td>
                    </tr>`;
                tbody.append(row);
            });

            // Initialize DataTables with export buttons
            if ($.fn.DataTable.isDataTable('#studentTable')) {
                $('#studentTable').DataTable().destroy();
            }

            $('#studentTable').DataTable({
                destroy: true,
                paging: true, // Enable pagination
                pageLength: 10, // Rows per page
                lengthMenu: [5, 10, 20, 50], // Options for number of rows per page
                searching: true, // Enable search
                dom: 'Bfrtip', // Include buttons
                buttons: [
                    {
                        extend: 'csvHtml5',
                        text: 'Export CSV',
                        className: 'btn btn-success',
                        exportOptions: {
                            columns: [1, 2, 3, 4, 5] // Select specific columns to export
                        }
                    },
                    {
                        extend: 'excelHtml5',
                        text: 'Export Excel',
                        className: 'btn btn-primary',
                        exportOptions: {
                            columns: [1, 2, 3, 4, 5] // Select specific columns to export
                        }
                    },
                    {
                        extend: 'pdfHtml5',
                        text: 'Export PDF',
                        className: 'btn btn-danger',
                        exportOptions: {
                            columns: [1, 2, 3, 4, 5] // Select specific columns to export
                        }
                    },
                    {
                        extend: 'print',
                        text: 'Print',
                        className: 'btn btn-info',
                        exportOptions: {
                            columns: [1, 2, 3, 4, 5] // Select specific columns to export
                        }
                    }
                ],
                language: {
                    search: "Search:",
                    paginate: {
                        previous: "Prev",
                        next: "Next"
                    }
                }
            });
        },
        error: function (err) {
            console.error('Error loading table:', err);
        }
    });
}


function getNextStudentIndex() {
    $.ajax({
        url: '/student/Getnext', // Adjust the URL to match your route
        type: 'GET',
        success: function (data) {
            $('#index').val(data.nextno);
        },
        error: function (xhr, status, error) {
            // Handle any errors here
            console.error("An error occurred: " + error);
        }
    });
}

function deleteStudent(studentId) {
    $.ajax({
        url: '/student/delete/' + studentId,
        type: 'DELETE',
        success: function (response) {
            swal("Success", "Student deleted successfully!", "success");
            loadStudentTable();
            clearStudentForm();
            location.reload();
        },
        error: function (err) {
            console.error('Error deleting student:', err);
        }
    });
}

function getStudent(studentId) {
    $.ajax({
        url: '/student/GetStudent/' + studentId, // Adjust the URL based on your API route
        type: 'GET',
        success: function (response) {
            // Populate the form fields with the retrieved student data
            $('#studentId').val(response.id);
            $('#index').val(response.index);
            $('#fname').val(response.fullName);
            $('#nameini').val(response.nameWithInitials);
            $('#Dob').val(new Date(response.dateOfBirth).toISOString().split('T')[0]);
            $('#gender').val(response.gender);
            $('#sEmail').val(response.studentEmail);
            $('#address').val(response.address);
            $('#guardian').val(response.guardianName);
            $('#Email').val(response.guardianEmail);
            $('#Telephone').val(response.telephone);
            $('#comments').val(response.comments);


            if (response.photoPath) {
              
                // Ensure the path is correctly formatted for the browser
                var imageUrl = response.photoPath;
                // Ensure the path starts with a slash if needed
                var newImageUrl = imageUrl.startsWith('/') ? imageUrl : '/' + imageUrl;

                // Update the image source and make sure the image is visible
                $('#imageSrc').attr('src', newImageUrl).show();
                } else {
                    $('#imageSrc').hide();
                }

            // Handle active status checkbox
            $('#active').prop('checked', response.isactive);
        },
        error: function (err) {
            console.error('Error fetching student:', err);
        }
    });
}


function clearStudentForm() {
    $('#studentId').val('');
    $('#index').val('');
    $('#fname').val('');
    $('#nameini').val('');
    $('#Dob').val('');
    $('#gender').val('');
    $('#sEmail').val('');
    $('#address').val('');
    $('#guardian').val('');
    $('#Email').val('');
    $('#Telephone').val('');
    $('#active').prop('checked', false);
    $('#file').val('');
    $('#comments').val('');
    $('#imageSrc').attr('src', '').hide();
}

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const image = $('#imageSrc');
            image.attr('src', e.target.result);
            image.show();
        }
        reader.readAsDataURL(file);
    }
}

function clearFile() {
    $('#file').val('');
    $('#imageSrc').attr('src', '').hide();
}
