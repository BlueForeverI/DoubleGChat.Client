(function () {
    "use strict";

    var requestCount = { requestCount: 0 };
    var contactRequests = new WinJS.Binding.List([]);
    var newConversations = new WinJS.Binding.List([]);
    var contactRequestsCount = WinJS.Binding.as(requestCount);
    var missedConversations = WinJS.Binding.as({ count: 0 });

    var setContactRequests = function (requests) {
        requests.forEach(function (request) {
            contactRequests.push(request);
        });
    };

    var emptyContactRequestsList = function () {
        contactRequests.dataSource.list
            .splice(0, contactRequests.dataSource.list.length);
    };

    var setContactRequestsCount = function (count) {
        contactRequestsCount.requestCount = count;
    }
    
    var setMissedConversationsCount = function (count) {
        missedConversations.count = count;
    };

    WinJS.Namespace.define("DoubleGChat.ViewModels.Global", {
        contactRequests: contactRequests,
        newConversations: newConversations,
        contactRequestsCount: contactRequestsCount,
        setContactRequests: setContactRequests,
        emptyContactRequestsList: emptyContactRequestsList,
        setContactRequestsCount: setContactRequestsCount,
        missedConversations: missedConversations,
        setMissedConversationsCount: setMissedConversationsCount
    });
}());