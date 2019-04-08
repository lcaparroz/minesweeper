const chai = require('chai');
const chaiImmutable = require('chai-immutable');
const immutable = require('immutable');
const minesweeper = require ("../app/minesweeper");

chai.use(chaiImmutable);
const { expect } = chai;
const { List, Map } = immutable;

describe("Minesweeper", function() {
  describe("generateField()", function() {
    it("returns an empty field without mines", function() {
      const expectedField = h3w3Field();

      const resultField = minesweeper.generateField(3, 3);

      expect(resultField).to.equal(expectedField);
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
