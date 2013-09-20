(function () {
    "use strict";

    var logoutHandler = function (event) {
        DoubleGChat.Controllers.User.logout()
        .then(function () {
            hideAppbar();
            WinJS.Navigation.navigate("/pages/login/login.html");
        });
    };

    function hideAppbar(parameters) {
        var appBar = document.getElementById("nav-bar").winControl;
        appBar.hide();

        var otherBar = document.getElementById("app-bar");
        if(otherBar) {
            otherBar.winControl.hide();
        }
    }

    var goToRegister = function (event) {
        hideAppbar();
        WinJS.Navigation.navigate("/pages/register/register.html");
    };

    var navigateToConversations = function (event) {
        hideAppbar();
        WinJS.Navigation.navigate("/pages/missed-conversations/missed-conversations.html");
    };

    var goToLogin = function (event) {
        hideAppbar();
        WinJS.Navigation.navigate("/pages/login/login.html");
    };

    var navigateToContactRequests = function (event) {
        hideAppbar();
        WinJS.Navigation.navigate("/pages/contact-requests/contact-requests.html");
    };

    var navigateToContacts = function () {
        hideAppbar();
        WinJS.Navigation.navigate("/pages/contacts/contacts.html");
    };

    WinJS.Utilities.markSupportedForProcessing(navigateToContacts);
    WinJS.Utilities.markSupportedForProcessing(navigateToContactRequests);
    WinJS.Utilities.markSupportedForProcessing(goToRegister);
    WinJS.Utilities.markSupportedForProcessing(logoutHandler);
    WinJS.Utilities.markSupportedForProcessing(goToLogin);

    WinJS.Namespace.define("DoubleGChat.CodeBehind.Default", {
        logout: logoutHandler,
        goToRegister: goToRegister,
        navigateToContactRequests: navigateToContactRequests,
        navigateToContacts: navigateToContacts,
        goToLogin: goToLogin,
        navigateToConversations: navigateToConversations
    });
})();