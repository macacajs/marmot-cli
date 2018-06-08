'use strict';

const LCL = require('last-commit-log');

const _ = require('./helper');

module.exports = async function (options) {
  const lcl = new LCL(options.directory);
  const commit = await lcl.getLastCommit();
  const {
    GIT_URL,
    GIT_BRANCH
  } = process.env;

  const gitUrl = _.formatGitUrl(GIT_URL);

  return {
    ...commit,
    gitUrl,
    gitBranch: GIT_BRANCH
  };
};
