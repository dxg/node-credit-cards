const should      = require('should');
const creditCards = require('../../src/');

describe("Credit cards", () => {
  describe("base functionality", () => {
    describe("#isValid", () => {
      it("should return true for valid numbers", () => {
         should.strictEqual(creditCards.isValid(" 402 400712016 8322 "), true);
      });

      it("should return false for invalid numbers", () => {
         should.strictEqual(creditCards.isValid(" 4034007 12016832 2"), false);
      });

      it("should return false for test numbers", () => {
         should.strictEqual(creditCards.isValid("4111111111111111"), false);
      });
    });

    describe("#getInfo", () => {
      it("should return correct data", () => {
        creditCards.getInfo(' 3478 7964 2068 802').should.eql({
          valid: true, code: 'AX', name: 'American Express', test: false
        });
      });
      it("should not try to accept non-existant caards", () => {
        should.not.exist(creditCards.getInfo(' 0000 0000 0000 0000', { accepted: ['none'] }).accepted);
      });
    });
  });

  describe("Advanced functionality", () => {
    let advanced;

    before(() => {
      advanced = creditCards({ accepted: ['VI', 'AX'] });
    });

    describe("#isValid", () => {
      it("should return true for valid numbers", () => {
         should.strictEqual(advanced.isValid(" 40240 07120168322"), true);
      });

      it("should return false for invalid numbers", () => {
         should.strictEqual(advanced.isValid("4034007120 168322"), false);
      });
    });

    describe("#isAccepted", () => {
      it("should return false for not accepted cards", () => {
        should.strictEqual(advanced.isAccepted('529064 73707 50487 '), false);
      });

      it("should return true for accepted cards", () => {
        should.strictEqual(advanced.isAccepted(' 343018 837748043'), true);
      });
    });

    describe("#getInfo", () => {
      it("should return correct data", () => {
        advanced.getInfo('3478 79642068802').should.eql({
          valid: true, code: 'AX', name: 'American Express', test: false, accepted: true
        });

        advanced.getInfo(' 52906 473707 50487').should.eql({
          valid: true, code: 'CA', name: 'Master Card', test: false, accepted: false
        });
      });
    });
  });
});
