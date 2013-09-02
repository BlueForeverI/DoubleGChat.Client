(function () {
    "use strict";

    var sendMessageHandler = function () {
        var messageContent = document.getElementById("message-content-text").value;
        DoubleGChat.Controllers.Conversation.sendMessage(messageContent);
    };

    WinJS.Namespace.define("DoubleGChat.CodeBehind.Conversation", {
        sendMessage: sendMessageHandler
    });
})();