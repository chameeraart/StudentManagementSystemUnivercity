$(document).ready(function () {
 /*   loadStudentTable();*/
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

    return true;
}

function saveStudent() {
    if (!validateStudentForm()) {
        return; // Stop execution if validation fails
    }

    var id = $('#index').val(); // Assuming ID is the Index Number
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
    var photo = $('#file')[0].files[0];
    var comment = $('#comments').val();

    var formData = new FormData();
    formData.append('Index', id);
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
    if (photo) {
        formData.append('Photo', photo);
    }

    var url = id ? '/student/update' : '/student/create'; // Adjust URL as needed
    console.log('formData', formData)
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
        },
        error: function (err) {
            console.error('Error saving student:', err);
        }
    });
}

function loadStudentTable() {
    $.ajax({
        url: '/student/getall',
        type: 'GET',
        success: function (response) {
            var tbody = $('#tbodyStudent');
            tbody.empty(); // Clear the table body
            response.forEach(function (student) {
                var row = `<tr>
                    <td hidden>${student.index}</td>
                    <td>${student.fullName}</td>
                    <td>${student.nameWithInitials}</td>
                    <td>${formatDate(student.dateOfBirth)}</td>
                    <td>${student.gender}</td>
                    <td>${student.studentEmail}</td>
                    <td>${student.address}</td>
                    <td>${student.guardianName}</td>
                    <td>${student.guardianEmail}</td>
                    <td>${student.telephone}</td>
                    <td>${student.isActive ? 'Yes' : 'No'}</td>
                    <td><button class="btn btn-warning" onclick="getStudent('${student.index}')">Edit</button></td>
                    <td><button class="btn btn-danger" onclick="deleteStudent('${student.index}')">Delete</button></td>
                </tr>`;
                tbody.append(row);
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
            loadStudentTable(); // Refresh the table after deleting
            clearStudentForm();
        },
        error: function (err) {
            console.error('Error deleting student:', err);
        }
    });
}

function clearStudentForm() {
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
