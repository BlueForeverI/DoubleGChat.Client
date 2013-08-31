// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/login/login.html", {
        init: function (element, options) {

        },
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            var loginButton = document.getElementById("login");
            loginButton.addEventListener("click", loginHandler);
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

    var loginHandler = function (event) {
        var userName = document.getElementById("username");
        var password = document.getElementById("password");
        var passwordHash = CryptoJS.SHA1(password.value).toString();

        var user = DoubleGChat.Models.User.define({ username: userName.value, passwordHash: passwordHash });
        DoubleGChat.Controllers.User.login(user)
            .done(function () {
                WinJS.Navigation.navigate("/pages/contacts/contacts.html");
            }, function (reponse) {
                //TODO: ViewModel
            });
    };

})();
