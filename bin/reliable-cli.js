#!/usr/bin/env node

'use strict';

const {
  EOL,
} = require('os');
const _ = require('xutil');
const path = require('path');
const {
  spawn,
} = require('child_process');
const program = require('commander');

const pkg = require('../package');
const buildCmds = ['build', 'release', 'pack', 'lint', 'doc', 'coverage', 'setup', 'test'];
const chalk = _.chalk;

program
  .option('-v, --versions', 'show version and exit')
  .option('--verbose', 'show more debugging information')
  .usage('<command> [options] [arguments]')
  .helpInformation = function () {
    return [
      '',
      '  ' + chalk.white(pkg.description),
      '',
      '  Usage:',
      '',
      '    ' + this._name + ' ' + this.usage(),
      '',
      '  Commands:',
      '',
      '    report          report to Marmot server',
      '      <iOS> args:',
      '      <Android> args:',
      '      <Web> args:',
      '',
      '    build           execute build command',
      '      <iOS> args:',
      '      <Android> args:',
      '      <Web> args:',
      '',
      '    coverage        execute test cases and then gather coverage data',
      '      <iOS> args:',
      '      <Android> args:',
      '      <Web> args:',
      '',
      '    doc             auto generate documents',
      '      <iOS> args:',
      '      <Android> args:',
      '      <Web> args:',
      '',
      '    lint            scan and generate lint reports',
      '      <iOS> args:',
      '      <Android> args:',
      '      <Web> args:',
      '',
      '    pack            pack files and form a deliverable package',
      '      <iOS> args:',
      '      <Android> args:',
      '      <Web> args:',
      '',
      '    release         release current module (exclue Android & iOS app)',
      '      <iOS> args:',
      '      <Android> args:',
      '      <Web> args:',
      '',
      '    setup           based on current platform macro, execute make command',
      '      <iOS> args:',
      '      <Android> args:',
      '      <Web> args:',
      '',
      '    test            execute test cases',
      '      <iOS> args:',
      '      <Android> args:',
      '      <Web> args:',
      '',
      '  Options:',
      '',
      '' + this.optionHelp().replace(/^/gm, '    '),
      '',
      '  Further help:',
      '',
      '  ' + chalk.underline.white(pkg.homepage),
      '',
      '',
    ].join(EOL);
  };

program.parse(process.argv);

if (program.versions) {
  console.info('%s  %s%s', EOL, pkg.version, EOL);
  process.exit(0);
}

let cmd = program.args[0];

if (!cmd) {
  return program.help();
}

// for cmd which belongs to development process, all navigate to reliable-cli-make.js
if (buildCmds.includes(cmd)) {
  program.rawArgs.splice(3, 0, cmd);
  cmd = 'make';
}

const file = path.join(__dirname, `${pkg.name}-${cmd}.js`);

if (!_.isExistedFile(file)) {
  console.log('%s command `%s` not found', EOL, chalk.yellow(cmd));
  program.help();
  return;
}

const args = program.rawArgs.slice(3);
args.unshift(file);

const bootstrap = spawn('node', args, {
  stdio: [
    process.stdin,
    process.stdout,
    2,
    'ipc',
  ],
});

bootstrap.on('close', code => {
  process.exit('process exited with code ' + code);
});

bootstrap.on('exit', code => {
  process.exit(code);
});

bootstrap.on('message', e => {
  switch (e.signal) {
    case 'kill':
      bootstrap.kill();
      break;
    default :
      break;
  }
});
