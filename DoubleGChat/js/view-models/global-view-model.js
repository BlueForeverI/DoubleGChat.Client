(function () {
    "use strict";

    var requestCount = { requestCount: 0 };
    var contactRequests = new WinJS.Binding.List([]);
    var newConversations = new WinJS.Binding.List([]);
    var contactRequestsCount = WinJS.Binding.as(requestCount);
    
    WinJS.Namespace.define("DoubleGChat.ViewModels.Global", {
        contactRequests: contactRequests,
        newConversations: newConversations,
        contactRequestsCount: contactRequestsCount
    });
}());