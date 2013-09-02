(function () {
    "use strict";

    var openConversation = function (invokeEvent) {
        invokeEvent.detail.itemPromise.then(function (contact) {
            WinJS.Navigation.navigate("/pages/conversation/conversation.html", {
                username: contact.data.username
            });
        });
    }

    WinJS.Utilities.markSupportedForProcessing(openConversation);

    WinJS.Namespace.define("DoubleGChat.CodeBehind.Contacts", {
        goToConversationPage: openConversation
    });
})();