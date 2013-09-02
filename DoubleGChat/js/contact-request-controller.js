(function () {
    "use strict";

    var getContactRequests = function () {
        DoubleGChat.ViewModels.Global.contactRequests.dataSource.list
            .splice(0, DoubleGChat.ViewModels.Global.contactRequests.dataSource.list.length);
        return new WinJS.Promise(function (success, error, progress) {
            DoubleGChat.Data.Contacts.getContactRequests()
            .done(function (data) {
                data.forEach(function (item) {
                    DoubleGChat.ViewModels.Global.contactRequests.push(item);
                });
                success();
            }, function (data) {
                error(data);
            }, progress);
        });
    };

    var getContactRequestsCount = function () {
        return new WinJS.Promise(function (success, error, progress) {
            DoubleGChat.Data.Contacts.getContactRequests()
            .done(function (data) {
                DoubleGChat.ViewModels.Global.contactRequestsCount.requestCount = data.length;
            }, function (data) {
                error(data);
            }, progress);
        });
    };

    var sendContactRequest = function (userId) {
        return new WinJS.Promise(function (success, error, progress) {
            DoubleGChat.Data.Contacts.sendContactRequest(userId)
            .done(success, function (data) {
                error(data);
            }, progress);
        });
    };

    var acceptContactRequest = function (requestId) {
        return new WinJS.Promise(function (success, error, progress) {
            DoubleGChat.Data.Contacts.acceptContactRequest(requestId)
            .then(success, function (data) {
                error(data);
            }, progress);
        });
    };

    var denyContactRequest = function (requestId) {
        return new WinJS.Promise(function (success, error, progress) {
            DoubleGChat.Data.Contacts.acceptContactRequest(requestId)
            .done(success, function (data) {
                error(data);
            }, progress);
        });
    };

    setInterval(function () {
        if (DoubleGChat.Data.User.getUserCredentials()) {
            getContactRequestsCount();
        }
    }, 1000);

    WinJS.Namespace.define("DoubleGChat.Controllers.ContactsRequests", {
        sendContactRequest: sendContactRequest,
        acceptContactRequest: acceptContactRequest,
        denyContactRequest: denyContactRequest,
        getContactRequests: getContactRequests
    });
})();