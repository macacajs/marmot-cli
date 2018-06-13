'use strict';

const fs = require('fs');
const path = require('path');
const microtemplate = require('microtemplate');

var Render = require('microtemplate').render;

exports.genDownloadHtml = (options) => {
  const template = path.join(__dirname, 'download.template');
  const content = fs.readFileSync(template, 'utf8');
  const output = Render(content, options, {
    tagOpen: '<#',
    tagClose: '#>'
  });
  return output;
};

exports.genPlist = (options) => {
  const template = path.join(__dirname, 'plist.template');
  const content = fs.readFileSync(template, 'utf8');
  const output = Render(content, options, {
    tagOpen: '<#',
    tagClose: '#>'
  });
  return output;
};
