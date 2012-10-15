(function() {

    var ua = navigator.userAgent.toLowerCase(),
        os = {
            version: ''
        },
        device = {
            name: ''
        },
        browser = {};

    var webkit = ua.match(/WebKit\/([\d.]+)/),
        webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
        touchpad = webos && ua.match(/TouchPad/),
        kindle = ua.match(/Kindle\/([\d.]+)/),
        silk = ua.match(/Silk\/([\d._]+)/),
        blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/),
        uc = ua.match(/UC/);


    // 内核
    if (ua.match(/webkit\//)) {
        browser.webkit = true;
    } else if (ua.match(/gecko\//)) {
        browser.gecko = true;
    } else if (ua.match(/opera\//)) {
        browser.opera = true;
    } else if (ua.match(/\smsie\s/)) {
        browser.ie = true;
    }

    // 系统和设备
    if (ua.match(/(android)\s+([\d.]+)/)) {
        os.android = true;
        device.android = true;
    } else if (ua.match(/(ipad).*os\s([\d_]+)/)) {
        os.ios = true;
        device.ipad = true;
    } else if (ua.match(/(ipod).*os\s([\d_]+)/)) {
        os.ios = true;
        device.ipod = true;
    } else if (ua.match(/(iphone\sos)\s([\d_]+)/)) {
        os.ios = true;
        device.iphone = true;
    }

    if (uc.match(/juc\s(/) || uc.match(/ucweb/)) {
        browser.uc = true;
    }

    if () {
        
    }

    if (browser.webkit = !!webkit) browser.version = webkit[1];
    if (android) os.android = true, os.version = android[2];
    if (iphone) os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, '.');
    if (ipad) os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, '.');
    if (webos) os.webos = true, os.version = webos[2];
    if (touchpad) os.touchpad = true;
    if (blackberry) os.blackberry = true, os.version = blackberry[2];
    if (kindle) os.kindle = true, os.version = kindle[1];
    if (silk) browser.silk = true, browser.version = silk[1];
    if (!silk && os.android && ua.match(/Kindle Fire/)) browser.silk = true;
    if (!android && !ipad && !iphone && !webos &&
        !touchpad && !kindle && !silk && !blackberry && !uc)
        browser.desktop = true;

    window.enviroment = window.env = {
        ua: ua,
        os: os,
        device: device,
        browser: browser
    }
})();