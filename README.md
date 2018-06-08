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

```
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
const helper = require('marmot-cli/lib/helper');
const {
  iosUtils,
  androidUtils
} = helper;
```

### Integration Samples

- [ios-app-bootstrap](//github.com/app-bootstrap/ios-app-bootstrap)
- [android-app-bootstrap](//github.com/app-bootstrap/android-app-bootstrap)

## Environment Variable

| name              | description                  |
| ----------------- | ---------------------------- |
| MARMOT_SERVER_URL | server url for Marmot server |

## License

The MIT License (MIT)
