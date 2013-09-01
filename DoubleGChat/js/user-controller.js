(function () {
    "use strict";

    var isActiveUserSession = function (user) {
        var user = DoubleGChat.Controllers.User.getUserCredentials();
        return new WinJS.Promise(function (success, error, progress) {
            progress();
            if (user) {
                DoubleGChat.RemoteData.sendRequest(loginUrl, "POST", user)
                .done(success, error);
            } else {
                error();
            }
        });
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

    var logout = function () {
        return new WinJS.Promise(function (success, error, progress) {
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
        logout: logout
    });
}());