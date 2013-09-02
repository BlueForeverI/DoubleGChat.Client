(function () {
    "use strict";

    var currentConversation = {};
    var messagesList = new WinJS.Binding.List([]);
    var partner = WinJS.Binding.as({ username: '', profilePictureUrl: '' });
    var missedConversations = new WinJS.Binding.List([]);

    var setMessages = function (messages) {
        clearMessagesList();
        messages.forEach(function (message) {
            var messageView = message;
            var className = (message.sender.username == partner.username) ? "partner" : "user";
            messageView.className = className;
            messagesList.push(messageView);
        });
    };

    var appedMessages = function (messages) {
        var startIndex = messagesList.dataSource.list.length;
        if (startIndex < messages.length) {
            for (var i = startIndex; i < messages.length; i++) {
                var messageView = messages[i];
                var className = (messages[i].sender.username == partner.username) ? "partner" : "user";
                messageView.className = className;
                messagesList.push(messageView);
            }
        }
    };

    var clearMessagesList = function () {
        var count = messagesList.dataSource.list.length;
        messagesList.dataSource.list.splice(0, count);
    };

    var setPartner = function (user) {
        partner.username = user.username;
        partner.profilePictureUrl = user.profilePictureUrl;
    };

    var setMissedConversations = function (conversations) {
        conversations.forEach(function (conversation) {
            missedConversations.push(conversation);
        });
    };

    var clearMissedConversations = function () {
        var count = missedConversations.dataSource.list.length;
        missedConversations.dataSource.list.splice(0, count);
    };

    var dateFormatter = WinJS.Binding.converter(function (dateString) {
        var date = new Date(dateString);
        return date.toLocaleTimeString();
    });

    WinJS.Namespace.define("DoubleGChat.ViewModels.Conversation", {
        currentConversation: currentConversation,
        partner: partner,
        messages: messagesList,
        setMessages: setMessages,
        appendMessages: appedMessages,
        setPartner: setPartner,
        clearMessagesList: clearMessagesList,
        missedConversations: missedConversations,
        setMissedConversations: setMissedConversations,
        clearMissedConversations: clearMissedConversations,
        dateFormatter: dateFormatter
    });
})();