(function () {
    "use strict";

    var getFriends = function () {
        //DoubleGChat.ViewModels.Contacts.allContacts.dataSource.list
        //    .splice(0, DoubleGChat.ViewModels.Contacts.allContacts.dataSource.list.length);
        DoubleGChat.Data.Contacts.getFriends()
        .done(DoubleGChat.ViewModels.Contacts.setContacts,
        function (data) {
            console.log(data);
        });
    };

    WinJS.Namespace.define("DoubleGChat.Controllers.Contacts", {
        getFriends: getFriends
    });
})();