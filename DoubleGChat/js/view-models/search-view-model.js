(function () {
    "use strict";

    var foundUsers = new WinJS.Binding.List([], { binding: true });
    var foundFriendUsers = new WinJS.Binding.List([], { binding: true });

    var setUsers = function (users) {
        users.forEach(function (foundUser) {
            foundUsers.push(foundUser);
        });
    };

    var emptyUsersList = function () {
        var count = foundUsers.dataSource.list.length;
        foundUsers.dataSource.list.splice(0, count);
    };

    WinJS.Namespace.define("DoubleGChat.ViewModels.Search", {
        foundUsers: foundUsers,
        foundFriendUsers: foundFriendUsers,
        setUsers: setUsers,
        emptyUsersList: emptyUsersList
    });
})();
