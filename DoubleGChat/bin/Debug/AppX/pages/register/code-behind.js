/// <reference path="../../js/sha1.js" />
// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    var registerHandler = function (event) {
        var userName = document.getElementById("username");
        var password = document.getElementById("password");
        var firstName = document.getElementById("first-name");
        var lastName = document.getElementById("last-name");

        var user = DoubleGChat.Models.User.define({
            username: userName.value,
            passwordHash: password.value,
            firstName: firstName.value,
            lastName: lastName.value
        });
        DoubleGChat.Controllers.User.register(user)
        .done(function (userDetails) {
            WinJS.Navigation.navigate("/pages/login/login.html");
        });
    };

    WinJS.Namespace.define("DoubleGChat.CodeBehind.UserRegister", {
        register: registerHandler
    });
})();
