/// <reference path="../constants.js" />
/// <reference path="../data-requester.js" />
/// <reference path="../user-controller.js" />
(function () {
    "use strict";

    var conversationUrl = DoubleGChat.Constants.baseUrl + "conversations/";

    var startConversation = function (username) {
        var startUrl = conversationUrl + "start";
        var user = DoubleGChat.Controllers.User.getUserCredentials();
        var otherUser = { username: username };
        return new WinJS.Promise(function (success, error, progress) {
            progress();
            DoubleGChat.RemoteData.sendRequest(startUrl, "post", {
                firstUser: user, secondUser: otherUser
            }, user.sessionKey).then(function (data) {
                var jsonData = JSON.parse(data.response);
                success(jsonData);
            }, function (data) {
                var jsonData = JSON.parse(data.response);
                error(jsonData);
            });
        });
    };

    WinJS.Namespace.define("DoubleGChat.Data.Conversation", {
        startConversation: startConversation
    });
})();