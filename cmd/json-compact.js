(function() {
  var files, fs, o, o_is_dir, path;
  fs = require('fs');
  path = require('path');
  files = [];
  o = null;
  o_is_dir = false;
  process.argv.slice(2).forEach(function(v) {
    var dir, regex;
    if (/output=/.test(v)) {
      o = path.resolve(v.slice(7));
      try {
        o_is_dir = fs.lstatSync(o).isDirectory();
      } catch (e) {
        if (/[\\\/]/.test(o)) {
          console.error('output dir is not exists: ', o);
          process.exit(1);
        }
      }
      if (o_is_dir && /[^\/]$/.test(o)) {
        return o += '/';
      }
    } else {
      if (/[\*\?]/.test(v)) {
        dir = fs.readdirSync(path.resolve(path.dirname(v)));
        regex = new RegExp(path.basename(v).replace(/\*/g, '.*').replace(/\?/g, '.'));
        return dir.forEach(function(f) {
          if (regex.test(f)) {
            return files.push(path.resolve(f));
          }
        });
      } else {
        return files.push(path.resolve(v));
      }
    }
  });
  files.forEach(function(f) {
    return path.exists(f, function(exists) {
      if (exists) {
        return fs.readFile(f, 'utf-8', function(err, data) {
          var json, o_f;
          try {
            if (err) {
              throw err;
            }
            try {
              json = JSON.parse(data);
            } catch (e) {
              json = eval("(" + data + ")");
            }
            json = JSON.stringify(json);
            o_f = o ? (o_is_dir ? o + path.basename(f) : o) : f;
            return fs.writeFile(o_f, json + '\n', function(err) {
              if (err) {
                throw err;
              }
            });
          } catch (e) {
            return console.error('compact json failed: ', f, e);
          }
        });
      } else {
        return console.error('file not exists: ', f);
      }
    });
  });
}).call(this);
