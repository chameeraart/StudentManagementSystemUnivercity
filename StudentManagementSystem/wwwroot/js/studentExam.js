﻿function loadExams() {
    $.ajax({
        url: '/Exam/getall',
        type: 'GET',
        success: function (response) {
            var dropdown = $('#examDropdown');
            dropdown.empty();
            dropdown.append('<option value="" disabled selected>Select an Exam</option>');
            response.forEach(function (exam) {
                dropdown.append($('<option></option>').attr('value', exam.id).text(exam.examName));
            });
        },
        error: function (err) {
            console.error('Error loading exams:', err);
        }
    });
}
function loadCourse() {
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
function loadStudents() {
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

function loadExamMarks() {
    $.ajax({
        url: '/StudentExam/getall',
        type: 'GET',
        success: function (response) {
            var tbody = $('#tbodyid');
            tbody.empty(); // Clear the table body

            if (Array.isArray(response)) {
                response.forEach(function (examMark) {
                    var row = `<tr>
                                        <td hidden>${examMark.id}</td>
                                        <td>${examMark.exam.examName}</td>
                                        <td>${examMark.course.name}</td>
                                        <td hidden>${examMark.exam.id}</td>
                                        <td hidden>${examMark.student.id}</td>
                                         <td>${examMark.course.id}</td>
                                        <td>${examMark.mark}</td>
                                        <td>${examMark.isactive ? 'Yes' : 'No'}</td>
                                         <td><button class="btn btn-danger" onclick="getExam(${examMark.id})">Edit</button></td>
                                        <td><button class="btn btn-danger" onclick="deleteExamMark(${examMark.id})">Delete</button></td>
                                    </tr>`;
                    tbody.append(row);
                });
            } else {
                console.error('Expected an array but got:', response);
            }
        },
        error: function (err) {
            console.error('Error loading marks table:', err);
        }
    });
}
function getExam(courseId) {
    $.ajax({
        url: '/StudentExam/get/' + courseId,
        type: 'GET',
        success: function (response) {
            // Populate form fields with the response data
            $('#id').val(response.id);  // Assuming the ID is stored here
            $('#examDropdown').val(response.exam.id);  // Set the exam dropdown value
            $('#studentDropdown').val(response.student.id);  // Set the student dropdown value
            $('#courseDropdown').val(response.course.id);  // Set the student dropdown value
            $('#Marks').val(response.mark);  // Set the marks field
            $('#isActive').prop('checked', response.isactive);  // Set active checkbox
        },
        error: function (err) {
            console.error('Error fetching exam data:', err);
        }
    });
}

function deleteExamMark(markId) {
    $.ajax({
        url: '/StudentExam/delete/' + markId,
        type: 'DELETE',
        success: function (response) {
            swal("Success", "Exam mark deleted successfully!", "success");
            loadExamMarks();
        },
        error: function (err) {
            console.error('Error deleting exam mark:', err);
        }
    });
}

function saveData() {
    var examId = $('#examDropdown').val();
    var studentId = $('#studentDropdown').val();
    var courseId = $('#courseDropdown').val();
    var marks = $('#Marks').val();
    var isActive = $('#isActive').is(':checked');
    var id = $('#id').val();
    var data = {
        id: id,
        examid: examId,
        studentid: studentId,
        courseid: courseId,
        mark: marks,
        isactive: isActive
    };
    // Validate that exam, student, and marks are selected or entered
    if (!examId) {
        swal("Error", "Please select an exam.", "error");
        return;
    }

    if (!studentId) {
        swal("Error", "Please select a student.", "error");
        return;
    }

    if (!courseId) {
        swal("Error", "Please select a courseId.", "error");
        return;
    }

    if (!marks || marks <= 0) {
        swal("Error", "Please enter a valid mark.", "error");
        return;
    }

    $.ajax({
        url: '/StudentExam/create',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (response) {
            swal("Success", "Exam mark saved successfully!", "success");
            loadExamMarks();
        },
        error: function (err) {
            console.error('Error saving exam mark:', err);
            alert('Error saving data. Please try again.');
        }
    });
}

function clearForm() {
    $('#examDropdown').val('');
    $('#studentDropdown').val('');
    $('#courseDropdown').val('');
    $('#Marks').val('');
    $('#isActive').prop('checked', true);
    $('#marksTable').DataTable().clear().draw();
}

$(document).ready(function () {
    $.noConflict();
    $('#marksTable').DataTable({
        paging: false,
        searching: false,
        ordering: true,
        info: false
    });

    loadExams();
    loadStudents();
    loadCourse();
    loadExamMarks();
});