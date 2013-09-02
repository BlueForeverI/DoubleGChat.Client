(function () {
    "use strict";

    var allContacts = new WinJS.Binding.List([], { binding: true });
    
    var setContacts = function (contacts) {
        allContacts.dataSource.list.splice(0, allContacts.dataSource.list.length);
        contacts.forEach(function (contact) {
            allContacts.push(contact);
        });
    };

    WinJS.Namespace.define("DoubleGChat.ViewModels.Contacts", {
        allContacts: allContacts,
        setContacts: setContacts
    });
})();