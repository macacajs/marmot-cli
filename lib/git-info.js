'use strict';

const LCL = require('last-commit-log');

module.exports = async function (directory) {
  const lcl = new LCL(directory);
  return await lcl.getLastCommit();
};
