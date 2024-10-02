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

function loadSubject() {
    $.ajax({
        url: '/subject/getall',
        type: 'GET',
        success: function (response) {
            var dropdown = $('#subjectDropdown');
            dropdown.empty();
            dropdown.append('<option value="" disabled selected>Select a Subject</option>');
            response.forEach(function (subject) {
                dropdown.append($('<option></option>').attr('value', subject.id).text(subject.name));
            });
        },
        error: function (err) {
            console.error('Error loading subjects:', err);
        }
    });
}

function loadSubjectCourse() {
    $.ajax({
        url: '/AssignCourseSubject/getall',
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
                            <td hidden>${course.subject.id}</td>
                            <td>${course.subject.name}</td>
                            <td>${course.isactive ? 'Yes' : 'No'}</td>
                            <td><button class="btn btn-danger" onclick="deleteassCourse(${course.id})">Delete</button></td>
                        </tr>`;
                    tbody.append(row);
                });

                // Initialize DataTables with export buttons
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
                    dom: 'Bfrtip', // Include export buttons
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
        url: '/AssignCourseSubject/delete/' + courseid,
        type: 'DELETE',
        success: function (response) {
            swal("Success", "Assign Course Subject deleted successfully!", "success");
            loadtogrid(); // Refresh the table after deleting
        },
        error: function (err) {
            console.error('Error deleting assign course:', err);
        }
    });
}

function saveData() {
    // Get form values
    var courseId = $('#courseDropdown').val();
    var subjectId = $('#subjectDropdown').val();
    var remark = $('#Remark').val();
    var isActive = $('#isActive').is(':checked');

    // Create an object with the form data
    var data = {
        courseid: courseId,
        subjectid: subjectId,
        Remark: remark,
        isactive: isActive
    };

    // Make an AJAX POST request to save the data
    $.ajax({
        url: '/AssignCourseSubject/create', // Update with your API endpoint
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (response) {
            swal("Success", "Assign Course Subject saved successfully!", "success");
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
    $('#subjectDropdown').val('');
    $('#isActive').prop('checked', true);
    $('#courseTable').DataTable().clear().draw();
}

// Initialize DataTable on document ready
$(document).ready(function () {
    $.noConflict();
    // Check if DataTable is already initialized and destroy it if necessary
    if ($.fn.DataTable.isDataTable('#courseTable')) {
        $('#courseTable').DataTable().destroy();
    }

    loadTable();
    loadSubject();



    $('#courseDropdown').change(function () {
        var courseId = $(this).val(); // Get the selected course ID
        if (courseId > 0) {
            $.ajax({
                url: '/AssignCourseSubject/get/' + courseId,
                type: 'GET',
                success: function (response) {
                    var tbody = $('#tbodyid');
                    tbody.empty(); // Clear the table body
                    response.forEach(function (course) {
                        var row = `<tr>
                        <td hidden>${course.id}</td>
                        <td>${course.course.name}</td>
                        <td hidden>${course.course.id}</td>
                        <td hidden>${course.subject.id}</td>
                        <td>${course.subject.name}</td>
                        <td>${course.isactive ? 'Yes' : 'No'}</td>
                        <td><button class="btn btn-danger" onclick="deleteassCourse(${course.id})">Delete</button></td>
                    </tr>`;
                        tbody.append(row);
                    });
                },
                error: function (err) {
                    console.error('Error fetching course details:', err);
                }
            });
        }
    });


});

// Delete a course row from the grid
function deleteCourse(button) {
    const table = $('#courseTable').DataTable();
    table.row($(button).closest('tr')).remove().draw(false);
}

function loadtogrid() {
    var courseId = $('#courseDropdown').val();
    if (courseId > 0) {
        $.ajax({
            url: '/AssignCourseSubject/get/' + courseId,
            type: 'GET',
            success: function (response) {
                var tbody = $('#tbodyid');
                tbody.empty(); // Clear the table body
                response.forEach(function (course) {
                    var row = `<tr>
                            <td hidden>${course.id}</td>
                            <td>${course.course.name}</td>
                            <td hidden>${course.course.id}</td>
                            <td hidden>${course.subject.id}</td>
                            <td>${course.subject.name}</td>
                            <td>${course.isactive ? 'Yes' : 'No'}</td>
                            <td><button class="btn btn-danger" onclick="deleteassCourse(${course.id})">Delete</button></td>
                        </tr>`;
                    tbody.append(row);
                });

                $('#courseTable').DataTable({
                    destroy: true,
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
                    }
                });
            },
            error: function (err) {
                console.error('Error fetching course details:', err);
            }
        });
    }
}