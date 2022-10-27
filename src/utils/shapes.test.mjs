import { describe, it } from "mocha";
import { expect } from "chai";

import {
  isCellEnabled,
  isCellDisabled,
  isShapeCellEnabled,
  isShapeCellDisabled,
} from "./shapes.mjs";

describe("shapes", () => {
  describe("isCellEnabled", () => {
    it("should specify enabled heap cell", () => {
      expect(isCellEnabled("i")).to.be.true;
    });

    it("should NOT specify enabled heap cell", () => {
      expect(isCellEnabled(0)).to.be.false;
    });

    it("should NOT specify enabled heap cell", () => {
      expect(isCellEnabled("")).to.be.false;
    });
  });

  describe("isCellDisabled", () => {
    it("should specify disabled heap cell", () => {
      expect(isCellDisabled(0)).to.be.true;
    });

    it("should NOT specify disabled heap cell", () => {
      expect(isCellDisabled("j")).to.be.false;
    });

    it("should NOT specify disabled heap cell", () => {
      expect(isCellDisabled(1)).to.be.false;
    });
  });

  describe("isShapeCellEnabled", () => {
    it("should specify enabled shape cell", () => {
      expect(isShapeCellEnabled(1)).to.be.true;
    });

    it("should NOT specify enabled shape cell", () => {
      expect(isShapeCellEnabled(0)).to.be.false;
    });
  });

  describe("isShapeCellDisabled", () => {
    it("should specify disabled shape cell", () => {
      expect(isShapeCellDisabled(0)).to.be.true;
    });

    it("should NOT specify disabled shape cell", () => {
      expect(isShapeCellDisabled(1)).to.be.false;
    });
  });
});
