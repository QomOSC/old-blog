const { existsSync, mkdirSync } = require('fs');
const webpack = require('webpack-stream');
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

gulp.task('copy', () => {
  if (!existsSync('build/static/uploads')) {
    mkdirSync('build/static/uploads');
  }

  return [
    gulp.src([
      'src/index.html'
    ])
    .pipe(gulp.dest('build/')),

    gulp.src([
      'src/server/ssl/*'
    ])
    .pipe(gulp.dest('build/ssl'))
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
