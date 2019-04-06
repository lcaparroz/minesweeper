const { List, Range } = require('immutable');

exports.generateRawField = function(height, width) {
  return Range(0, height).map(
    x => Range(0, width).map(
      y => List([x, y])
    )
  );
};
