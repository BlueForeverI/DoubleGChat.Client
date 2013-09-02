// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/conversation/conversation.html", {
        init: function(element, options) {
            DoubleGChat.Controllers.Conversation.startConversation(options.username);
        },
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            WinJS.Binding.processAll(element, DoubleGChat.ViewModels.Conversation);
        },

        unload: function () {
            DoubleGChat.Controllers.Conversation.leaveConversation();
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in viewState.
        }
    });
})();
