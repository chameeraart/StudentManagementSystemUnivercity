$(document).ready(function () {
    $.noConflict();

    // Check if DataTable is already initialized and destroy it if necessary
    if ($.fn.DataTable.isDataTable('#tableID')) {
        $('#tableID').DataTable().destroy();
    }
    loadTable();
});


function saveGrade() {
    var id = $('#gradeId').val();
    var gradeName = $('#gradeName').val();
    var gradeRemark = $('#gradeRemark').val();
    var from = $('#gradefrom').val();
    var to = $('#gradeto').val();
    var isActive = $('#isActive').is(':checked');

    var grade = {
        id: id,
        name: gradeName,
        from: from,
        to: to,
        remark: gradeRemark,
        isactive: isActive
    };

    // Validate if gradeName is empty
    if (gradeName === "") {
        swal("Warning", "Grade name cannot be empty!", "warning");
        return false; // Prevent form submission
    }

    if (from === "") {
        swal("Warning", "Grade From Marks cannot be empty!", "warning");
        return false; // Prevent form submission
    }

    if (to === "") {
        swal("Warning", "Grade To Marks cannot be empty!", "warning");
        return false; // Prevent form submission
    }

    var gradeFrom = parseInt($("#gradefrom").val());
    var gradeTo = parseInt($("#gradeto").val());

    // Validate values
    if (isNaN(gradeFrom) || gradeFrom < 0 || gradeFrom > 100) {
        alert("Please enter a valid 'From' mark between 0 and 100.");
        return false
    }

    if (isNaN(gradeTo) || gradeTo < 0 || gradeTo > 100) {
        alert("Please enter a valid 'To' mark between 0 and 100.");
        return false
    }

    if (gradeFrom > gradeTo) {
        alert("'From' mark cannot be greater than 'To' mark.");
        return false
    }


    // Check for duplicate grade name in the table
    var isDuplicate = false;
    $('#tableID tbody tr').each(function () {
        var existingGradeName = $(this).find('td').eq(1).text().trim(); // Get the grade name from the table (2nd column)
        if (gradeName.toLowerCase() === existingGradeName.toLowerCase()) {
            isDuplicate = true;
            return false; // Break the loop once a duplicate is found
        }
    });

    if (isDuplicate) {
        swal("Warning", "This grade name already exists!", "warning");
        return false; // Prevent form submission
    }

    var url = '/grade/create'; // Adjust URL as needed

    $.ajax({
        url: url,
        type: "POST",
        contentType: 'application/json',
        data: JSON.stringify(grade),
        success: function (response) {
            swal("Success", "Grade saved successfully!", "success");
            loadTable(); // Refresh the table after saving
            clearGrade();
            location.reload();
        },
        error: function (err) {
            console.error('Error saving grade:', err);
        }
    });
}

function loadTable() {
    $.ajax({
        url: '/grade/getall',
        type: 'GET',
        success: function (response) {
            var tbody = $('#tbodyid');
            tbody.empty(); // Clear the table body
            response.forEach(function (grade) {
                var row = `<tr>
                    <td hidden>${grade.id}</td>
                    <td>${grade.name}</td>
                    <td>${grade.from}</td>
                    <td>${grade.to}</td>
                    <td>${grade.remark}</td>
                    <td>${grade.isactive ? 'Yes' : 'No'}</td>
                    <td><button class="btn btn-warning" onclick="getGrade(${grade.id})">Edit</button></td>
                    <td><button class="btn btn-danger" onclick="deleteGrade(${grade.id})">Delete</button></td>
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
                        className: 'btn btn-success'
                    },
                    {
                        extend: 'excelHtml5',
                        text: 'Export Excel',
                        titleAttr: 'Excel',
                        className: 'btn btn-primary'
                    },
                    {
                        extend: 'pdfHtml5',
                        text: 'Export PDF',
                        titleAttr: 'PDF',
                        className: 'btn btn-danger'
                    },
                    {
                        extend: 'print',
                        text: 'Print',
                        titleAttr: 'Print',
                        className: 'btn btn-info'
                    }
                ]
            });
        },
        error: function (err) {
            console.error('Error loading table:', err);
        }
    });
}

function getGrade(gradeId) {
    $.ajax({
        url: '/grade/get/' + gradeId,
        type: 'GET',
        success: function (response) {
            $('#gradeId').val(response.id);
            $('#gradeName').val(response.name);
            $('#gradefrom').val(response.from);
            $('#gradeto').val(response.to);
            $('#gradeRemark').val(response.remark);
            $('#isActive').prop('checked', response.isactive);
        },
        error: function (err) {
            console.error('Error fetching grade:', err);
        }
    });
}

function deleteGrade(gradeId) {
    $.ajax({
        url: '/grade/delete/' + gradeId,
        type: 'DELETE',
        success: function (response) {
            swal("Success", "Grade deleted successfully!", "success");
            loadTable(); // Refresh the table after deleting
            location.reload();
        },
        error: function (err) {
            console.error('Error deleting grade:', err);
        }
    });
}

function clearGrade() {
    $('#gradeId').val('0');
    $('#gradeName').val('');
    $('#gradefrom').val('');
    $('#gradeto').val('');
    $('#gradeRemark').val('');
    $('#isActive').prop('checked', false);
}

