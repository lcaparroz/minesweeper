const { Map, List, Repeat } = require('immutable');

exports.generateBlankMap = function(height, width) {
  return List([]).setSize(height)
    .map(_ => List(Repeat(null, width)));
};
