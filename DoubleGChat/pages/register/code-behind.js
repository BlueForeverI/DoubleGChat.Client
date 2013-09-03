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

    var addPictureHandler = (function (event) {
        var menu = document.getElementById("picture-menu-id").winControl;
        menu.show();
    });

    var filePicker = function () {
        var controller = DoubleGChat.Controllers.User;
        controller.pickPicture()
        .then(function (storageFile) {
            var container = document.getElementById("profile-image-container");
            container.setAttribute("src", "../../images/loading.gif");

            controller.uploadPicture(storageFile).then(function (url) {
                container.setAttribute("src", url);
            });
        });
    };

    var cameraPicker = function () {
        var controller = DoubleGChat.Controllers.User;
        controller.takePicture().then(function (capturedItem) {
            var container = document.getElementById("profile-image-container");
            container.setAttribute("src", "../../images/loading.gif");

            controller.uploadPicture(capturedItem).then(function (url) {
                container.setAttribute("src", url);
            });
        });
    };

    WinJS.Namespace.define("DoubleGChat.CodeBehind.UserRegister", {
        register: registerHandler,
        addPicture: addPictureHandler,
        filePicker: filePicker,
        cameraPicker: cameraPicker
    });
})();
