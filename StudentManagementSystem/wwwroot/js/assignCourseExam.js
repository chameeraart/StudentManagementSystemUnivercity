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

function loadExam() {
    $.ajax({
        url: '/exam/getall',
        type: 'GET',
        success: function (response) {
            var dropdown = $('#examDropdown');
            dropdown.empty();
            dropdown.append('<option value="" disabled selected>Select a Exam</option>');
            response.forEach(function (exam) {
                dropdown.append($('<option></option>').attr('value', exam.id).text(exam.ExamName));
            });
        },
        error: function (err) {
            console.error('Error loading students:', err);
        }
    });
}

function loadSubjectCourse() {
    $.ajax({
        url: '/AssignCourseExam/getall',
        type: 'GET',
        success: function (response) {
            console.log('response', response);
            var tbody = $('#tbodyid');
            tbody.empty(); // Clear the table body

            // Assuming the array is inside a property called 'courses'
            var courseExams = response.courses;
            console.log('courses', courseExams)
            if (Array.isArray(courseExams)) {
                courses.forEach(function (courseExams) {
                    var row = `<tr>
                                    <td hidden>${courseExams.id}</td>
                                    <td>${course.courseExams.name}</td>
                                    <td hidden>${courseExams.course.id}</td>
                                    <td hidden>${courseExams.exam.id}</td>
                                    <td>${courseExams.isactive ? 'Yes' : 'No'}</td>
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
        url: '/AssignCourseExam/delete/' + courseid,
        type: 'DELETE',
        success: function (response) {
            swal("Success", "Assign Course Subject deleted successfully!", "success");
            loadSubjectCourse(); // Refresh the table after deleting
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
        url: '/AssignCourseExam/create', // Update with your API endpoint
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (response) {
            swal("Success", "Assign Course Subject saved successfully!", "success");
            loadSubjectCourse(); // Refresh the table after saving
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

    $('#courseTable').DataTable({
        paging: false, // Disable pagination
        searching: false, // Keep search functionality
        ordering: true, // Keep sorting functionality
        info: false // Optionally, hide the table information
    });

    loadTable();
    loadStudent();
    loadSubjectCourse();
    ;

    $('#courseDropdown').change(function () {
        var courseId = $(this).val(); // Get the selected course ID
        if (courseId > 0) {
            $.ajax({
                url: '/AssignCourseExam/get/' + courseId,
                type: 'GET',
                success: function (response) {
                    console.log('response', response);
                    var tbody = $('#tbodyid');
                    tbody.empty(); // Clear the table body
                    response.forEach(function (course) {
                        var row = `<tr>
                            <td hidden>${course.id}</td>
                            <td>${course.course.name}</td>
                            <td hidden>${course.course.id}</td>
                            <td hidden>${course.exam.id}</td>
                             <td>${course.student.examName}</td>
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