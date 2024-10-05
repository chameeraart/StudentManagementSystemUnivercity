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
    $.ajax({
        url: '/student/getall',
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


function loadCourseStudent() {
    $.ajax({
        url: '/AssignCourseStudent/getCourseStudent',
        type: 'GET',
        success: function (response) {
            var tbody = $('#tbodyid');
            tbody.empty(); // Clear the table body
            console.log("response", response);

            // It looks like the response is directly an array, not inside a property called 'courses'
            if (Array.isArray(response)) {
                response.forEach(function (course) {
                    console.log('course', course);
                    var row = `<tr>
                                <td hidden>${course.id}</td>
                                <td>${course.course.name}</td>
                                <td>${course.student.fullName}</td>
                                <td>${course.isactive ? 'Yes' : 'No'}</td>
                                <td><button class="btn btn-danger" onclick="deleteassCourse(${course.id})">Delete</button></td>
                            </tr>`;
                    tbody.append(row);
                });

                // Initialize DataTables after all rows have been appended
                if ($.fn.DataTable.isDataTable('#courseTable')) {
                    $('#courseTable').DataTable().destroy();
                }

                $('#courseTable').DataTable({
                    destroy: true,
                    searching: true, // Enable search functionality
                    paging: true, // Enable pagination
                    pageLength: 10, // Number of rows per page
                    lengthMenu: [5, 10, 20, 50], // Options for rows per page
                    info: true, // Show table information
                    dom: 'Bfrtip', // Include buttons for exporting
                    buttons: [
                        {
                            extend: 'csvHtml5',
                            text: 'Export CSV',
                            className: 'btn btn-success'
                        },
                        {
                            extend: 'excelHtml5',
                            text: 'Export Excel',
                            className: 'btn btn-primary'
                        },
                        {
                            extend: 'pdfHtml5',
                            text: 'Export PDF',
                            className: 'btn btn-danger'
                        },
                        {
                            extend: 'print',
                            text: 'Print',
                            className: 'btn btn-info'
                        }
                    ],
                    language: {
                        search: "Search records:", // Custom search placeholder
                        paginate: {
                            previous: "Prev",
                            next: "Next"
                        }
                    }
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



function deleteassCourse(courseid) {
    $.ajax({
        url: '/AssignCourseStudent/delete/' + courseid,
        type: 'DELETE',
        success: function (response) {
            swal("Success", "Assign Course Subject deleted successfully!", "success");
            loadCourseStudent(); // Refresh the table after deleting
            location.reload();
        },
        error: function (err) {
            console.error('Error deleting assign course:', err);
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
            loadCourseStudent(); // Refresh the table after saving
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
    $('#courseTable').DataTable().clear().draw();
}

// Initialize DataTable on document ready
$(document).ready(function () {
    $.noConflict();

    if ($.fn.DataTable.isDataTable('#courseTable')) {
        $('#courseTable').DataTable().destroy();
    }

    loadTable();
    loadStudent();
    loadCourseStudent();


});