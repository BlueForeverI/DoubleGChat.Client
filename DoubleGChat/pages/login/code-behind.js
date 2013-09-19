(function () {
    "use strict";

    var enterHandler = function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            loginHandler(event);
        }
    };

    var loginHandler = function (event) {
        var userNameElement = document.getElementById("username");
        var passwordElement = document.getElementById("password");
        var userName = userNameElement.value;
        var password = passwordElement.value;

        var user = DoubleGChat.Models.User.define({ username: userName, passwordHash: password });
        DoubleGChat.Controllers.User.login(user)
            .then(function () {
                DoubleGChat.CodeBehind.Default.navigateToContacts();
            }, function (error) {
                DoubleGChat.ViewModels.User.errorMessage = error;
            });
    };

    var registerHandler = function (event) {
        DoubleGChat.CodeBehind.Default.goToRegister();
    };

    WinJS.Namespace.define("DoubleGChat.CodeBehind.UserLogin", {
        login: loginHandler,
        keydown: enterHandler,
        register: registerHandler
    });
})();