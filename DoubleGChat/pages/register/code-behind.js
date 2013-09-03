(function () {
    "use strict";

    var registerHandler = function (event) {
        var userName = document.getElementById("username");
        var password = document.getElementById("password");
        var firstName = document.getElementById("first-name");
        var lastName = document.getElementById("last-name");
        var profilePictureContainer = document.getElementById("profile-image-container");
        var profilePictureUrl = profilePictureContainer.getAttribute("src");

        var user = DoubleGChat.Models.User.define({
            username: userName.value,
            passwordHash: password.value,
            firstName: firstName.value,
            lastName: lastName.value,
            profilePictureUrl: profilePictureUrl
        });

        DoubleGChat.Controllers.User.register(user)
        .done(function (userDetails) {
            WinJS.Navigation.navigate("/pages/contacts/contacts.html");
        });
    };

    var uploadImage = function (storageFile) {
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

    var addPictureHandler = (function (event) {


        var menu = document.getElementById("picture-menu-id").winControl;
        menu.show();

        var fromFileButton = document.getElementById("from-file-button");
        var fromCameraButton = document.getElementById("from-camera-button");

        fromFileButton.addEventListener("click", function (ev) {
            var picker = Windows.Storage.Pickers.FileOpenPicker();
            picker.fileTypeFilter.push(".jpg");
            picker.fileTypeFilter.push(".jpeg");
            picker.fileTypeFilter.push(".png");

            picker.pickSingleFileAsync().then(function (storageFile) {
                if (storageFile) {
                    var container = document.getElementById("profile-image-container");
                    container.setAttribute("src", "../../images/loading.gif");

                    uploadImage(storageFile).then(function (url) {
                        container.setAttribute("src", url);
                    });
                }
            });
        });

        fromCameraButton.addEventListener("click", function (ev) {
            var captureUI = new Windows.Media.Capture.CameraCaptureUI();
            captureUI.captureFileAsync(Windows.Media.Capture.CameraCaptureUIMode.photo).then(function (capturedItem) {
                if (capturedItem) {
                    var container = document.getElementById("profile-image-container");
                    container.setAttribute("src", "../../images/loading.gif");

                    uploadImage(capturedItem).then(function (url) {
                        container.setAttribute("src", url);
                    });
                }
            });
        });
    });

    WinJS.Namespace.define("DoubleGChat.CodeBehind.UserRegister", {
        register: registerHandler,
        addPicture: addPictureHandler
    });
})();
