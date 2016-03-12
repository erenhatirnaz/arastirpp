var gulp = require('gulp');

var pkg = require('./package.json'),
    coffee = require('gulp-coffee'),
    header = require('gulp-header'),
    gulpreplace = require('gulp-replace'),
    del = require('del');

var generateBanner = function(browser){
  var banner = [
  '// ==UserScript==',
  '// @name        <%= pkg.name.replace("pp","++") %>',
  '// @description <%= pkg.description %>',
  '// @namespace   <%= namepace %>',
  '// @author      <%= pkg.author %>',
  ];

  for (var contributor in pkg.contributors) {
    banner.push('// @contributor ' + pkg.contributors[contributor]);
  }

  var type = (browser == "chrome") ? "match" : "include";
  banner.push('// @'+type+'       https://eksisozluk.com/*');
  banner.push('// @'+type+'       https://*.eksisozluk.com/*');
  banner.push('// @iconURL     http://i.hizliresim.com/E5QJYv.png');
  banner.push('// @version     <%= pkg.version %>');
  banner.push('// @homepage    https://github.com/erenhatirnaz/arastirpp');
  banner.push('// @supportURL  https://github.com/erenhatirnaz/arastirpp/issues/new');
  if(browser == "firefox") {
    banner.push('// @grant       none');
  }
  banner.push('// ==/UserScript==\n');

  return banner;
}

gulp.task('build:chrome', function(){
  var banner = generateBanner("chrome"),
      namespace = pkg.repository.url.replace('git+','');

  return gulp.src('src/arastirpp.user.coffee')
    .pipe(coffee())
    .pipe(header(banner.join('\n'), {pkg: pkg, namepace: namespace}))
    .pipe(gulp.dest('dist/chrome/'));
});

gulp.task('build:firefox', function(){
  var banner = generateBanner("firefox"),
      namespace = pkg.repository.url.replace('git+','');

  return gulp.src('src/arastirpp.user.coffee')
    .pipe(coffee())
    .pipe(gulpreplace('unsafeWindow', 'window'))
    .pipe(header(banner.join('\n'), {pkg: pkg, namepace: namespace}))
    .pipe(gulp.dest('dist/firefox/'));
});

gulp.task('clean', function(){
  del(['dist']);
});

gulp.task('build:all', ['build:chrome', 'build:firefox']);
