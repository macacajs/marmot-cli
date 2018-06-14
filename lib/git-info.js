'use strict';

const LCL = require('last-commit-log');

const _ = require('./helper');

module.exports = async function (directory) {
  const lcl = new LCL(directory);
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
