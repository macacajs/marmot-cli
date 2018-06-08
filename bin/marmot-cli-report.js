#!/usr/bin/env node

const {
  EOL
} = require('os');
const path = require('path');
const program = require('commander');

const _ = require('../lib/helper');

const getEnv = require('../lib/environment');
const getCommitInfo = require('../lib/git-info');
const getPackages = require('../lib/package-info');
const postFileToStatic = require('../lib/move-files');

const {
  chalk,
  postToGW
} = _;

program
  .option('--verbose', 'show more debugging information')
  .option('-d, --directory <path>', 'Set project directory')
  .option('-c, --config <s>', 'set configuration file')
  .option('-o, --optionstr <s>', 'set options string')
  .parse(process.argv);

let options = {
  directory: program.directory || process.cwd(),
  remote: {
    server: null
  },
  files: [],
  packages: [],
  testInfo: {},
  extraInfo: {}
};

options.directory = path.resolve(options.directory);

async function init() {

  if (program.config) {
    const configFile = path.resolve(program.config);

    if (_.isExistedFile(configFile)) {
      console.log(`${EOL}configuration file: ${chalk.cyan(configFile)}`);
      const mod = require(configFile);
      if (typeof mod === 'function') {
        options = await mod(options);
      } else {
        options = Object.assign(options, mod);
      }
    }
  }

  if (program.optionstr) {
    try {
      options = Object.assign(options, JSON.parse(program.optionstr));
    } catch (e) {
      console.log(e);
    }
  }

  const enviroment = await getEnv();
  const gitCommitInfo = await getCommitInfo(options);
  const packages = getPackages(options);

  // after all, the files will be migrate
  const files = await postFileToStatic(options);

  const request = {
    enviroment,
    gitCommitInfo,
    files,
    packages,
    testInfo: options.testInfo,
    extraInfo: options.extraInfo
  };

  try {
    const response = await postToGW(options, request);

    if (response.status === 200 && response.data.success) {
      console.log(chalk.green('[DONE] Upload ci result.'));
      console.log('response data: \n', JSON.stringify(response.data, null, 2));
    } else {
      console.log(chalk.red('[FAILED] Upload ci result.'));
      console.log('request:', request);
      console.log('response:', response);
    }
  } catch (e) {
    console.log(chalk.red('[FAILED] Upload ci result.'));
    console.error('request:', request);
    console.error('error:', e);
  }
}

init();
