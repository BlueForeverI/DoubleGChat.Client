(function () {
    "use strict";

    var contactRequests = new WinJS.Binding.List([]);
    var newConversations = new WinJS.Binding.List([]);

    WinJS.Namespace.define("DoubleGChat.ViewModels.Global", {
        contactRequests: contactRequests,
        newConversations: newConversations,
        contactRequestsCount: contactRequests.length
    });
}());