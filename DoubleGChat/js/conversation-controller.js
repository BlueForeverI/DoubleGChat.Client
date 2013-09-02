(function () {
    "use strict";

    var startConversation = function (parnerId) {
        return new WinJS.Promise(function (success, error, progress) {
            DoubleGChat.Data.Conversation.startConversation(parnerId)
            .then(function (conversation) {
                DoubleGChat.ViewModels.Conversation.currentConversation = conversation;
                var user = DoubleGChat.Controllers.User.getUserCredentials();
                var partner = (conversation.firstUser.username == user.username)
                    ? conversation.secondUser : conversation.firstUser;
                DoubleGChat.ViewModels.Conversation.setPartner(partner);
                DoubleGChat.ViewModels.Conversation.setMessages(conversation.messages);
                success();
            });
        });
    };

    WinJS.Namespace.define("DoubleGChat.Controllers.Conversation", {
        startConversation: startConversation
    });
})();