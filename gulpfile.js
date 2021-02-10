const gulp = require("gulp")
const scss = require("gulp-sass")
const del = require('del')
const cssnano = require('gulp-cssnano')
const uglify = require('gulp-uglifyjs')
const autoprefixer = require('gulp-autoprefixer')

const { src, dest, watch, parallel } = require('gulp')


async function tocss(){
    src('style.scss')
    .pipe(scss().on('error', scss.logError))
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(cssnano())
    .pipe(dest('css/'))
}

const scss_file = watch(['./**/*.scss'])

function watchFile(){
    scss_file.on('change', function(){
        tocss()
    })
}

async function move(){
    src(['css/*css']).pipe(dest('build/css'))
    src(['pics/*.*']).pipe(dest('build/pics'))
    src(['svg/*.svg']).pipe(dest('build/svg'))
    src(['*.html', 'main.js'])
    .pipe(dest('build'))
}

async function clean(){
    await del(['build/**/*'])
}

exports.tocss = tocss
exports.watch = watchFile
exports.build = parallel(clean, tocss, move)