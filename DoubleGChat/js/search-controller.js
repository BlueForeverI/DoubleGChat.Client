(function () {
    "use strict";
    
    var getUsersByQueryText = function(queryText) {
        return new WinJS.Promise(function(success, error, progress) {
            DoubleGChat.Data.Search.getUsersByQueryText(queryText)
                .then(function (userDetails) {
                    DoubleGChat.ViewModels.Search.setUsers(userDetails);
                    success();
                }, function(response) {
                    console.log(response);
                }, progress);
        });
    };

    WinJS.Namespace.define("DoubleGChat.Controllers.Search", {
        getUsersByQueryText: getUsersByQueryText
    });
})();
