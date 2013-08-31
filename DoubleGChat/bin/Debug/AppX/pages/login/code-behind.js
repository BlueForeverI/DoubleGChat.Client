(function () {
    "use strict";

    var loginHandler = function (event) {
        var userNameElement = document.getElementById("username");
        var passwordElement = document.getElementById("password");
        var userName = userNameElement.value;
        var password = passwordElement.value;

        var user = DoubleGChat.Models.User.define({ username: userName, passwordHash: password });
        DoubleGChat.Controllers.User.login(user)
            .done(function () {
                WinJS.Navigation.navigate("/pages/contacts/contacts.html");
            });
    };

    WinJS.Namespace.define("DoubleGChat.CodeBehind.UserLogin", {
        login: loginHandler
    });
})();