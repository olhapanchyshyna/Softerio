const { src, dest, watch, series, gulp} = require('gulp'); //тут не правильно
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css'); // минификация (удаляет пробелы,коментарии)
const rename = require('gulp-rename'); 
const browserSync = require('browser-sync').create();
const webpack = require('webpack-stream');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

function createStyle() {
    // Импортируем все необходимые файлы из sass директории
    return src('src/assets/sass/**/*.sass')
      // Компилируем sass в css
      .pipe(sass())
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


function buildJs() {
    return src('./src/js/main.js')
            .pipe(webpack({
                mode: 'development',
                output: {
                    filename: 'script.js'
                },
                watch: false,
                devtool: "source-map",
                module: {
                    rules: [
                        {
                            test: /.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                                loader: 'babel-loader',
                                options: {
                                    presets: [['@babel/preset-env', {
                                        debug: true,
                                        corejs: 3,
                                        useBuiltIns: "usage"
                                    }]]
                                }
                            }
                        }
                    ]
                }
            }))
            .pipe(dest('dist'))
}

function buildProdJs() {
    return src('./src/js/main.js')
        .pipe(webpack({
            mode: 'production',
            output: {
                filename: 'script.js'
            },
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [['@babel/preset-env', {
                                corejs: 3,
                                useBuiltIns: "usage"
                            }]]
                        }
                        }
                    }
                ]
            }
        }))
            .pipe(dest('dist'))
}

function copyHTML() {
    return src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist'));
}

function copyImg() {
    return src('src/assets/*/**/*')
    .pipe(imagemin())
    .pipe(dest('dist/assets'))
    .pipe(browserSync.stream());
}
    
function createServer() {
    browserSync.init({
        server: {
          baseDir: 'dist'
        }
      });

  watch('./src/assets/sass/*.sass', createStyle).on('change', browserSync.reload);
  watch('./src/*.html', copyHTML).on('change', browserSync.reload);
  watch('./src/assets/*/**/*', copyImg).on('change', browserSync.reload);
  watch('./src/js/**/*.js', buildJs).on('change', browserSync.reload);
}

exports.default = series(buildJs, copyImg, createStyle, copyHTML, createServer);
