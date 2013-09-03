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
                WinJS.Navigation.navigate("/pages/contacts/contacts.html");
            }, function (error) {
                DoubleGChat.ViewModels.User.errorMessage = error;
            });
    };

    WinJS.Namespace.define("DoubleGChat.CodeBehind.UserLogin", {
        login: loginHandler,
        keydown: enterHandler
    });
})();