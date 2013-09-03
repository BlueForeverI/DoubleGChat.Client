// For an introduction to the Navigation template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232506
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var nav = WinJS.Navigation;

    var appModel = Windows.ApplicationModel;
    var ui = WinJS.UI;
    var searchPageURI = "/pages/search-results/search-results.html";

    var loginWithSessionKey = function () {
        return DoubleGChat.Controllers.User.loginWIthCurrentUserSession()
            .then(function () {
                return nav.navigate("/pages/contacts/contacts.html");
            }, function () {
            });
    };

    app.addEventListener("activated", function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.suspended) {
                    args.setPromise(loginWithSessionKey());
                }
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }

            if (app.sessionState.history) {
                nav.history = app.sessionState.history;
            }

            args.setPromise(WinJS.UI.processAll().then(function () {
                WinJS.Binding.processAll(null, DoubleGChat.ViewModels.Global);
                if (nav.location) {
                    nav.history.current.initialPlaceholder = true;
                    return nav.navigate(nav.location, nav.state);
                } else {
                    return nav.navigate(Application.navigator.home);
                }
            }));
        } else if (args.detail.kind === appModel.Activation.ActivationKind.search) {
            args.setPromise(ui.processAll().then(function () {
                WinJS.Binding.processAll(null, DoubleGChat.ViewModels.Global);
                if (!nav.location) {
                    nav.history.current = { location: Application.navigator.home, initialState: {} };
                }

                return nav.navigate(searchPageURI, { queryText: args.detail.queryText });
            }));
        }

        WinJS.Application.onsettings = function (e) {
            e.detail.applicationcommands =
                {
                    "profile-settings": { title: "Profile Settings", href: "/pages/profile-settings/profile-settings.html" },
                    "change-profile-picture": { title: "Change Profile Picture", href: "/pages/change-profile-picture/change-profile-picture.html" }
                };

            WinJS.UI.SettingsFlyout.populateSettings(e);
        };
    });

    appModel.Search.SearchPane.getForCurrentView().onquerysubmitted = function (args) { nav.navigate(searchPageURI, args); };

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. If you need to 
        // complete an asynchronous operation before your application is 
        // suspended, call args.setPromise().
        args.setPromise(DoubleGChat.Controllers.User.goOffline());
        app.sessionState.history = nav.history;
        //WinJS.UI.AppBarIcon.go
        //WinJS.UI.AppBarIcon.globe
        //WinJS.UI.AppBarIcon.more
        //WinJS.UI.AppBarIcon.memo
        //WinJS.UI.AppBarIcon.

    };

    app.start();
})();
