// 引入 gulp 工具
var gulp = require('gulp');

// 引入 gulp-webserver 模块
var webserver = require('gulp-webserver');

// 引入 css 预处理 压缩 模块
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');

// 引入 js 模块化工具 gulp-webpack, 获得 js 文件名模块 vinyl-named, js 压缩模块
var named = require('vinyl-named');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');

// 引入 fs url 模块
var fs = require('fs');
var url = require('url');

// 引入 rev revCollector 模块
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');

// 引入 gulp-sequence 模块
var sequence = require('gulp-sequence');

// 启动 webserver
gulp.task('webserver', function () {
  gulp.src('./')
    .pipe(webserver({
      host: 'localhost',
      port: 8080,
      directoryListing: {
        enable: true,
        path: './'
      },
      livereload: true,
      // mock 数据
      middleware: function (req, res, next) {
        var urlObj = url.parse(req.url, true);
        switch (urlObj.pathname) {
          case '/api/orders.php':
            res.setHeader('Content-Type', 'application/json');
            fs.readFile('./mock/list.json', function (err, data) {
              res.end(data);
            });
            return;
          case '/api/user':
            // ...
            
          case '/api/cart':
            // ...
            return;
        }
        next();
      }
    }))
});

// css 预处理 和 压缩
//CSS入口文件数组 每新增一个模块必须添加一个入口
var cssFiles = [
  './src/index/styles/**/*',
  './src/desc/styles/**/*',
  './src/login/styles/**/*',
];
gulp.task('scss', function () {
  gulp.src(cssFiles)
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCSS()) 
    .pipe(gulp.dest('./build/prd/styles/'));
});

// js 模块化，合并，压缩
//JS入口文件数组 每新增一个模块必须添加一个入口
var jsFiles = [
  './src/index/scripts/app.js',
  './src/desc/scripts/p_desc.js',
  './src/login/scripts/a_login.js',
];
gulp.task('packjs', function () {
  gulp.src(jsFiles)
    .pipe(named())
    .pipe(webpack({
      output: {
        filename: '[name].js'
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'imports?define=>false'
          }
        ]
      }
    }))
    .pipe(uglify().on('error', function (err) {
      console.log('\x07', err.lineNumber, err.message);
      return this.end();
    }))
    .pipe(gulp.dest('./build/prd/scripts/'));
});

// 版本号控制
var cssDistFiles = [
  './build/prd/styles/app.css'
];
var jsDistFiles = [
  './build/prd/scripts/app.js'
];
gulp.task('ver', function () {
  gulp.src(cssDistFiles)
    .pipe(rev())
    .pipe(gulp.dest('./build/prd/styles/'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./build/ver/styles/'));
  gulp.src(jsDistFiles)
    .pipe(rev())
    .pipe(gulp.dest('./build/prd/scripts/'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./build/ver/scripts/'));
});
gulp.task('html', function () {
  gulp.src(['./build/ver/**/*', './build/*.html'])
    .pipe(revCollector())
    .pipe(gulp.dest('./build/'));
});
gulp.task('min', sequence('copy-index', 'html'));

// 拷贝 index.html 到 build 文件夹
gulp.task('copy-index', function () {
  gulp.src('./index.html')
    .pipe(gulp.dest('./build'));
});
// 拷贝 pages文件夹 到 build 文件夹
gulp.task('copy-pages', function () {
  gulp.src('./pages/*.html')
    .pipe(gulp.dest('./build/pages/'));
});

// 拷贝 images 到 build 文件夹
gulp.task('copy-images', function () {
  gulp.src('./images/**/*')
    .pipe(gulp.dest('./build/images/'));
});

// 侦测 文件变化， 执行相应任务
gulp.task('watch', function () {
  gulp.watch('./index.html', ['copy-index']);
  gulp.watch('./images/**/*', ['copy-images']);
  gulp.watch('./src/**/*.scss', ['scss','ver']);
 // gulp.watch('./src/scripts/**/*', ['packjs', 'min','ver']);
  gulp.watch('./src/**/*.js', ['packjs', 'min','ver']);
  gulp.watch('./pages/*.html',['copy-pages']);
});

// 配置 default 任务，执行任务队列
gulp.task('default', ['watch', 'webserver'], function () {
  console.log('队列任务执行完毕');
});
