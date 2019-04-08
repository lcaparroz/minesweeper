const { List, Map, Range } = require('immutable');
const { Random } = require('random-js');

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

exports.populateFieldWithMines = function(field, noOfMines) {
  const random = new Random();
  const mines = List(random.sample(field.keySeq().toArray(), noOfMines));

  return mines.reduce(
    (field, vertice) => { return field.setIn([vertice, 'mine'], true) }, field
  );
};
