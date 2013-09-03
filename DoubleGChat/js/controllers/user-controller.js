(function () {
    "use strict";

    var picker = Windows.Storage.Pickers.FileOpenPicker();
    var camera = new Windows.Media.Capture.CameraCaptureUI();
    var errorMessage = "There was a problem with the Internet connection.";

    var getUserCredentials = function () {
        return DoubleGChat.Data.User.getUserCredentials();
    };

    var loginWIthCurrentUserSession = function () {
        return DoubleGChat.Data.User.loginWithCurrentSession();
    };

    var login = function (user) {
        return new WinJS.Promise(function (success, error, progress) {
            DoubleGChat.Data.User.login(user)
            .then(function (userDetails) {
                success();
                DoubleGChat.ViewModels.User.errorMessage = "";
            }, function (text) {
                if (!text) {
                    DoubleGChat.Notifications.show(errorMessage);
                }

                DoubleGChat.ViewModels.User.errorMessage = text;
            });
        });
    };

    var clearNavigationHistory = function () {
        var historyStack = WinJS.Navigation.history.backStack;
        while (historyStack.length > 0) {
            historyStack.pop();
        }
    };

    var logout = function () {
        return new WinJS.Promise(function (success, error, progress) {
            DoubleGChat.Notifications.emptyChannelList();
            DoubleGChat.ViewModels.Global.emptyContactRequestsList();
            DoubleGChat.ViewModels.Global.resetMissedConversations();
            clearNavigationHistory();
            DoubleGChat.Data.User.logout()
            .then(success, function (text) {
                DoubleGChat.ViewModels.User.errorMessage = text;
            });
        });
    };

    var register = function (user) {
        return new WinJS.Promise(function (success, error, progress) {
            DoubleGChat.Data.User.register(user)
                .then(function () {
                    success();
                    DoubleGChat.ViewModels.User.errorMessage = "";
                }, function (text) {
                    if (!text) {
                        DoubleGChat.Notifications.show(errorMessage);
                    }

                    DoubleGChat.ViewModels.User.errorMessage = text;
                });
        });
    };

    var goOffline = function () {
        return DoubleGChat.Data.User.goOffline();
    };

    var pickPicture = function pickPicture() {
        picker.fileTypeFilter.push(".jpg");
        picker.fileTypeFilter.push(".jpeg");
        picker.fileTypeFilter.push(".png");
        return new WinJS.Promise(function (success, error, progress) {
            picker.pickSingleFileAsync().then(function (storageFile) {
                if (storageFile) {
                    success(storageFile);
                }
            }, error);
        });
    };

    var takePicture = function () {
        return new WinJS.Promise(function (success, error, progress) {
            camera.captureFileAsync(Windows.Media.Capture.CameraCaptureUIMode.photo).then(function (capturedItem) {
                if (capturedItem) {
                    success(capturedItem);
                }
            }, error);
        });
    };

    var uploadPicture = function (storageFile) {
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

    WinJS.Namespace.define("DoubleGChat.Controllers.User", {
        login: login,
        register: register,
        getUserCredentials: getUserCredentials,
        logout: logout,
        loginWIthCurrentUserSession: loginWIthCurrentUserSession,
        goOffline: goOffline,
        takePicture: takePicture,
        uploadPicture: uploadPicture,
        pickPicture: pickPicture
    });
}());