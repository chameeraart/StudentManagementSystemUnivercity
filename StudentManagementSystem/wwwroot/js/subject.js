$(document).ready(function () {
    $.noConflict();

    // Check if DataTable is already initialized and destroy it if necessary
    if ($.fn.DataTable.isDataTable('#tableID')) {
        $('#tableID').DataTable().destroy();
    }
    loadExam();
    loadTable();
    loadCourse();

});

function saveSubject() {
    var id = $('#subjectId').val();
    var subjectName = $('#subjectName').val();
    var isActive = $('#isActive').is(':checked');
    var examid = $('#examDropdown').val();
    var courseid = $('#courseDropdown').val();

    var subject = {
        id: id,
        name: subjectName,
        examid: examid,
        courseid: courseid,
        isactive: isActive
    };

    // Check if subjectName is empty
    if (subjectName === "") {
        swal("Warning", "Subject name cannot be empty!", "warning");
        return false; // Prevent the form from submitting
    }

    // Check if examid is empty
    if (examid === "" || examid === null) {
        swal("Warning", "Please select an exam!", "warning");
        return false; // Prevent the form from submitting
    }

    // Check if course is empty
    if (courseid === "" || courseid === null) {
        swal("Warning", "Please select an course!", "warning");
        return false; // Prevent the form from submitting
    }
    
 /*    Check for duplicate subject and exam combination in the table*/
    var isDuplicate = false;
    $('#tableID tbody tr').each(function () {
        var existingSubjectName = $(this).find('td').eq(1).text().trim(); // Get subject name from table
        var existingExamName = $(this).find('td').eq(3).text().trim(); // Get exam name from table

        console.log("Checking against:", existingSubjectName, existingExamName);

        if (subjectName.toLowerCase() === existingSubjectName.toLowerCase() &&
            examid.toLowerCase() === existingExamName.toLowerCase()) {
            isDuplicate = true;
            return false; // Break the loop once a duplicate is found
        }
    });

    if (isDuplicate) {
        swal("Warning", "This subject with the same exam already exists!", "warning");
        return false; // Prevent the form from submitting
    }

    var url = '/subject/create'; // Adjust URL as needed

    $.ajax({
        url: url,
        type: "POST",
        contentType: 'application/json',
        data: JSON.stringify(subject),
        success: function (response) {
            swal("Success", "Subject saved successfully!", "success");
            clearSubject();
            loadTable(); // Refresh the table after saving
            location.reload();
        },
        error: function (err) {
            console.error('Error saving subject:', err);
        }
    });
}

function loadTable() {

    $.ajax({
        url: '/subject/getall',
        type: 'GET',
        success: function (response) {
            console.log('response', response);
            var tbody = $('#tbodyid');
            tbody.empty(); // Clear the table body
            response.forEach(function (subject) {
                var row = `<tr>
                    <td hidden>${subject.id}</td>
                    <td>${subject.name}</td>
                    <td>${subject.exam.examName}</td>
                    <td hidden>${subject.exam.id}</td>
                     <td>${subject.course.name}</td>
                    <td hidden>${subject.course.id}</td>
                    <td>${subject.isactive ? 'Yes' : 'No'}</td>
                    <td><button class="btn btn-warning" onclick="getSubject(${subject.id})">Edit</button></td>
                    <td><button class="btn btn-danger" onclick="deleteSubject(${subject.id})">Delete</button></td>
                </tr>`;
                tbody.append(row);
            });

            // Initialize DataTables with export buttons
            if ($.fn.DataTable.isDataTable('#tableID')) {
                $('#tableID').DataTable().destroy();
            }

            $('#tableID').DataTable({
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
                },
                dom: 'Bfrtip', // Include export buttons
                buttons: [
                    {
                        extend: 'csvHtml5',
                        text: 'Export CSV',
                        titleAttr: 'CSV',
                        className: 'btn btn-success',
                        exportOptions: {
                            columns: [1, 2, 4, 6] // Select specific columns to export
                        }

                    },
                    {
                        extend: 'excelHtml5',
                        text: 'Export Excel',
                        titleAttr: 'Excel',
                        className: 'btn btn-primary',
                        exportOptions: {
                            columns: [1, 2, 4, 6] // Select specific columns to export
                        }
                    },
                    {
                        extend: 'pdfHtml5',
                        text: 'Export PDF',
                        titleAttr: 'PDF',
                        className: 'btn btn-danger',
                        exportOptions: {
                            columns: [1, 2, 4, 6] // Select specific columns to export
                        }
                    },
                    {
                        extend: 'print',
                        text: 'Print',
                        titleAttr: 'Print',
                        className: 'btn btn-info',
                        exportOptions: {
                            columns: [1, 2, 4, 6] // Select specific columns to export
                        }
                    }
                ]
            });
        },



        error: function (err) {
            console.error('Error loading table:', err);
        }
    });
}

function getSubject(subjectId) {
    $.ajax({
        url: '/subject/get/' + subjectId,
        type: 'GET',
        success: function (response) {
            $('#subjectId').val(response.id);
            $('#subjectName').val(response.name);
            $('#examDropdown').val(response.exam.id);
            $('#courseDropdown').val(response.course.id);
            $('#isActive').prop('checked', response.isactive);
        },
        error: function (err) {
            console.error('Error fetching Subject:', err);
        }
    });
}
function loadExam() {
    $.ajax({
        url: '/Exam/getall',
        type: 'GET',
        success: function (response) {
            var dropdown = $('#examDropdown');
            dropdown.empty();
            dropdown.append('<option value="" disabled selected>Select a Exam</option>');
            response.forEach(function (exam) {
                dropdown.append($('<option></option>').attr('value', exam.id).text(exam.examName));
            });
        },
        error: function (err) {
            console.error('Error loading students:', err);
        }
    });
}

function loadCourse() {
    $.ajax({
        url: '/Course/getall',
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
            console.error('Error loading course:', err);
        }
    });
}

function deleteSubject(subjectId) {
    $.ajax({
        url: '/subject/delete/' + subjectId,
        type: 'DELETE',
        success: function (response) {
            swal("Success", "Subject deleted successfully!", "success");
            loadTable(); // Refresh the table after deleting
            location.reload();
        },
        error: function (err) {
            console.error('Error deleting Subject:', err);
        }
    });
}


function clearSubject() {
    $('#subjectId').val('0');
    $('#subjectName').val('');
    $('#isActive').prop('checked', true);
    $('#examDropdown').val('');
    $('#courseDropdown').val('');
}
