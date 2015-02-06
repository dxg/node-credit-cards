var luhn = require('luhn').luhn;

var types = [
  {code: 'VI', name: 'Visa',                pattern: /^4[0-9]{12}(?:[0-9]{3})?$/        },
  {code: 'CA', name: 'Master Card',         pattern: /^5[1-5][0-9]{14}$/                },
  {code: 'DC', name: 'Diners Club',         pattern: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/ },
  {code: 'AX', name: 'American Express',    pattern: /^3[47][0-9]{13}$/                 },
  {code: 'DS', name: 'Discover',            pattern: /^6(?:011|5[0-9]{2})[0-9]{12}$/    },
  {code: 'TP', name: 'UAPT',                pattern: /^1[0-9]{14,15}$/                  },
  {code: 'JC', name: 'Japan Credit Bureau', pattern: /^(?:2131|1800|35\d{3})\d{11}$/    }
];
var allCodes = types.map(function (type) { return type.code; });

var testNumbers = [
  '378282246310005',  '371449635398431',  '378734493671000','30569309025904', '38520000023237',
  '4111111111111111', '4012888888881881', '4222222222222',
  '5555555555554444', '5105105105105100 ',
  '6011111111111117', '6011000990139424'
];

function clean (number) {
  return number.replace(/\s+/g, '');
}

function isTestNumber (number) {
  return testNumbers.indexOf(clean(number)) != -1;
}

function isValid (number) {
  number = clean(number);

  if (luhn.validate(number)) {
    return !isTestNumber(number);
  } else {
    return false;
  }
}

function getType (number) {
  var i, card;

  for (i = 0; i < types.length; i++) {
    card = types[i];

    if (card.pattern.test(clean(number))) return card;
  }
}

function getTypeCode (number) {
  var type = getType(clean(number));

  if (type) return type.code;
}

function getTypeName (number) {
  var type = getType(clean(number));

  if (type) return type.name;
}

function isAccepted (number, opts) {
  number = clean(number);
  return isValid(number) && opts.accepted.indexOf(getTypeCode(number)) != -1;
}

function getInfo (number, opts) {
  var card;
  var info = {};
  number = clean(number)

  info.valid = isValid(number);

  if (card = getType(number)) {
    info.code = card.code;
    info.name = card.name;
    info.test = isTestNumber(number);

    if (opts && 'accepted' in opts) {
      info.accepted = info.valid && opts.accepted.indexOf(card.code) != -1;
    }
  }

  return info;
}

function fancyCreditCards (opts) {
  if (typeof opts != 'object') opts = {};
  if (!('accepted' in opts)) opts.accepted = allCodes;

  function F () {
    this.isAccepted = function (number) {
      return isAccepted(number, opts);
    };
    this.getInfo    = function (number) {
      return getInfo(number, opts);
    };
  };

  F.prototype = module.exports;

  return new F;
}

module.exports = fancyCreditCards;
module.exports.isTestNumber = isTestNumber;
module.exports.isValid      = isValid;
module.exports.getTypeName  = getTypeName;
module.exports.getTypeCode  = getTypeCode;
module.exports.getInfo      = getInfo;
