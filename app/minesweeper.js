const { List, Map, Range, Set } = require('immutable');
const { Random } = require('random-js');

function generateRectangularFieldVertices(origin, size) {
  const [originX, originY] = origin;
  const [width, height] = size;

  return Range(originY, height)
    .map(y => Range(originX, width)
      .map(x => List([x, y])))
    .flatten(true)
};

exports.generateField = function(fieldSize) {
  const [width, height] = fieldSize;

  return generateRectangularFieldVertices(List([0,0]), fieldSize)
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

exports.adjacentVertices = function(vertice, fieldSize) {
  const [verticeX, verticeY] = vertice;
  const [width, height] = fieldSize;

  return generateRectangularFieldVertices(
    List([Math.max(0, verticeX - 1), Math.max(0, verticeY - 1)]),
    List([Math.min(width, verticeX + 2), Math.min(height, verticeY + 2)])
  ).toSet().delete(List(vertice))
};
