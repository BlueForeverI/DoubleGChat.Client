(function () {
    "use strict";

    var contactsUrl = DoubleGChat.Constants.baseUrl + "contacts/";
    var user = DoubleGChat.Data.User.getUserCredentials();

    var getContactRequests = function () {
        var requestContactUrl = contactsUrl + "requests";
        DoubleGChat.RemoteData.sendRequest(requestContactUrl, "get", null, user.sessionKey)
        .done(function (response) {
            var data = JSON.parse(response.response);
            data.forEach(function (item) {
                DoubleGChat.ViewModels.Contacts.allContacts.push(item);
            });
        }, function (response) {
            var data = JSON.parse(response.response);
            console.log(data);
        });
    }

    var sendContactRequest = function (userId) {
        var sendContactUrl = contactsUrl + "add/" + userId;
        DoubleGChat.RemoteData.sendRequest(sendContactUrl, "get", null, user.sessionKey)
        .done(function (response) {
            var data = JSON.parse(response.response);
        }, function (response) {
            var data = JSON.parse(response.response);
            console.log(data);
        });
    }

    var acceptContactRequest = function (requestId) {
        var acceptContactUrl = contactsUrl + "accept/" + requestId;
        DoubleGChat.RemoteData.sendRequest(acceptContactUrl, "get", null, user.sessionKey)
        .done(function (response) {
            var data = JSON.parse(response.response);
            //TODO
        }, function (response) {
            var data = JSON.parse(response.response);
            console.log(data);
        });
    }

    var denyContactRequest = function (requestId) {
        var denyContactUrl = contactsUrl + "deny/" + requestId;
        DoubleGChat.RemoteData.sendRequest(denyContactUrl, "get", null, user.sessionKey)
        .done(function (response) {
            var data = JSON.parse(response.response);
            //TODO
        }, function (response) {
            var data = JSON.parse(response.response);
            console.log(data);
        });
    }

    WinJS.Namespace.define("DoubleGChat.Controllers.Contacts", {
        sendContactRequest: sendContactRequest
    });
})();