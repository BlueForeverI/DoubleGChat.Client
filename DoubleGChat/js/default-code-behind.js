(function () {
    "use strict";

    var logoutHandler = function (event) {
        DoubleGChat.Controllers.User.logout()
        .then(function () {
            WinJS.Navigation.navigate("/pages/login/login.html");
        });
    };

    var goToRegister = function (event) {
        WinJS.Navigation.navigate("/pages/register/register.html");
    };

    var navigateToContactRequests = function (event) {
        WinJS.Navigation.navigate("/pages/contact-requests/contact-requests.html");
    };

    WinJS.Namespace.define("DoubleGChat.CodeBehind.Default", {
        logout: logoutHandler,
        goToRegister: goToRegister,
        navigateToContactRequests: navigateToContactRequests
    });
})();