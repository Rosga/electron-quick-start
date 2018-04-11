"use strict";

const fs = require("fs");
const path = require("path");

// *** Load plugins ***

var gulp = require("gulp");

// Packages for Electron
var childProcess = require('child_process');
var electron = require('electron');

var config = {
    paths: {
        appFolder: "./app",
        buildFolder: "./build",
        testsFolder: "./app/tests",
        assets: {
            rootFolder: "./app/assets",
            stylesFolder: "./app/assets/styles"
        }
    }
};

// *** Tasks ***
gulp.task("copy", copyRawFiles);

gulp.task("copy:node_modules", copyNodeModules);

gulp.task("watch", function () {
    gulp.watch("./app/*.+(html|js)", ["copy"]);
});

gulp.task("build", ["copy"]);

gulp.task("start", ["build"], function () {
    start();
});

gulp.task("default", ["watch", "start"]);
gulp.task("default:nobuild", ["watch", "start:nobuild"]);

function copyRawFiles() {
    var filesToCopy = [
        config.paths.appFolder + "/*.+(js|json|html)"
    ];

    return gulp.src(filesToCopy, { base: "app" })
        .pipe(gulp.dest(config.paths.buildFolder));
}

function copyNodeModules() {
    var filesToCopy = [
        config.paths.appFolder + "/node_modules/**"
    ];

    return gulp.src(filesToCopy, { base: "app" })
        .pipe(gulp.dest(config.paths.buildFolder, {
            overwrite: true
        }));
}

function start() {
    console.log("node env => ", process.env.NODE_ENV);
    childProcess.spawn(electron, ["./build"], {
        stdio: 'inherit'
    })
        .on('close', function () {
            // User closed the app. Kill the host process.
            process.exit();
        })
        .on("error", function () {
            console.log(arguments);
        });
}
