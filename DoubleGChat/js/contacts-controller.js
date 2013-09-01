(function () {
    "use strict";

    var contactsUrl = DoubleGChat.Constants.baseUrl + "contacts/";
    var user = DoubleGChat.Controllers.User.getUserCredentials();

    var getFriends = function () {
        DoubleGChat.RemoteData.sendRequest(contactsUrl, "get", null, user.sessionKey)
        .done(function (response) {
            var data = JSON.parse(response.response);
            data.forEach(function (item) {
                DoubleGChat.ViewModels.Contacts.allContacts.push(item);
            });
        }, function (response) {
            var data = JSON.parse(response.response);
            console.log(data);
        });
    }; 

    getFriends();
})();