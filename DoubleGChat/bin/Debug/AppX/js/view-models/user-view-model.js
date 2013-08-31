(function () {
    "use strict";

    var viewModel = WinJS.Binding.as({
        errorMessage: ""
    });

    WinJS.Namespace.define("DoubleGChat.ViewModels", {
        User: viewModel
    });
})();