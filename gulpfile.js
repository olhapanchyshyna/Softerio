const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

function createStyle() {
    // Импортируем все необходимые файлы из sass директории
    return src('src/assets/sass/**/*.sass')
      // Компилируем sass в css
      .pipe(sass())
      // Объединяем все css файлы в один файл
      .pipe(concat('style.css'))
      // Добавляем автопрефиксы для поддержки последних 2 версий браузеров
      .pipe(autoprefixer({
          overrideBrowserslist: ['last 2 versions'],
          cascade: false
      }))
      // Минифицируем css код
      .pipe(cleanCSS({
          level: 2
      }))
      // Добавляем суффикс .min к имени файла
      .pipe(rename({
          suffix: '.min'
      }))
      // Копируем готовый файл в директорию dist/css
      .pipe(dest('dist/assets/css/'))
      // Обновляем браузер при изменении css файла
      .pipe(browserSync.stream());
  }

function copyHTML() {
    return src('src/*.html')
      .pipe(dest('dist'));
}

function copyAssets() {
    return src('src/assets/img/**/*')
    .pipe(dest('dist/assets/img'));
}

    
    
function createServer() {
    browserSync.init({
        server: {
          baseDir: './dist'
        }
      });

  watch('src/assets/sass/*.sass', createStyle).on('change', browserSync.reload);
  watch('./src/*.html', copyHTML).on('change', browserSync.reload);
}

exports.default = series(copyAssets, createStyle, copyHTML, createServer);
