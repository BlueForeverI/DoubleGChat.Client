(function () {
    "use strict";

    var viewModel = DoubleGChat.ViewModels.Contacts;
    var dataLayer = DoubleGChat.Data.Contacts;

    var errorHandling = function (data) {
        console.log(data);
    };

    var getFriends = function () {
        viewModel.emptyContactsList();
        dataLayer.getFriends().then(viewModel.setContacts, errorHandling);
    };

    WinJS.Namespace.define("DoubleGChat.Controllers.Contacts", {
        getFriends: getFriends
    });
})();