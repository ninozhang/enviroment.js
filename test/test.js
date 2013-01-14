var envi = window.envi,
    parse = envi.parse,
    info;

module('enviroment');

test('windows', function() {
	ok('ok');
});

test('osx', function() {
    info = parse('mozilla/5.0 (macintosh; intel mac os x 10_7_5) applewebkit/537.4 (khtml, like gecko) chrome/22.0.1229.79 safari/537.4');
    console.log(info);
    equal(info.os.osx, true);
});

test('android', function() {
	ok('ok');
});

test('ios', function() {
	ok('ok');
});