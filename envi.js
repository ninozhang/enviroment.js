(function () {

/* ****************************************************************************
 * 定义内部变量和方法                                                         *
 *****************************************************************************/

var ua = navigator.userAgent,
    mobileOS = ['android', 'ios', 'webos', 'blackberry', 'meego'].join('|'),
    browser = {
        webkit: {},
        gecko: {},
        opera: {},
        ie: {}
    },
    os = {},
    device = {},
    parsers = {
        browser: browser,
        os: os,
        device: device
    };

/**
 * 
 */
function extend(obj) {
    var args = Array.prototype.slice.call(arguments, 1);
    args.forEach(function(source) {
        for (var prop in source) {
            var value = source[prop];
            if (typeof value === 'object' && typeof obj[prop] === 'object') {
                extend(obj[prop], value);
            } else {
                obj[prop] = source[prop];
            }
        }
    });
    return obj;
}

/**
 * 
 */
function parse (ua) {
    var info = {};
    for (var name in parsers) {
        var parser = parsers[name]['main'];
        if (parser) {
            info[name] = parser(ua);
        }
    }
    return info;
}

/**
 * 为所有的解析器增加参数判断
 */
function wrap (parser) {
    var type = typeof parser;
    if (type === 'function') {
        return function (ua) {
            if (!ua) {
                return;
            }
            ua = ua.toLowerCase();
            return parser(ua);
        };
    } else if (type === 'object') {
        for (var name in parser) {
            parser[name] = wrap(parser[name]);
        }
        return parser;
    }
}

/**
 * 生成解析结果
 */
function make (ua, type, model, assets, check) {
    var info = {},
        subs = parsers[type][model],
        name, sub;

    // 
    info[model] = true;

    // 加入其它信息
    if (assets) {
        for (name in assets) {
            info[name] = assets[name];
        }
    }

    if (check) {
        if (typeof subs === 'function') {
            extend(info, subs(ua));
        } else if (subs) {
            for (name in subs) {
                sub = subs[name];
                extend(info, sub(ua));
            }
        }
    }

    return info;
}

/* ****************************************************************************
 * 浏览器检测                                                                 *
 *****************************************************************************/

/**
 * 浏览器检测主方法
 */
browser.main = function (ua) {
    var core;

    if (ua.match(/webkit\//)) {
        core = 'webkit';
    } else if (ua.match(/gecko\//)) {
        core = 'gecko';
    } else if (ua.match(/opera\//)) {
        core = 'opera';
    } else if (ua.match(/\smsie\s/)) {
        core = 'ie';
    } else {
        core = 'other';
    }

    return make(ua, 'browser', core, {
        core: core
    }, true);
};

/**
 * UCWeb 检测
 */
browser.webkit.uc = function (ua) {
    if (ua.match(/juc\s\(/)) {
        return make(ua, 'browser', 'uc');
    } else if(r = ua.match(/ucweb([\d.]+)\/(\d+)\/(\d+)/)) {
        return make(ua, 'browser', 'uc', {
            version: r[1]
        });
    } else if (ua.match(/\suc\s/)) {
        return make(ua, 'browser', 'uc');
    }
};

/**
 * Safari 检测
 */
browser.webkit.safari = function (ua) {

};

/**
 * IE 检测
 */
browser.ie.ie = function (ua) {

};

/* ****************************************************************************
 * 系统检测                                                                   *
 *****************************************************************************/

/**
 * 系统检测主方法
 */
os.main = function (ua) {
    var os;

    if (ua.match(/(mac os x)/)) {
        os = 'osx';
    } else if (ua.match(/(windows)/)) {
        os = 'windows';
    } else if (ua.match(/(android)/)) {
        os = 'android';
    } else if (ua.match(/(ipad|ipod|iphone)/)) {
        os = 'ios';
    } else if (ua.match(/(webos|hpwos)/)) {
        os = 'webos';
    } else if (ua.match(/playbook/)) {
        os = 'blackberry';
    } else if (ua.match(/(blackberry)/)) {
        os = 'blackberry';
    } else if (ua.match(/(meego)/)) {
        os = 'meego';
    } else {
        os = 'other';
    }

    // 是否移动浏览器
    var mobile = mobileOS.indexOf(os) > -1;

    return make(ua, 'os', os, {
        name: os,
        mobile: mobile,
        desktop: !mobile
    }, true);
};

/**
 * 
 */
os.android = function (ua) {
    var dist, ver;

    // 发行版本
    if (ua.match(/build\/miui/)) {
        dist = 'miui';
    }

    // 版本
    if (r = ua.match(/(android)\s+([\d.]+)/)) {
        ver = r[2];
    }

    // 只有有值才返回
    if (dist || version) {
        return make(ua, 'os', 'android', {
            version: ver,
            distribution: dist
        });
    }
}

os.ios = function (ua) {
    if (r = (ua.match(/(ipad).*os\s([\d_]+)/) ||
        ua.match(/(ipod).*os\s([\d_]+)/) ||
        ua.match(/(iphone)\sos\s([\d_]+)/))) {
        return make(ua, 'os', 'ios', {
            version: r[2]
        });
    }
}

os.windows = function (ua) {
    if (r = ua.match(/(windows)\s(.*);/)) {
        return make(ua, 'os', 'windows', {
            version: r[2]
        });
    }
}

os.osx = function (ua) {
    if (r = ua.match(/(mac os x)\s([\d_]+)/)) {
        return make(ua, 'os', 'osx', {
            version: r[2]
        });
    }
}

os.webos = function (ua) {
    if (ua.match(/(webos|hpwos)[\s\/]([\d.]+)/)) {
        return make(ua, 'os', 'webos', {
            version: r[3]
        });
    }
}

os.blackberry = function (ua) {
    if (r = ua.match(/(blackberry).*version\/([\d.]+)/)) {
        return make(ua, 'os', 'blackberry', {
            version: r[2]
        });
    }
}

/* ****************************************************************************
 * 设备检测                                                                   *
 *****************************************************************************/

/**
 * 
 */
device.main = function (ua) {
    var model;
    if (ua.match(/macintosh/)) {
        model = 'mac';
    } else if (r = ua.match(/(ipad|ipod|iphone)/)) {
        os = r[1];
    } else if (ua.match(/touchpad/)) {
        model = 'touchpad';
    } else if (ua.match(/kindle/)) {
        model = 'kindle';
    } else {
        model = 'other';
    }

    return make(ua, 'device', model);
};

/* ****************************************************************************
 * 外部接口                                                                   *
 *****************************************************************************/

/**
 * 
 */
var envi = window.enviroment = window.envi = {
    ua: ua,
    os: {},
    device: {},
    browser: {},
    parsers: parsers,
    parse: parse
};

/* ****************************************************************************
 * 初始化                                                                     *
 *****************************************************************************/

// 包装解析方法
wrap(parsers);
// 自动执行解析
extend(envi, parse(ua));

})();