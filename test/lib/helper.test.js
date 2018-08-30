'use strict';

const sinon = require('sinon');
const assert = require('assert');
const urllib = require('urllib');

const helper = require('../../lib/helper');

describe('lib/helper', () => {
  it('should get marmot home', () => {
    const res = helper.getMarmotHome();
    assert(res.endsWith('/marmot_home'));
  });

  it('should get static server root', () => {
    const _env = process.env;

    process.env.HOME = '/home/docker';
    process.env.NOT_IN_DOCKER = true;
    let res = helper.getStaticServerRoot();
    assert(res === '/home/docker/marmot_home/static');

    delete process.env.NOT_IN_DOCKER;
    process.env.MARMOT_WEB = true;
    res = helper.getStaticServerRoot();
    assert(res === '/static');

    delete process.env.NOT_IN_DOCKER;
    delete process.env.MARMOT_WEB;
    process.env.MARMOT_IOS = true;
    res = helper.getStaticServerRoot();
    assert(res === '/home/docker/marmot_home/static');

    process.env = _env;
  });

  it('should post data to server', () => {
    const stub = sinon.stub(urllib, 'request').callsFake(function (...args) {
      assert.deepStrictEqual(args, [
        'http://example/api/gw',
        {
          method: 'POST',
          data: 'new message',
          contentType: 'json',
          dataType: 'json',
        },
      ]);
      stub.restore();
      return Promise.resolve({});
    });
    return helper.postToGW({
      remote: {
        server: 'http://example',
      },
    }, 'new message');
  });

  it('should get platform type', () => {
    const _env = process.env;

    process.env.MARMOT_IOS = true;
    assert(helper.getPlatformType() === 'ios');
    delete process.env.MARMOT_IOS;

    process.env.MARMOT_ANDROID = true;
    assert(helper.getPlatformType() === 'android');
    delete process.env.MARMOT_ANDROID;

    process.env.MARMOT_WEB = true;
    assert(helper.getPlatformType() === 'web');
    delete process.env.MARMOT_WEB;
    process.env = _env;
  });

  it('should get package version', () => {
    assert(helper.getDepsPkgVersion('last-commit-log').match(/^\d+.\d+\.\d+$/));
    assert(helper.getDepsPkgVersion('no-deps-last-commit-log') === undefined);
  });

  it('should normalize jobName', () => {
    assert(helper.normalizeJobName('group/project') === 'group_project');
    assert(helper.normalizeJobName('project') === 'project');
  });
});
