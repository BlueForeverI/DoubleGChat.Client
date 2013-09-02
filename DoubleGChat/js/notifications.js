﻿/// <reference path="pubnub.js" />
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
            message: func
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

    var emptyChannelList = function () {
        for (var i = 0; i < channels.length; i++) {
            var channel = channels.pop();
            pubnub.unsubscribe(channel.channel);
        }
    }

    WinJS.Namespace.define("DoubleGChat.Notifications", {
        pubnub: pubnub,
        publish: publish,
        addChannel: addChannel,
        emptyChannelList: emptyChannelList
    });
})();