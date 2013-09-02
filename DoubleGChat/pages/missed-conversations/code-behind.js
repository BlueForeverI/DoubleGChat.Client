(function () {
    "use strict";

    var openConversation = function (invokeEvent) {
        invokeEvent.detail.itemPromise.then(function (contact) {
            DoubleGChat.Controllers.Conversation.markReadMissedConversations(contact.data.id)
            .then(function () {
                WinJS.Navigation.navigate("/pages/conversation/conversation.html", {
                    username: contact.data.username
                });
            });
        });
    }

    WinJS.Utilities.markSupportedForProcessing(openConversation);

    WinJS.Namespace.define("DoubleGChat.CodeBehind.MissedConversations", {
        goToConversationPage: openConversation
    });
})();