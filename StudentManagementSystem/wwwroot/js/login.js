$(document).ready(function () {
    $('#btnLogin').click(function (e) {
        e.preventDefault();

        var userName = $("#userName").val();
        var password = $("#password").val();

        if (userName === "") {
            swal("Please Enter User Name");
            return;
        }

        if (password === "") {
            swal("Please Enter Password");
            return;
        }

        var loginDto = {
            'Username': userName,
            'Password': password
        };

        $.ajax({
            type: "POST",
            url: "/Auth/Login",
            data: JSON.stringify(loginDto),
            contentType: "application/json",
            success: function (data) {
                console.log(data);
                sessionStorage.setItem("token", data.JWT);
                sessionStorage.setItem("userrole", data.userrole);
                sessionStorage.setItem("uid", data.userID);
                sessionStorage.setItem("username", data.username);
                sessionStorage.setItem("studentId", data.studentid);
                sessionStorage.setItem("studentImage", data.image);
                sessionStorage.setItem("studentName", data.name);
                window.location.href = "/Home/Index";
            },
            error: function () {
                swal("Oops...", "Please Enter Valid User Name and Password!", "error");
            }
        });
    });
});