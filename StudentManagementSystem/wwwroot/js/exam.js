$(document).ready(function () {
    $.noConflict();

    // Check if DataTable is already initialized and destroy it if necessary
    if ($.fn.DataTable.isDataTable('#examTable')) {
        $('#examTable').DataTable().destroy();
    }
    loadExamTable();
});

function validateExamForm() {
    var examName = $('#examName').val();
    var teacherName = $('#teacherName').val();
    var numberOfStudents = $('#numberOfStudents').val();
    var examDate = $('#examDate').val();

    if (!examName) {
        swal("Validation Error", "Exam Name is required!", "error");
        return false;
    }
    if (!teacherName) {
        swal("Validation Error", "Teacher Name is required!", "error");
        return false;
    }
    if (!numberOfStudents || isNaN(numberOfStudents) || numberOfStudents <= 0) {
        swal("Validation Error", "Number of Students must be a positive number!", "error");
        return false;
    }
    if (!examDate) {
        swal("Validation Error", "Exam Date is required!", "error");
        return false;
    }

    // Check for duplicate exam name in the table
    var isDuplicate = false;
    $('#examTable tbody tr').each(function () {
        var existingExamName = $(this).find('td').eq(1).text().trim(); // Get the exam name from the table (2nd column)

        if (examName.toLowerCase() === existingExamName.toLowerCase()) {
            isDuplicate = true;
            return false; // Break the loop once a duplicate is found
        }
    });

    if (isDuplicate) {
        swal("Warning", "This exam name already exists!", "warning");
        return false; // Prevent form submission
    }

    return true;
}

function saveExam() {
    if (!validateExamForm()) {
        return; // Stop execution if validation fails
    }

    var id = $('#examId').val();
    var examName = $('#examName').val();
    var teacherName = $('#teacherName').val();
    var numberOfStudents = $('#numberOfStudents').val();
    var examDate = $('#examDate').val();
    var subject = $('#subject').val();
    var isActive = $('#isActive').is(':checked');

    var exam = {
        id: id,
        examName: examName,
        teacherName: teacherName,
        numberOfStudents: numberOfStudents,
        examDate: examDate,
        subject: subject,
        isActive: isActive
    };

    console.log(exam, 'exam');
    var url = '/exam/create'; // Adjust URL as needed

    $.ajax({
        url: url,
        type: "POST",
        contentType: 'application/json',
        data: JSON.stringify(exam),
        success: function (response) {
            swal("Success", "Exam saved successfully!", "success");
            clearExam();
            loadExamTable(); // Refresh the table after saving
        },
        error: function (err) {
            console.error('Error saving exam:', err);
        }
    });
}

function loadExamTable() {
    $.ajax({
        url: '/exam/getall',
        type: 'GET',
        success: function (response) {
            var tbody = $('#tbodyExam');
            tbody.empty(); // Clear the table body
            response.forEach(function (exam) {
                var row = `<tr>
                    <td hidden>${exam.id}</td>
                    <td>${exam.examName}</td>
                    <td>${exam.teacherName}</td>
                    <td>${exam.numberOfStudents}</td>
                    <td>${formatDate(exam.examDate)}</td>
                    <td>${exam.isActive ? 'Yes' : 'No'}</td>
                    <td><button class="btn btn-warning" onclick="getExam(${exam.id})">Edit</button></td>
                    <td><button class="btn btn-danger" onclick="deleteExam(${exam.id})">Delete</button></td>
                </tr>`;
                tbody.append(row);
            });

            $('#examTable').DataTable({
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
            console.error('Error loading table:', err);
        }
    });
}

function getExam(examId) {
    $.ajax({
        url: '/exam/get/' + examId,
        type: 'GET',
        success: function (response) {
            $('#examId').val(response.id);
            $('#examName').val(response.examName);
            $('#teacherName').val(response.teacherName);
            $('#numberOfStudents').val(response.numberOfStudents);
            $('#examDate').val(formatDate(response.examDate));
            $('#isActive').prop('checked', response.isActive);
        },
        error: function (err) {
            console.error('Error fetching exam:', err);
        }
    });
}

function deleteExam(examId) {
    $.ajax({
        url: '/exam/delete/' + examId,
        type: 'DELETE',
        success: function (response) {
            swal("Success", "Exam deleted successfully!", "success");
            loadExamTable(); // Refresh the table after deleting
            clearExam();
        },
        error: function (err) {
            console.error('Error deleting exam:', err);
        }
    });
}

function clearExam() {
    $('#examId').val('0');
    $('#examName').val('');
    $('#teacherName').val('');
    $('#numberOfStudents').val('');
    $('#examDate').val('');
    $('#isActive').prop('checked', true);
}

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
