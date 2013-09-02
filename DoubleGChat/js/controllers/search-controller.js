(function () {
    "use strict";
    
    var viewModel = DoubleGChat.ViewModels.Search;
    var dataLayer = DoubleGChat.Data.Search;

    var getUsersErrorHandler = function (error) {
        console.log(error);
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
