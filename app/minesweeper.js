const { List, Map, Range, Set } = require('immutable');
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

exports.adjacentVertices = function(x, y, height, width) {
  return Range(Math.max(0, x - 1), Math.min(width, x + 2))
    .map(x => Range(Math.max(0, y - 1), Math.min(height, y + 2))
      .map(y => List([x, y])))
    .flatten(true)
    .toSet()
    .delete(List([x, y]))
}
