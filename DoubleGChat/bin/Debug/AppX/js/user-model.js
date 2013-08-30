(function () {
    "use strict";

    var User = WinJS.Class.define(function (id, username, passwordHash, firstName, lastName, profilePictureUrl, sessionKey) {
        this.id = id;
        this.username = username;
        this.passwordHash = passwordHash;
        this.firstName = firstName;
        this.lastName = lastName;
        this.profilePictureUrl = profilePictureUrl;
        this.sessionKey = sessionKey;
    }, null, {
        define: function (parameters) {
            return new User(
                parameters.id,
                parameters.username,
                parameters.passwordHash,
                parameters.firstName,
                parameters.lastName,
                parameters.profilePictureUrl,
                parameters.sessionKey
            );
        }
    });

    WinJS.Namespace.define("DoubleGChat.Models", {
        User: User
    });
}());