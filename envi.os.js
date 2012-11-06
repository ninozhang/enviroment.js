(function() {

    var envi = window.envi,
        ua = envi.ua,
        os = envi.os,
        extractName = envi._extractName,
        r;

    // 系统
    if (r = ua.match(/(mac os x)\s([\d_]+)/)) {
        os.osx = true;
        os.version = r[2];
    } else if (r = ua.match(/(windows)\s(.*);/)) {
        os.windows = true;
        os.version = r[2];
    } else if (r = ua.match(/(android)\s+([\d.]+)/)) {
        os.android = true;
        os.version = r[2];
    } else if (r = (ua.match(/(ipad).*os\s([\d_]+)/) ||
        ua.match(/(ipod).*os\s([\d_]+)/) ||
        ua.match(/(iphone)\sos\s([\d_]+)/))) {
        os.ios = true;
        os.version = r[2];
    } else if (ua.match(/(webos|hpwos)[\s\/]([\d.]+)/)) {
        os.webos = true;
        os.version = r[3];
    } else if (ua.match(/playbook/)) {
        os.blackberry = true;
    } else if (r = ua.match(/(blackberry).*version\/([\d.]+)/)) {
        os.blackberry = true;
        os.version = r[2];
    } else if (ua.match(/meego/)) {
        os.meego = true;
    }
    os.name = extractName(os);

    // 发行版本
    if (r = ua.match(/build\/miui/)) {
        os.distribution = 'miui';
    }

    // 移动 or 桌面
    if (os.android && !os.ios && !os.webos && !os.blackberry && !os.meego) {
        os.mobile = true;
    } else {
        os.desktop = true;
    }

})();