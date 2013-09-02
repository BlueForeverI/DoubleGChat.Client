/// <reference path="notifications.js" />
/// <reference path="pubnub.js" />
(function () {
    "use strict";

    var dataLayer = DoubleGChat.Data.Conversation;
    var viewModel = DoubleGChat.ViewModels.Conversation;

    var startConversation = function (parnerId) {
        viewModel.clearMessagesList();
        return new WinJS.Promise(function (success, error, progress) {
            dataLayer.startConversation(parnerId)
            .then(function (conversation) {
                DoubleGChat.Notifications.addChannel(conversation.id, getMessages);

                viewModel.currentConversation = conversation;
                var user = DoubleGChat.Controllers.User.getUserCredentials();
                var partner = (conversation.firstUser.username == user.username)
                    ? conversation.secondUser : conversation.firstUser;
                viewModel.setPartner(partner);
                getMessages();
                success();
            });
        });
    };

    var sendMessage = function (content) {
        var conversationId = viewModel.currentConversation.id;
        dataLayer.sendMessage(content, conversationId)
        .then(function () {
            DoubleGChat.Notifications.publish(conversationId, conversationId);
        });
    };

    var getMessages = function () {
        var conversationId = viewModel.currentConversation.id;
        dataLayer.getMessages(conversationId)
            .then(function (messages) {
                viewModel.setMessages(messages);
            }, function (error) {
                console.log(error);
            });
    };

    WinJS.Namespace.define("DoubleGChat.Controllers.Conversation", {
        startConversation: startConversation,
        sendMessage: sendMessage,
        getMessages: getMessages
    });
})();