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
            var currentRequest = items[0].data;
            DoubleGChat.Controllers.ContactsRequests.acceptContactRequest(currentRequest.id)
            .then(function () {
                WinJS.Navigation.navigate("/pages/contacts/contacts.html");
            });
        });
    };

    var cancelContact = function () {
        var listView = document.getElementById("contact-requests-list-view").winControl;
        listView.selection.getItems().then(function (items) {
            var currentRequest = items[0].data;
            DoubleGChat.Controllers.ContactsRequests.denyContactRequest(currentRequest.id)
            .then(function () {
                WinJS.Navigation.navigate("/pages/contacts/contacts.html");
            });
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