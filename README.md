# reliable-cli

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/reliable-cli.svg?style=flat-square
[npm-url]: https://npmjs.org/package/reliable-cli
[travis-image]: https://img.shields.io/travis/macacajs/reliable-cli.svg?style=flat-square&logo=travis
[travis-url]: https://travis-ci.org/macacajs/reliable-cli
[codecov-image]: https://img.shields.io/codecov/c/github/macacajs/reliable-cli.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/macacajs/reliable-cli
[node-image]: https://img.shields.io/badge/node.js-%3E=_8-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/reliable-cli.svg?style=flat-square
[download-url]: https://npmjs.org/package/reliable-cli

> command-line interface for Marmot

## Installment

```bash
$ npm i reliable-cli -g
```

## Usage

### report

```bash
$ reliable report -c ./reliable.config.js
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
const helper = require('reliable-cli').helper;
const {
  iosUtils,
  androidUtils,
  webUtils,
} = helper;

// frequently methods

https://macacajs.github.io/reliable-cli/

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

|[<img src="https://avatars1.githubusercontent.com/u/1011681?v=4" width="100px;"/><br/><sub><b>xudafeng</b></sub>](https://github.com/xudafeng)<br/>|[<img src="https://avatars1.githubusercontent.com/u/2139038?v=4" width="100px;"/><br/><sub><b>zhangyuheng</b></sub>](https://github.com/zhangyuheng)<br/>|[<img src="https://avatars2.githubusercontent.com/u/4408102?v=4" width="100px;"/><br/><sub><b>YvonneZhang</b></sub>](https://github.com/YvonneZhang)<br/>|[<img src="https://avatars0.githubusercontent.com/u/8198256?v=4" width="100px;"/><br/><sub><b>SamuelZhaoY</b></sub>](https://github.com/SamuelZhaoY)<br/>|[<img src="https://avatars3.githubusercontent.com/u/1818483?v=4" width="100px;"/><br/><sub><b>ltianqi</b></sub>](https://github.com/ltianqi)<br/>
| :---: | :---: | :---: | :---: | :---: |


This project follows the git-contributor [spec](https://github.com/xudafeng/git-contributor), auto upated at `Thu Aug 16 2018 21:59:35 GMT+0800`.

<!-- GITCONTRIBUTOR_END -->

## License

The MIT License (MIT)
