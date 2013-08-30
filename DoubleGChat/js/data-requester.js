(function () {
    "use strict";

    var sendXhrRequest = function (url, type, data, sessionKey) {
        var xhr = WinJS.xhr({
            type: type,
            url: url,
            headers: {
                "Content-type": "application/json",
                "X-sessionKey": sessionKey
            },
            data: JSON.stringify(data)
        });

        return xhr;
    };

    WinJS.Namespace.define("DoubleGChat.RemoteData", {
        sendRequest: sendXhrRequest
    });
}());