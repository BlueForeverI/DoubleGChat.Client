(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/search-results/search-results.html", {
        init: function (element, options) {
            DoubleGChat.Controllers.Search.getUsersByQueryText(options.queryText);
        },

        ready: function (element, options) {
            WinJS.Binding.processAll(element, DoubleGChat.ViewModels.Search);
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
