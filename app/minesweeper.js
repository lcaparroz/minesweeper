const { List, Map, Range, Set } = require("immutable");
const { Random } = require("random-js");

function readFieldSize(size) {
  return List([size.get("width"), size.get("height")]);
}

function generateRectangularFieldVertices(size, origin = List([0, 0])) {
  const [originX, originY] = origin;
  const [width, height] = readFieldSize(size);

  return Range(originY, height)
    .map(y => Range(originX, width)
      .map(x => List([x, y])))
    .flatten(true);
}

function isExplorable(vertice) {
  return !(
    vertice.get("mine")
    || vertice.get("marked")
    || vertice.get("uncovered")
  );
}

exports.filterExplorableVertices = function(field, vertices = undefined) {
  return (vertices || field.keySeq().toSet())
    .filter(vertice => isExplorable(field.get(vertice)))
    .keySeq()
    .toSet();
};

exports.generateField = function(fieldSize) {
  return generateRectangularFieldVertices(fieldSize)
    .reduce(
      (field, vertice) => {
        return field.set(
          vertice, Map({ mine: false, marked: false, uncovered: false })
        );
      },
      Map()
    );
};

exports.generateMines = function(field, noOfMines) {
  const random = new Random();

  return Set(random.sample(field.keySeq().toArray(), noOfMines));
};

exports.populateFieldWithMines = function(field, mines) {
  return mines.reduce(
    (field, vertice) => {
      const path = List([vertice, "mine"]);

      return (field.hasIn(path) && field.setIn(path, true)) || field;
    }, field
  );
};

exports.adjacentVertices = function(vertice, fieldSize) {
  const [verticeX, verticeY] = vertice;
  const [width, height] = readFieldSize(fieldSize);

  return Set.union([
    Range(Math.max(0, verticeX - 1), Math.min(width, verticeX + 2))
      .map(x => List([x, verticeY])).toSet(),
    Range(Math.max(0, verticeY - 1), Math.min(height, verticeY + 2))
      .map(y => List([verticeX, y])).toSet()
  ]).delete(vertice);
};
