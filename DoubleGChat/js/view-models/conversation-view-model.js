(function () {
    "use strict";

    var getPartner = function () {
        //var user = DoubleGChat.Controllers.User.getUserCredentials();
        //var partner = (currentConversation.firstUser.username == user.username)
        //    ? currentConversation.secondUser : currentConversation.firstUser;
        //return partner;
        return { username: "Gosho", profilePictureUrl: "https://fbcdn-sphotos-g-a.akamaihd.net/hphotos-ak-ash2/217987_486662088011952_178478050_n.jpg" };
    };
    
    var currentConversation = { };
    var messagesList = new WinJS.Binding.List([]);
    var partner = WinJS.Binding.as(getPartner());

    var setMessages = function(messages) {
        var count = messagesList.dataSource.list.length;
        messagesList.dataSource.list.splice(0, count);
        messages.forEach(function (message) {
            messagesList.push(message);
        });
    };


    WinJS.Namespace.define("DoubleGChat.ViewModels.Conversation", {
        currentConversation: currentConversation,
        partner: partner,
        messages: messagesList,
        setMessages: setMessages
    });
})();