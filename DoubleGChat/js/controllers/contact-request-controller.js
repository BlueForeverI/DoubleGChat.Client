(function () {
    "use strict";

    var globalViewModel = DoubleGChat.ViewModels.Global;
    var contactDataLayer = DoubleGChat.Data.Contacts;

    var getContactRequests = function () {
        globalViewModel.emptyContactRequestsList();
        return new WinJS.Promise(function (success, error, progress) {
            contactDataLayer.getContactRequests()
            .done(function (data) {
                globalViewModel.setContactRequests(data);
                success();
            }, function (data) {
                error(data);
            });
        });
    };

    var getContactRequestsCount = function () {
        return new WinJS.Promise(function (success, error, progress) {
            contactDataLayer.getContactRequests()
            .done(function (data) {
                globalViewModel.setContactRequestsCount(data.length);
            }, function (data) {
                console.log(data);
            });
        });
    };

    var sendContactRequest = function (userId) {
        return new WinJS.Promise(function (success, error, progress) {
            contactDataLayer.sendContactRequest(userId)
            .done(success, function (data) {
                error(data);
            });
        });
    };

    var acceptContactRequest = function (requestId) {
        return new WinJS.Promise(function (success, error, progress) {
            DoubleGChat.Data.Contacts.acceptContactRequest(requestId)
            .then(success, function (data) {
                error(data);
            });
        });
    };

    var denyContactRequest = function (requestId) {
        return new WinJS.Promise(function (success, error, progress) {
            DoubleGChat.Data.Contacts.acceptContactRequest(requestId)
            .done(success, function (data) {
                error(data);
            });
        });
    };

    setInterval(function () {
        if (DoubleGChat.Data.User.getUserCredentials()) {
            try {
                getContactRequestsCount();
            } catch (e) { }
        }
    }, 1000);

    WinJS.Namespace.define("DoubleGChat.Controllers.ContactsRequests", {
        sendContactRequest: sendContactRequest,
        acceptContactRequest: acceptContactRequest,
        denyContactRequest: denyContactRequest,
        getContactRequests: getContactRequests
    });
})();