const assert = require('assert');
const { List, Map } = require('immutable');
const minesweeper = require ("../app/minesweeper");

describe("Minesweeper", function() {
  describe("generateField", function() {
    it("returns an empty field without mines", function() {
      const empty_vertice = function() {
        return Map({
          mine: false,
          marked: false,
          uncovered: false
        });
      };

      const expected_field = Map([
        [ List([0, 0]), empty_vertice() ],
        [ List([0, 1]), empty_vertice() ],
        [ List([0, 2]), empty_vertice() ],
        [ List([1, 0]), empty_vertice() ],
        [ List([1, 1]), empty_vertice() ],
        [ List([1, 2]), empty_vertice() ],
        [ List([2, 0]), empty_vertice() ],
        [ List([2, 1]), empty_vertice() ],
        [ List([2, 2]), empty_vertice() ]
      ]);

      const result_field = minesweeper.generateField(3, 3);

      assert(expected_field.equals(result_field));
    });
  });
});
