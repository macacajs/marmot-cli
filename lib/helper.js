'use strict';

const path = require('path');
const utils = require('xutil');
const urllib = require('urllib');
const iosUtils = require('ios-utils');
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

  if (MARMOT_ANDROID || ANDROID_HOME || GRADLE_HOME) {
    return 'android';
  } else if (MARMOT_IOS || _.platform.isOSX) {
    return 'ios';
  } else if (MARMOT_WEB || ELECTRON_MIRROR) {
    return 'web';
  }

  return 'unknown';
};

_.formatGitUrl = (url = '') => {
  if (url.startsWith('git@')) {
    return url
      .replace(/^git@/, '')
      .replace(/.git$/, '')
      .replace(/:/, '/');
  }
  return url;
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

module.exports = _;
