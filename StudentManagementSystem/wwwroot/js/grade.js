$(document).ready(function () {
    loadTable();
});

function saveGrade() {
    var id = $('#gradeId').val();
    var gradeName = $('#gradeName').val();
    var gradeRemark = $('#gradeRemark').val();
    var isActive = $('#isActive').is(':checked');

    var grade = {
        id: id,
        name: gradeName,
        remark: gradeRemark,
        isactive: isActive
    };

    console.log(grade, 'grade');
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
                    <td>${grade.remark}</td>
                    <td>${grade.isactive ? 'Yes' : 'No'}</td>
                    <td><button class="btn btn-warning" onclick="getGrade(${grade.id})">Edit</button></td>
                    <td><button class="btn btn-danger" onclick="deleteGrade(${grade.id})">Delete</button></td>
                </tr>`;
                tbody.append(row);
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
        },
        error: function (err) {
            console.error('Error deleting grade:', err);
        }
    });
}

function clearGrade() {
    $('#gradeId').val('0');
    $('#gradeName').val('');
    $('#gradeRemark').val('');
    $('#isActive').prop('checked', false);
}

