'use strict';

const assert = require('assert');

const getGitInfo = require('../../lib/git-info');

describe('lib/git-info', () => {
  it('should get git info', () => {
    return getGitInfo()
      .then(data => {
        assert(data.gitRemote === 'git@github.com:macacajs/marmot-cli.git');
        assert(data.gitUrl === 'http://github.com/macacajs/marmot-cli');
        assert(data.shortHash);
        assert(data.hash);
        assert(data.subject);
        assert(data.sanitizedSubject);
        assert(typeof data.body === 'string');
        assert(data.committer.date.match(/\d+/));
        assert(data.committer.relativeDate);
        assert(data.committer.name);
        assert(data.committer.email);
        assert(data.author.date.match(/\d+/));
        assert(data.author.relativeDate);
        assert(data.author.name);
        assert(data.author.email);
      });
  });
});
