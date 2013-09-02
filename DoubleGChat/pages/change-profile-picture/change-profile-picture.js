// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/change-profile-picture/change-profile-picture.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            var userInfo = DoubleGChat.Controllers.User.getUserCredentials();
            
            var currentPicture = document.getElementById("current-picture");
            currentPicture.setAttribute("src", userInfo.profilePictureUrl);
            var fromFileButton = document.getElementById("from-file-button");
            var fromCameraButton = document.getElementById("from-camera-button");

            fromFileButton.addEventListener("click", function (ev) {
                var picker = Windows.Storage.Pickers.FileOpenPicker();
                picker.fileTypeFilter.push(".jpg");
                picker.fileTypeFilter.push(".png");

                picker.pickSingleFileAsync().then(function (storageFile) {
                    if (storageFile) {
                        uploadImage(storageFile).then(function (url) {
                            changeProfilePicture(url);
                        });
                    }
                });
            });

            fromCameraButton.addEventListener("click", function (ev) {
                var captureUI = new Windows.Media.Capture.CameraCaptureUI();
                captureUI.captureFileAsync(Windows.Media.Capture.CameraCaptureUIMode.photo).then(function (capturedItem) {
                    if (capturedItem) {
                        uploadImage(capturedItem).then(function (url) {
                            changeProfilePicture(url);
                        });
                    }
                });
            });
            
            function uploadImage(storageFile) {
                return new WinJS.Promise(function (success) {
                    var file = MSApp.createFileFromStorageFile(storageFile);

                    if (!file || !file.type.match(/image.*/)) {
                        return;
                    }

                    var fd = new FormData();
                    fd.append("image", file);
                    fd.append("key", "6528448c258cff474ca9701c5bab6927");
                    var xhr = new XMLHttpRequest();
                    xhr.open("POST", "http://api.imgur.com/2/upload.json");

                    xhr.onload = function () {
                        var imgUrl = JSON.parse(xhr.responseText).upload.links.imgur_page + ".jpg";
                        success(imgUrl);
                    };

                    xhr.send(fd);
                });
            };

            function changeProfilePicture(profilePictureUrl) {
                var editUserObject = {
                    firstName:  null,
                    lastName: null,
                    oldPasswordHash: null,
                    newPasswordHash: null,
                    profilePictureUrl: profilePictureUrl
                };
                
                var editUrl = DoubleGChat.Constants.baseUrl + "users/edit";
                DoubleGChat.RemoteData.sendRequest(editUrl, "post", editUserObject, userInfo.sessionKey)
                    .done(function (userDetails) {
                        var user = JSON.parse(userDetails.responseText);
                        DoubleGChat.Data.User.saveUserCredentials(user);
                        DoubleGChat.Notifications.show("Profile picture changed successfuly!");
                    }, function (error) {
                        DoubleGChat.Notifications.show(error);
                    });
            }
        },

        unload: function () {
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

        }
    });
})();
