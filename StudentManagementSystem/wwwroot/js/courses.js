$(document).ready(function () {
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

    console.log(course, 'course');
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
