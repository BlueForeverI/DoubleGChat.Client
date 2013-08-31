(function () {
    "use strict";

    var usersUrl = DoubleGChat.Constants.baseUrl + "users/search";
    var user = DoubleGChat.Controllers.User.getUserCredentials();

    var getUsersByQueryText = function(queryText) {
        return new WinJS.Promise(function(success, error, progress) {
            progress();
            DoubleGChat.RemoteData.sendRequest(usersUrl, "POST", { queryText: queryText }, user.SessionKey)
                .then(function (userDetails) {
                    var users = JSON.parse(userDetails.responseText);
                    DoubleGChat.ViewModels.Search.setUsers(users);
                    success();
                }, function(response) {
                    var text = JSON.parse(response.response);
                    console.log(text);
                    error();
                });
        });
    };

    WinJS.Namespace.define("DoubleGChat.Controllers.Search", {
        getUsersByQueryText: getUsersByQueryText
    });
})();
