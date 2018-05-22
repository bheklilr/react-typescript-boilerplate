#!/usr/bin/env node

'use strict';

const shell = require('shelljs');
const exec = require('child_process').exec;
const path = require('path');
const fs = require('fs');
const animateProgress = require('./helpers/progress');
const addCheckMark = require('./helpers/checkmark');
const readline = require('readline');

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdout.write('\n');
let interval;
let clearRepo = true;


/**
 * Deletes the .git folder in dir only if cloned from our repo
 */
function cleanRepo(callback) {
    fs.readFile('.git/config', 'utf8', (err, data) => {
        if  (!err) {
            const isClonedRepo = typeof data === 'string'
                            && (data.match(/url\s*=/g) || []).length === 1
                            && /react-typescript-boilerplate\/react-typescript-boilerplate\.git/.test(data);
            if (isClonedRepo) {
                process.stdout.write('\nDo you want to clear old repository? [Y/n] ');
                process.stdin.resume();
                process.stdin.on('data', (data) => {
                    const val = data.toString().trim();
                    if (val === 'y' || val === 'Y' || val === '') {
                        process.stdout.write('Removing old repository');
                        shell.rm('-rf', '.git/');
                        addCheckMark(callback);
                    } else {
                        dontClearRepo('', callback);
                    }
                });
            } else {
                dontClearRepo('\n', callback);
            }
        } else {
            callback();
        }
    })
}

/**
 * Function which indicates we are not cleaning the git repo
 */
function dontClearRepo(nl, callback) {
    clearRepo = false;
    process.stdout.write(nl + 'Leaving your repository untouched');
    addCheckMark(callback);
}

/**
 * Initialize a new git repo
 */
function initGit(callback) {
    exec('git init && git add . && git commit -m "Initial commit from boilerplate"', addCheckMark.bind(null, callback));
}

/**
 * Deletes a file in the current directory
 */
function delFileInCWD(file, callback) {
    fs.unlink(path.join(__dirname, file), callback);
}

cleanRepo(() => {
    clearInterval(interval);
    process.stdout.write('\n\n');

    deleteFileInCurrentDir('setup.js', () => {
        if (clearRepo) {
            interval = animateProgress('Initializing new repository');
            process.stdout.write('Initializing new repository');
            initGit(() => {
                clearInterval(interval);
            });
        }
        process.stdout.write('\nDone!');
        process.stdout.write('\nRun `npm install` or `yarn install` to install dependencies.')
        process.exit(0);
    })
});