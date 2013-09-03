(function () {
    "use strict";
    
    var viewModel = DoubleGChat.ViewModels.Search;
    var dataLayer = DoubleGChat.Data.Search;
    var errorMessage = "There was a problem with the Internet connection.";

    var getUsersErrorHandler = function (error) {
        if (!error) {
            DoubleGChat.Notifications.show(errorMessage);
        }
    };

    var getUsersByQueryText = function (queryText) {
        viewModel.emptyUsersList();
        dataLayer.getUsersByQueryText(queryText)
            .then(viewModel.setUsers, getUsersErrorHandler);
    };

    WinJS.Namespace.define("DoubleGChat.Controllers.Search", {
        getUsersByQueryText: getUsersByQueryText
    });
})();
