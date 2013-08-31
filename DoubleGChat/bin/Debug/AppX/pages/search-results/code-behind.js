(function () {
    "use strict";

    var selectUser = function (invokeEvent) {
        WinJS.Navigation.navigate("/pages/conversation/conversation.html", {
            userId: invokeEvent.detail.id
        });
    }

    WinJS.Utilities.markSupportedForProcessing(selectUser);

    WinJS.Namespace.define("DoubleGChat.CodeBehind.Search", {
        selectUser: selectUser
    });
})();