(function () {
    "use strict";

    var goToConversationPage = function (invokeEvent) {
        WinJS.Navigation.navigate("/pages/conversation/conversation.html", {
            userId: invokeEvent.detail.id
        });
    }

    WinJS.Utilities.markSupportedForProcessing(goToConversationPage);

    WinJS.Namespace.define("DoubleGChat.CodeBehind.Contacts", {
        goToConversationPage: goToConversationPage
    });
})();