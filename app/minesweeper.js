const { List, Map, Range } = require('immutable');

exports.generateField = function(height, width) {
  return Range(0, height)
    .map(x => Range(0, width).map(y => List([x, y])))
    .flatten(true)
    .reduce(
      (field, vertice) => {
        return field.set(
          vertice, Map({ mine: false, marked: false, uncovered: false })
        )
      },
      Map()
    );
};
