(function () {
    "use strict";

    var usersUrl = DoubleGChat.Constants.baseUrl + "users/";

    var getUserCredentials = function () {
        var data = Windows.Storage.ApplicationData.current.localSettings.values["userCredentials"];
        var user = JSON.parse(data);
        return user;
    };

    var saveUserCredentials = function (user) {
        Windows.Storage.ApplicationData.current.localSettings.values["userCredentials"] = JSON.stringify(user);
    };

    var removeUserCredentials = function () {
        Windows.Storage.ApplicationData.current.localSettings.values["userCredentials"] = null;
    }

    var hashPassword = function (user) {
        user.passwordHash = CryptoJS.SHA1(user.passwordHash).toString();
    }

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
        var loginUrl = usersUrl + "login";
        hashPassword(user);
        return new WinJS.Promise(function (success, error, progress) {
            DoubleGChat.RemoteData.sendRequest(loginUrl, "POST", user)
            .then(function (userDetails) {
                var user = JSON.parse(userDetails.responseText);
                saveUserCredentials(user);
                success();
                DoubleGChat.ViewModels.User.errorMessage = "";
            }, function (response) {
                var text = JSON.parse(response.response);
                DoubleGChat.ViewModels.User.errorMessage = text;
            });
        });
    };

    var register = function (user) {
        var registerUrl = usersUrl + "register";
        hashPassword(user);
        return new WinJS.Promise(function (success, error, progress) {
            DoubleGChat.RemoteData.sendRequest(registerUrl, "POST", user)
                .then(function () {
                    success();
                    DoubleGChat.ViewModels.User.errorMessage = "";
                }, function (response) {
                    var text = JSON.parse(response.response);
                    DoubleGChat.ViewModels.User.errorMessage = text;
                });
        });
    };

    WinJS.Namespace.define("DoubleGChat.Controllers.User", {
        login: login,
        register: register,
        getUserCredentials: getUserCredentials,
        saveUserCredentials: saveUserCredentials,
        removeUserCredentials: removeUserCredentials
    });
}());