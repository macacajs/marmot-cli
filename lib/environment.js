'use strict';

const os = require('os');

const _ = require('./helper');

module.exports = () => {
  const env = process.env;
  return {
    jenkins: {
      JOB_NAME: _.normalizeJobName(env.JOB_NAME),
      BUILD_NUMBER: env.BUILD_NUMBER,
    },
    platform: _.getPlatformType(),
    os: {
      nodeVersion: process.version,
      platform: os.platform(),
    },
  };
};
