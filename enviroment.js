(function() {

    var ua = navigator.userAgent.toLowerCase(),
        os = {},
        device = {},
        browser = {},
        r;

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
    if (r = ua.match(/(windows)\s(.*);/)) {
        os.windows = true;
        os.version = r[2];
        device.pc = true;
    } else if (r = ua.match(/(android)\s+([\d.]+)/)) {
        os.android = true;
        os.version = r[2];
        device.android = true;
    } else if (r = (ua.match(/(ipad).*os\s([\d_]+)/) ||
        ua.match(/(ipod).*os\s([\d_]+)/) ||
        ua.match(/(iphone)\sos\s([\d_]+)/))) {
        os.ios = true;
        os.version = r[2];
        device.ipad = r[1] === 'ipad';
        device.ipod = r[1] === 'ipod';
        device.iphone = r[1] === 'iphone';
    } else if (ua.match(/(webos|hpwos)[\s\/]([\d.]+)/)) {
        os.webos = true;
        os.version = r[3];
    } else if (ua.match(/playbook/)) {
        os.blackberry = true;
        device.playbook = true;
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

    // 设备
    if (ua.match(/touchpad/)) {
        device.touchpad = true;
    } else if (ua.match(/kindle\/([\d.]+)/)) {
        device.kindle = true;
    }
    device.name = extractName(device);

    // UC
    if (ua.match(/juc\s\(/)) {
        browser.uc = true;
        browser.middleware = true;
    } else if(r = ua.match(/ucweb([\d.]+)\/(\d+)\/(\d+)/)) {
        browser.uc = true;
        browser.middleware = true;
        browser.version = r[1];
        browser.pf = r[2];
    } else if (ua.match(/\suc\s/)) {
        browser.uc = true;
    }
    browser.name = extractName(browser);

    // 移动 or 桌面
    if (os.android && !os.ios && !os.webos && !os.blackberry && !os.meego) {
        os.mobile = true;
        browser.mobile = true;
    } else {
        os.desktop = true;
        browser.desktop = true;
    }

    window.enviroment = window.env = {
        ua: ua,
        os: os,
        device: device,
        browser: browser
    };
})();