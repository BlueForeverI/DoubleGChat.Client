/// <reference path="../constants.js" />
/// <reference path="../data-requester.js" />
/// <reference path="../user-controller.js" />
(function () {
    "use strict";

    var conversationUrl = DoubleGChat.Constants.baseUrl + "conversations/";

    var startConversation = function (username) {
        var startUrl = conversationUrl + "start";
        var otherUser = { username: username };
        var user = DoubleGChat.Data.User.getUserCredentials();
        return new WinJS.Promise(function (success, error, progress) {
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

    var getMessages = function (conversationId) {
        var messagesUrl = DoubleGChat.Constants.baseUrl + "messages/byconversation/" + conversationId;
        var user = DoubleGChat.Data.User.getUserCredentials();
        return new WinJS.Promise(function (success, error, progress) {
            DoubleGChat.RemoteData.sendRequest(messagesUrl, "get", null, user.sessionKey)
                .then(function (data) {
                    var messages = JSON.parse(data.response);
                    success(messages);
                }, function (data) {
                    var jsonData = JSON.parse(data.response);
                    error(jsonData);
                });
        });
    };

    var sendMessage = function (content, conversationId) {
        var sendMessageUrl = DoubleGChat.Constants.baseUrl + "messages/send";
        var user = DoubleGChat.Data.User.getUserCredentials();
        return new WinJS.Promise(function (success, error, progress) {
            DoubleGChat.RemoteData.sendRequest(sendMessageUrl, "post", {
                content: content,
                sender: user,
                conversation: { id: conversationId }
            }, user.sessionKey)
            .then(success, function (data) {
                var jsonData = JSON.parse(data.response);
                error(jsonData);
            });
        });
    };

    var getMissedConversations = function (conversationId) {
        var missedUrl = conversationUrl + "missed/" + conversationId;
        var user = DoubleGChat.Data.User.getUserCredentials();
        return new WinJS.Promise(function (success, error, progress) {
            DoubleGChat.RemoteData.sendRequest(missedUrl, "get", null, user.sessionKey)
                .then(function (data) {
                    var jsonData = JSON.parse(data.response);
                    success(jsonData);
                }, function (data) {
                    var jsonData = JSON.parse(data.response);
                    error(jsonData);
                });
        });
    };

    var markReadMissedConversations = function (id) {
        var missedUrl = conversationUrl + "markread/" + id;
        var user = DoubleGChat.Data.User.getUserCredentials();
        return new WinJS.Promise(function (success, error, progress) {
            DoubleGChat.RemoteData.sendRequest(missedUrl, "get", null, user.sessionKey)
                .then(success, function (data) {
                    var jsonData = JSON.parse(data.response);
                    error(jsonData);
                });
        });
    };

    WinJS.Namespace.define("DoubleGChat.Data.Conversation", {
        startConversation: startConversation,
        getMessages: getMessages,
        sendMessage: sendMessage,
        getMissedConversations: getMissedConversations,
        markReadMissedConversations: markReadMissedConversations
    });
})();