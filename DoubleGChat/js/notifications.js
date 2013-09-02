/// <reference path="pubnub.js" />
(function () {
    "use strict";

    var channels = [];

    var pubnub = PUBNUB.init({
        publish_key: 'pub-c-d9b56413-5a7f-4528-9e32-6324f449b10e',
        subscribe_key: 'sub-c-361a1a54-04c1-11e3-a005-02ee2ddab7fe',
        origin: 'pubsub.pubnub.com'
    });

    var addChannel = function (id, func) {
        var channelSettings = {
            channel: "channel-" + id,
            message: function (data) {
                try {
                    func(data);
                } catch (e) { }
            }
        };

        channels.push(channelSettings);
        pubnub.subscribe(channelSettings);
    };

    var publish = function (channelId, message) {
        var channelSettings = {
            channel: "channel-" + channelId,
            message: message
        };

        pubnub.publish(channelSettings);
    };

    var emptyChannelList = function() {
        while (channels.length > 0) {
            var channel = channels.pop();
            pubnub.unsubscribe(channel);
        }
    };

    var showNotification = function(message) {

        var notifications = Windows.UI.Notifications;

        var template = notifications.ToastTemplateType.toastText01;
        var toastXml = notifications.ToastNotificationManager.getTemplateContent(template);

        var toastTextElements = toastXml.getElementsByTagName("text");
        toastTextElements[0].innerText = message;
        var toast = new notifications.ToastNotification(toastXml);
        var toastNotifier = notifications.ToastNotificationManager.createToastNotifier();
        toastNotifier.show(toast);
    };

    WinJS.Namespace.define("DoubleGChat.Notifications", {
        pubnub: pubnub,
        publish: publish,
        addChannel: addChannel,
        emptyChannelList: emptyChannelList,
        show: showNotification
    });
})();