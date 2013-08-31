(function () {
    "use strict";

    var foundUsers = new WinJS.Binding.List([], { binding: true });
    var foundFriendUsers = new WinJS.Binding.List([], { binding: true });

    WinJS.Namespace.define("DoubleGChat.ViewModels.Search", {
        foundUsers: foundUsers,
        foundFriendUsers: foundFriendUsers
    });
})();
