// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/profile-settings/profile-settings.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            var firstName = document.getElementById("first-name");
            var lastName = document.getElementById("last-name");
            var saveButton = document.getElementById("save-settings");
            
            var userInfo = DoubleGChat.Controllers.User.getUserCredentials();
            firstName.value = userInfo.firstName;
            lastName.value = userInfo.lastName;

            saveButton.addEventListener("click", function() {
                // TODO : send update information to service
            });
        },

        unload: function () {
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

        }
    });
})();
