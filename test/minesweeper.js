const chai = require("chai");
const chaiImmutable = require("chai-immutable");
const immutable = require("immutable");
const minesweeper = require ("../app/minesweeper");

chai.use(chaiImmutable);
const { expect } = chai;
const { List, Map, Set } = immutable;

describe("Minesweeper", function() {
  function emptyVertice() {
    return Map({ mine: false, marked: false, uncovered: false });
  }

  describe("filterExplorableVertices()", function() {
    context("when all field's vertices are unexplored", function() {
      context("and a set of vertices is not specified ", function() {
        it("returns a set of all vertices in the field", function() {
          const emptyField = minesweeper
            .generateField(Map({ width: 3, height: 3 }));

          const expectedVertices = Set([
            List([0, 0]), List([1, 0]), List([2, 0]),
            List([0, 1]), List([1, 1]), List([2, 1]),
            List([0, 2]), List([1, 2]), List([2, 2])
          ]);

          const resultVertices = minesweeper
            .filterExplorableVertices(emptyField);

          expect(resultVertices).to.equal(expectedVertices);
        });
      });

      context("and a set of vertices is specified", function() {
        it("retuns the specified set of vertices", function() {
          const emptyField = minesweeper
            .generateField(Map({ width: 3, height: 3 }));

          const specifiedVertices = Set([
            List([0, 0]), List([1, 0]), List([0, 1]), List([1, 1])
          ]);

          const resultVertices = minesweeper
            .filterExplorableVertices(emptyField, specifiedVertices);

          expect(resultVertices).to.equal(specifiedVertices);
        });
      });
    });

    context("when all vertices are explored", function() {
      context("and a set of vertices is not specified ", function() {
        it("returns a empty set", function() {
          const emptyField = minesweeper
            .generateField(Map({ width: 3, height: 3 }));

          const exploredField = emptyField
            .get("vertices")
            .keySeq()
            .reduce(
              (field, vertice) => {
                const path = List(["vertices", vertice, "uncovered"]);

                return field.setIn(path, true);
              }, emptyField
            );

          const resultVertices = minesweeper
            .filterExplorableVertices(exploredField);

          expect(resultVertices).to.equal(Set());
        });
      });

      context("and a set of vertices is specified", function() {
        it("returns a empty set", function() {
          const emptyField = minesweeper
            .generateField(Map({ width: 3, height: 3 }));

          const exploredField = emptyField
            .get("vertices")
            .keySeq()
            .reduce(
              (field, vertice) => {
                const path = List(["vertices", vertice, "uncovered"]);

                return field.setIn(path, true);
              }, emptyField
            );

          const specifiedVertices = Set([
            List([1, 1]), List([2, 1]), List([1, 2]), List([2, 2])
          ]);

          const resultVertices = minesweeper
            .filterExplorableVertices(exploredField, specifiedVertices);

          expect(resultVertices).to.equal(Set());
        });
      });
    });

    context("when there are vertices with mines", function() {
      context("and a set of vertices is not specified ", function() {
        it("returns a set containing only vertices without mines", function() {
          const emptyField = minesweeper
            .generateField(Map({ width: 3, height: 3 }));

          const mines = Set([
            List([0, 0]), List([2, 0]), List([1, 1]), List([0, 2]), List([2, 2])
          ]);

          const fieldWithMines = minesweeper
            .populateFieldWithMines(emptyField, mines);

          const expectedVertices = Set([
            List([1, 0]), List([0, 1]), List([2, 1]), List([1, 2])
          ]);

          const resultVertices = minesweeper
            .filterExplorableVertices(fieldWithMines);

          expect(resultVertices).to.equal(expectedVertices);
        });
      });

      context("and a set of vertices is specified", function() {
        it("returns a subset of the specified vertices wo/ mines", function() {
          const emptyField = minesweeper
            .generateField(Map({ width: 3, height: 3 }));

          const mines = Set([
            List([0, 0]), List([2, 0]), List([1, 1]), List([0, 2]), List([2, 2])
          ]);

          const fieldWithMines = minesweeper
            .populateFieldWithMines(emptyField, mines);

          const specifiedVertices = Set([
            List([0, 1]), List([1, 1]), List([0, 2]), List([1, 2])
          ]);

          const expectedVertices = Set([ List([0, 1]), List([1, 2]) ]);

          const resultVertices = minesweeper
            .filterExplorableVertices(fieldWithMines, specifiedVertices);

          expect(resultVertices).to.equal(expectedVertices);
        });
      });
    });
  });

  describe("generateField()", function() {
    context("when the field height is equal to its width", function() {
      it("returns a square field without mines", function() {
        const expectedField = Map({
          vertices: Map([
            [ List([0, 0]), emptyVertice() ],
            [ List([0, 1]), emptyVertice() ],
            [ List([0, 2]), emptyVertice() ],
            [ List([1, 0]), emptyVertice() ],
            [ List([1, 1]), emptyVertice() ],
            [ List([1, 2]), emptyVertice() ],
            [ List([2, 0]), emptyVertice() ],
            [ List([2, 1]), emptyVertice() ],
            [ List([2, 2]), emptyVertice() ]
          ]),
          size: Map({ width: 3, height: 3 })
        });

        const resultField = minesweeper
          .generateField(Map({ width: 3, height: 3 }));

        expect(resultField).to.equal(expectedField);
      });
    });

    context("when the field height is greater than its width", function() {
      it("returns a vertical rectangular field without mines", function() {
        const expectedField = Map({
          vertices: Map([
            [ List([0, 0]), emptyVertice() ],
            [ List([0, 1]), emptyVertice() ],
            [ List([0, 2]), emptyVertice() ],
            [ List([1, 0]), emptyVertice() ],
            [ List([1, 1]), emptyVertice() ],
            [ List([1, 2]), emptyVertice() ]
          ]),
          size: Map({ width: 2, height: 3 })
        });

        const resultField = minesweeper
          .generateField(Map({ width: 2, height: 3 }));

        expect(resultField).to.equal(expectedField);
      });
    });

    context("when the field width is greater than its height", function() {
      it("returns a horizontal rectangular field without mines", function() {
        const expectedField = Map({
          vertices: Map([
            [ List([0, 0]), emptyVertice() ],
            [ List([0, 1]), emptyVertice() ],
            [ List([1, 0]), emptyVertice() ],
            [ List([1, 1]), emptyVertice() ],
            [ List([2, 0]), emptyVertice() ],
            [ List([2, 1]), emptyVertice() ]
          ]),
          size: Map({ width: 3, height: 2 })
        });

        const resultField = minesweeper
          .generateField(Map({ width: 3, height: 2 }));

        expect(resultField).to.equal(expectedField);
      });
    });
  });

  describe("generateMines()", function() {
    context("when the requested no. of mines is greater than zero", function() {
      it("returns a set of vertices with the no. of mines", function() {
        const emptyField = minesweeper
          .generateField(Map({ width: 5, height: 5 }));

        const resultMines = minesweeper.generateMines(emptyField, 5);

        expect(resultMines.size).to.equal(5);
      });

      it("returns a Set of List elements", function() {
        const emptyField = minesweeper
          .generateField(Map({ width: 5, height: 5 }));

        const resultMines = minesweeper.generateMines(emptyField, 5);

        const isValidSetOfMines = Set.isSet(resultMines) && resultMines
          .map((mine) => List.isList(mine) && (mine.size == 2))
          .every((mine) => mine == true);

        expect(isValidSetOfMines).to.be.true;
      });
    });

    context("when the no. of mines is zero", function() {
      it("returns a empty set", function() {
        const emptyField = minesweeper
          .generateField(Map({ width: 5, height: 5 }));

        const resultMines = minesweeper.generateMines(emptyField, 0);

        expect(resultMines).to.equal(Set([ ]));
      });
    });
  });

  describe("populateFieldWithMines()", function() {
    context("when the set of mines has only valid vertices", function() {
      it("returns a field populated with all mines", function() {
        const emptyField = minesweeper
          .generateField(Map({ width: 5, height: 5 }));
        const mines = Set([
          List([0,0]), List([0, 4]), List([4, 0]), List([4, 4]), List([2, 2])
        ]);

        const resultField = minesweeper
          .populateFieldWithMines(emptyField, mines);

        const resultMines = resultField
          .get("vertices")
          .filter(vertice => vertice.get("mine"))
          .keySeq()
          .toSet();

        expect(resultMines).to.equal(mines);
      });
    });

    context("when the set of mines has invalid vertices", function() {
      it("returns a field populated with only valid mines", function() {
        const emptyField = minesweeper
          .generateField(Map({ width: 5, height: 5 }));

        const validMines = Set([ List([0, 4]), List([4, 0]), List([2, 2]) ]);
        const invalidMines = Set([ List([-1,0]), List([4, 6]) ]);

        const resultField = minesweeper
          .populateFieldWithMines(
            emptyField,
            Set.union([validMines, invalidMines])
          );

        const resultMines = resultField
          .get("vertices")
          .filter(vertice => vertice.get("mine"))
          .keySeq()
          .toSet();

        expect(resultMines).to.equal(validMines);
      });
    });

    context("when the set of mines is empty", function() {
      it("returns the same field, unaltered", function() {
        const emptyField = minesweeper
          .generateField(Map({ width: 5, height: 5 }));
        const mines = Set([ ]);

        const resultField = minesweeper
          .populateFieldWithMines(emptyField, mines);

        expect(resultField).to.equal(emptyField);
      });
    });
  });

  describe("adjacentVertices()", function() {
    const tests = [
      {
        position_text: "top-left corner",
        vertice: List([0, 0]),
        fieldSize: Map({ width: 5, height: 5 }),
        expected: Set.of(
          List([1, 0]),
          List([0, 1])
        )
      },
      {
        position_text: "top-right corner",
        vertice: List([4, 0]),
        fieldSize: Map({ width: 5, height: 5 }),
        expected: Set.of(
          List([3, 0]),
          List([4, 1])
        )
      },
      {
        position_text: "bottom-left corner",
        vertice: List([0, 4]),
        fieldSize: Map({ width: 5, height: 5 }),
        expected: Set.of(
          List([0, 3]),
          List([1, 4])
        )
      },
      {
        position_text: "bottom-right corner",
        vertice: List([4, 4]),
        fieldSize: Map({ width: 5, height: 5 }),
        expected: Set.of(
          List([4, 3]),
          List([3, 4])
        )
      },
      {
        position_text: "middle of the top side",
        vertice: List([2, 0]),
        fieldSize: Map({ width: 5, height: 5 }),
        expected: Set.of(
          List([1, 0]),
          List([3, 0]),
          List([2, 1])
        )
      },
      {
        position_text: "middle of the bottom side",
        vertice: List([2, 4]),
        fieldSize: Map({ width: 5, height: 5 }),
        expected: Set.of(
          List([2, 3]),
          List([1, 4]),
          List([3, 4])
        )
      },
      {
        position_text: "middle of the left side",
        vertice: List([0, 2]),
        fieldSize: Map({ width: 5, height: 5 }),
        expected: Set.of(
          List([0, 1]),
          List([1, 2]),
          List([0, 3])
        )
      },
      {
        position_text: "middle of the right side",
        vertice: List([4, 2]),
        fieldSize: Map({ width: 5, height: 5 }),
        expected: Set.of(
          List([4, 1]),
          List([3, 2]),
          List([4, 3])
        )
      },
      {
        position_text: "middle of the field",
        vertice: List([2, 2]),
        fieldSize: Map({ width: 5, height: 5 }),
        expected: Set.of(
          List([2, 1]),
          List([1, 2]),
          List([3, 2]),
          List([2, 3])
        )
      }
    ];

    tests.forEach(function(test) {
      context("when the vertice's in the " + test.position_text, function() {
        it("returns " + test.expected.size + " adjacent vertices", function() {
          const emptyField = minesweeper
            .generateField(test.fieldSize);

          const resultAdjacent = minesweeper
            .adjacentVertices(emptyField, test.vertice);

          expect(resultAdjacent).to.equal(test.expected);
        });
      });
    });
  });
});
