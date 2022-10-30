import { it, describe } from "mocha";
import { expect } from "chai";

import { getScore } from "./score.mjs";

describe("score", () => {
  describe("getScore", () => {
    it("will get 40 points for single cleared row in level 0", () => {
      expect(getScore(1, 0)).to.equal(40);
    });

    it("will get 700 points for two cleared rows in level 6", () => {
      expect(getScore(2, 6)).to.equal(700);
    });

    it("will get 600 points for three cleared rows in level 1", () => {
      expect(getScore(3, 1)).to.equal(600);
    });

    it("will get 14400 points for four cleared rows in level 11", () => {
      expect(getScore(4, 11)).to.equal(14400);
    });

    it("will throw error when invalid number of rows is cleared", () => {
      expect(() => getScore(5, 1)).to.throw;
    });
  });
});
