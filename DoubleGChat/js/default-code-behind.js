(function () {
    "use strict";

    var logoutHandler = function (event) {
        DoubleGChat.Controllers.User.logout()
        .then(function () {
            WinJS.Navigation.navigate("/pages/login/login.html");
        });
    }

    var goToRegister = function (event) {
        WinJS.Navigation.navigate("/pages/register/register.html");
    };

    WinJS.Namespace.define("DoubleGChat.CodeBehind.Default", {
        logout: logoutHandler,
        goToRegister: goToRegister
    });
})();