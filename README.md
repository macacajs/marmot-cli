# marmot-cli

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/marmot-cli.svg?style=flat-square
[npm-url]: https://npmjs.org/package/marmot-cli
[travis-image]: https://img.shields.io/travis/macacajs/marmot-cli.svg?style=flat-square
[travis-url]: https://travis-ci.org/macacajs/marmot-cli
[coveralls-image]: https://img.shields.io/coveralls/macacajs/marmot-cli.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/macacajs/marmot-cli?branch=master
[node-image]: https://img.shields.io/badge/node.js-%3E=_8-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/marmot-cli.svg?style=flat-square
[download-url]: https://npmjs.org/package/marmot-cli

> command-line interface for Marmot

## Installment

```bash
$ npm i marmot-cli -g
```

## Usage

### report

```bash
$ marmot report -c ./marmot.config.js
```

## Configuration

```javascript
module.exports = {
  files: [
    `build/Release-iphonesimulator/${pkg.name}.app`
  ],
  packages: [
    {
      version,
      path: `${pkg.name}.app`,
    }
  ],
  testInfo: {
  },
  extraInfo: {
  }
};
```

User helper methods to resolve the iOS and Android platforms.

```javascript
const helper = require('marmot-cli');
const {
  iosUtils,
  androidUtils,
  webUtils,
} = helper;

// frequently methods

iosUtils

androidUtils.parseGradle

webUtils.summarizedCoverage

helper.getDepsPkgVersion

helper.isExistedFile

helper.isExistedDir

helper.moment

helper.mkdir

helper.rimraf

helper.shelljs

helper.detectPort
```

### Integration Samples

- [ios-app-bootstrap](//github.com/app-bootstrap/ios-app-bootstrap)
- [android-app-bootstrap](//github.com/app-bootstrap/android-app-bootstrap)
- [awesome-practice-projects](//github.com/app-bootstrap/awesome-practice-projects)
- [web-app-bootstrap](//github.com/app-bootstrap/web-app-bootstrap)

Example for ios-app-bootstrap:

```bash
$ MARMOT_SERVER_URL=http://127.0.0.1:9900 ci.sh
```

## Environment Variable

| name              | description                  |
| ----------------- | ---------------------------- |
| MARMOT_SERVER_URL | server url for Marmot server |

<!-- GITCONTRIBUTOR_START -->

## Contributors

|[<img src="https://avatars1.githubusercontent.com/u/1011681?v=4" width="100px;"/><br/><sub><b>xudafeng</b></sub>](https://github.com/xudafeng)<br/>|[<img src="https://avatars1.githubusercontent.com/u/2139038?v=4" width="100px;"/><br/><sub><b>zhangyuheng</b></sub>](https://github.com/zhangyuheng)<br/>
| :---: | :---: |


This project follows the git-contributor [spec](https://github.com/xudafeng/git-contributor), auto upated at `Sat Jun 09 2018 10:04:24 GMT+0800`.

<!-- GITCONTRIBUTOR_END -->

## License

The MIT License (MIT)
