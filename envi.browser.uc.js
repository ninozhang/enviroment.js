(function() {

    var envi = window.envi,
        ua = envi.ua,
        browser = envi.browser,
        extractName = envi._extractName,
        r;

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

})();