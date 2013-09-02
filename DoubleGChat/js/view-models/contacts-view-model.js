(function () {
    "use strict";

    var allContacts = new WinJS.Binding.List([], { binding: true });
    
    var setContacts = function (contacts) {
        contacts.forEach(function (contact) {
            allContacts.push(contact);
        });
    };

    var emptyContactsList = function () {
        allContacts.dataSource.list.splice(0, allContacts.dataSource.list.length);
    };

    WinJS.Namespace.define("DoubleGChat.ViewModels.Contacts", {
        allContacts: allContacts,
        setContacts: setContacts,
        emptyContactsList: emptyContactsList
    });
})();