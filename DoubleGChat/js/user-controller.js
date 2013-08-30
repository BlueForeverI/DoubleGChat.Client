(function () {
    "use strict";

    var usersUrl = DoubleGChat.Constants.baseUrl + "users/";

    var login = function (user) {
        var loginUrl = usersUrl + "login";
        return new WinJS.Promise(function (success, error, progress) {
            DoubleGChat.RemoteData.sendRequest(loginUrl, "POST", user)
            .then(function (userDetails) {
                var user = JSON.parse(userDetails.responseText);
                setUserSessionKey(user.sessionKey);
                success();
            }, function (reponse) {
                error(reponse);
            });
        });
    };

    var register = function (user) {
        var registerUrl = usersUrl + "register";
        return DoubleGChat.RemoteData.sendRequest(registerUrl, "POST", user);
    };

    var getUserSessionKey = function () {
        var sessionKey = Windows.Storage.ApplicationData.current.localSettings.values["sessionKey"];
        return sessionKey;
    };

    var setUserSessionKey = function (sessionKey) {
        Windows.Storage.ApplicationData.current.localSettings.values["sessionKey"] = sessionKey;
    };

    WinJS.Namespace.define("DoubleGChat.Controllers.User", {
        login: login,
        register: register,
        getUserSessionKey: getUserSessionKey,
        setUserSessionKey: setUserSessionKey
    });
}());