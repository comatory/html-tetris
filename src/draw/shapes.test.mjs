import { describe, it } from "mocha";
import { expect } from "chai";

import {
  getShape,
  getNextRotation,
  ROTATION,
  I_ID,
  J_ID,
  L_ID,
  O_ID,
  S_ID,
  T_ID,
  Z_ID,
  getDirection,
} from "./shapes.mjs";

describe("shapes", () => {
  describe("getShape", () => {
    it("should return descriptor with A rotation", () => {
      expect(getShape(I_ID, ROTATION.A)).to.have.property(
        "rotation",
        ROTATION.A
      );
    });

    it("should return descriptor with B rotation", () => {
      expect(getShape(I_ID, ROTATION.B)).to.have.property(
        "rotation",
        ROTATION.B
      );
    });

    it("should return descriptor with C rotation", () => {
      expect(getShape(I_ID, ROTATION.C)).to.have.property(
        "rotation",
        ROTATION.C
      );
    });

    it("should return descriptor with D rotation", () => {
      expect(getShape(I_ID, ROTATION.D)).to.have.property(
        "rotation",
        ROTATION.D
      );
    });

    describe("I", () => {
      it("should return I descriptor", () => {
        expect(getShape(I_ID, ROTATION.A)).to.have.property("id", I_ID);
        expect(getShape(I_ID, ROTATION.A)).to.have.property("shape");
        expect(getShape(I_ID, ROTATION.A)).to.have.property(
          "rotation",
          ROTATION.A
        );
      });
    });

    describe("J", () => {
      it("should return J descriptor", () => {
        expect(getShape(J_ID, ROTATION.A)).to.have.property("id", J_ID);
        expect(getShape(J_ID, ROTATION.A)).to.have.property("shape");
        expect(getShape(J_ID, ROTATION.A)).to.have.property(
          "rotation",
          ROTATION.A
        );
      });
    });

    describe("L", () => {
      it("should return L descriptor", () => {
        expect(getShape(L_ID, ROTATION.A)).to.have.property("id", L_ID);
        expect(getShape(L_ID, ROTATION.A)).to.have.property("shape");
        expect(getShape(L_ID, ROTATION.A)).to.have.property(
          "rotation",
          ROTATION.A
        );
      });
    });

    describe("O", () => {
      it("should return O descriptor", () => {
        expect(getShape(O_ID, ROTATION.A)).to.have.property("id", O_ID);
        expect(getShape(O_ID, ROTATION.A)).to.have.property("shape");
        expect(getShape(O_ID, ROTATION.A)).to.have.property(
          "rotation",
          ROTATION.A
        );
      });
    });

    describe("S", () => {
      it("should return S descriptor", () => {
        expect(getShape(S_ID, ROTATION.A)).to.have.property("id", S_ID);
        expect(getShape(S_ID, ROTATION.A)).to.have.property("shape");
        expect(getShape(S_ID, ROTATION.A)).to.have.property(
          "rotation",
          ROTATION.A
        );
      });
    });

    describe("T", () => {
      it("should return T descriptor", () => {
        expect(getShape(T_ID, ROTATION.A)).to.have.property("id", T_ID);
        expect(getShape(T_ID, ROTATION.A)).to.have.property("shape");
        expect(getShape(T_ID, ROTATION.A)).to.have.property(
          "rotation",
          ROTATION.A
        );
      });
    });

    describe("Z", () => {
      it("should return Z descriptor", () => {
        expect(getShape(Z_ID, ROTATION.A)).to.have.property("id", Z_ID);
        expect(getShape(Z_ID, ROTATION.A)).to.have.property("shape");
        expect(getShape(Z_ID, ROTATION.A)).to.have.property(
          "rotation",
          ROTATION.A
        );
      });
    });
  });

  describe("getNextRotation", () => {
    it("should get next rotation of B when pasing rotation A", () => {
      expect(getNextRotation(ROTATION.A)).to.equal(ROTATION.B);
    });

    it("should get next rotation of C when pasing rotation B", () => {
      expect(getNextRotation(ROTATION.B)).to.equal(ROTATION.C);
    });

    it("should get next rotation of D when pasing rotation C", () => {
      expect(getNextRotation(ROTATION.C)).to.equal(ROTATION.D);
    });

    it("should get next rotation of A when pasing rotation D", () => {
      expect(getNextRotation(ROTATION.D)).to.equal(ROTATION.A);
    });
  });

  describe("getDirection", () => {
    it("should define clockwise direction when rotating from A to B", () => {
      expect(getDirection(ROTATION.A, ROTATION.B)).to.be.true;
    });

    it("should define anti-clockwise direction when rotating from B to A", () => {
      expect(getDirection(ROTATION.B, ROTATION.A)).to.be.false;
    });

    it("should define clockwise direction when rotating from B to D", () => {
      expect(getDirection(ROTATION.B, ROTATION.D)).to.be.true;
    });

    it("should define anti-clockwise direction when rotating from D to B", () => {
      expect(getDirection(ROTATION.D, ROTATION.B)).to.be.false;
    });

    it("should define anti-clockwise direction when rotating from A to D", () => {
      expect(getDirection(ROTATION.A, ROTATION.D)).to.be.false;
    });

    it("should define clockwise direction when rotating from D to A", () => {
      expect(getDirection(ROTATION.D, ROTATION.A)).to.be.true;
    });
  });
});
