$(document).ready(function () {
    loadUsers();

    $('#userTable').DataTable();

    $('#userForm').on('submit', function (e) {
        e.preventDefault();
        saveUser();
    });
});

function saveUser() {
    let users = {
        Id: parseInt($('#userId').val()) || 0,
        username: $('#uname').val(),
        password: $('#password').val(),
        UserType: $('#userType').val(),
        companyid: parseInt($('#companyid').val()) || 0,
        property_id: parseInt($('#property_id').val()) || 0,
        isactive: $('#isActive').is(':checked')
    };

    // Perform AJAX request to save user data to the server
    $.ajax({
        url: '/user/Create',
        type: "POST",
        contentType: 'application/json',
        data: JSON.stringify(users),
        success: function (response) {
            swal("Success", "User saved successfully", "success");
            clearUser();
            loadUsers();
        },
        error: function (error) {
            swal("Error", "Failed to save user", "error");
        }
    });
}


function loadUsers() {
    // Perform AJAX request to fetch user data from the server
    $.ajax({
        url: '/user/getall', // Adjust the URL to your server endpoint
        type: 'GET',
        success: function (response) {
            let tbody = $('#userTableBody');
            tbody.empty();
            response.forEach(user => {
                let row = `<tr>
                    <td hidden="hidden">${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.userType === 100 ? 'Admin' : 'User'}</td>
                    <td>${user.companyid}</td>
                    <td>${user.property_id}</td>
                    <td>${user.isactive ? 'Yes' : 'No'}</td>
                    <td><button class="btn btn-sm btn-warning" onclick="editUser(${user.id})">Edit</button></td>
                    <td><button class="btn btn-sm btn-danger" onclick="deleteUser(${user.id})">Delete</button></td>
                </tr>`;
                tbody.append(row);
            });
        },
        error: function (error) {
            swal("Error", "Failed to load users", "error");
        }
    });
}

function editUser(id) {
    // Perform AJAX request to fetch user data by ID
    $.ajax({
        url: `/user/get/${id}`, // Adjust the URL to your server endpoint
        type: 'GET',
        success: function (user) {
            $('#userId').val(user.id);
            $('#username').val(user.username);
            $('#password').val(user.password);
            $('#userType').val(user.userType);
            $('#companyid').val(user.companyid);
            $('#property_id').val(user.property_id);
            $('#isActive').prop('checked', user.isactive);
        },
        error: function (error) {
            swal("Error", "Failed to load user data", "error");
        }
    });
}

function deleteUser(id) {
    // Perform AJAX request to delete user by ID
    $.ajax({
        url: `/user/delete/${id}`, // Adjust the URL to your server endpoint
        type: 'DELETE',
        success: function (response) {
            swal("Success", "User deleted successfully", "success");
            loadUsers();
        },
        error: function (error) {
            swal("Error", "Failed to delete user", "error");
        }
    });
}

function clearUser() {
    $('#userId').val('0');
    $('#username').val('');
    $('#password').val('');
    $('#userType').val('100');
    $('#companyid').val('');
    $('#property_id').val('');
    $('#isActive').prop('checked', true);
}
