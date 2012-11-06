var envi = window.envi,
    parse = envi.parse,
    r;

module('enviroment');

test('windows', function() {

});

test('osx', function() {
    r = parse('mozilla/5.0 (macintosh; intel mac os x 10_7_5) applewebkit/537.4 (khtml, like gecko) chrome/22.0.1229.79 safari/537.4');
    equal(r.os.osx, true);
});

test('android', function() {

});

test('ios', function() {

});