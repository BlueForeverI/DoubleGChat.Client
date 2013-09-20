(function () {
    "use strict";

    var selectUser = function () {
        var appBarElement = document.getElementById("app-bar");
        var appBar = appBarElement.winControl;
        appBar.show();
    }

    var acceptContact = function () {
        var listView = document.getElementById("contact-requests-list-view").winControl;
        listView.selection.getItems().then(function (items) {
            if (items.length == 1) {
                var currentRequest = items[0].data;
                DoubleGChat.Controllers.ContactsRequests.acceptContactRequest(currentRequest.id)
                    .then(function() {
                        DoubleGChat.CodeBehind.Default.navigateToContacts();
                    });
            }
        });
    };

    var cancelContact = function () {
        var listView = document.getElementById("contact-requests-list-view").winControl;
        listView.selection.getItems().then(function (items) {
            if (items.length == 1) {
                var currentRequest = items[0].data;
                DoubleGChat.Controllers.ContactsRequests.denyContactRequest(currentRequest.id)
                    .then(function () {
                        DoubleGChat.CodeBehind.Default.navigateToContacts();
                    });
            }
        });
    };

    WinJS.Utilities.markSupportedForProcessing(acceptContact);
    WinJS.Utilities.markSupportedForProcessing(cancelContact);
    WinJS.Utilities.markSupportedForProcessing(selectUser);

    WinJS.Namespace.define("DoubleGChat.CodeBehind.ContactRequests", {
        selectUser: selectUser,
        acceptContact: acceptContact,
        cancelContact: cancelContact
    });
})();