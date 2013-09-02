(function () {
    "use strict";

    var currentConversation = {};
    var messagesList = new WinJS.Binding.List([]);
    var partner = WinJS.Binding.as({ username: '', profilePictureUrl: '' });

    var setMessages = function (messages, append) {
        clearMessagesList();
        messages.forEach(function (message) {
            messagesList.push(message);
        });
    };

    var appedMessages = function(messages) {
        var startIndex = messagesList.dataSource.list.length;
        if (startIndex < messages.length) {
            for (var i = startIndex; i < messages.length; i++) {
                messagesList.push(messages[i]);
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

    WinJS.Namespace.define("DoubleGChat.ViewModels.Conversation", {
        currentConversation: currentConversation,
        partner: partner,
        messages: messagesList,
        setMessages: setMessages,
        appendMessages: appedMessages,
        setPartner: setPartner,
        clearMessagesList: clearMessagesList
    });
})();