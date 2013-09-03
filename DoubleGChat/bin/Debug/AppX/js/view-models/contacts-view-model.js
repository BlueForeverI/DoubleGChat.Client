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

    var changeContacts = function (contacts) {
        var startIndex = allContacts.dataSource.list.length;
        if (startIndex < contacts.length) {
            for (var i = startIndex; i < contacts.length; i++) {
                allContacts.push(contacts[i]);
            }
        }

        changeStatus(contacts);
    };

    var changeStatus = function (contacts) {
        for (var i = 0; i < allContacts.length; i++) {
            if (allContacts.getAt(i).online != contacts[i].online) {
                allContacts.getAt(i).online = contacts[i].online;
            }
            
            if (allContacts.getAt(i).profilePictureUrl != contacts[i].profilePictureUrl) {
                allContacts.getAt(i).profilePictureUrl = contacts[i].profilePictureUrl;
            }
            
            if (allContacts.getAt(i).firstName != contacts[i].firstName) {
                allContacts.getAt(i).firstName = contacts[i].firstName;
            }
            
            if (allContacts.getAt(i).lastName != contacts[i].lastName) {
                allContacts.getAt(i).lastName = contacts[i].lastName;
            }
        }
    };

    var userStatusToColor = WinJS.Binding.converter(function (status) {
        return status ? "green" : "red";
    })

    WinJS.Namespace.define("DoubleGChat.ViewModels.Contacts", {
        allContacts: allContacts,
        setContacts: setContacts,
        emptyContactsList: emptyContactsList,
        changeContacts: changeContacts,
        userStatusToColor: userStatusToColor
    });
})();