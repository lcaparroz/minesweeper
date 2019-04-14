const { List, Map, Range, Set } = require("immutable");
const { Random } = require("random-js");

function generateRectangularFieldVertices(origin, size) {
  const [originX, originY] = origin;
  const [width, height] = size;

  return Range(originY, height)
    .map(y => Range(originX, width)
      .map(x => List([x, y])))
    .flatten(true);
}

exports.generateField = function(fieldSize) {
  return generateRectangularFieldVertices(List([0,0]), fieldSize)
    .reduce(
      (field, vertice) => {
        return field.set(
          vertice, Map({ mine: false, marked: false, uncovered: false })
        );
      },
      Map()
    );
};

exports.populateFieldWithMines = function(field, noOfMines) {
  const random = new Random();
  const mines = List(random.sample(field.keySeq().toArray(), noOfMines));

  return mines.reduce(
    (field, vertice) => { return field.setIn([vertice, "mine"], true); }, field
  );
};

exports.adjacentVertices = function(vertice, fieldSize) {
  const [verticeX, verticeY] = vertice;
  const [width, height] = fieldSize;

  return Set.union([
    Range(Math.max(0, verticeX - 1), Math.min(width, verticeX + 2))
      .map(x => List([x, verticeY])).toSet(),
    Range(Math.max(0, verticeY - 1), Math.min(height, verticeY + 2))
      .map(y => List([verticeX, y])).toSet()
  ]).delete(vertice);
};
