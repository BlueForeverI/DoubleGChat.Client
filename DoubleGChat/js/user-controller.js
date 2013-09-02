(function () {
    "use strict";

    var getUserCredentials = function () {
        return DoubleGChat.Data.User.getUserCredentials();
    };

    var loginWIthCurrentUserSession = function () {
        return DoubleGChat.Data.User.loginWithCurrentSession();
    }

    var login = function (user) {
        return new WinJS.Promise(function (success, error, progress) {
            DoubleGChat.Data.User.login(user)
            .then(function (userDetails) {
                success();
                DoubleGChat.ViewModels.User.errorMessage = "";
            }, function (text) {
                DoubleGChat.ViewModels.User.errorMessage = text;
            });
        });
    };

    var clearNavigationHistory = function () {
        var historyStack = WinJS.Navigation.history.backStack;
        while (historyStack.length > 0) {
            historyStack.pop();
        }
    };

    var logout = function () {
        return new WinJS.Promise(function (success, error, progress) {
            DoubleGChat.Notifications.emptyChannelList();
            clearNavigationHistory();
            DoubleGChat.Data.User.logout()
            .then(success, function (text) {
                DoubleGChat.ViewModels.User.errorMessage = text;
            });
        });
    };

    var register = function (user) {
        return new WinJS.Promise(function (success, error, progress) {
            DoubleGChat.Data.User.register(user)
                .then(function () {
                    success();
                    DoubleGChat.ViewModels.User.errorMessage = "";
                }, function (text) {
                    DoubleGChat.ViewModels.User.errorMessage = text;
                });
        });
    };

    WinJS.Namespace.define("DoubleGChat.Controllers.User", {
        login: login,
        register: register,
        getUserCredentials: getUserCredentials,
        logout: logout,
        loginWIthCurrentUserSession: loginWIthCurrentUserSession
    });
}());