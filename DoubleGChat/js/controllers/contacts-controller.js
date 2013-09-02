(function () {
    "use strict";

    var viewModel = DoubleGChat.ViewModels.Contacts;
    var dataLayer = DoubleGChat.Data.Contacts;

    var errorHandling = function (data) {
        console.log(data);
    };

    var updateFriends = function () {
        dataLayer.getFriends().then(viewModel.changeContacts, errorHandling);
    };

    var getFriends = function () {
        viewModel.emptyContactsList();
        updateFriends();
    };

    var clearFriendList = function () {
        viewModel.emptyContactsList();
    };

    setInterval(function () {
        if (DoubleGChat.Data.User.getUserCredentials()) {
            try {
                updateFriends();
            } catch (e) { }
        }
    }, 1500);

    WinJS.Namespace.define("DoubleGChat.Controllers.Contacts", {
        getFriends: getFriends,
        clearFriendList: clearFriendList
    });
})();