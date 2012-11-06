(function() {

    var envi = window.envi,
        ua = envi.ua,
        parsers = envi.parsers,
        extend = envi._extend,
        extractName = envi._extractName,
        r;
    
    function parse(ua) {
        // 浏览器内核
        var browser = {};
        if (ua.match(/webkit\//)) {
            browser.webkit = true;
        } else if (ua.match(/gecko\//)) {
            browser.gecko = true;
        } else if (ua.match(/opera\//)) {
            browser.opera = true;
        } else if (ua.match(/\smsie\s/)) {
            browser.ie = true;
        }
        browser.core = extractName(browser);

        parsers.browser.forEach(function(parse) {
            extend(browser, parse(ua));
        });

        return browser;
    }

    parsers.browserParse = parse;

    extend(envi.browser, parse(ua));

})();