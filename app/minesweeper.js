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
    || vertice.get("explored")
  );
}

function filterExplorableVertices(field, vertices = undefined) {
  return (vertices || field.get("vertices").keySeq().toSet())
    .filter(vertice => isExplorable(field.getIn(["vertices", vertice])))
    .toSet();
}

function generateField(fieldSize) {
  return generateRectangularFieldVertices(fieldSize)
    .reduce(
      (field, vertice) => {
        return field.setIn(
          ["vertices", vertice],
          Map({ mine: false, marked: false, explored: false })
        );
      },
      Map({ vertices: Map(), size: fieldSize })
    );
}

function generateMines(field, noOfMines) {
  const random = new Random();

  return Set(
    random.sample(field.get("vertices").keySeq().toArray(), noOfMines)
  );
}

function populateFieldWithMines(field, mines) {
  return mines.reduce(
    (field, vertice) => {
      const path = List(["vertices", vertice, "mine"]);

      return (field.hasIn(path) && field.setIn(path, true)) || field;
    }, field
  );
}

function adjacentVertices(field, vertice) {
  const [verticeX, verticeY] = vertice;
  const [width, height] = readFieldSize(field.get("size"));

  return Set.union([
    Range(Math.max(0, verticeX - 1), Math.min(width, verticeX + 2))
      .map(x => List([x, verticeY])).toSet(),
    Range(Math.max(0, verticeY - 1), Math.min(height, verticeY + 2))
      .map(y => List([verticeX, y])).toSet()
  ]).delete(vertice);
}

function navigation(field, verticeQueue) {
  if (verticeQueue.isEmpty()) return field;

  const vertice = verticeQueue.first();
  const updatedField = field.setIn(["vertices", vertice, "explored"], true);
  const updatedVerticeQueue = verticeQueue.concat(
    filterExplorableVertices(
      updatedField, adjacentVertices(updatedField, vertice)
    )
  ).delete(vertice);

  return navigation(updatedField, updatedVerticeQueue);
}

function exploreField(field, initialVertice) {
  return navigation(field, Set([initialVertice]));
}

module.exports = {
  adjacentVertices,
  filterExplorableVertices,
  generateField,
  generateMines,
  exploreField,
  populateFieldWithMines
};
