$(document).ready(function () {

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
        language: {
            search: "Search records:", // Custom search placeholder
            paginate: {
                previous: "Prev",
                next: "Next"
            }
        }
    });v
});
function addCourseToGrid() {
    const courseName = $('#courseDropdown').val();
    const instructor = $('#otherDropdown').val();
    const isActive = $('#isActive').is(':checked') ? 'Yes' : 'No';

    $('#courseTable').DataTable().row.add([
        0, // Assuming Subject ID is 0 for now, adjust accordingly if needed
        courseName,
        instructor,
        isActive,
        '<button class="btn btn-sm btn-primary" onclick="editCourse()">Edit</button>',
        '<button class="btn btn-sm btn-danger" onclick="deleteCourse()">Delete</button>'
    ]).draw(false);
}

function loadCourseSubject() {
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
        },
        error: function (err) {
            console.error('Error loading table:', err);
        }
    });
}

// Save all courses to the server
function saveCourses() {
    const subjectName = $('#subjectName').val();
    const courses = [];

    $('#courseTable tbody tr').each(function () {
        const courseName = $(this).find('td').eq(1).text();
        const instructor = $(this).find('td').eq(2).text();
        const isActive = $(this).find('td').eq(3).text() === 'Yes';

        courses.push({ courseName, instructor, isActive });
    });

    // Example POST request to save subject with multiple courses
    $.ajax({
        url: '/api/subjects/add-multiple-courses',
        method: 'POST',
        data: {
            subjectName: subjectName,
            courses: courses
        },
        success: function (response) {
            alert('Courses saved successfully!');
            clearForm();
        }
    });
}

// Clear the form and grid
function clearForm() {
    $('#subjectName').val('');
    $('#courseDropdown').val('');
    $('#otherDropdown').val('');
    $('#isActive').prop('checked', true);
    $('#courseTable').DataTable().clear().draw();
}

// Initialize DataTable
$(document).ready(function () {
    $('#courseTable').DataTable();
});
