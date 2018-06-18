#!/usr/bin/env node

'use strict';

const _ = require('../lib/helper');
const platformType = _.getPlatformType();
const child_process = require('child_process');

let cmd = '';
let args = [];

if (platformType === 'ios') {
  console.log('executing make process for ios');
  console.log(process.argv);

  // args should be; [0]node, [1]js-file, [2]make-action....[3]configuration args
  if (process.argv.count <= 3) {
    console.error('invalid arguments');
    process.exit(0);
  }

  // check make action: 'build', 'release', 'test', 'pack' etc
  if (process.argv[2].indexOf('=') > 0) {
    console.error('invalid action');
    console.log(process.argv[2]);
    process.exit(0);
  }

  cmd = process.argv[2];
  args = `ARGS="--${process.argv.slice(3).join(' --')}"`;
  console.log(`make ${cmd} ${args}`);

} else if (platformType === 'android') {

} else {

}

// execute cmd
const build_process = child_process.spawn('make', [cmd, args], {
  stdio: [
    process.stdin,
    process.stdout,
    2,
    'ipc'
  ]
});

build_process.on('close', code => {
  process.exit('process exited with code ' + code);
});

build_process.on('exit', code => {
  process.exit(code);
});

build_process.on('message', e => {
  if (e.signal === 'kill') {
    build_process.kill();
  }
});
