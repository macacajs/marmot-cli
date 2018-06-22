'use strict';

const path = require('path');
const utils = require('xutil');
const urllib = require('urllib');
const iosUtils = require('ios-utils');
const istanbul = require('macaca-istanbul');
const g2js = require('gradle-to-js/lib/parser');

const iosGen = require('./ios/gen');

const _ = utils.merge({}, utils);

_.getMarmotHome = () => {
  return path.join(process.env.HOME, 'marmot_home');
};

_.getStaticServerRoot = () => {
  const home = _.getMarmotHome();
  return path.join(_.isInDocker() ? '/' : home, 'static');
};

_.isInDocker = () => {
  if (process.env.NOT_IN_DOCKER) {
    return false;
  }
  return _.getPlatformType() !== 'ios';
};

_.postToGW = async function (options, content) {
  const server = process.env.MARMOT_SERVER_URL || options.remote.server;
  return urllib.request(`${server}/api/gw`, {
    method: 'POST',
    data: content,
    contentType: 'json',
    dataType: 'json',
  });
};

_.getPlatformType = () => {
  const {
    ANDROID_HOME,
    GRADLE_HOME,
    MARMOT_ANDROID,
    MARMOT_IOS,
    MARMOT_WEB,
    ELECTRON_MIRROR,
  } = process.env;

  if (MARMOT_IOS) {
    return 'ios';
  } else if (MARMOT_ANDROID) {
    return 'android';
  } else if (MARMOT_WEB) {
    return 'web';
  }

  if (ANDROID_HOME || GRADLE_HOME) {
    return 'android';
  } else if (_.platform.isOSX) {
    return 'ios';
  } else if (ELECTRON_MIRROR) {
    return 'web';
  }

  return 'unknown';
};

_.getDepsPkgVersion = name => {
  let version;

  try {
    const pkg = path.join(process.cwd(), 'node_modules', name, 'package');
    version = require(pkg).version;
  } catch (e) {
    console.log(e);
  }
  return version;
};

iosUtils.iosGen = iosGen;
_.iosUtils = iosUtils;

_.androidUtils = {
  parseGradle: content => {
    return new Promise((resolve) => {
      g2js.parseText(content)
        .then(representation => {
          resolve(representation);
        });
    });
  },
};

_.webUtils = {
  summarizedCoverage: coverageResult => {
    const collector = new istanbul.Collector();
    collector.add(coverageResult);
    return istanbul
      .utils
      .summarizeCoverage(collector.getFinalCoverage());
  },
};

_.normalizeJobName = (jobName = '') => jobName.replace(/\//g, '_');

module.exports = _;
