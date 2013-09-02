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

    var getMessages = function (append) {
        var conversationId = viewModel.currentConversation.id;
        dataLayer.getMessages(conversationId)
            .then(function (messages) {
                if(append) {
                    viewModel.appendMessages(messages);
                } else {
                    viewModel.setMessages(messages);
                }
            }, function (error) {
                console.log(error);
            });
    };

    var markReadMissedConversations = function (missedConversationId) {
        return new WinJS.Promise(function (success, error, progress) {
            dataLayer.markReadMissedConversations(missedConversationId)
                .then(success);
        });
    };

    var getMissedConversations = function () {
        viewModel.clearMissedConversations();
        return new WinJS.Promise(function (success, error, progress) {
            dataLayer.getMissedConversations()
                .then(function (conversations) {
                    viewModel.setMissedConversations(conversations);
                }, function (data) {
                    console.log(data);
                });
        });
    };
    
    var getMissedConversationsCount = function () {
        return new WinJS.Promise(function (success, error, progress) {
            dataLayer.getMissedConversations()
                .then(function (data) {
                    DoubleGChat.ViewModels.Global.setMissedConversationsCount(data.length);
                }, function (data) {
                    console.log(data);
                });
        });
    };

    setInterval(function () {
        if (DoubleGChat.Data.User.getUserCredentials()) {
            try {
                getMissedConversationsCount();
            } catch (e) { }
        }
    }, 1000);

    WinJS.Namespace.define("DoubleGChat.Controllers.Conversation", {
        startConversation: startConversation,
        sendMessage: sendMessage,
        getMessages: getMessages,
        getMissedConversations: getMissedConversations,
        markReadMissedConversations: markReadMissedConversations
    });
})();