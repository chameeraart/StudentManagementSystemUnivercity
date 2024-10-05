// Save all courses to the server
function loadTable() {
    $.ajax({
        url: '/course/getall',
        type: 'GET',
        success: function (response) {
            var dropdown = $('#courseDropdown');
            dropdown.empty();
            dropdown.append('<option value="" disabled selected>Select a Course</option>');
            response.forEach(function (course) {
                dropdown.append($('<option></option>').attr('value', course.id).text(course.name));
            });
        },
        error: function (err) {
            console.error('Error loading courses:', err);
        }
    });
}

function loadStudent() {
    const studentid = sessionStorage.getItem("studentId");

    $.ajax({
        url: '/student/getallForuser/' + studentid,
        type: 'GET',
        success: function (response) {
            var dropdown = $('#studentDropdown');
            dropdown.empty();
            dropdown.append('<option value="" disabled selected>Select a Student</option>');
            response.forEach(function (student) {
                dropdown.append($('<option></option>').attr('value', student.id).text(student.fullName));
            });
        },
        error: function (err) {
            console.error('Error loading students:', err);
        }
    });
}

function loadSubjectCourse() {
    $.ajax({
        url: '/StudentExam/GetExam',
        type: 'GET',
        success: function (response) {
            var tbody = $('#tbodyid');
            tbody.empty(); // Clear the table body

            // Assuming the array is inside a property called 'courses'
            var courses = response.courses;
            if (Array.isArray(courses)) {
                courses.forEach(function (course) {
                    var row = `<tr>
                                <td hidden>${course.id}</td>
                                <td>${course.course.name}</td>
                                <td hidden>${course.course.id}</td>
                                <td hidden>${course.student.id}</td>
                                <td>${course.isactive ? 'Yes' : 'No'}</td>
                                <td><button class="btn btn-danger" onclick="deleteassCourse(${course.id})">Delete</button></td>
                            </tr>`;
                    tbody.append(row);
                });
            } else {
                console.error('Expected an array but got:', courses);
            }
        },
        error: function (err) {
            console.error('Error loading table:', err);
        }
    });
}

function deleteassCourse(courseid) {
    $.ajax({
        url: '/AssignCourseStudent/delete/' + courseid,
        type: 'DELETE',
        success: function (response) {
            swal("Success", "Assign Course Subject deleted successfully!", "success");
            loadSubjectCourse(); // Refresh the table after deleting
            location.reload();
        },
        error: function (err) {
            console.error('Error deleting assign course:', err);
        }
    });
}

function filterExams() {
    // Get the selected values from the dropdowns
    var selectedCourse = $('#courseDropdown').val();
    var selectedStudent = $('#studentDropdown').val();

    // Check if both course and student are selected
    if (!selectedCourse || !selectedStudent) {
        swal("Validation Error", "Please select both a course and a student!", "error");
        return;
    }

    var studentExam = {
        studentId: selectedStudent,
        courseId: selectedCourse
    };

    $.ajax({
        url: '/StudentExam/GetExam',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(studentExam),
        success: function (response) {
            var tbody = $('#tbodyid');
            tbody.empty(); // Clear the table body

            console.log('response', response);

            // Assuming the response is a list of StudentResult objects
            if (Array.isArray(response)) {

                response.forEach(function (studentResult) {
                    var row = `<tr>
                            <td hidden>${studentResult.studentId}</td>
                            <td hidden>${studentResult.examId}</td>
                            <td hidden>${studentResult.courseId}</td>
                            <td>${studentResult.studentName}</td>
                            <td>${studentResult.examName}</td>
                            <td>${studentResult.courseName}</td>
                            <td>${studentResult.grade}</td>
                            <td>${studentResult.marks}</td>
                        </tr>`;
                    tbody.append(row);
                });

                // Destroy and re-initialize the DataTable outside the loop
                if ($.fn.DataTable.isDataTable('#marksTable')) {
                    $('#marksTable').DataTable().destroy();
                }

                $('#marksTable').DataTable({
                    searching: true, // Enable search functionality
                    paging: true, // Enable pagination
                    pageLength: 10, // Number of rows per page
                    lengthMenu: [5, 10, 20, 50], // Options for rows per page
                    info: true, // Show table information
                    language: {
                        search: "Search records:", // Custom search placeholder
                        paginate: {
                            previous: "Prev",
                            next: "Next"
                        }
                    },
                    dom: 'Bfrtip', // Include export buttons
                    buttons: [
                        {
                            extend: 'csvHtml5',
                            text: 'Export CSV',
                            titleAttr: 'CSV',
                            className: 'btn btn-success'
                        },
                        {
                            extend: 'excelHtml5',
                            text: 'Export Excel',
                            titleAttr: 'Excel',
                            className: 'btn btn-primary'
                        },
                        {
                            extend: 'pdfHtml5',
                            text: 'Export PDF',
                            titleAttr: 'PDF',
                            className: 'btn btn-danger'
                        },
                        {
                            extend: 'print',
                            text: 'Print',
                            titleAttr: 'Print',
                            className: 'btn btn-info'
                        }
                    ]
                });

            } else {
                console.error('Expected an array but got:', response);
            }
        },
        error: function (err) {
            console.error('Error loading table:', err);
        }
    });
}



function SendExams() {
    // Display a click alert for debugging


    // Get the selected values from the dropdowns
    var selectedCourse = $('#courseDropdown').val();
    var selectedStudent = $('#studentDropdown').val();

    // Check if both course and student are selected
    if (!selectedCourse || !selectedStudent) {
        swal("Validation Error", "Please select both a course and a student.", "error");
        return;
    }

    var studentExam = {
        studentId: selectedStudent,
        courseId: selectedCourse
    };

    $.ajax({
        url: '/StudentExam/SendEmail',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(studentExam),
        success: function (response) {
            // Assuming the response indicates success
            swal("Success", "Email sent successfully!", "success");

        },
        error: function (err) {
            // Check if the error is related to validation (e.g., missing course or student)
            if (err.status === 400) { // Assuming 400 indicates a validation error from the server
                swal("Validation Error", "Please select both a course and a student!", "error");
            } else {
                // For other errors, display a general error message
                swal("Error", "There was an error sending the email. Please try again later.", "error");
            }

            console.error('Error sending email:', err);
        }
    });



}


function saveData() {
    // Get form values
    var courseId = $('#courseDropdown').val();
    var studentId = $('#studentDropdown').val();
    var remark = $('#Remark').val();
    var isActive = $('#isActive').is(':checked');

    // Create an object with the form data
    var data = {
        courseid: courseId,
        studentid: studentId,
        Remark: remark,
        isactive: isActive
    };

    // Make an AJAX POST request to save the data
    $.ajax({
        url: '/AssignCourseStudent/create', // Update with your API endpoint
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (response) {
            swal("Success", "Assign Course Subject saved successfully!", "success");
            loadSubjectCourse(); // Refresh the table after saving
            location.reload();
        },
        error: function (err) {
            console.error('Error saving data:', err);
            alert('Error saving data. Please try again.');
        }
    });
}

// Clear the form and grid
function clearForm() {
    $('#courseDropdown').val('');
    $('#studentDropdown').val('');
    $('#isActive').prop('checked', true);
    $('#marksTable').DataTable().clear().draw();
}

// Initialize DataTable on document ready
$(document).ready(function () {
    $.noConflict();


    // Check if DataTable is already initialized and destroy it if necessary
    if ($.fn.DataTable.isDataTable('#marksTable')) {
        $('#marksTable').DataTable().destroy();
    }

    loadTable();
    loadStudent();
    loadSubjectCourse();
    ;



    $('#filterbtn').on('click', function () {
        filterExams();
    });


    $('#sendEmailBtn').on('click', function () {
        SendExams();
    });
});