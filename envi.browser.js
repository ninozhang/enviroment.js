(function() {

    var envi = window.envi,
        ua = envi.ua,
        browser = envi.browser,
        extractName = envi._extractName,
        r;
    
    // 浏览器内核
    if (ua.match(/webkit\//)) {
        browser.webkit = true;
    } else if (ua.match(/gecko\//)) {
        browser.gecko = true;
    } else if (ua.match(/opera\//)) {
        browser.opera = true;
    } else if (ua.match(/\smsie\s/)) {
        browser.ie = true;
    }

    

})();