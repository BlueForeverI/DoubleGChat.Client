﻿// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/profile-settings/profile-settings.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            var firstName = document.getElementById("first-name");
            var lastName = document.getElementById("last-name");
            var oldPassword = document.getElementById("old-password");
            var newPassword = document.getElementById("new-password");
            var saveButton = document.getElementById("save-settings");
            
            var userInfo = DoubleGChat.Controllers.User.getUserCredentials();
            firstName.value = userInfo.firstName;
            lastName.value = userInfo.lastName;

            saveButton.addEventListener("click", function() {
                var firstNameValue = firstName.value;
                var lastNameValue = lastName.value;
                var oldPasswordValue = oldPassword.value;
                var newPaswordValue = newPassword.value;
                var oldPasswordHash = (oldPasswordValue) ? CryptoJS.SHA1(oldPasswordValue).toString() : null;
                var newPasswordHash = (newPaswordValue) ? CryptoJS.SHA1(newPaswordValue).toString() : null;

                var editUserObject = {
                    firstName: (firstNameValue) ? firstNameValue : null,
                    lastName: (lastNameValue) ? lastNameValue : null,
                    oldPasswordHash: oldPasswordHash,
                    newPasswordHash: newPasswordHash
                };

                var editUrl = DoubleGChat.Constants.baseUrl + "users/edit";
                DoubleGChat.RemoteData.sendRequest(editUrl, "post", editUserObject, userInfo.sessionKey)
                    .done(function (success) {
                        var x = 0;
                    }, function (error) {
                        var y = 0;
                    });
            });
        },

        unload: function () {
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

        }
    });
})();