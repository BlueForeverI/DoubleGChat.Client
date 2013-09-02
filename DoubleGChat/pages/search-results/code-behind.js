(function () {
    "use strict";

    var selectUser = function (event) {
        var appBarElement = document.getElementById("app-bar");
        var appBar = appBarElement.winControl;
        appBar.show();
    }

    var addContact = function (event) {
        var listView = document.getElementById("search-results-list-view").winControl;
        listView.selection.getItems().then(function (items) {
            var currentUser = items[0].data;
            DoubleGChat.Controllers.ContactsRequests.sendContactRequest(currentUser.id)
            .then(function () {
                WinJS.Navigation.navigate("/pages/contacts/contacts.html");
            });
        });
    };

    WinJS.Utilities.markSupportedForProcessing(addContact);
    WinJS.Utilities.markSupportedForProcessing(selectUser);

    WinJS.Namespace.define("DoubleGChat.CodeBehind.Search", {
        selectUser: selectUser,
        addContact: addContact
    });
})();