$(document).ready(function () {
    

    $.noConflict();

    // Check if DataTable is already initialized and destroy it if necessary
    if ($.fn.DataTable.isDataTable('#userTable')) {
        $('#userTable').DataTable().destroy();
    }
    loadUsers();
    $('#userForm').on('submit', function (e) {
        e.preventDefault();
        saveUser();
    });
});

function saveUser() {
    let users = {
        Id: parseInt($('#userId').val()) || 0,
        Username: $('#uname').val(),
        Password: $('#password').val(),
        UserType: parseInt($('#userType').val()),
        Companyid: parseInt($('#companyid').val()) || 0,
        Property_Id: parseInt($('#property_id').val()) || 0,
        Isactive: $('#isActive').is(':checked')
    };

    console.log(users); // Log user object for debugging

    $.ajax({
        url: '/user/Create',
        type: "POST",
        contentType: 'application/json',
        data: JSON.stringify(users),
        success: function (response) {
            swal("Success", "User saved successfully", "success");
            clearUser();
            loadUsers();
            location.reload();
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
                    <td hidden="hidden">${user.companyid}</td>
                    <td hidden="hidden">${user.property_id}</td>
                    <td>${user.isactive ? 'Yes' : 'No'}</td>
                    <td><button class="btn btn-sm btn-warning" onclick="editUser(${user.id})">Edit</button></td>
                    <td><button class="btn btn-sm btn-danger" onclick="deleteUser(${user.id})">Delete</button></td>
                </tr>`;
                tbody.append(row);
            });


            if ($.fn.DataTable.isDataTable('#userTable')) {
                $('#userTable').DataTable().destroy();
            }

            $('#userTable').DataTable({
                responsive: true,
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
                            columns: [1, 2, 5] // Select specific columns to export
                        }
                    },
                    {
                        extend: 'excelHtml5',
                        text: 'Export Excel',
                        titleAttr: 'Excel',
                        className: 'btn btn-primary',
                        exportOptions: {
                            columns: [1, 2, 5] // Select specific columns to export
                        }
                    },
                    {
                        extend: 'pdfHtml5',
                        text: 'Export PDF',
                        titleAttr: 'PDF',
                        className: 'btn btn-danger',
                        exportOptions: {
                            columns: [1, 2, 5] // Select specific columns to export
                        }
                    },
                    {
                        extend: 'print',
                        text: 'Print',
                        titleAttr: 'Print',
                        className: 'btn btn-info',
                        exportOptions: {
                            columns: [1, 2, 5] // Select specific columns to print
                        }
                    }
                ]
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
            console.log('user', user);
            $('#userId').val(user.id);
            $('#uname').val(user.username);
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
            location.reload();
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
