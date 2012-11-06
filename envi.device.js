(function() {

    var envi = window.envi,
        ua = envi.ua,
        parsers = envi.parsers,
        extend = envi._extend,
        extractName = envi._extractName,
        r;

    function parse(ua) {
        // 设备
        var device = {};
        if (ua.match(/macintosh/)) {
            device.mac = device.macintosh = true;
        } else if (ua.match(/touchpad/)) {
            device.touchpad = true;
        } else if (ua.match(/kindle\/([\d.]+)/)) {
            device.kindle = true;
        }
        device.name = extractName(device);

        parsers.device.forEach(function(parse) {
            extend(device, parse(ua));
        });

        return device;
    }

    parsers.deviceParse = parse;

    extend(envi.device, parse(ua));

})();