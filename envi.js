(function() {

    var ua = navigator.userAgent.toLowerCase();

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

    window.enviroment = window.envi = {
        ua: ua,
        os: {},
        device: {},
        browser: {},
        _extractName: extractName
    };

})();