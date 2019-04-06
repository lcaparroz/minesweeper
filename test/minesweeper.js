const assert = require('assert');
const { fromJS } = require('immutable');
const minesweeper = require ("../app/minesweeper");

describe("Minesweeper", function() {
  describe("generateBlankMap", function() {
    it("generates a List of Lists with null values", function() {
      const expected_map = fromJS(
        [[null, null, null],
          [null, null, null],
          [null, null, null]]
      );

      const result_map = minesweeper.generateBlankMap(3, 3);

      assert(expected_map.equals(result_map));
    });
  });
});
