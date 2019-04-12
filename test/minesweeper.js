const chai = require('chai');
const chaiImmutable = require('chai-immutable');
const immutable = require('immutable');
const minesweeper = require ("../app/minesweeper");

chai.use(chaiImmutable);
const { expect } = chai;
const { List, Map, Set } = immutable;

describe("Minesweeper", function() {
  function emptyVertice() {
    return Map({ mine: false, marked: false, uncovered: false });
  };

  describe("generateField()", function() {
    context("when the field height is equal to its width", function() {
      it("returns a square field without mines", function() {
        const expectedField = Map([
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

        const resultField = minesweeper.generateField(List([3, 3]));

        expect(resultField).to.equal(expectedField);
      });
    });

    context("when the field height is greater than its width", function() {
      it("returns a vertical rectangular field without mines", function() {
        const expectedField = Map([
          [ List([0, 0]), emptyVertice() ],
          [ List([0, 1]), emptyVertice() ],
          [ List([0, 2]), emptyVertice() ],
          [ List([1, 0]), emptyVertice() ],
          [ List([1, 1]), emptyVertice() ],
          [ List([1, 2]), emptyVertice() ]
        ]);

        const resultField = minesweeper.generateField(List([2, 3]));

        expect(resultField).to.equal(expectedField);
      });
    });

    context("when the field width is greater than its height", function() {
      it("returns a horizontal rectangular field without mines", function() {
        const expectedField = Map([
          [ List([0, 0]), emptyVertice() ],
          [ List([0, 1]), emptyVertice() ],
          [ List([1, 0]), emptyVertice() ],
          [ List([1, 1]), emptyVertice() ],
          [ List([2, 0]), emptyVertice() ],
          [ List([2, 1]), emptyVertice() ]
        ]);

        const resultField = minesweeper.generateField(List([3, 2]));

        expect(resultField).to.equal(expectedField);
      });
    });
  });

  describe("populateFieldWithMines()", function() {
    it("returns a field with the given number of mines", function() {
      const emptyField = minesweeper.generateField(List([5, 5]));

      const resultField = minesweeper.populateFieldWithMines(emptyField, 5);

      const noOfMines = resultField
        .filter(vertice => vertice.get('mine'))
        .size;

      expect(noOfMines).to.equal(5);
    });
  });

  describe("adjacentVertices()", function() {
    const tests = [
      {
        position_text: "top-left corner",
        vertice: List([0, 0]),
        fieldSize: List([5, 5]),
        expected: Set.of(
          List([1, 0]),
          List([0, 1]),
          List([1, 1])
        )
      },
      {
        position_text: "top-right corner",
        vertice: List([4, 0]),
        fieldSize: List([5, 5]),
        expected: Set.of(
          List([3, 0]),
          List([3, 1]),
          List([4, 1])
        )
      },
      {
        position_text: "bottom-left corner",
        vertice: List([0, 4]),
        fieldSize: List([5, 5]),
        expected: Set.of(
          List([0, 3]),
          List([1, 3]),
          List([1, 4])
        )
      },
      {
        position_text: "bottom-right corner",
        vertice: List([4, 4]),
        fieldSize: List([5, 5]),
        expected: Set.of(
          List([3, 3]),
          List([4, 3]),
          List([3, 4])
        )
      },
      {
        position_text: "middle of the top side",
        vertice: List([2, 0]),
        fieldSize: List([5, 5]),
        expected: Set.of(
          List([1, 0]),
          List([3, 0]),
          List([1, 1]),
          List([2, 1]),
          List([3, 1])
        )
      },
      {
        position_text: "middle of the bottom side",
        vertice: List([2, 4]),
        fieldSize: List([5, 5]),
        expected: Set.of(
          List([1, 3]),
          List([2, 3]),
          List([3, 3]),
          List([1, 4]),
          List([3, 4])
        )
      },
      {
        position_text: "middle of the left side",
        vertice: List([0, 2]),
        fieldSize: List([5, 5]),
        expected: Set.of(
          List([0, 1]),
          List([1, 1]),
          List([1, 2]),
          List([0, 3]),
          List([1, 3])
        )
      },
      {
        position_text: "middle of the right side",
        vertice: List([4, 2]),
        fieldSize: List([5, 5]),
        expected: Set.of(
          List([3, 1]),
          List([4, 1]),
          List([3, 2]),
          List([3, 3]),
          List([4, 3])
        )
      },
      {
        position_text: "middle of the field",
        vertice: List([2, 2]),
        fieldSize: List([5, 5]),
        expected: Set.of(
          List([1, 1]),
          List([2, 1]),
          List([3, 1]),
          List([1, 2]),
          List([3, 2]),
          List([1, 3]),
          List([2, 3]),
          List([3, 3])
        )
      }
    ];

    tests.forEach(function(test) {
      context("when the vertice's in the " + test.position_text, function() {
        it("returns " + test.expected.size + " adjacent vertices", function() {
          const resultAdjacent = minesweeper
            .adjacentVertices(test.vertice, test.fieldSize);

          expect(resultAdjacent).to.equal(test.expected)
        });
      });
    });
  });
});
