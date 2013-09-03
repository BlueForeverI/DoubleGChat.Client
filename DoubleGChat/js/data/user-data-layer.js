(function () {
    "use strict";

    var usersUrl = DoubleGChat.Constants.baseUrl + "users/";

    var getUserCredentials = function () {
        var data = Windows.Storage.ApplicationData.current.localSettings.values["userCredentials"];
        if (data) {
            var user = JSON.parse(data);
            return user;
        }

        return null;
    };

    var saveUserCredentials = function (user) {
        Windows.Storage.ApplicationData.current.localSettings.values["userCredentials"] = JSON.stringify(user);
    };

    var removeUserCredentials = function() {
        Windows.Storage.ApplicationData.current.localSettings.values["userCredentials"] = null;
    };

    var hashPassword = function(user) {
        user.passwordHash = CryptoJS.SHA1(user.passwordHash).toString();
    };

    var loginWithCurrentSession = function() {
        var loginSessionUrl = usersUrl + "session";
        var user = DoubleGChat.Controllers.User.getUserCredentials();
        return new WinJS.Promise(function(success, error, progress) {
            if (user) {
                DoubleGChat.RemoteData.sendRequest(loginSessionUrl, "POST", user)
                    .done(success, function() {
                        removeUserCredentials();
                        error("");
                    });
            } else {
                error("");
            }
        });
    };

    var login = function (user) {
        var loginUrl = usersUrl + "login";
        hashPassword(user);
        return new WinJS.Promise(function (success, error, progress) {
            DoubleGChat.RemoteData.sendRequest(loginUrl, "POST", user)
            .done(function (userDetails) {
                var user = JSON.parse(userDetails.responseText);
                saveUserCredentials(user);
                success(userDetails);
            }, function (response) {
                if (response.response == "") {
                    error("");
                } else {
                    var text = JSON.parse(response.response);
                    error(text);
                }
            });
        });
    };

    var logout = function () {
        var loginUrl = usersUrl + "logout";
        var user = getUserCredentials();
        return new WinJS.Promise(function (success, error, progress) {
            if (user) {
                DoubleGChat.RemoteData.sendRequest(loginUrl, "get", null, user.sessionKey)
                .done(function () {
                    removeUserCredentials();
                    success();
                }, function (response) {
                    if (response.response == "") {
                        error("");
                    } else {
                        var text = JSON.parse(response.response);
                        error(text);
                    }
                });
            } else {
                error();
            }
        });
    };

    var register = function (user) {
        var registerUrl = usersUrl + "register";
        hashPassword(user);
        return new WinJS.Promise(function (success, error, progress) {
            DoubleGChat.RemoteData.sendRequest(registerUrl, "POST", user)
                .then(function (userDetails) {
                    var user = JSON.parse(userDetails.responseText);
                    saveUserCredentials(user);
                    success(userDetails);
                }, function (response) {
                    if (response.response == "") {
                        error("");
                    } else {
                        var text = JSON.parse(response.response);
                        error(text);
                    }
                });
        });
    };

    var goOffline = function () {
        var offlineUrl = usersUrl + "offline";
        var user = getUserCredentials();
        return new WinJS.Promise(function (success, error, progress) {
            if (user) {
                DoubleGChat.RemoteData.sendRequest(offlineUrl, "get", null, user.sessionKey)
                .then(function () {
                }, function (response) {
                    if (response.response == "") {
                        error("");
                    } else {
                        var text = JSON.parse(response.response);
                        error(text);
                    }
                });
            } else {
                error("You are not logged in.");
            }
        });
    };

    WinJS.Namespace.define("DoubleGChat.Data.User", {
        login: login,
        logout: logout,
        register: register,
        getUserCredentials: getUserCredentials,
        loginWithCurrentSession: loginWithCurrentSession,
        goOffline: goOffline,
        saveUserCredentials: saveUserCredentials
    });
})();