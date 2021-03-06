﻿(function () {
    "use strict";
    
    var enterHandler = function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            sendMessageHandler(event);
        }
    };

    var sendMessageHandler = function () {
        var messageElement = document.getElementById("message-content-text");
        DoubleGChat.Controllers.Conversation.sendMessage(messageElement.value);
        messageElement.value = "";
    };

    WinJS.Namespace.define("DoubleGChat.CodeBehind.Conversation", {
        sendMessage: sendMessageHandler,
        keydown: enterHandler
    });
})();