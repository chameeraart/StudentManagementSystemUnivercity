$(document).ready(function () {
    $.noConflict();

    // Check if DataTable is already initialized and destroy it if necessary
    if ($.fn.DataTable.isDataTable('#courseTable')) {
        $('#courseTable').DataTable().destroy();
    }
    loadTable();
});

function saveCourse() {
    var id = $('#subjectId').val();
    var courseName = $('#courseName').val();
    var isActive = $('#isActive').is(':checked');

    var course = {
        id: id,
        name: courseName,
        isactive: isActive
    };

    if (courseName === "") {
        swal("Warning", "Course name cannot be empty.", "Warning");
        return false; // Prevent saving
    }

    // Check if the course name already exists in the table
    var isDuplicate = false;
    $('#courseTable tbody tr').each(function () {
        var existingCourseName = $(this).find('td').eq(1).text().trim(); // Get the text from the second column (Course Name)
        if (courseName.toLowerCase() === existingCourseName.toLowerCase()) {
            isDuplicate = true;
            return false; // Break the loop
        }
    });

    if (isDuplicate) {
        swal("Warning", "Course name already exists.!", "Warning");
        return false; // Prevent saving
    }

    var url = '/course/create'; // Adjust URL as needed

    $.ajax({
        url: url,
        type: "POST",
        contentType: 'application/json',
        data: JSON.stringify(course),
        success: function (response) {
            swal("Success", "Course saved successfully!", "success");
            clearCourse();
            loadTable(); // Refresh the table after saving
            location.reload();
        },
        error: function (err) {
            console.error('Error saving course:', err);
        }
    });
}

function loadTable() {
    $.ajax({
        url: '/course/getall',
        type: 'GET',
        success: function (response) {
            var tbody = $('#tbodyid');
            tbody.empty(); // Clear the table body
            response.forEach(function (course) {
                var row = `<tr>
                    <td hidden>${course.id}</td>
                    <td>${course.name}</td>
                    <td>${course.isactive ? 'Yes' : 'No'}</td>
                    <td><button class="btn btn-warning" onclick="getCourse(${course.id})">Edit</button></td>
                    <td><button class="btn btn-danger" onclick="deleteCourse(${course.id})">Delete</button></td>
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
        },
        error: function (err) {
            console.error('Error loading table:', err);
        }
    });
}


function getCourse(courseId) {
    $.ajax({
        url: '/course/get/' + courseId,
        type: 'GET',
        success: function (response) {
            $('#subjectId').val(response.id);
            $('#courseName').val(response.name);
            $('#isActive').prop('checked', response.isactive);
        },
        error: function (err) {
            console.error('Error fetching course:', err);
        }
    });
}

function deleteCourse(courseId) {
    $.ajax({
        url: '/course/delete/' + courseId,
        type: 'DELETE',
        success: function (response) {
            swal("Success", "Course deleted successfully!", "success");
            loadTable(); // Refresh the table after deleting
            location.reload();
        },
        error: function (err) {
            console.error('Error deleting course:', err);
        }
    });
}


function clearCourse() {
    $('#subjectId').val('0');
    $('#courseName').val('');
    $('#isActive').prop('checked', true);
}
