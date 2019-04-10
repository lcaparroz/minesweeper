const chai = require('chai');
const chaiImmutable = require('chai-immutable');
const immutable = require('immutable');
const minesweeper = require ("../app/minesweeper");

chai.use(chaiImmutable);
const { expect } = chai;
const { List, Map, Set } = immutable;

describe("Minesweeper", function() {
  describe("generateField()", function() {
    it("returns an empty field without mines", function() {
      const expectedField = h3w3Field();

      const resultField = minesweeper.generateField(3, 3);

      expect(resultField).to.equal(expectedField);
    });
  });

  describe("populateFieldWithMines()", function() {
    it("returns a field with the given number of mines", function () {
      const emptyField = h3w3Field();

      const resultField = minesweeper.populateFieldWithMines(emptyField, 5);

      const noOfMines = resultField
        .filter(vertice => vertice.get('mine'))
        .size;

      expect(noOfMines).to.equal(5);
    });
  });

  describe("adjacentVertices()", function() {
    context("when the vertice's on the top-left corner", function () {
      it("returns 3 adjacent vertices", function() {
        const expectedAdjacent = Set.of(
          List([1, 0]),
          List([0, 1]),
          List([1, 1])
        );

        const resultAdjacent = minesweeper.adjacentVertices(0, 0, 5, 5);

        expect(resultAdjacent).to.equal(expectedAdjacent)
      });
    });

    context("when the vertice's on the top-right corner", function () {
      it("returns 3 adjacent vertices", function() {
        const expectedAdjacent = Set.of(
          List([3, 0]),
          List([3, 1]),
          List([4, 1])
        );

        const resultAdjacent = minesweeper.adjacentVertices(4, 0, 5, 5);

        expect(resultAdjacent).to.equal(expectedAdjacent)
      });
    });

    context("when the vertice's on the bottom-left corner", function () {
      it("returns 3 adjacent vertices", function() {
        const expectedAdjacent = Set.of(
          List([0, 3]),
          List([1, 3]),
          List([1, 4])
        );

        const resultAdjacent = minesweeper.adjacentVertices(0, 4, 5, 5);

        expect(resultAdjacent).to.equal(expectedAdjacent)
      });
    });

    context("when the vertice's on the bottom-right corner", function () {
      it("returns 3 adjacent vertices", function() {
        const expectedAdjacent = Set.of(
          List([3, 3]),
          List([4, 3]),
          List([3, 4])
        );

        const resultAdjacent = minesweeper.adjacentVertices(4, 4, 5, 5);

        expect(resultAdjacent).to.equal(expectedAdjacent)
      });
    });

    context("when the vertice's in the middle of the top side", function () {
      it("returns 5 adjacent vertices", function() {
        const expectedAdjacent = Set.of(
          List([1, 0]),
          List([3, 0]),
          List([1, 1]),
          List([2, 1]),
          List([3, 1])
        );

        const resultAdjacent = minesweeper.adjacentVertices(2, 0, 5, 5);

        expect(resultAdjacent).to.equal(expectedAdjacent)
      });
    });

    context("when the vertice's in the middle of the bottom side", function () {
      it("returns 5 adjacent vertices", function() {
        const expectedAdjacent = Set.of(
          List([1, 3]),
          List([2, 3]),
          List([3, 3]),
          List([1, 4]),
          List([3, 4])
        );

        const resultAdjacent = minesweeper.adjacentVertices(2, 4, 5, 5);

        expect(resultAdjacent).to.equal(expectedAdjacent)
      });
    });

    context("when the vertice's in the middle of the left side", function () {
      it("returns 5 adjacent vertices", function() {
        const expectedAdjacent = Set.of(
          List([0, 1]),
          List([1, 1]),
          List([1, 2]),
          List([0, 3]),
          List([1, 3])
        );

        const resultAdjacent = minesweeper.adjacentVertices(0, 2, 5, 5);

        expect(resultAdjacent).to.equal(expectedAdjacent)
      });
    });

    context("when the vertice's in the middle of the right side", function () {
      it("returns 5 adjacent vertices", function() {
        const expectedAdjacent = Set.of(
          List([3, 1]),
          List([4, 1]),
          List([3, 2]),
          List([3, 3]),
          List([4, 3])
        );

        const resultAdjacent = minesweeper.adjacentVertices(4, 2, 5, 5);

        expect(resultAdjacent).to.equal(expectedAdjacent)
      });
    });

    context("when the vertice's in the middle of the field", function () {
      it("returns 8 adjacent vertices", function() {
        const expectedAdjacent = Set.of(
          List([1, 1]),
          List([2, 1]),
          List([3, 1]),
          List([1, 2]),
          List([3, 2]),
          List([1, 3]),
          List([2, 3]),
          List([3, 3])
        );

        const resultAdjacent = minesweeper.adjacentVertices(2, 2, 5, 5);

        expect(resultAdjacent).to.equal(expectedAdjacent)
      });
    });
  });
});

function h3w3Field() {
  const emptyVertice = function() {
    return Map({
      mine: false,
      marked: false,
      uncovered: false
    });
  };

  return Map([
    [ List([0, 0]), emptyVertice() ],
    [ List([0, 1]), emptyVertice() ],
    [ List([0, 2]), emptyVertice() ],
    [ List([1, 0]), emptyVertice() ],
    [ List([1, 1]), emptyVertice() ],
    [ List([1, 2]), emptyVertice() ],
    [ List([2, 0]), emptyVertice() ],
    [ List([2, 1]), emptyVertice() ],
    [ List([2, 2]), emptyVertice() ]
  ]);
};
