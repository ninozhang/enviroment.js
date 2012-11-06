(function() {

    var envi = window.envi,
        ua = envi.ua,
        parsers = envi.parsers,
        extend = envi._extend,
        extractName = envi._extractName,
        r;

    function parse(ua) {
        // 发行版本
        var os = {};
        if (r = ua.match(/build\/miui/)) {
            os.distribution = 'miui';
        }

        return os;
    }

    parsers.os.push(parse);

    extend(envi.os, parse(ua));

})();