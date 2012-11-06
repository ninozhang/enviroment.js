(function() {

    var envi = window.envi,
        ua = envi.ua,
        device = envi.device,
        extractName = envi._extractName,
        r;

    // 设备
    if (ua.match(/macintosh/)) {
        device.mac = device.macintosh = true;
    } else if (ua.match(/touchpad/)) {
        device.touchpad = true;
    } else if (ua.match(/kindle\/([\d.]+)/)) {
        device.kindle = true;
    }
    device.name = extractName(device);

    
})();