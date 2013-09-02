(function () {
    "use strict";

    var sendMessageHandler = function () {
        var messageElement = document.getElementById("message-content-text");
        DoubleGChat.Controllers.Conversation.sendMessage(messageElement.value);
        messageElement.value = "";
    };

    WinJS.Namespace.define("DoubleGChat.CodeBehind.Conversation", {
        sendMessage: sendMessageHandler
    });
})();