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

    var navigateToConversations = function (event) {
        WinJS.Navigation.navigate("/pages/missed-conversations/missed-conversations.html");
    };

    var goToLogin = function (event) {
        WinJS.Navigation.navigate("/pages/login/login.html");
    };

    var navigateToContactRequests = function (event) {
        WinJS.Navigation.navigate("/pages/contact-requests/contact-requests.html");
    };

    var navigateToContacts = function () {
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