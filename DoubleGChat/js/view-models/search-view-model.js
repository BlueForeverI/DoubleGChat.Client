(function () {
    "use strict";

    var foundUsers = new WinJS.Binding.List([], { binding: true });
    var foundFriendUsers = new WinJS.Binding.List([], { binding: true });

    var setUsers = function(users) {
        var count = foundUsers.dataSource.list.length;
        foundUsers.dataSource.list.splice(0, count);
        users.forEach(function (foundUser) {
            DoubleGChat.ViewModels.Search.foundUsers.push(foundUser);
        });
    };

    WinJS.Namespace.define("DoubleGChat.ViewModels.Search", {
        foundUsers: foundUsers,
        foundFriendUsers: foundFriendUsers,
        setUsers:setUsers
    });
})();
