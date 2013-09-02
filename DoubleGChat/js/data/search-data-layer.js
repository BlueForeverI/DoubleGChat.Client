(function () {
    "use strict";

    var usersUrl = DoubleGChat.Constants.baseUrl + "users/search";

    var getUsersByQueryText = function (queryText) {
        var user = DoubleGChat.Data.User.getUserCredentials();
        return new WinJS.Promise(function (success, error, progress) {
            if (user) {
                DoubleGChat.RemoteData.sendRequest(usersUrl, "POST", { queryText: queryText }, user.sessionKey)
                .then(function (userDetails) {
                    var users = JSON.parse(userDetails.responseText);
                    success(users);
                }, function (response) {
                    var text = JSON.parse(response.response);
                    error(text);
                });
            } else {
                error("You are not logged in.");
            }
        });
    };

    WinJS.Namespace.define("DoubleGChat.Data.Search", {
        getUsersByQueryText: getUsersByQueryText
    });
})();
