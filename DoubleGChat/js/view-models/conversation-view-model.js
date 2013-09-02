﻿(function () {
    "use strict";

    var currentConversation = {};
    var messagesList = new WinJS.Binding.List([]);
    var partner = WinJS.Binding.as({ username: '', profilePictureUrl: '' });

    var setMessages = function (messages) {
        clearMessagesList();
        messages.forEach(function (message) {
            messagesList.push(message);
        });
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
        setPartner: setPartner,
        clearMessagesList: clearMessagesList
    });
})();