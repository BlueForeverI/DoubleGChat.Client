// For an introduction to the Navigation template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232506
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var nav = WinJS.Navigation;

    var appModel = Windows.ApplicationModel;
    var appViewState = Windows.UI.ViewManagement.ApplicationViewState;
    var ui = WinJS.UI;
    var utils = WinJS.Utilities;
    var searchPageURI = "/pages/search-results/search-results.html";

    app.addEventListener("activated", function (args) {
        var user = DoubleGChat.Controllers.User.getUserCredentials();
        if (user) {
            DoubleGChat.RemoteData.sendRequest(
                DoubleGChat.Constants.baseUrl + "users/session",
                "POST",
                user).then(function () {
                    nav.navigate("/pages/contacts/contacts.html");
                }, function (error) {
                    // invalid session key provided
                });
        }
        
        if (args.detail.kind === activation.ActivationKind.launch) {
            

            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
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
                //if (nav.location) {
                //    nav.history.current.initialPlaceholder = true;
                //    return nav.navigate(nav.location, nav.state);
                //} else {
                //    return nav.navigate(Application.navigator.home);
                //}
            }));
        } else if (args.detail.kind === appModel.Activation.ActivationKind.search) {
            args.setPromise(ui.processAll().then(function () {
                if (!nav.location) {
                    nav.history.current = { location: Application.navigator.home, initialState: {} };
                }

                return nav.navigate(searchPageURI, { queryText: args.detail.queryText });
            }));
        }
    });

    appModel.Search.SearchPane.getForCurrentView().onquerysubmitted = function (args) { nav.navigate(searchPageURI, args); };

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. If you need to 
        // complete an asynchronous operation before your application is 
        // suspended, call args.setPromise().
        app.sessionState.history = nav.history;
    };

    app.start();
})();
