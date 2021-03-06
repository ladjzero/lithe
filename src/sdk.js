var wb = WB2;

var sdk = {
    wb: wb,
    anyWhere: function () {
        return new Promise(wb.anyWhere);
    },
    parseCMD: function (W, url, method) {
        return new Promise(function (resolve) {
            W.parseCMD(url, resolve, {uid: wb.oauthData.uid}, {method: method});
        });
    },
    homeLine: function (options) {
        options.before && options.before();

        var query = getQueryString(options.query);

        Promise
            .resolve()
            .then(sdk.anyWhere)
            .then(function (W) {
                return sdk.parseCMD(W, '/statuses/home_timeline.json?' + query, 'get');
            })
            .then(options.onResult);
    },
    comments: function (options) {
        options.before && options.before();

        if (!options.id) {
            throw Error('id is required to get comments');
        }

        Promise
            .resolve()
            .then(sdk.anyWhere)
            .then(function (W) {
                return sdk.parseCMD(W, '/comments/show.json?id=' + options.id, 'get');
            })
            .then(options.onResult);
    }
};

function getQueryString (query) {
    if (query) {
        return Object.keys(query).map(function (key) {
            return key + '=' + query[key];
        }).join('&');
    } else {
        return '';
    }
}

module.exports = sdk
