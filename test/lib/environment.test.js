'use strict';

const assert = require('assert');

const enviroment = require('../../lib/environment');

describe('lib/enviroment', () => {
  let env;

  before(() => {
    env = Object.assign({}, process.env);
  });

  afterEach(() => {
    process.env = env;
  });

  it('should get env', () => {
    process.env.JOB_NAME = 'task_force';
    process.env.BUILD_NUMBER = '141';

    const envData = enviroment();
    assert(envData.jenkins.JOB_NAME === 'task_force');
    assert(envData.jenkins.BUILD_NUMBER === '141');
    assert(envData.platform);
    assert(envData.os.nodeVersion);
    assert(envData.os.platform);
  });
});
