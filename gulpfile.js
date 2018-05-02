const { ensureDirSync } = require('fs-extra');
const webpack = require('webpack-stream');
const htmlmin = require('gulp-htmlmin');
const lint = require('gulp-eslint');
const gulp = require('gulp');
const del = require('del');

gulp.task('clean', () =>
  del([
    'build/**',
    '!build',
    '!build/static',
    '!build/static/uploads',
    '!build/static/uploads/**'
  ])
);

gulp.task('copy', ['clean'], () => {
  ensureDirSync('build/static/uploads');

  return [
    gulp.src([
      'src/index.html'
    ])
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build/')),

    gulp.src([
      'src/images/**/*'
    ])
    .pipe(gulp.dest('build/static/images'))
  ];
});

gulp.task('dev:client', () =>
  gulp.src('src/client/client.js')
  .pipe(webpack(require('./webpack/client/dev.js')))
  .pipe(gulp.dest('build/static/js'))
);

gulp.task('prod:client', () =>
  gulp.src('src/client/client.js')
  .pipe(webpack(require('./webpack/client/prod.js')))
  .pipe(gulp.dest('build/static/js'))
);

gulp.task('dev:server', () =>
  gulp.src('src/server/app.js')
  .pipe(webpack(require('./webpack/server/dev.js')))
  .pipe(gulp.dest('build/'))
);

gulp.task('prod:server', () =>
  gulp.src('src/server/app.js')
  .pipe(webpack(require('./webpack/server/prod.js')))
  .pipe(gulp.dest('build/'))
);

gulp.task('lint', () =>
  gulp.src('src/**/*.js')
  .pipe(lint())
  .pipe(lint.format())
  .pipe(lint.failAfterError())
);

gulp.task('dev', ['clean', 'copy', 'dev:client', 'dev:server']);
gulp.task('prod', ['clean', 'copy', 'prod:client', 'prod:server']);
