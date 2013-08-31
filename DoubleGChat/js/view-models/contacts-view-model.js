(function () {
    "use strict";

    var contacts = new WinJS.Binding.List([], {
        binding: true
    });

    WinJS.Namespace.define("DoubleGChat.ViewModels.Contacts", {
        allContacts: contacts
    });
})();