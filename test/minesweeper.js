const assert = require('assert');
const { List, Seq } = require('immutable');
const minesweeper = require ("../app/minesweeper");

describe("Minesweeper", function() {
  describe("generateRawField", function() {
    it("returns a matrix with elements as their own coordinates", function() {
      const expected_field = Seq(
        [
          Seq([List([0, 0]), List([0, 1]), List([0, 2])]),
          Seq([List([1, 0]), List([1, 1]), List([1, 2])]),
          Seq([List([2, 0]), List([2, 1]), List([2, 2])])
        ]
      );

      const result_field = minesweeper.generateRawField(3, 3);

      assert(expected_field.equals(result_field));
    });
  });
});
