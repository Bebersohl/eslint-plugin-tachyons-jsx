const _ = require('lodash');

const boxClasses = require('./box');
const placementClasses = require('./placement');
const textClasses = require('./text');

const mediaQueryExtensions = ['', '-ns', '-m', '-l'];

function generateMediaQueryClasses(classes, category) {
  let extensions = classes.map(x =>
    mediaQueryExtensions.map(extension => x + extension)
  );

  extensions = _.flatten(extensions);

  return extensions.reduce((map, key) => {
    return Object.assign(map, { [key]: category });
  }, {});
}

module.exports = Object.assign(
  {},
  generateMediaQueryClasses(placementClasses, 0),
  generateMediaQueryClasses(boxClasses, 1),
  generateMediaQueryClasses(textClasses, 2)
);
