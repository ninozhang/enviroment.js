(function() {

    var ua = navigator.userAgent.toLowerCase();

    function extend(obj) {
        var args = Array.prototype.slice.call(arguments, 1);
        args.forEach(function(source) {
            for (var prop in source) {
                obj[prop] = source[prop];
            }
        });
        return obj;
    }

    function extractName(source) {
        if (source.name) {
            return source.name;
        }
        for (var key in source) {
            if (source[key] === true) {
                return key;
            }
        }
    }

    /**
     *
     * parsers: {
     *   osParse: fn,
     *   os: [],
     *   deviceParse: fn,
     *   device: [],
     *   browserParse: fn,
     *   browser: []
     * }
     *
     *
     *
     *
     */
    function parse(ua) {
        var envi = window.envi,
            parsers = envi.parsers,
            os = parsers.osParse ? parsers.osParse(ua) : {},
            device = parsers.deviceParse ? parsers.deviceParse(ua) : {},
            browser = parsers.browserParse ? parsers.browserParse(ua) : {};

        return {
            os: os,
            device: device,
            browser: browser
        };
    }

    window.enviroment = window.envi = {
        ua: ua,
        os: {},
        device: {},
        browser: {},
        parsers: {
            os: [],
            device: [],
            browser: []
        },
        parse: parse,
        _extend: extend,
        _extractName: extractName
    };

})();