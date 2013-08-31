/// <reference path="../../js/sha1.js" />
// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/register/register.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            var registerButton = document.getElementById("register");
            registerButton.addEventListener("click", registerHandler);
            // TODO: Initialize the page here.
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in viewState.
        }
    });

    var registerHandler = function (event) {
        var userName = document.getElementById("username");
        var password = document.getElementById("password");
        var passwordHash = CryptoJS.SHA1(password.value).toString();
        var firstName = document.getElementById("first-name");

        var user = DoubleGChat.Models.User.define({ username: userName.value, passwordHash: passwordHash });
        DoubleGChat.Controllers.User.register(user)
        .done(function (userDetails) {
            console.log(userDetails);
        }, function (event) {
            console.log(event);
        });
    };
})();
