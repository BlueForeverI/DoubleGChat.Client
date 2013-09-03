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
        contactRequestsCount.requestCount = 0;
    };

    var resetMissedConversations = function () {
        missedConversations.count = 0;
    };

    var setContactRequestsCount = function (count) {
        contactRequestsCount.requestCount = count;
    };

    var setMissedConversationsCount = function (count) {
        missedConversations.count = count;
    };

    var requestCountToVisibility = new WinJS.Binding.converter(function (count) {
        return count > 0 ? "inline-block" : "none";
    });

    WinJS.Namespace.define("DoubleGChat.ViewModels.Global", {
        contactRequests: contactRequests,
        newConversations: newConversations,
        contactRequestsCount: contactRequestsCount,
        setContactRequests: setContactRequests,
        emptyContactRequestsList: emptyContactRequestsList,
        setContactRequestsCount: setContactRequestsCount,
        missedConversations: missedConversations,
        setMissedConversationsCount: setMissedConversationsCount,
        resetMissedConversations: resetMissedConversations,
        requestCountToVisibility: requestCountToVisibility
    });
}());