$(document).ready(function () {
    loadTable();
});

function saveSubject() {
    var id = $('#subjectId').val();
    var subjectName = $('#subjectName').val();
    var isActive = $('#isActive').is(':checked');

    var subject = {
        id: id,
        name: subjectName,
        isactive: isActive
    };

    console.log(subject, 'subject');
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
            var tbody = $('#tbodyid');
            tbody.empty(); // Clear the table body
            response.forEach(function (subject) {
                var row = `<tr>
                    <td hidden>${subject.id}</td>
                    <td>${subject.name}</td>
                    <td>${subject.isactive ? 'Yes' : 'No'}</td>
                    <td><button class="btn btn-warning" onclick="getSubject(${subject.id})">Edit</button></td>
                    <td><button class="btn btn-danger" onclick="deleteSubject(${subject.id})">Delete</button></td>
                </tr>`;
                tbody.append(row);
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
            $('#isActive').prop('checked', response.isactive);
        },
        error: function (err) {
            console.error('Error fetching Subject:', err);
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
}
