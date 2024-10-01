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

function loadSubjectCourse() {
    $.ajax({
        url: '/StudentExam/GetExam',
        type: 'GET',
        success: function (response) {
            console.log('response', response);
            var tbody = $('#tbodyid');
            tbody.empty(); // Clear the table body

            // Assuming the array is inside a property called 'courses'
            var courses = response.courses;
            console.log('courses', courses)
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
        },
        error: function (err) {
            console.error('Error deleting assign course:', err);
        }
    });
}

function filterExams() {
    // Display a click alert for debugging


    // Get the selected values from the dropdowns
    var selectedCourse = $('#courseDropdown').val();
    var selectedStudent = $('#studentDropdown').val();

    // Check if both course and student are selected
    if (!selectedCourse || !selectedStudent) {
        alert('Please select both a course and a student.');
        return;
    }

    // Log the selected values for debugging
    console.log('Selected Course ID:', selectedCourse);
    console.log('Selected Student ID:', selectedStudent);


    $.ajax({
        url: '/StudentExam/GetExam',
        type: 'GET',
        success: function (response) {
            console.log('response', response);
            var tbody = $('#tbodyid');
            tbody.empty(); // Clear the table body

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
                            <td><button class="btn btn-primary" onclick="editStudentResult(${studentResult.id})">Edit</button></td>
                            <td><button class="btn btn-danger" onclick="deleteStudentResult(${studentResult.id})">Delete</button></td>
                        </tr>`;
                    tbody.append(row);
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
        alert('Please select both a course and a student.');
        return;
    }

    // Log the selected values for debugging
    console.log('Selected Course ID:', selectedCourse);
    console.log('Selected Student ID:', selectedStudent);


    $.ajax({
        url: '/StudentExam/SendEmail',
        type: 'GET',
        success: function (response) {
            console.log('response', response);
            var tbody = $('#tbodyid');
        },
        error: function (err) {
            console.error('Error loading table:', err);
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

    $('#filterbtn').on('click', function () {
        filterExams();
    });


    $('#sendEmailBtn').on('click', function () {
        SendExams();
    });

    $('#courseDropdown').change(function () {
        var courseId = $(this).val(); // Get the selected course ID
        if (courseId > 0) {
            $.ajax({
                url: '/AssignCourseStudent/get/' + courseId,
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
                            <td hidden>${course.student.id}</td>
                             <td>${course.student.fullName}</td>
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