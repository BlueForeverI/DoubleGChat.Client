(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/search-results/search-results.html", {
        init: function (element, options) {
            //WinJS.Binding.processAll();
        },
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            WinJS.Binding.processAll(element, DoubleGChat.ViewModels.Search);
            DoubleGChat.Controllers.Search.getUsersByQueryText(options.queryText);
            // TODO: Initialize the page here.
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in viewState.
        }
    });
})();
