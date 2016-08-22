var http = require('http');

module.exports = function(cb) {
    var res;
    if (res) {
        cb(null, res);
        return
    }
    http.get('http://nodejs.org/dist/index.json', function(res) {
        if (res.statusCode !== 200) {
            cb(new Error('Received error code ' + res.statusCode));
            return;
        }

        var body = '';

        res.on('data', function(chunk) {
            body += chunk;
        });

        res.on('end', function() {
            var _v, _nv, len, i, _latest, _lts;
            try {
                _v = JSON.parse(body)
            } catch (_err) {
                cb(_err)
            }

            _latest = _v[0].version.slice(1)
            for (i = 0, len = _v.length; i < len; i++) {
                _nv = _v[i];
                if (_nv.lts == "Argon") {
                    _lts = _nv.version.slice(1)
                    break
                }
            }
            res = {
                latest: _latest,
                lts: _lts
            };
            cb(null, res);
        });
    }).on('error', cb);
}
