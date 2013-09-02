﻿(function () {
    "use strict";

    var contactsUrl = DoubleGChat.Constants.baseUrl + "contacts/";

    var getFriends = function () {
        var allContactsUrl = contactsUrl + "all";
        var user = DoubleGChat.Data.User.getUserCredentials();
        return new WinJS.Promise(function (success, error, progress) {
            DoubleGChat.RemoteData.sendRequest(allContactsUrl, "get", null, user.sessionKey)
            .done(function (response) {
                var data = JSON.parse(response.response);
                success(data);
            }, function (response) {
                var data = JSON.parse(response.response);
                error(data);
            });
        });
    };

    var getContactRequests = function () {
        var requestContactUrl = contactsUrl + "requests";
        var user = DoubleGChat.Data.User.getUserCredentials();
        return new WinJS.Promise(function (success, error, progress) {
            DoubleGChat.RemoteData.sendRequest(requestContactUrl, "get", null, user.sessionKey)
            .then(function (response) {
                var data = JSON.parse(response.response);
                success(data);
            }, function (response) {
                var data = JSON.parse(response.response);
                error(data);
            });
        });
    };

    var sendContactRequest = function (userId) {
        var sendContactUrl = contactsUrl + "add/" + userId;
        var user = DoubleGChat.Data.User.getUserCredentials();
        return new WinJS.Promise(function (success, error, progress) {
            DoubleGChat.RemoteData.sendRequest(sendContactUrl, "get", null, user.sessionKey)
            .done(success, function (response) {
                var data = JSON.parse(response.response);
                error(data);
            });
        });
    };

    var acceptContactRequest = function (requestId) {
        var acceptContactUrl = contactsUrl + "accept/" + requestId;
        var user = DoubleGChat.Data.User.getUserCredentials();
        return new WinJS.Promise(function (success, error, progress) {
            DoubleGChat.RemoteData.sendRequest(acceptContactUrl, "get", null, user.sessionKey)
            .done(success, function (response) {
                var data = JSON.parse(response.response);
                error(data);
            });
        });
    };

    var denyContactRequest = function (requestId) {
        var denyContactUrl = contactsUrl + "deny/" + requestId;
        var user = DoubleGChat.Data.User.getUserCredentials();
        return new WinJS.Promise(function (success, error, progress) {
            DoubleGChat.RemoteData.sendRequest(denyContactUrl, "get", null, user.sessionKey)
            .done(success, function (response) {
                var data = JSON.parse(response.response);
                error(data);
            });
        });
    };

    WinJS.Namespace.define("DoubleGChat.Data.Contacts", {
        getFriends: getFriends,
        getContactRequests: getContactRequests,
        sendContactRequest: sendContactRequest,
        acceptContactRequest: acceptContactRequest,
        denyContactRequest: denyContactRequest
    });
})();