(function () {
    "use strict";

    var selectUser = function (invokeEvent) {
        var appBarElement = document.getElementById("app-bar");
        var appBar = appBarElement.winControl;
        appBar.show();
    }

    var addContact = function (event) {
        var listView = document.getElementById("search-results-list-view").winControl;
        listView.selection.getItems().then(function (items) {
            var currentUser = items[0].data;
            DoubleGChat.Controllers.Contacts.sendContactRequest(currentUser.id);
        });
    };

    WinJS.Utilities.markSupportedForProcessing(addContact);
    WinJS.Utilities.markSupportedForProcessing(selectUser);

    WinJS.Namespace.define("DoubleGChat.CodeBehind.Search", {
        selectUser: selectUser,
        addContact: addContact
    });
})();