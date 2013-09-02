(function () {
    "use strict";

    var usersUrl = DoubleGChat.Constants.baseUrl + "users/search";
    var user = DoubleGChat.Data.User.getUserCredentials();

    var getUsersByQueryText = function (queryText) {
        return new WinJS.Promise(function (success, error, progress) {
            progress();
            DoubleGChat.RemoteData.sendRequest(usersUrl, "POST", { queryText: queryText }, user.sessionKey)
                .then(function (userDetails) {
                    var users = JSON.parse(userDetails.responseText);
                    success(users);
                }, function (response) {
                    var text = JSON.parse(response.response);
                    error(text);
                });
        });
    };

    WinJS.Namespace.define("DoubleGChat.Data.Search", {
        getUsersByQueryText: getUsersByQueryText
    });
})();
