'use strict';

const path = require('path');
const utils = require('xutil');
const urllib = require('urllib');
const iosUtils = require('ios-utils');
const istanbul = require('macaca-istanbul');
const g2js = require('gradle-to-js/lib/parser');

const _ = utils.merge({}, utils);

_.getMarmotHome = () => {
  return path.join(process.env.HOME, 'marmot_home');
};

_.getStaticServerRoot = () => {
  const inDocker = _.getPlatformType() !== 'ios';
  const home = _.getMarmotHome();
  return path.join(inDocker ? '/' : home, 'static');
};

_.postToGW = async function (options, content) {
  const server = process.env.MARMOT_SERVER_URL || options.remote.server;
  return urllib.request(`${server}/api/gw`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    content: JSON.stringify(content),
    dataType: 'json'
  });
};

_.getPlatformType = () => {
  const {
    ANDROID_HOME,
    GRADLE_HOME,
    MARMOT_ANDROID,
    MARMOT_IOS,
    MARMOT_WEB,
    ELECTRON_MIRROR
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

/**
 * git@github.com:group/repo.git     => http://github.com/group/repo
 * https://github.com/group/repo.git => https://github.com/group/repo
 */
_.formatGitUrl = (url = '') => {
  if (url.startsWith('git@')) {
    return 'http://' + url
      .replace(/^git@/, '')
      .replace(/.git$/, '')
      .replace(/:/, '/');
  }
  if (url.startsWith('http') && url.endsWith('.git')) {
    return url.replace(/\.git$/, '');
  }
  return url;
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

_.iosUtils = iosUtils;

_.androidUtils = {
  parseGradle: content => {
    return new Promise((resolve) => {
      g2js.parseText(content)
        .then(representation => {
          resolve(representation);
        });
    });
  }
};

_.webUtils = {
  summarizedCoverage: coverageResult => {
    const collector = new istanbul.Collector();
    collector.add(coverageResult);
    return istanbul
      .utils
      .summarizeCoverage(collector.getFinalCoverage());
  }
};

module.exports = _;
