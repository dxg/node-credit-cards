var should      = require('should');
var creditCards = require('../../lib/');

describe("Credit cards", function () {
  describe("base functionality", function () {
    describe("#isValid", function () {
      it("should return true for valid numbers", function () {
         should.strictEqual(creditCards.isValid(" 402 400712016 8322 "), true);
      });

      it("should return false for invalid numbers", function () {
         should.strictEqual(creditCards.isValid(" 4034007 12016832 2"), false);
      });

      it("should return false for test numbers", function () {
         should.strictEqual(creditCards.isValid("4111111111111111"), false);
      });
    });

    describe("#getInfo", function () {
      it("should return correct data", function () {
        creditCards.getInfo(' 3478 7964 2068 802').should.eql({
          valid: true, code: 'AX', name: 'American Express', test: false
        });
      });
    });
  });

  describe("fancy functionality", function () {
    var fancyCards;

    before(function () {
      fancyCards = creditCards({ accepted: ['VI', 'AX'] });
    });

    describe("#isValid", function () {
      it("should return true for valid numbers", function () {
         should.strictEqual(fancyCards.isValid(" 40240 07120168322"), true);
      });

      it("should return false for invalid numbers", function () {
         should.strictEqual(fancyCards.isValid("4034007120 168322"), false);
      });
    });

    describe("#isAccepted", function () {
      it("should return false for not accepted cards", function () {
        should.strictEqual(fancyCards.isAccepted('529064 73707 50487 '), false);
      });

      it("should return true for accepted cards", function () {
        should.strictEqual(fancyCards.isAccepted(' 343018 837748043'), true);
      });
    });

    describe("#getInfo", function () {
      it("should return correct data", function () {
        fancyCards.getInfo('3478 79642068802').should.eql({
          valid: true, code: 'AX', name: 'American Express', test: false, accepted: true
        });

        fancyCards.getInfo(' 52906 473707 50487').should.eql({
          valid: true, code: 'CA', name: 'Master Card', test: false, accepted: false
        });
      });
    });
  });
});
